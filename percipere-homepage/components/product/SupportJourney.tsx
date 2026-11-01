"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Attachment01Icon } from "@hugeicons/core-free-icons";
import AnimatedList, { type AnimatedListEntry } from "@/components/AnimatedList";
import BranchedMenu, { type BranchedMenuItem } from "@/components/BranchedMenu";
import LatticeLoader from "@/components/LatticeLoader";
import PromptBar, { type PromptBarSendDetail } from "@/components/PromptBar";
import ThoughtLine from "@/components/ThoughtLine";

type Stage = 1 | 2 | 3 | 4;
type PerciServeOutcome = "resolved" | "not-resolved" | null;
type BusinessItOutcome = "routine" | "complex" | null;

const KNOWLEDGE_SOURCES = [
  "SOP Documentation",
  "User Manuals",
  "Ticketing Knowledge Base",
  "SAP S/4HANA Enhancements and Live Connection",
  "Integration Suite Logs",
];

const SPECIALIST_STEPS: AnimatedListEntry[] = [
  {
    id: "received",
    title: "ESCALATION RECEIVED",
    description: "Full conversation, issue details and suggested root cause are available to the specialist.",
    meta: "01",
  },
  {
    id: "sources",
    title: "INVESTIGATING CONNECTED SOURCES",
    description: "Specialist investigates relevant SAP information, supporting documentation and integration data.",
    meta: "02",
  },
  {
    id: "root-cause",
    title: "IDENTIFYING ROOT CAUSE",
    description: "Specialist analyses the underlying issue and determines the appropriate resolution.",
    meta: "03",
  },
  {
    id: "resolved",
    title: "RESOLVING AND CAPTURING KNOWLEDGE GAPS",
    description: "The issue is resolved and knowledge gaps are identified for future prevention.",
    meta: "04",
  },
];

const PERCI_SERVE_BRANCHES: BranchedMenuItem[] = [
  {
    label: "Was the issue resolved by PerciServe?",
    children: [
      { value: "resolved", label: "Resolved · answer delivered" },
      { value: "not-resolved", label: "Not resolved · needs support" },
    ],
  },
];

const BUSINESS_IT_BRANCHES: BranchedMenuItem[] = [
  {
    label: "Can Business IT resolve this issue?",
    children: [
      { value: "routine", label: "Routine · Business IT resolves" },
      { value: "complex", label: "Complex · SAP specialist" },
    ],
  },
];

