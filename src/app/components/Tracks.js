// "use client";

// import { useEffect, useRef } from "react";
// import { useSite } from "./SiteContext";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const TRACKS = [
//   { name: "IoT + AI", desc: "Build intelligent systems that bridge the physical and digital worlds. Sensor networks, edge computing, smart automation — powered by AI." },
//   { name: "Cybersecurity + AI", desc: "Defend the future. Create AI-driven tools for threat detection, vulnerability analysis, and security automation." },
//   { name: "Web3 / Blockchain + AI", desc: "Decentralize everything. Smart contracts, DeFi protocols, DAOs — amplified with machine intelligence." },
// ];

// export default function Tracks() {
//   const { booted } = useSite();
//   const sectionRef = useRef(null);
//   const headingRef = useRef(null);
//   const subRef = useRef(null);
//   const cardsRef = useRef([]);
//   const wipeRef = useRef(null);

//   useEffect(() => {
//     if (!booted) return;

//     const timeout = setTimeout(() => {
//       const ctx = gsap.context(() => {
//         // Heading slide + blur
//         gsap.fromTo(headingRef.current,
//           { opacity: 0, x: -80, filter: "blur(10px)" },
//           {
//             opacity: 1, x: 0, filter: "blur(0px)",
//             ease: "power2.out",
//             scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 40%", scrub: 1.2 },
//           }
//         );

//         // Subtitle fade
//         gsap.fromTo(subRef.current,
//           { opacity: 0, y: 20 },
//           {
//             opacity: 1, y: 0,
//             ease: "power2.out",
//             scrollTrigger: { trigger: sectionRef.current, start: "top 68%", end: "top 38%", scrub: 1.2 },
//           }
//         );

//         // Cards: each slides up with blur-to-sharp, staggered triggers
//         cardsRef.current.forEach((card, i) => {
//           if (!card) return;
//           gsap.fromTo(card,
//             { y: 100, opacity: 0, filter: "blur(8px)", scale: 0.9 },
//             {
//               y: 0, opacity: 1, filter: "blur(0px)", scale: 1,
//               ease: "power3.out",
//               scrollTrigger: {
//                 trigger: card,
//                 start: "top 92%",
//                 end: "top 60%",
//                 scrub: 1,
//               },
//             }
//           );
//         });

//         // Section wipe line
//         if (wipeRef.current) {
//           gsap.fromTo(wipeRef.current, { scaleX: 0 }, {
//             scaleX: 1, ease: "power2.out",
//             scrollTrigger: { trigger: wipeRef.current, start: "top 90%", end: "top 60%", scrub: 1 },
//           });
//         }
//       }, sectionRef);

//       return () => ctx.revert();
//     }, 400);

//     return () => clearTimeout(timeout);
//   }, [booted]);

//   if (!booted) return null;

//   return (
//     <section id="tracks" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 bg-[#0a0e18]">
//       <div className="max-w-5xl mx-auto">
//         <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold mb-4 glow-text font-['Space_Grotesk',sans-serif] text-[#ffffff]" style={{ opacity: 0 }}>TRACKS</h2>
//         <p ref={subRef} className="text-sm md:text-base mb-12 font-['Space_Grotesk',sans-serif] text-[#94a3b8]" style={{ opacity: 0 }}>Participants will compete in the following tracks:</p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {TRACKS.map((track, i) => (
//             <div key={track.name} ref={el => (cardsRef.current[i] = el)} className="track-card rounded-xl p-8" style={{ opacity: 0 }}>
//               <h3 className="text-xl md:text-2xl mb-4 font-mono text-[#38bdf8]">{track.name}</h3>
//               <p className="text-sm leading-relaxed font-['Space_Grotesk',sans-serif] text-[#94a3b8]">{track.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div ref={wipeRef} className="section-wipe mt-20 mx-auto" style={{ maxWidth: "70%", transform: "scaleX(0)" }} />
//     </section>
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import { useSite } from "./SiteContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TRACKS = [
  {
    name: "IoT + AI",
    glyph: "IoT",
    desc: "Build intelligent systems that bridge the physical and digital worlds. Sensor networks, edge computing, smart automation — powered by AI.",
  },
  {
    name: "Cybersecurity + AI",
    glyph: "SEC",
    desc: "Defend the future. Create AI-driven tools for threat detection, vulnerability analysis, and security automation.",
  },
  {
    name: "Web3 / Blockchain + AI",
    glyph: "BC",
    desc: "Decentralize everything. Smart contracts, DeFi protocols, DAOs — amplified with machine intelligence.",
  },
];

