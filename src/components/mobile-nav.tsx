"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { externalLinks, navLinks } from "@/lib/links";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const openButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    // Close the menu when the route changes so navigation feels instant.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        openButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const dialog = open ? (
    <div
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="md:hidden"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        backgroundColor: "var(--background)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <Link
          href="/"
          className="font-display text-xl font-semibold text-primary"
          onClick={() => setOpen(false)}
        >
          Pollard Now
        </Link>
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-surface text-foreground hover:bg-surface-muted"
        >
          <svg
            width="22"
            height="22"
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

      <nav aria-label="Mobile" className="px-5 py-6">
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-4 py-3 text-lg font-medium ${
                    active
                      ? "bg-surface-muted text-primary"
                      : "text-foreground hover:bg-surface-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
          <a
            href={externalLinks.donate}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 font-semibold text-primary-contrast"
          >
            Donate
          </a>
          <Link
            href="/volunteer"
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 font-semibold text-foreground"
          >
            Volunteer
          </Link>
        </div>
      </nav>
    </div>
  ) : null;

  return (
    <div className="md:hidden">
      <button
        ref={openButtonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-surface text-foreground hover:bg-surface-muted"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {/* Portal the dialog to document.body so it escapes the sticky
          header's `backdrop-blur` stacking context. Without this, no
          z-index inside the header can rise above the page below. */}
      {mounted && dialog ? createPortal(dialog, document.body) : null}
    </div>
  );
}
