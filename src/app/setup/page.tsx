"use client";

import { useEffect, useState } from "react";

type Check = { key: string; label: string; ok: boolean; detail: string };

export default function SetupPage() {
  const [checks, setChecks] = useState<Check[]>([]);
  const [allOk, setAllOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
    fetch("/api/setup-status")
      .then((r) => r.json())
      .then((d) => {
        setChecks(d.checks || []);
        setAllOk(Boolean(d.ok));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function copy(text: string, key: string) {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  const links = [
    { name: "🌐 Website (Players ke liye)", url: `${origin}/`, note: "Ye link players ko bhejo" },
    { name: "🔐 Admin Panel (Sirf aap ke liye)", url: `${origin}/admin`, note: "Login: zaidkhan_491 / hindizone12" },
    { name: "📦 Downloads (ZIP files)", url: `${origin}/downloads`, note: "Website + Admin ZIP" },
  ];

  return (
    <div className="min-h-screen bg-[#07090f] px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="text-sm font-bold text-slate-400 hover:text-white">← Website par wapas</a>

        <div className="mt-4 rounded-3xl border border-orange-500/30 bg-[#0d111c] p-6 md:p-8">
          <div className="text-center">
            <div className="text-5xl">🚀</div>
            <h1 className="font-display mt-3 text-3xl font-black text-white md:text-4xl">
              ZAID FF — <span className="fire-text">SETUP COMPLETE</span>
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
              Assalam-o-Alaikum Zaid bhai! Aapki website <b className="text-white">live aur ready</b> hai.
              Neeche sab links, login aur agle steps hain.
            </p>
          </div>

          {/* LIVE STATUS */}
          <div className="mt-6 rounded-2xl bg-black/40 p-5 ring-1 ring-white/10">
            <div className="flex items-center justify-between">
              <div className="font-black text-white">📊 Live Status Check</div>
              {loading ? (
                <span className="text-xs text-slate-400">Checking...</span>
              ) : (
                <span className={`rounded-full px-3 py-1 text-xs font-black ${allOk ? "bg-green-600 text-white" : "bg-amber-500 text-black"}`}>
                  {allOk ? "✅ SAB READY" : "⚠️ CHECK KARO"}
                </span>
              )}
            </div>
            <div className="mt-3 space-y-2">
              {loading && <div className="text-sm text-slate-400">⏳ Status check ho raha hai...</div>}
              {checks.map((c) => (
                <div key={c.key} className="flex items-start gap-3 rounded-xl bg-white/5 p-3">
                  <span className="text-xl">{c.ok ? "✅" : "❌"}</span>
                  <div>
                    <div className="text-sm font-black text-white">{c.label}</div>
                    <div className="text-xs text-slate-400">{c.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div className="mt-6">
            <div className="font-black text-white">🔗 Aapke Links (Copy karke share karo)</div>
            <div className="mt-3 space-y-3">
              {links.map((l) => (
                <div key={l.name} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-sm font-black text-white">{l.name}</div>
                  <div className="mt-1 break-all font-mono text-xs text-orange-300">{l.url || "..."}</div>
                  <div className="text-xs text-slate-500">{l.note}</div>
                  <div className="mt-2 flex gap-2">
                    <a href={l.url} target="_blank" className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 py-2.5 text-center text-sm font-black text-white">
                      KHOLO ↗
                    </a>
                    <button onClick={() => copy(l.url, l.name)} className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-bold text-white">
                      {copied === l.name ? "✅ Copied" : "📋 Copy"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CREDENTIALS */}
          <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
            <div className="font-black text-white">🔑 Admin Login (Kisi ko mat dena!)</div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <button onClick={() => copy("zaidkhan_491", "u")} className="rounded-xl bg-black/40 p-3 text-left ring-1 ring-white/10">
                <div className="text-[11px] font-bold text-slate-400">USERNAME {copied === "u" ? "✅" : "📋"}</div>
                <div className="font-mono font-black text-white">zaidkhan_491</div>
              </button>
              <button onClick={() => copy("hindizone12", "p")} className="rounded-xl bg-black/40 p-3 text-left ring-1 ring-white/10">
                <div className="text-[11px] font-bold text-slate-400">PASSWORD {copied === "p" ? "✅" : "📋"}</div>
                <div className="font-mono font-black text-white">hindizone12</div>
              </button>
            </div>
          </div>

          {/* PERMANENT SETUP */}
          <div className="mt-6 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <div className="font-black text-white">🌍 Permanent Setup (Hamesha ke liye online) — Sirf 3 Steps</div>
            <ol className="mt-3 space-y-3 text-sm leading-relaxed text-slate-300">
              <li className="rounded-xl bg-black/30 p-3">
                <b className="text-white">Step 1 — GitHub par code dalo:</b><br />
                GitHub.com → New Repository (<b>zaid-ff-tournament</b>) → Website ZIP extract karke saari files upload karo.
              </li>
              <li className="rounded-xl bg-black/30 p-3">
                <b className="text-white">Step 2 — Vercel par FREE deploy karo:</b><br />
                Vercel.com → Add New Project → GitHub repo select → Deploy dabao. 2 minute me link milega jaise <b className="text-orange-300">zaid-ff.vercel.app</b>
                <a href="https://vercel.com/new" target="_blank" className="mt-2 block rounded-xl bg-black py-3 text-center font-black text-white ring-1 ring-white/30 hover:bg-white/10">
                  ▲ VERCEL PAR DEPLOY KARO
                </a>
              </li>
              <li className="rounded-xl bg-black/30 p-3">
                <b className="text-white">Step 3A — Neon.tech se LINK copy karo (ye aapka sawal 👇):</b><br />
                1. <b className="text-white">Neon.tech</b> kholo → Login → apna Project kholo<br />
                2. Upar <b className="text-white">“Connect”</b> button dabao → ek link nazar ayega jo <code className="rounded bg-black px-1 font-mono text-xs text-green-300">postgresql://...</code> se shuru hota hai<br />
                3. Us link ke saath <b className="text-white">Copy</b> button dabao — yehi wo “Value” hai jo neeche paste karni hai. Example:<br />
                <code className="mt-1 block break-all rounded-lg bg-black p-2 font-mono text-[11px] text-green-300">
                  postgresql://user:abc123@ep-xyz-123.ap-south-1.aws.neon.tech/zaidff?sslmode=require
                </code>
              </li>
              <li className="rounded-xl border border-orange-500/40 bg-black/30 p-3">
                <b className="text-white">Step 3B — Vercel me “Value” kahan paste karni hai? (ahan dekho 👇):</b><br />
                1. <b className="text-white">Vercel.com</b> → apna Project (<b>zaid-ff-tournament</b>) kholo<br />
                2. Upar wali patti (menu) me <b className="text-white">“Settings”</b> par click karo<br />
                3. Left side list me <b className="text-white">“Environment Variables”</b> par click karo<br />
                4. Wahan tumhe 2 khaane dikhenge:<br />
                <span className="mt-1 block rounded-lg bg-white/5 p-2 text-[13px]">
                  ⬅️ <b className="text-white">Key</b> wala khana (left) = naam likho, jaise <b className="text-orange-300">DATABASE_URL</b><br />
                  ➡️ <b className="text-white">Value</b> wala khana (right, bara khana) = <b className="text-green-300">Neon wala link yahan paste karo</b>
                </span>
                5. Neeche <b className="text-white">Production + Preview + Development</b> teeno par tick ✅ lagao → <b className="text-white">Save</b> dabao<br />
                6. Ye 4 lines ek-ek karke add karo (Key = left, Value = right):
                <div className="mt-2 overflow-hidden rounded-lg ring-1 ring-white/15">
                  <div className="grid grid-cols-[1fr_1.4fr] bg-white/10 px-2 py-1.5 font-mono text-[11px] font-black text-white">
                    <span>KEY ⬅️ (left)</span><span>VALUE ➡️ (right)</span>
                  </div>
                  {[
                    ["DATABASE_URL", "Neon wala postgresql://... link (Step 3A wala)"],
                    ["ADMIN_USERNAME", "zaidkhan_491"],
                    ["ADMIN_PASSWORD", "hindizone12"],
                    ["ADMIN_TOKEN", "zaidff-secure-token-491-hindi12"],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[1fr_1.4fr] border-t border-white/10 px-2 py-1.5 font-mono text-[11px]">
                      <span className="font-black text-orange-300">{k}</span>
                      <span className="break-all text-slate-300">{v}</span>
                    </div>
                  ))}
                </div>
                7. Sab add karke <b className="text-white">Deployments → ... → Redeploy</b> dabao.
              </li>
              <li className="rounded-xl border border-green-500/40 bg-green-500/5 p-3">
                <b className="text-white">Step 4 — Tables banao (1 click, terminal NAHI chahiye):</b><br />
                Deploy success ke baad ye link kholo (token same rakho):
                <code className="mt-1 block break-all rounded-lg bg-black p-2 font-mono text-[11px] text-green-300">
                  https://tumhari-site.vercel.app/api/init-db?token=zaidff-secure-token-491-hindi12
                </code>
                <span className="mt-1 block text-[13px]">
                  ✅ <b className="text-white">ok:true</b> aye to tables + 6 sample matches ban gaye. Phir <b className="text-white">/</b> kholo — website live!
                </span>
              </li>
              <li className="rounded-xl border border-red-500/30 bg-red-500/5 p-3">
                <b className="text-white">⚠️ “drizzle-kit push exited with 1” error aya tha? Fix ho gaya:</b><br />
                <span className="text-[13px]">
                  Purani <code className="rounded bg-black px-1 font-mono text-xs">vercel.json</code> build me DB-push chala rahi thi jo Vercel par fail hota tha.
                  Ab build sirf <b className="text-white">next build</b> chalata hai, tables <b className="text-white">Step 4</b> wale link se bante hain.
                  <b className="text-white"> Nayi ZIP download karo → GitHub me files update karo → Vercel khud Redeploy karega → error khatam.</b>
                </span>
              </li>
            </ol>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            <a href="/" className="fire-btn rounded-2xl py-3 text-center font-black text-white">🌐 WEBSITE</a>
            <a href="/admin" className="rounded-2xl bg-white/10 py-3 text-center font-black text-white ring-1 ring-white/20">🔐 ADMIN</a>
            <a href="/downloads" className="rounded-2xl bg-[#25D366] py-3 text-center font-black text-white">📦 ZIP DOWNLOAD</a>
          </div>

          <div className="mt-4 text-center text-xs text-slate-500">
            💬 WhatsApp: 0339 0068468 • 💳 Easypaisa / JazzCash / Sadapay: 0330 2475360 (Zaid)
          </div>
        </div>
      </div>
    </div>
  );
}
