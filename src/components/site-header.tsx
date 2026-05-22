import Image from "next/image";
import Link from "next/link";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { externalLinks } from "@/lib/links";
import logo from "../../public/images/pollard-now-logo-full.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link
          href="/"
          aria-label="Pollard Now — home"
          className="flex items-center gap-3"
        >
          <Image
            src={logo}
            alt=""
            priority
            sizes="(min-width: 768px) 64px, 56px"
            className="h-10 w-auto rounded-md md:h-11"
          />
          <span className="sr-only">Pollard Now</span>
          <span
            aria-hidden="true"
            className="hidden font-display text-xl font-semibold tracking-tight text-primary lg:inline"
          >
            Pollard Now
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
          <DesktopNav />
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/volunteer"
              className="hidden lg:inline-flex items-center rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:bg-surface-muted"
            >
              Volunteer
            </Link>
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
