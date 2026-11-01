"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";

const OrbitImages = dynamic(() => import("@/components/OrbitImages"), {
  ssr: false,
}) as unknown as ComponentType<Record<string, unknown> & { children?: ReactNode }>;

/** Project-only product stills — no picsum. PerciHub stands in for PerciBot agents. */
const ORBIT_IMAGES = [
  { src: "/images/products/percixpert.jpg", alt: "PerciXpert" },
  { src: "/images/products/perciserve.jpg", alt: "PerciServe" },
  { src: "/images/products/percihub.jpg", alt: "PerciBot" },
  { src: "/images/products/percisuite.jpg", alt: "SAP and ERP applications" },
  { src: "/images/products/futuroot.jpg", alt: "Process intelligence" },
  { src: "/images/workflow.svg", alt: "Integration" },
] as const;

/**
 * Sole ecosystem visual — React Bits OrbitImages (ellipse), brand center.
 * Reduced-motion: paused, no intro.
 */
export default function EcosystemOrbit() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    setReady(true);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  if (!ready) {
    return <div className="ecosystem-orbit-mount ecosystem-orbit-mount--loading" aria-hidden="true" />;
  }

  return (
    <div className="ecosystem-orbit-mount">
      <OrbitImages
        images={[...ORBIT_IMAGES]}
        shape="ellipse"
        radiusX={340}
        radiusY={80}
        rotation={-8}
        duration={30}
        itemSize={90}
        depth={0.6}
        showPath
        pathColor="rgba(27, 20, 102, 0.18)"
        pathWidth={2}
        itemRadius={999}
        shadow={0.22}
        hoverScale={1.06}
        intro={!reduceMotion}
        paused={reduceMotion}
        draggable={!reduceMotion}
        clickToFront={!reduceMotion}
        centerContent={
          <div className="ecosystem-orbit-center">
            <strong>Percipere.ai</strong>
            <span>PerciVerse</span>
          </div>
        }
      />
    </div>
  );
}
