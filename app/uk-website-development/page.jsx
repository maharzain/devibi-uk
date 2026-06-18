import Link from "next/link";
import UKLeadForm from "@/components/UKLeadForm";
import { SITE, TESTIMONIALS } from "@/lib/services";
import { PREVIOUS_WORK } from "@/lib/previous-work";

/* ============================================================
   Dedicated Google Ads landing page — UK website design & dev.
   Conversion-first, message-matched to UK paid-search intent.
   Reuses the site's design system, components and lead pipeline.
   ============================================================ */

const PATH = "/uk-website-development";

export const metadata = {
  title: "Website Design & Development in the UK — Free Quote",
  description:
    "UK website design & development agency. Fast, SEO-ready websites that turn visitors into leads and booked calls. Fixed-price quotes, no templates, reply within one business day. Get your free quote.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "UK Website Design & Development — Devibi",
    description:
      "Fast, SEO-ready websites for UK businesses, built to turn clicks into customers. Fixed-price quotes, reply within one business day.",
    url: PATH,
    siteName: "Devibi",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Website Design & Development — Devibi",
    description:
      "Fast, SEO-ready websites for UK businesses, built to turn clicks into customers. Get your free quote.",
  },
  robots: { index: true, follow: true },
};

/* Small Google glyph for review credibility (mirrors homepage) */
function GoogleMark() {
  return (
    <svg aria-hidden="true" focusable="false" width="13" height="13" viewBox="0 0 48 48" style={{ marginRight: 6, verticalAlign: "-2px" }}>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.38 6.64v5.52h7.1c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.96 14.56-5.33l-7.1-5.52c-1.97 1.32-4.49 2.1-7.46 2.1-5.73 0-10.58-3.87-12.32-9.07H4.34v5.7C7.96 41.08 15.41 46 24 46z" />
      <path fill="#FBBC05" d="M11.68 28.18A13.23 13.23 0 0 1 11 24c0-1.45.25-2.86.68-4.18v-5.7H4.34A21.96 21.96 0 0 0 2 24c0 3.55.85 6.9 2.34 9.88l7.34-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.9 4.18 29.93 2 24 2 15.41 2 7.96 6.92 4.34 14.12l7.34 5.7c1.74-5.2 6.59-9.07 12.32-9.07z" />
    </svg>
  );
}

const TRUST_POINTS = [
  "Custom design — never a template",
  "Built fast on Next.js, Webflow or WordPress",
  "Fixed-price quote before any work starts",
  "SEO-ready so Google can rank you from day one",
  "You own all the code, content and files",
];

const STATS = [
  { value: "87+", label: "Projects shipped" },
  { value: "5.0★", label: "Average client rating" },
  { value: "3.2×", label: "Avg. conversion lift" },
  { value: "1 day", label: "Reply on every enquiry" },
];

const WHY = [
  { title: "Built to convert, not just to look nice", desc: "Every page is structured around your buyer's questions and a clear next step — so more visitors actually enquire, call or buy." },
  { title: "Fast where it counts", desc: "Sub-second loads and Core Web Vitals in the green on mobile and desktop. Speed keeps visitors — and Google — on your side." },
  { title: "SEO-ready foundations", desc: "Clean semantic markup, structured data, sitemaps and per-page metadata baked in, so your site is ready to rank from launch." },
  { title: "Fixed pricing, no surprises", desc: "After a short scoping call you get one fixed quote. The number you approve is the number you pay — no hourly meters." },
  { title: "A senior team, end to end", desc: "Design, build and launch handled by senior designers and engineers — no juniors learning on your budget, no hand-offs." },
  { title: "Launch in weeks, not months", desc: "Most marketing sites go live in 6–10 weeks, with working pages to review every week — never a nervous big reveal at the end." },
];

const STEPS = [
  { num: "01", title: "Tell us about your project", desc: "Fill in the 2-minute form with what you need. That's genuinely enough to get started." },
  { num: "02", title: "Get a fixed-price quote & plan", desc: "We reply within one business day with a clear scope, timeline and fixed price — or honest advice if we're not the right fit." },
  { num: "03", title: "We design, build & launch", desc: "Weekly demos, no jargon, and a fast, SEO-ready site you own outright — built to win you more leads." },
];

