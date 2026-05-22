// Server-side PayPal helpers for the donation webhook.
//
// Responsibilities:
//   1. verifyWebhook() — prove an incoming request genuinely came from
//      PayPal before we act on it (otherwise anyone could POST fake
//      donations and trigger thank-you emails).
//   2. parseDonation() — pull the donor's name / email / amount out of the
//      event payload.
//   3. enrichDonorFromOrder() — completed-capture webhooks often do NOT
//      carry the donor's email on the resource itself, only an order id.
//      When that happens we fetch the order to recover payer details so
//      the donor can still get a personal thank-you.
//
// Hosted "Donate" buttons can fire a few different payload shapes (Orders
// v2 capture vs. the older v1 sale flow), so the parsing probes several
// known locations. Confirm the exact shape your button sends in
// PayPal Dashboard → Webhooks → Event logs and tighten if needed.

const API_BASE =
  (process.env.PAYPAL_ENV ?? "live").toLowerCase() === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

type PaypalConfig = {
  clientId: string;
  clientSecret: string;
  webhookId: string;
};

function readConfig(): PaypalConfig | null {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!clientId || !clientSecret || !webhookId) return null;
  return { clientId, clientSecret, webhookId };
}

// PayPal access tokens are valid for hours, so cache it across requests in
// a warm instance rather than fetching a fresh token on every webhook.
let tokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken(config: PaypalConfig): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now()) return tokenCache.token;

  const credentials = Buffer.from(
    `${config.clientId}:${config.clientSecret}`,
  ).toString("base64");
  const res = await fetch(`${API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`PayPal OAuth failed: ${res.status}`);

  const data = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
  };
  if (!data.access_token) throw new Error("PayPal OAuth returned no token");

  const ttlSeconds = typeof data.expires_in === "number" ? data.expires_in : 300;
  tokenCache = {
    token: data.access_token,
    // Refresh a minute early to avoid using a token mid-expiry.
    expiresAt: Date.now() + Math.max(0, ttlSeconds - 60) * 1000,
  };
  return data.access_token;
}

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "invalid" | "error"; detail?: string };

// PayPal signs each webhook. We forward the signature headers + the event
// body to PayPal's verify API; only a "SUCCESS" status should be trusted.
export async function verifyWebhook(
  headers: Headers,
  event: unknown,
): Promise<VerifyResult> {
  const config = readConfig();
  if (!config) return { ok: false, reason: "unconfigured" };

  const signatureHeaders = [
    "paypal-auth-algo",
    "paypal-cert-url",
    "paypal-transmission-id",
    "paypal-transmission-sig",
    "paypal-transmission-time",
  ] as const;

  const h: Record<string, string> = {};
  for (const key of signatureHeaders) {
    const value = headers.get(key);
    if (!value) return { ok: false, reason: "invalid", detail: `missing ${key}` };
    h[key] = value;
  }

  try {
    const token = await getAccessToken(config);
    const res = await fetch(
      `${API_BASE}/v1/notifications/verify-webhook-signature`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          auth_algo: h["paypal-auth-algo"],
          cert_url: h["paypal-cert-url"],
          transmission_id: h["paypal-transmission-id"],
          transmission_sig: h["paypal-transmission-sig"],
          transmission_time: h["paypal-transmission-time"],
          webhook_id: config.webhookId,
          webhook_event: event,
        }),
      },
    );
    if (!res.ok) {
      return { ok: false, reason: "error", detail: `verify HTTP ${res.status}` };
    }
    const data = (await res.json()) as { verification_status?: string };
    return data.verification_status === "SUCCESS"
      ? { ok: true }
      : { ok: false, reason: "invalid", detail: data.verification_status };
  } catch (err) {
    return { ok: false, reason: "error", detail: (err as Error).message };
  }
}

export type Donation = {
  firstName: string | null;
  fullName: string | null;
  email: string | null;
  amount: string | null; // e.g. "50.00"
  currency: string | null; // e.g. "USD"
  transactionId: string | null;
  orderId: string | null;
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

function payerDetails(payer: Record<string, unknown>): {
  email: string | null;
  firstName: string | null;
  fullName: string | null;
} {
  const payerInfo = asRecord(payer.payer_info);
  const name = asRecord(payer.name);
  const email = asString(payer.email_address) ?? asString(payerInfo.email);
  const firstName = asString(name.given_name) ?? asString(payerInfo.first_name);
  const surname = asString(name.surname) ?? asString(payerInfo.last_name);
  const fullName = [firstName, surname].filter(Boolean).join(" ") || null;
  return { email, firstName, fullName };
}

export function parseDonation(event: unknown): Donation {
  const resource = asRecord(asRecord(event).resource);
  const payer = asRecord(resource.payer ?? resource.payer_info);
  const subscriber = asRecord(resource.subscriber);
  const amount = asRecord(resource.amount);
  const relatedIds = asRecord(asRecord(resource.supplementary_data).related_ids);

  const details = payerDetails(payer);

  return {
    firstName: details.firstName,
    fullName: details.fullName,
    email: details.email ?? asString(subscriber.email_address),
    amount: asString(amount.value) ?? asString(amount.total),
    currency: asString(amount.currency_code) ?? asString(amount.currency),
    transactionId: asString(resource.id),
    orderId: asString(relatedIds.order_id),
  };
}

// Capture webhooks usually carry only an order id, not the payer's email.
// Fetch the parent order to recover the donor's name + email. Best-effort:
// returns null if PayPal is unconfigured/unreachable or the order has no
// payer, so the caller can fall back to notifying the committee.
export async function enrichDonorFromOrder(
  orderId: string,
): Promise<Pick<Donation, "email" | "firstName" | "fullName"> | null> {
  const config = readConfig();
  if (!config) return null;

  try {
    const token = await getAccessToken(config);
    const res = await fetch(
      `${API_BASE}/v2/checkout/orders/${encodeURIComponent(orderId)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );
    if (!res.ok) return null;

    const payer = asRecord(asRecord(await res.json()).payer);
    const details = payerDetails(payer);
    return details.email || details.fullName ? details : null;
  } catch {
    return null;
  }
}
