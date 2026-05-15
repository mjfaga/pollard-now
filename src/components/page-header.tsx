import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
};

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-surface-muted to-background"
      />
      <div className="mx-auto max-w-4xl px-5 pb-12 pt-14 md:px-8 md:pb-16 md:pt-20">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-hover">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted md:text-xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
