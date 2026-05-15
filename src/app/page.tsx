import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/cta-button";
import { externalLinks } from "@/lib/links";
import logo from "../../public/images/pollard-now-logo-full.png";

export default function HomePage() {
  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-gradient-to-b from-surface-muted via-background to-background"
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 right-[-12rem] -z-10 h-[420px] w-[420px] rounded-full bg-accent-soft blur-3xl opacity-70"
        />

        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-8 md:pb-24 md:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              />
              Needham, Massachusetts
            </p>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl"
            >
              The time is{" "}
              <span className="relative inline-block">
                <span className="relative z-10">now</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-1 bottom-2 -z-0 h-3 rounded-sm bg-accent-soft md:h-4"
                />
              </span>{" "}
              for Pollard.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted md:text-xl">
              Building a sustainable, 21st-century middle school for our
              students and a stronger future for the Needham community.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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
              <CtaLink href="/contact" variant="ghost">
                Get updates
              </CtaLink>
            </div>

            <p className="mt-6 text-sm text-foreground-muted">
              Talk to your neighbors. Sign up for updates. Help.
            </p>
          </div>

          <aside
            aria-label="Campaign at a glance"
            className="relative rounded-3xl border border-border bg-surface p-7 shadow-sm md:p-8"
          >
            <div className="flex items-center gap-4">
              <Image
                src={logo}
                alt="Pollard Now"
                sizes="96px"
                className="h-16 w-auto rounded-lg shadow-sm"
              />
              <h2 className="font-display text-xl font-semibold text-foreground">
                At a glance
              </h2>
            </div>
            <dl className="mt-5 space-y-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                  The ask
                </dt>
                <dd className="mt-1 text-base font-medium leading-snug text-foreground">
                  Pass the debt exclusion override to fund a new Pollard
                  Middle School.
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                  Who it serves
                </dt>
                <dd className="mt-1 text-base font-medium leading-snug text-foreground">
                  Every Needham student in grades 6–8.
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                  Why now
                </dt>
                <dd className="mt-1 text-base font-medium leading-snug text-foreground">
                  Today&apos;s building no longer meets the needs of modern
                  middle-school learning.
                </dd>
              </div>
            </dl>
            <div className="mt-6 border-t border-border pt-5">
              <a
                href={externalLinks.projectPage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover"
              >
                Visit the official project page
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="mission-heading"
        className="border-y border-border bg-surface"
      >
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-hover">
            Our campaign
          </p>
          <h2
            id="mission-heading"
            className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl"
          >
            A community campaign to build the school our students deserve.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground-muted md:text-xl">
            Our Pollard Now campaign is to support passage of the debt
            exclusion override in Needham to build a new Pollard middle school
            for grades 6–8. We are working hard to inform Needham residents
            about the benefits to all of the new build and welcome your help
            and support.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="project-page-heading"
        className="mx-auto max-w-6xl px-5 pt-16 md:px-8 md:pt-20"
      >
        <div className="relative overflow-hidden rounded-3xl bg-[#162848] p-7 text-white md:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
          />
          <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12">
            <div className="flex items-center justify-center rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 md:p-8">
              <Image
                src={logo}
                alt="Pollard Now"
                sizes="(min-width: 768px) 240px, 180px"
                className="h-32 w-auto md:h-40"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-soft">
                From Needham Public Schools
              </p>
              <h2
                id="project-page-heading"
                className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl"
              >
                Click here to access the Pollard Middle School Project Page.
              </h2>
              <p className="mt-4 max-w-2xl text-white/80">
                Plans, financial impact tables, meeting minutes, and the
                latest timeline updates — straight from the source.
              </p>
              <div className="mt-7">
                <a
                  href={externalLinks.projectPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-foreground hover:bg-accent-hover hover:text-primary-contrast"
                >
                  Open the project page
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="paths-heading"
        className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-hover">
              Learn more
            </p>
            <h2
              id="paths-heading"
              className="mt-2 font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl"
            >
              Start where you&apos;re curious.
            </h2>
          </div>
          <p className="max-w-md text-foreground-muted">
            Whether you&apos;re weighing the override or looking for the next
            step to help, we&apos;ve grouped the essentials.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          <li>
            <Link
              href="/about"
              className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-border-strong"
            >
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-hover">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 9.5 12 4l9 5.5" />
                    <path d="M5 10v9h14v-9" />
                    <path d="M9 19v-5h6v5" />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                  About the project
                </h3>
                <p className="mt-2 text-foreground-muted">
                  Why a new Pollard, what the debt exclusion override means,
                  and what changes for students and neighbors.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-primary-hover">
                Read more
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/faq"
              className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-border-strong"
            >
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-hover">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9.5 9.5a2.5 2.5 0 0 1 4.9 0c0 1.5-2.4 1.8-2.4 3.5" />
                    <line x1="12" y1="17" x2="12" y2="17.01" />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                  Common questions
                </h3>
                <p className="mt-2 text-foreground-muted">
                  Plain-language answers about cost, timing, the override
                  process, and the building plan.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-primary-hover">
                Browse FAQ
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>

          <li>
            <a
              href={externalLinks.projectPage}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-border-strong"
            >
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-hover">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M14 3h7v7" />
                    <path d="M21 3l-9 9" />
                    <path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                  Official project page
                </h3>
                <p className="mt-2 text-foreground-muted">
                  Need the source documents? Visit the Needham Public Schools
                  Pollard Building Project hub for plans and updates.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-primary-hover">
                Open project page
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in new tab)</span>
              </span>
            </a>
          </li>
        </ul>
      </section>

      <section
        aria-labelledby="help-heading"
        className="bg-primary text-primary-contrast"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-soft">
              Three ways to help
            </p>
            <h2
              id="help-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl"
            >
              Pollard Now is powered by neighbors like you.
            </h2>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            <li className="rounded-2xl bg-primary-hover/70 p-7 ring-1 ring-white/10">
              <h3 className="font-display text-xl font-semibold">Donate</h3>
              <p className="mt-2 text-white/85">
                Help us reach every Needham household with information they
                can trust.
              </p>
              <a
                href={externalLinks.donate}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent-hover hover:text-primary-contrast"
              >
                Give via PayPal
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </li>
            <li className="rounded-2xl bg-primary-hover/70 p-7 ring-1 ring-white/10">
              <h3 className="font-display text-xl font-semibold">Volunteer</h3>
              <p className="mt-2 text-white/85">
                Lit-drops, lawn signs, phone banks, or simply sharing your
                story with a neighbor.
              </p>
              <a
                href={externalLinks.volunteer}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent-hover hover:text-primary-contrast"
              >
                Sign up
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </li>
            <li className="rounded-2xl bg-primary-hover/70 p-7 ring-1 ring-white/10">
              <h3 className="font-display text-xl font-semibold">
                Talk to your neighbors
              </h3>
              <p className="mt-2 text-white/85">
                Word of mouth is the most powerful tool we have. Subscribe to
                our list for talking points and updates.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-1 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent-hover hover:text-primary-contrast"
              >
                Get updates
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
