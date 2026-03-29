"use client";

import { useEffect, useState, useRef } from "react";
import { useSite } from "./SiteContext";
import gsap from "gsap";

const BOOT_LINES = [
  "INITIALIZING SYSTEM...",
  "LOADING MODULES...",
  "BLOCKCHAIN MODULE ✓",
  "CYBERSECURITY MODULE ✓",
  "IOT MODULE ✓",
  "AI MODULE ✓",
  "CONNECTING TO NETWORK...",
  "SYSTEM READY.",
];

export default function BootSequence() {
  const { phase, setPhase } = useSite();
  const [visibleLines, setVisibleLines] = useState(0);
  const [dissolving, setDissolving] = useState(false);
  const timerRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (phase !== "booting") return;

    let lineIndex = 0;

    function showNextLine() {
      lineIndex++;
      setVisibleLines(lineIndex);

      if (lineIndex < BOOT_LINES.length) {
        timerRef.current = setTimeout(showNextLine, 220);
      } else {
        // All lines shown — trigger pixelated dissolve
        timerRef.current = setTimeout(() => {
          setDissolving(true);

          // Animate each line to scatter/dissolve like bubbles popping
          if (contentRef.current) {
            const lines = contentRef.current.querySelectorAll(".boot-line");
            gsap.to(lines, {
              opacity: 0,
              scale: () => gsap.utils.random(1.5, 3),
              x: () => gsap.utils.random(-200, 200),
              y: () => gsap.utils.random(-150, 150),
              filter: "blur(12px)",
              stagger: 0.05,
              duration: 0.6,
              ease: "power4.out",
            });
          }

          // Fade the overlay itself (blur goes from 2px → 0)
          if (overlayRef.current) {
            gsap.to(overlayRef.current, {
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(0px)",
              background: "rgba(6,8,13,0)",
              duration: 0.8,
              ease: "power2.inOut",
              delay: 0.3,
              onComplete: () => setPhase("booted"),
            });
          }
        }, 500);
      }
    }

    timerRef.current = setTimeout(showNextLine, 200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, setPhase]);

  if (phase !== "booting") return null;

  return (
    <div
      ref={overlayRef}
      className="boot-overlay fixed inset-0 z-[95] flex items-center justify-center font-mono"
    >
      <div ref={contentRef} className="boot-content text-center">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`boot-line text-base md:text-xl mb-2 tracking-wider ${line.includes("✓") ? "text-[#38bdf8]" : line === "SYSTEM READY." ? "text-[#22c55e]" : "text-[rgba(255,255,255,0.7)]"}`}
          >
            <span className="mr-3 opacity-40">&gt;</span>
            {line}
          </div>
        ))}
        {visibleLines > 0 && visibleLines < BOOT_LINES.length && !dissolving && (
          <span className="boot-cursor inline-block w-3 h-5 ml-1 align-bottom bg-[rgba(255,255,255,0.7)]" />
        )}
      </div>
    </div>
  );
}
