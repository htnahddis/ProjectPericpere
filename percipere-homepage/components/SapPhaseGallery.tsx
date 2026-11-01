"use client";

import { useEffect, useMemo, useState } from "react";
import MagicBento, { type MagicBentoItem } from "@/components/MagicBento";

type Phase = {
  label: string;
  title: string;
  text: string;
};

const PHASE_VISUALS = ["analytics", "automation", "collaboration", "dashboard"] as const;

/**
 * SAP Activate as a white MagicBento — one cell per phase,
 * Percipere glow tokens, reduced-motion safe.
 */
export default function SapPhaseGallery({ phases }: { phases: Phase[] }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  const items = useMemo<MagicBentoItem[]>(
    () =>
      phases.map((phase, index) => ({
        id: phase.label,
        label: phase.label,
        title: phase.title,
        description: phase.text,
        visual: PHASE_VISUALS[index % PHASE_VISUALS.length],
        colSpan: 1,
        rowSpan: 1,
      })),
    [phases]
  );

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

      <div className="sap-magic-bento">
        <MagicBento
          items={items}
          columns={4}
          rowHeight={200}
          gap={12}
          radius={20}
          theme="light"
          glowColor="#00B7FF"
          textAutoHide={false}
          enableBorderGlow
          enableSpotlight
          spotlightRadius={300}
          enableStars={false}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          intro={!reduceMotion}
          disableAnimations={reduceMotion}
          className="sap-magic-bento__grid"
        />
      </div>
    </div>
  );
}
