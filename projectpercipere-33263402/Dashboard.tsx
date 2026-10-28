"use client";

import { useEffect, useRef, useState } from "react";

const TAB_DATA = {
  PerciServe: {
    title: "support intelligence",
    metrics: [
      ["Resolved first touch", "82%"],
      ["Context retained", "100%"],
      ["Hours saved", "36h"],
    ],
    log: "Resolution path assembled",
  },
  PerciXpert: {
    title: "implementation intel",
    metrics: [
      ["Investigations", "14"],
      ["Root causes", "9"],
      ["Hours saved", "36h"],
    ],
    log: "Transport failed in QA — dump analysed",
  },
  PerciHub: {
    title: "enterprise knowledge",
    metrics: [
      ["Sources connected", "28"],
      ["Signals indexed", "4.8k"],
      ["Answers grounded", "97%"],
    ],
    log: "Config drift detected — insight ready",
  },
} as const;

const TABS = Object.keys(TAB_DATA) as Array<keyof typeof TAB_DATA>;
const LOG = [
  {
    t: "10:42",
    m: "Transport failed in QA — dump analysed",
    s: "Root cause found",
  },
  { t: "10:31", m: "Config drift detected", s: "Insight ready" },
];

export default function Dashboard() {
  const [tab, setTab] = useState<keyof typeof TAB_DATA>("PerciXpert");
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = TAB_DATA[tab];

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setEntered(true);
      return;
    }

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEntered(true);
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
      );
      observer.observe(element);
    } catch {
      setEntered(true);
      return;
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`dash ${entered ? "in" : "pending"}`}>
      <span className="float f1">24/7 auto-resolve</span>
      <span className="float f2">Root cause found</span>
      <div className="dash-tabs" role="tablist" aria-label="Product views">
        {TABS.map((item) => (
          <button
            key={item}
            role="tab"
            aria-selected={tab === item}
            className={tab === item ? "on" : ""}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="dash-head">
        <span className="dot" /> {tab} — {active.title}
        <span className="chip">Investigate</span>
      </div>
      <div className="kpis">
        {active.metrics.map(([label, value]) => (
          <div key={label} className="kpi">
            <small>{label}</small>
            <b>{value}</b>
          </div>
        ))}
      </div>
      <div className="chart">
        <small>Root-cause confidence</small>
        <svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden>
          <path
            d="M0 40 L60 38 L120 42 L180 36 L240 44 L300 40 L360 46 L420 50 L480 42 L540 40 L600 38"
            fill="none"
            stroke="#1B1466"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            className="draw"
            pathLength={1}
          />
        </svg>
      </div>
      <div className="log">
        <small>Live activity</small>
        {LOG.map((item, index) => (
          <div key={item.t} className="log-row">
            <span>{item.t}</span>
            <span>{index === 0 ? active.log : item.m}</span>
            <em>{item.s}</em>
          </div>
        ))}
      </div>
    </div>
  );
}
