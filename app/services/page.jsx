import Link from "next/link";
import ServiceIcon from "@/components/ServiceIcon";
import CTABand from "@/components/CTABand";
import { SERVICES, PROCESS, GENERAL_FAQS } from "@/lib/services";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GENERAL_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const metadata = {
  title: "Services — Web Design, App Development, AI Automation, SEO & CRO",
  description:
    "Explore Devibi services for website design, app development, AI automation, SEO, CRO and brand motion design, built to create leads, users and revenue.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow" data-reveal>( Services )</p>
          <h1 data-split>Digital services built to create leads, users and revenue.</h1>
          <p className="section__lede" data-reveal>
            Strategy, design, engineering and growth under one roof. Choose website
            design, app development, AI automation, SEO, CRO or brand motion design
            and see what you get, how it helps, what it costs and how long it takes.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "30px" }}>
        <div className="container">
          <div className="services__grid">
            {SERVICES.map((s, i) => (
              <Link
                href={`/services/${s.slug}`}
                className="card glass"
                key={s.slug}
                data-tilt
                data-reveal
              >
                <ServiceIcon name={s.icon} />
                <span className="card__num">0{i + 1}</span>
                <h2>{s.name}</h2>
                <p>{s.cardLine}</p>
                <ul className="card__tags">
                  {s.outcomes.slice(0, 2).map((o) => (
                    <li key={o}>{o.split(" ").slice(0, 3).join(" ")}…</li>
                  ))}
                </ul>
                <span className="card__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( How we flow )</p>
            <h2 className="section__title" data-split>The same four beats,<br />every engagement.</h2>
          </header>
          <div className="process__steps">
            {PROCESS.map((p) => (
              <div className="step glass" data-reveal key={p.num}>
                <span className="step__num">{p.num}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Agency FAQ ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( Before you ask )</p>
            <h2 className="section__title" data-split>Frequently asked questions</h2>
          </header>
          <div className="faq" data-reveal>
            {GENERAL_FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure which service you need?"
        line="Tell us the problem — slow site, leaky funnel, app idea, AI curiosity. We'll point you at the right discipline, even if it isn't ours."
        label="Ask us anything"
        href="/contact?source=services"
      />
    </>
  );
}
