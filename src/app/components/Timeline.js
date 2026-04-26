"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSite } from "./SiteContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Event Data ─── */
const EVENTS = [
  {
    name: "Registration Opens",
    date: "2026-04-10",
    displayDate: "10th April 2026",
    description: "Team registrations open on Devfolio. Form your squad!",
  },
  {
    name: "Registration Closes",
    date: "2026-04-25",
    displayDate: "25th April 2026",
    description: "Last day to register your team. Don't miss out!",
  },
  {
    name: "Finalized List Released",
    date: "2026-04-26",
    displayDate: "26th April 2026",
    description: "Selected teams will be announced. Check your email!",
  },
  {
    name: "Hackathon Day 1",
    date: "2026-04-30",
    displayDate: "30th April 2026",
    description: "The 24-hour sprint begins. Code, create, conquer.",
    schedule: [
      "Inauguration & Registration 12:00 PM",
      "Lunch 1:30 PM",
      "Coding Begins 2:00 PM",
      "Snacks 4:30 PM",
      "Dinner 8:30 PM",
      "Mentoring Round 1 12:00 AM",
    ],
  },
  {
    name: "Hackathon Day 2",
    date: "2026-05-01",
    displayDate: "1st May 2026",
    description: "Final submissions, demos, and the grand closing ceremony.",
    schedule: [
      "Mentoring Round 2 6:00 AM",
      "Breakfast 8:00 AM",
      "Top 15-20 Teams Announcement 12:00 PM",
      "Lunch 1:00 PM",
      "Final Judging 2:00 PM",
      "Prize Distribution & Vote of Thanks 4:00 PM",
    ],
  },
];

/* ─── Helper: classify each event ─── */
function classifyEvent(dateStr) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateStr);
  eventDate.setHours(0, 0, 0, 0);

  if (eventDate < now) return "done";
  if (eventDate.getTime() === now.getTime()) return "current";
  return "upcoming";
}

/* ─── Node Icon Component ─── */
function NodeIcon({ status }) {
  if (status === "done") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M6 10l3 3 5-6"
          stroke="#06080d"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (status === "current") {
    return <div className="pulse-node-inner" />;
  }
  return <div className="upcoming-node-inner" />;
}

