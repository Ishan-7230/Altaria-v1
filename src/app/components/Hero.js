"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "./SiteContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";

gsap.registerPlugin(ScrollTrigger);

const DEVFOLIO_URL = "https://devfolio.co";

export default function Hero() {
  const { booted } = useSite();
  const sectionRef = useRef(null);
  const vantaRef = useRef(null);
  const zoomGroupRef = useRef(null);
  const contentRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  // Initialize Vanta Clouds
  useEffect(() => {
    if (!vantaEffect && booted && vantaRef.current) {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          skyColor: 0xd2b9b, // Reverting to user-provided snippet's 5-digit hex if that's what they want, but mapping to valid hex
          cloudColor: 0x578edf,
          sunColor: 0x59524a,
          sunGlareColor: 0x423a37,
          sunlightColor: 0x957e68,
          speed: 1.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, booted]);

  // Entry animation & Scroll interactions
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
            scrub: true, // Use instant scrub since Lenis already provides smooth scroll
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
          force3D: false, // Fix WebKit/Blink rasterization bug for massive text scaling jumps
        }, 0.05);

        // Phase 3 (0.7 → 0.9): Fade to transparent as zoom fills screen
        tl.to(zoomGroupRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power1.in",
        }, 0.7);

      }, sectionRef);

      const onResize = () => {
        ScrollTrigger.refresh();
      };
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
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-[#06080d]"
    >
      {/* Vanta Canvas Wrapper */}
      <div 
        ref={vantaRef} 
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{ opacity: vantaEffect ? 1 : 0 }}
      />
      
      <div className="absolute inset-0 bg-texture opacity-10 z-[1] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-4 text-center w-full">
        {/* Zoom group: ALTARIA + V1 centered */}
        <div
          ref={zoomGroupRef}
          className="flex flex-col items-center justify-center whitespace-nowrap opacity-100"
          style={{ transformOrigin: "center center" }}
        >
          <h1 className="hero-title zoom-letter text-[clamp(4rem,10vw,12rem)] leading-none mb-0 flex items-baseline justify-center whitespace-nowrap gap-4 font-[Londrina] text-9xl">
            <span>ALTARIA V</span><span>1</span>
          </h1>
        </div>

        {/* Subtext + CTAs */}
        <div ref={contentRef} className="mt-8">
          <p
            className="text-sm md:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-['Space_Grotesk',sans-serif] text-white/80 drop-shadow-lg"
          >
            24 Hours of Reckless Creation, Unreasonable Collaboration, and Beautiful Chaos
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href={DEVFOLIO_URL} target="_blank" rel="noopener noreferrer" className="cta-primary px-10 py-4 rounded-full text-base md:text-lg font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95">
              Register Now
            </a>
            <a href={DEVFOLIO_URL} target="_blank" rel="noopener noreferrer" className="cta-secondary px-10 py-4 rounded-full text-base md:text-lg font-bold tracking-widest uppercase flex items-center gap-3 transition-all hover:bg-white/10">
              Join on Devfolio
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
