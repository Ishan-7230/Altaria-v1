"use client";

import { useState, useEffect } from "react";
import { useSite } from "./SiteContext";

const TRACKS = [
  { id: "cyber", label: "Cybersecurity" },
  { id: "blockchain", label: "Web3/Blockchain" },
  { id: "iot", label: "IoT" },
];

const TEAMS = {
  blockchain: [
    { id: "b1", name: "Data Dominator" },
    { id: "b2", name: "VeriShield" },
    { id: "b3", name: "Draconyx" },
    { id: "b4", name: "AIM" },
    { id: "b5", name: "Heapify" },
    { id: "b6", name: "Caffeine & Code" },
    { id: "b7", name: "BlackOps" },
    { id: "b8", name: "Blockforge" },
    { id: "b9", name: "SignalChain" },
    { id: "b10", name: "FoodChain Coders" },
    { id: "b11", name: "High_on_Caffeine" },
    { id: "b12", name: "Why Vice?" },
    { id: "b13", name: "DualCore" },
    { id: "b14", name: "Sudo su" },
    { id: "b15", name: "RAT_Chain" },
    { id: "b16", name: "Zero Trace" },
    { id: "b17", name: "Audit_this" },
    { id: "b18", name: "TEAM LRYSS" },
    { id: "b19", name: "Team A.Κ.Α" },
    { id: "b20", name: "DataForge" },
  ],
  cyber: [
    { id: "c1", name: "TEAMOF3" },
    { id: "c2", name: "Goal Diggers" },
    { id: "c3", name: "Old_M8nkZ" },
    { id: "c4", name: "chaos.exe" },
    { id: "c5", name: "HeisenbergOnCall" },
    { id: "c6", name: "Ligma Firewall" },
    { id: "c7", name: "$ystem_Binary" },
    { id: "c8", name: "RedxBlue" },
    { id: "c9", name: "Team AI Shield" },
    { id: "c10", name: "Three-engineers" },
    { id: "c11", name: "ZeroDay" },
    { id: "c12", name: "AegixChain" },
    { id: "c13", name: "Nether Navigator" },
    { id: "c14", name: "JioUnlimited" },
    { id: "c15", name: "Cipher minds" },
    { id: "c16", name: "RedLens" },
    { id: "c17", name: "TMN" },
    { id: "c18", name: "CensorBoard" },
    { id: "c19", name: "Red hat pirates" },
    { id: "c20", name: "Hexara" },
  ],
  iot: [
    { id: "i1", name: "Cognify grid" },
    { id: "i2", name: "CODE CRAFTERS" },
    { id: "i3", name: "ABHYUDAYINAH" },
    { id: "i4", name: "Maverick Tech" },
    { id: "i5", name: "TRYANUKA" },
    { id: "i6", name: "AquaTech" },
    { id: "i7", name: "ai007" },
    { id: "i8", name: "SpongeBob" },
    { id: "i9", name: "G-14 Classified" },
    { id: "i10", name: "Toggle" },
    { id: "i11", name: "Faaaahh" },
    { id: "i12", name: "Warriors" },
    { id: "i13", name: "The Sensor Sentinels" },
    { id: "i14", name: "She shielders" },
    { id: "i15", name: "Triple Paneer Roll" },
    { id: "i16", name: "Hack Ninjas" },
    { id: "i17", name: "Vital-Copilot" },
    { id: "i18", name: "CODE BLUES" },
    { id: "i19", name: "Electra" },
    { id: "i20", name: "Vigilant Wheels" },
  ],
};


