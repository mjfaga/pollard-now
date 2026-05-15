"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { submitContact } from "./actions";

const initialState = { status: "idle" as const };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-contrast transition-colors hover:bg-primary-hover disabled:cursor-progress disabled:opacity-70"
    >
      {pending ? "Sending…" : label}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const errId = useId();

  const fe = state.status === "error" ? state.fieldErrors ?? {} : {};

  return (
    <form action={formAction} noValidate className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty if you&apos;re human:
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label
          htmlFor={nameId}
          className="block text-sm font-semibold text-foreground"
        >
          Your name
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={Boolean(fe.name)}
          aria-describedby={fe.name ? `${nameId}-err` : undefined}
          className={`mt-1.5 block w-full rounded-lg border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-foreground-muted focus:bg-surface ${
            fe.name ? "border-danger" : "border-border-strong"
          }`}
        />
        {fe.name && (
          <p
            id={`${nameId}-err`}
            className="mt-1.5 text-sm font-medium text-danger"
          >
            {fe.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={emailId}
          className="block text-sm font-semibold text-foreground"
        >
          Your email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={Boolean(fe.email)}
          aria-describedby={fe.email ? `${emailId}-err` : undefined}
          className={`mt-1.5 block w-full rounded-lg border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-foreground-muted focus:bg-surface ${
            fe.email ? "border-danger" : "border-border-strong"
          }`}
        />
        {fe.email && (
          <p
            id={`${emailId}-err`}
            className="mt-1.5 text-sm font-medium text-danger"
          >
            {fe.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={messageId}
          className="block text-sm font-semibold text-foreground"
        >
          Your message
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={5}
          aria-invalid={Boolean(fe.message)}
          aria-describedby={fe.message ? `${messageId}-err` : undefined}
          className={`mt-1.5 block w-full rounded-lg border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-foreground-muted focus:bg-surface ${
            fe.message ? "border-danger" : "border-border-strong"
          }`}
        />
        {fe.message && (
          <p
            id={`${messageId}-err`}
            className="mt-1.5 text-sm font-medium text-danger"
          >
            {fe.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton label="Send message" />
        <div aria-live="polite" id={errId} className="min-h-[1.5rem] text-sm">
          {state.status === "success" && (
            <span className="font-semibold text-success">{state.message}</span>
          )}
          {state.status === "error" && !Object.keys(fe).length && (
            <span className="font-semibold text-danger">{state.message}</span>
          )}
        </div>
      </div>
    </form>
  );
}
