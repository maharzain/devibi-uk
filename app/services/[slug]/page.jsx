import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceIcon from "@/components/ServiceIcon";
import CTABand from "@/components/CTABand";
import { SERVICES, getService, SITE } from "@/lib/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const title = `${service.metaTitle} | Devibi`;
  const url = `/services/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: service.metaDescription,
      url,
      siteName: "Devibi",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${service.name} by Devibi`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: service.metaDescription,
      images: [
        {
          url: `${url}/opengraph-image`,
          alt: `${service.name} by Devibi`,
        },
      ],
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related.map(getService).filter(Boolean);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.metaDescription,
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
      url: `${SITE.url}/services/${service.slug}`,
      areaServed: "Worldwide",
      offers: {
        "@type": "Offer",
        url: `${SITE.url}/contact?service=${service.slug}`,
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((f) => ({
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
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
        { "@type": "ListItem", position: 3, name: service.name, item: `${SITE.url}/services/${service.slug}` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== Hero ===== */}
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span>{service.shortName}</span>
          </nav>
          <h1 data-split>{service.hero.h1}</h1>
          <p className="section__lede" data-reveal>{service.hero.sub}</p>
          <div className="hero__cta" data-reveal>
            <Link href={`/contact?service=${service.slug}`} className="btn btn--primary" data-magnetic>
              <span className="btn__fill" />
              <span className="btn__label">{service.cta.label}</span>
            </Link>
            <Link href="/work" className="btn btn--ghost" data-magnetic>
              <span className="btn__fill" />
              <span className="btn__label">See our work</span>
            </Link>
          </div>
          <p className="cta-note" data-reveal>
            <span>Free strategy consult</span>
            <span>Fixed-price project quote</span>
            <span>Reply within one business day</span>
          </p>
        </div>
      </section>

      {/* ===== Intro ===== */}
      <section className="section" style={{ paddingTop: "20px" }}>
        <div className="container prose" data-reveal>
          {service.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* ===== Deliverables ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( Everything included, nothing vague )</p>
            <h2 className="section__title" data-split>{`What our ${service.name.toLowerCase()} services include`}</h2>
          </header>
          <div className="deliv__grid">
            {service.deliverables.map((d) => (
              <div className="deliv glass" data-reveal key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Outcomes ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head" style={{ marginBottom: "36px" }}>
            <p className="eyebrow" data-reveal>( What it means for you )</p>
          </header>
          <ul className="outcomes" data-reveal>
            {service.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( Before you ask )</p>
            <h2 className="section__title" data-split>Frequently asked questions</h2>
          </header>
          <div className="faq" data-reveal>
            {service.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Related services ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( Pairs well with )</p>
            <h2 className="section__title" data-split>Stronger together.</h2>
          </header>
          <div className="services__grid">
            {related.map((r, i) => (
              <Link href={`/services/${r.slug}`} className="card glass" key={r.slug} data-tilt data-reveal>
                <ServiceIcon name={r.icon} />
                <span className="card__num">0{i + 1}</span>
                <h3>{r.name}</h3>
                <p>{r.cardLine}</p>
                <span className="card__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={`${service.shortName} — let's talk.`}
        line={service.cta.line}
        label={service.cta.label}
        href={`/contact?service=${service.slug}`}
      />
    </>
  );
}
