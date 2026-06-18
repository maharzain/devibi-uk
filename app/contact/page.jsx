import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/services";

export const metadata = {
  title: "Contact — Start a Project",
  description:
    "Start a project with Devibi. Tell us about your website, app, AI automation, SEO or CRO goals and get a clear next step within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Devibi",
    url: `${SITE.url}/contact`,
    mainEntity: {
      "@type": "ProfessionalService",
      name: SITE.name,
      url: SITE.url,
      email: SITE.email,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <section className="page-hero" style={{ paddingBottom: "20px" }}>
        <div className="container">
          <p className="eyebrow" data-reveal>( Say hello )</p>
          <h1 data-split>
            Tell us what you want to build, fix or grow.
          </h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "30px" }}>
        <div className="container contact__grid">
          <div>
            <p className="section__lede" data-reveal>
              Share the goal, the website or product, and what feels stuck. We'll
              reply with the best next step, the likely scope and whether Devibi is
              the right team for it.
            </p>
            <a className="contact__email" href={`mailto:${SITE.email}`} data-reveal>
              {SITE.email} ↗
            </a>

            <ol className="contact__steps" data-reveal>
              <li>
                <b>01</b>
                <span>You write two sentences about the project. That's genuinely enough.</span>
              </li>
              <li>
                <b>02</b>
                <span>We reply within one business day with questions, a ballpark or a better-fit referral.</span>
              </li>
              <li>
                <b>03</b>
                <span>If it clicks, a 30-minute call turns into a fixed-price proposal within a week.</span>
              </li>
            </ol>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
