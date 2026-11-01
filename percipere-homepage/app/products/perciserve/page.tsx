import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import TextReveal from "@/components/TextReveal";
import LightTunnel from "@/components/LightTunnel";
import TearTicket from "@/components/TearTicket";
import ProductCta from "@/components/product/ProductCta";
import TeamChangeCards from "@/components/TeamChangeCards";
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
          <div className="serve-light-tunnel" aria-hidden="true">
            <LightTunnel
              cableColor="#1b1466"
              pulseColor="#00b7ff"
              tunnelColor="#ffffff"
              cableCount={56}
              pulseDensity={0.5}
              flowDirection="inward"
              mouseInteraction
              clickSurge
              lightMode
            />
          </div>
          <div className="wrap product-hero-grid">
            <div className="product-hero-copy">
              <p className="brand-signal product-brand">{p.name}</p>
              <TextReveal
                as="h1"
                className="h1 sm"
                lines={[
                  { text: "Instant L1.", accent: "Instant" },
                  { text: "Context-rich escalation" },
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
            <TearTicket
              image="/spectrum.jpg"
              imageAlt="Visitors in a walkway of coloured glass"
              stub={
                <div>
                  <h3>Admit one</h3>
                  <p>Rooftop gallery · Until 30 Nov</p>
                  <span>No. 284619</span>
                </div>
              }
              orientation="horizontal"
              scrim
              imageRadius={8}
              width={460}
              height={250}
              stubSize={150}
              radius={16}
              holes={12}
              holeSize={6}
              notch={3}
              roughness={0}
              tearAngle={30}
              stretch={30}
              resistance={0.45}
              rotate={4}
              tilt
              tiltMax={9}
              tiltReach={260}
              parallax={6}
              perspective={1000}
              background="#27272a"
              color="#f5f5f5"
              border
              borderWidth={1}
              recenter
            >
              <span>Spectrum</span>
            </TearTicket>
          </div>
          <div className="product-solution">
            <p className="eyebrow left">Solution</p>
            <h2 className="h2">{p.solution.title}</h2>
            <p>{p.solution.text}</p>
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


        <SectionReveal as="section" className="wrap product-section product-close team-change-section" early>
          <div className="row-head">
            <h2 className="h2">What changes for the team</h2>
          </div>
          <p className="section-lede">Clearer L1 coverage, protected specialist time, and handoffs that keep context intact.</p>
          <TeamChangeCards outcomes={p.outcomes} />
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
