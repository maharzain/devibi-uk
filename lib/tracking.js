"use client";

export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event: name,
    ...params,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  window.dispatchEvent(
    new CustomEvent("devibi:analytics", {
      detail: { name, params },
    })
  );
}

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

/* A unique id per conversion so Google Ads can de-duplicate accidental
   double-fires (same conversion action + transaction_id = counted once). */
export function conversionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/* Fire a Google Ads conversion. `label` is the per-action conversion label
   from the Google Ads conversion action (the part after the "/").
   No-op until BOTH the Ads ID (NEXT_PUBLIC_GOOGLE_ADS_ID) and a label are
   set — so it's safe to call before tracking is wired up, and you avoid
   double-counting if you instead import the conversion from GA4.

   Falls back to dataLayer if gtag.js hasn't finished loading, so the
   conversion is queued and replayed instead of silently dropped. */
export function trackAdsConversion(label, params = {}) {
  if (typeof window === "undefined" || !ADS_ID || !label) return;

  window.dataLayer = window.dataLayer || [];
  const gtag =
    typeof window.gtag === "function"
      ? window.gtag
      : function () {
          window.dataLayer.push(arguments);
        };

  gtag("event", "conversion", {
    send_to: `${ADS_ID}/${label}`,
    ...params,
  });
}
