import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Features10 from "@/components/Features10";
import HeroBackground from "@/components/HeroBackground";
import ProductPreview from "@/components/ProductPreview";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import StatementReveal from "@/components/StatementReveal";
import BlurText from "@/components/BlurText";
import { PRODUCTS, SAP_PHASES, DEMO_HREF } from "@/lib/data";

export default function Home() {
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
              delay={80}
              animateBy="words"
              direction="bottom"
              effect="blur"
              blur={8}
              distance={18}
              stepDuration={0.28}
              trigger="load"
            />
            <div className="ctas hero-actions">
              <a href="#ecosystem" className="btn btn-dark">Explore PerciVerse</a>
              <Link href={DEMO_HREF} prefetch={false} className="btn btn-line">Talk to our team</Link>
            </div>
          </div>
        </section>

        {/* 2. The Ecosystem — One Connected System */}
        <section className="wrap ecosystem features10" id="ecosystem" aria-labelledby="ecosystem-title">
          <Reveal className="features10-copy">
            <p className="eyebrow left">The Ecosystem</p>
            <TextReveal as="h2" className="h2" lines={[{ text: "One connected system" }]} />
            <span id="ecosystem-title" className="sr-only">One connected system</span>
            <BlurText
              className="lede left"
              text="FUTUROOT sits at the centre as the process intelligence layer that gives every suite shared enterprise context."
              delay={60}
              animateBy="words"
              direction="bottom"
              effect="focus"
              blur={6}
              distance={12}
              stepDuration={0.26}
              trigger="view"
            />
          </Reveal>
          <Reveal delay={120}>
            <Features10 />
          </Reveal>
        </section>

        {/* 3. The Product Suites */}
        <section className="wrap" id="suites" aria-labelledby="suites-title">
          <Reveal>
            <div className="row-head">
              <TextReveal as="h2" className="h2" lines={[{ text: "The Product Suites" }]} />
              <span id="suites-title" className="sr-only">The Product Suites</span>
              <a href="#next-steps" className="ulink">Talk through fit ↗</a>
            </div>
            <p className="section-lede">Four suites and a shared intelligence layer—each focused, all connected.</p>
          </Reveal>
          <div className="grid">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 80}>
                <Link href={p.href} prefetch={false} className="card">
                  <ProductPreview video={p.video} poster={p.poster} />
                  <small>{p.tag}</small>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 4. How the Ecosystem Supports SAP Transformation */}
        <section className="wrap sap-transform" id="transformation" aria-labelledby="transform-title">
          <Reveal>
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
          </Reveal>
          <div className="feature-grid">
            {SAP_PHASES.map((phase, index) => (
              <Reveal key={phase.label} delay={index * 80}>
                <article className="feature-card">
                  <span className="feature-label">{phase.label}</span>
                  <h3>{phase.title}</h3>
                  <p>{phase.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 5. Value & Next Steps */}
        <section className="wrap value-next" id="next-steps" aria-labelledby="next-title">
          <div className="statement">
            <StatementReveal />
          </div>
          <Reveal>
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
                <Link href={DEMO_HREF} prefetch={false} className="btn btn-dark">Talk to our team</Link>
                <a href="#suites" className="btn btn-line">Review the suites</a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
