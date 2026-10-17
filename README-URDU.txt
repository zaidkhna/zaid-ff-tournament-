ZAID FF TOURNAMENT - FIXED BUILD (Vercel Ready)
=============================================
FIX: vercel.json se buildCommand hata diya hai.
Vercel ab default 'npm run build' (= next build) chalata hai.
drizzle-kit push build me NAHI chalta - tables /api/init-db link se bante hain.

Vercel Dashboard me:
Settings -> General -> Build Command = khaali/default rakho (override mat karo)
Agar wahan purana 'npx drizzle-kit push && next build' likha hai to use DELETE karo!

Steps:
1. npm install
2. .env.example ko .env banao + DATABASE_URL dalo
3. Local tables: npx drizzle-kit push
4. npm run dev -> http://localhost:3000
5. Vercel: GitHub push -> Import -> 4 Env vars -> Deploy
6. Deploy ke baad: /api/init-db?token=ADMIN_TOKEN kholo -> ok:true
Admin: /admin  zaidkhan_491 / hindizone12
