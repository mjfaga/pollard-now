import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { CtaLink } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import { externalLinks } from "@/lib/links";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Plain-language answers about the Pollard Now campaign, the debt exclusion override, and the new Pollard Middle School project.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — Pollard Now",
    description:
      "Plain-language answers about the Pollard Now campaign, the debt exclusion override, and the new Pollard Middle School project.",
    url: "/faq",
  },
};

type Faq = { q: string; a: string };

// Plain-text answers double as both rendered content and FAQPage schema
// source — keeps Google's FAQ rich results in sync with what visitors read.
const faqs: Faq[] = [
  {
    q: "What is Pollard Now asking me to do?",
    a: "Support passage of the debt exclusion override in Needham to fund a new Pollard Middle School for grades 6–8. That means voting on the override when it appears on the ballot — and, if you can, helping us reach neighbors with accurate information before then.",
  },
  {
    q: "What is a debt exclusion override?",
    a: "A debt exclusion is the way Massachusetts cities and towns vote to fund a specific capital project — like a new school — outside the normal Proposition 2½ limits on property tax growth. It is tied to one project. When the borrowing for that project is paid off, the temporary tax increase ends.",
  },
  {
    q: "Why a new building instead of renovating Pollard?",
    a: "The current building has been studied, patched, and stretched well past its useful life. A new build is the option that delivers modern learning space, long-term operating savings, and a building that can serve Needham for decades. The Needham Public Schools project page has the full feasibility analysis.",
  },
  {
    q: "How does this benefit residents who don’t have middle schoolers?",
    a: "Strong public schools are one of the biggest reasons families choose Needham — and that protects home values across the whole community. A modern, energy-efficient building also lowers long-term operating costs and creates space the town can use beyond the school day, for athletics, the arts, and community events.",
  },
  {
    q: "When would construction happen?",
    a: "Schedule and phasing are managed by Needham Public Schools and the town. The most current timeline lives on the official Pollard Building Project page — please use that as the source of truth.",
  },
  {
    q: "How much will it cost the average household?",
    a: "Cost estimates depend on the final scope, financing terms, and your assessed property value. The Needham Public Schools project page publishes the most recent figures and impact tables — we link to it below.",
  },
  {
    q: "Where do I find the official project documents?",
    a: "The Needham Public Schools Pollard Building Project page is the authoritative source for plans, financial projections, meeting minutes, and timeline updates.",
  },
  {
    q: "I’d like to help. What can I do?",
    a: "Three high-leverage things: (1) talk to your neighbors, (2) sign up for our email updates so you have facts and dates handy, and (3) donate or volunteer to help us reach every household in town.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Frequently asked questions"
        title="Straight answers about Pollard Now."
        description="No jargon. If you have a question we haven’t covered, get in touch — we’d rather answer it than leave you guessing."
      />

      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
          {faqs.map((f) => (
            <li key={f.q}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left font-medium text-foreground transition-colors hover:bg-surface-muted/60 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-lg">{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border-strong bg-background text-primary transition-transform group-open:rotate-45"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 leading-relaxed text-foreground-muted">
                  {f.a}
                </div>
              </details>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border border-border bg-surface-muted p-7 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Still have a question?
          </h2>
          <p className="mt-2 max-w-xl text-foreground-muted">
            Send us a note — a real human reads every message. Or jump
            straight to the official project page for source documents.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-contrast hover:bg-primary-hover"
            >
              Contact us
            </Link>
            <CtaLink
              href={externalLinks.projectPage}
              external
              variant="ghost"
              className="text-sm"
            >
              Official project page ↗
            </CtaLink>
          </div>
        </div>
      </section>

      <JsonLd id="ld-faq" data={faqPageSchema(faqs)} />
      <JsonLd
        id="ld-faq-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
    </>
  );
}
