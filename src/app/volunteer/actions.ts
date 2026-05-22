"use server";

import { volunteerInterests } from "@/lib/volunteer";

type ActionState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

// The campaign's existing Google Form. Posting to /formResponse records the
// submission in the same spreadsheet the public form already feeds.
const FORM_RESPONSE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf_sIRBg5Y8XeTedLGLJg7D68Jz394aj_ZviYHAoHsgVYxvlA/formResponse";

// Maps our semantic field names to the Google Form's entry IDs.
const ENTRY_IDS = {
  firstName: "entry.989040966",
  lastName: "entry.1379276590",
  email: "entry.238672442",
  phone: "entry.1472538023",
  houseNumber: "entry.666293522",
  streetName: "entry.131452889",
  precinct: "entry.257047310",
  skills: "entry.1446693868",
  ideas: "entry.132636906",
  interestLearnMore: "entry.672561262",
  interestHostGathering: "entry.1303570832",
  interestEventsCommittee: "entry.759684024",
  interestCanvassing: "entry.1526405026",
  interestYardSign: "entry.1817066093",
  interestEndorsement: "entry.1117517593",
  interestFundraising: "entry.1991732299",
  interestEmailNetwork: "entry.886109050",
} as const;

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function submitVolunteer(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Honeypot: silently accept bot submissions without forwarding them.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks for signing up to volunteer!" };
  }

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const houseNumber = String(formData.get("houseNumber") ?? "").trim();
  const streetName = String(formData.get("streetName") ?? "").trim();
  const precinct = String(formData.get("precinct") ?? "").trim();
  const skills = String(formData.get("skills") ?? "").trim();
  const ideas = String(formData.get("ideas") ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!firstName) fieldErrors.firstName = "First name is required.";
  if (!lastName) fieldErrors.lastName = "Last name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!isValidEmail(email))
    fieldErrors.email = "That email address doesn't look right.";
  if (!houseNumber) fieldErrors.houseNumber = "House number is required.";
  if (!streetName) fieldErrors.streetName = "Street name is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const params = new URLSearchParams();
  params.append(ENTRY_IDS.firstName, firstName);
  params.append(ENTRY_IDS.lastName, lastName);
  params.append(ENTRY_IDS.email, email);
  params.append(ENTRY_IDS.houseNumber, houseNumber);
  params.append(ENTRY_IDS.streetName, streetName);
  if (phone) params.append(ENTRY_IDS.phone, phone);
  if (precinct) params.append(ENTRY_IDS.precinct, precinct);
  if (skills === "Yes" || skills === "No")
    params.append(ENTRY_IDS.skills, skills);
  if (ideas) params.append(ENTRY_IDS.ideas, ideas);

  // Forward each checked interest using the canonical label so the value
  // matches the Google Form option exactly, regardless of client input.
  for (const interest of volunteerInterests) {
    if (formData.get(interest.name)) {
      params.append(ENTRY_IDS[interest.name], interest.label);
    }
  }

  // Best-effort delivery: a 2xx means Google accepted the POST, not that every
  // field mapped to a valid entry ID. The timeout guards against a hung request
  // holding the server action open.
  try {
    const res = await fetch(FORM_RESPONSE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Google Form responded ${res.status}`);
  } catch {
    return {
      status: "error",
      message:
        "Something went wrong sending your sign-up. Please try again in a moment, or reach us from the Contact page.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you for signing up to volunteer! We'll be in touch about next steps.",
  };
}
