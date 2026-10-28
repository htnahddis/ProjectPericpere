"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Hyperspeed = dynamic(() => import("@/components/Hyperspeed"), { ssr: false });

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
        <div className="hero-hyperspeed">
          <Hyperspeed
            curve="gentle"
            curvature={0.45}
            speed={0.65}
            boost={1.8}
            fov={92}
            boostFov={106}
            lanes={4}
            roadWidth={16}
            medianWidth={5}
            density={56}
            trailLength={0.8}
            lightSize={0.65}
            poles={12}
            poleHeight={0.7}
            dust={100}
            glow={0.24}
            reflections={0.12}
            steer={0.08}
            tailColors={["#1B1466", "#FF00B7", "#00B7FF"]}
            headColors={["#00B7FF", "#1B1466"]}
            poleColors={["#00B7FF"]}
            roadColor="#f4f5fa"
            roadOpacity={0.025}
            lineColor="#dfe2ed"
            background="transparent"
            theme="light"
            interactive={false}
          />
        </div>
      ) : null}
      <div className="hero-bg-wash" />
    </div>
  );
}
