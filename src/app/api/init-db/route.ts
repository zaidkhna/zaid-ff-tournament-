import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { ADMIN_TOKEN } from "@/lib/admin";

export const dynamic = "force-dynamic";

// Vercel deploy ke baad tables banane ke liye:
// https://tumhari-site.vercel.app/api/init-db?token=ADMIN_TOKEN
// Token galat ho to tables NAHI banenge (safe).

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token") || req.headers.get("x-admin-token");

    if (token !== ADMIN_TOKEN) {
      return NextResponse.json(
        { error: "Ghalat token! Admin token ke saath kholo." },
        { status: 401 }
      );
    }

    // Tables agar pehle se hain to kuch nahi bigdega (IF NOT EXISTS)
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS tournaments (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        game_mode TEXT NOT NULL DEFAULT 'Squad',
        map TEXT NOT NULL DEFAULT 'Bermuda',
        match_date TIMESTAMP NOT NULL,
        entry_fee INTEGER NOT NULL DEFAULT 100,
        prize_pool INTEGER NOT NULL DEFAULT 1000,
        per_kill INTEGER NOT NULL DEFAULT 20,
        max_slots INTEGER NOT NULL DEFAULT 48,
        status TEXT NOT NULL DEFAULT 'upcoming',
        room_id TEXT DEFAULT '',
        room_pass TEXT DEFAULT '',
        description TEXT DEFAULT '',
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        tournament_id INTEGER NOT NULL,
        team_name TEXT NOT NULL,
        captain_name TEXT NOT NULL,
        whatsapp TEXT NOT NULL,
        ff_uid TEXT NOT NULL,
        team_members TEXT DEFAULT '',
        payment_method TEXT NOT NULL,
        sender_number TEXT NOT NULL,
        trx_id TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS winners (
        id SERIAL PRIMARY KEY,
        tournament_title TEXT NOT NULL,
        position INTEGER NOT NULL DEFAULT 1,
        team_name TEXT NOT NULL,
        player_name TEXT DEFAULT '',
        prize INTEGER NOT NULL DEFAULT 0,
        kills INTEGER DEFAULT 0,
        match_date TIMESTAMP DEFAULT NOW(),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Seed: agar tournaments khaali hain to 6 sample matches daal do
    const countRes = await db.execute(sql`SELECT COUNT(*)::int AS c FROM tournaments;`);
    const count = Number((countRes.rows?.[0] as any)?.c ?? 0);

    if (count === 0) {
      await db.execute(sql`
        INSERT INTO tournaments (title, game_mode, map, match_date, entry_fee, prize_pool, per_kill, max_slots, status, description, featured) VALUES
        ('Squad Showdown #21 — Bermuda Blast', 'Squad', 'Bermuda', NOW() + INTERVAL '3 hours', 100, 2000, 30, 48, 'upcoming', 'Full map squad battle! Winner 1200 + per kill 30.', true),
        ('Solo Headshot Kings #14', 'Solo', 'Bermuda', NOW() + INTERVAL '5 hours', 50, 800, 20, 48, 'upcoming', 'Solo lobby — Top 3 ko prize + har kill par Rs 20.', false),
        ('Duo Destroyers — Purgatory', 'Duo', 'Purgatory', NOW() + INTERVAL '1 day 2 hours', 120, 1500, 25, 24, 'upcoming', 'Best duo jodi lao aur Purgatory me tabahi machao!', false),
        ('Lone Wolf Clash — 1v1 Room', 'Lone Wolf', 'Bermuda', NOW() + INTERVAL '2 hours', 50, 500, 0, 32, 'live', 'LIVE NOW! 1v1 Lone Wolf — jeeto Rs 500 instant.', true),
        ('Squad Pro Lobby — Rs 200 Entry', 'Squad', 'Kalahari', NOW() + INTERVAL '2 days 3 hours', 200, 5000, 50, 48, 'upcoming', 'Pro players only! Big prize Rs 5000.', true),
        ('Daily Noob Lobby — Easy Win', 'Squad', 'Bermuda', NOW() + INTERVAL '6 hours', 50, 600, 10, 48, 'upcoming', 'New players ke liye easy lobby!', false);
      `);
    }

    return NextResponse.json({
      ok: true,
      message: "✅ Tables ready! Ab website chalao.",
      tournamentsBefore: count,
    });
  } catch (e: any) {
    console.error("init-db failed:", e);
    return NextResponse.json(
      { error: "DB init failed: " + (e?.message || "unknown — DATABASE_URL check karo") },
      { status: 500 }
    );
  }
}
