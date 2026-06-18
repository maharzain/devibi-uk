/* ============================================================
   DEVIBI — site config + service content (single source of truth)
   Powers /services, /services/[slug], metadata, JSON-LD and sitemap.
   ============================================================ */

export const SITE = {
  name: "Devibi",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://devibi.com",
  email: "hello@devibi.com",
  lastModified: "2026-06-14",
  description:
    "Devibi is a web design, app development, AI automation, SEO and CRO agency that builds fast websites, useful apps and growth systems that turn traffic into qualified leads.",
};

export const SERVICES = [
  /* ------------------------------------------------------ */
  {
    slug: "website-design-development",
    name: "Website Design & Development",
    shortName: "Websites",
    icon: "web",
    cardLine:
      "Custom website design and development for fast, SEO-ready sites that turn visitors into booked calls.",
    metaTitle: "Website Design & Development Agency",
    metaDescription:
      "Website design and development agency for fast, SEO-ready marketing sites and web apps that turn visitors into qualified leads and booked calls.",
    hero: {
      h1: "Website design and development built to win leads",
      sub: "We build fast, SEO-ready marketing sites and web apps that explain your offer clearly, prove trust quickly and turn visitors into booked calls without template bloat.",
    },
    intro: [
      "Most agency websites win compliments, not customers. They look fine in a portfolio and fall apart in the field: four-second load times, no clear next step, copy written for the founder instead of the buyer.",
      "We build the other kind. Every Devibi website starts with your customer's questions and your revenue goal, then layers on the craft — custom design, motion, 3D — without sacrificing the fundamentals search engines and buyers actually reward: speed, clarity and a reason to act.",
    ],
    deliverables: [
      { title: "UX research & site architecture", desc: "We map what your visitors are trying to do before we draw a single screen, then structure pages around those jobs." },
      { title: "Custom UI & motion design", desc: "A design system built for your brand — not a template with your logo on it — with motion that guides attention instead of stealing it." },
      { title: "Next.js & Webflow development", desc: "Clean, fast, accessible code. Static-rendered pages, image optimization and Core Web Vitals in the green from day one." },
      { title: "3D & interactive experiences", desc: "Three.js scenes, scroll-driven storytelling and GSAP motion graphics where they add persuasion, not page weight." },
      { title: "CMS & content workflows", desc: "Editors your team can use without calling a developer. Publish a page in minutes, not tickets." },
      { title: "SEO-ready foundations", desc: "Semantic markup, structured data, sitemaps and per-page metadata baked in — so rankings start working from launch." },
    ],
    outcomes: [
      "Sub-second first load on every core page",
      "Core Web Vitals passing on mobile and desktop",
      "A site your team can update without a developer",
      "Launch in 6–10 weeks for most marketing sites",
    ],
    faqs: [
      {
        q: "How long does a website design and development project take?",
        a: "Most marketing websites take 6–10 weeks from kickoff to launch: 2–3 weeks of research and design, 3–5 weeks of development, and a week for content, QA and launch. Larger web apps run 12 weeks and up. You see working pages every week — never a big reveal at the end.",
      },
      {
        q: "How much does a custom website cost?",
        a: "Most Devibi website projects land between $8,000 and $40,000 depending on page count, custom functionality and the level of 3D and motion work. After a 30-minute scoping call we send a fixed quote — no hourly meters running.",
      },
      {
        q: "Which platform do you build on — Next.js, Webflow or WordPress?",
        a: "It depends on who maintains the site after launch. We recommend Next.js for product companies that want top performance and custom functionality, and Webflow when a marketing team needs full visual control without developers. We're honest about which fits — we build both every month.",
      },
      {
        q: "Will my new website be SEO-friendly?",
        a: "Yes — it's built in, not bolted on. Every site ships with semantic HTML, structured data, fast Core Web Vitals, clean URLs, per-page metadata and an XML sitemap. If you want to grow rankings after launch, our SEO team can take it from there.",
      },
    ],
    cta: { label: "Get a website estimate", line: "Tell us what the site needs to sell, explain or automate. We'll reply within one business day with the fastest path, likely timeline and a ballpark." },
    related: ["seo", "conversion-rate-optimization", "brand-motion"],
  },

  /* ------------------------------------------------------ */
  {
    slug: "app-design-development",
    name: "App Design & Development",
    shortName: "Apps",
    icon: "app",
    cardLine:
      "Mobile app design and development for iOS, Android and cross-platform launches with onboarding users understand fast.",
    metaTitle: "Mobile App Design & Development Agency",
    metaDescription:
      "Mobile app design and development agency for iOS, Android and cross-platform apps. Strategy, UX, backend, launch and retention built by Devibi.",
    hero: {
      h1: "Mobile app design and development built for retention",
      sub: "We design, build and launch iOS, Android and cross-platform apps that get users to value fast, feel native from day one and give you a roadmap after App Store approval.",
    },
    intro: [
      "Shipping an app is easy. Shipping an app that survives week one is the hard part: onboarding that gets users to value fast, performance that feels native, and a reason to come back tomorrow.",
      "Devibi handles the full journey — product strategy, UX and UI design, development, launch and the post-launch iteration loop where retention is actually won. One team, one roadmap, no hand-offs between a 'design shop' and a 'dev shop'.",
    ],
    deliverables: [
      { title: "Product strategy & scoping", desc: "We pressure-test the idea, cut the MVP to what proves value, and sequence the roadmap so you ship in months, not years." },
      { title: "UX & UI design", desc: "Flows prototyped in motion before a line of code — so you feel the app, not imagine it from static screens." },
      { title: "iOS & Android development", desc: "Swift and Kotlin when native performance matters; React Native or Flutter when one codebase serves both platforms better." },
      { title: "Backend & API engineering", desc: "Auth, data, notifications and integrations built on infrastructure that scales past your launch spike." },
      { title: "App Store launch", desc: "Store listings, screenshots, review compliance and a launch checklist that gets you approved the first time." },
      { title: "Post-launch analytics & iteration", desc: "Funnels and retention cohorts wired in from day one, with a monthly iteration cadence to act on them." },
    ],
    outcomes: [
      "MVP in the stores in 12–16 weeks",
      "One team from strategy through launch",
      "Onboarding designed around time-to-first-value",
      "Analytics you can act on, not vanity dashboards",
    ],
    faqs: [
      {
        q: "Should I build a native app or cross-platform?",
        a: "Cross-platform (React Native or Flutter) is right for roughly 80% of apps — one codebase, two stores, lower cost. Go native (Swift/Kotlin) when you need heavy animation, AR, advanced camera work or every millisecond of performance. We'll recommend based on your feature list, not our preference.",
      },
      {
        q: "How long does it take to build a mobile app?",
        a: "A focused MVP typically takes 12–16 weeks: 3–4 weeks of strategy and design, 8–10 weeks of development, then 1–2 weeks for store review and launch. Complex products with custom backends run longer — we'll give you a week-by-week plan before you commit.",
      },
      {
        q: "How much does app development cost?",
        a: "Most Devibi MVPs land between $30,000 and $120,000 depending on platform choice, backend complexity and design depth. We quote fixed prices per milestone, so the number you approve is the number you pay.",
      },
      {
        q: "Do you maintain apps after launch?",
        a: "Yes. Most clients stay on a monthly retainer covering OS updates, crash monitoring, feature iterations and store compliance. Launch day is the midpoint of an app's journey, not the end of ours.",
      },
    ],
    cta: { label: "Scope your app", line: "Bring the idea, napkin sketch or app that needs rescuing. We'll map the smallest launch version, the timeline and the risks before you spend heavily." },
    related: ["ai-integration", "website-design-development", "conversion-rate-optimization"],
  },

  /* ------------------------------------------------------ */
  {
    slug: "ai-integration",
    name: "AI Integration & Automation",
    shortName: "AI",
    icon: "ai",
    cardLine:
      "AI automation, chatbots and copilots connected to your data, CRM and support workflows.",
    metaTitle: "AI Automation & Integration Agency",
    metaDescription:
      "AI automation and integration agency for custom chatbots, LLM copilots, RAG systems and workflow automation connected to your business tools.",
    hero: {
      h1: "AI automation that saves hours every week",
      sub: "We build AI chatbots, copilots and workflow automations into the tools your team already uses, then measure the result in tickets resolved, manual work removed and time saved.",
    },
    intro: [
      "The gap between an AI demo and an AI system in production is where most projects die: hallucinations on real data, no evaluation, no guardrails, no owner. That gap is exactly what we specialise in closing.",
      "We integrate large language models — Claude, GPT and open-source — with your data and your workflows. Retrieval over your actual docs, automations that act inside your CRM and helpdesk, and evaluation suites that prove the system works before your customers test it for you.",
    ],
    deliverables: [
      { title: "AI opportunity audit", desc: "A two-week assessment of your workflows that ranks automation candidates by hours saved versus build cost — so you start where the ROI is." },
      { title: "Custom chatbots & copilots", desc: "Assistants trained on your docs, products and policies via retrieval (RAG) — grounded in your data, not guessing from the internet." },
      { title: "Workflow automation", desc: "AI steps inside the tools you already run — CRM enrichment, ticket triage, report drafting, data extraction from documents." },
      { title: "LLM API integration", desc: "Production integration of Claude, GPT or open-source models into your product, with streaming, caching and cost controls." },
      { title: "Evaluation & guardrails", desc: "Test suites, hallucination checks and escalation paths, so the system fails safely and improves measurably." },
      { title: "Team enablement", desc: "Documentation and training so your team can tune prompts and extend the system without calling us for every change." },
    ],
    outcomes: [
      "A working pilot in 2–4 weeks, not a 6-month roadmap",
      "Assistants grounded in your data via RAG",
      "Clear metrics: tickets deflected, hours saved",
      "Your data stays in your infrastructure",
    ],
    faqs: [
      {
        q: "Which AI model will you use for our project?",
        a: "Whichever fits the job. We work with Claude, GPT and open-source models, and we benchmark them on your actual tasks during the pilot. Model choice is an engineering decision we revisit as the landscape shifts — not a loyalty program.",
      },
      {
        q: "Is our company data safe in an AI integration?",
        a: "Yes, when it's architected properly. Your data stays in your infrastructure, retrieval happens over your own stores, and we use API agreements where providers don't train on your inputs. For sensitive workloads we can deploy open-source models entirely inside your environment.",
      },
      {
        q: "How long does an AI integration take?",
        a: "We ship a working pilot on real data in 2–4 weeks, then harden it for production in another 4–8 depending on integrations and compliance. You'll know whether the system earns its keep within the first month — before the big investment, not after.",
      },
      {
        q: "What does it cost to run an AI assistant after launch?",
        a: "Usually less than people expect: most support copilots run on $200–$1,500 per month in model costs at small-to-mid scale. We design with caching, routing and model-size tiers to keep the bill proportional to the value, and you see the cost dashboard from day one.",
      },
    ],
    cta: { label: "Book an AI audit", line: "In two weeks we map your workflows, rank automation opportunities by ROI and show what to build first, what to avoid and why." },
    related: ["app-design-development", "website-design-development", "conversion-rate-optimization"],
  },

  /* ------------------------------------------------------ */
  {
    slug: "seo",
    name: "Search Engine Optimization",
    shortName: "SEO",
    icon: "seo",
    cardLine:
      "Technical SEO, content strategy and AI search optimization that grow qualified organic traffic.",
    metaTitle: "SEO Agency for Technical, Content & AI Search",
    metaDescription:
      "SEO agency for technical SEO audits, content strategy, on-page optimization and AI search visibility that grows qualified organic traffic and leads.",
    hero: {
      h1: "SEO services that bring qualified buyers to you",
      sub: "We fix the technical SEO, build the content map and optimize for Google, AI Overviews and answer engines so buyers can find you before they compare agencies.",
    },
    intro: [
      "SEO in 2026 is three games at once: classic Google rankings, the AI Overviews squeezing them, and answer engines like ChatGPT and Perplexity that cite sources instead of listing links. Most agencies still play only the first one.",
      "We run all three. Technical foundations that let crawlers through, content built around what your buyers actually search, and the structured, citable authority that gets you named in AI answers — measured in qualified traffic and pipeline, not vanity rankings.",
    ],
    deliverables: [
      { title: "Technical SEO audit & fixes", desc: "Crawlability, indexation, Core Web Vitals, structured data — found, prioritised and fixed, not just listed in a PDF." },
      { title: "Keyword & content strategy", desc: "A map of what your buyers search at every stage, ranked by intent and revenue potential — your editorial roadmap for the next two quarters." },
      { title: "On-page optimization", desc: "Titles, headings, internal linking and page structure tuned page by page, with before/after tracking." },
      { title: "Content production", desc: "Pages and articles written to answer the query better than anyone else on the results page — by writers who interview your experts." },
      { title: "AI search optimization", desc: "Structured data, citable formatting and entity work that gets your brand surfaced and cited by AI Overviews, ChatGPT and Perplexity." },
      { title: "Reporting tied to revenue", desc: "A monthly dashboard connecting rankings to traffic to leads — so you always know what the program returns." },
    ],
    outcomes: [
      "Compounding traffic instead of rented attention",
      "Visibility in Google and AI answer engines",
      "Content your sales team actually sends to prospects",
      "Reports in revenue terms, not jargon",
    ],
    faqs: [
      {
        q: "How long does SEO take to show results?",
        a: "Expect early movement in 6–8 weeks (technical fixes, quick-win pages) and meaningful traffic growth in 3–6 months. SEO compounds: month nine is typically dramatically better than month three. Anyone promising page one in two weeks is selling you something other than SEO.",
      },
      {
        q: "Do you guarantee first-page rankings?",
        a: "No — and you should run from anyone who does, since no agency controls Google. What we do guarantee is the inputs: a fixed scope of audits, fixes and content each month, full transparency on what we did, and reporting honest enough to fire us with if it isn't working.",
      },
      {
        q: "What about AI search — ChatGPT, Perplexity and Google AI Overviews?",
        a: "It's already part of every engagement. AI engines favour content that's structured, specific and citable — clear answers, real data, schema markup and consistent entity signals. We optimise for being the source AI answers cite, which increasingly matters as much as the blue links.",
      },
      {
        q: "Do you write the content or do we?",
        a: "Either works. Our writers can produce everything from briefs to finished pages — interviewing your subject-matter experts so it doesn't read like generic AI filler. If you have an in-house team, we supply the strategy, briefs and optimization and let them write.",
      },
    ],
    cta: { label: "Get a free SEO snapshot", line: "Send us your URL. We'll reply with the three highest-leverage fixes for rankings, traffic and lead quality, no strings." },
    related: ["conversion-rate-optimization", "website-design-development", "ai-integration"],
  },

  /* ------------------------------------------------------ */
  {
    slug: "conversion-rate-optimization",
    name: "Conversion Rate Optimization",
    shortName: "CRO",
    icon: "cro",
    cardLine:
      "Conversion rate optimization audits, testing and landing page fixes that turn more traffic into leads.",
    metaTitle: "CRO Agency & Conversion Rate Optimization Services",
    metaDescription:
      "CRO agency for conversion audits, A/B testing, landing page optimization and funnel fixes that turn more existing traffic into leads and revenue.",
    hero: {
      h1: "CRO services that turn more visitors into leads",
      sub: "We find where buyers hesitate, fix the pages and forms leaking revenue, and turn the traffic you already paid for into more booked calls, signups and sales.",
    },
    intro: [
      "Most websites don't have a traffic problem. They have a leaky-bucket problem: visitors arrive, hesitate at an unclear headline, stall on a nine-field form, and leave. Pouring more ad spend into a leaking funnel just makes the leak more expensive.",
      "Our CRO program finds the leaks with research — analytics, session recordings, user testing — then fixes them with prioritised experiments. No redesign roulette, no 'best practices' applied blind. Hypotheses, tests, and compounding wins you can read in your revenue line.",
    ],
    deliverables: [
      { title: "Conversion audit", desc: "A full teardown of your funnel — analytics, heatmaps, session recordings — that locates exactly where and why visitors drop." },
      { title: "User research", desc: "Surveys, user tests and customer interviews that explain the 'why' behind the drop-offs the data can only point at." },
      { title: "Experiment backlog", desc: "Every fix ranked by expected impact, confidence and effort — so the highest-leverage test always runs next." },
      { title: "A/B testing program", desc: "Properly powered experiments, run to statistical significance — not called early because someone liked variant B." },
      { title: "Landing page & funnel redesign", desc: "When testing isn't feasible, research-driven redesigns of the pages doing the heaviest lifting: pricing, signup, checkout." },
      { title: "Revenue reporting", desc: "Each win quantified in conversion lift and projected annual revenue, so the program's ROI is never a matter of opinion." },
    ],
    outcomes: [
      "Average 3.2× conversion lift across engagements",
      "Every experiment tied to a revenue projection",
      "Wins compound across all your traffic channels",
      "Clear verdicts: shipped, killed or iterated",
    ],
    faqs: [
      {
        q: "How much traffic do I need for A/B testing?",
        a: "As a rule of thumb, around 1,000 conversions per month lets you run clean A/B tests at a reasonable pace. Below that we don't pretend — we shift to research-driven optimization: user testing, heuristic audits and redesigns validated qualitatively. Both paths raise conversion; the method just changes.",
      },
      {
        q: "How quickly will CRO show results?",
        a: "The audit lands inside two weeks and usually surfaces immediate fixes — broken flows, confusing copy, form friction. Structured experiments deliver wins from month two onward. Most clients see the program pay for itself within the first quarter.",
      },
      {
        q: "What tools do you use for CRO?",
        a: "Your analytics stack plus specialist tooling: GA4 or Mixpanel for funnels, Hotjar or Clarity for recordings and heatmaps, and modern testing platforms for experiments. If you have tools already, we work with them — the method matters more than the logo.",
      },
      {
        q: "Is CRO worth it for small websites?",
        a: "Yes, with the right method. Small sites skip the statistics and get research-driven redesigns of their highest-traffic pages instead. The leverage is identical — make the visitors you already paid for convert — even when the testing math doesn't cooperate.",
      },
    ],
    cta: { label: "Get a free CRO teardown", line: "We'll record a 10-minute funnel teardown with the three changes most likely to lift leads without buying more traffic." },
    related: ["seo", "website-design-development", "app-design-development"],
  },

  /* ------------------------------------------------------ */
  {
    slug: "brand-motion",
    name: "Brand Identity & Motion Design",
    shortName: "Brand",
    icon: "brand",
    cardLine:
      "Brand identity, motion design and 3D assets that make your company look trusted across every touchpoint.",
    metaTitle: "Brand Identity & Motion Design Agency",
    metaDescription:
      "Brand identity and motion design agency for logos, design systems, 3D assets and motion toolkits that make your company look trusted everywhere.",
    hero: {
      h1: "Brand identity and motion design that makes trust obvious",
      sub: "We build logos, visual systems, 3D assets and motion guidelines that make your company look credible on the website, inside the product and in every sales conversation.",
    },
    intro: [
      "A logo is not a brand. A brand is the accumulated feeling of every touchpoint — the site, the deck, the product UI, the way things move when a user clicks. When those touchpoints disagree, trust quietly leaks away.",
      "We build identity systems designed for where brands actually live now: screens. Logo and type and color, yes — but also the motion language, 3D assets and component styles that keep your brand coherent from landing page to app store to pitch deck.",
    ],
    deliverables: [
      { title: "Brand strategy & positioning", desc: "Workshops that nail who you're for, what you stand against and why you win — the brief everything else obeys." },
      { title: "Visual identity system", desc: "Logo, typography, color and art direction designed as a system, tested across real applications before delivery." },
      { title: "Motion language", desc: "How your brand moves — easing, timing, transitions — specified so every animation feels like you, in product and marketing alike." },
      { title: "3D & signature assets", desc: "Hero renders, product visuals and Three.js-ready assets that give your brand a dimension competitors' stock art can't match." },
      { title: "Design system & guidelines", desc: "Tokens, components and usage rules your designers and developers can actually apply — not a PDF that dies in a drawer." },
      { title: "Launch toolkit", desc: "Social templates, deck systems and announcement assets so the rebrand arrives everywhere at once, looking intentional." },
    ],
    outcomes: [
      "One coherent brand from website to app to deck",
      "Motion guidelines your developers can implement",
      "3D assets ready for web, video and campaigns",
      "Full rollout in 4–8 weeks for most engagements",
    ],
    faqs: [
      {
        q: "How long does a brand identity project take?",
        a: "A focused identity takes 4–6 weeks; a full system with motion language and 3D assets runs 6–8. Rebrands timed to a launch get a week-by-week rollout plan so the new brand lands everywhere on the same day.",
      },
      {
        q: "What's included in a brand identity package?",
        a: "Strategy, logo system, typography, color, art direction, and the application layer most studios skip: motion guidelines, component styles and templates for the places your brand actually appears. You get working files and tokens, not just a PDF.",
      },
      {
        q: "Do we need a full rebrand or a refresh?",
        a: "If your positioning still holds but the visuals feel dated, a refresh — sharpened logo, modernised type and color, new motion language — delivers most of the impact at a fraction of the disruption. We'll tell you honestly which you need in the first call.",
      },
      {
        q: "How do you hand off motion and 3D assets to our team?",
        a: "In formats your team can ship: easing tokens and timing specs for developers, Lottie and video exports for marketing, and documented Three.js or Blender source for 3D. Plus a working session with your team so the system survives contact with reality.",
      },
    ],
    cta: { label: "Start your rebrand", line: "Send us what you have today. We'll show whether you need a refresh, a full identity or just the missing pieces that make the brand convert." },
    related: ["website-design-development", "app-design-development", "seo"],
  },
];

