import Link from "next/link";
import { FOOTER } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Footer() {
  return (
    <footer className="footer wrap">
      <Reveal><div className="wordmark">Percipere<span>.</span></div></Reveal>
      <div className="fcols">
        {FOOTER.map((c, index) => (
          <Reveal key={c.title} delay={index * 70}>
            <div><h3>{c.title}</h3>
              <ul>{c.links.map(l => <li key={l.label}><Link href={l.href} prefetch={false}>{l.label}</Link></li>)}</ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal><div className="fbase"><span>© {new Date().getFullYear()} Percipere, Inc. All rights reserved.</span></div></Reveal>
    </footer>
  );
}
