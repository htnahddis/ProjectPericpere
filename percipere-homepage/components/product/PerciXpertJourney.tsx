"use client";

import { useEffect, useRef, useState } from "react";
import Folder, { type FolderEntry } from "@/components/Folder";
import RefineFrame, { type RefineFrameStatus } from "@/components/RefineFrame";
import { PERCIXPERT } from "@/lib/products/percixpert";

type Stage = 1 | 2 | 3 | 4 | 5;
const STAGE_COUNT = PERCIXPERT.workflow.length;

const INVESTIGATION_ITEMS: FolderEntry[] = [
  { title: "Process manuals", description: "AS-IS process steps and ownership" },
  { title: "Workshop notes", description: "Questions, decisions, and open points" },
  { title: "Company SOPs", description: "Controls and documented procedures" },
  { title: "Process hierarchy", description: "L0–L3 areas for focused review" },
];

const REQUIREMENTS = [
  { process: "L1 · Procure to pay", requirement: "Approval workflow", type: "Functional", priority: "Must" },
  { process: "L2 · Record invoice", requirement: "Invoice exception handling", type: "Functional", priority: "Should" },
  { process: "L3 · Review payment", requirement: "Audit trail and access controls", type: "Non-functional", priority: "Must" },
];

const ERP_OPTIONS = ["SAP S/4HANA", "Oracle NetSuite", "Microsoft Dynamics 365", "Acumatica", "Infor"];

