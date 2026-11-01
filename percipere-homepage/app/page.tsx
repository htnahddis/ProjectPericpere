import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EcosystemOrbit from "@/components/EcosystemOrbit";
import HeroBackground from "@/components/HeroBackground";
import ProductCard from "@/components/ProductCard";
import PrimaryCta from "@/components/PrimaryCta";
import SectionMotion from "@/components/SectionMotion";
import TextReveal from "@/components/TextReveal";
import StatementReveal from "@/components/StatementReveal";
import StatementBackground from "@/components/StatementBackground";
import SuitesScrollExpand from "@/components/SuitesScrollExpand";
import SapPhaseGallery from "@/components/SapPhaseGallery";
import BlurText from "@/components/BlurText";
import Magnet from "@/components/Magnet";
import { PRODUCTS, SAP_PHASES, DEMO_HREF } from "@/lib/data";

const BENTO_ORDER: { name: string; size: "feature" | "wide" | "default" }[] = [
  { name: "FUTUROOT", size: "default" },
  { name: "PerciXpert", size: "default" },
  { name: "PerciServe", size: "default" },
  { name: "PerciHub", size: "default" },
  { name: "PerciSuite", size: "default" },
];

export default function Home() {
  const byName = Object.fromEntries(PRODUCTS.map(p => [p.name, p]));

  return (
    <>
      <Nav />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <HeroBackground />
          <div className="wrap hero-copy">
            <TextReveal
              as="h1"
              className="h1"
              lines={[
                { text: "One connected system" },
                { text: "accelerating your ERP journey.", accent: "accelerating" },
              ]}
            />
            <span id="hero-title" className="sr-only">PerciVerse. One connected system for your SAP journey.</span>
            <BlurText
              className="lede hero-support"
              text="AI suites for implementation, operations, and support—grounded in FUTUROOT process intelligence."
              delay={70}
              animateBy="words"
              direction="bottom"
              effect="blur"
              blur={8}
              distance={16}
              stepDuration={0.26}
              trigger="load"
            />
            <div className="ctas hero-actions">
              <Magnet
                padding={48}
                magnetStrength={3.2}
                maxOffset={8}
                scale={1.015}
                tilt={0}
                spring={{ stiffness: 200, damping: 20, mass: 1 }}
                wrapperClassName="magnet-cta"
              >
                <a href="#ecosystem" className="btn btn-dark">Explore PerciVerse</a>
              </Magnet>
              <Link href={DEMO_HREF} prefetch={false} className="btn btn-line">Talk to our team</Link>
            </div>
          </div>
        </section>

        <section className="full-section ecosystem-orbit" id="ecosystem" aria-labelledby="ecosystem-title">
          <div className="wrap ecosystem-orbit-frame">
            <SectionMotion>
              <div className="ecosystem-orbit-head">
                <p className="eyebrow left">One Connected System</p>
                <TextReveal
                  as="h2"
                  className="h2"
                  lines={[
                    { text: "One ecosystem." },
                    { text: "Connected intelligence.", accent: "Connected" },
                  ]}
                />
                <span id="ecosystem-title" className="sr-only">One ecosystem. Connected intelligence.</span>
              </div>

              <div className="ecosystem-orbit-visual" aria-label="Connected PerciVerse products orbiting Percipere.ai">
                <EcosystemOrbit />
              </div>

              <div className="ecosystem-orbit-support">
                <BlurText
                  className="lede left ecosystem-orbit-lede"
                  text="PerciXpert, PerciServe and PerciBot work together through shared process intelligence—so context stays continuous across your SAP journey."
                  delay={55}
                  animateBy="words"
                  direction="bottom"
                  effect="focus"
                  blur={6}
                  distance={12}
                  stepDuration={0.24}
                  trigger="view"
                />
              </div>
            </SectionMotion>
          </div>
        </section>

        <section className="full-section statement-band" aria-labelledby="statement-title">
          <span id="statement-title" className="sr-only">
            One PerciVerse. Clearer decisions. Connect implementation, operations, and support through shared process intelligence across your SAP journey.
          </span>
          <div className="statement">
            <StatementBackground />
            <div className="wrap statement-inner">
              <SectionMotion staggerChildren={false}>
                <StatementReveal />
              </SectionMotion>
            </div>
          </div>
        </section>

        <section className="suites-section" id="suites" aria-labelledby="suites-title">
          <span id="suites-title" className="sr-only">The Product Suites</span>
          <SuitesScrollExpand
            browseContent={
              <SectionMotion>
                <div className="row-head">
                  <h2 className="h2">Browse the suites</h2>
                  <a href="#next-steps" className="ulink">Talk through fit ↗</a>
                </div>
                <p className="section-lede">Four suites and a shared intelligence layer—each focused, all connected.</p>
                <div className="bento-grid">
                  {BENTO_ORDER.map(slot => {
                    const product = byName[slot.name];
                    if (!product) return null;
                    return <ProductCard key={product.name} product={product} size={slot.size} />;
                  })}
                </div>
              </SectionMotion>
            }
          />
        </section>

        <section className="full-section sap-transform" id="transformation" aria-labelledby="transform-title">
          <SectionMotion staggerChildren={false}>
            <SapPhaseGallery phases={SAP_PHASES} />
          </SectionMotion>
        </section>

        <section className="full-section wrap value-next" id="next-steps" aria-labelledby="next-title">
          <SectionMotion>
            <div className="final">
              <p className="eyebrow">Value & next steps</p>
              <TextReveal
                as="h2"
                className="h1 sm"
                lines={[
                  { text: "Ready to see PerciVerse", accent: "PerciVerse" },
                  { text: "in your landscape?" },
                ]}
              />
              <span id="next-title" className="sr-only">Ready to see PerciVerse in your landscape?</span>
              <p className="lede">
                Talk with the team about how the suites and FUTUROOT fit your SAP transformation.
              </p>
              <div className="ctas">
                <PrimaryCta />
                <a href="#suites" className="btn btn-line">Review the suites</a>
              </div>
            </div>
          </SectionMotion>
        </section>
      </main>
      <Footer />
    </>
  );
}
