import { neon } from "@neondatabase/serverless";
import { pinyin, Pinyin } from "pinyin";

const sql = neon(process.env.DATABASE_URL);

function getPinyin(char) {
  const result = pinyin(char, { style: "tone", heteronym: false });
  return result[0]?.[0] || "";
}

function getPinyinToneless(char) {
  const result = pinyin(char, { style: "normal", heteronym: false });
  return result[0]?.[0] || "";
}

function parseLRC(lrc) {
  const lines = [];
  for (const line of lrc.split("\n")) {
    const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
    if (match) {
      const mins = parseInt(match[1]);
      const secs = parseFloat(match[2]);
      const text = match[3].replace(/<[^>]+>/g, "").trim();
      if (text) {
        lines.push({ text, timestamp_ms: Math.round((mins * 60 + secs) * 1000) });
      }
    }
  }
  return lines;
}

async function fetchSongLyrics(song) {
  // First try: title + artist
  const url1 = `https://lrclib.net/api/search?track_name=${encodeURIComponent(song.title)}&artist_name=${encodeURIComponent(song.artist)}`;
  const res1 = await fetch(url1, { headers: { "User-Agent": "gecijielong/1.0 (benji.codes)" } });
  const results1 = await res1.json();
  if (results1.length > 0) return results1[0];

  // Fallback: title only, pick first result that has Chinese characters in the track name
  const url2 = `https://lrclib.net/api/search?track_name=${encodeURIComponent(song.title)}`;
  const res2 = await fetch(url2, { headers: { "User-Agent": "gecijielong/1.0 (benji.codes)" } });
  const results2 = await res2.json();
  const match = results2.find(r => /[\u4e00-\u9fff]/.test(r.trackName) && (r.syncedLyrics || r.plainLyrics));
  return match || null;
}

async function processSong(song) {
  console.log(`Processing: ${song.artist} - ${song.title}`);

  const result = await fetchSongLyrics(song);
  if (!result) {
    await sql`UPDATE songs SET lrclib_status = 'not_found' WHERE id = ${song.id}`;
    console.log(`  ✗ Not found`);
    return;
  }

  const lrcText = result.syncedLyrics || result.plainLyrics;
  if (!lrcText) {
    await sql`UPDATE songs SET lrclib_status = 'not_found' WHERE id = ${song.id}`;
    return;
  }

  const rawLines = result.syncedLyrics
    ? parseLRC(result.syncedLyrics)
    : lrcText.split("\n").filter(Boolean).map(text => ({ text, timestamp_ms: null }));

  // Only keep lines with Chinese characters
  const lines = rawLines.filter(l => /[\u4e00-\u9fff]/.test(l.text));

  for (let i = 0; i < lines.length; i++) {
    const { text, timestamp_ms } = lines[i];
    const chars = text.replace(/\s/g, "");
    if (!chars.length) continue;

    const startChar = chars[0];
    const endChar = chars[chars.length - 1];

    await sql`
      INSERT INTO lyric_lines (
        song_id, line_index, text,
        start_char, end_char,
        start_pinyin, end_pinyin,
        start_pinyin_toneless, end_pinyin_toneless,
        timestamp_ms
      )
      VALUES (
        ${song.id}, ${i}, ${text},
        ${startChar}, ${endChar},
        ${getPinyin(startChar)}, ${getPinyin(endChar)},
        ${getPinyinToneless(startChar)}, ${getPinyinToneless(endChar)},
        ${timestamp_ms}
      )
      ON CONFLICT DO NOTHING
    `;
  }

  await sql`UPDATE songs SET lrclib_status = 'found', lrclib_id = ${result.id} WHERE id = ${song.id}`;
  console.log(`  ✓ ${lines.length} lines`);
}

async function main() {
  const songs = await sql`SELECT * FROM songs WHERE lrclib_status = 'pending'`;
  console.log(`Processing ${songs.length} songs...`);

  for (const song of songs) {
    await processSong(song);
    await new Promise(r => setTimeout(r, 2000)); // rate limit
  }

  await computeChains();
}

async function computeChains() {
  console.log("Computing chains...");

  await sql`
    INSERT INTO chains (from_line_id, to_line_id, match_type, connecting_value)
    SELECT a.id, b.id, 'char', a.end_char
    FROM lyric_lines a
    JOIN lyric_lines b ON b.start_char = a.end_char AND b.song_id != a.song_id
    ON CONFLICT DO NOTHING
  `;

  await sql`
    INSERT INTO chains (from_line_id, to_line_id, match_type, connecting_value)
    SELECT a.id, b.id, 'pinyin', a.end_pinyin
    FROM lyric_lines a
    JOIN lyric_lines b ON b.start_pinyin = a.end_pinyin AND b.song_id != a.song_id AND a.end_pinyin != ''
    ON CONFLICT DO NOTHING
  `;

  await sql`
    INSERT INTO chains (from_line_id, to_line_id, match_type, connecting_value)
    SELECT a.id, b.id, 'toneless', a.end_pinyin_toneless
    FROM lyric_lines a
    JOIN lyric_lines b ON b.start_pinyin_toneless = a.end_pinyin_toneless AND b.song_id != a.song_id AND a.end_pinyin_toneless != ''
    ON CONFLICT DO NOTHING
  `;

  console.log("Chains computed!");
}

main().catch(console.error);
