"use client";

import { useEffect, useState, useRef } from "react";
import { useSite } from "./SiteContext";

export default function LoadingScreen() {
  const { phase, setPhase } = useSite();
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);
  const [collapsing, setCollapsing] = useState(false);

  useEffect(() => {
    if (phase !== "loading") return;

    let start = null;
    const duration = 1200;

    function tick(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * 100));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setCollapsing(true);
        setTimeout(() => setPhase("raw"), 500);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [phase, setPhase]);

  if (phase !== "loading") return null;

  return (
    <div className={`loading-screen fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-500 bg-[#000000] font-mono ${collapsing ? "opacity-0 scale-95" : "opacity-100"}`}>
      <div className="text-5xl md:text-7xl font-bold mb-6 tabular-nums text-[#38bdf8]">
        {count}
      </div>
      <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div className="loading-bar h-full rounded-full transition-transform duration-100 bg-[#38bdf8]" style={{ transform: `scaleX(${count / 100})` }} />
      </div>
    </div>
  );
}
