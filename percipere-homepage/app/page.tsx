import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Features10 from "@/components/Features10";
import HeroBackground from "@/components/HeroBackground";
import ProductCard from "@/components/ProductCard";
import PhaseRail from "@/components/PhaseRail";
import PrimaryCta from "@/components/PrimaryCta";
import SectionReveal from "@/components/SectionReveal";
import TextReveal from "@/components/TextReveal";
import StatementReveal from "@/components/StatementReveal";
import BlurText from "@/components/BlurText";
import Magnet from "@/components/Magnet";
import { PRODUCTS, SAP_PHASES, DEMO_HREF } from "@/lib/data";

const BENTO_ORDER: { name: string; size: "feature" | "wide" | "default" }[] = [
  { name: "FUTUROOT", size: "feature" },
  { name: "PerciXpert", size: "default" },
  { name: "PerciServe", size: "default" },
  { name: "PerciHub", size: "wide" },
  { name: "PerciSuite", size: "wide" },
];

export default function Home() {
  const byName = Object.fromEntries(PRODUCTS.map(p => [p.name, p]));

  return (
    <>
      <Nav />
      <main>
        {/* 1. Hero — Introducing PerciVerse */}
        <section className="hero wrap" aria-labelledby="hero-title">
          <HeroBackground />
          <div className="hero-copy">
            <p className="eyebrow">Introducing PerciVerse</p>
            <p className="brand-signal" aria-hidden="true">Percipere</p>
            <TextReveal
              as="h1"
              className="h1"
              lines={[
                { text: "PerciVerse." },
                { text: "One connected system", accent: "connected" },
                { text: "for your SAP journey." },
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

        {/* 2. The Ecosystem — One Connected System */}
        <SectionReveal as="section" className="wrap ecosystem features10" id="ecosystem" aria-labelledby="ecosystem-title">
          <div className="features10-copy">
            <p className="eyebrow left">The Ecosystem</p>
            <TextReveal as="h2" className="h2" lines={[{ text: "One connected system" }]} />
            <span id="ecosystem-title" className="sr-only">One connected system</span>
            <BlurText
              className="lede left"
              text="FUTUROOT sits at the centre as the process intelligence layer that gives every suite shared enterprise context."
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
          <Features10 />
        </SectionReveal>

        {/* Bridge statement — large animated copy */}
        <SectionReveal as="section" className="wrap statement-band" aria-labelledby="statement-title">
          <span id="statement-title" className="sr-only">
            One PerciVerse. Clearer decisions. Connect implementation, operations, and support through shared process intelligence across your SAP journey.
          </span>
          <div className="statement">
            <StatementReveal />
          </div>
        </SectionReveal>

        {/* 3. The Product Suites — bento */}
        <SectionReveal as="section" className="wrap suites-section" id="suites" aria-labelledby="suites-title">
          <div className="row-head">
            <TextReveal as="h2" className="h2" lines={[{ text: "The Product Suites" }]} />
            <span id="suites-title" className="sr-only">The Product Suites</span>
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
        </SectionReveal>

        {/* 4. How the Ecosystem Supports SAP Transformation */}
        <SectionReveal as="section" className="wrap sap-transform" id="transformation" aria-labelledby="transform-title">
          <div className="row-head compact">
            <TextReveal
              as="h2"
              className="h2"
              lines={[{ text: "How the ecosystem supports SAP transformation" }]}
            />
            <span id="transform-title" className="sr-only">How the ecosystem supports SAP transformation</span>
          </div>
          <p className="section-lede">
            Across SAP Activate phases, PerciVerse keeps context continuous from discovery through realization.
          </p>
          <PhaseRail phases={SAP_PHASES} />
        </SectionReveal>

        {/* 5. Value & Next Steps */}
        <SectionReveal as="section" className="wrap value-next" id="next-steps" aria-labelledby="next-title">
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
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
