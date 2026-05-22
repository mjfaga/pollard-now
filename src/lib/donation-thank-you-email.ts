// Builds the branded thank-you email a donor receives automatically after
// giving through PayPal — a warm, personal note from the committee that
// PayPal's generic receipt can't be. Also builds a plain internal notice
// for the committee when PayPal didn't include the donor's email.
//
// NOTE: Pollard Now is a Massachusetts ballot-question campaign ("Paid for
// by Pollard Now"). Contributions are NOT tax-deductible, so this email
// deliberately makes no donation-receipt or deductibility claim.

import type { Donation } from "@/lib/paypal";
import { externalLinks } from "@/lib/links";
import { electionDay } from "@/lib/project";
import { SITE, absUrl } from "@/lib/site";

// Brand tokens mirrored from app/globals.css (email clients can't read CSS
// variables, so colors are inlined).
const COLOR = {
  bg: "#faf7f2",
  surface: "#ffffff",
  primary: "#1f4e5f",
  accent: "#8a5a0c",
  accentSoft: "#fbe9c4",
  foreground: "#15243a",
  muted: "#4d5d72",
  border: "#e3dccc",
} as const;

const LOGO_URL = absUrl(SITE.ogImage);
const SIGN_OFF = "Meghan, Kate, Stefanie & Dana";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function greetingName(donation: Donation): string {
  return donation.firstName ?? "neighbor";
}

function formatAmount(donation: Donation): string | null {
  if (!donation.amount) return null;
  const currency = donation.currency === "USD" ? "$" : "";
  const suffix = donation.currency && donation.currency !== "USD"
    ? ` ${donation.currency}`
    : "";
  return `${currency}${donation.amount}${suffix}`;
}

export function buildDonationThankYou(donation: Donation): {
  subject: string;
  html: string;
  text: string;
} {
  const name = greetingName(donation);
  const amount = formatAmount(donation);
  const subject = "Thank you for backing the new Pollard 💛";

  const amountLineText = amount
    ? `\nYour contribution: ${amount}\n`
    : "";

  const text = `Hi ${name},

Thank you so much for your donation to Pollard Now. We're a small team of four Needham neighbors fueled by community spirit, and gifts like yours are exactly what keep this grassroots campaign moving.
${amountLineText}
Your support goes straight to the lawn signs, mailers, and neighbor-to-neighbor outreach that remind our community to vote YES for a new Pollard Middle School on ${electionDay.date}. Every dollar helps us reach one more household before the ballot.

Want to do even more? Forward this note to a neighbor, or lend an hour to hold a sign: ${externalLinks.volunteer}

And don't forget — look for Pollard on your ballot this November.

With gratitude,
${SIGN_OFF}
The Pollard Now Committee

—
${SITE.name} · ${SITE.url}
Paid for by Pollard Now. PayPal will email your official payment receipt separately.`;

  const amountBlockHtml = amount
    ? `<tr><td style="padding:0 32px;">
        <div style="margin:8px 0 0;padding:14px 18px;background:${COLOR.accentSoft};border-radius:12px;color:${COLOR.foreground};font-size:15px;">
          <span style="color:${COLOR.muted};">Your contribution</span>
          &nbsp;<strong style="font-size:18px;">${escapeHtml(amount)}</strong>
        </div>
      </td></tr>`
    : "";

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:${COLOR.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Thank you for helping build a new Pollard Middle School.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLOR.bg};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${COLOR.surface};border:1px solid ${COLOR.border};border-radius:16px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <tr><td style="background:${COLOR.primary};padding:24px 32px;" align="center">
          <img src="${LOGO_URL}" alt="${escapeHtml(SITE.name)}" width="160" style="display:block;max-width:160px;height:auto;" />
        </td></tr>

        <tr><td style="padding:32px 32px 8px;">
          <h1 style="margin:0;font-size:22px;line-height:1.3;color:${COLOR.foreground};">Thank you, ${escapeHtml(name)}.</h1>
        </td></tr>

        <tr><td style="padding:8px 32px 0;color:${COLOR.foreground};font-size:16px;line-height:1.6;">
          <p style="margin:0 0 16px;">Thank you so much for your donation to Pollard Now. We're a small team of four Needham neighbors fueled by community spirit, and gifts like yours are exactly what keep this grassroots campaign moving.</p>
        </td></tr>

        ${amountBlockHtml}

        <tr><td style="padding:16px 32px 0;color:${COLOR.foreground};font-size:16px;line-height:1.6;">
          <p style="margin:0 0 16px;">Your support goes straight to the lawn signs, mailers, and neighbor-to-neighbor outreach that remind our community to vote <strong>YES</strong> for a new Pollard Middle School on <strong>${escapeHtml(electionDay.date)}</strong>. Every dollar helps us reach one more household before the ballot.</p>
          <p style="margin:0 0 24px;">Want to do even more? Forward this note to a neighbor — and don't forget to look for Pollard on your ballot this November.</p>
        </td></tr>

        <tr><td style="padding:0 32px 28px;">
          <a href="${externalLinks.volunteer}" style="display:inline-block;background:${COLOR.primary};color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:999px;">Lend an hour →</a>
        </td></tr>

        <tr><td style="padding:0 32px 28px;color:${COLOR.foreground};font-size:16px;line-height:1.6;">
          <p style="margin:0;">With gratitude,<br /><strong>${escapeHtml(SIGN_OFF)}</strong><br /><span style="color:${COLOR.muted};">The Pollard Now Committee</span></p>
        </td></tr>

        <tr><td style="background:${COLOR.bg};border-top:1px solid ${COLOR.border};padding:18px 32px;color:${COLOR.muted};font-size:12px;line-height:1.6;">
          <a href="${SITE.url}" style="color:${COLOR.accent};text-decoration:none;font-weight:600;">${escapeHtml(SITE.name)}</a> · #PollardNow #NeedhamVotes<br />
          Paid for by Pollard Now. PayPal will email your official payment receipt separately.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}

// Internal heads-up to the committee when PayPal didn't give us a donor
// email to thank. Lets a human follow up personally.
export function buildDonationNotice(donation: Donation): {
  subject: string;
  html: string;
  text: string;
} {
  const amount = formatAmount(donation) ?? "an unknown amount";
  const who = donation.fullName ?? "an anonymous donor";
  const txn = donation.transactionId ?? "n/a";
  const subject = `New Pollard donation (${amount}) — no donor email captured`;
  const text = `A donation just came through PayPal but the webhook didn't include a donor email, so no automatic thank-you was sent.

Donor: ${who}
Amount: ${amount}
PayPal transaction: ${txn}

Look this up in PayPal to follow up personally.`;
  const html = `<p>A donation just came through PayPal but the webhook didn't include a donor email, so no automatic thank-you was sent.</p>
<ul>
  <li><strong>Donor:</strong> ${escapeHtml(who)}</li>
  <li><strong>Amount:</strong> ${escapeHtml(amount)}</li>
  <li><strong>PayPal transaction:</strong> ${escapeHtml(txn)}</li>
</ul>
<p>Look this up in PayPal to follow up personally.</p>`;
  return { subject, html, text };
}
