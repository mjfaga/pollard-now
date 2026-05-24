"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { subscribeEmail } from "./actions";
import { FormSuccess } from "@/components/form-success";
import { formIntro, formSuccess } from "@/lib/forms";

const initialState = { status: "idle" as const };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-accent-hover hover:text-primary-contrast disabled:cursor-progress disabled:opacity-70"
    >
      {pending ? "Subscribing…" : "Sign me up"}
    </button>
  );
}

export function SubscribeForm() {
  const [state, formAction] = useActionState(subscribeEmail, initialState);
  const firstId = useId();
  const lastId = useId();
  const emailId = useId();
  const liveId = useId();

  const fe = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  if (state.status === "success") {
    return <FormSuccess content={formSuccess.subscribe} name={state.name} />;
  }

  return (
    <>
      <h2 className="font-display text-2xl font-semibold text-foreground">
        {formIntro.subscribe.heading}
      </h2>
      <p className="mt-2 text-foreground-muted">
        {formIntro.subscribe.description}
      </p>
      <form action={formAction} noValidate className="mt-7 space-y-5">
        <div className="hidden" aria-hidden="true">
          <label>
            Leave this field empty if you&apos;re human:
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor={firstId}
              className="block text-sm font-semibold text-foreground"
            >
              First name
            </label>
            <input
              id={firstId}
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              aria-invalid={Boolean(fe.firstName)}
              aria-describedby={fe.firstName ? `${firstId}-err` : undefined}
              className={`mt-1.5 block w-full rounded-lg border bg-background px-4 py-2.5 text-base text-foreground focus:bg-surface ${
                fe.firstName ? "border-danger" : "border-border-strong"
              }`}
            />
            {fe.firstName && (
              <p
                id={`${firstId}-err`}
                className="mt-1.5 text-sm font-medium text-danger"
              >
                {fe.firstName}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={lastId}
              className="block text-sm font-semibold text-foreground"
            >
              Last name
            </label>
            <input
              id={lastId}
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              aria-invalid={Boolean(fe.lastName)}
              aria-describedby={fe.lastName ? `${lastId}-err` : undefined}
              className={`mt-1.5 block w-full rounded-lg border bg-background px-4 py-2.5 text-base text-foreground focus:bg-surface ${
                fe.lastName ? "border-danger" : "border-border-strong"
              }`}
            />
            {fe.lastName && (
              <p
                id={`${lastId}-err`}
                className="mt-1.5 text-sm font-medium text-danger"
              >
                {fe.lastName}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor={emailId}
            className="block text-sm font-semibold text-foreground"
          >
            Email address
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(fe.email)}
            aria-describedby={fe.email ? `${emailId}-err` : undefined}
            className={`mt-1.5 block w-full rounded-lg border bg-background px-4 py-2.5 text-base text-foreground focus:bg-surface ${
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

        <div className="flex flex-wrap items-center gap-4">
          <SubmitButton />
          <div
            aria-live="polite"
            id={liveId}
            className="min-h-[1.5rem] text-sm"
          >
            {state.status === "error" && !Object.keys(fe).length && (
              <span className="font-semibold text-danger">{state.message}</span>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
