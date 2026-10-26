"use client";
import { useState } from "react";

const TABS = ["PerciServe", "PerciXpert", "PerciHub"];
const LOG = [
  { t: "10:42", m: "Transport failed in QA — dump analysed", s: "Root cause found" },
  { t: "10:31", m: "Config drift detected", s: "Insight ready" },
];

export default function Dashboard() {
  const [tab, setTab] = useState("PerciXpert");
  return (
    <div className="dash">
      <span className="float f1">24/7 auto-resolve</span>
      <span className="float f2">Root cause found</span>
      <div className="dash-tabs" role="tablist" aria-label="Product views">
        {TABS.map(t => <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t}</button>)}
      </div>
      <div className="dash-head"><span className="dot" /> {tab} — implementation intel<span className="chip">Investigate</span></div>
      <div className="kpis">
        {[["Investigations","14"],["Root causes","9"],["Hours saved","36h"]].map(([l,v]) =>
          <div key={l} className="kpi"><small>{l}</small><b>{v}</b></div>)}
      </div>
      <div className="chart">
        <small>Root-cause confidence</small>
        <svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden>
          <path d="M0 40 L60 38 L120 42 L180 36 L240 44 L300 40 L360 46 L420 50 L480 42 L540 40 L600 38" fill="none" stroke="#1B1466" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="draw" pathLength={1} />
        </svg>
      </div>
      <div className="log"><small>Live activity</small>
        {LOG.map(l => <div key={l.t} className="log-row"><span>{l.t}</span><span>{l.m}</span><em>{l.s}</em></div>)}
      </div>
    </div>
  );
}
