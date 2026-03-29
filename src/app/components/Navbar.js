"use client";

import { useState, useEffect } from "react";
import { useSite } from "./SiteContext";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Tracks", href: "#tracks" },
  { label: "Schedule", href: "#schedule" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
  { label: "Venue", href: "#venue" },
];

const DEVFOLIO_URL = "https://devfolio.co";

export default function Navbar() {
  const { booted } = useSite();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick(e, href) {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  if (!booted) return null;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-14">
          <a href="#hero" onClick={e => handleClick(e, "#hero")} className="text-lg md:text-xl text-white tracking-wider font-['NTVoyager',serif]">
            ALTARIA
          </a>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={e => handleClick(e, l.href)} className="nav-link text-xs uppercase tracking-wider text-[#94a3b8] hover:text-[#38bdf8] font-mono">{l.label}</a>
            ))}
            <a href={DEVFOLIO_URL} target="_blank" rel="noopener noreferrer" className="nav-cta px-4 py-1.5 text-xs rounded uppercase tracking-wider text-[#38bdf8] font-mono">Register</a>
          </div>

          <button className="md:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span className={`block w-5 h-px bg-white transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}/>
            <span className={`block w-5 h-px bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}/>
            <span className={`block w-5 h-px bg-white transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}/>
          </button>
        </div>
      </nav>

      <div className={`mobile-nav fixed inset-0 z-[55] flex flex-col items-center justify-center gap-8 md:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} onClick={e => handleClick(e, l.href)} className="nav-link text-xl text-white/70 hover:text-[#38bdf8] uppercase tracking-widest font-mono">{l.label}</a>
        ))}
        <a href={DEVFOLIO_URL} target="_blank" rel="noopener noreferrer" className="nav-cta px-8 py-3 text-base rounded uppercase tracking-widest mt-4 text-[#38bdf8] font-mono">Register</a>
      </div>
    </>
  );
}
