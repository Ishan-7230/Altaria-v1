import "./globals.css";

export const metadata = {
  title: "ALTARIA V1 — 24 Hours of Beautiful Chaos",
  description:
    "ALTARIA V1 is a 24-hour hackathon at Dayananda Sagar College of Engineering, Bengaluru. Compete in IoT+AI, Cybersecurity+AI, and Web3+AI tracks. ₹50,000+ in prizes. Register now on Devfolio.",
  keywords: [
    "hackathon",
    "ALTARIA",
    "DSCE",
    "Bengaluru",
    "IoT",
    "AI",
    "cybersecurity",
    "blockchain",
    "Web3",
    "college hackathon",
  ],
  openGraph: {
    title: "ALTARIA V1 — 24 Hours of Beautiful Chaos",
    description:
      "A 24-hour hackathon where developers, designers, and dreamers collide. IoT+AI, Cybersecurity+AI, Web3+AI tracks. ₹50,000+ in prizes.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="preload" href="/fonts/Londrina.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/CONEGA.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Nt_Voyager1.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Nt_Voyager2.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
<<<<<<< HEAD
      <body className="min-h-screen flex flex-col">{children}</body>
=======
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
        {/* Devfolio branding — server-rendered for bot verification */}
        <div style={{ padding: "24px 0", textAlign: "center", background: "#06080d" }}>
          <a href="https://devfolio.co" target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/devfolio_logo.png"
              alt="DEVFOLIO LOGO"
              style={{ height: "36px", display: "inline-block" }}
            />
          </a>
        </div>
        {/* Apply with Devfolio button widget — suppressHydrationWarning because SDK modifies the DOM */}
        <div suppressHydrationWarning>
          <div
            className="apply-button"
            data-hackathon-slug="altaria"
            data-button-theme="light"
            style={{ height: "44px", width: "312px", margin: "0 auto 24px" }}
            suppressHydrationWarning
          ></div>
        </div>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script defer async src="https://apply.devfolio.co/v2/sdk.js"></script>
      </body>
>>>>>>> 9dc106fadcdb78196a6337cf6a113dda2201c678
    </html>
  );
}
