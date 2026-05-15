import Link from "next/link";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { externalLinks } from "@/lib/links";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-primary"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-contrast font-display text-base"
          >
            P
          </span>
          Pollard Now
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <DesktopNav />
          <div className="hidden md:flex items-center gap-2">
            <a
              href={externalLinks.volunteer}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:bg-surface-muted"
            >
              Volunteer
            </a>
            <a
              href={externalLinks.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast hover:bg-primary-hover"
            >
              Donate
            </a>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
