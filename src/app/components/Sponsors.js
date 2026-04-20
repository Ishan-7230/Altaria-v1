"use client";

import { useEffect, useRef } from "react";
import { useSite } from "./SiteContext";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TITLE_SPONSORS = [
  { name: "DERBI Foundation", logo: "/images/derbi_foundation.png", w: 300, h: 120 },
  { name: "Sagar Hospital", logo: "/images/sagar.png", w: 300, h: 120 },
];

const GOLD_SPONSORS = [
  { name: "Stellar Blockchain", logo: "/images/stellar.png", w: 260, h: 100 },
];

export default function Sponsors() {
  const { booted } = useSite();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const titleLabelRef = useRef(null);
  const goldLabelRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!booted) return;
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Heading: scale up with blur
        gsap.fromTo(headingRef.current,
          { opacity: 0, scale: 0.7, filter: "blur(15px)" },
          {
            opacity: 1, scale: 1, filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 40%", scrub: 1.2 },
          }
        );

        // Labels
        [titleLabelRef.current, goldLabelRef.current].forEach(el => {
          if (!el) return;
          gsap.fromTo(el,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%", end: "top 65%", scrub: 1 },
            }
          );
        });

        // Sponsor cards: blur-to-sharp with scale
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          gsap.fromTo(card,
            { opacity: 0, filter: "blur(12px)", scale: 0.8, y: 40 },
            {
              opacity: 1, filter: "blur(0px)", scale: 1, y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 55%",
                scrub: 1,
              },
            }
          );
        });
      }, sectionRef);
      return () => ctx.revert();
    }, 400);
    return () => clearTimeout(timeout);
  }, [booted]);

  if (!booted) return null;

  let idx = 0;
  return (
    <section id="sponsors" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 bg-[#0a0e18]">
      <div className="max-w-5xl mx-auto">
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold mb-16 text-center glow-text font-['Space Grotesk', sans-serif] text-[#ffffff]" style={{ opacity: 0 }}>SPONSORS</h2>
        <div className="mb-12">
          <h3 ref={titleLabelRef} className="text-base uppercase tracking-widest mb-8 text-center font-mono text-[rgba(56,189,248,0.5)]" style={{ opacity: 0 }}>Title Sponsors</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {TITLE_SPONSORS.map(s => { const i = idx++; return (
              <div key={s.name} ref={el => (cardsRef.current[i] = el)} className="track-card rounded-xl p-8 flex items-center justify-center" style={{ minWidth: "260px", minHeight: "130px", opacity: 0 }}>
                <Image src={s.logo} alt={s.name} width={s.w} height={s.h} loading="lazy" className="object-contain" style={{ maxHeight: "90px", width: "auto", height: "auto" }} />
              </div>
            ); })}
          </div>
        </div>
        <div className="mb-12">
          <h3 ref={goldLabelRef} className="text-base uppercase tracking-widest mb-8 text-center font-mono text-[rgba(56,189,248,0.5)]" style={{ opacity: 0 }}>Gold Sponsors</h3>
          <div className="flex items-center justify-center">
            {GOLD_SPONSORS.map(s => { const i = idx++; return (
              <div key={s.name} ref={el => (cardsRef.current[i] = el)} className="track-card rounded-xl p-8 flex items-center justify-center" style={{ minWidth: "220px", minHeight: "110px", opacity: 0 }}>
                <Image src={s.logo} alt={s.name} width={s.w} height={s.h} loading="lazy" className="object-contain" style={{ maxHeight: "70px", width: "auto", height: "auto" }} />
              </div>
            ); })}
          </div>
        </div>
        {/* Platform Partner — Devfolio (below Gold, smaller size, required for verification) */}
        <div className="mt-8">
          <h3 className="text-sm uppercase tracking-widest mb-6 text-center font-mono text-[rgba(56,189,248,0.4)]">Platform Partner</h3>
          <div className="flex items-center justify-center">
            <a href="https://devfolio.co" target="_blank" rel="noopener noreferrer" className="track-card rounded-lg p-5 flex items-center justify-center bg-white/95 hover:bg-white transition-colors" style={{ minWidth: "180px", minHeight: "80px" }}>
              <Image
                src="/images/devfolio_logo.png"
                alt="DEVFOLIO LOGO"
                width={150}
                height={32}
                className="object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
