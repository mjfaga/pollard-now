// Minimal transactional-email sender. Calls Resend's HTTP API directly so
// we don't pull in an SDK dependency. To move the campaign to a different
// provider (SendGrid, Postmark, etc.), swap the fetch target and body here.

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  bcc?: string | string[];
};

export type SendResult =
  | { ok: true; id: string | null }
  | { ok: false; reason: "unconfigured" | "error"; detail?: string };

export async function sendEmail(input: SendEmailInput): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.DONATION_FROM_EMAIL;
  if (!apiKey || !from) return { ok: false, reason: "unconfigured" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        from,
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
        ...(input.bcc ? { bcc: input.bcc } : {}),
      }),
    });
    if (!res.ok) {
      return {
        ok: false,
        reason: "error",
        detail: `HTTP ${res.status} ${await res.text()}`,
      };
    }
    const data = (await res.json()) as { id?: string };
    return { ok: true, id: data.id ?? null };
  } catch (err) {
    return { ok: false, reason: "error", detail: (err as Error).message };
  }
}
