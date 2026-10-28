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
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
  "aria-labelledby"?: string;
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

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(([entry]) => {
        setReady(true);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
          setOn(true);
          observer.disconnect();
        }
      }, { rootMargin: "0px 0px -12% 0px", threshold: [0.12, 0.2] });
      observer.observe(element);
    } catch {
      setReady(true);
      setOn(true);
      return;
    }

    return () => observer.disconnect();
  }, []);

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
