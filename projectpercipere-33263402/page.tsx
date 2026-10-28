import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";
import HeroNetwork from "@/components/HeroNetwork";
import ProductPreview from "@/components/ProductPreview";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import StatementReveal from "@/components/StatementReveal";
import { PRODUCTS, DEMO_HREF } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <section className="hero-shell">
          <HeroNetwork />
          <div className="hero wrap">
            <p className="eyebrow">Enterprise AI for SAP</p>
            <TextReveal
              as="h1"
              className="h1"
              lines={[
                { text: "Move from SAP complexity" },
                { text: "to connected intelligence.", accent: "connected" },
              ]}
            />
            <p className="lede hero-support">
              AI products for implementation, operations and support—grounded in
              enterprise context and built to move work forward.
            </p>
            <div className="ctas hero-actions">
              <Link href="/products" prefetch={false} className="btn btn-dark">
                Explore our AI <span aria-hidden="true">↗</span>
              </Link>
              <Link href={DEMO_HREF} prefetch={false} className="btn btn-line">
                Talk to our team
              </Link>
            </div>
            <div
              className="hero-proof"
              aria-label="Percipere product ecosystem"
            >
              <span>One connected layer</span>
              <i />
              <span>Three products</span>
              <i />
              <span>Every SAP decision</span>
            </div>
          </div>
          <div className="wrap hero-dash">
            <Reveal>
              <Dashboard />
            </Reveal>
          </div>
        </section>

        <section className="wrap capabilities" id="capabilities">
          <Reveal>
            <div className="row-head">
              <TextReveal
                as="h2"
                className="h2"
                lines={[
                  { text: "The intelligence layer for every SAP moment." },
                ]}
              />
              <Link href="/products" prefetch={false} className="ulink">
                View all products <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </Reveal>
          <div className="grid">
            {PRODUCTS.map((p, i) => (
              <Reveal
                key={p.name}
                delay={(i % 3) * 90}
                className={`product-reveal product-reveal-${i + 1}`}
              >
                <Link href={p.href} prefetch={false} className="card">
                  <ProductPreview video={p.video} poster={p.poster} />
                  <div className="card-copy">
                    <div className="card-topline">
                      <small>{p.tag}</small>
                      <span className="card-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </div>
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="wrap split" id="workflow">
          <Reveal className="split-visual">
            <div className="split-img">
              <Image
                src="/images/workflow.svg"
                alt="PerciServe interface showing an investigation moving from query to resolution"
                fill
                sizes="(max-width:900px) 100vw, 50vw"
              />
              <span className="visual-label visual-label-top">
                01 / Investigate
              </span>
              <span className="visual-label visual-label-bottom">
                03 / Resolve
              </span>
            </div>
          </Reveal>
          <Reveal>
            <p className="eyebrow left">PerciServe in action</p>
            <TextReveal
              as="h2"
              className="h2"
              lines={[
                { text: "From query to resolution—without losing context." },
              ]}
            />
            <p className="section-copy">
              Percipere turns fragmented enterprise knowledge into a continuous
              operating loop. The next answer starts with everything the last
              one learned.
            </p>
            <ul className="checks">
              <li>Routine queries resolved on first touch</li>
              <li>Escalations arrive with full investigation context</li>
              <li>Every fix feeds the next resolution</li>
            </ul>
          </Reveal>
        </section>

        <section className="wrap statement-section">
          <div className="statement">
            <StatementReveal />
          </div>
        </section>

        <section className="wrap final">
          <Reveal>
            <p className="eyebrow">Start with the right signal</p>
            <TextReveal
              as="h2"
              className="h1 sm"
              lines={[
                { text: "Built for real", accent: "real" },
                { text: "enterprise challenges." },
              ]}
            />
            <p className="lede">
              Explore how Percipere brings AI and SAP expertise together.
            </p>
            <div className="ctas">
              <Link href={DEMO_HREF} prefetch={false} className="btn btn-dark">
                Talk to our team <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/products" prefetch={false} className="btn btn-line">
                Our products
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
