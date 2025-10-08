import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "./src/db/sqlite.db",
  },
  migrations: {
    prefix: "timestamp",
    table: "drizzle_migrations",
    schema: "migrations",
  }
});
