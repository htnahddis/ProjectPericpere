"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Hyperspeed = dynamic(() => import("@/components/Hyperspeed"), { ssr: false });

/** Brand-tinted trails: magenta/indigo tails, cyan heads (from user props). */
const TAIL_COLORS = ["#FF00B7", "#6750a2", "#d856bf"];
const HEAD_COLORS = ["#00B7FF", "#0e5ea5", "#1B1466"];
const POLE_COLORS = ["#00B7FF"];

/**
 * Lazy Hyperspeed behind the statement band.
 * Mounts only near viewport; reduced-motion → off (static wash only).
 * Pairs with hero Particles — Hyperspeed tears down when far offscreen.
 */
export default function StatementBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [inRange, setInRange] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(query.matches);
    syncMotion();
    query.addEventListener?.("change", syncMotion);
    setReady(true);
    return () => query.removeEventListener?.("change", syncMotion);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduceMotion) {
      setInRange(false);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        setInRange(entries.some(entry => entry.isIntersecting));
      },
      { root: null, rootMargin: "40% 0px", threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const showHyperspeed = ready && !reduceMotion && inRange;

  return (
    <div ref={rootRef} className="statement-bg" aria-hidden="true">
      {showHyperspeed ? (
        <div className="statement-hyperspeed">
          <Hyperspeed
            curve="winding"
            curvature={1.55}
            speed={1}
            boost={3}
            fov={130}
            boostFov={111}
            lanes={6}
            roadWidth={20}
            medianWidth={8}
            density={160}
            trailLength={1.6}
            lightSize={1}
            poles={20}
            dust={590}
            glow={0}
            reflections={0.45}
            roadOpacity={0.1}
            steer={0.15}
            tailColors={TAIL_COLORS}
            headColors={HEAD_COLORS}
            poleColors={POLE_COLORS}
            theme="dark"
            background="transparent"
            interactive
          />
        </div>
      ) : null}
      <div className="statement-bg-wash" />
    </div>
  );
}
