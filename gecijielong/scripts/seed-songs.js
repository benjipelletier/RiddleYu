import { neon } from "@neondatabase/serverless";
import { songs } from "../data/songs.js";

const sql = neon(process.env.DATABASE_URL);

async function main() {
  let count = 0;
  for (const song of songs) {
    await sql`
      INSERT INTO songs (title, artist, album, year, genre, region)
      VALUES (${song.title}, ${song.artist}, ${song.album || null}, ${song.year || null}, ${song.genre || null}, ${song.region || null})
      ON CONFLICT DO NOTHING
    `;
    count++;
  }
  console.log(`Seeded ${count} songs`);
}

main().catch(console.error);