const CybersecGrid = ({ teams }) => {
  const [revealStates, setRevealStates] = useState(Array(teams.length).fill(0)); // 0: CLOSED, 1: GRANTED, 2: REVEALED

  useEffect(() => {
    let timeouts = [];
    teams.forEach((_, i) => {
      // Staggered port knocking
      const baseDelay = i * 50;
      timeouts.push(setTimeout(() => {
        setRevealStates(prev => {
          const next = [...prev];
          next[i] = 1;
          return next;
        });
      }, baseDelay));

      timeouts.push(setTimeout(() => {
        setRevealStates(prev => {
          const next = [...prev];
          next[i] = 2;
          return next;
        });
      }, baseDelay + 150));
    });

    return () => timeouts.forEach(clearTimeout);
  }, [teams]);

  return (
    <div className="telemetry-grid">
      {teams.map((team, i) => {
        const state = revealStates[i];
        return (
          <div key={team.id} className="team-card">
            <div className="card-crosshair-1" />
            <div className="card-crosshair-2" />

            {state === 0 && (
              <div className="font-mono text-[#6B8E9B] flex items-center justify-center h-full text-sm">
                [ PORT: CLOSED ]
              </div>
            )}
            {state === 1 && (
              <div className="font-mono text-white flex items-center justify-center h-full text-sm bg-white/10">
                [ ACCESS_GRANTED ]
              </div>
            )}
            {state === 2 && (
              <div className="flex flex-col h-full justify-center animation-fade-in">
                <span className="status-badge">VERIFIED</span>
                <h3 className="team-name">{team.name}</h3>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const BlockchainGrid = ({ teams }) => {
  const [revealed, setRevealed] = useState(Array(teams.length).fill(false));
  const [sweepActive, setSweepActive] = useState(true);


  const hashes = teams.map((_, i) => `0x${Math.random().toString(16).substr(2, 10).toUpperCase()}`);

  useEffect(() => {
    let timeouts = [];
    const columns = 4;

    teams.forEach((_, i) => {
      const col = i % columns;
      const delay = col * 300 + Math.random() * 100; // Sweep across columns with slight randomness
      timeouts.push(setTimeout(() => {
        setRevealed(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, delay));
    });

    timeouts.push(setTimeout(() => setSweepActive(false), columns * 300 + 300));

    return () => timeouts.forEach(clearTimeout);
  }, [teams]);

  return (
    <div className="telemetry-grid relative">
      {sweepActive && <div className="verification-line" />}

      {teams.map((team, i) => {
        const isRevealed = revealed[i];
        return (
          <div key={team.id} className="team-card">
            <div className="card-crosshair-1" />
            <div className="card-crosshair-2" />

            <div className="flex flex-col h-full justify-center">
              {!isRevealed ? (
                <div className="font-mono text-[#00E5FF] opacity-70 text-sm break-all">
                  {hashes[i]}
                </div>
              ) : (
                <div className="animation-text-resolve">
                  <span className="status-badge">VERIFIED</span>
                  <h3 className="team-name">{team.name}</h3>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const IotGrid = ({ teams }) => {
  const [illuminated, setIlluminated] = useState(Array(teams.length).fill(false));

  useEffect(() => {
    let timeouts = [];
    // Assuming 4 columns x 5 rows. Center is around index 9 or 10.
    const centerCol = 1.5;
    const centerRow = 2;
    const columns = 4;

    teams.forEach((_, i) => {
      const col = i % columns;
      const row = Math.floor(i / columns);
      // Calculate distance from center
      const dist = Math.sqrt(Math.pow(col - centerCol, 2) + Math.pow(row - centerRow, 2));

      // Delay based on distance to create ripple
      const delay = dist * 150;

      timeouts.push(setTimeout(() => {
        setIlluminated(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, delay));
    });

    return () => timeouts.forEach(clearTimeout);
  }, [teams]);

  return (
    <div className="telemetry-grid">
      {teams.map((team, i) => {
        const isLit = illuminated[i];
        return (
          <div
            key={team.id}
            className={`team-card iot-card ${isLit ? 'lit' : 'dark'}`}
          >
            <div className="card-crosshair-1" />
            <div className="card-crosshair-2" />

            {isLit && (
              <div className="flex flex-col h-full justify-center animation-fade-in">
                <span className="status-badge">VERIFIED</span>
                <h3 className="team-name">{team.name}</h3>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function Finalists() {
  const { booted } = useSite();
  const [activeTrack, setActiveTrack] = useState("cyber");

  if (!booted) return null;

  return (
    <section id="finalists" className="relative py-24 px-4 md:px-8 bg-[#06080d]">
      <div className="max-w-5xl mx-auto mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold glow-text mb-6 font-['Space_Grotesk',sans-serif] text-white">
          FINALISED TEAMS
        </h2>
        <p className="text-[#6B8E9B] max-w-2xl mx-auto font-mono text-sm uppercase">
          // 60 ELITE SQUADS CLASSIFIED BY TECHNOLOGICAL THEATRE
        </p>
      </div>

      <div className="telemetry-dashboard">
        <div className="track-selector">
          {TRACKS.map((track) => (
            <button
              key={track.id}
              className={`track-tab ${activeTrack === track.id ? "active" : ""}`}
              onClick={() => setActiveTrack(track.id)}
            >
              <span className="muted">//</span> {track.label}
            </button>
          ))}
        </div>

        <div className="mt-4 min-h-[800px]">
          {activeTrack === "cyber" && <CybersecGrid teams={TEAMS.cyber} />}
          {activeTrack === "blockchain" && <BlockchainGrid teams={TEAMS.blockchain} />}
          {activeTrack === "iot" && <IotGrid teams={TEAMS.iot} />}
        </div>
      </div>
    </section>
  );
}
