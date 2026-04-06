import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.GECIJIELONG_DATABASE_URL);
export default sql;
