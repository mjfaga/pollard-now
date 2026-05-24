"use server";

import { addSubscriber } from "@/lib/mailchimp";
import { isFormsDryRun } from "@/lib/dry-run";

type ActionState =
  | { status: "idle" }
  | { status: "success"; name?: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// The thank-you panel greets the submitter by first name; cap the length so a
// pasted essay can't blow out the layout.
const firstNameOf = (value: string) => value.split(/\s+/)[0]?.slice(0, 60);

export async function submitContact(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (formData.get("website")) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Please enter your name.";
  if (!email) fieldErrors.email = "Please enter your email address.";
  else if (!isValidEmail(email))
    fieldErrors.email = "That email address doesn't look right.";
  if (!message) fieldErrors.message = "Please include a short message.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors,
    };
  }

  // TODO: wire up real delivery (email service, CRM, etc.).
  return { status: "success", name: firstNameOf(name) };
}

export async function subscribeEmail(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (formData.get("website")) {
    return { status: "success" };
  }

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!firstName) fieldErrors.firstName = "First name is required.";
  if (!lastName) fieldErrors.lastName = "Last name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!isValidEmail(email))
    fieldErrors.email = "That email address doesn't look right.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  // Local dry-run: skip Mailchimp and show the success panel without subscribing.
  if (isFormsDryRun()) {
    return { status: "success", name: firstName.slice(0, 60) };
  }

  const result = await addSubscriber({ firstName, lastName, email });
  if (!result.ok) {
    console.error("Mailchimp subscribe failed:", result);
    return {
      status: "error",
      message:
        "Sorry — we couldn't add you to the list just now. Please try again in a moment.",
    };
  }

  return { status: "success", name: firstName.slice(0, 60) };
}
