"use client";

import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

const LINES = [
  { text: "One PerciVerse. Clearer decisions.", lead: true, depth: 0 },
  { text: "Connect implementation, operations,", lead: false, depth: 1 },
  { text: "and support through shared process", lead: false, depth: 2 },
  { text: "intelligence across your SAP journey.", lead: false, depth: 3 },
] as const;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Scroll-linked statement: blur clears at mid-viewport; lines layer with depth.
 * Lenis-aware via useLenis; reduced-motion → sharp, fully visible text.
 */
export default function StatementReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [blurPx, setBlurPx] = useState(0);
  const [clarity, setClarity] = useState(1);
  const [lineProgress, setLineProgress] = useState<number[]>(() => LINES.map(() => 1));

  const measure = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBlurPx(0);
      setClarity(1);
      setLineProgress(LINES.map(() => 1));
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const center = rect.top + rect.height / 2;
    const viewCenter = vh * 0.48;
    // 0 at center, grows as section moves away (enter from below or leave above)
    const offset = Math.abs(center - viewCenter) / (vh * 0.55);
    const away = clamp01(offset);
    // Sharp mid-viewport; soft blur approaching/leaving
    const nextBlur = away * away * 18;
    const nextClarity = 1 - away * 0.55;

    // Section enter progress from bottom (0 below → 1 fully through)
    const enter = clamp01(1 - (rect.bottom - vh * 0.15) / (rect.height + vh * 0.5));
    const lines = LINES.map((_, index) => {
      const start = index * 0.12;
      const span = 0.38;
      return clamp01((enter - start) / span);
    });

    setBlurPx(nextBlur);
    setClarity(nextClarity);
    setLineProgress(lines);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduceMotion(query.matches);
      measure();
    };
    sync();
    query.addEventListener?.("change", sync);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      query.removeEventListener?.("change", sync);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useLenis(() => {
    measure();
  });

  const full = LINES.map(line => line.text).join(" ");

  return (
    <div
      ref={rootRef}
      className={`statement-reveal statement-reveal--xl${reduceMotion ? " is-static" : ""}`}
      style={
        {
          "--stmt-blur": reduceMotion ? "0px" : `${blurPx.toFixed(2)}px`,
          "--stmt-clarity": reduceMotion ? "1" : clarity.toFixed(3),
        } as CSSProperties
      }
    >
      <svg className="statement-globe" viewBox="0 0 600 600" aria-hidden="true">
        <circle cx="300" cy="300" r="270" />
        <ellipse cx="300" cy="300" rx="190" ry="270" />
        <ellipse cx="300" cy="300" rx="88" ry="270" />
        <ellipse cx="300" cy="300" rx="270" ry="190" />
        <ellipse cx="300" cy="300" rx="270" ry="88" />
        <path d="M30 300h540M64 165h472M64 435h472" />
      </svg>

      <p className="statement-copy statement-scroll-copy" aria-label={full}>
        {LINES.map((line, index) => {
          const progress = reduceMotion ? 1 : (lineProgress[index] ?? 1);
          const depth = line.depth;
          const y = (1 - progress) * (28 + depth * 10);
          const z = progress * (12 - depth * 2);
          const scale = 0.96 + progress * 0.04;
          const opacity = 0.2 + progress * 0.8;

          return (
            <span
              key={line.text}
              className={`statement-layer${line.lead ? " is-lead" : ""}`}
              aria-hidden="true"
              style={
                {
                  "--layer-progress": progress.toFixed(3),
                  "--layer-y": `${y.toFixed(2)}px`,
                  "--layer-z": `${z.toFixed(2)}px`,
                  "--layer-scale": scale.toFixed(4),
                  "--layer-opacity": opacity.toFixed(3),
                  "--layer-depth": String(depth),
                  zIndex: 10 - depth,
                } as CSSProperties
              }
            >
              {line.text}
            </span>
          );
        })}
      </p>
    </div>
  );
}
