"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

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

function buildTranslateUrl(code: string, currentUrl: string) {
  const encoded = encodeURIComponent(currentUrl);
  return `https://translate.google.com/translate?sl=en&tl=${code}&u=${encoded}`;
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const firstItemRef = useRef<HTMLAnchorElement | null>(null);
  const dialogId = useId();
  const labelId = useId();

  useEffect(() => {
    // Capture the full URL (including hash + query) for the translate links.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (typeof window !== "undefined") setCurrentUrl(window.location.href);
  }, [pathname]);

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

  return (
    <div className="fixed bottom-5 right-5 z-40 print:hidden md:bottom-6 md:right-6">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-label="Choose a language"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2.5 text-sm font-semibold text-foreground shadow-lg shadow-black/10 transition-colors hover:bg-surface-muted"
      >
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
        <span>Language</span>
        <span
          aria-hidden="true"
          className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-contrast"
        >
          EN
        </span>
      </button>

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
              const isEnglish = lang.code === "en";
              const href = isEnglish
                ? "/"
                : buildTranslateUrl(lang.code, currentUrl || "/");
              return (
                <li key={lang.code}>
                  <a
                    ref={i === 0 ? firstItemRef : undefined}
                    href={href}
                    {...(!isEnglish && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    onClick={() => setOpen(false)}
                    lang={lang.code}
                    dir={lang.dir}
                    className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-surface-muted ${
                      isEnglish
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
                    {isEnglish ? (
                      <span
                        aria-hidden="true"
                        className="text-xs font-semibold uppercase tracking-wider text-primary"
                      >
                        Current
                      </span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="text-xs text-foreground-muted"
                      >
                        ↗
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="mt-2 border-t border-border px-3 pt-3 text-xs leading-snug text-foreground-muted">
            Translations are provided by Google Translate and open in a new
            tab.
          </p>
        </div>
      )}
    </div>
  );
}
