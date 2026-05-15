"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  CAMPAIGN_STORAGE_KEY,
  defaultCampaign,
  type CampaignContent,
} from "@/lib/campaign";

type Status = "idle" | "saved" | "reset";

function loadStored(): CampaignContent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CAMPAIGN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof parsed.eyebrow !== "string" ||
      typeof parsed.heading !== "string" ||
      typeof parsed.body !== "string"
    ) {
      return null;
    }
    return {
      eyebrow: parsed.eyebrow,
      heading: parsed.heading,
      body: parsed.body,
    };
  } catch {
    return null;
  }
}

function deepEqual(a: CampaignContent, b: CampaignContent) {
  return (
    a.eyebrow === b.eyebrow && a.heading === b.heading && a.body === b.body
  );
}

export function CampaignSection() {
  const [content, setContent] = useState<CampaignContent>(defaultCampaign);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<CampaignContent>(defaultCampaign);
  const [status, setStatus] = useState<Status>("idle");
  const [hasStoredEdits, setHasStoredEdits] = useState(false);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headingId = useId();

  useEffect(() => {
    const stored = loadStored();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setContent(stored);
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
    setDraft({ ...content });
    setEditing(true);
    setStatus("idle");
  }

  function cancelEditing() {
    setDraft({ ...content });
    setEditing(false);
    setStatus("idle");
  }

  function saveDraft() {
    const cleaned: CampaignContent = {
      eyebrow: draft.eyebrow.trim(),
      heading: draft.heading.trim(),
      body: draft.body.trim(),
    };
    setContent(cleaned);
    try {
      window.localStorage.setItem(
        CAMPAIGN_STORAGE_KEY,
        JSON.stringify(cleaned),
      );
      setHasStoredEdits(true);
    } catch {
      // ignore
    }
    setEditing(false);
    flashStatus("saved");
  }

  function resetToDefault() {
    setContent(defaultCampaign);
    setDraft(defaultCampaign);
    try {
      window.localStorage.removeItem(CAMPAIGN_STORAGE_KEY);
    } catch {
      // ignore
    }
    setHasStoredEdits(false);
    flashStatus("reset");
  }

  const dirty = editing && !deepEqual(draft, content);

  return (
    <section
      aria-labelledby={headingId}
      className="border-y border-border bg-surface"
    >
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
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
                Reset to default
              </span>
            )}
            {hasStoredEdits && !editing && status === "idle" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-hover">
                Showing your edits
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
                Edit section
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
            role="note"
            className="mt-5 flex items-start gap-2 rounded-xl border border-accent/30 bg-accent-soft/50 px-4 py-3 text-sm text-foreground"
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
              <strong className="font-semibold">Demo mode.</strong> Edits
              save to this browser only — there&apos;s no server yet, so
              other visitors won&apos;t see your changes.
            </span>
          </p>
        )}

        {!editing ? (
          <>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-accent-hover">
              {content.eyebrow}
            </p>
            <h2
              id={headingId}
              className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl"
            >
              {content.heading}
            </h2>
            <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-foreground-muted md:text-xl">
              {content.body}
            </p>

            {hasStoredEdits && (
              <div className="mt-6">
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
                  Reset to default
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-6 space-y-5">
            <label className="block text-sm font-semibold text-foreground">
              Eyebrow
              <input
                type="text"
                value={draft.eyebrow}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, eyebrow: e.target.value }))
                }
                placeholder="Small label above the heading"
                className="mt-1.5 block w-full rounded-lg border border-border-strong bg-background px-4 py-2.5 text-base font-normal text-foreground"
              />
            </label>
            <label className="block text-sm font-semibold text-foreground">
              Heading
              <textarea
                value={draft.heading}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, heading: e.target.value }))
                }
                rows={2}
                placeholder="Section heading"
                className="mt-1.5 block w-full resize-y rounded-lg border border-border-strong bg-background px-4 py-2.5 font-display text-lg font-normal leading-tight text-foreground"
              />
            </label>
            <label className="block text-sm font-semibold text-foreground">
              Body
              <textarea
                value={draft.body}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, body: e.target.value }))
                }
                rows={6}
                placeholder="Section body copy"
                className="mt-1.5 block w-full resize-y rounded-lg border border-border-strong bg-background px-4 py-2.5 text-base leading-relaxed text-foreground"
              />
            </label>
          </div>
        )}
      </div>
    </section>
  );
}
