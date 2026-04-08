"use client";

import { useSite } from "./SiteContext";

export default function Footer() {
  const { booted } = useSite();

  if (!booted) return null;

  return (
    <footer className="site-footer py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(56,189,248,0.7)" }}>Quick Links</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><a href="#about">About</a></li>
              <li><a href="#tracks">Tracks</a></li>
              <li><a href="#schedule">Schedule</a></li>
              <li><a href="#sponsors">Sponsors</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#venue">Venue</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(56,189,248,0.7)" }}>Contact</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><a href="https://devfolio.co" target="_blank" rel="noopener noreferrer">Register on Devfolio ↗</a></li>
              <li>altaria@dsce.edu.in</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(56,189,248,0.7)" }}>Venue</h4>
            <p className="text-xs leading-relaxed">Dayananda Sagar College of Engineering<br />Shavige Malleshwara Hills, Kumaraswamy Layout<br />Bengaluru, Karnataka 560078</p>
          </div>
        </div>


        <div className="border-t pt-6 mt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ borderColor: "rgba(56,189,248,0.1)" }}>
          <span>© 2026 ALTARIA Hackathon. All rights reserved.</span>
          <a href="https://devfolio.co" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <span>Powered by</span>
            <img
              src="/images/devfolio_logo.png"
              alt="DEVFOLIO LOGO"
              style={{ height: 18 }}
            />
          </a>
          <span>Dayananda Sagar College of Engineering</span>
        </div>
      </div>
    </footer>
  );
}
