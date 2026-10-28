"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({ children, delay = 0, className = "" }:
  { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
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
        if (entry.isIntersecting) {
          setOn(true);
          observer.disconnect();
        }
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });
      observer.observe(element);
    } catch {
      setReady(true);
      setOn(true);
      return;
    }

    return () => observer.disconnect();
  }, []);

  const stateClass = ready ? (on ? "in" : "pending") : "";
  return <div ref={ref} className={`reveal ${stateClass} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
