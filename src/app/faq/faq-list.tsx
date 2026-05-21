import { faqs } from "@/lib/faqs";

// Static, no-JS-required accordion built on <details>/<summary>. Renders
// the campaign FAQ, including answers that carry a bulleted list and a
// closing note.
export function FaqList() {
  return (
    <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
      {faqs.map((f) => (
        <li key={f.id}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left font-medium text-foreground transition-colors hover:bg-surface-muted/60 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-lg">{f.q}</span>
              <span
                aria-hidden="true"
                className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border-strong bg-background text-primary transition-transform group-open:rotate-45"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </summary>
            <div className="space-y-4 px-6 pb-6 leading-relaxed text-foreground-muted">
              <p>{f.a}</p>
              {f.bullets && (
                <ul className="space-y-2.5">
                  {f.bullets.map((b) => (
                    <li key={b.text} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                      />
                      <span>
                        {b.label && (
                          <strong className="font-semibold text-foreground">
                            {b.label}:
                          </strong>
                        )}{" "}
                        {b.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {f.footer && <p>{f.footer}</p>}
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
