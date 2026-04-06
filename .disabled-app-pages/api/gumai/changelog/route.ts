import { getDb } from "../db";

export async function GET() {
  const sql = getDb();

  try {
    const entries = await sql`
      SELECT cl.day_number, cl.date::text, cl.entry, gn.title as node_title
      FROM gumai_changelog cl
      JOIN gumai_nodes gn ON gn.id = cl.node_id
      ORDER BY cl.day_number DESC
      LIMIT 50
    `;

    return Response.json({ entries });
  } catch (err: any) {
    console.error("changelog API error:", err);
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}