export default function SupportJourney() {
  const [stage, setStage] = useState<Stage>(1);
  const [query, setQuery] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [perciServeOutcome, setPerciServeOutcome] = useState<PerciServeOutcome>(null);
  const [businessItOutcome, setBusinessItOutcome] = useState<BusinessItOutcome>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const attachmentResolver = useRef<((files: string[]) => void) | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef(stage);
  const lastScrollActionRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchHandledRef = useRef(false);

  stageRef.current = stage;

  useEffect(() => {
    const input = inputRef.current;
    const handleCancel = () => {
      attachmentResolver.current?.([]);
      attachmentResolver.current = null;
    };
    input?.addEventListener("cancel", handleCancel);
    return () => {
      input?.removeEventListener("cancel", handleCancel);
      handleCancel();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const advanceStage = (direction: 1 | -1) => {
      const currentStage = stageRef.current;
      const nextStage = currentStage + direction;
      if (nextStage < 1 || nextStage > 4) return false;
      if (direction > 0 && currentStage === 3 && perciServeOutcome === "resolved") return false;
      if (direction > 0 && currentStage === 3 && businessItOutcome === "routine") return false;

      if (direction > 0 && currentStage === 2) {
        setPerciServeOutcome((outcome) => outcome ?? "not-resolved");
        setBusinessItOutcome((outcome) => outcome ?? "complex");
      }
      if (direction > 0 && currentStage === 3) {
        setPerciServeOutcome((outcome) => outcome ?? "not-resolved");
        setBusinessItOutcome((outcome) => outcome ?? "complex");
      }
      setStage(nextStage as Stage);
      return true;
    };

    const isInteractiveTarget = (target: EventTarget | null) =>
      target instanceof Element && target.closest("input, textarea, select, button, [role='listbox']");

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 30 || performance.now() - lastScrollActionRef.current < 650) return;
      if (isInteractiveTarget(event.target)) return;
      const direction = event.deltaY > 0 ? 1 : -1;
      if (!advanceStage(direction)) return;
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
      const direction = startY > currentY ? 1 : -1;
      if (!advanceStage(direction)) return;
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
  }, [businessItOutcome, perciServeOutcome]);

  const openFilePicker = () =>
    new Promise<string[]>((resolve) => {
      attachmentResolver.current = resolve;
      inputRef.current?.click();
    });

  const finishFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files ?? []);
    attachmentResolver.current?.(files.map((file) => file.name));
    attachmentResolver.current = null;
    event.currentTarget.value = "";
  };

  const handleSend = (text: string, detail: PromptBarSendDetail) => {
    setQuery(text);
    setAttachments(detail.attachments);
    setPerciServeOutcome(null);
    setBusinessItOutcome(null);
    setStage(2);
  };

  const handlePerciServeChoice = (value: string) => {
    setPerciServeOutcome(value === "resolved" ? "resolved" : "not-resolved");
    setBusinessItOutcome(null);
  };

  const handleBusinessItChoice = (value: string) => {
    setBusinessItOutcome(value === "routine" ? "routine" : "complex");
  };

  const reset = () => {
    setStage(1);
    setQuery("");
    setAttachments([]);
    setPerciServeOutcome(null);
    setBusinessItOutcome(null);
  };

  return (
    <section ref={sectionRef} className="perci-journey" aria-labelledby="perci-journey-title">
      <header className="perci-journey-head">
        <p className="perci-journey-kicker">PerciServe</p>
        <h2 id="perci-journey-title">How PerciServe Works</h2>
        <p>From the first SAP question to expert resolution, every interaction builds knowledge.</p>
        <span>Illustrative walkthrough · no live request or files are sent</span>
        <span className="perci-journey-scroll-hint">Scroll to explore each stage · use the chevrons anytime</span>
      </header>

      <div className="perci-journey-stage" key={stage} aria-live="polite">
        {stage === 1 && (
          <>
            <StageHeading
              number="01"
              title="Ask"
              description="Describe an SAP issue or add useful files."
            />
            <div className="perci-journey-prompt">
              <PromptBar
                className="perci-journey-prompt-bar"
                placeholder="Describe your SAP issue..."
                sources={[
                  {
                    key: "files",
                    name: "Photos & files",
                    description: "Choose screenshots, documents or logs",
                    icon: Attachment01Icon,
                    attach: true,
                  },
                ]}
                commands={[]}
                models={[]}
                efforts={[]}
                onAttach={openFilePicker}
                onSend={handleSend}
                background="#ffffff"
                color="#1b1466"
                menuBackground="#ffffff"
                sparkColor="#ff00b7"
                width={680}
                radius={14}
              />
              <input
                ref={inputRef}
                className="perci-journey-file-input"
                type="file"
                accept="image/*,.pdf,.doc,.docx,.txt,.csv,.log,.json,.xml,.zip"
                multiple
                tabIndex={-1}
                aria-label="Choose screenshots, documents or logs"
                onChange={finishFileSelection}
              />
              <p className="perci-journey-helper">
                {attachments.length > 0
                  ? `${attachments.length} file${attachments.length === 1 ? "" : "s"} selected · stays in this browser`
                  : "Example only · files stay in this browser"}
              </p>
            </div>
            <StageActions
              back={() => setStage(1)}
              next={() => setStage(2)}
              nextLabel="Next stage"
              previousDisabled
            />
          </>
        )}

        {stage === 2 && (
          <>
            <StageHeading
              number="02"
              title="Understand"
              description="Review the knowledge checks and response."
            />
            {query && (
              <p className="perci-journey-query">
                <strong>Example question</strong>
                {query}
              </p>
            )}
            <div className="perci-journey-understand">
              <div className="perci-journey-thought">
                <ThoughtLine
                  label="Example knowledge check"
                  doneLabel="Example workflow"
                  steps={[
                    "Understanding the SAP query",
                    "Checking connected knowledge sources",
                    "Finding relevant information",
                    "Preparing a verified answer",
                  ]}
                  glyph="sparkle"
                  fontSize={16}
                  breathPeriod={1.6}
                  breathDepth={0.45}
                  settleDuration={350}
                  settleBlur={2}
                  collapsible
                  collapseOnSettle={false}
                  working
                  showTimer={false}
                  color="#1b1466"
                  glyphColor="#ff00b7"
                />
              </div>
              <LatticeLoader
                className="perci-journey-lattice"
                status="working"
                label="Illustrative analysis"
                doneLabel="Walkthrough"
                errorLabel="Not connected"
                pattern="orbit"
                grid={3}
                shape="round"
                doneColor="#00b7ff"
                errorColor="#ef4444"
                cellSize={9}
                gap={3}
                fontSize={15}
                step={90}
                idleOpacity={0.15}
                glow={false}
                showTimer={false}
              />
            </div>
            <div className="perci-journey-sources" aria-label="Example knowledge source categories">
              {KNOWLEDGE_SOURCES.map((source) => (
                <span className="perci-journey-source" key={source}>{source}</span>
              ))}
              <p className="perci-journey-source-note">
                Source categories shown for illustration only; availability depends on the customer&apos;s integration.
              </p>
            </div>
            <p className="perci-journey-answer">
              Example only · responses can include relevant references when available.
            </p>
            <StageActions
              back={() => setStage(1)}
              next={() => setStage(3)}
              nextLabel="Explore the routing decision"
            />
          </>
        )}

        {stage === 3 && (
          <>
            <StageHeading
              number="03"
              title="Route"
              description="Choose an outcome to follow the support path."
            />
            {query && (
              <p className="perci-journey-query">
                <strong>Example question</strong>
                {query}
              </p>
            )}
            <div className="perci-journey-route">
              <div className="perci-journey-route-block">
                <h4>PerciServe</h4>
                <BranchedMenu
                  className="perci-journey-branched-menu"
                  items={PERCI_SERVE_BRANCHES}
                  defaultOpen={0}
                  defaultActive={perciServeOutcome ?? "not-selected"}
                  onSelect={handlePerciServeChoice}
                  color="#1b1466"
                  accentColor={perciServeOutcome === "not-resolved" ? "#ff00b7" : "#00b7ff"}
                  lineColor="rgba(27,20,102,.24)"
                  width={350}
                  rowHeight={38}
                  fontSize={13}
                />
              </div>
              {perciServeOutcome === "not-resolved" && (
                <div className="perci-journey-route-block">
                  <h4>Business IT</h4>
                  <BranchedMenu
                    className="perci-journey-branched-menu"
                    items={BUSINESS_IT_BRANCHES}
                    defaultOpen={0}
                    defaultActive={businessItOutcome ?? "not-selected"}
                    onSelect={handleBusinessItChoice}
                    color="#1b1466"
                    accentColor={businessItOutcome === "complex" ? "#ff00b7" : "#00b7ff"}
                    lineColor="rgba(27,20,102,.24)"
                    width={350}
                    rowHeight={38}
                    fontSize={13}
                  />
                </div>
              )}
            </div>
            <StageActions
              back={() => setStage(2)}
              next={() => setStage(4)}
              nextLabel={businessItOutcome === "complex" ? "Continue to expert resolution" : "No further stage"}
              nextDisabled={businessItOutcome !== "complex"}
            />
          </>
        )}

        {stage === 4 && (
          <>
            <StageHeading
              number="04"
              title="Consultant resolves"
              description="An SAP consultant investigates the complex issue and works it through to resolution."
            />
            <div className="perci-journey-expert">
              <AnimatedList
                className="perci-journey-animated-list"
                items={SPECIALIST_STEPS}
                initialSelectedIndex={0}
                selectOnHover={false}
                enableArrowNavigation
                loop={false}
                animation="slide"
                animateOnce
                stagger={0.07}
                showGradients={false}
                displayScrollbar={false}
                frame
                theme="light"
                accentColor="#1b1466"
                radius={8}
                gap={8}
                width="100%"
                maxHeight={420}
                renderItem={(item, _index, isSelected) => {
                  const entry = typeof item === "string" ? { title: item } : item;
                  return (
                    <div className="perci-journey-activity">
                      <span className="perci-journey-activity-marker" aria-hidden="true">
                        {isSelected ? "•" : ""}
                      </span>
                      <span>
                        <strong>{entry.title}</strong>
                        {entry.description && <span>{entry.description}</span>}
                      </span>
                      {entry.meta && <small>{entry.meta}</small>}
                    </div>
                  );
                }}
              />
            </div>
            <div className="perci-journey-end">
              <h4>The SAP consultant addresses the problem</h4>
              <p>The specialist confirms the root cause, resolves the issue, and captures useful knowledge for future support.</p>
            </div>
            <StageActions
              back={() => setStage(3)}
              next={reset}
              nextLabel="Start again"
            />
          </>
        )}
      </div>
    </section>
  );
}

function StageHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="perci-journey-stage-head">
      <div className="perci-journey-stage-heading">
        <small>STAGE {number}</small>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function StageActions({
  back,
  next,
  nextLabel,
  nextDisabled = false,
  previousDisabled = false,
}: {
  back: () => void;
  next: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
  previousDisabled?: boolean;
}) {
  return (
    <div className="perci-journey-actions">
      <button
        className="perci-journey-chevron"
        type="button"
        aria-label="Previous stage"
        onClick={back}
        disabled={previousDisabled}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <button
        className="perci-journey-chevron"
        type="button"
        aria-label={nextLabel}
        onClick={next}
        disabled={nextDisabled}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
      </button>
    </div>
  );
}
