// PayPal donation webhook → branded thank-you email.
//
// PayPal POSTs here whenever a payment event fires. We verify the
// signature, and for completed donations we email the donor a personal
// note from the committee (PayPal still sends its own generic receipt).
//
// Setup (PayPal Dashboard → Apps & Credentials, then Webhooks):
//   - Create a REST app to get a client ID + secret.
//   - Add a webhook pointing at  https://<your-domain>/api/paypal/webhook
//     subscribed to "Payment capture completed" (and "Payment sale
//     completed" if your Donate button uses the older flow). Copy its
//     Webhook ID.
// Required env vars (set in Vercel → Project → Settings → Environment):
//   PAYPAL_ENV=live            # or "sandbox" while testing
//   PAYPAL_CLIENT_ID=...
//   PAYPAL_CLIENT_SECRET=...
//   PAYPAL_WEBHOOK_ID=...
//   RESEND_API_KEY=...
//   DONATION_FROM_EMAIL="Pollard Now <donations@your-verified-domain>"
// Optional:
//   DONATION_REPLY_TO="hello@your-domain"
//   DONATION_NOTIFY_EMAIL="committee@your-domain"  # gets a BCC + fallbacks
//
// Delivery note: PayPal delivers webhooks at-least-once and may resend the
// same event, so a donor could occasionally receive a duplicate thank-you.
// Eliminating that requires a durable store keyed by event id (e.g. Vercel
// KV) to dedupe — intentionally left out here since the campaign has no
// datastore and a rare duplicate is preferable to a dropped thank-you.

import { enrichDonorFromOrder, parseDonation, verifyWebhook } from "@/lib/paypal";
import { sendEmail } from "@/lib/email";
import {
  buildDonationNotice,
  buildDonationThankYou,
} from "@/lib/donation-thank-you-email";

export const runtime = "nodejs";

// Events that mean money was actually received from a Donate button.
const DONATION_EVENTS = new Set([
  "PAYMENT.CAPTURE.COMPLETED",
  "PAYMENT.SALE.COMPLETED",
]);

const isLikelyEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  const raw = await request.text();
  let event: unknown;
  try {
    event = JSON.parse(raw);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Never act on data we can't cryptographically attribute to PayPal.
  const verification = await verifyWebhook(request.headers, event);
  if (!verification.ok) {
    if (verification.reason === "unconfigured") {
      console.error("[paypal-webhook] PayPal credentials missing; cannot verify");
      return new Response("Webhook not configured", { status: 503 });
    }
    console.warn(
      `[paypal-webhook] signature not verified: ${
        verification.detail ?? verification.reason
      }`,
    );
    return new Response("Invalid signature", { status: 401 });
  }

  const eventType =
    (event as { event_type?: string }).event_type ?? "(unknown)";
  if (!DONATION_EVENTS.has(eventType)) {
    // Acknowledge so PayPal stops retrying events we don't act on.
    return Response.json({ received: true, ignored: eventType });
  }

  let donation = parseDonation(event);

  // Capture webhooks frequently omit the donor's email on the resource —
  // recover it from the parent order so the donor still gets thanked.
  if (!donation.email && donation.orderId) {
    const enriched = await enrichDonorFromOrder(donation.orderId);
    if (enriched) {
      donation = {
        ...donation,
        email: enriched.email ?? donation.email,
        firstName: enriched.firstName ?? donation.firstName,
        fullName: enriched.fullName ?? donation.fullName,
      };
    }
  }

  const notify = process.env.DONATION_NOTIFY_EMAIL || undefined;

  if (donation.email && isLikelyEmail(donation.email)) {
    const result = await sendEmail({
      to: donation.email,
      bcc: notify,
      replyTo: process.env.DONATION_REPLY_TO || undefined,
      ...buildDonationThankYou(donation),
    });
    if (!result.ok) {
      console.error(
        `[paypal-webhook] thank-you send failed: ${
          result.detail ?? result.reason
        }`,
      );
      // 500 → PayPal retries delivery, giving the email another chance.
      return new Response("Email send failed", { status: 500 });
    }
    return Response.json({ received: true, thanked: true });
  }

  // No usable donor email — let the committee follow up by hand.
  if (notify) {
    const noticeResult = await sendEmail({
      to: notify,
      ...buildDonationNotice(donation),
    });
    if (!noticeResult.ok) {
      console.error(
        `[paypal-webhook] committee notice failed: ${
          noticeResult.detail ?? noticeResult.reason
        }`,
      );
    } else {
      console.warn("[paypal-webhook] donation had no usable donor email; notified committee");
    }
  } else {
    console.warn(
      "[paypal-webhook] donation had no usable donor email and no DONATION_NOTIFY_EMAIL set",
    );
  }
  return Response.json({ received: true, thanked: false });
}
