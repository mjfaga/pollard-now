"use client";

import { useEffect, useId, useRef, useState } from "react";
import { defaultFaqs, FAQ_STORAGE_KEY, type Faq } from "@/lib/faqs";

type Status = "idle" | "saved" | "reset";

function loadStored(): Faq[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(FAQ_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed
      .filter(
        (item): item is Faq =>
          item &&
          typeof item === "object" &&
          typeof item.id === "string" &&
          typeof item.q === "string" &&
          typeof item.a === "string",
      )
      .map((item) => ({ id: item.id, q: item.q, a: item.a }));
  } catch {
    return null;
  }
}

function newId() {
  return `faq-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function deepEqual(a: Faq[], b: Faq[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id || a[i].q !== b[i].q || a[i].a !== b[i].a) {
      return false;
    }
  }
  return true;
}

export function FaqList() {
  // Always start from defaults to avoid SSR/CSR mismatch; hydrate stored
  // entries in an effect once mounted.
  const [items, setItems] = useState<Faq[]>(() =>
    defaultFaqs.map((f) => ({ ...f })),
  );
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Faq[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [hasStoredEdits, setHasStoredEdits] = useState(false);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noticeId = useId();

  useEffect(() => {
    const stored = loadStored();
    if (stored && stored.length > 0) {
      // Hydrate from localStorage post-mount; matches the standard pattern
      // for syncing client-only state into a server-rendered component.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(stored);
      setHasStoredEdits(true);
    }
    const timer = statusTimer;
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function flashStatus(next: Status) {
    setStatus(next);
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus("idle"), 2500);
  }

  function startEditing() {
    setDraft(items.map((f) => ({ ...f })));
    setEditing(true);
    setStatus("idle");
  }

  function cancelEditing() {
    setDraft([]);
    setEditing(false);
    setStatus("idle");
  }

  function saveDraft() {
    // Drop entries that ended up empty after editing.
    const cleaned = draft
      .map((f) => ({ id: f.id, q: f.q.trim(), a: f.a.trim() }))
      .filter((f) => f.q || f.a);
    setItems(cleaned);
    try {
      window.localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify(cleaned));
      setHasStoredEdits(true);
    } catch {
      // Storage might be full or disabled; the in-memory edit still works
      // for the rest of this session.
    }
    setEditing(false);
    setDraft([]);
    flashStatus("saved");
  }

  function resetToDefault() {
    const defaults = defaultFaqs.map((f) => ({ ...f }));
    setItems(defaults);
    setDraft(defaults.map((f) => ({ ...f })));
    try {
      window.localStorage.removeItem(FAQ_STORAGE_KEY);
    } catch {
      // ignore
    }
    setHasStoredEdits(false);
    flashStatus("reset");
  }

  function updateDraft(index: number, patch: Partial<Faq>) {
    setDraft((prev) =>
      prev.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    );
  }

  function deleteDraft(index: number) {
    setDraft((prev) => prev.filter((_, i) => i !== index));
  }

  function addDraft() {
    setDraft((prev) => [
      ...prev,
      { id: newId(), q: "", a: "" },
    ]);
  }

  const dirty = editing && !deepEqual(draft, items);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-foreground-muted">
          {hasStoredEdits && !editing ? (
            <>
              <span className="font-semibold text-foreground">
                Showing your edits.
              </span>{" "}
              Stored locally in this browser.
            </>
          ) : editing ? (
            "Editing — changes save to this browser only."
          ) : (
            <>
              {items.length} question{items.length === 1 ? "" : "s"}.
            </>
          )}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {status === "saved" && (
            <span
              role="status"
              className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success"
            >
              Saved
            </span>
          )}
          {status === "reset" && (
            <span
              role="status"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-hover"
            >
              Reset to defaults
            </span>
          )}
          {!editing ? (
            <button
              type="button"
              onClick={startEditing}
              className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:bg-surface-muted"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={cancelEditing}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:bg-surface-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveDraft}
                disabled={!dirty}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                Save changes
              </button>
            </>
          )}
        </div>
      </div>

      {editing && (
        <p
          id={noticeId}
          role="note"
          className="mb-5 flex items-start gap-2 rounded-xl border border-accent/30 bg-accent-soft/50 px-4 py-3 text-sm text-foreground"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="mt-0.5 flex-shrink-0 text-accent-hover"
          >
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16.01" />
          </svg>
          <span>
            <strong className="font-semibold">Demo mode.</strong> Edits save
            to this browser only — there&apos;s no server yet, so other
            visitors won&apos;t see your changes.
          </span>
        </p>
      )}

      {!editing ? (
        <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
          {items.map((f) => (
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
                <div className="px-6 pb-6 leading-relaxed text-foreground-muted">
                  {f.a}
                </div>
              </details>
            </li>
          ))}
          {items.length === 0 && (
            <li className="px-6 py-8 text-center text-foreground-muted">
              No questions yet. Click <strong>Edit</strong> to add some.
            </li>
          )}
        </ul>
      ) : (
        <ul className="space-y-4">
          {draft.map((f, i) => (
            <li
              key={f.id}
              className="rounded-2xl border border-border bg-surface p-5 md:p-6"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                  Question {i + 1}
                </p>
                <button
                  type="button"
                  onClick={() => deleteDraft(i)}
                  className="inline-flex items-center gap-1 rounded-full border border-border-strong bg-background px-3 py-1.5 text-xs font-semibold text-danger hover:bg-surface-muted"
                  aria-label={`Delete question ${i + 1}`}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                  </svg>
                  Delete
                </button>
              </div>

              <label className="block text-sm font-semibold text-foreground">
                Question
                <textarea
                  value={f.q}
                  onChange={(e) => updateDraft(i, { q: e.target.value })}
                  rows={2}
                  placeholder="Enter the question…"
                  className="mt-1.5 block w-full resize-y rounded-lg border border-border-strong bg-background px-4 py-2.5 font-display text-base font-normal text-foreground"
                />
              </label>

              <label className="mt-4 block text-sm font-semibold text-foreground">
                Answer
                <textarea
                  value={f.a}
                  onChange={(e) => updateDraft(i, { a: e.target.value })}
                  rows={4}
                  placeholder="Plain-language answer…"
                  className="mt-1.5 block w-full resize-y rounded-lg border border-border-strong bg-background px-4 py-2.5 text-base text-foreground"
                />
              </label>
            </li>
          ))}

          <li>
            <button
              type="button"
              onClick={addDraft}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border-strong bg-background px-4 py-4 text-sm font-semibold text-primary hover:border-primary hover:bg-surface-muted"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add a question
            </button>
          </li>
        </ul>
      )}

      {hasStoredEdits && !editing && (
        <div className="mt-5">
          <button
            type="button"
            onClick={resetToDefault}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground-muted hover:text-foreground"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Reset to default questions
          </button>
        </div>
      )}
    </div>
  );
}
