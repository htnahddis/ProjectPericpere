"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  { text: "Enterprise complexity. Clearer decisions.", accent: "strong" },
  { text: "Connect fragmented knowledge,", accent: "none" },
  { text: "repetitive support and disconnected", accent: "none" },
  { text: "processes through practical enterprise AI.", accent: "soft" },
] as const;

export default function StatementReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(motionQuery.matches);
    updateMotionPreference();
    motionQuery.addEventListener?.("change", updateMotionPreference);

    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) {
      setActive(true);
      return () => motionQuery.removeEventListener?.("change", updateMotionPreference);
    }

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(([entry]) => {
        setActive(entry.isIntersecting);
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });
      observer.observe(element);
    } catch {
      setActive(true);
      return () => motionQuery.removeEventListener?.("change", updateMotionPreference);
    }

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener?.("change", updateMotionPreference);
    };
  }, []);

  let wordIndex = 0;

  return (
    <div ref={ref} className={`statement-reveal ${active || reduceMotion ? "is-active" : ""}`}>
      <svg className="statement-globe" viewBox="0 0 600 600" aria-hidden="true">
        <circle cx="300" cy="300" r="270" />
        <ellipse cx="300" cy="300" rx="190" ry="270" />
        <ellipse cx="300" cy="300" rx="88" ry="270" />
        <ellipse cx="300" cy="300" rx="270" ry="190" />
        <ellipse cx="300" cy="300" rx="270" ry="88" />
        <path d="M30 300h540M64 165h472M64 435h472" />
      </svg>
      <p className="statement-copy" aria-label={LINES.map(line => line.text).join(" ")}>
        {LINES.map((line, lineIndex) => {
          const words = line.text.split(" ");
          return (
            <span className="statement-line" key={lineIndex} aria-hidden="true">
              {words.map((word, index) => {
                const delay = wordIndex++ * 75;
                const isFinalAccent = line.accent === "soft" && index > 1;
                const isLeadAccent = line.accent === "strong" && index > 1;

                return (
                  <span className="statement-word-wrap" key={`${word}-${index}`}>
                    {index > 0 ? " " : null}
                    <span
                      className={`statement-word${isLeadAccent ? " statement-word-strong" : ""}${isFinalAccent ? " statement-word-soft" : ""}`}
                      style={{ transitionDelay: `${delay}ms` }}
                    >
                      {word}
                    </span>
                  </span>
                );
              })}
            </span>
          );
        })}
      </p>
    </div>
  );
}
