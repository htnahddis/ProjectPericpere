"use client";

import type { CSSProperties } from "react";

const nodes = [
  { name: "SAP", className: "node node-left", style: { left: "10%", top: "32%" } },
  { name: "ERP", className: "node node-mid", style: { left: "29%", top: "58%" } },
  { name: "AI", className: "node node-core", style: { left: "50%", top: "50%" } },
  { name: "Ops", className: "node node-mid", style: { left: "70%", top: "36%" } },
  { name: "Data", className: "node node-right", style: { left: "82%", top: "60%" } },
];

export default function HeroNetwork() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="network-shell">
        <div className="network-grid" />

        <svg className="network-svg" viewBox="0 0 1100 620" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pathGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00B7FF" stopOpacity="0.2" />
              <stop offset="35%" stopColor="#FF00B7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1B1466" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <path className="path path-one" d="M90 160 C 220 110, 300 110, 400 200 S 560 320, 620 250 S 810 120, 980 210" />
          <path className="path path-two" d="M120 430 C 235 390, 320 300, 420 300 S 560 330, 670 250 S 830 190, 1010 360" />
          <path className="path path-three" d="M170 200 C 240 260, 280 340, 370 360 S 560 370, 640 330 S 810 240, 950 270" />
        </svg>

        <div className="network-panel panel-left">
          <span>Enterprise context</span>
          <strong>12 systems</strong>
        </div>

        <div className="network-panel panel-right">
          <span>Resolution flow</span>
          <strong>94% first-touch</strong>
        </div>

        {nodes.map((node) => (
          <div key={node.name} className={node.className} style={node.style as CSSProperties}>
            {node.name}
          </div>
        ))}
      </div>
    </div>
  );
}
