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
  const descRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!booted) return;

    // Initialize AFTER Hero section (which takes 400ms to pin) so the pin spacer is accounted for.
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        ScrollTrigger.refresh(); // Force GSAP to recalculate positions to account for Hero's pin spacer
        // Timeline for the entire About section entrance
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%", // Triggers later: when the top of the About section reaches 60% down the screen
            toggleActions: "play none none reverse", // Play forward when scrolling down, reverse when scrolling back up
          }
        });

        // 1. Heading: slides from LEFT with blur-to-clarity
        tl.fromTo(headingRef.current,
          { opacity: 0, x: -100, filter: "blur(12px)", scale: 0.95 },
          { opacity: 1, x: 0, filter: "blur(0px)", scale: 1, duration: 0.8, ease: "power3.out" },
          0 // Start exactly when timeline triggers
        );

        // 2. Description: slides from RIGHT with blur-to-clarity
        tl.fromTo(descRef.current,
          { opacity: 0, x: 100, filter: "blur(10px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
          0.2 // Start slightly after heading
        );

        // 3. Cards: pop up from bottom with stagger
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          tl.fromTo(card,
            { opacity: 0, y: 60, filter: "blur(8px)", scale: 0.9 },
            { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.6, ease: "power3.out" },
            0.5 + (i * 0.15) // Stagger cards after description
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    }, 800); // Wait until AFTER Hero section has fully pinned at 400ms to ensure accurate start markers

    return () => clearTimeout(timeout);
  }, [booted]);

  if (!booted) return null;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 md:py-20 px-4 md:px-8 overflow-hidden bg-[#06080d]"
    >
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl md:text-5xl font-bold mb-8 glow-text font-['Space_Grotesk',sans-serif] text-[#38bdf8]"
          style={{ opacity: 0 }}
        >
          What is ALTARIA?
        </h2>

        <p
          ref={descRef}
          className="text-base md:text-lg leading-relaxed mb-10 font-['Space_Grotesk',sans-serif] text-[#94a3b8]"
          style={{ opacity: 0 }}
        >
          ALTARIA is where ideas get dangerous. A 24-hour hackathon where
          developers, designers, and dreamers collide to build things that
          probably shouldn{"'"}t exist — but definitely should.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "24 Hours", desc: "Non-stop building from idea to prototype.", icon: "⚡" },
            { title: "₹50,000+", desc: "Because wild ideas deserve real rewards.", icon: "🏆" },
            { title: "Free Food", desc: "We keep the fuel flowing so you don't stop.", icon: "🍕" },
          ].map((item, i) => (
            <div
              key={item.title}
              ref={el => (cardsRef.current[i] = el)}
              className="track-card rounded-xl p-6 text-center"
              style={{ opacity: 0, perspective: "800px" }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3
                className="text-lg font-bold mb-2 font-mono text-[#38bdf8]"
              >
                {item.title}
              </h3>
              <p
                className="text-sm font-['Space_Grotesk',sans-serif] text-[#94a3b8]"
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
