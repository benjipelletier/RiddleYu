import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.GUMAI_DATABASE_URL);
export default sql;
