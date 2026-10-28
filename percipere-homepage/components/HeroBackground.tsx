"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Particles = dynamic(() => import("@/components/Particles"), { ssr: false });

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
      <div className="hero-bg-wash" />
      {ready && !reduceMotion ? (
        <div className="hero-particles">
          <Particles
            particleColors={["#1B1466", "#00B7FF", "#FF00B7", "#6B63C9"]}
            particleCount={160}
            particleSpread={11}
            speed={0.06}
            particleBaseSize={72}
            sizeRandomness={0.85}
            moveParticlesOnHover
            hoverEffect="attract"
            particleHoverFactor={0.7}
            hoverRadius={150}
            connections
            connectionDistance={100}
            glow={0.35}
            twinkle={0.25}
            alphaParticles
            lightMode
            disableRotation={false}
            clickBurst
            opacity={0.85}
            cameraDistance={22}
          />
        </div>
      ) : null}
    </div>
  );
}
