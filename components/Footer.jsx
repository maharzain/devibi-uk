import Link from "next/link";
import { SERVICES, SITE } from "@/lib/services";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__word" aria-hidden="true">
          devibi<sup>®</sup>
        </div>

        <div className="footer__cols">
          <div>
            <h3>Devibi Studio</h3>
            <p className="footer__blurb">
              A digital agency for website design &amp; development, app development,
              AI integration, SEO and CRO. Liquid-smooth design, engineered for growth.
            </p>
          </div>
          <nav aria-label="Services">
            <h3>Services</h3>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h3>Company</h3>
            <ul>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </nav>
        </div>

        <div className="footer__row">
          <span>© 2026 Devibi Studio. All rights reserved.</span>
          <span>Designed in liquid orange ✦</span>
        </div>
      </div>
    </footer>
  );
}
