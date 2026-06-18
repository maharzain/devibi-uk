"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/tracking";

const SERVICES = ["Website", "App", "AI", "SEO", "CRO", "Brand"];
const BUDGETS = ["Under $10k", "$10–25k", "$25–50k", "$50k+", "Not sure yet"];
const SERVICE_FROM_SLUG = {
  "website-design-development": "Website",
  "app-design-development": "App",
  "ai-integration": "AI",
  seo: "SEO",
  "conversion-rate-optimization": "CRO",
  "brand-motion": "Brand",
};

function fallbackMailto(payload) {
  const subject = encodeURIComponent(`Project enquiry from ${payload.name || payload.email}`);
  const body = encodeURIComponent(
    [
      `Name: ${payload.name || "Not provided"}`,
      `Email: ${payload.email}`,
      `Services: ${payload.services.length ? payload.services.join(", ") : "Not selected"}`,
      `Budget: ${payload.budget || "Not selected"}`,
      "",
      "Project details:",
      payload.message || "Not provided",
    ].join("\n")
  );

  return `mailto:hello@devibi.com?subject=${subject}&body=${body}`;
}

export default function ContactForm() {
  const [selected, setSelected] = useState([]);
  const [budget, setBudget] = useState(null);
  const [sent, setSent] = useState(false);
  const [shake, setShake] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);
  const [notice, setNotice] = useState(
    "No spam, no obligation, no sales sequence — just an honest reply within one business day."
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = SERVICE_FROM_SLUG[params.get("service")];
    if (service) {
      setSelected((prev) => (prev.includes(service) ? prev : [...prev, service]));
    }
  }, []);

  const toggle = (s) =>
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const onFormStart = () => {
    if (started || sent) return;
    setStarted(true);
    trackEvent("contact_form_start", {
      page_path: window.location.pathname + window.location.search,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.elements.email;

    if (!email.checkValidity()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      email.focus();
      trackEvent("contact_form_error", {
        error_type: "invalid_email",
        page_path: window.location.pathname + window.location.search,
      });
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      services: selected,
      budget: budget || "",
      message: formData.get("message") || "",
      website: formData.get("website") || "",
      source:
        new URLSearchParams(window.location.search).get("service") ||
        new URLSearchParams(window.location.search).get("source") ||
        "contact",
      pagePath: window.location.pathname + window.location.search,
    };

    setSubmitting(true);
    setNotice("Sending your project details...");
    trackEvent("contact_form_submit", {
      services: selected.join(", "),
      budget: budget || "Not selected",
      page_path: payload.pagePath,
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        const mailto = data.mailto || fallbackMailto(payload);
        window.location.href = mailto;
        setNotice("We could not send it automatically, so your email app is opening with the details prefilled.");
        trackEvent("contact_form_fallback", {
          reason: data.error || "delivery_failed",
          page_path: payload.pagePath,
        });
        return;
      }

      setSent(true);
      setNotice("No spam, no obligation, no sales sequence — just an honest reply within one business day.");
      trackEvent("contact_form_success", {
        services: selected.join(", "),
        budget: budget || "Not selected",
        page_path: payload.pagePath,
      });
    } catch (error) {
      window.location.href = fallbackMailto(payload);
      setNotice("We could not send it automatically, so your email app is opening with the details prefilled.");
      trackEvent("contact_form_fallback", {
        reason: "network_error",
        page_path: payload.pagePath,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className={`contact__form glass${sent ? " is-sent" : ""}`}
      onSubmit={onSubmit}
      onFocusCapture={onFormStart}
      noValidate
      data-reveal
    >
      <input type="hidden" name="services" value={selected.join(", ")} />
      <input type="hidden" name="budget" value={budget || ""} />
      <input type="hidden" name="website" tabIndex={-1} autoComplete="off" />
      <div className="field">
        <label htmlFor="fName">Your name</label>
        <input id="fName" name="name" type="text" placeholder="Ada Lovelace" autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="fEmail">Email</label>
        <input
          id="fEmail"
          name="email"
          type="email"
          placeholder="ada@company.com"
          required
          autoComplete="email"
          style={shake ? { borderColor: "var(--orange)", transform: "translateX(-4px)" } : undefined}
        />
      </div>
      <div className="field">
        <label id="chipsLabel">What do you need?</label>
        <div className="chips" role="group" aria-labelledby="chipsLabel">
          {SERVICES.map((s) => (
            <button
              type="button"
              key={s}
              className={`chip${selected.includes(s) ? " is-active" : ""}`}
              aria-pressed={selected.includes(s)}
              onClick={() => toggle(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="field">
        <label id="budgetLabel">Budget range <em className="field__optional">(optional — helps us scope honestly)</em></label>
        <div className="chips" role="group" aria-labelledby="budgetLabel">
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
        <label htmlFor="fMsg">Project details</label>
        <textarea id="fMsg" name="message" rows={4} placeholder="What do you want built, fixed or grown?" />
      </div>
      <button type="submit" className="btn btn--primary btn--full" data-magnetic disabled={sent || submitting}>
        <span className="btn__fill" />
        <span className="btn__label">{sent ? "Sent ✦" : submitting ? "Sending ✦" : "Get my project estimate ✦"}</span>
      </button>
      <p className="form__note">
        {notice}
      </p>
      <p className="form__success" role="status">
        Message poured. We'll be in touch within 24h. ✦
      </p>
    </form>
  );
}