export default function Tracks() {
  const { booted } = useSite();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const cardsRef = useRef([]);
  const wipeRef = useRef(null);

  useEffect(() => {
    if (!booted) return;

    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(headingRef.current,
          { opacity: 0, x: -80, filter: "blur(10px)" },
          {
            opacity: 1, x: 0, filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 40%", scrub: 1.2 },
          }
        );

        gsap.fromTo(subRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 68%", end: "top 38%", scrub: 1.2 },
          }
        );

        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          gsap.fromTo(card,
            { y: 100, opacity: 0, filter: "blur(8px)", scale: 0.9 },
            {
              y: 0, opacity: 1, filter: "blur(0px)", scale: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "top 60%",
                scrub: 1,
              },
            }
          );
        });

        if (wipeRef.current) {
          gsap.fromTo(wipeRef.current, { scaleX: 0 }, {
            scaleX: 1, ease: "power2.out",
            scrollTrigger: { trigger: wipeRef.current, start: "top 90%", end: "top 60%", scrub: 1 },
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }, 400);

    return () => clearTimeout(timeout);
  }, [booted]);

  if (!booted) return null;

  return (
    <section id="tracks" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 bg-[#0a0e18]">
      <div className="max-w-5xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl font-bold mb-4 glow-text font-['Space_Grotesk',sans-serif] text-[#ffffff]"
          style={{ opacity: 0 }}
        >
          TRACKS
        </h2>
        <p
          ref={subRef}
          className="text-sm md:text-base mb-12 font-['Space_Grotesk',sans-serif] text-[#94a3b8]"
          style={{ opacity: 0 }}
        >
          Participants will compete in the following tracks:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRACKS.map((track, i) => (
            <div
              key={track.name}
              ref={el => (cardsRef.current[i] = el)}
              className="track-card group relative rounded-xl p-8 overflow-hidden cursor-default"
              style={{ opacity: 0 }}
            >
              {/* Ghost glyph watermark — faint at rest, more visible on hover */}
              <span
                aria-hidden
                className="
                  pointer-events-none select-none absolute
                  right-4 bottom-3
                  font-mono font-black leading-none
                  text-[#38bdf8]
                  opacity-[0.055]
                  group-hover:opacity-[0.13]
                  transition-opacity duration-500
                "
                style={{ fontSize: "clamp(3.5rem, 10vw, 5.5rem)" }}
              >
                {track.glyph}
              </span>

              {/* Hover top-edge accent line */}
              <div
                className="
                  absolute top-0 left-0 h-[2px] w-0
                  group-hover:w-full
                  transition-all duration-500
                  rounded-t-xl
                "
                style={{ background: "linear-gradient(90deg, #38bdf8aa, transparent)" }}
              />

              {/* Track number */}
              <span className="block font-mono text-xs text-[#38bdf8]/30 tracking-widest mb-4 uppercase">
                Track {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="text-xl md:text-2xl mb-4 font-mono text-[#38bdf8] leading-snug">
                {track.name}
              </h3>
              <p className="text-sm leading-relaxed font-['Space_Grotesk',sans-serif] text-[#94a3b8] relative z-10">
                {track.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={wipeRef}
        className="section-wipe mt-20 mx-auto"
        style={{ maxWidth: "70%", transform: "scaleX(0)" }}
      />
    </section>
  );
}