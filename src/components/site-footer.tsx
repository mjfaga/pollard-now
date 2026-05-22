import Image from "next/image";
import Link from "next/link";
import { externalLinks, navLinks } from "@/lib/links";
import logo from "../../public/images/pollard-now-logo-full.png";

const hashtags = ["#PollardNow", "#NeedhamVotes", "#InvestInNeedham"];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface-muted">
      {/* Join the Movement */}
      <div className="border-b border-border bg-primary text-primary-contrast">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold leading-tight md:text-3xl">
              Join the Movement for Pollard.
            </h2>
            <p className="mt-3 text-white/85">
              Talk to your neighbors. Sign up for updates. Volunteer to hold a
              sign.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-white/90"
            >
              Join the Mailing List
            </Link>
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-foreground hover:bg-accent-hover hover:text-primary-contrast"
            >
              Volunteer
            </Link>
            <a
              href={externalLinks.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Donate to the Campaign
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-3 md:px-8">
        <div>
          <Link
            href="/"
            aria-label="Pollard Now — home"
            className="inline-flex items-center gap-3"
          >
            <Image
              src={logo}
              alt=""
              sizes="80px"
              className="h-12 w-auto rounded-md"
            />
            <span className="font-display text-xl font-semibold text-primary">
              Pollard Now
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-foreground-muted">
            A Needham community campaign supporting the debt exclusion override
            to build a new Pollard Middle School for grades 6–8.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm font-semibold text-primary">
            {hashtags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
            Get involved
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={externalLinks.donate}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary"
              >
                Donate via PayPal{" "}
                <span aria-hidden="true" className="text-foreground-muted">
                  ↗
                </span>
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </li>
            <li>
              <Link
                href="/volunteer"
                className="text-foreground hover:text-primary"
              >
                Volunteer sign-up
              </Link>
            </li>
            <li>
              <a
                href={externalLinks.projectPage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary"
              >
                Official Pollard project page{" "}
                <span aria-hidden="true" className="text-foreground-muted">
                  ↗
                </span>
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-5 py-6 text-sm text-foreground-muted md:flex-row md:items-center md:px-8">
          <p>© {year} Pollard Now. All rights reserved.</p>
          <p>
            Built by neighbors, for our community. Paid for by Pollard Now.
          </p>
        </div>
      </div>
    </footer>
  );
}
