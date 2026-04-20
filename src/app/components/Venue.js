"use client";

import { useEffect, useRef } from "react";
import { useSite } from "./SiteContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Venue() {
  const { booted } = useSite();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const mapRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    if (!booted) return;

    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Heading: scale up with blur
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 60, filter: "blur(10px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 40%", scrub: 1.2 },
          }
        );

        // Map: slide from LEFT with blur
        gsap.fromTo(mapRef.current,
          { opacity: 0, x: -200, filter: "blur(10px)", scale: 0.9 },
          {
            opacity: 1, x: 0, filter: "blur(0px)", scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 88%",
              end: "top 45%",
              scrub: 1.2,
            },
          }
        );

        // Info: slide from RIGHT with blur
        gsap.fromTo(infoRef.current,
          { opacity: 0, x: 200, filter: "blur(10px)", scale: 0.9 },
          {
            opacity: 1, x: 0, filter: "blur(0px)", scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 88%",
              end: "top 45%",
              scrub: 1.2,
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }, 400);

    return () => clearTimeout(timeout);
  }, [booted]);

  if (!booted) return null;

  return (
    <section id="venue" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden bg-[#0a0e18]">
      <div className="max-w-5xl mx-auto">
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold mb-12 glow-text font-['Space_Grotesk',sans-serif] text-[#ffffff]" style={{ opacity: 0 }}>VENUE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div ref={mapRef} className="rounded-xl overflow-hidden border border-[rgba(56,189,248,0.12)]" style={{ opacity: 0 }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7454035509975!2d77.56469731482174!3d12.911289990891742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae156310100001%3A0x71be53da4480fca2!2sDayananda%20Sagar%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1711680000000!5m2!1sen!2sin" width="100%" height="350" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="DSCE location" className="rounded-xl" onLoad={() => ScrollTrigger.refresh()} />
          </div>
          <div ref={infoRef} className="flex flex-col justify-center" style={{ opacity: 0 }}>
            <h3 className="text-xl md:text-2xl mb-4 font-['Space_Grotesk',sans-serif] text-[#38bdf8]">Dayananda Sagar College of Engineering</h3>
            <p className="text-sm mb-6 leading-relaxed font-['Space_Grotesk',sans-serif] text-[#94a3b8]">Shavige Malleshwara Hills, Kumaraswamy Layout,<br/>Bengaluru, Karnataka 560078<br/>CD Sagar, Building No. 10</p>
            <a href="https://maps.google.com/?q=Dayananda+Sagar+College+of+Engineering+Bengaluru" target="_blank" rel="noopener noreferrer" className="cta-secondary inline-flex items-center gap-2 px-5 py-2 rounded text-xs uppercase tracking-wider w-fit mb-8">
              Open in Google Maps
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <h4 className="text-base mb-3 font-['Space_Grotesk',sans-serif] text-[#ffffff]">Getting There</h4>
            <div className="venue-transport text-xs flex flex-col gap-2.5 text-[#94a3b8]">
              <div><span className="inline-block w-14 font-bold text-[#38bdf8]">Bus</span>15E, 15G, 210 from Majestic | 600F, 600C from Electronic City</div>
              <div><span className="inline-block w-14 font-bold text-[#38bdf8]">Metro</span>Green Line → Banashankari, then auto | Purple → Majestic change</div>
              <div><span className="inline-block w-14 font-bold text-[#38bdf8]">Airport</span>KIA-5 to Banashankari | KIA-9 to Majestic</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
