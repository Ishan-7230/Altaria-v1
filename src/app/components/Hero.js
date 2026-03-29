"use client";

import { useEffect, useRef } from "react";
import { useSite } from "./SiteContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEVFOLIO_URL = "https://devfolio.co";

export default function Hero() {
  const { booted } = useSite();
  const sectionRef = useRef(null);
  const zoomGroupRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!booted) return;

    const initTimeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=80%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        // Phase 1 (0 → 0.25): Fade out subtext & buttons
        tl.to(contentRef.current, {
          opacity: 0,
          y: -80,
          filter: "blur(6px)",
          duration: 0.25,
          ease: "power2.in",
        }, 0);

        // Phase 2 (0.05 → 0.85): Zoom ALTARIA + V1 together from center
        tl.to(zoomGroupRef.current, {
          scale: 50,
          duration: 0.8,
          ease: "power2.in",
        }, 0.05);

        // Phase 3 (0.7 → 0.9): Fade to transparent as zoom fills screen
        tl.to(zoomGroupRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power1.in",
        }, 0.7);

      }, sectionRef);

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        ctx.revert();
        window.removeEventListener("resize", onResize);
      };
    }, 400);

    return () => clearTimeout(initTimeout);
  }, [booted]);

  if (!booted) return null;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-texture opacity-15" />

      <div className="relative z-10 flex flex-col items-center px-4 text-center w-full">
        {/* Zoom group: ALTARIA + V1 centered */}
        <div
          ref={zoomGroupRef}
          className="flex flex-col items-center justify-center whitespace-nowrap"
          style={{ transformOrigin: "center center", willChange: "transform, opacity" }}
        >
          <h1 className="hero-title zoom-letter text-[clamp(4rem,12vw,12rem)] leading-none mb-0 flex items-baseline justify-center whitespace-nowrap gap-4 font-[Londrina] text-9xl">
            <span>ALTARIA V</span><span>1</span>
          </h1>
        </div>

        {/* Subtext + CTAs */}
        <div ref={contentRef} className="mt-6">
          <p
            className="text-sm md:text-lg max-w-xl mx-auto mb-8 leading-relaxed font-['Space_Grotesk',sans-serif] text-[#94a3b8]"
          >
            24 Hours of Reckless Creation, Unreasonable Collaboration, and Beautiful Chaos
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={DEVFOLIO_URL} target="_blank" rel="noopener noreferrer" className="cta-primary px-8 py-3 rounded text-sm md:text-base uppercase tracking-wider">
              Register Now
            </a>
            <a href={DEVFOLIO_URL} target="_blank" rel="noopener noreferrer" className="cta-secondary px-8 py-3 rounded text-sm md:text-base uppercase tracking-wider flex items-center gap-2">
              Join on Devfolio
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
