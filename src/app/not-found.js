import Link from "next/link";

export const metadata = {
  title: "404 | ALTARIA V1",
  description: "Page not found",
};

export default function NotFound() {
  return (
    <main className="relative flex h-screen w-full overflow-hidden bg-[#07111f] text-white">
      {/* Background glow blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[12%] h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[10%] top-[18%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-[10%] left-[35%] h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black 35%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 35%, transparent 85%)",
        }}
      />

      {/* Main content */}
      <section className="relative z-10 m-auto flex w-[92%] max-w-3xl flex-col items-center justify-center rounded-3xl border border-cyan-400/15 bg-white/5 px-6 py-10 text-center shadow-[0_0_40px_rgba(0,229,255,0.08)] backdrop-blur-xl md:px-10 md:py-12 font-['NTVoyager']">
        {/* top system text */}
        <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-cyan-300/90">
          System Error // Route Failure
        </p>

        {/* 404 */}
        <h1 className="select-none text-[5rem] font-black leading-none tracking-tight text-white drop-shadow-[0_0_20px_rgba(0,229,255,0.18)] sm:text-[6.5rem] md:text-[8rem] font-['NTVoyager']">
          404
        </h1>

        {/* heading */}
        <h2 className="mt-3 text-2xl font-semibold tracking-[0.12em] text-slate-100 sm:text-3xl font-['NTVoyager']">
          NODE NOT FOUND
        </h2>

        {/* description */}
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          The route you’re trying to access does not exist inside the ALTARIA
          network. It may have been moved, deleted, or never initialized.
        </p>

        {/* terminal box */}
        <div className="mt-7 w-full max-w-xl rounded-2xl border border-cyan-400/15 bg-black/30 px-5 py-4 text-left font-mono text-[13px] leading-7 text-cyan-100 shadow-inner shadow-cyan-500/5">
          <p>&gt; scanning route...</p>
          <p>&gt; validating request...</p>
          <p>
            &gt; status: <span className="font-semibold text-cyan-300">FAILED</span>
          </p>
          <p>&gt; suggestion: return to base interface</p>
        </div>

        {/* buttons */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-w-[190px] items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-3 text-sm font-semibold tracking-[0.08em] text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,229,255,0.28)]"
          >
            Return to Base
          </Link>

          <Link
            href="https://devfolio.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-[190px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-400/5"
          >
            Register Now ↗
          </Link>
        </div>

        {/* bottom tiny code */}
        <p className="mt-8 font-mono text-[11px] tracking-[0.25em] text-slate-500">
          ERR_ALT_404 // LOST_NODE
        </p>
      </section>
    </main>
  );
}