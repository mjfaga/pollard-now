import Link from "next/link";
import { CtaLink } from "@/components/cta-button";
import { externalLinks } from "@/lib/links";

type Props = {
  heading: string;
  body: string;
};

// Shared closing call-to-action band (Volunteer / Donate / Get updates)
// used at the foot of content pages.
export function ClosingCta({ heading, body }: Props) {
  return (
    <section className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          {body}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <CtaLink href={externalLinks.volunteer} external variant="primary">
            Volunteer
          </CtaLink>
          <CtaLink href={externalLinks.donate} external variant="secondary">
            Donate
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
  );
}
