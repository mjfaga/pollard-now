import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center md:px-8 md:py-32">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent-hover">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl">
        We can&apos;t find that page.
      </h1>
      <p className="mt-5 text-lg text-foreground-muted">
        The link may be out of date, or the page may have moved. Try heading
        back home or browsing the campaign basics.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-contrast hover:bg-primary-hover"
        >
          Back to home
        </Link>
        <Link
          href="/faq"
          className="inline-flex items-center justify-center rounded-full border border-border-strong bg-surface px-6 py-3 text-base font-semibold text-primary hover:bg-surface-muted"
        >
          Browse FAQ
        </Link>
      </div>
    </section>
  );
}
