"use client";

const features = [
  { label: "SAP context", accent: "#00B7FF" },
  { label: "Ops flow", accent: "#FF00B7" },
  { label: "Knowledge", accent: "#1B1466" },
  { label: "Automation", accent: "#00B7FF" },
  { label: "Insights", accent: "#FF00B7" },
];

export default function Features10() {
  return (
    <section className="features10 wrap" aria-labelledby="features10-title">
      <div className="features10-copy">
        <p className="eyebrow">Platform intelligence</p>
        <h2 id="features10-title" className="h2">Integrated execution for the modern enterprise.</h2>
        <p className="lede">Percipere connects your SAP ecosystem, operational knowledge, and AI actions into a single decision layer.</p>
      </div>

      <div className="orbit-stage" aria-hidden="true">
        <div className="orbit-shell">
          <div className="orbit-ring orbit-ring-outer" />
          <div className="orbit-ring orbit-ring-middle" />
          <div className="orbit-ring orbit-ring-inner" />

          {features.map((feature, index) => (
            <div
              key={feature.label}
              className="feature-node"
              style={{
                ['--angle' as string]: `${(360 / features.length) * index}deg`,
                ['--radius' as string]: `${index % 2 === 0 ? 210 : 260}px`,
                ['--accent' as string]: feature.accent,
              }}
            >
              {feature.label}
            </div>
          ))}

          <div className="orbit-core">
            <span className="core-kicker">Percipere</span>
            <strong>AI orchestration</strong>
            <small>Context → Action → Learning</small>
          </div>
        </div>
      </div>
    </section>
  );
}
