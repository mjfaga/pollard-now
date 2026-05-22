import "server-only";

// Server-side Cloudflare Turnstile verification for the volunteer form.
//
// Turnstile is OPTIONAL and only switches on when BOTH env vars are set:
//   - TURNSTILE_SECRET_KEY            (server only — never exposed/committed)
//   - NEXT_PUBLIC_TURNSTILE_SITE_KEY  (public — rendered into the widget)
//
// Requiring both avoids a silent outage: with only the secret set there is no
// widget (so no token), which would otherwise reject every submission. When
// either is missing, verification is a no-op and the form falls back to the
// honeypot alone.

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verifies a Turnstile token with Cloudflare.
 * Returns true when verification passes OR when Turnstile is not fully
 * configured (so the form keeps working before keys are set). Returns false on
 * a missing token, a failed challenge, or a network/timeout error.
 */
export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!secret || !siteKey) return true; // Turnstile disabled — nothing to verify.
  if (!token) return false;

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }).toString(),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
