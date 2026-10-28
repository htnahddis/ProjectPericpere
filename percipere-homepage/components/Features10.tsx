"use client";

import { ECOSYSTEM_NODES } from "@/lib/data";

export default function Features10() {
  return (
    <div className="orbit-stage" aria-hidden="true">
      <div className="orbit-shell">
        <div className="orbit-ring orbit-ring-outer" />
        <div className="orbit-ring orbit-ring-middle" />
        <div className="orbit-ring orbit-ring-inner" />

        {ECOSYSTEM_NODES.map((feature, index) => (
          <div
            key={feature.label}
            className="feature-node"
            style={{
              ["--angle" as string]: `${(360 / ECOSYSTEM_NODES.length) * index}deg`,
              ["--radius" as string]: `${index % 2 === 0 ? 210 : 250}px`,
              ["--accent" as string]: feature.accent,
            }}
          >
            {feature.label}
          </div>
        ))}

        <div className="orbit-core">
          <span className="core-kicker">PerciVerse</span>
          <strong>FUTUROOT</strong>
          <small>Process intelligence</small>
        </div>
      </div>
    </div>
  );
}
