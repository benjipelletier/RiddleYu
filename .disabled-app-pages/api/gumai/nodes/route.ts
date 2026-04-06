import { getDb } from "../db";

export async function GET() {
  const sql = getDb();

  try {
    const today = new Date().toISOString().slice(0, 10);

    const nodes = await sql`
      SELECT id, date_added::text, day_number, node_type, dynasty,
             title, pinyin, english, content, challenge
      FROM gumai_nodes
      WHERE date_added <= ${today}
      ORDER BY day_number ASC
    `;

    const connections = await sql`
      SELECT gc.id, gc.source_id, gc.target_id, gc.relationship, gc.label
      FROM gumai_connections gc
      JOIN gumai_nodes sn ON sn.id = gc.source_id
      JOIN gumai_nodes tn ON tn.id = gc.target_id
      WHERE sn.date_added <= ${today}
        AND tn.date_added <= ${today}
    `;

    const todayNode = nodes.length > 0 ? nodes[nodes.length - 1] : null;
    const todayId = todayNode ? todayNode.id : null;

    return Response.json({ nodes, connections, today: todayId });
  } catch (err: any) {
    console.error("nodes API error:", err);
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}
