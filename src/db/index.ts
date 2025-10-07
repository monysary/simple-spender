import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "path";

const dbPath = path.resolve(process.cwd(), "src/db/sqlite.db");
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