/* ─── Floating Particles Component ─── */
function PulseParticles() {
  // Use static stable offsets to satisfy strict purity checks
  const particleOffsets = [7.2, -12.5, 4.8, -8.3, 11.1, -5.9];

  return (
    <div className="pulse-particles" aria-hidden="true">
      {particleOffsets.map((offset, i) => (
        <div
          key={i}
          className="pulse-particle"
          style={{
            animationDelay: `${i * 0.35}s`,
            left: `${50 + offset}%`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main Timeline Component ─── */
export default function Timeline() {
  const { booted } = useSite();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const nodesRef = useRef([]);
  const lineTrackRef = useRef(null);
  const lineGlowRef = useRef(null);
  const pulseRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  /* Compute status for each event */
  const eventStatuses = useMemo(
    () => EVENTS.map((e) => classifyEvent(e.date)),
    []
  );

  /* Find the index of the first non-done event (the frontier) */
  const frontierIndex = useMemo(() => {
    const idx = eventStatuses.findIndex((s) => s !== "done");
    return idx === -1 ? EVENTS.length : idx;
  }, [eventStatuses]);

  /* ─── GSAP Animations ─── */
  useEffect(() => {
    if (!booted) return;

    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        /* Heading entrance */
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        /* Card entrances — alternating slide directions */
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const isLeft = i % 2 === 0;
          const status = eventStatuses[i];

          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: isLeft ? -120 : 120,
              filter: "blur(10px)",
            },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
              onComplete: () => {
                /* After card entrance, if event is done, trigger the strikethrough */
                if (status === "done") {
                  const nameEl = card.querySelector(".timeline-event-name");
                  const strikeEl = card.querySelector(".strike-sweep");
                  if (nameEl) nameEl.classList.add("struck");
                  if (strikeEl) {
                    gsap.to(strikeEl, {
                      scaleX: 1,
                      duration: 0.6,
                      delay: 0.15,
                      ease: "power2.out",
                    });
                  }
                  /* Fade the card slightly with a delay */
                  gsap.to(card.querySelector(".timeline-card"), {
                    opacity: 0.6,
                    duration: 0.5,
                    delay: 0.3,
                    ease: "power1.out",
                  });
                }
              },
            }
          );
        });

        /* Node entrances — scale pop with bounce */
        nodesRef.current.forEach((node, i) => {
          if (!node) return;
          gsap.fromTo(
            node,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: node,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );

          /* Neon ignite effect when pulse passes (at 50% viewport) */
          ScrollTrigger.create({
            trigger: node,
            start: "top 50%",
            onEnter: () => node.classList.add("node-scroll-lit"),
            onLeaveBack: () => node.classList.remove("node-scroll-lit"),
          });
        });

        /* Pulse traveling animation — scrub-linked to scroll */
        if (pulseRef.current && lineTrackRef.current) {
          gsap.fromTo(
            pulseRef.current,
            { top: "0%" },
            {
              top: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 50%",
                end: "bottom 50%",
                scrub: 1.2,
                onUpdate: (self) => {
                  if (!pulseRef.current) return;
                  // self.direction: 1 = down (trail up: 1), -1 = up (trail down: -1)
                  pulseRef.current.style.setProperty("--trail-dir", self.direction === -1 ? "-1" : "1");
                }
              },
            }
          );
        }

        /* Line glow trail — follows pulse position */
        if (lineGlowRef.current) {
          gsap.fromTo(
            lineGlowRef.current,
            { height: "0%" },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 50%",
                end: "bottom 50%",
                scrub: 1.2,
              },
            }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }, 500);

    return () => clearTimeout(timeout);
  }, [booted, eventStatuses, frontierIndex]);

  if (!booted) return null;

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-8"
      style={{ background: "#06080d" }}
    >
      {/* Section heading */}
      <div className="max-w-5xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl font-bold text-center mb-20 glow-text"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            opacity: 0,
            color: "#ffffff",
          }}
        >
          HACKATHON SCHEDULE
        </h2>
      </div>

      {/* Timeline grid */}
      <div className="timeline-central-container max-w-6xl mx-auto relative">
        {/* ─── Central Line (track for the pulse) ─── */}
        <div className="timeline-central-line" ref={lineTrackRef} />
        
        {/* Ambient glow trail that follows the pulse */}
        <div className="timeline-line-glow" ref={lineGlowRef} />

        {/* Glowing pulse orb */}
        <div className="timeline-pulse" ref={pulseRef}>
            {/* Ambient aura */}
            <div className="pulse-aura" />
            {/* Core */}
            <div className="timeline-pulse-core" />
            {/* Expanding rings */}
            <div className="timeline-pulse-ring" />
            <div className="timeline-pulse-ring timeline-pulse-ring--outer" />
            <div className="timeline-pulse-ring timeline-pulse-ring--third" />
            {/* Floating particles */}
            <PulseParticles />
          </div>

        {/* ─── Event Cards ─── */}
        <div className="timeline-events">
          {EVENTS.map((event, i) => {
            const status = eventStatuses[i];
            const isLeft = i % 2 === 0;
            const isDone = status === "done";
            const isCurrent = status === "current";

            return (
              <div
                key={event.name}
                ref={(el) => (cardsRef.current[i] = el)}
                className={`timeline-event-row ${isLeft ? "tl-left" : "tl-right"}`}
                style={{ opacity: 0 }}
              >
                {/* ─── Connector arm ─── */}
                <div
                  className={`timeline-connector ${isDone ? "connector-done" : isCurrent ? "connector-current" : "connector-upcoming"}`}
                />

                {/* ─── Node on the central line ─── */}
                <div
                  ref={(el) => (nodesRef.current[i] = el)}
                  className={`timeline-node ${isDone
                    ? "node-done"
                    : isCurrent
                      ? "node-current"
                      : "node-upcoming"
                    }`}
                  style={{ opacity: 0 }}
                >
                  <NodeIcon status={status} />
                </div>

                {/* ─── Card ─── */}
                <div
                  className={`timeline-card ${isDone
                    ? "card-done"
                    : isCurrent
                      ? "card-current"
                      : "card-upcoming"
                    } ${event.schedule ? "cursor-pointer" : ""}`}
                  onClick={() =>
                    event.schedule &&
                    setExpandedIndex(expandedIndex === i ? null : i)
                  }
                >
                  {/* Status badge */}
                  <div className={`timeline-badge ${isDone ? "badge-done" : isCurrent ? "badge-current" : "badge-upcoming"}`}>
                    {isCurrent && <span className="status-dot dot-live" />}
                    {isDone ? "DONE" : isCurrent ? "LIVE" : "UPCOMING"}
                  </div>

                  {/* Event name with animated strikethrough */}
                  <h3 className="timeline-event-name">
                    {event.name}
                    {/* Animated strike sweep overlay */}
                    {isDone && (
                      <span
                        className="strike-sweep"
                        style={{ transform: "scaleX(0)" }}
                      />
                    )}
                  </h3>

                  {/* Date */}
                  <p
                    className={`timeline-event-date ${isDone ? "done-date" : ""}`}
                  >
                    {event.displayDate}
                  </p>

                  {/* Description */}
                  <p
                    className={`timeline-event-desc ${isDone ? "done-desc" : ""}`}
                  >
                    {event.description}
                  </p>

                  {/* Expand indicator for schedule */}
                  {event.schedule && (
                    <div className="timeline-expand-indicator">
                      <span className="text-xs font-mono opacity-50">
                        {expandedIndex === i
                          ? "▲ collapse"
                          : "▼ view schedule"}
                      </span>
                    </div>
                  )}

                  {/* Expanded Schedule */}
                  {event.schedule && (
                    <div
                      className="timeline-schedule-panel"
                      style={{
                        maxHeight: expandedIndex === i ? "500px" : "0",
                        opacity: expandedIndex === i ? 1 : 0,
                        marginTop: expandedIndex === i ? "12px" : "0",
                      }}
                    >
                      <div className="timeline-schedule-grid">
                        {event.schedule.map((item) => (
                          <span key={item} className="timeline-schedule-item">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
