"use client";

import type { PointerEvent } from "react";

const INPUTS = [
  { label: "SAP data", x: 126, y: 142, tone: "cyan" },
  { label: "Processes", x: 126, y: 260, tone: "indigo" },
  { label: "Support", x: 126, y: 378, tone: "magenta" },
] as const;

const OUTPUTS = [
  { label: "Decisions", x: 1074, y: 142, tone: "magenta" },
  { label: "Automation", x: 1074, y: 260, tone: "cyan" },
  { label: "Outcomes", x: 1074, y: 378, tone: "indigo" },
] as const;

export default function HeroNetwork() {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--mx", `${x.toFixed(3)}`);
    event.currentTarget.style.setProperty("--my", `${y.toFixed(3)}`);
  };

  const resetPointer = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--mx", "0");
    event.currentTarget.style.setProperty("--my", "0");
  };

  return (
    <div
      className="hero-network"
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="network-status">
        <span className="status-dot" /> Live enterprise context
      </div>
      <svg
        viewBox="0 0 1200 520"
        role="presentation"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M32 0H0V32"
              fill="none"
              stroke="#1B1466"
              strokeOpacity=".1"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="1200" height="520" fill="url(#hero-grid)" />
        <path
          className="network-line network-line-a"
          d="M126 142 C 300 142, 340 222, 478 242"
        />
        <path
          className="network-line network-line-b"
          d="M126 260 C 300 260, 350 260, 478 260"
        />
        <path
          className="network-line network-line-c"
          d="M126 378 C 300 378, 340 298, 478 278"
        />
        <path
          className="network-line network-line-a"
          d="M722 242 C 860 222, 900 142, 1074 142"
        />
        <path
          className="network-line network-line-b"
          d="M722 260 C 850 260, 900 260, 1074 260"
        />
        <path
          className="network-line network-line-c"
          d="M722 278 C 860 298, 900 378, 1074 378"
        />
        <path
          className="network-line network-line-soft"
          d="M126 142 C 340 40, 860 40, 1074 142"
        />
        <path
          className="network-line network-line-soft"
          d="M126 378 C 340 480, 860 480, 1074 378"
        />

        {INPUTS.map((item) => (
          <g className={`network-node node-${item.tone}`} key={item.label}>
            <circle cx={item.x} cy={item.y} r="5" />
            <circle className="node-ring" cx={item.x} cy={item.y} r="12" />
            <text x={item.x + 20} y={item.y + 4}>
              {item.label}
            </text>
          </g>
        ))}
        {OUTPUTS.map((item) => (
          <g className={`network-node node-${item.tone}`} key={item.label}>
            <circle cx={item.x} cy={item.y} r="5" />
            <circle className="node-ring" cx={item.x} cy={item.y} r="12" />
            <text
              className="output-label"
              x={item.x - 20}
              y={item.y + 4}
              textAnchor="end"
            >
              {item.label}
            </text>
          </g>
        ))}

        <g className="network-core">
          <rect x="478" y="192" width="244" height="136" rx="8" />
          <rect
            className="core-rule"
            x="502"
            y="216"
            width="40"
            height="4"
            rx="2"
          />
          <text className="core-kicker" x="502" y="246">
            PERCIPERE.AI
          </text>
          <text className="core-title" x="502" y="276">
            Enterprise intelligence
          </text>
          <text className="core-copy" x="502" y="300">
            Context → action → learning
          </text>
          <circle className="core-pulse" cx="690" cy="222" r="6" />
        </g>
      </svg>
      <div className="network-legend">
        <span>INPUTS</span>
        <i /> <span>INTELLIGENCE LAYER</span>
        <i /> <span>OUTCOMES</span>
      </div>
    </div>
  );
}
