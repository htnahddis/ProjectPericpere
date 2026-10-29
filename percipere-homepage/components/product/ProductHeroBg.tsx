"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentType } from "react";

const Lightfall = dynamic(() => import("@/components/Lightfall"), {
  ssr: false,
}) as unknown as ComponentType<Record<string, unknown>>;
const FloatingLines = dynamic(() => import("@/components/FloatingLines"), {
  ssr: false,
}) as unknown as ComponentType<Record<string, unknown>>;

type Variant = "xpert" | "serve";

/** Lazy product-hero WebGL; reduced-motion → off. */
export default function ProductHeroBg({ variant }: { variant: Variant }) {
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

  if (!ready || reduceMotion) {
    return <div className="product-hero-bg product-hero-bg--static" aria-hidden="true" />;
  }

  if (variant === "xpert") {
    return (
      <div className="product-hero-bg" aria-hidden="true">
        <div className="product-hero-canvas">
          <Lightfall
            colors={["#00B7FF", "#FFFFFF", "#1B1466"]}
            backgroundColor="#eef1fb"
            speed={0.3}
            streakCount={2}
            streakWidth={0.8}
            twinkle={0.3}
            backgroundGlow={0.1}
            headGlow={0.6}
            bloom={0.35}
            lightMode
            mouseInteraction
            holdToWarp
            intro
          />
        </div>
        <div className="product-hero-wash product-hero-wash--xpert" />
      </div>
    );
  }

  return (
    <div className="product-hero-bg" aria-hidden="true">
      <div className="product-hero-canvas">
        <FloatingLines
          linesGradient={["#FF00B7", "#ffffff"]}
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={10}
          lineDistance={6}
          bendStrength={-0.5}
          interactive
          clickSwirl
          lightMode
          backgroundColor="#ffffff"
          mixBlendMode="normal"
          opacity={0.95}
        />
      </div>
      <div className="product-hero-wash product-hero-wash--serve" />
    </div>
  );
}
