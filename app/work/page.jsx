import Link from "next/link";
import CTABand from "@/components/CTABand";
import { PREVIOUS_WORK } from "@/lib/previous-work";

export const metadata = {
  title: "Work — Selected Projects & Case Studies",
  description:
    "Selected Devibi case studies and previous work across website design, app development, AI automation, SEO and CRO.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow" data-reveal>( Selected work )</p>
          <h1 data-split>Proof, poured.</h1>
          <p className="section__lede" data-reveal>
            Case studies across web, apps, AI automation and growth. Each one shows
            the business problem, the service mix and the outcome the work was built to create.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "30px" }}>
        <div className="container work__grid">

          {/* Halcyon */}
          <article className="project glass" data-tilt data-reveal>
            <div className="project__visual project__visual--halcyon">
              <div className="browser">
                <div className="browser__bar"><i /><i /><i /><b>halcyon.finance</b></div>
                <div className="browser__body">
                  <div className="fin-balance">
                    <span>Total balance</span>
                    <strong>$84,209.50</strong>
                    <em>▲ 12.4% this month</em>
                  </div>
                  <svg className="fin-chart" viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#ff5e1f" stopOpacity=".5" />
                        <stop offset="1" stopColor="#ff5e1f" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 70 C30 60 45 75 70 58 C95 42 110 55 140 40 C170 26 190 38 220 22 C245 10 270 18 300 6 L300 90 L0 90 Z" fill="url(#chartFill)" />
                    <path d="M0 70 C30 60 45 75 70 58 C95 42 110 55 140 40 C170 26 190 38 220 22 C245 10 270 18 300 6" fill="none" stroke="#ff8a3d" strokeWidth="2.5" />
                  </svg>
                  <div className="fin-cards"><span /><span /><span /></div>
                </div>
              </div>
            </div>
            <div className="project__info">
              <span className="project__index">01</span>
              <h3><Link href="/work/halcyon-fintech-website">Halcyon</Link></h3>
              <p>
                Fintech platform — <Link href="/services/website-design-development">web design &amp; development</Link> with
                a 3D brand world. Organic signups doubled within a quarter of launch.
              </p>
              <ul className="card__tags"><li>Web</li><li>3D</li><li>Fintech</li></ul>
            </div>
          </article>

          {/* Pulse */}
          <article className="project glass" data-tilt data-reveal>
            <div className="project__visual project__visual--pulse">
              <div className="phone">
                <div className="phone__notch" />
                <div className="phone__screen">
                  <div className="pulse-rings">
                    <svg viewBox="0 0 120 120" aria-hidden="true">
                      <circle cx="60" cy="60" r="50" className="ring ring--bg" />
                      <circle cx="60" cy="60" r="50" className="ring ring--a" />
                      <circle cx="60" cy="60" r="38" className="ring ring--bg" />
                      <circle cx="60" cy="60" r="38" className="ring ring--b" />
                      <circle cx="60" cy="60" r="26" className="ring ring--bg" />
                      <circle cx="60" cy="60" r="26" className="ring ring--c" />
                    </svg>
                    <div className="pulse-rings__label"><strong>642</strong><span>kcal</span></div>
                  </div>
                  <div className="pulse-row"><span>🔥 Streak</span><b>21 days</b></div>
                  <div className="pulse-row"><span>👟 Steps</span><b>12,408</b></div>
                  <div className="pulse-row"><span>💧 Hydration</span><b>2.1 L</b></div>
                </div>
              </div>
            </div>
            <div className="project__info">
              <span className="project__index">02</span>
              <h3><Link href="/work/pulse-fitness-app">Pulse</Link></h3>
              <p>
                Health &amp; fitness app — <Link href="/services/app-design-development">product design and native development</Link>,
                built around streaks and time-to-first-value onboarding.
              </p>
              <ul className="card__tags"><li>iOS</li><li>Android</li><li>Wearables</li></ul>
            </div>
          </article>

          {/* Mindgrid */}
          <article className="project glass" data-tilt data-reveal>
            <div className="project__visual project__visual--mindgrid">
              <div className="chat">
                <div className="chat__bubble chat__bubble--user">Where is my order #2841?</div>
                <div className="chat__bubble chat__bubble--ai">
                  <span className="chat__avatar">◈</span>
                  <span>It left our warehouse today — arriving <b>Thursday</b>. Want live tracking?</span>
                </div>
                <div className="chat__bubble chat__bubble--user">Yes please!</div>
                <div className="chat__bubble chat__bubble--ai">
                  <span className="chat__avatar">◈</span>
                  <i className="dot" /><i className="dot" /><i className="dot" />
                </div>
              </div>
              <svg className="nodes" viewBox="0 0 200 200" aria-hidden="true">
                <path d="M30 160 L100 100 L170 150 M100 100 L60 40 M100 100 L160 50" stroke="rgba(255,138,61,.4)" fill="none" />
                <circle cx="100" cy="100" r="6" fill="#ff5e1f" />
                <circle cx="30" cy="160" r="4" fill="#ffb36b" /><circle cx="170" cy="150" r="4" fill="#ffb36b" />
                <circle cx="60" cy="40" r="4" fill="#ffb36b" /><circle cx="160" cy="50" r="4" fill="#ffb36b" />
              </svg>
            </div>
            <div className="project__info">
              <span className="project__index">03</span>
              <h3><Link href="/work/mindgrid-ai-support-copilot">Mindgrid</Link></h3>
              <p>
                AI support copilot — <Link href="/services/ai-integration">LLM integration</Link> over
                the company's own docs, now resolving 68% of tickets autonomously.
              </p>
              <ul className="card__tags"><li>AI</li><li>RAG</li><li>Support</li></ul>
            </div>
          </article>

          {/* Auralis */}
          <article className="project glass" data-tilt data-reveal>
            <div className="project__visual project__visual--auralis">
              <div className="ecom">
                <div className="ecom__product">
                  <div className="ecom__img" />
                  <div className="ecom__name">Auralis One <b>$249</b></div>
                  <div className="ecom__btn">Add to cart</div>
                </div>
                <div className="ecom__stat glass">
                  <strong>+212%</strong><span>conversion rate</span>
                  <div className="ecom__bars">
                    <i style={{ "--h": "30%" }} /><i style={{ "--h": "45%" }} /><i style={{ "--h": "38%" }} />
                    <i style={{ "--h": "62%" }} /><i style={{ "--h": "80%" }} /><i style={{ "--h": "100%" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="project__info">
              <span className="project__index">04</span>
              <h3><Link href="/work/auralis-ecommerce-cro-seo">Auralis</Link></h3>
              <p>
                E-commerce growth — a combined <Link href="/services/seo">SEO</Link> and{" "}
                <Link href="/services/conversion-rate-optimization">CRO</Link> program
                that tripled revenue in nine months.
              </p>
              <ul className="card__tags"><li>SEO</li><li>CRO</li><li>E-com</li></ul>
            </div>
          </article>

        </div>
      </section>

      <section className="section work-archive" style={{ paddingTop: "20px" }}>
        <div className="container">
          <header className="section__head work-archive__head">
            <p className="eyebrow" data-reveal>( Previous work archive )</p>
            <h2 className="section__title" data-split>More shipped work.</h2>
            <p className="section__lede" data-reveal>
              A compact list of previous project work and launch involvement across
              apps, e-commerce, service businesses, nonprofits and growth teams.
            </p>
          </header>

          <div className="work-archive__grid">
            {PREVIOUS_WORK.map((project, index) => (
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
                    <i />
                    <i />
                    <i />
                    <span>{project.domain}</span>
                  </div>
                  <img
                    src={`/work-screenshots/${project.slug}.webp?v=4`}
                    alt={`${project.name} project screenshot`}
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
        </div>
      </section>

      <CTABand
        title="Your project could be next."
        line="Bring the brief, the half-finished Figma or the app that keeps crashing. We'll take it from wherever it is."
        label="Start yours"
        href="/contact?source=work"
      />
    </>
  );
}
