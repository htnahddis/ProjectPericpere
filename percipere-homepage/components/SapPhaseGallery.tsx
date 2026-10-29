"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import GalleryErrorBoundary from "@/components/GalleryErrorBoundary";
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

function canUseWebGL2() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

/**
 * SAP Activate phases: PhaseRail always visible (readable content).
 * CircularGallery is progressive enhancement — never the sole content path.
 */
export default function SapPhaseGallery({ phases }: { phases: Phase[] }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [galleryOk, setGalleryOk] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    setGalleryOk(!query.matches && canUseWebGL2());
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

  return (
    <div className="sap-gallery">
      {galleryOk ? (
        <GalleryErrorBoundary
          fallback={null}
        >
          <div className="sap-gallery-stage" data-lenis-prevent>
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
          <div className="sap-gallery-detail sap-gallery-detail--sync" aria-live="polite">
            <span className="feature-label">{current.label}</span>
            <h3>{current.title}</h3>
            <p>{current.text}</p>
          </div>
        </GalleryErrorBoundary>
      ) : null}

      {/* Always-on readable phases — never gated on WebGL / intersection */}
      <div className="wrap sap-gallery-fallback">
        <PhaseRail phases={phases} />
      </div>
    </div>
  );
}
