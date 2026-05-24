"use client";

import { useEffect, useRef } from "react";
import { CtaLink } from "@/components/cta-button";
import { SocialLinks } from "@/components/social-links";
import { personalize, type FormSuccessContent } from "@/lib/forms";

// The celebratory panel that replaces a form after a successful submission.
// On mount we move focus to the heading: the form (and its focused submit
// button) has just unmounted, so this both announces the result to assistive
// tech and keeps keyboard focus from falling back to <body>. Entrance animation
// is defined in globals.css and is disabled under `prefers-reduced-motion`.
export function FormSuccess({
  content,
  name,
}: {
  content: FormSuccessContent;
  name?: string;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 py-6 text-center sm:py-8">
      <span className="thanks-badge inline-flex h-16 w-16 items-center justify-center rounded-full bg-success text-primary-contrast">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8"
          aria-hidden="true"
        >
          <path className="thanks-check" d="M5 13l4 4L19 7" />
        </svg>
      </span>

      <div className="space-y-2">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="thanks-rise font-display text-2xl font-semibold text-foreground outline-none sm:text-3xl"
        >
          {content.headline}
        </h2>
        <p className="thanks-rise-2 mx-auto max-w-md text-base text-foreground-muted">
          {personalize(content.message, name)}
        </p>
      </div>

      <div className="thanks-rise-3 mt-1 flex w-full flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-semibold text-foreground">
            {content.ctaHeading}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {content.ctas.map((cta) => (
              <CtaLink
                key={cta.label}
                href={cta.href}
                external={cta.external}
                variant={cta.variant}
              >
                {cta.label}
              </CtaLink>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-foreground-muted">{content.socialNote}</p>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
