"use client";

import { useEffect, useRef, useState } from "react";
import { ECOSYSTEM_NODES } from "@/lib/data";

export default function Features10() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(motionQuery.matches);
    syncMotion();
    motionQuery.addEventListener?.("change", syncMotion);

    const element = stageRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      setVisible(true);
      return () => motionQuery.removeEventListener?.("change", syncMotion);
    }

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.18 });
      observer.observe(element);
    } catch {
      setVisible(true);
    }

    return () => {
      observer?.disconnect();
      motionQuery.removeEventListener?.("change", syncMotion);
    };
  }, []);

  const shown = visible || reduceMotion;

  return (
    <div
      ref={stageRef}
      className={`orbit-stage ${shown ? "is-in" : "is-pending"}`}
      role="img"
      aria-label="PerciVerse ecosystem with FUTUROOT process intelligence at the centre and four product suites around it"
    >
      <div className={`orbit-shell ${active ? "has-focus" : ""}`} data-active={active ?? undefined}>
        <div className="orbit-ring orbit-ring-outer" />
        <div className="orbit-ring orbit-ring-middle" />
        <div className="orbit-ring orbit-ring-inner" />
        <div className="orbit-spokes" aria-hidden="true">
          {ECOSYSTEM_NODES.map((feature, index) => (
            <span
              key={`spoke-${feature.label}`}
              className={`orbit-spoke ${active === feature.label ? "is-lit" : ""}`}
              style={{
                ["--angle" as string]: `${(360 / ECOSYSTEM_NODES.length) * index}deg`,
                ["--accent" as string]: feature.accent,
                ["--i" as string]: index,
              }}
            />
          ))}
        </div>

        {ECOSYSTEM_NODES.map((feature, index) => (
          <button
            key={feature.label}
            type="button"
            className={`feature-node ${active === feature.label ? "is-active" : ""}`}
            style={{
              ["--angle" as string]: `${(360 / ECOSYSTEM_NODES.length) * index}deg`,
              ["--radius" as string]: `${index % 2 === 0 ? 210 : 250}px`,
              ["--accent" as string]: feature.accent,
              ["--i" as string]: index,
            }}
            onMouseEnter={() => setActive(feature.label)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(feature.label)}
            onBlur={() => setActive(null)}
          >
            {feature.label}
          </button>
        ))}

        <div className={`orbit-core ${active ? "is-linked" : ""}`}>
          <span className="core-kicker">PerciVerse</span>
          <strong>FUTUROOT</strong>
          <small>Process intelligence</small>
        </div>
      </div>
    </div>
  );
}
