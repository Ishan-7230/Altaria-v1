"use client";

import { useEffect, useRef } from "react";
import { useSite } from "./SiteContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { booted } = useSite();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const taglineRef = useRef(null);
  const descRef = useRef(null);
  const dividerRef = useRef(null);
  const bentoRefs = useRef([]);
  const themeBadgeRef = useRef(null);

  useEffect(() => {
    if (!booted) return;

    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        ScrollTrigger.refresh();

        // Set initial states via GSAP (not inline style) so they never get "stuck"
        gsap.set(themeBadgeRef.current, { opacity: 0, y: -20, filter: "blur(6px)" });
        gsap.set(headingRef.current, { opacity: 0, x: -80, filter: "blur(12px)", scale: 0.95 });
        gsap.set(taglineRef.current, { opacity: 0, x: -40, filter: "blur(8px)" });
        gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(descRef.current, { opacity: 0, x: 60, filter: "blur(10px)" });
        bentoRefs.current.forEach(el => {
          if (el) gsap.set(el, { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.93 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(themeBadgeRef.current,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }, 0
        );
        tl.to(headingRef.current,
          { opacity: 1, x: 0, filter: "blur(0px)", scale: 1, duration: 0.8, ease: "power3.out" }, 0.15
        );
        tl.to(taglineRef.current,
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }, 0.3
        );
        tl.to(dividerRef.current,
          { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, 0.5
        );
        tl.to(descRef.current,
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, 0.55
        );
        bentoRefs.current.forEach((card, i) => {
          if (!card) return;
          tl.to(card,
            { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.55, ease: "power3.out" },
            0.75 + i * 0.1
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    }, 800);

    return () => clearTimeout(timeout);
  }, [booted]);

  if (!booted) return null;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden bg-[#06080d]"
    >
      {/* Grid bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl font-bold glow-text font-['Space_Grotesk',sans-serif] text-[#38bdf8] leading-tight mb-4"
        >
          What is ALTARIA?
        </h2>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="h-px bg-gradient-to-r from-[#38bdf8]/60 via-[#38bdf8]/20 to-transparent mb-6"
        />

        {/* Description */}
        <p
          ref={descRef}
          className="text-base md:text-lg leading-relaxed mb-10 font-['Space_Grotesk',sans-serif] text-[#94a3b8] max-w-3xl"
        >
          Altaria is a next-generation hackathon designed to explore the powerful convergence of Artificial Intelligence, Internet of Things, Cybersecurity, and Blockchain—four technologies redefining the future of the digital world. With the theme{" "}
          <span className="text-[#38bdf8] font-semibold">&ldquo;Build What&apos;s Next&rdquo;</span>
          , Altaria challenges innovators, developers, designers, and problem-solvers to create impactful solutions that address real-world challenges through cutting-edge technology.
        </p>

        {/* 2×2 Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* 24 Hours */}
          <div
            ref={el => (bentoRefs.current[0] = el)}
            className="group relative rounded-2xl p-6 border border-[#38bdf8]/10 bg-[#0b1120] hover:border-[#38bdf8]/30 transition-all duration-300 overflow-hidden"
          >
            <p className="font-mono text-xs text-[#38bdf8]/40 tracking-widest uppercase mb-3">Duration</p>
            <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#e2e8f0] text-5xl leading-none mb-2">
              24<span className="text-[#38bdf8]">H</span>
            </p>
            <p className="text-xs font-mono text-[#94a3b8] leading-relaxed">
              Non-stop building — from raw idea to working prototype.
            </p>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
              style={{ background: "linear-gradient(90deg, #38bdf880, transparent)" }} />
          </div>

          {/* Prize Pool */}
          <div
            ref={el => (bentoRefs.current[1] = el)}
            className="group relative rounded-2xl p-6 border border-[#38bdf8]/10 bg-[#0b1120] hover:border-[#38bdf8]/30 transition-all duration-300 overflow-hidden"
          >
            <p className="font-mono text-xs text-[#38bdf8]/40 tracking-widest uppercase mb-3">Prize Pool</p>
            <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#38bdf8] text-5xl leading-none mb-2">
              ₹60K<span className="text-[#38bdf8]/30 text-2xl"></span>
            </p>
            <p className="text-xs font-mono text-[#94a3b8] leading-relaxed">
              Multiple tracks. Multiple winners. Wild ideas, real rewards.
            </p>
            <span aria-hidden className="absolute right-4 top-3 font-mono text-7xl font-bold opacity-[0.04] select-none text-[#38bdf8]">₹</span>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
              style={{ background: "linear-gradient(90deg, #38bdf880, transparent)" }} />
          </div>

          {/* Team Size */}
          <div
            ref={el => (bentoRefs.current[2] = el)}
            className="group relative rounded-2xl p-6 border border-[#38bdf8]/10 bg-[#0b1120] hover:border-[#38bdf8]/30 transition-all duration-300 overflow-hidden"
          >
            <p className="font-mono text-xs text-[#38bdf8]/40 tracking-widest uppercase mb-3">Team Size</p>
            <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#e2e8f0] text-5xl leading-none mb-2">
              2–3
            </p>
            <p className="text-xs font-mono text-[#94a3b8] leading-relaxed">
              Build with your crew.
            </p>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
              style={{ background: "linear-gradient(90deg, #38bdf880, transparent)" }} />
          </div>

          {/* Who Shows Up */}
          <div
            ref={el => (bentoRefs.current[3] = el)}
            className="group relative rounded-2xl p-6 border border-[#38bdf8]/10 bg-[#0b1120] hover:border-[#38bdf8]/30 transition-all duration-300 overflow-hidden"
          >
            <p className="font-mono text-xs text-[#38bdf8]/40 tracking-widest uppercase mb-4">Who Shows Up</p>
            <div className="flex flex-wrap gap-2">
              {["Developers", "Designers", "ML Engineers", "Security Researchers", "Blockchain Devs", "Product Thinkers"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-mono border border-[#38bdf8]/15 text-[#94a3b8] bg-[#38bdf8]/5 hover:border-[#38bdf8]/40 hover:text-[#38bdf8] transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
              style={{ background: "linear-gradient(90deg, #38bdf880, transparent)" }} />
          </div>

        </div>
      </div>
    </section>
  );
}