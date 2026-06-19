import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import Analytics from "@/components/Analytics";
import Script from "next/script";
import { SITE, SERVICES } from "@/lib/services";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const tagId = gaId || adsId;

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Web Design, App Development, AI Automation, SEO & CRO Agency — Devibi",
    template: "%s | Devibi",
  },
  description: SITE.description,
  applicationName: "Devibi",
  openGraph: {
    siteName: "Devibi",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devibi — Web Design, App Development, AI Automation, SEO & CRO Agency",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080502" },
    { media: "(prefers-color-scheme: light)", color: "#faf4ec" },
  ],
};

const orgJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    image: `${SITE.url}/opengraph-image`,
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        url: `${SITE.url}/services/${s.slug}`,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='42' fill='%23ff5e1f'/></svg>"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        {tagId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
              strategy="afterInteractive"
            />
            <Script id="devibi-ga" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                ${gaId ? `gtag('config', '${gaId}', { send_page_view: false });` : ""}
                ${adsId ? `gtag('config', '${adsId}');` : ""}
              `}
            </Script>
          </>
        ) : null}
        <a href="#content" className="skip-link">Skip to content</a>
        <div className="grain" aria-hidden="true" />
        <div className="aurora aurora--a" aria-hidden="true" />
        <div className="aurora aurora--b" aria-hidden="true" />
        <SmoothScroll />
        <Analytics />
        <Cursor />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
