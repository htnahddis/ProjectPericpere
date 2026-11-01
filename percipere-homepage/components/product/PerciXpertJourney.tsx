"use client";

import { useEffect, useRef, useState } from "react";
import FolderFloat from "@/components/FolderFloat";
import PaperCrumple, { type PaperCrumpleState } from "@/components/PaperCrumple";
import RefineFrame, { type RefineFrameStatus } from "@/components/RefineFrame";

type Stage = 1 | 2 | 3 | 4;

const INPUT_DOCUMENTS = [
  "Company SOPs",
  "Process manuals",
  "Meeting transcripts",
  "Workshop notes",
  "Connected data",
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
<text x="220" y="218" fill="#1b1466" font-family="Arial,sans-serif" font-size="36" font-weight="600">ERP requirements brief</text>
<text x="220" y="253" fill="#626273" font-family="Arial,sans-serif" font-size="18">Evidence-linked requirements and assessment inputs</text>
<rect x="220" y="296" width="760" height="1" fill="#e5e5eb"/>
<text x="220" y="342" fill="#1b1466" font-family="Arial,sans-serif" font-size="17" font-weight="600">01  Validated requirements</text>
<rect x="220" y="365" width="760" height="44" rx="8" fill="#f7f7fa"/>
<rect x="242" y="381" width="13" height="13" rx="4" fill="#ff00b7"/><rect x="270" y="382" width="350" height="10" rx="5" fill="#d9d9e2"/>
<rect x="220" y="418" width="760" height="44" rx="8" fill="#f7f7fa"/>
<rect x="242" y="434" width="13" height="13" rx="4" fill="#00b7ff"/><rect x="270" y="435" width="470" height="10" rx="5" fill="#d9d9e2"/>
<text x="220" y="514" fill="#1b1466" font-family="Arial,sans-serif" font-size="17" font-weight="600">02  Fit-Gap findings and recommendations</text>
<rect x="220" y="538" width="760" height="76" rx="10" fill="#fbfbfd" stroke="#e5e5eb"/>
<text x="244" y="570" fill="#626273" font-family="Arial,sans-serif" font-size="15">Assessment evidence</text><text x="244" y="595" fill="#626273" font-family="Arial,sans-serif" font-size="15">Future-state process · RFP-ready inputs · Partner discussion</text>
<rect x="220" y="650" width="184" height="34" rx="17" fill="#eefaff"/><text x="244" y="673" fill="#1b1466" font-family="Arial,sans-serif" font-size="14">Ready for consultant review</text>
</svg>`;

const RFP_PREVIEW_SRC = `data:image/svg+xml,${encodeURIComponent(RFP_PREVIEW)}`;

const STAGE_COPY: Record<Stage, { title: string; description: string }> = {
  1: {
    title: "Connect & Read",
    description:
      "PerciXpert reads company documents and workshop information to establish an evidence base. FUTUROOT separately provides process intelligence.",
  },
  2: {
    title: "Map & Pinpoint",
    description:
      "Turn fragmented information into AS-IS process flows and focused, evidence-led workshops—reducing manual preparation, not workshops.",
  },
  3: {
    title: "Build & Assess",
    description:
      "Convert validated workshop findings into prioritised requirements, then assess ERP options against the same business needs.",
  },
  4: {
    title: "Recommend & Generate",
    description:
      "Build practical recommendations, future-state processes and RFP-ready inputs from reviewed evidence for the consulting team.",
  },
};

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
      if (nextStage < 1 || nextStage > 4) return false;
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

  const copy = STAGE_COPY[stage];

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
          <span>0{stage} / 04</span>
          <h3>{copy.title}</h3>
          <p>{copy.description}</p>
        </header>

        {stage === 1 && (
          <div className="xpert-journey-folder" aria-label="Illustrative company evidence inputs">
            <p className="xpert-journey-visual-label">Example evidence inputs</p>
            <FolderFloat
              items={INPUT_DOCUMENTS}
              label="Company evidence"
              sublabel="documents · workshops · information"
              defaultOpen
              closeOnSelect={false}
              physics={false}
              drift={0.35}
              folderColor="#1b1466"
              frontColor="#28217a"
              paperColor="#ffffff"
              itemColor="#ffffff"
              itemTextColor="#1b1466"
              labelColor="#ffffff"
              width={250}
              height={190}
              radius={18}
              spread={120}
              lift={30}
              tilt={5}
            />
          </div>
        )}

        {stage === 2 && <PaperDiscoveryVisual />}

        {stage === 3 && <FitGapVisual />}

        {stage === 4 && <RecommendationVisual />}

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
            onClick={() => setStage((current) => Math.min(4, current + 1) as Stage)}
            disabled={stage === 4}
          >
            <Chevron direction="right" />
          </button>
        </nav>
      </div>
    </section>
  );
}

function PaperDiscoveryVisual() {
  const [revealed, setRevealed] = useState(false);

  const handlePaperState = (state: PaperCrumpleState) => {
    setRevealed(state !== "flat");
  };

  return (
    <div className="xpert-journey-paper" aria-label="Illustrative process discovery transition">
      <div className={`xpert-process-screen${revealed ? " is-revealed" : ""}`}>
        <div className="xpert-process-toolbar">
          <span>PROCESS DISCOVERY · SAMPLE VIEW</span>
          <span>L0 — L3</span>
        </div>
        <div className="xpert-process-content">
          <div className="xpert-process-flow" aria-label="Illustrative AS-IS process flow">
            <span>Purchase request</span><i aria-hidden="true">→</i><span>Review &amp; approve</span><i aria-hidden="true">→</i><span>Record invoice</span>
          </div>
          <div className="xpert-process-details">
            <div>
              <small>PROCESS HIERARCHY</small>
              <strong>Procure to pay</strong>
              <span>L0 · L1 · L2 · L3</span>
            </div>
            <div>
              <small>PINPOINTED FOR DISCUSSION</small>
              <strong>Manual invoice review</strong>
              <span>Review workshop evidence and decisions</span>
            </div>
            <div>
              <small>WORKSHOP QUESTION &amp; DECISION</small>
              <strong>Where does manual review repeat?</strong>
              <span>Decision: validate controls with the process owner</span>
            </div>
            <div>
              <small>SOURCE EVIDENCE</small>
              <strong>Workshop notes · SOP</strong>
              <span>Illustrative inputs · not customer data</span>
            </div>
          </div>
        </div>
      </div>
      <div className="xpert-paper-sheet">
        <PaperCrumple
          src="/images/products/percixpert.jpg"
          alt="Illustrative business documents and spreadsheet inputs"
          width={500}
          height={360}
          sceneHeight={340}
          imageFit="cover"
          releaseBehavior="stay"
          crumpleAmount={0.92}
          crumpleDuration={620}
          releaseDuration={420}
          foldCount={18}
          wrinkleDepth={0.58}
          paperTexture={0.42}
          draggable
          returnToOrigin
          resetKey="process-discovery"
          onStateChange={handlePaperState}
          className="xpert-paper-crumple"
        />
      </div>
      <p className="xpert-journey-visual-label">
        Optional: hold and drag the example sheet to reveal the structured process view.
      </p>
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
              {ERP_OPTIONS.map((erp) => <th scope="col" key={erp}>{erp}</th>)}
            </tr>
          </thead>
          <tbody>
            {REQUIREMENTS.map((item) => (
              <tr key={item.requirement}>
                <th scope="row"><small>{item.process}</small>{item.requirement}</th>
                <td>{item.type}</td>
                <td><span className="xpert-fit-gap-priority">{item.priority}</span></td>
                {ERP_OPTIONS.map((erp) => (
                  <td key={erp}><span className="xpert-fit-gap-pending">Not assessed</span></td>
                ))}
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
        <img src={RFP_PREVIEW_SRC} alt="Illustrative evidence-linked ERP requirements brief" />
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
