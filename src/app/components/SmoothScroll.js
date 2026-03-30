"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    function update(time) {
      // time comes from GSAP's ticker in seconds, Lenis needs milliseconds
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    // Un-sync standard RequestAnimationFrame, tie it to GSAP ticker
    gsap.ticker.add(update);
    
    // Prevent lag smoothing from breaking scroll sync during long frame updates
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
