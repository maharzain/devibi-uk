"use client";

/* ============================================================
   UK Google Ads lead form — dedicated to /uk-website-development.
   Reuses the existing /api/contact endpoint, tracking events and
   form styling (.contact__form, .field, .chips, .chip, .btn) so it
   stays native to the site. UK-tailored, qualifying fields; the
   shared backend is untouched — phone/company/type/timeline are
   folded into the message so every detail reaches the inbox.
   ============================================================ */

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/tracking";

const PROJECT_TYPES = [
  "New website",
  "Website redesign",
  "E-commerce store",
  "Web application",
  "Not sure yet",
];
const BUDGETS = ["Under £2k", "£2k – £5k", "£5k – £10k", "£10k+", "Not sure yet"];
const TIMELINES = ["ASAP", "1–3 months", "3+ months", "Just exploring"];

const SOURCE = "uk-website-development";

function composeMessage({ phone, company, projectType, timeline, message }) {
  const head = [
    phone ? `Phone: ${phone}` : null,
    company ? `Company / current website: ${company}` : null,
    projectType ? `Project type: ${projectType}` : null,
    timeline ? `Preferred timeline: ${timeline}` : null,
  ].filter(Boolean);

  return [
    head.join("\n"),
    head.length ? "" : null,
    "— Project brief —",
    message ? message.trim() : "Not provided",
  ]
    .filter((v) => v !== null)
    .join("\n");
}

function fallbackMailto(payload) {
  const subject = encodeURIComponent(`Website quote request from ${payload.name || payload.email}`);
  const body = encodeURIComponent(
    [
      `Name: ${payload.name || "Not provided"}`,
      `Email: ${payload.email}`,
      `Budget: ${payload.budget || "Not selected"}`,
      `Source: ${payload.source}`,
      "",
      payload.message,
    ].join("\n")
  );
  return `mailto:hello@devibi.com?subject=${subject}&body=${body}`;
}

