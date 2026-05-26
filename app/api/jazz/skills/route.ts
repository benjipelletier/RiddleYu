import { NextResponse } from 'next/server';
import { getDb } from '../db';

export async function GET() {
  const sql = getDb();
  const skills = await sql`
    SELECT id, name, sort_order AS "sortOrder", description,
           tracks_bpm AS "tracksBpm",
           lh_group AS "lhGroup", lh_part AS "lhPart", rh_part AS "rhPart", mode
    FROM checklist_skills
    ORDER BY sort_order
  `;
  return NextResponse.json(skills);
}
