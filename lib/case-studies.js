export const CASE_STUDIES = [
  {
    slug: "halcyon-fintech-website",
    client: "Halcyon",
    title: "Fintech website design and development that doubled organic signups",
    metaTitle: "Halcyon Fintech Website Case Study",
    metaDescription:
      "See how Devibi rebuilt Halcyon's fintech website with SEO-ready Next.js development, clearer positioning and a 3D brand world that helped double organic signups.",
    service: "Website Design & Development",
    summary:
      "Halcyon needed a fintech website that could explain a complex product, load quickly and turn organic search traffic into qualified signups.",
    challenge:
      "The old site looked polished but made buyers work too hard. The offer was buried, product proof was scattered, and key pages were too slow for high-intent search traffic.",
    solution:
      "Devibi rebuilt the site around buyer questions, fast Next.js pages, clear product storytelling, SEO foundations and a lightweight 3D visual system that sales could reuse.",
    outcomes: [
      "Organic signups doubled within one quarter of launch",
      "Core landing pages shipped with green Core Web Vitals",
      "The 3D hero became a recurring talking point in sales calls",
    ],
    services: ["Website Design", "Next.js Development", "Technical SEO", "3D Direction"],
  },
  {
    slug: "pulse-fitness-app",
    client: "Pulse",
    title: "Health app design and development focused on first-week retention",
    metaTitle: "Pulse Fitness App Case Study",
    metaDescription:
      "See how Devibi designed and developed Pulse, a health and fitness app built around faster onboarding, streaks and retention-focused product loops.",
    service: "App Design & Development",
    summary:
      "Pulse needed an iOS and Android app that made the value obvious in the first session and gave users a reason to return the next day.",
    challenge:
      "The concept was strong, but the early product tried to teach too much before giving users a win. That created onboarding friction and weak habit formation.",
    solution:
      "We redesigned the onboarding around time-to-first-value, built native-feel progress loops and shipped a launch-ready app with analytics for retention cohorts.",
    outcomes: [
      "First-session value was reduced to a guided three-step flow",
      "Streaks, progress rings and reminders created a clear return loop",
      "The launch roadmap separated must-have MVP features from later bets",
    ],
    services: ["Product Strategy", "UX/UI Design", "Mobile Development", "Retention Analytics"],
  },
  {
    slug: "mindgrid-ai-support-copilot",
    client: "Mindgrid",
    title: "AI support copilot that resolved 68% of tickets autonomously",
    metaTitle: "Mindgrid AI Support Copilot Case Study",
    metaDescription:
      "See how Devibi built an AI support copilot for Mindgrid using RAG, workflow automation and evaluation guardrails to resolve 68% of tickets autonomously.",
    service: "AI Integration & Automation",
    summary:
      "Mindgrid wanted an AI support assistant that could answer real customer questions from internal docs without inventing answers.",
    challenge:
      "Support volume was rising faster than the team could hire. The company had docs, policies and order data, but no safe way for an AI assistant to use them in production.",
    solution:
      "We built a retrieval-based support copilot, connected it to order workflows, added escalation rules and evaluated answers before customers ever saw the system.",
    outcomes: [
      "68% of support tickets resolved before a human reply",
      "Escalation paths kept sensitive or uncertain answers safe",
      "Support leaders gained reporting on deflection, saves and failure modes",
    ],
    services: ["AI Strategy", "RAG", "Workflow Automation", "Evaluation & Guardrails"],
  },
  {
    slug: "auralis-ecommerce-cro-seo",
    client: "Auralis",
    title: "E-commerce SEO and CRO program that tripled revenue in nine months",
    metaTitle: "Auralis E-commerce SEO and CRO Case Study",
    metaDescription:
      "See how Devibi combined SEO and conversion rate optimization for Auralis to increase conversion rate by 212% and triple revenue in nine months.",
    service: "SEO & Conversion Rate Optimization",
    summary:
      "Auralis had paid traffic and product demand, but weak product-page clarity and search visibility were limiting revenue.",
    challenge:
      "Visitors were arriving with intent but hesitating at the product page. Search traffic was thin, paid traffic was getting expensive and the checkout path leaked trust.",
    solution:
      "We paired SEO content with CRO research, product-page rewrites, funnel fixes and an experiment backlog ranked by expected revenue impact.",
    outcomes: [
      "+212% conversion rate lift on the core product path",
      "Revenue tripled over nine months",
      "SEO and CRO wins improved paid, organic and email traffic at the same time",
    ],
    services: ["SEO Strategy", "Conversion Audit", "Landing Page Optimization", "Revenue Reporting"],
  },
];

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
