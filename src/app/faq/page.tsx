import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { CtaLink } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import { externalLinks } from "@/lib/links";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { faqs, faqAnswerText } from "@/lib/faqs";
import { FaqList } from "./faq-list";

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

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Frequently asked questions"
        title="Straight answers about Pollard Now."
        description="No jargon. If you have a question we haven’t covered, get in touch — we’d rather answer it than leave you guessing."
      />

      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <FaqList />

        <p className="mt-6 text-sm text-foreground-muted">
          Find more FAQs on the{" "}
          <a
            href={externalLinks.projectFaqs}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:text-primary-hover"
          >
            official Pollard Middle School Project page
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only">(opens in new tab)</span>
          </a>
          .
        </p>

        <div className="mt-12 rounded-2xl border border-border bg-surface-muted p-7 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Still have a question?
          </h2>
          <p className="mt-2 max-w-xl text-foreground-muted">
            Send us a note — a real human reads every message. Or jump
            straight to the official Pollard Middle School Project page for
            source documents.
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
              Official Pollard Middle School Project page ↗
            </CtaLink>
          </div>
        </div>
      </section>

      <JsonLd
        id="ld-faq"
        data={faqPageSchema(
          faqs.map((f) => ({ q: f.q, a: faqAnswerText(f) })),
        )}
      />
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
