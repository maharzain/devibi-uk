"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/tracking";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("page_view", {
      page_path: window.location.pathname + window.location.search,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const isLeadIntent = href.startsWith("/contact") || href.includes("/contact?") || href.startsWith("mailto:");
      if (!isLeadIntent) return;

      trackEvent("cta_click", {
        cta_text: link.textContent?.replace(/\s+/g, " ").trim() || "Untitled CTA",
        cta_href: href,
        page_path: window.location.pathname + window.location.search,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
