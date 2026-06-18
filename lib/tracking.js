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
