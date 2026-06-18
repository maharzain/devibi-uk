import Link from "next/link";
import HeroScene from "@/components/HeroSceneLazy";
import Marquee from "@/components/Marquee";
import ServiceIcon from "@/components/ServiceIcon";
import CTABand from "@/components/CTABand";
import { SERVICES, TESTIMONIALS, STATS, PROCESS } from "@/lib/services";

function GoogleMark() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="13"
      height="13"
      viewBox="0 0 48 48"
      style={{ marginRight: 6, verticalAlign: "-2px" }}
    >
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.38 6.64v5.52h7.1c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.96 14.56-5.33l-7.1-5.52c-1.97 1.32-4.49 2.1-7.46 2.1-5.73 0-10.58-3.87-12.32-9.07H4.34v5.7C7.96 41.08 15.41 46 24 46z" />
      <path fill="#FBBC05" d="M11.68 28.18A13.23 13.23 0 0 1 11 24c0-1.45.25-2.86.68-4.18v-5.7H4.34A21.96 21.96 0 0 0 2 24c0 3.55.85 6.9 2.34 9.88l7.34-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.9 4.18 29.93 2 24 2 15.41 2 7.96 6.92 4.34 14.12l7.34 5.7c1.74-5.2 6.59-9.07 12.32-9.07z" />
    </svg>
  );
}

export const metadata = {
  title: "Devibi — Web Design, App Development, AI Automation, SEO & CRO Agency",
  description:
    "Devibi builds websites, mobile apps, AI automations, SEO programs and CRO funnels that turn visitors into qualified leads, booked calls and revenue.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroScene />

      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="hero__inner container">
          <p className="hero__eyebrow" data-reveal>
            <span className="pulse-dot" /> Devibi® — Digital Studio · Est. 2019
          </p>
          <h1 className="hero__title" data-split>
            Websites and apps that turn clicks into <span className="hl">customers</span>
          </h1>
          <p className="hero__sub" data-reveal>
            Devibi is a digital agency for <Link href="/services/website-design-development">website design &amp; development</Link>,{" "}
            <Link href="/services/app-design-development">mobile app development</Link>,{" "}
            <Link href="/services/ai-integration">AI automation</Link>,{" "}
            <Link href="/services/seo">SEO</Link> and{" "}
            <Link href="/services/conversion-rate-optimization">CRO</Link> — built to make your offer
            clear, credible and easier to buy.
          </p>
          <div className="hero__cta" data-reveal>
            <Link href="/contact?source=home-hero" className="btn btn--primary" data-magnetic>
              <span className="btn__fill" />
              <span className="btn__label">Start a project</span>
            </Link>
            <Link href="/work" className="btn btn--ghost" data-magnetic>
              <span className="btn__fill" />
              <span className="btn__label">See our work</span>
            </Link>
          </div>
          <p className="cta-note" data-reveal>
            <span>Free 30-minute strategy call</span>
            <span>Fixed-price project quote</span>
            <span>Next step in one business day</span>
          </p>
        </div>

        <div className="hero__meta container" data-reveal>
          <div className="hero__meta-item"><strong>87+</strong><span>projects shipped</span></div>
          <div className="hero__meta-item"><strong>14</strong><span>industry awards</span></div>
          <div className="hero__meta-item"><strong>3.2×</strong><span>avg. conversion lift</span></div>
          <div className="hero__scroll-hint">
            <span className="hero__scroll-line" />scroll
          </div>
        </div>
      </section>

      <Marquee />

      {/* ===== Trusted by ===== */}
      <section className="logos" aria-label="Clients">
        <div className="container logos__row" data-reveal>
          <span className="logos__label">Trusted by teams at</span>
          <span className="logos__mark">Halcyon</span>
          <span className="logos__mark">Pulse</span>
          <span className="logos__mark">Mindgrid</span>
          <span className="logos__mark">Auralis</span>
          <span className="logos__mark">Nordwind</span>
          <span className="logos__mark">Vexa</span>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="section" id="services">
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( 01 — What we do )</p>
            <h2 className="section__title" data-split>Six disciplines.<br />One fluid team.</h2>
            <p className="section__lede" data-reveal>
              Pick the outcome you want: more leads from your website, a mobile app
              users keep, AI automation that saves time, or SEO and CRO that grow revenue.
            </p>
          </header>

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
                <h3>{s.name}</h3>
                <p>{s.cardLine}</p>
                <ul className="card__tags">
                  {s.deliverables.slice(0, 3).map((d) => (
                    <li key={d.title}>{d.title.split(" ").slice(0, 2).join(" ")}</li>
                  ))}
                </ul>
                <span className="card__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section className="section">
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( 02 — How we flow )</p>
            <h2 className="section__title" data-split>From spark<br />to scale.</h2>
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

      {/* ===== Stats ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container stats__grid">
          {STATS.map((s) => (
            <div className="stat" data-reveal key={s.label}>
              <strong>
                <span className="count" data-count={s.value} data-decimal={s.decimal ? "1" : "0"}>0</span>
                {s.suffix}
              </strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( 03 — Kind words )</p>
            <h2 className="section__title" data-split>Clients say<br />it best.</h2>
          </header>
          <div className="quotes__grid">
            {TESTIMONIALS.map((t) => (
              <figure className="quote glass" data-tilt data-reveal key={t.name}>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <b>{t.name}</b>
                  <span>{t.source === "Google" ? <GoogleMark /> : null}{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTABand href="/contact?source=home-cta" />
    </>
  );
}
