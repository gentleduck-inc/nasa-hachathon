import { _relations, tables } from "./tables-Dwlnkuor.js";
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

//#region src/db.ts
const client = postgres(process.env.NEON_DATABASE_URL);
const db = drizzle(client, {
	...tables,
	..._relations
});

//#endregion
export { db };