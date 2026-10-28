"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LightTunnel = dynamic(() => import("@/components/LightTunnel"), { ssr: false });

/**
 * Single WebGL hero canvas: LightTunnel on a white stage.
 * Cyan cables + magenta pulses + soft indigo tint; reduced-motion → wash only.
 */
export default function HeroBackground() {
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

  return (
    <div className="hero-bg" aria-hidden="true">
      {ready && !reduceMotion ? (
        <div className="hero-tunnel">
          <LightTunnel
            cableColor="#00B7FF"
            pulseColor="#FF00B7"
            tunnelColor="#1B1466"
            tunnelOpacity={0.04}
            cableCount={56}
            pulseDensity={0.5}
            flowDirection="inward"
            mouseInteraction
            clickSurge
            lightMode
            brightness={1}
            glow={0.75}
            opacity={1}
            colorVariance
          />
        </div>
      ) : null}
      <div className="hero-bg-wash" />
    </div>
  );
}
