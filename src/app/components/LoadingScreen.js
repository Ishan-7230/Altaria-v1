"use client";

import { useEffect, useState, useRef } from "react";
import { useSite } from "./SiteContext";
import gsap from "gsap";

export default function LoadingScreen() {
  const { phase, setPhase } = useSite();
  const [collapsing, setCollapsing] = useState(false);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    if (phase !== "loading") return;

    // We keep track of the counter object
    const counter = { value: 0 };
    const loaderDuration = 2.5;

    // Use a standard GSAP power3.inOut ease
    // Update the counter text per frame
    const tl = gsap.timeline({
      onComplete: () => {
        setCollapsing(true);
        setTimeout(() => setPhase("booted"), 800);
      }
    });

    tl.to(counter, {
      value: 100,
      duration: loaderDuration,
      ease: "power3.inOut",
      onUpdate: () => {
        if (textRef.current) {
          textRef.current.innerText = Math.round(counter.value);
        }
      }
    });

    // The fill height animates from 0% to 100%
    tl.to(fillRef.current, {
      height: "100%",
      duration: loaderDuration,
      ease: "power3.inOut"
    }, 0);

    return () => {
      tl.kill();
    };
  }, [phase, setPhase]);

  if (phase !== "loading") return null;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-700 bg-[#06080d] overflow-hidden ${
        collapsing ? "opacity-0 scale-110 blur-xl pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] bg-[url('https://assets.website-files.com/63711f8638b99b3cd326f3a4/6371272963d653cd3285f62a_Grain_overlay.gif')] bg-repeat" />

      {/* Top Marquee */}
      <div className="absolute top-8 left-0 right-0 flex overflow-hidden whitespace-nowrap text-white text-sm tracking-[4px] uppercase opacity-70">
        <div className="animate-marquee flex gap-[7rem]">
          {Array(15).fill("LOADING").map((t, i) => <span key={i} className="flex-shrink-0">{t}</span>)}
        </div>
        <div className="animate-marquee flex gap-[7rem] ml-[7rem]">
           {Array(15).fill("LOADING").map((t, i) => <span key={i} className="flex-shrink-0">{t}</span>)}
        </div>
      </div>

      {/* Center Text Wrapper */}
      <div className="relative z-10 flex h-[30vmin] items-end justify-center self-center">
        {/* Fill wrapper */}
        <div 
          ref={fillRef}
          className="relative flex justify-center items-end w-full h-0 bg-white"
          style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          <div ref={textRef} className="page-loader_text text-[30vmin] font-bold leading-none tracking-tighter">0</div>
          <div className="page-loader_text text-[30vmin] font-bold leading-none tracking-tighter">%</div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="absolute bottom-8 left-0 right-0 flex overflow-hidden whitespace-nowrap text-white text-sm tracking-[4px] uppercase opacity-70">
        <div className="animate-marquee flex gap-[7rem]">
          {Array(15).fill("LOADING").map((t, i) => <span key={i} className="flex-shrink-0">{t}</span>)}
        </div>
        <div className="animate-marquee flex gap-[7rem] ml-[7rem]">
           {Array(15).fill("LOADING").map((t, i) => <span key={i} className="flex-shrink-0">{t}</span>)}
        </div>
      </div>
    </div>
  );
}
