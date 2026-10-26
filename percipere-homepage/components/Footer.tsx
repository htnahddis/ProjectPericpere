import Link from "next/link";
import { FOOTER } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer wrap">
      <div className="wordmark">Percipere<span>.</span></div>
      <div className="fcols">
        {FOOTER.map(c => (
          <div key={c.title}><h3>{c.title}</h3>
            <ul>{c.links.map(l => <li key={l.label}><Link href={l.href}>{l.label}</Link></li>)}</ul></div>
        ))}
      </div>
      <div className="fbase"><span>© {new Date().getFullYear()} Percipere, Inc. All rights reserved.</span></div>
    </footer>
  );
}
