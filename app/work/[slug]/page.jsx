import Link from "next/link";
import { notFound } from "next/navigation";
import CTABand from "@/components/CTABand";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { SITE } from "@/lib/services";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.metaTitle} | Devibi`,
      description: study.metaDescription,
      url: `/work/${study.slug}`,
      siteName: "Devibi",
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.metaTitle} | Devibi`,
      description: study.metaDescription,
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.metaDescription,
    url: `${SITE.url}/work/${study.slug}`,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    about: study.services,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/work">Work</Link>
            <span aria-hidden="true">/</span>
            <span>{study.client}</span>
          </nav>
          <p className="eyebrow" data-reveal>{study.service}</p>
          <h1 data-split>{study.title}</h1>
          <p className="section__lede" data-reveal>{study.summary}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "20px" }}>
        <div className="container prose" data-reveal>
          <p>{study.challenge}</p>
          <p>{study.solution}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head" style={{ marginBottom: "36px" }}>
            <p className="eyebrow" data-reveal>( Outcomes )</p>
          </header>
          <ul className="outcomes" data-reveal>
            {study.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head" style={{ marginBottom: "36px" }}>
            <p className="eyebrow" data-reveal>( Services used )</p>
          </header>
          <ul className="card__tags" data-reveal>
            {study.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand
        title="Want results like this?"
        line="Tell us the outcome you want. We'll show the fastest path, the likely scope and whether Devibi is the right team."
        label="Start a project"
        href={`/contact?source=case-study-${study.slug}`}
      />
    </>
  );
}
