"use client";

/** Visual: evidence flowing through assessment → ERP decision. */
export default function EvidenceFlow() {
  const nodes = [
    { label: "Evidence", sub: "Process + workshops" },
    { label: "Structure", sub: "AS-IS · requirements" },
    { label: "Fit-Gap", sub: "FIT · Partial · GAP" },
    { label: "Decision", sub: "Compare · RFP" },
  ];

  return (
    <div className="evidence-flow" aria-hidden="true">
      <div className="evidence-flow-track">
        {nodes.map((node, index) => (
          <div key={node.label} className="evidence-node" style={{ ["--i" as string]: index }}>
            <span className="evidence-dot" />
            <strong>{node.label}</strong>
            <small>{node.sub}</small>
            {index < nodes.length - 1 ? <span className="evidence-pipe" /> : null}
          </div>
        ))}
      </div>
      <p className="evidence-caption">
        <span>FUTUROOT</span> shows where to look · <span>PerciXpert</span> decides what to do
      </p>
    </div>
  );
}
