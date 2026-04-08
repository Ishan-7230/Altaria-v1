"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "./SiteContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EVENTS = [
  { name: "Registration Opens", date: "10th April 2026", icon: "📋" },
  { name: "Registration Closes", date: "20th April 2026", icon: "🔒" },
  { name: "Finalized List Released", date: "23rd April 2026", icon: "📢" },
  { name: "Hackathon Day 1", date: "30th April 2026", icon: "🚀", schedule: ["Registration 9:00 AM","Opening Ceremony 10:00 AM","Hacking Begins 11:00 AM","Lunch 2:30 PM","Mentoring Round 1 5:00 PM","Evening Snacks 6:00 PM","Initial Evaluation 7:00 PM","Dinner 9:00 PM","Midnight Activity 12:00 AM"] },
  { name: "Hackathon Day 2", date: "1st May 2026", icon: "🏆", schedule: ["Breakfast 7:00 AM","Mentoring Round 2 8:00 AM","Hacking Ends 11:00 AM","Submission 11:30 AM","Final Evaluation 12:00 PM","Lunch 1:00 PM","Judging & Demos 2:00 PM","Closing Ceremony 3:00 PM"] },
];

export default function Timeline() {
  const { booted } = useSite();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const nodesRef = useRef([]);
  const lineRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (!booted) return;
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Heading: slide from right with blur
        gsap.fromTo(headingRef.current,
          { opacity: 0, x: 100, filter: "blur(10px)" },
          {
            opacity: 1, x: 0, filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 40%", scrub: 1.2 },
          }
        );

        // Animate the vertical line growing
        if (lineRef.current) {
          gsap.fromTo(lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                end: "bottom 70%",
                scrub: 1,
              },
            }
          );
        }

        // Timeline nodes: stagger slide with blur
        nodesRef.current.forEach((node, i) => {
          if (!node) return;
          gsap.fromTo(node,
            {
              opacity: 0,
              x: -80,
              filter: "blur(6px)",
            },
            {
              x: 0, opacity: 1, filter: "blur(0px)",
              ease: "power3.out",
              scrollTrigger: {
                trigger: node,
                start: "top 90%",
                end: "top 60%",
                scrub: 1.2,
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
    <section id="schedule" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 bg-[#06080d]">
      <div className="max-w-4xl mx-auto">
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold mb-16 glow-text font-['Space_Grotesk',sans-serif] text-[#ffffff]" style={{ opacity: 0 }}>
          HACKATHON SCHEDULE
        </h2>

        {/* Timeline container with vertical line */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px]"
            style={{
              background: "linear-gradient(to bottom, transparent, #38bdf8, #38bdf8, transparent)",
              transformOrigin: "top center",
              zIndex: 1,
            }}
          />

          {/* Timeline nodes */}
          <div className="flex flex-col gap-0">
            {EVENTS.map((event, i) => (
              <div
                key={event.name}
                ref={el => (nodesRef.current[i] = el)}
                className="relative pl-16 md:pl-20 pb-8"
                style={{ opacity: 0 }}
              >
                {/* Node dot on the line */}
                <div
                  className={`absolute left-4 md:left-6 top-6 w-5 h-5 rounded-full border-2 z-10 flex items-center justify-center border-[#38bdf8] ${expandedIndex === i ? 'bg-[#38bdf8]' : 'bg-[#06080d]'}`}
                  style={{
                    transition: "background 0.3s ease",
                    boxShadow: "0 0 12px rgba(56,189,248,0.4)",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                </div>

                {/* Arrow pointing from line to card */}
                <div
                  className="absolute left-[38px] md:left-[46px] top-[26px] w-6 md:w-8 h-[2px] bg-[#38bdf8]"
                  style={{ opacity: 0.5 }}
                />
                {/* Arrow head */}
                <div
                  className="absolute top-[22px] left-[56px] md:left-[68px]"
                  style={{
                    width: 0, height: 0,
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: "6px solid #38bdf8",
                    opacity: 0.5,
                  }}
                />

                {/* Event card */}
                <div
                  className={`timeline-box rounded-lg p-5 md:p-6 ${event.schedule ? "cursor-pointer" : ""} ${expandedIndex === i ? "expanded" : ""}`}
                  onClick={() => event.schedule && setExpandedIndex(expandedIndex === i ? null : i)}
                  onMouseEnter={() => { if (event.schedule && window.innerWidth >= 768) setExpandedIndex(i); }}
                  onMouseLeave={() => { if (event.schedule && window.innerWidth >= 768) setExpandedIndex(null); }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{event.icon}</span>
                      <span className="event-name text-lg md:text-2xl text-white">{event.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="event-date text-xs md:text-sm text-[#38bdf8] font-mono">{event.date}</span>
                      {event.schedule && (
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 text-[#38bdf8] ${expandedIndex === i ? 'rotate-180' : 'rotate-0'}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  {event.schedule && (
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight: expandedIndex === i ? "400px" : "0",
                        opacity: expandedIndex === i ? 1 : 0,
                        marginTop: expandedIndex === i ? "12px" : "0",
                      }}
                    >
                      <div className="border-t pt-3 border-[rgba(56,189,248,0.12)]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {event.schedule.map(item => (
                            <span key={item} className="text-xs py-1 px-2 rounded font-mono text-[#94a3b8] bg-[rgba(56,189,248,0.05)]">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {event.schedule && (
                    <span className="text-xs mt-2 block md:hidden font-mono text-[rgba(56,189,248,0.3)]">
                      tap to {expandedIndex === i ? "collapse" : "expand"}
                    </span>
                  )}
                </div>

                {/* Down arrow between items (except last) */}
                {i < EVENTS.length - 1 && (
                  <div className="absolute left-[22px] md:left-[26px] -bottom-1 flex flex-col items-center" style={{ zIndex: 2 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#38bdf8]">
                      <path d="M6 0L6 10M6 10L2 6M6 10L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
