"use client";

import { useEffect, useMemo, useState } from "react";
import MagicBento, { type MagicBentoItem } from "@/components/MagicBento";

type Capability = {
  title: string;
  text: string;
};

const VISUALS = ["analytics", "dashboard", "collaboration", "automation"] as const;

/** Asymmetric spans — not a flat 4-equal row. */
const SPANS: { colSpan: number; rowSpan: number }[] = [
  { colSpan: 2, rowSpan: 2 },
  { colSpan: 2, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 3, rowSpan: 1 },
];

/**
 * PerciXpert “What PerciXpert structures” — white MagicBento with varied cell sizes.
 */
export default function XpertCapabilityBento({
  capabilities,
}: {
  capabilities: readonly Capability[];
}) {
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
      capabilities.map((cap, index) => {
        const span = SPANS[index % SPANS.length];
        return {
          id: cap.title,
          label: `0${index + 1}`,
          title: cap.title,
          description: cap.text,
          visual: VISUALS[index % VISUALS.length],
          colSpan: span.colSpan,
          rowSpan: span.rowSpan,
        };
      }),
    [capabilities]
  );

  return (
    <div className="xpert-magic-bento">
      <MagicBento
        items={items}
        columns={4}
        rowHeight={180}
        gap={12}
        radius={20}
        theme="light"
        glowColor="#1B1466"
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
        className="xpert-magic-bento__grid"
      />
    </div>
  );
}
