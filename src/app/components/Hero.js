"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "./SiteContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";

gsap.registerPlugin(ScrollTrigger);

const DISCORD_URL = "https://discord.gg/nB5qgsg4g";

export default function Hero() {
  const { booted } = useSite();
  const sectionRef = useRef(null);
  const vantaRef = useRef(null);
  const zoomGroupRef = useRef(null);
  const contentRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const fadeRef = useRef(null);

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
          skyColor: 0xd2b9b,
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
            scrub: true,
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
          force3D: false,
        }, 0.05);

        // Phase 3 (0.7 → 0.9): Fade to transparent as zoom fills screen
        tl.to(zoomGroupRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power1.in",
        }, 0.7);

        tl.to(fadeRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "none",
        }, 0.1);

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
          className="relative flex flex-col items-center justify-center whitespace-nowrap opacity-100"
          style={{ transformOrigin: "center center" }}
        >
          <h1 className="hero-title zoom-letter text-[clamp(4rem,14vw,12rem)] leading-none mb-0 flex items-baseline justify-center whitespace-nowrap gap-4 font-[Londrina] text-9xl">
            <span>ALTARIA V</span><span>1</span>
          </h1>
        </div>

        {/* Subtext + CTAs */}
        <div ref={contentRef} className="mt-14 relative z-10">
          <p
            className="text-sm md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-['Space_Grotesk',sans-serif] text-white/80 drop-shadow-lg"
          >
            24 Hours of Reckless Creation, Unreasonable Collaboration, and Beautiful Chaos
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Devfolio Apply Button — styled to match official branding */}
            <a
              href="https://altaria.devfolio.co/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="devfolio-btn flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
            >
              {/* Devfolio "D" icon */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="3" fill="white" />
                <path d="M5.5 4H10.5C13.8137 4 16.5 6.68629 16.5 10C16.5 13.3137 13.8137 16 10.5 16H5.5V4Z" fill="#3770FF" />
              </svg>
              Apply with Devfolio
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="discord-btn flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
            >
              {/* Discord icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Discord Server
            </a>
          </div>
        </div>
      </div>
      <div
          ref={fadeRef}
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[45vh] z-20"
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(7,11,16,0) 0%,
                rgba(7,11,16,0.2) 30%,
                rgba(7,11,16,0.6) 60%,
                #070b10 100%
              )
            `,
            opacity: 0,
          }}
        />
    </section>
  );
}
