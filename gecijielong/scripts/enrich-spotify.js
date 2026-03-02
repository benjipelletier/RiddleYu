import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function getToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return { token: data.access_token, expiry: Date.now() + (data.expires_in - 60) * 1000 };
}

async function searchTrack(token, song) {
  const q = encodeURIComponent(`track:${song.title} artist:${song.artist}`);
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${q}&type=track&limit=3&market=TW`,
    { headers: { "Authorization": `Bearer ${token}` } }
  );
  const data = await res.json();
  const items = data.tracks?.items || [];
  // Prefer exact artist match
  return items.find(t =>
    t.artists.some(a => a.name.toLowerCase().includes(song.artist.toLowerCase()) ||
      song.artist.toLowerCase().includes(a.name.toLowerCase()))
  ) || items[0] || null;
}

async function main() {
  let { token, expiry } = await getToken();

  const songs = await sql`SELECT * FROM songs WHERE spotify_id IS NULL ORDER BY id`;
  console.log(`Enriching ${songs.length} songs...`);

  let found = 0, notFound = 0;

  for (const song of songs) {
    if (Date.now() > expiry) {
      ({ token, expiry } = await getToken());
      console.log("Token refreshed");
    }

    const track = await searchTrack(token, song);

    if (!track) {
      await sql`UPDATE songs SET spotify_id = 'not_found' WHERE id = ${song.id}`;
      console.log(`  ✗ ${song.artist} - ${song.title}`);
      notFound++;
      continue;
    }

    const albumArt = track.album.images.find(i => i.width <= 300)?.url
      || track.album.images[0]?.url
      || null;

    await sql`
      UPDATE songs SET
        spotify_id    = ${track.id},
        album_art_url = ${albumArt},
        preview_url   = ${track.preview_url},
        spotify_url   = ${track.external_urls.spotify}
      WHERE id = ${song.id}
    `;
    console.log(`  ✓ ${song.artist} - ${song.title}`);
    found++;

    await new Promise(r => setTimeout(r, 120)); // ~8 req/s, well within rate limit
  }

  console.log(`\nDone! ${found} found, ${notFound} not found`);
}

main().catch(console.error);