const RFP_PREVIEW = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
<rect width="1200" height="800" fill="#f3f4f8"/>
<rect x="176" y="46" width="848" height="708" rx="18" fill="#ffffff"/>
<path d="M176 64a18 18 0 0 1 18-18h812a18 18 0 0 1 18 18v48H176z" fill="#1b1466"/>
<circle cx="210" cy="79" r="7" fill="#ff00b7"/><circle cx="234" cy="79" r="7" fill="#00b7ff"/><circle cx="258" cy="79" r="7" fill="#fff" opacity=".8"/>
<text x="220" y="166" fill="#777" font-family="Arial,sans-serif" font-size="17" letter-spacing="3">ILLUSTRATIVE OUTPUT · FOR REVIEW</text>
<text x="220" y="218" fill="#1b1466" font-family="Arial,sans-serif" font-size="36" font-weight="600">RFP &amp; partner brief</text>
<text x="220" y="253" fill="#626273" font-family="Arial,sans-serif" font-size="18">Evidence-linked requirements and partner selection inputs</text>
<rect x="220" y="296" width="760" height="1" fill="#e5e5eb"/>
<text x="220" y="342" fill="#1b1466" font-family="Arial,sans-serif" font-size="17" font-weight="600">01  Validated requirements</text>
<rect x="220" y="365" width="760" height="44" rx="8" fill="#f7f7fa"/>
<rect x="242" y="381" width="13" height="13" rx="4" fill="#ff00b7"/><rect x="270" y="382" width="350" height="10" rx="5" fill="#d9d9e2"/>
<rect x="220" y="418" width="760" height="44" rx="8" fill="#f7f7fa"/>
<rect x="242" y="434" width="13" height="13" rx="4" fill="#00b7ff"/><rect x="270" y="435" width="470" height="10" rx="5" fill="#d9d9e2"/>
<text x="220" y="514" fill="#1b1466" font-family="Arial,sans-serif" font-size="17" font-weight="600">02  Partner selection discussion</text>
<rect x="220" y="538" width="760" height="76" rx="10" fill="#fbfbfd" stroke="#e5e5eb"/>
<text x="244" y="570" fill="#626273" font-family="Arial,sans-serif" font-size="15">Selection criteria and evidence</text><text x="244" y="595" fill="#626273" font-family="Arial,sans-serif" font-size="15">RFP-ready inputs · consultant-led partner review</text>
<rect x="220" y="650" width="184" height="34" rx="17" fill="#eefaff"/><text x="244" y="673" fill="#1b1466" font-family="Arial,sans-serif" font-size="14">Ready for consultant review</text>
</svg>`;

const RFP_PREVIEW_SRC = `data:image/svg+xml,${encodeURIComponent(RFP_PREVIEW)}`;

export default function PerciXpertJourney() {
  const [stage, setStage] = useState<Stage>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef(stage);
  const lastScrollActionRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchHandledRef = useRef(false);

  stageRef.current = stage;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const advanceStage = (direction: 1 | -1) => {
      const nextStage = stageRef.current + direction;
      if (nextStage < 1 || nextStage > STAGE_COUNT) return false;
      setStage(nextStage as Stage);
      return true;
    };

    const isInteractiveTarget = (target: EventTarget | null) =>
      target instanceof Element && target.closest("input, textarea, select, button, [role='listbox']");

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 30 || performance.now() - lastScrollActionRef.current < 650) return;
      if (isInteractiveTarget(event.target)) return;
      if (!advanceStage(event.deltaY > 0 ? 1 : -1)) return;
      event.preventDefault();
      lastScrollActionRef.current = performance.now();
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (isInteractiveTarget(event.target)) {
        touchStartYRef.current = null;
        return;
      }
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
      touchHandledRef.current = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      if (startY == null || touchHandledRef.current || performance.now() - lastScrollActionRef.current < 650) return;
      const currentY = event.touches[0]?.clientY;
      if (currentY == null || Math.abs(startY - currentY) < 48) return;
      if (!advanceStage(startY > currentY ? 1 : -1)) return;
      event.preventDefault();
      touchHandledRef.current = true;
      lastScrollActionRef.current = performance.now();
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
      touchHandledRef.current = false;
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    section.addEventListener("touchstart", handleTouchStart, { passive: true });
    section.addEventListener("touchmove", handleTouchMove, { passive: false });
    section.addEventListener("touchend", handleTouchEnd);
    section.addEventListener("touchcancel", handleTouchEnd);
    return () => {
      section.removeEventListener("wheel", handleWheel);
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchmove", handleTouchMove);
      section.removeEventListener("touchend", handleTouchEnd);
      section.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  const copy = PERCIXPERT.workflow[stage - 1];

  return (
    <section ref={sectionRef} className="xpert-journey" aria-labelledby="xpert-journey-title">
      <header className="xpert-journey-head">
        <p className="xpert-journey-kicker">PerciXpert</p>
        <h2 id="xpert-journey-title">How PerciXpert Works</h2>
        <p>Company evidence to structured ERP decisions.</p>
        <span>Illustrative walkthrough · sample visuals only</span>
        <span className="xpert-journey-scroll-hint">Scroll to explore · use the chevrons anytime</span>
      </header>

      <div className="xpert-journey-stage" key={stage} aria-live="polite">
        <header className="xpert-journey-stage-head">
          <span>{copy.step} / {String(STAGE_COUNT).padStart(2, "0")}</span>
          <h3>{copy.title}</h3>
          <p>{copy.text}</p>
        </header>

        {stage === 1 && <ConnectAnalyseVisual />}

        {stage === 2 && <InvestigateVisual />}

        {stage === 3 && <FitGapVisual />}

        {stage === 4 && <CompareErpsVisual />}

        {stage === 5 && <RecommendationVisual />}

        <nav className="xpert-journey-actions" aria-label="Walkthrough navigation">
          <button
            className="xpert-journey-chevron"
            type="button"
            aria-label="Previous stage"
            onClick={() => setStage((current) => Math.max(1, current - 1) as Stage)}
            disabled={stage === 1}
          >
            <Chevron direction="left" />
          </button>
          <button
            className="xpert-journey-chevron"
            type="button"
            aria-label="Next stage"
            onClick={() => setStage((current) => Math.min(STAGE_COUNT, current + 1) as Stage)}
            disabled={stage === STAGE_COUNT}
          >
            <Chevron direction="right" />
          </button>
        </nav>
      </div>
    </section>
  );
}

function ConnectAnalyseVisual() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  return (
    <figure className="xpert-connect-visual">
      <video
        key={reduceMotion ? "static" : "motion"}
        className="xpert-connect-video"
        autoPlay={!reduceMotion}
        loop={!reduceMotion}
        muted
        playsInline
        poster="/images/products/futuroot.jpg"
        role="img"
        aria-label="FUTUROOT process intelligence product animation"
      >
        {!reduceMotion && <source src="/media/products/futuroot.mp4" type="video/mp4" />}
      </video>
      <figcaption className="xpert-journey-visual-label">
        FUTUROOT process intelligence · illustrative product view
      </figcaption>
    </figure>
  );
}

function InvestigateVisual() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div className="xpert-investigate">
      <p className="xpert-journey-visual-label">Open the example evidence set to explore investigation inputs</p>
      <Folder
        label="Process evidence"
        items={INVESTIGATION_ITEMS}
        onItemClick={(item) => {
          if (typeof item === "object" && item !== null && "title" in item) {
            setSelectedItem(item.title ?? null);
          }
        }}
        mode="book"
        variant="glass"
        color="#7aa7ff"
        theme="dark"
        size={1.4}
        className="xpert-investigate-folder"
      />
      {selectedItem && <p className="xpert-investigate-selected" aria-live="polite">Selected: {selectedItem}</p>}
    </div>
  );
}

function FitGapVisual() {
  return (
    <div className="xpert-fit-gap" aria-label="Illustrative requirements and ERP Fit-Gap interface">
      <div className="xpert-fit-gap-topline">
        <span>FIT-GAP ASSESSMENT · ILLUSTRATIVE</span>
        <span>Not yet assessed</span>
      </div>
      <div className="xpert-fit-gap-controls">
        <span>Requirements</span>
        <span>Functional · Non-functional</span>
        <span>Process hierarchy · L0–L3</span>
        <span>MoSCoW · Must / Should / Could / Won&apos;t</span>
      </div>
      <div className="xpert-fit-gap-table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Process / requirement</th>
              <th scope="col">Type</th>
              <th scope="col">Priority</th>
              <th scope="col">Assessment</th>
            </tr>
          </thead>
          <tbody>
            {REQUIREMENTS.map((item) => (
              <tr key={item.requirement}>
                <th scope="row"><small>{item.process}</small>{item.requirement}</th>
                <td>{item.type}</td>
                <td><span className="xpert-fit-gap-priority">{item.priority}</span></td>
                <td><span className="xpert-fit-gap-pending">Awaiting validation</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="xpert-journey-visual-label">
        Interface illustration only · no ERP scores or customer assessment results shown.
      </p>
    </div>
  );
}

function CompareErpsVisual() {
  return (
    <div className="xpert-compare">
      <div className="xpert-fit-gap-topline">
        <span>ERP COMPARISON · ILLUSTRATIVE</span>
        <span>One shared requirement set</span>
      </div>
      <div className="xpert-compare-table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Requirement</th>
              {ERP_OPTIONS.map((erp) => <th scope="col" key={erp}>{erp}</th>)}
            </tr>
          </thead>
          <tbody>
            {REQUIREMENTS.map((item) => (
              <tr key={item.requirement}>
                <th scope="row"><small>{item.process}</small>{item.requirement}</th>
                {ERP_OPTIONS.map((erp) => (
                  <td key={erp}><span className="xpert-fit-gap-pending">Not assessed</span></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="xpert-journey-visual-label">
        Comparison layout only · FIT, PARTIAL, and GAP remain unassessed until evidence is reviewed.
      </p>
    </div>
  );
}

function RecommendationVisual() {
  const [status, setStatus] = useState<RefineFrameStatus>("queued");

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStatus("generating"), 700),
      window.setTimeout(() => setStatus("refining"), 1500),
      window.setTimeout(() => setStatus("complete"), 2400),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <div className="xpert-refine-visual">
      <RefineFrame
        status={status}
        aspectRatio="3 / 2"
        width={760}
        radius={20}
        background="#f3f4f8"
        color="#1b1466"
        stageDuration={450}
        sweep
        showStatus
        hideAfter={0}
        labels={{
          queued: "Evidence linked",
          generating: "Structuring outputs",
          refining: "Consultant review",
          complete: "Ready to review",
          error: "Review required",
        }}
        className="xpert-refine-frame"
      >
        <img src={RFP_PREVIEW_SRC} alt="Illustrative RFP and partner selection brief" />
      </RefineFrame>
      <p className="xpert-journey-visual-label">
        Recommendations support consultant review; they do not automatically select an ERP partner.
      </p>
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}
