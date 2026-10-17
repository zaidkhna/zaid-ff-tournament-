import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Vercel build ke waqt DATABASE_URL na ho to crash NA karo.
// Build sirf "next build" chalata hai — DB query runtime par hoti hai.
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("⚠️  DATABASE_URL is not set — DB queries runtime par fail hongi. .env ya Vercel Env me set karo.");
}

// Neon / Supabase ko SSL chahiye hota hai.
// URL me sslmode=require ho ya neon.tech ho to SSL on karo.
const needsSSL =
  !!databaseUrl &&
  (databaseUrl.includes("neon.tech") ||
    databaseUrl.includes("sslmode=require") ||
    databaseUrl.includes("supabase.co"));

const connectionString = databaseUrl || "postgresql://postgres:postgres@127.0.0.1:5432/app_db";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString,
    ...(needsSSL ? { ssl: { rejectUnauthorized: false } } : {}),
    // Vercel serverless ke liye chhota pool
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
