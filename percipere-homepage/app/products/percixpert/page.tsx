import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionMotion from "@/components/SectionMotion";
import TextReveal from "@/components/TextReveal";
import ProductCta from "@/components/product/ProductCta";
import ProductHeroBg from "@/components/product/ProductHeroBg";
import PerciXpertJourney from "@/components/product/PerciXpertJourney";
import TeamChangeCards from "@/components/TeamChangeCards";
import XpertCapabilityBento from "@/components/XpertCapabilityBento";
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
          <div className="wrap product-hero-grid product-hero-grid--solo">
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
          </div>
        </section>

        <section className="wrap product-section">
          <SectionMotion>
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
          </SectionMotion>
        </section>

        <section className="wrap">
          <SectionMotion staggerChildren={false}>
            <PerciXpertJourney />
          </SectionMotion>
        </section>

        <section className="wrap product-section xpert-capabilities">
          <SectionMotion>
            <div className="row-head">
              <h2 className="h2">What PerciXpert structures</h2>
            </div>
            <p className="section-lede">Four capabilities that keep evidence linked from discovery to selection.</p>
            <XpertCapabilityBento capabilities={p.capabilities} />
          </SectionMotion>
        </section>

        <section className="wrap product-section product-close team-change-section">
          <SectionMotion>
            <div className="row-head">
              <h2 className="h2">What changes for the team</h2>
            </div>
            <p className="section-lede">Focused investigation, traceable decisions, and ERP choices grounded in reviewed evidence.</p>
            <TeamChangeCards outcomes={p.outcomes} imageSrc="/images/products/percixpert.jpg" />
            <div className="product-final">
              <p className="lede left">Ready to ground your next ERP decision in evidence?</p>
              <div className="ctas product-ctas">
                <ProductCta href={p.ctaHref} label={p.ctaLabel} />
                <Link href="/products/perciserve" className="ulink">See PerciServe →</Link>
              </div>
            </div>
          </SectionMotion>
        </section>
      </main>
      <Footer />
    </>
  );
}
