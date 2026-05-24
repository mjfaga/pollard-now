// Copy deck for the site's three forms (Contact, Subscribe, Volunteer):
// the card heading/description shown above each form, plus the celebratory
// "thank you" experience shown after a successful submission.
//
// To change what a form says — before or after submitting — edit this file,
// not the form markup. Volunteer's heading/note live in volunteer.ts; only
// its success copy lives here alongside the others.

import { externalLinks } from "@/lib/links";

export type FormCta = {
  label: string;
  href: string;
  external: boolean;
  variant: "primary" | "secondary" | "ghost";
};

export type FormSuccessContent = {
  headline: string;
  // `{name}` is replaced with the submitter's first name when known. When it
  // isn't (e.g. a bot tripped the honeypot), the ", {name}" fragment is dropped
  // — so always write the placeholder in that form. See `personalize` below.
  message: string;
  ctaHeading: string;
  ctas: readonly FormCta[];
  socialNote: string;
};

// Card heading + description for the Contact-page forms. (Volunteer reuses
// `volunteerIntro` from volunteer.ts.)
export const formIntro = {
  contact: {
    heading: "Contact us",
    description:
      "Questions, ideas, story to share, or want to host a yard sign? Send a note.",
  },
  subscribe: {
    heading: "Sign up for our emails",
    description:
      "Short, occasional updates with key dates, talking points, and ways to help. Unsubscribe any time.",
  },
} as const;

export const formSuccess = {
  subscribe: {
    headline: "You're on the list! 🎉",
    message:
      "Thanks, {name} — watch your inbox for short, occasional updates with key dates, talking points, and ways to help.",
    ctaHeading: "While you're here",
    ctas: [
      {
        label: "Donate",
        href: externalLinks.donate,
        external: true,
        variant: "secondary",
      },
      {
        label: "Volunteer with us",
        href: "/volunteer",
        external: false,
        variant: "primary",
      },
    ],
    socialNote: "Follow the campaign for events and reminders:",
  },
  contact: {
    headline: "Message received 💬",
    message:
      "Thanks, {name} — a real person reads every note, and we'll get back to you soon.",
    ctaHeading: "In the meantime",
    ctas: [
      {
        label: "Volunteer with us",
        href: "/volunteer",
        external: false,
        variant: "primary",
      },
    ],
    socialNote: "Follow the campaign while you wait:",
  },
  volunteer: {
    headline: "Welcome aboard! 🎉",
    message:
      "Thank you, {name} — Pollard will be the biggest project our town has ever taken on, and we're so glad you're in. We'll be in touch about next steps.",
    ctaHeading: "Want to do more right now?",
    ctas: [
      {
        label: "Donate to the campaign",
        href: externalLinks.donate,
        external: true,
        variant: "primary",
      },
    ],
    socialNote: "Follow along and help spread the word:",
  },
} as const satisfies Record<string, FormSuccessContent>;

// Fills the `{name}` placeholder with the submitter's first name, or drops the
// ", {name}" fragment entirely when no name is known so the line still reads.
// The function replacer inserts `name` verbatim — avoids `$&`/`$1` being treated
// as special replacement patterns for names that happen to contain `$`.
export function personalize(template: string, name?: string): string {
  if (name) return template.replace("{name}", () => name);
  return template.replace(/,?\s*\{name\}/, "");
}
