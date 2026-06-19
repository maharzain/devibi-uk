"use client";

/* "Book a free consultation" button for the UK landing page.
   Opens the Google Calendar booking page and reports the click as a
   Google Ads conversion (consultation booking) + a GA/dataLayer event.
   Conversion only fires when the Ads env vars are configured. */

import { useRef } from "react";
import { trackEvent, trackAdsConversion, conversionId } from "@/lib/tracking";

const CALENDAR_URL = "https://calendar.app.google/3MuAQUyiX9vG8qqX6";

export default function ConsultButton() {
  const counted = useRef(false);

  const onClick = () => {
    const pagePath =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "";

    // GA click intent every time (analytics), but the Ads conversion once
    // per session — the link opens a new tab so the page stays mounted.
    trackEvent("book_consultation_click", {
      form: "uk-website-development",
      page_path: pagePath,
    });
    if (!counted.current) {
      counted.current = true;
      trackAdsConversion(process.env.NEXT_PUBLIC_GADS_CONSULT_LABEL, {
        transaction_id: conversionId(),
      });
    }
  };

  return (
    <a
      href={CALENDAR_URL}
      target="_blank"
      rel="noreferrer"
      className="btn btn--ghost"
      data-magnetic
      onClick={onClick}
    >
      <span className="btn__fill" />
      <span className="btn__label">Book a free consultation</span>
    </a>
  );
}
