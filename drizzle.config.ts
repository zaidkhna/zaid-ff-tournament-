import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Neon / Supabase / koi bhi Postgres URL env se ayega.
// Vercel par DATABASE_URL Environment Variables me set karo.
// Local me .env file me set karo.
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("⚠️  DATABASE_URL missing — drizzle-kit push ke liye .env me DATABASE_URL set karo");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    // drizzle-kit push local ya Neon dono par chalega
    url: databaseUrl || "postgresql://postgres:postgres@127.0.0.1:5432/app_db",
  },
});
