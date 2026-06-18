import Link from "next/link";

export default function CTABand({
  title = "Let's make something liquid.",
  line = "Tell us where you are and where you want to be. We'll reply within one business day.",
  label = "Start a project",
  href = "/contact",
}) {
  return (
    <section className="section cta-band">
      <div className="container">
        <div className="glass cta-band__inner" data-tilt data-reveal>
          <div>
            <h2>{title}</h2>
            <p>{line}</p>
          </div>
          <Link href={href} className="btn btn--primary" data-magnetic>
            <span className="btn__fill" />
            <span className="btn__label">{label}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
