"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "./SiteContext";
import gsap from "gsap";

export default function RawHtmlScreen() {
  const { phase, setPhase } = useSite();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (phase === "raw" && !visible) {
      requestAnimationFrame(() => setVisible(true));
    }
    if (phase === "booted") {
      // Smooth blur removal + fade
      const el = containerRef.current;
      if (el) {
        gsap.to(el, {
          filter: "blur(0px)",
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => setVisible(false),
        });
      } else {
        requestAnimationFrame(() => setVisible(false));
      }
    }
  }, [phase, visible]);

  // When booting starts: SLOW, VISIBLE transition from white HTML → dark styled
  // The user wants to SEE this happening behind the very slightly blurred boot overlay
  useEffect(() => {
    if (phase !== "booting" || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // SLOW background color transition — white → dark (user must see this)
      tl.to(contentRef.current, {
        backgroundColor: "#06080d",
        color: "#e0f2fe",
        duration: 2.5,
        ease: "power1.inOut",
      }, 0);

      // All child elements: subtle stylistic transition, NO scattering
      const children = contentRef.current.querySelectorAll("h1, h2, p, ul, li, hr, a, small, strong");

      // Phase 1: Elements very subtly fade/blur as if transforming (0s → 1.5s)
      tl.to(children, {
        opacity: 0.6,
        filter: "blur(1px)",
        duration: 1.5,
        ease: "power2.inOut",
      }, 0.2);

      // Links transition from blue to cyan
      const links = contentRef.current.querySelectorAll("a");
      tl.to(links, {
        color: "#38bdf8",
        textDecoration: "none",
        duration: 1.5,
        ease: "power2.inOut",
      }, 0.3);

      // HRs transition
      const hrs = contentRef.current.querySelectorAll("hr");
      tl.to(hrs, {
        borderColor: "rgba(56,189,248,0.2)",
        opacity: 0.4,
        duration: 1.2,
      }, 0.5);

      // Phase 2: Fade them out gently as boot approaches completion (1.5s → 3s)
      tl.to(children, {
        opacity: 0,
        filter: "blur(4px)",
        stagger: 0.02,
        duration: 1,
        ease: "power3.in",
      }, 1.8);

    }, contentRef);

    return () => ctx.revert();
  }, [phase]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[90]"
      style={{ filter: phase === "raw" ? "blur(0.5px)" : "blur(0px)" }}
    >
      {/* Raw HTML content */}
      <div ref={contentRef} className="raw-html-overlay absolute inset-0 overflow-y-auto p-4 md:p-8">
        <h1>ALTARIA V1</h1>
        <p>24 Hours of Reckless Creation, Unreasonable Collaboration, and Beautiful Chaos</p>
        <p><a href="#">Register Now</a> | <a href="#">Join on Devfolio</a></p>

        <hr />

        <h2>About</h2>
        <p>ALTARIA is where ideas get dangerous. A 24-hour hackathon where developers, designers, and dreamers collide to build things that probably shouldn&apos;t exist — but definitely should.</p>
        <ul>
          <li>24 Hours — Non-stop building from idea to prototype.</li>
          <li>₹50,000+ in Prizes — Because wild ideas deserve real rewards.</li>
          <li>Free Food — We keep the fuel flowing so you don&apos;t stop.</li>
        </ul>

        <hr />

        <h2>Tracks</h2>
        <p>Participants will compete in the following tracks:</p>
        <ul>
          <li><strong>IoT + AI</strong> — Build intelligent systems that bridge the physical and digital worlds.</li>
          <li><strong>Cybersecurity + AI</strong> — Create AI-driven tools for threat detection and security automation.</li>
          <li><strong>Web3 / Blockchain + AI</strong> — Smart contracts, DeFi protocols, DAOs — amplified with machine intelligence.</li>
        </ul>

        <hr />

        <h2>Hackathon Schedule</h2>
        <ul>
          <li>Registration Opens — 10th April 2026</li>
          <li>Registration Closes — 20th April 2026</li>
          <li>Finalized List Released — 23rd April 2026</li>
          <li>Hackathon Day 1 — 30th April 2026</li>
          <li>Hackathon Day 2 — 1st May 2026</li>
        </ul>

        <hr />

        <h2>Sponsors</h2>
        <p>Title Sponsors: DERBI Foundation, Sagar Hospital</p>
        <p>Gold Sponsors: Stellar Blockchain</p>

        <hr />

        <h2>FAQ</h2>
        <ul>
          <li>Who can participate?</li>
          <li>Is it free to register?</li>
          <li>Can I participate solo?</li>
          <li>What should I bring?</li>
          <li>Will food be provided?</li>
          <li>What are the judging criteria?</li>
          <li>How do I submit my project?</li>
          <li>Where do I register?</li>
        </ul>

        <hr />

        <h2>Venue</h2>
        <p>Dayananda Sagar College of Engineering</p>
        <p>Shavige Malleshwara Hills, Kumaraswamy Layout, Bengaluru, Karnataka 560078</p>
        <p><a href="#">Open in Google Maps</a></p>

        <hr />

        <p><small>&copy; 2026 ALTARIA Hackathon. All rights reserved. | Dayananda Sagar College of Engineering</small></p>
      </div>

      {/* ENTER NOW — only shown in raw phase */}
      {phase === "raw" && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center pointer-events-none">
          <button
            onClick={() => setPhase("booting")}
            className="bg-black hover:bg-[#6fe0ff] hover:text-black pointer-events-auto px-10 py-5 text-xl md:text-2xl tracking-widest rounded-lg uppercase shadow-xl shadow-blue-400"
            style={{ minWidth: "220px", minHeight: "60px" }}
          >
            ENTER NOW
          </button>
        </div>
      )}
    </div>
  );
}
