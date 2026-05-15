import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { CtaLink } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import { externalLinks } from "@/lib/links";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Pollard Now is, what a debt exclusion override means, and why a new Pollard Middle School matters for every Needham resident.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Pollard Now",
    description:
      "What Pollard Now is, what a debt exclusion override means, and why a new Pollard Middle School matters for every Needham resident.",
    url: "/about",
  },
};

const pillars = [
  {
    title: "Modern learning spaces",
    body: "Classrooms, labs, and collaboration areas designed for the way middle schoolers actually learn today — not the way they did in 1969.",
  },
  {
    title: "Built for the long run",
    body: "A sustainable, energy-efficient building that lowers operating costs and stands up to decades of Needham winters.",
  },
  {
    title: "A stronger community asset",
    body: "Spaces that extend beyond the school day — for athletics, the arts, town meetings, and neighborhood life.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Pollard Now"
        title="A grassroots campaign for a school worthy of our students."
        description="Our Pollard Now campaign supports passage of the debt exclusion override in Needham to build a new Pollard Middle School for grades 6–8. We are working hard to inform Needham residents about the benefits to all of the new build and welcome your help and support."
      />

      <section
        aria-labelledby="why-heading"
        className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20"
      >
        <h2
          id="why-heading"
          className="font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl"
        >
          Why now
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground-muted">
          <p>
            Pollard serves every Needham student in grades 6–8. Today&apos;s
            building has been patched and stretched far past its design — and
            the way middle schoolers learn has changed in ways the current
            walls can&apos;t keep up with.
          </p>
          <p>
            A new Pollard isn&apos;t just about a building. It&apos;s about
            keeping Needham&apos;s schools the kind of schools families move
            here for — and giving every student the same opportunity, no
            matter which elementary school they came from.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="override-heading"
        className="border-y border-border bg-surface"
      >
        <div className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-hover">
            The mechanism
          </p>
          <h2
            id="override-heading"
            className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl"
          >
            What is a debt exclusion override?
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground-muted">
            <p>
              A <strong className="text-foreground">debt exclusion</strong> is
              the way Massachusetts cities and towns vote to fund a specific
              capital project — like a new school — outside the normal limits
              on property tax growth.
            </p>
            <p>
              It is{" "}
              <strong className="text-foreground">tied to one project</strong>:
              when the borrowing for that project is paid off, the temporary
              tax increase ends. It is not a permanent change to the levy.
            </p>
            <p>
              For specifics on what the Pollard project would cost a typical
              Needham household, visit the official project page maintained by
              Needham Public Schools — the source for plans, financials, and
              town updates.
            </p>
          </div>

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
        </div>
      </section>

      <section
        aria-labelledby="pillars-heading"
        className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-hover">
            What the new build delivers
          </p>
          <h2
            id="pillars-heading"
            className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl"
          >
            A school designed for the next generation of Needham students.
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <li
              key={p.title}
              className="rounded-2xl border border-border bg-surface p-7"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft font-display text-base font-semibold text-accent-hover"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-foreground-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="next-heading"
        className="border-t border-border bg-surface-muted"
      >
        <div className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
          <h2
            id="next-heading"
            className="font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl"
          >
            Ready to help?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Every Needham voter and neighbor has a role. Pick what fits — and
            we&apos;ll handle the rest.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <CtaLink href={externalLinks.donate} external variant="primary">
              Donate
            </CtaLink>
            <CtaLink
              href={externalLinks.volunteer}
              external
              variant="secondary"
            >
              Volunteer
            </CtaLink>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong bg-background px-6 py-3 text-base font-semibold text-primary hover:bg-surface"
            >
              Get email updates
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        id="ld-about-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
