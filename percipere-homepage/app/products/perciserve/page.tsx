import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import TextReveal from "@/components/TextReveal";
import ProductCta from "@/components/product/ProductCta";
import ProductHeroBg from "@/components/product/ProductHeroBg";
import SupportFlow from "@/components/product/SupportFlow";
import WorkflowSteps from "@/components/product/WorkflowSteps";
import { PERCISERVE } from "@/lib/products/perciserve";

export const metadata: Metadata = {
  title: "PerciServe — AI-powered SAP support | Percipere",
  description: PERCISERVE.support,
};

export default function PerciServePage() {
  const p = PERCISERVE;

  return (
    <>
      <Nav />
      <main className="product-page product-page--serve">
        <section className="product-hero product-hero--bleed">
          <ProductHeroBg variant="serve" />
          <div className="wrap product-hero-grid">
            <div className="product-hero-copy">
              <p className="eyebrow left">{p.eyebrow}</p>
              <p className="brand-signal product-brand">{p.name}</p>
              <TextReveal
                as="h1"
                className="h1 sm"
                lines={[
                  { text: "Instant L1.", accent: "Instant" },
                  { text: "Context-rich escalation when it matters." },
                ]}
              />
              <p className="lede left product-lede">{p.support}</p>
              <div className="ctas product-ctas">
                <ProductCta href={p.ctaHref} label={p.ctaLabel} />
                <Link href="/#suites" className="btn btn-line">Back to suites</Link>
              </div>
            </div>
            <SupportFlow />
          </div>
        </section>

        <SectionReveal as="section" className="wrap product-section" early>
          <div className="product-split">
            <div>
              <p className="eyebrow left">Problem</p>
              <h2 className="h2">{p.problem.title}</h2>
              <ul className="product-bullets">
                {p.problem.points.map(point => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="product-solution">
              <p className="eyebrow left">Solution</p>
              <h2 className="h2">{p.solution.title}</h2>
              <p>{p.solution.text}</p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal as="section" className="wrap product-section" early>
          <div className="row-head">
            <h2 className="h2">Built for the support path that actually happens</h2>
          </div>
          <p className="section-lede">Resolve routine work instantly. Escalate complex work without losing context.</p>
          <div className="capability-grid">
            {p.capabilities.map((cap, index) => (
              <article key={cap.title} className="capability-tile" style={{ ["--i" as string]: index }}>
                <small>0{index + 1}</small>
                <h3>{cap.title}</h3>
                <p>{cap.text}</p>
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal as="section" className="wrap product-section product-workflow" early>
          <div className="row-head">
            <h2 className="h2">Question → answer or expert handoff</h2>
          </div>
          <p className="section-lede">One journey from the first user question to resolution—and knowledge that compounds.</p>
          <WorkflowSteps steps={p.workflow} />
          <p className="product-note">{p.note}</p>
        </SectionReveal>

        <SectionReveal as="section" className="wrap product-section product-close" early>
          <div className="row-head">
            <h2 className="h2">What changes for the team</h2>
          </div>
          <div className="outcome-grid">
            {p.outcomes.map(item => (
              <article key={item.title} className="outcome-tile">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="product-final">
            <p className="lede left">Want to see where PerciServe would clear L1 in your landscape?</p>
            <div className="ctas product-ctas">
              <ProductCta href={p.ctaHref} label={p.ctaLabel} />
              <Link href="/products/percixpert" className="ulink">See PerciXpert →</Link>
            </div>
          </div>
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
