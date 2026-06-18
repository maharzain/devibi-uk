import Link from "next/link";
import CTABand from "@/components/CTABand";
import { STATS, PROCESS } from "@/lib/services";

export const metadata = {
  title: "About — The Studio Behind the Flow",
  description:
    "Devibi is a digital studio founded in 2019, blending design craft with growth engineering. Meet the team philosophy behind 87+ shipped projects and 14 awards.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow" data-reveal>( About Devibi )</p>
          <h1 data-split>Built by people who hate "good enough."</h1>
          <p className="section__lede" data-reveal>
            Devibi started in 2019 with one irritation: agencies made you choose.
            Beautiful or fast. Award-winning or revenue-generating. Designers who
            couldn't ship or engineers who couldn't see. We refused the choice.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "20px" }}>
        <div className="container prose" data-reveal>
          <p>
            Seven years later, the refusal became a method. Every Devibi project pairs a
            designer and an engineer from day one, with a growth lead looking over both
            shoulders. The designer keeps it human. The engineer keeps it honest. The
            growth lead keeps it accountable to the only metric that matters: did this
            move the business?
          </p>
          <p>
            That's why our <Link href="/services/website-design-development">websites</Link> win
            awards <em>and</em> pass Core Web Vitals. Why our{" "}
            <Link href="/services/app-design-development">apps</Link> feel native <em>and</em> hit
            retention targets. Why our <Link href="/services/ai-integration">AI integrations</Link> demo
            well <em>and</em> survive production. Craft and growth aren't rivals here —
            they're the same discipline viewed from two angles.
          </p>
          <p>
            We're a deliberately small senior team — no account-manager telephone games,
            no juniors learning on your budget. You talk to the people doing the work,
            you see progress weekly, and you keep everything we make: files, code,
            documentation and the know-how to run it without us.
          </p>
        </div>
      </section>

      {/* Stats */}
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

      {/* Values */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( What we believe )</p>
            <h2 className="section__title" data-split>Four rules<br />we don't break.</h2>
          </header>
          <div className="process__steps">
            <div className="step glass" data-reveal>
              <span className="step__num">01</span>
              <h3>Ship weekly</h3>
              <p>You see working software every week. Surprises belong in birthday parties, not project demos.</p>
            </div>
            <div className="step glass" data-reveal>
              <span className="step__num">02</span>
              <h3>Measure everything</h3>
              <p>Every design decision is a hypothesis. We instrument the work so the data — not the loudest opinion — settles debates.</p>
            </div>
            <div className="step glass" data-reveal>
              <span className="step__num">03</span>
              <h3>Tell the truth</h3>
              <p>If a feature isn't worth building or a trend isn't worth chasing, we say so — even when agreeing would pay better.</p>
            </div>
            <div className="step glass" data-reveal>
              <span className="step__num">04</span>
              <h3>Leave them able</h3>
              <p>Documentation, training and clean handoffs. The goal is a client who could leave but doesn't want to.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <header className="section__head">
            <p className="eyebrow" data-reveal>( How we flow )</p>
            <h2 className="section__title" data-split>From spark to scale.</h2>
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

      <CTABand
        title="Sound like your kind of studio?"
        line="Tell us what you're building. We'll tell you honestly whether we're the right team for it."
        label="Start the conversation"
        href="/contact?source=about"
      />
    </>
  );
}
