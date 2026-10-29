"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentType } from "react";

const WebThreads = dynamic(() => import("@/components/WebThreads"), {
  ssr: false,
}) as unknown as ComponentType<Record<string, unknown>>;

/**
 * Full-bleed hero WebGL: light-mode WebThreads on white.
 * Brand indigo / magenta / cyan; reduced-motion → wash only.
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
        <div className="hero-threads">
          <WebThreads
            colors={["#1B1466", "#FF00B7", "#00B7FF"]}
            coreColor="#FFFFFF"
            backgroundColor="transparent"
            lightMode
            threadCount={6}
            spread={0.18}
            speed={0.2}
            frequency={5}
            taper={1}
            position={0.5}
            pinch={0.5}
            nodes={1}
            angle={0}
            glow={0.02}
            falloff={0.6}
            thickness={1.1}
            brightness={0.6}
            opacity={1}
            depth={0}
            pulses={0}
            mirror
            shimmer={false}
            fade={0}
            grain={0.05}
            intro
            mouseInteraction
            mouseStrength={0.5}
            pulseOnClick
            paused={false}
          />
        </div>
      ) : null}
      <div className="hero-bg-wash" />
    </div>
  );
}
