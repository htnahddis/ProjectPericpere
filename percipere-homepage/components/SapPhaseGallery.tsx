"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import GalleryErrorBoundary from "@/components/GalleryErrorBoundary";

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

function PhaseFallbackNav({
  phases,
  active,
  onSelect,
}: {
  phases: Phase[];
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav className="sap-split-fallback" aria-label="SAP Activate phases supported by PerciVerse">
      <ol>
        {phases.map((phase, index) => (
          <li key={phase.label}>
            <button
              type="button"
              className={active === index ? "is-active" : ""}
              aria-current={active === index ? "true" : undefined}
              onClick={() => onSelect(index)}
            >
              <span className="feature-label">{phase.label}</span>
              <span className="sap-split-fallback-title">{phase.title}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * One SAP section: CircularGallery (~half width, ~600px) on the left,
 * detail card on the right synced to the active/centered gallery item.
 */
export default function SapPhaseGallery({ phases }: { phases: Phase[] }) {
  const [galleryOk, setGalleryOk] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setGalleryOk(!query.matches && canUseWebGL2());
    sync();
    query.addEventListener?.("change", sync);
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

  const setActiveSafe = (index: number) => {
    if (typeof index === "number" && !Number.isNaN(index)) {
      setActive(((index % phases.length) + phases.length) % phases.length);
    }
  };

  const fallback = (
    <PhaseFallbackNav phases={phases} active={active} onSelect={setActiveSafe} />
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

      <div className="sap-split-body">
        <div className="sap-split-gallery" data-lenis-prevent>
          {galleryOk ? (
            <GalleryErrorBoundary fallback={fallback}>
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
                onActiveChange={setActiveSafe}
                aria-label="SAP Activate phases supported by PerciVerse"
              />
            </GalleryErrorBoundary>
          ) : (
            fallback
          )}
        </div>

        <aside
          id="sap-phase-detail"
          className="sap-split-detail"
          aria-live="polite"
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
