import Link from "next/link";

export const dynamic = "force-static";

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-[#07090f] px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm font-bold text-slate-400 hover:text-white">← Back to Website</Link>
        <div className="mt-4 rounded-3xl border border-orange-500/30 bg-[#0d111c] p-8 text-center">
          <div className="text-5xl">📦</div>
          <h1 className="font-display mt-3 text-3xl font-black text-white">ZAID FF — Files Download</h1>
          <p className="mt-2 text-sm text-slate-400">
            Website + Admin Panel dono ki ZIP files. Button dabao, download ho jayegi.
          </p>

          <div className="mt-6 space-y-4 text-left">
            <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <div className="font-black text-white">🌐 1. Full Website ZIP (Recommended)</div>
              <div className="mt-1 text-xs text-slate-400">
                Poori website + admin panel + images + setup guide. Vercel/GitHub par yehi upload hogi.
              </div>
              <a
                href="/downloads/ZAID-FF-Tournament-Website.zip"
                download
                className="mt-3 block rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 py-3.5 text-center font-black text-white"
              >
                ⬇️ DOWNLOAD WEBSITE ZIP (596 KB)
              </a>
            </div>

            <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <div className="font-black text-white">🔐 2. Admin Panel ZIP (Sirf Admin Files)</div>
              <div className="mt-1 text-xs text-slate-400">
                Sirf admin login + match/slot manage wali files + guide.
              </div>
              <a
                href="/downloads/ZAID-FF-Admin-Panel.zip"
                download
                className="mt-3 block rounded-2xl bg-white/10 py-3.5 text-center font-black text-white ring-1 ring-white/20"
              >
                ⬇️ DOWNLOAD ADMIN ZIP (11 KB)
              </a>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-amber-400/10 p-4 text-left text-[13px] leading-relaxed text-amber-100 ring-1 ring-amber-400/30">
            <b>📁 Admin file kahan upload karni hai?</b><br />
            Kahin alag se nahi! Admin panel website ke andar hi hota hai (<b>src/app/admin/</b>).
            Poori Website ZIP ek sath Vercel par deploy karo, phir <b>yoursite.com/admin</b> kholo aur login karo:<br />
            👤 <b>zaidkhan_491</b> &nbsp; 🔑 <b>hindizone12</b><br />
            <span className="text-amber-200/80">Poori Urdu guide ZIP ke andar ADMIN-SETUP-GUIDE.md me hai.</span>
          </div>

          <div className="mt-4 text-xs text-slate-500">
            💬 WhatsApp: 0339 0068468 • 💳 Easypaisa/JazzCash/Sadapay: 0330 2475360
          </div>
        </div>
      </div>
    </div>
  );
}
