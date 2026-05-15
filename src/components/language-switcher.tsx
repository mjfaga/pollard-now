"use client";

import { useEffect, useId, useRef, useState } from "react";

type Language = {
  code: string;
  english: string;
  native: string;
  dir?: "rtl";
};

// Matches the language set on the original pollardnow.com GTranslate widget.
const LANGUAGES: Language[] = [
  { code: "en", english: "English", native: "English" },
  { code: "es", english: "Spanish", native: "Español" },
  { code: "pt", english: "Portuguese", native: "Português" },
  { code: "fr", english: "French", native: "Français" },
  { code: "de", english: "German", native: "Deutsch" },
  { code: "it", english: "Italian", native: "Italiano" },
  { code: "nl", english: "Dutch", native: "Nederlands" },
  { code: "ru", english: "Russian", native: "Русский" },
  { code: "zh-CN", english: "Chinese (Simplified)", native: "简体中文" },
  { code: "ar", english: "Arabic", native: "العربية", dir: "rtl" },
];

const COOKIE_NAME = "googtrans";

function readCurrentLang(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return "en";
  const value = decodeURIComponent(match.split("=")[1] ?? "");
  const parts = value.split("/");
  const code = parts[2];
  if (!code || code === "en") return "en";
  return code;
}

function clearGoogtransCookie() {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const variants = [
    `${COOKIE_NAME}=; ${expired}; path=/`,
    `${COOKIE_NAME}=; ${expired}; path=/; domain=${host}`,
    `${COOKIE_NAME}=; ${expired}; path=/; domain=.${host}`,
  ];
  for (const v of variants) document.cookie = v;
}

function setPersistedLang(code: string) {
  clearGoogtransCookie();
  if (code !== "en") {
    document.cookie = `${COOKIE_NAME}=/en/${code}; path=/`;
  }
}

function findCombo(): HTMLSelectElement | null {
  return document.querySelector<HTMLSelectElement>("select.goog-te-combo");
}

async function waitForCombo(timeoutMs = 4000): Promise<HTMLSelectElement | null> {
  const start = Date.now();
  // Poll for the combo element — Google Translate injects it asynchronously
  // after the element.js script runs and finishes its first paint.
  while (Date.now() - start < timeoutMs) {
    const el = findCombo();
    if (el) return el;
    await new Promise((r) => setTimeout(r, 80));
  }
  return null;
}

async function applyLanguage(code: string) {
  setPersistedLang(code);
  const combo = (await waitForCombo()) ?? findCombo();
  if (!combo) {
    // Element script failed to load — fall back to a reload so the cookie
    // gets picked up the next time it does load.
    window.location.reload();
    return;
  }
  if (code === "en") {
    // Restoring English doesn't run a translation — it tells Google to
    // unwind the existing one, which is effectively instant. Skip the
    // busy-state delay so the user gets immediate feedback.
    combo.value = "";
    combo.dispatchEvent(new Event("change"));
    return;
  }
  combo.value = code;
  combo.dispatchEvent(new Event("change"));
  // Google translates the DOM asynchronously after the change event.
  // Hold the busy state long enough for users to see most of the swap.
  await new Promise((r) => setTimeout(r, 900));
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState("en");
  const [busy, setBusy] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const firstItemRef = useRef<HTMLButtonElement | null>(null);
  const dialogId = useId();
  const labelId = useId();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentCode(readCurrentLang());
  }, []);

  useEffect(() => {
    if (!open) return;
    firstItemRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const [pendingCode, setPendingCode] = useState<string | null>(null);

  async function handleSelect(code: string) {
    if (busy || code === currentCode) {
      setOpen(false);
      return;
    }
    setOpen(false);
    // Restoring English just unwinds the existing translation — skip the
    // spinner/banner so it feels instant.
    if (code === "en") {
      setCurrentCode("en");
      await applyLanguage("en");
      return;
    }
    setBusy(true);
    setPendingCode(code);
    await applyLanguage(code);
    setCurrentCode(code);
    setPendingCode(null);
    setBusy(false);
  }

  const badge = currentCode === "en" ? "EN" : currentCode.toUpperCase();
  const pendingLang = pendingCode
    ? LANGUAGES.find((l) => l.code === pendingCode)
    : null;

  return (
    <div
      className="notranslate fixed bottom-5 right-5 z-40 print:hidden md:bottom-6 md:right-6"
      translate="no"
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-label={
          busy && pendingLang
            ? `Translating to ${pendingLang.english}`
            : "Choose a language"
        }
        aria-busy={busy || undefined}
        onClick={() => setOpen((o) => !o)}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2.5 text-sm font-semibold text-foreground shadow-lg shadow-black/10 transition-colors hover:bg-surface-muted disabled:cursor-progress disabled:opacity-90"
      >
        {busy ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
            className="animate-spin text-primary"
          >
            <path d="M12 3a9 9 0 1 0 9 9" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
          </svg>
        )}
        <span>
          {busy && pendingLang
            ? `Translating…`
            : "Language"}
        </span>
        <span
          aria-hidden="true"
          className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-contrast"
        >
          {busy && pendingCode ? pendingCode.toUpperCase() : badge}
        </span>
      </button>

      {busy && pendingLang && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed inset-x-0 top-4 z-50 mx-auto flex w-fit max-w-[90vw] items-center gap-3 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground shadow-xl shadow-black/20"
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
            className="animate-spin text-primary"
          >
            <path d="M12 3a9 9 0 1 0 9 9" />
          </svg>
          <span>
            Translating to{" "}
            <span lang={pendingLang.code} className="font-semibold">
              {pendingLang.native}
            </span>
            …
          </span>
        </div>
      )}

      {open && (
        <div
          ref={dialogRef}
          id={dialogId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={labelId}
          className="absolute bottom-[calc(100%+0.5rem)] right-0 w-72 origin-bottom-right rounded-2xl border border-border bg-surface p-3 shadow-xl shadow-black/15"
        >
          <div className="flex items-center justify-between px-2 pb-2">
            <h2
              id={labelId}
              className="text-xs font-semibold uppercase tracking-wider text-foreground-muted"
            >
              Choose a language
            </h2>
            <button
              type="button"
              aria-label="Close language menu"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-foreground-muted hover:bg-surface-muted hover:text-foreground"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          <ul className="max-h-72 overflow-y-auto pr-1">
            {LANGUAGES.map((lang, i) => {
              const isActive = lang.code === currentCode;
              return (
                <li key={lang.code}>
                  <button
                    ref={i === 0 ? firstItemRef : undefined}
                    type="button"
                    onClick={() => handleSelect(lang.code)}
                    lang={lang.code}
                    dir={lang.dir}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-muted ${
                      isActive
                        ? "bg-surface-muted font-semibold text-primary"
                        : "text-foreground"
                    }`}
                  >
                    <span className="flex flex-col leading-tight">
                      <span>{lang.native}</span>
                      <span className="text-xs text-foreground-muted">
                        {lang.english}
                      </span>
                    </span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="text-xs font-semibold uppercase tracking-wider text-primary"
                      >
                        Current
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-2 border-t border-border px-3 pt-3 text-xs leading-snug text-foreground-muted">
            Translations are provided by Google Translate.
          </p>
        </div>
      )}
    </div>
  );
}