export default function UKLeadForm() {
  const [projectType, setProjectType] = useState("New website");
  const [budget, setBudget] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [sent, setSent] = useState(false);
  const [shake, setShake] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);
  const [notice, setNotice] = useState(
    "Free, no-obligation quote. We reply within one business day — no sales sequence, no spam."
  );

  /* Honour ?type= deep-links from ad copy / sitelinks (e.g. ?type=ecommerce) */
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    const map = {
      new: "New website",
      redesign: "Website redesign",
      ecommerce: "E-commerce store",
      webapp: "Web application",
    };
    if (t && map[t]) setProjectType(map[t]);
  }, []);

  const onFormStart = () => {
    if (started || sent) return;
    setStarted(true);
    trackEvent("lead_form_start", {
      form: SOURCE,
      page_path: window.location.pathname + window.location.search,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name;
    const email = form.elements.email;

    if (!name.value.trim() || !email.checkValidity()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      (!name.value.trim() ? name : email).focus();
      trackEvent("lead_form_error", {
        form: SOURCE,
        error_type: !name.value.trim() ? "missing_name" : "invalid_email",
        page_path: window.location.pathname + window.location.search,
      });
      return;
    }

    const fd = new FormData(form);
    const pagePath = window.location.pathname + window.location.search;
    const payload = {
      name: fd.get("name") || "",
      email: fd.get("email") || "",
      services: [projectType],
      budget: budget || "",
      message: composeMessage({
        phone: fd.get("phone") || "",
        company: fd.get("company") || "",
        projectType,
        timeline: timeline || "",
        message: fd.get("message") || "",
      }),
      website: fd.get("website") || "", // honeypot
      source: SOURCE,
      pagePath,
    };

    setSubmitting(true);
    setNotice("Sending your details…");
    trackEvent("lead_form_submit", {
      form: SOURCE,
      project_type: projectType,
      budget: budget || "Not selected",
      timeline: timeline || "Not selected",
      page_path: pagePath,
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        window.location.href = data.mailto || fallbackMailto(payload);
        setNotice("We couldn't send it automatically, so your email app is opening with the details prefilled.");
        trackEvent("lead_form_fallback", {
          form: SOURCE,
          reason: data.error || "delivery_failed",
          page_path: pagePath,
        });
        return;
      }

      setSent(true);
      setNotice("Free, no-obligation quote. We reply within one business day.");
      trackEvent("lead_form_success", {
        form: SOURCE,
        project_type: projectType,
        budget: budget || "Not selected",
        timeline: timeline || "Not selected",
        page_path: pagePath,
      });
      /* Google Ads conversion hook — fires the named event if a
         conversion label is wired up in GTM / gtag for this page. */
      trackEvent("generate_lead", { form: SOURCE, page_path: pagePath });
    } catch (error) {
      window.location.href = fallbackMailto(payload);
      setNotice("We couldn't send it automatically, so your email app is opening with the details prefilled.");
      trackEvent("lead_form_fallback", {
        form: SOURCE,
        reason: "network_error",
        page_path: pagePath,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className={`contact__form glass lp-form${sent ? " is-sent" : ""}`}
      onSubmit={onSubmit}
      onFocusCapture={onFormStart}
      noValidate
      aria-label="Get a free website quote"
    >
      <div className="lp-form__head">
        <strong>Get your free quote</strong>
        <span>2-minute form · fixed-price quote within one business day</span>
      </div>

      {/* honeypot — must stay named "website" for the API spam check.
          type="hidden" (matching ContactForm) so autofill can't populate
          it and silently get the lead dropped server-side. */}
      <input type="hidden" name="website" tabIndex={-1} autoComplete="off" />

      <div className="lp-form__row">
        <div className="field">
          <label htmlFor="lpName">Your name</label>
          <input
            id="lpName"
            name="name"
            type="text"
            placeholder="Jane Smith"
            autoComplete="name"
            required
            style={shake ? { borderColor: "var(--orange)" } : undefined}
          />
        </div>
        <div className="field">
          <label htmlFor="lpEmail">Email</label>
          <input
            id="lpEmail"
            name="email"
            type="email"
            placeholder="jane@company.co.uk"
            autoComplete="email"
            required
            style={shake ? { borderColor: "var(--orange)" } : undefined}
          />
        </div>
      </div>

      <div className="lp-form__row">
        <div className="field">
          <label htmlFor="lpPhone">Phone <em className="lp-opt">(for a faster callback)</em></label>
          <input id="lpPhone" name="phone" type="tel" placeholder="07123 456789" autoComplete="tel" inputMode="tel" />
        </div>
        <div className="field">
          <label htmlFor="lpCompany">Company or website <em className="lp-opt">(optional)</em></label>
          <input id="lpCompany" name="company" type="text" placeholder="company.co.uk" autoComplete="organization" />
        </div>
      </div>

      <div className="field">
        <label id="lpTypeLabel">What do you need?</label>
        <div className="chips" role="group" aria-labelledby="lpTypeLabel">
          {PROJECT_TYPES.map((t) => (
            <button
              type="button"
              key={t}
              className={`chip${projectType === t ? " is-active" : ""}`}
              aria-pressed={projectType === t}
              onClick={() => setProjectType(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label id="lpBudgetLabel">Budget <em className="lp-opt">(optional — helps us scope honestly)</em></label>
        <div className="chips" role="group" aria-labelledby="lpBudgetLabel">
          {BUDGETS.map((b) => (
            <button
              type="button"
              key={b}
              className={`chip${budget === b ? " is-active" : ""}`}
              aria-pressed={budget === b}
              onClick={() => setBudget(budget === b ? null : b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label id="lpTimeLabel">Timeline <em className="lp-opt">(optional)</em></label>
        <div className="chips" role="group" aria-labelledby="lpTimeLabel">
          {TIMELINES.map((t) => (
            <button
              type="button"
              key={t}
              className={`chip${timeline === t ? " is-active" : ""}`}
              aria-pressed={timeline === t}
              onClick={() => setTimeline(timeline === t ? null : t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="lpMsg">Anything else? <em className="lp-opt">(optional)</em></label>
        <textarea id="lpMsg" name="message" rows={3} placeholder="A line or two about your project, goals or current site." />
      </div>

      <button type="submit" className="btn btn--primary btn--full" data-magnetic disabled={sent || submitting}>
        <span className="btn__fill" />
        <span className="btn__label">{sent ? "Sent ✦" : submitting ? "Sending ✦" : "Get my free quote ✦"}</span>
      </button>

      <p className="lp-form__note">{notice}</p>
      <p className="form__success" role="status">
        Thanks — your request is in. We'll reply within one business day. ✦
      </p>
    </form>
  );
}
