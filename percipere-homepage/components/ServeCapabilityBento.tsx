"use client";

import { useEffect, useMemo, useState } from "react";
import MagicBento, { type MagicBentoItem } from "@/components/MagicBento";

type Capability = {
  title: string;
  text: string;
};

const VISUALS = ["automation", "integration", "collaboration", "analytics"] as const;

/**
 * PerciServe capabilities as white MagicBento — homepage SAP stays untouched.
 */
export default function ServeCapabilityBento({
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
      capabilities.map((cap, index) => ({
        id: cap.title,
        label: `0${index + 1}`,
        title: cap.title,
        description: cap.text,
        visual: VISUALS[index % VISUALS.length],
        colSpan: 1,
        rowSpan: 1,
      })),
    [capabilities]
  );

  return (
    <div className="serve-magic-bento">
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
        className="serve-magic-bento__grid"
      />
    </div>
  );
}