/* Curated proof for UK SMB intent — real shipped sites across sectors */
const FEATURED_SLUGS = ["woodarq", "holifya", "structura-surveying", "perfex-painting", "mcgovern-company", "halo-skin"];
const FEATURED = FEATURED_SLUGS
  .map((slug) => PREVIOUS_WORK.find((p) => p.slug === slug))
  .filter(Boolean);

const FAQS = [
  {
    q: "How much does a website cost in the UK?",
    a: "Most small-business websites we build land between £2,000 and £10,000 depending on the number of pages, the design depth and any custom or e-commerce functionality. Larger sites and web apps run higher. After a short scoping call you get one fixed quote — no hourly billing, no surprises.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most marketing websites go live in 6–10 weeks: a week or two of planning and design, a few weeks of development, then content, testing and launch. We show you working pages every week, so you're never waiting in the dark for a big reveal.",
  },
  {
    q: "Do you work with businesses across the UK?",
    a: "Yes. We work with companies the length and breadth of the UK — London, Manchester, Birmingham, Leeds, Glasgow and everywhere between — and run everything over video and email during UK-friendly hours. You won't need to travel to anyone.",
  },
  {
    q: "Which platform will you build my website on?",
    a: "Whichever fits your team. We recommend Next.js for top performance and custom functionality, Webflow when you want full visual control without a developer, and WordPress when that's what your team already runs. We'll tell you honestly which suits you in the first call.",
  },
  {
    q: "Will my website be good for SEO and Google?",
    a: "Yes — it's built in, not bolted on. Every site ships with fast Core Web Vitals, clean semantic HTML, structured data, sensible URLs, per-page metadata and an XML sitemap. If you want to actively grow rankings after launch, our SEO team can take it from there.",
  },
  {
    q: "Do I own the website once it's built?",
    a: "Completely. You own all the design files, code and content we produce — there's no lock-in and no ransom for your own site. We can host and maintain it for you if you'd like, but you're free to take it anywhere.",
  },
];

export default function UKWebsiteDevelopmentPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Website Design & Development",
      serviceType: "Website design and development",
      description:
        "Website design and development for UK businesses — fast, SEO-ready websites that turn visitors into qualified leads and booked calls.",
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url, email: SITE.email },
      areaServed: { "@type": "Country", name: "United Kingdom" },
      url: `${SITE.url}${PATH}`,
      offers: {
        "@type": "Offer",
        priceCurrency: "GBP",
        url: `${SITE.url}${PATH}`,
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "UK Website Design & Development", item: `${SITE.url}${PATH}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ===== Hero (above the fold: message + form) ===== */}
      <section className="lp-hero">
        <div className="container lp-hero__grid">
          <div className="lp-hero__copy">
            <p className="lp-eyebrow" data-reveal>
              <span className="pulse-dot" /> UK Website Design &amp; Development Agency
            </p>
            <h1 className="lp-hero__title" data-split>
              Websites that turn UK clicks into <span className="hl">customers</span>
            </h1>
            <p className="lp-hero__sub" data-reveal>
              Devibi designs and builds fast, SEO-ready websites for UK businesses — made to
              load in under a second, rank on Google and turn visitors into enquiries, calls
              and sales. Fixed-price quotes, no templates, reply within one business day.
            </p>

            <ul className="lp-checklist" data-reveal>
              {TRUST_POINTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <div className="lp-hero__cta" data-reveal>
              <a href="#quote" className="btn btn--primary" data-magnetic>
                <span className="btn__fill" />
                <span className="btn__label">Get my free quote</span>
              </a>
              <a href="tel:+44" className="btn btn--ghost lp-hide-sm" data-magnetic>
                <span className="btn__fill" />
                <span className="btn__label">Book a free consultation</span>
              </a>
            </div>

            <p className="lp-rating" data-reveal>
              <span className="lp-stars" aria-hidden="true">★★★★★</span>
              <span><GoogleMark />Rated 5.0 / 5 by clients on Google · 87+ projects shipped</span>
            </p>
          </div>

          <div className="lp-hero__form-col" id="quote">
            <UKLeadForm />
          </div>
        </div>
      </section>

      {/* ===== Trust bar ===== */}
      <section className="lp-trustbar">
        <div className="container lp-trustbar__grid" data-reveal>
          {STATS.map((s) => (
            <div className="lp-trust" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Why Devibi ===== */}
      <section className="section" style={{ paddingTop: "clamp(70px, 9vh, 110px)" }}>
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( Why UK businesses choose Devibi )</p>
            <h2 className="section__title" data-split>A website that earns<br />its place.</h2>
            <p className="section__lede" data-reveal>
              Most websites win compliments, not customers. We build the other kind — designed
              around what your buyers need to see before they get in touch.
            </p>
          </header>
          <div className="deliv__grid">
            {WHY.map((w) => (
              <div className="deliv glass" data-reveal key={w.title}>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( How it works )</p>
            <h2 className="section__title" data-split>Three steps to<br />a better website.</h2>
          </header>
          <div className="lp-steps">
            {STEPS.map((s) => (
              <div className="step glass" data-reveal key={s.num}>
                <span className="step__num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Proof / portfolio ===== */}
      <section className="section work-archive" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head work-archive__head">
            <p className="eyebrow" data-reveal>( Recent work )</p>
            <h2 className="section__title" data-split>Sites we've shipped.</h2>
            <p className="section__lede" data-reveal>
              A small sample of websites built for real businesses across sectors — from trades
              and surveying to health, architecture and e-commerce.
            </p>
          </header>

          <div className="work-archive__grid">
            {FEATURED.map((project, index) => (
              <a
                className="work-archive__item glass"
                href={project.url || `https://${project.domain}`}
                target="_blank"
                rel="noreferrer"
                data-reveal
                key={project.slug}
                aria-label={`Visit ${project.name}`}
              >
                <div className="work-archive__mockup">
                  <div className="work-archive__chrome" aria-hidden="true">
                    <i /><i /><i />
                    <span>{project.domain}</span>
                  </div>
                  <img
                    src={`/work-screenshots/${project.slug}.webp?v=4`}
                    alt={`${project.name} website by Devibi`}
                    loading="lazy"
                  />
                </div>
                <div className="work-archive__top">
                  <span className="work-archive__index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="work-archive__visit" aria-hidden="true">↗</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.domain}</p>
                <ul className="card__tags" aria-label={`${project.name} project type`}>
                  <li>{project.category}</li>
                  <li>{project.scope}</li>
                </ul>
              </a>
            ))}
          </div>

          <div className="lp-center" data-reveal>
            <a href="#quote" className="btn btn--primary" data-magnetic>
              <span className="btn__fill" />
              <span className="btn__label">Get my free quote</span>
            </a>
            <Link href="/work" className="btn btn--ghost" data-magnetic>
              <span className="btn__fill" />
              <span className="btn__label">See more work</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( In their words )</p>
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

      {/* ===== FAQ ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( Before you ask )</p>
            <h2 className="section__title" data-split>UK website FAQs</h2>
          </header>
          <div className="faq" data-reveal>
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="section cta-band" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="glass cta-band__inner lp-final" data-tilt data-reveal>
            <div>
              <h2>Ready for a website that wins you more leads?</h2>
              <p>
                Tell us what you need and get a fixed-price quote within one business day.
                Free, no obligation — and honest advice either way.
              </p>
            </div>
            <a href="#quote" className="btn btn--primary" data-magnetic>
              <span className="btn__fill" />
              <span className="btn__label">Get my free quote</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== Sticky mobile CTA ===== */}
      <a href="#quote" className="lp-sticky" aria-label="Get my free quote">
        <span>Free fixed-price quote · 1-day reply</span>
        <span className="lp-sticky__btn">Get my quote →</span>
      </a>
    </>
  );
}