export function getService(slug) {
  return SERVICES.find((s) => s.slug === slug);
}

/* General agency FAQs — shown on /services with FAQPage schema */
export const GENERAL_FAQS = [
  {
    q: "How much does a project with Devibi cost?",
    a: "Websites typically run $8,000–$40,000, app MVPs $30,000–$120,000, and growth retainers (SEO/CRO) start around $3,000 per month. Every engagement is quoted as a fixed price after a 30-minute scoping call — the number you approve is the number you pay.",
  },
  {
    q: "How do engagements work?",
    a: "Fixed-price milestones with weekly demos. You see working output every week, pay per approved milestone, and keep everything we make — files, code, documentation. No retainer lock-ins on project work, and retainers cancel with 30 days' notice.",
  },
  {
    q: "Do you work with startups or established companies?",
    a: "Both. Startups usually come for an MVP or first marketing site; established companies for redesigns, AI integration or growth programs. The constant is the team: senior designers and engineers, no juniors learning on your budget.",
  },
  {
    q: "Where is Devibi located? Do you work remotely?",
    a: "We work remotely with clients across 12 countries, overlapping at least four hours with your timezone. Kickoffs, weekly demos and workshops all happen on video — several of our longest-running clients we've never met in person.",
  },
];

export const TESTIMONIALS = [
  {
    quote: "Hired Devibi for website design, SEO, and digital marketing - couldn't be happier. Muhammad knows his stuff and gets real results. Our Google rankings improved and so did our sales. Highly recommend this agency for any business wanting to grow online.",
    name: "Chris Allen",
    role: "Google review • 5/5",
    source: "Google",
  },
  {
    quote: "Saad was great to work with, very polite and worked diligently in a timely manner to finish all the work as per requirements. I would use his services again and highly recommend him.",
    name: "Mattress By Appointment Northern Beaches",
    role: "Google review • 5/5",
    source: "Google",
  },
  {
    quote: "Muhammad was great to work with and got the job done quickly and efficiently with some excellent creative insights and a lot of patience, returning to tackle the problem in a couple of different ways. Highly recommend!",
    name: "Fran Cusworth",
    role: "Google review • 5/5",
    source: "Google",
  },
];

export const STATS = [
  { value: 87, suffix: "+", label: "Projects shipped" },
  { value: 14, suffix: "", label: "Industry awards" },
  { value: 32, suffix: "×", decimal: true, label: "Avg. conversion lift" },
  { value: 12, suffix: "", label: "Countries served" },
];

export const PROCESS = [
  { num: "01", title: "Discover", desc: "Workshops, research and audits. We map your users, market and metrics before a single pixel moves." },
  { num: "02", title: "Design", desc: "Brand, UX and UI explored in bold directions — prototyped in motion so you feel it, not imagine it." },
  { num: "03", title: "Build", desc: "Clean, fast, accessible engineering. Web, native or AI — shipped in weekly, demo-able increments." },
  { num: "04", title: "Grow", desc: "SEO, CRO and analytics loops that keep compounding long after launch day confetti settles." },
];
