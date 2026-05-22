"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

interface TurnstileApi {
  render: (
    el: HTMLElement,
    opts: { sitekey: string; theme?: "light" | "dark" | "auto" },
  ) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/**
 * Renders the Cloudflare Turnstile widget and lets it inject its hidden
 * `cf-turnstile-response` field into the enclosing <form>, which the server
 * action reads. Uses explicit rendering so it works after client-side
 * navigation. `resetKey` changes after each submit so a fresh single-use token
 * is issued for any retry.
 */
export function TurnstileWidget({
  siteKey,
  resetKey,
}: {
  siteKey: string;
  resetKey?: unknown;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // next/script's onReady fires after the script loads AND on every remount
  // (e.g. client-side navigation back to this page), which is exactly when we
  // need to (re)render the widget.
  const renderWidget = () => {
    if (!containerRef.current || widgetIdRef.current || !window.turnstile) {
      return;
    }
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "auto",
    });
  };

  // Tear the widget down on unmount so the next mount can re-render cleanly.
  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, []);

  // Refresh the token after each submission attempt (tokens are single-use), so
  // a retry after a server error still carries a valid token.
  useEffect(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetKey]);

  return (
    <div>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      {/* Reserve Turnstile's fixed iframe height to avoid layout shift on load. */}
      <div ref={containerRef} className="min-h-[65px]" />
    </div>
  );
}
