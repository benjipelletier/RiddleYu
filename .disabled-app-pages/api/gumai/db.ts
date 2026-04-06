import { neon, NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

export function getDb() {
  if (!_sql) {
    _sql = neon(process.env.GUMAI_DATABASE_URL!) as NeonQueryFunction<false, false>;
  }
  return _sql;
}
