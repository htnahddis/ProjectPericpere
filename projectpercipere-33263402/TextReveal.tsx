"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Line = { text: string; accent?: string };

export default function TextReveal({
  as: Tag,
  lines,
  className = "",
  trigger,
}: {
  as: "h1" | "h2";
  lines: Line[];
  className?: string;
  trigger?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (trigger !== undefined) {
      setReady(true);
      return;
    }
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setReady(true);
      setSeen(true);
      return;
    }

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(([entry]) => {
        setReady(true);
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });
      observer.observe(element);
    } catch {
      setReady(true);
      setSeen(true);
      return;
    }

    return () => observer.disconnect();
  }, [trigger]);

  let wordIndex = 0;
  const label = lines.map(line => line.text).join(" ");
  const active = trigger ?? seen;
  const stateClass = ready ? (active ? "in" : "pending") : "";

  return (
    <Tag
      ref={element => { ref.current = element; }}
      className={`text-reveal ${stateClass} ${className}`}
      aria-label={label}
    >
      {lines.map((line, lineIndex) => {
        const accentWords = new Set(line.accent?.split(" ") ?? []);
        return (
          <span className="text-line" aria-hidden="true" key={`${line.text}-${lineIndex}`}>
            {line.text.split(" ").map((word, index) => {
              const delay = wordIndex++ * 55;
              return (
                <span key={`${word}-${index}`}>
                  {index > 0 ? " " : null}
                  <span
                    className={`text-word ${accentWords.has(word) ? "text-accent" : ""}`}
                    style={{ transitionDelay: `${delay}ms`, "--word-delay": `${delay}ms` } as CSSProperties}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
