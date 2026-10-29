import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import TextReveal from "@/components/TextReveal";
import EvidenceFlow from "@/components/product/EvidenceFlow";
import ProductCta from "@/components/product/ProductCta";
import ProductHeroBg from "@/components/product/ProductHeroBg";
import WorkflowSteps from "@/components/product/WorkflowSteps";
import { PERCIXPERT } from "@/lib/products/percixpert";

export const metadata: Metadata = {
  title: "PerciXpert — Evidence-led ERP assessment | Percipere",
  description: PERCIXPERT.support,
};

export default function PerciXpertPage() {
  const p = PERCIXPERT;

  return (
    <>
      <Nav />
      <main className="product-page product-page--xpert">
        <section className="product-hero product-hero--bleed">
          <ProductHeroBg variant="xpert" />
          <div className="wrap product-hero-grid">
            <div className="product-hero-copy">
              <p className="eyebrow left">{p.eyebrow}</p>
              <p className="brand-signal product-brand">{p.name}</p>
              <TextReveal
                as="h1"
                className="h1 sm"
                lines={[
                  { text: "Evidence in.", accent: "Evidence" },
                  { text: "Defensible ERP decisions out." },
                ]}
              />
              <p className="lede left product-lede">{p.support}</p>
              <div className="ctas product-ctas">
                <ProductCta href={p.ctaHref} label={p.ctaLabel} />
                <Link href="/#suites" className="btn btn-line">Back to suites</Link>
              </div>
            </div>
            <EvidenceFlow />
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
              <div className="distinction-pair">
                <p><strong>FUTUROOT</strong> {p.distinction.futuroot.replace(/^FUTUROOT\s*/, "")}</p>
                <p><strong>PerciXpert</strong> {p.distinction.percixpert.replace(/^PerciXpert\s*/, "")}</p>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal as="section" className="wrap product-section" early>
          <div className="row-head">
            <h2 className="h2">What PerciXpert structures</h2>
          </div>
          <p className="section-lede">Four capabilities that keep evidence linked from discovery to selection.</p>
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
            <h2 className="h2">One connected journey</h2>
          </div>
          <p className="section-lede">Every step builds on the last—findings, requirements, Fit-Gap, and RFP stay linked.</p>
          <WorkflowSteps steps={p.workflow} />
        </SectionReveal>

        <SectionReveal as="section" className="wrap product-section product-close" early>
          <div className="row-head">
            <h2 className="h2">What you leave with</h2>
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
            <p className="lede left">Ready to ground your next ERP decision in evidence?</p>
            <div className="ctas product-ctas">
              <ProductCta href={p.ctaHref} label={p.ctaLabel} />
              <Link href="/products/perciserve" className="ulink">See PerciServe →</Link>
            </div>
          </div>
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
