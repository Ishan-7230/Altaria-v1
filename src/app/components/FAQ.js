"use client";

import { useState, useEffect, useRef } from "react";
import { useSite } from "./SiteContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  { q: "Who can participate?", a: "Any college student — undergraduate or postgraduate — can participate. Form teams of 2-4 members from any college or university." },
  { q: "Is it free to register?", a: "Yes! Registration is completely free. Sign up through Devfolio and you're in." },
  { q: "Can I participate solo?", a: "We encourage teams of 2-4, but solo participation is allowed. You can also find teammates at the event or through our Discord." },
  { q: "What should I bring?", a: "Your laptop, charger, any hardware you need for IoT projects, and an empty stomach. We'll handle the rest." },
  { q: "Will food be provided?", a: "Absolutely. Breakfast, lunch, dinner, midnight snacks, and unlimited caffeine — all covered throughout the 24 hours." },
  { q: "What are the judging criteria?", a: "Innovation & creativity, technical complexity, real-world impact, presentation quality, and how well you leverage the track theme (AI integration)." },
  { q: "How do I submit my project?", a: "Submissions will be through Devfolio. Push your code to GitHub, add a demo video, and submit before the deadline (11:30 AM Day 2)." },
  { q: "Where do I register?", a: "Click any 'Register' button on this page — it'll take you to our Devfolio event page." },
];

export default function FAQ() {
  const { booted } = useSite();
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!booted) return;

    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Heading: slide from left with blur
        gsap.fromTo(headingRef.current,
          { opacity: 0, x: -100, filter: "blur(12px)" },
          {
            opacity: 1, x: 0, filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 45%", scrub: 1.2 },
          }
        );

        // Each FAQ item: slide from left with blur, staggered
        itemsRef.current.forEach((item, i) => {
          if (!item) return;
          gsap.fromTo(item,
            {
              opacity: 0,
              x: -150,
              filter: "blur(8px)",
            },
            {
              opacity: 1, x: 0, filter: "blur(0px)",
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                end: "top 65%",
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

  return (
    <section id="faq" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 bg-[#06080d]">
      <div className="max-w-3xl mx-auto">
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold mb-16 glow-text font-['NTVoyager',serif] text-[#ffffff]" style={{ opacity: 0 }}>FAQ</h2>
        <div className="flex flex-col">
          {FAQS.map((faq, i) => (
            <div key={i} ref={el => (itemsRef.current[i] = el)} className="faq-item" style={{ opacity: 0 }}>
              <div className="faq-question py-4 px-4 rounded-sm font-['Space_Grotesk',sans-serif] text-[#e0f2fe]" onClick={() => setOpenIndex(openIndex === i ? null : i)} role="button" tabIndex={0} aria-expanded={openIndex === i} id={`faq-q-${i}`}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenIndex(openIndex === i ? null : i); } }}>
                <span className="flex items-center justify-between text-sm md:text-base">
                  {faq.q}
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className={`ml-4 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}>
                    <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              <div className={`faq-answer px-4 ${openIndex === i ? "open py-3" : "py-0"} font-mono text-[#94a3b8]`}>
                <p className="text-xs md:text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
