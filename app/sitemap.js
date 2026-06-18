import { SERVICES, SITE } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/case-studies";

export default function sitemap() {
  const lastModified = new Date(SITE.lastModified);
  const staticPages = ["", "/services", "/work", "/about", "/contact", "/uk-website-development"].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const servicePages = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    lastModified: new Date(s.lastModified || SITE.lastModified),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const workPages = CASE_STUDIES.map((study) => ({
    url: `${SITE.url}/work/${study.slug}`,
    lastModified: new Date(study.lastModified || SITE.lastModified),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...servicePages, ...workPages];
}
