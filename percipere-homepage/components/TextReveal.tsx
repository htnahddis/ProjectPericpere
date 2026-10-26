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
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (trigger !== undefined) return;
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [trigger]);

  let wordIndex = 0;
  const label = lines.map(line => line.text).join(" ");

  return (
    <Tag
      ref={element => { ref.current = element; }}
      className={`text-reveal ${trigger ?? seen ? "in" : ""} ${className}`}
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
