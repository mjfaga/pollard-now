import { SITE, absUrl } from "./site";
import { externalLinks } from "./links";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en-US",
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.tagline,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: absUrl(SITE.ogImage),
      width: SITE.ogImageWidth,
      height: SITE.ogImageHeight,
    },
    image: absUrl(SITE.ogImage),
    description: SITE.description,
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${SITE.area.city}, ${SITE.area.region}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.area.city,
        addressRegion: SITE.area.region,
        addressCountry: SITE.area.country,
      },
    },
    sameAs: [externalLinks.projectPage],
  };
}

export function breadcrumbSchema(
  trail: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: absUrl(step.path),
    })),
  };
}

type Qa = { q: string; a: string };

export function faqPageSchema(faqs: ReadonlyArray<Qa>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
