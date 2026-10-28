"use client";

import { useState } from "react";

type Phase = {
  label: string;
  title: string;
  text: string;
};

/**
 * Light Activate-phase rail — shows continuous context across phases
 * without a wizard footer or fixed-order "next step" implication.
 * (Bits Stepper skipped: Hugeicons deps + complete/continue flow.)
 */
export default function PhaseRail({ phases }: { phases: Phase[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="phase-flow">
      <nav className="phase-rail" aria-label="SAP Activate phases supported by PerciVerse">
        <ol className="phase-rail-list">
          {phases.map((phase, index) => {
            const isActive = active === index;
            return (
              <li key={phase.label} className="phase-rail-item">
                {index > 0 ? <span className="phase-rail-connector" aria-hidden="true" /> : null}
                <button
                  type="button"
                  className={`phase-rail-node ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "step" : undefined}
                  aria-controls={`phase-card-${index}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <span className="phase-rail-index">{index + 1}</span>
                  <span className="phase-rail-label">{phase.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="phase-rail-note">Continuous context across Activate — not a fixed purchase path.</p>
      </nav>

      <div className="feature-grid phase-grid">
        {phases.map((phase, index) => (
          <article
            key={phase.label}
            id={`phase-card-${index}`}
            className={`feature-card phase-card ${active === index ? "is-active" : ""}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            tabIndex={0}
          >
            <span className="feature-label">{phase.label}</span>
            <h3>{phase.title}</h3>
            <p>{phase.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
