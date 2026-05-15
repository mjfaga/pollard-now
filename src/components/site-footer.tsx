import Link from "next/link";
import { externalLinks, navLinks } from "@/lib/links";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-3 md:px-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-xl font-semibold text-primary"
          >
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-contrast font-display text-base"
            >
              P
            </span>
            Pollard Now
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-foreground-muted">
            A Needham community campaign supporting the debt exclusion override
            to build a new Pollard Middle School for grades 6–8.
          </p>
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
              <a
                href={externalLinks.volunteer}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary"
              >
                Volunteer sign-up{" "}
                <span aria-hidden="true" className="text-foreground-muted">
                  ↗
                </span>
                <span className="sr-only">(opens in new tab)</span>
              </a>
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
