import type { Pillar } from "@/lib/project";

// Two-column list of "label: body" points with a check mark. Shared by
// the Why Now / The Plan / The Finances sections on the project page.
export function FeatureList({ points }: { points: ReadonlyArray<Pillar> }) {
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
      {points.map((p) => (
        <li
          key={p.label}
          className="flex gap-4 rounded-2xl border border-border bg-surface p-6"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-hover"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {p.label}
            </h3>
            <p className="mt-1.5 leading-relaxed text-foreground-muted">
              {p.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
