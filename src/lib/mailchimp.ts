import crypto from "node:crypto";

/**
 * Server-only Mailchimp Marketing API client for the subscribe form.
 *
 * Reads credentials from the environment (never hardcode them):
 * - `MAILCHIMP_API_KEY`     — secret API key, suffixed with the datacenter (e.g. `…-us4`)
 * - `MAILCHIMP_AUDIENCE_ID` — the target audience/list id (e.g. `301eaebfa2`)
 *
 * Uses an upsert (`PUT …/members/{hash}`) so re-submitting an existing email is
 * idempotent rather than a 400 "Member Exists". `status_if_new: "subscribed"`
 * keeps signups single opt-in for new contacts while leaving already-unsubscribed
 * contacts untouched (avoids Mailchimp's compliance error on forced re-subscribe).
 */

type SubscribeResult =
  | { ok: true }
  | { ok: false; reason: "config" | "api" | "network"; detail?: string };

export async function addSubscriber(input: {
  email: string;
  firstName: string;
  lastName: string;
}): Promise<SubscribeResult> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return { ok: false, reason: "config", detail: "Mailchimp env vars missing." };
  }

  const datacenter = apiKey.split("-")[1];
  if (!datacenter) {
    return { ok: false, reason: "config", detail: "API key has no datacenter suffix." };
  }

  const email = input.email.trim();
  const subscriberHash = crypto
    .createHash("md5")
    .update(email.toLowerCase())
    .digest("hex");

  const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: { FNAME: input.firstName, LNAME: input.lastName },
      }),
    });
  } catch {
    return { ok: false, reason: "network" };
  }

  if (response.ok) return { ok: true };

  let detail: string | undefined;
  try {
    const body = (await response.json()) as { detail?: string; title?: string };
    detail = body.detail ?? body.title;
  } catch {
    // Non-JSON error body — leave detail undefined.
  }
  return { ok: false, reason: "api", detail };
}
