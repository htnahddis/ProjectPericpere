"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import PhaseRail from "@/components/PhaseRail";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
  ssr: false,
}) as unknown as ComponentType<Record<string, unknown> & { children?: ReactNode }>;

type Phase = {
  label: string;
  title: string;
  text: string;
};

/** Brand product posters — one per Activate phase (no picsum). */
const PHASE_IMAGES = [
  "/images/products/futuroot.jpg",
  "/images/products/percixpert.jpg",
  "/images/products/percihub.jpg",
  "/images/products/perciserve.jpg",
] as const;

/**
 * SAP Activate phases as CircularGallery.
 * Keeps label + title + text visible via active detail panel (no content dropped).
 * Reduced-motion → PhaseRail fallback. Wheel preventDefault coexists with Lenis.
 */
export default function SapPhaseGallery({ phases }: { phases: Phase[] }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    setReady(true);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  const items = useMemo(
    () =>
      phases.map((phase, index) => ({
        image: PHASE_IMAGES[index % PHASE_IMAGES.length],
        text: phase.label,
        description: `${phase.title}. ${phase.text}`,
        alt: `${phase.label}: ${phase.title}`,
      })),
    [phases]
  );

  const current = phases[active] ?? phases[0];

  if (!ready) {
    return <div className="sap-gallery sap-gallery--loading" aria-hidden="true" />;
  }

  if (reduceMotion) {
    return <PhaseRail phases={phases} />;
  }

  return (
    <div className="sap-gallery">
      <div className="sap-gallery-stage">
        <CircularGallery
          items={items}
          bend={3}
          borderRadius={0.05}
          scrollEase={0.05}
          textColor="#1B1466"
          showTitles
          snap
          openOnClick
          intro
          font="500 28px var(--font), system-ui, sans-serif"
          onActiveChange={(index: number) => {
            if (typeof index === "number" && !Number.isNaN(index)) setActive(index);
          }}
          aria-label="SAP Activate phases supported by PerciVerse"
        />
      </div>

      <div className="sap-gallery-detail" aria-live="polite">
        <span className="feature-label">{current.label}</span>
        <h3>{current.title}</h3>
        <p>{current.text}</p>
        <p className="sap-gallery-note">Continuous context across Activate — not a fixed purchase path.</p>
      </div>
    </div>
  );
}
