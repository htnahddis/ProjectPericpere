import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";
import Features10 from "@/components/Features10";
import HeroNetwork from "@/components/HeroNetwork";
import ProductPreview from "@/components/ProductPreview";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import StatementReveal from "@/components/StatementReveal";
import { PRODUCTS, DEMO_HREF } from "@/lib/data";

const pillars = [
  {
    label: "Discover",
    title: "Context across every system",
    text: "Bring ERP, support, and operational data into one intelligible signal layer.",
  },
  {
    label: "Analyze",
    title: "Root cause before manual triage",
    text: "Surface the likely issue, dependencies, and relevant history in seconds.",
  },
  {
    label: "Act",
    title: "Automated workflow orchestration",
    text: "Turn recommendations into approved actions without breaking operational guardrails.",
  },
  {
    label: "Learn",
    title: "Continuous enterprise intelligence",
    text: "Each resolution sharpens the next support interaction and business decision.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <section className="hero wrap">
          <div className="hero-bg" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">Enterprise AI for SAP</p>
            <TextReveal as="h1" className="h1" lines={[
              { text: "Intelligence Across" },
              { text: "Your SAP Journey.", accent: "Journey." },
            ]} />
            <p className="lede hero-support">AI solutions for implementation, operations and support—grounded in enterprise context.</p>
            <div className="ctas hero-actions">
              <Link href="/products" prefetch={false} className="btn btn-dark">Explore our AI</Link>
              <Link href={DEMO_HREF} prefetch={false} className="btn btn-line">Talk to our team</Link>
            </div>
          </div>
          <HeroNetwork />
        </section>

        <Reveal className="wrap hero-dash"><Dashboard /></Reveal>

        <Features10 />

        <section className="wrap ecosystem" id="ecosystem">
          <Reveal>
            <div className="row-head compact">
              <TextReveal as="h2" className="h2" lines={[{ text: "How Percipere connects the enterprise" }]} />
            </div>
          </Reveal>
          <div className="feature-grid">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.label} delay={index * 80}>
                <article className="feature-card">
                  <span className="feature-label">{pillar.label}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="wrap" id="capabilities">
          <Reveal>
            <div className="row-head"><TextReveal as="h2" className="h2" lines={[{ text: "Capabilities" }]} /><Link href="/products" prefetch={false} className="ulink">View all products ↗</Link></div>
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

        <section className="wrap split">
          <Reveal className="split-visual">
            <div className="split-img"><Image src="/images/workflow.svg" alt="PerciServe interface on a monitor" fill sizes="(max-width:900px) 100vw, 50vw" /></div>
          </Reveal>
          <Reveal>
            <p className="eyebrow left">PerciServe in action</p>
            <TextReveal as="h2" className="h2" lines={[{ text: "From query to resolution—without losing context." }]} />
            <ul className="checks">
              <li>Routine queries resolved on first touch</li>
              <li>Escalations arrive with full investigation context</li>
              <li>Every fix feeds the next resolution</li>
            </ul>
          </Reveal>
        </section>

        <section className="wrap">
          <div className="statement"><StatementReveal /></div>
        </section>

        <section className="wrap final">
          <Reveal>
            <TextReveal as="h2" className="h1 sm" lines={[
              { text: "Built for Real", accent: "Real" },
              { text: "Enterprise Challenges" },
            ]} />
            <p className="lede">Explore how Percipere brings AI and SAP expertise together.</p>
            <div className="ctas">
              <Link href={DEMO_HREF} prefetch={false} className="btn btn-dark">Talk to our team</Link>
              <Link href="/products" prefetch={false} className="btn btn-line">Our products</Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
