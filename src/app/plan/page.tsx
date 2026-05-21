import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { FeatureList } from "@/components/feature-list";
import { ClosingCta } from "@/components/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { externalLinks } from "@/lib/links";
import { breadcrumbSchema } from "@/lib/schema";
import { finances, plan, whyNow } from "@/lib/project";

export const metadata: Metadata = {
  title: "The Plan",
  description:
    "Why a new Pollard now, what the plan delivers for the whole community, and how a debt exclusion funds it — for every Needham resident.",
  alternates: { canonical: "/plan" },
  openGraph: {
    title: "The Plan — Pollard Now",
    description:
      "Why a new Pollard now, what the plan delivers for the whole community, and how a debt exclusion funds it — for every Needham resident.",
    url: "/plan",
  },
};

export default function PlanPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Plan"
        title="Why a new Pollard — and why now."
        description="We are replacing a 70-year-old school with a facility designed for the next century. Here’s the case: why this is the moment to move, what the new building delivers for the whole community, and how a debt exclusion pays for it."
      />

      {/* Why Now */}
      <section
        aria-labelledby="why-now-heading"
        className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20"
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-hover">
          Why now?
        </p>
        <h2
          id="why-now-heading"
          className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl"
        >
          {whyNow.headline}
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground-muted">
          {whyNow.intro}
        </p>
        <FeatureList points={whyNow.points} />
      </section>

      {/* The Plan */}
      <section
        aria-labelledby="the-plan-heading"
        className="border-y border-border bg-surface"
      >
        <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-hover">
            The plan — a modern Pollard
          </p>
          <h2
            id="the-plan-heading"
            className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl"
          >
            {plan.headline}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground-muted">
            {plan.intro}
          </p>
          <FeatureList points={plan.points} />
        </div>
      </section>

      {/* The Finances */}
      <section
        aria-labelledby="finances-heading"
        className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20"
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-hover">
          The finances — debt exclusion explained
        </p>
        <h2
          id="finances-heading"
          className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl"
        >
          {finances.headline}
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground-muted">
          {finances.intro}
        </p>
        <FeatureList points={finances.points} />

        <div className="mt-8">
          <a
            href={externalLinks.projectPage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-background px-5 py-3 text-sm font-semibold text-primary hover:bg-surface-muted"
          >
            View the official Pollard Building Project page
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>
      </section>

      {/* Ready to help */}
      <ClosingCta
        heading="Ready to help?"
        body="Every Needham voter and neighbor has a role. Pick what fits — and we’ll handle the rest."
      />

      <JsonLd
        id="ld-plan-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "The Plan", path: "/plan" },
        ])}
      />
    </>
  );
}
