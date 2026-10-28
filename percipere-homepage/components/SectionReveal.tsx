"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Whole-section bottom→top entrance. Once-on-enter; no jitter replay.
 * Content stays in flow (no layout shift); visible if JS / reduced-motion.
 */
export default function SectionReveal({
  children,
  className = "",
  as: Tag = "div",
  id,
  "aria-labelledby": ariaLabelledBy,
  early = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
  "aria-labelledby"?: string;
  /** Fire entrance sooner (e.g. statement band) */
  early?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setReady(true);
      setOn(true);
      return;
    }

    const minRatio = early ? 0.02 : 0.12;
    const rootMargin = early ? "18% 0px 8% 0px" : "0px 0px -12% 0px";
    const threshold = early ? [0.02, 0.08, 0.15] : [0.12, 0.2];

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(([entry]) => {
        setReady(true);
        if (entry.isIntersecting && entry.intersectionRatio >= minRatio) {
          setOn(true);
          observer.disconnect();
        }
      }, { rootMargin, threshold });
      observer.observe(element);
    } catch {
      setReady(true);
      setOn(true);
      return;
    }

    return () => observer.disconnect();
  }, [early]);

  const stateClass = ready ? (on ? "in" : "pending") : "";

  return (
    <Tag
      ref={ref as never}
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`section-reveal ${stateClass} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
