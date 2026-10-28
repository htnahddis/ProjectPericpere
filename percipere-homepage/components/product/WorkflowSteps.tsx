"use client";

import { useEffect, useRef, useState } from "react";

type Step = { step: string; title: string; text: string };

export default function WorkflowSteps({ steps }: { steps: readonly Step[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) {
      setActive(steps.length - 1);
      return;
    }

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.step);
        if (!Number.isNaN(index)) setActive(index);
      },
      { root: null, rootMargin: "-28% 0px -42% 0px", threshold: [0.2, 0.5, 0.8] }
    );
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [reduceMotion, steps.length]);

  return (
    <div ref={rootRef} className={`workflow-steps${reduceMotion ? " is-static" : ""}`}>
      <ol className="workflow-list">
        {steps.map((item, index) => (
          <li
            key={item.step}
            data-step={index}
            className={`workflow-item${index <= active ? " is-on" : ""}`}
          >
            <span className="workflow-index">{item.step}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
