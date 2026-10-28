"use client";

import BlurText from "@/components/BlurText";

const LINES = [
  { text: "One PerciVerse. Clearer decisions.", lead: true },
  { text: "Connect implementation, operations," },
  { text: "and support through shared process" },
  { text: "intelligence across your SAP journey." },
];

/**
 * Dominant statement band — large type + obvious BlurText entrance.
 * Responsive clamp keeps it readable on mobile while still hero-scale.
 */
export default function StatementReveal() {
  const full = LINES.map(line => line.text).join(" ");

  return (
    <div className="statement-reveal statement-reveal--xl">
      <svg className="statement-globe" viewBox="0 0 600 600" aria-hidden="true">
        <circle cx="300" cy="300" r="270" />
        <ellipse cx="300" cy="300" rx="190" ry="270" />
        <ellipse cx="300" cy="300" rx="88" ry="270" />
        <ellipse cx="300" cy="300" rx="270" ry="190" />
        <ellipse cx="300" cy="300" rx="270" ry="88" />
        <path d="M30 300h540M64 165h472M64 435h472" />
      </svg>
      <div className="statement-copy" aria-label={full}>
        {LINES.map((line, index) => (
          <div
            key={line.text}
            className={`statement-blur-wrap${line.lead ? " is-lead" : ""}`}
            style={{ transitionDelay: `${index * 120}ms` }}
          >
            <BlurText
              className="statement-blur-line"
              text={line.text}
              delay={line.lead ? 90 : 70}
              animateBy="words"
              direction="bottom"
              effect={line.lead ? "blur" : "focus"}
              blur={line.lead ? 16 : 12}
              distance={line.lead ? 32 : 22}
              stepDuration={0.34}
              trigger="view"
              color={line.lead ? "#1B1466" : "#171717"}
              fromColor="#c8c8d4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
