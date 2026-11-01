"use client";

import { useState } from "react";

type Phase = {
  label: string;
  title: string;
  text: string;
};

/**
 * Single SAP Activate section: four phase cards on the left,
 * active detail panel on the right (no stacked gallery).
 */
export default function SapPhaseGallery({ phases }: { phases: Phase[] }) {
  const [active, setActive] = useState(0);
  const current = phases[active] ?? phases[0];

  return (
    <div className="wrap sap-split">
      <div className="sap-split-head">
        <p className="eyebrow left">SAP Activate</p>
        <h2 className="h2" id="transform-title">
          How the ecosystem supports SAP transformation
        </h2>
        <p className="section-lede">
          Across SAP Activate phases, PerciVerse keeps context continuous from discovery through realization.
        </p>
      </div>

      <div className="sap-split-body">
        <div
          className="sap-split-cards"
          role="list"
          aria-label="SAP Activate phases supported by PerciVerse"
        >
          {phases.map((phase, index) => {
            const isActive = active === index;
            return (
              <button
                key={phase.label}
                type="button"
                role="listitem"
                id={`phase-card-${index}`}
                className={`feature-card phase-card sap-split-card ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "true" : undefined}
                aria-controls="sap-phase-detail"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span className="feature-label">{phase.label}</span>
                <h3>{phase.title}</h3>
                <p>{phase.text}</p>
              </button>
            );
          })}
        </div>

        <aside
          id="sap-phase-detail"
          className="sap-split-detail"
          aria-live="polite"
          aria-labelledby={`phase-card-${active}`}
        >
          <span className="feature-label">{current.label}</span>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
          <p className="sap-split-note">Continuous context across Activate — not a fixed purchase path.</p>
        </aside>
      </div>
    </div>
  );
}
