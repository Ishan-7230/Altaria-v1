"use client";

import { useState, useEffect, useRef } from "react";
import { useSite } from "./SiteContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  { q: "What is Altaria?", a: "Altaria is a next-generation hackathon focused on building innovative solutions at the intersection of AI with IoT, Cybersecurity, and Blockchain. It’s designed to push participants to solve real-world problems using cutting-edge technology." },
  { q: "Who can participate?", a: "Anyone from Bachelors of Engineering who are passionate about technology can participate — students, developers, designers, and innovators.Both beginners and experienced hackers are welcome." },
  { q: "Can I participate solo or do I need a team?", a: "No solo participation \n · team size of 2-3" },
  { q: "Will accomodation be  provided?", a: "Participants are required to arrange their own accommodation prior to the hackathon, as it will not be provided by the organizers. During the 24-hour hackathon, participants must remain on campus, and overnight stay within the college premises will be facilitated." },
  { q: "Are there any registration fees?", a: "No, participation in Altaria is completely free." },
  { q: "What do I need to submit?", a: "Participants need to submit: 1. Working prototype / demo 2.  Source code (GitHub) 3. Short explanation or presentation" },
  { q: "What are the judging criteria?", a: "Projects will be judged based on: 1. Innovation & creativity  2. Technical implementation  3. Real-world impact  4. Presentation & clarity" },
  { q: "Do I need prior experience in AI or these domains?", a: "Not at all! We encourage beginners to participate — learning and experimenting is part of the hackathon experience." },
  { q: "Who can I contact for queries?", a: "For any questions, reach out to us at: altaria.iot.tech@gmail.com, 8237809560,7795331348" },
  { q: "What is the duration of the hackathon?", a: "The hackathon will run for 24 hours , where participants will ideate, build, and present their solutions." },
  { q: "Is this an online or offline event?", a: "Fully offline hackathon. Venue:- Cd sagar , dayananda sagar college of engineering , kumarswamy layout , banglore" },
];

export default function FAQ() {
  const { booted } = useSite();
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef([]);

  // Recalculate scroll dimensions whenever an accordion expands or collapses
  useEffect(() => {
    if (openIndex !== null || openIndex === null) { // trigger on any change
      // Wait for the CSS transition to complete (0.4s) before refreshing
      const timeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 450);
      return () => clearTimeout(timeout);
    }
  }, [openIndex]);

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
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold mb-16 glow-text font-['Space Grotesk',serif] text-[#ffffff]" style={{ opacity: 0 }}>FAQ</h2>
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
