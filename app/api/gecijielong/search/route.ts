import { NextRequest } from "next/server";
import { getDb } from "../db";

export async function GET(request: NextRequest) {
  const sql = getDb();
  const q = request.nextUrl.searchParams.get("q");

  if (!q) {
    return Response.json({ error: "q is required" }, { status: 400 });
  }

  const songs = await sql`
    SELECT id, title, artist, year, genre, region
    FROM songs
    WHERE title ILIKE ${"%" + q + "%"}
       OR artist ILIKE ${"%" + q + "%"}
    LIMIT 20
  `;
  return Response.json({ songs });
}
