"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { submitVolunteer } from "./actions";
import {
  volunteerIdeas,
  volunteerInterests,
  volunteerInterestsHeading,
  volunteerIntro,
  volunteerSkills,
} from "@/lib/volunteer";
import { FormSuccess } from "@/components/form-success";
import { formSuccess } from "@/lib/forms";

const initialState = { status: "idle" as const };

const fieldClass = (invalid: boolean) =>
  `mt-1.5 block w-full rounded-lg border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-foreground-muted focus:bg-surface ${
    invalid ? "border-danger" : "border-border-strong"
  }`;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-contrast transition-colors hover:bg-primary-hover disabled:cursor-progress disabled:opacity-70"
    >
      {pending ? "Sending…" : "Sign me up"}
    </button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-danger">
      {message}
    </p>
  );
}

export function VolunteerForm() {
  const [state, formAction] = useActionState(submitVolunteer, initialState);
  const firstId = useId();
  const lastId = useId();
  const emailId = useId();
  const phoneId = useId();
  const houseId = useId();
  const streetId = useId();
  const precinctId = useId();
  const ideasId = useId();
  const liveId = useId();

  const fe = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  if (state.status === "success") {
    return <FormSuccess content={formSuccess.volunteer} name={state.name} />;
  }

  return (
    <>
      <h2 className="font-display text-2xl font-semibold text-foreground">
        {volunteerIntro.formHeading}
      </h2>
      <p className="mt-2 text-foreground-muted">{volunteerIntro.formNote}</p>
      <form action={formAction} noValidate className="mt-7 space-y-6">
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
              className={fieldClass(Boolean(fe.firstName))}
            />
            <FieldError id={`${firstId}-err`} message={fe.firstName} />
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
              className={fieldClass(Boolean(fe.lastName))}
            />
            <FieldError id={`${lastId}-err`} message={fe.lastName} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor={emailId}
              className="block text-sm font-semibold text-foreground"
            >
              Email
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={Boolean(fe.email)}
              aria-describedby={fe.email ? `${emailId}-err` : undefined}
              className={fieldClass(Boolean(fe.email))}
            />
            <FieldError id={`${emailId}-err`} message={fe.email} />
          </div>
          <div>
            <label
              htmlFor={phoneId}
              className="block text-sm font-semibold text-foreground"
            >
              Phone number{" "}
              <span className="font-normal text-foreground-muted">
                (optional)
              </span>
            </label>
            <input
              id={phoneId}
              name="phone"
              type="tel"
              autoComplete="tel"
              className={fieldClass(false)}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label
              htmlFor={houseId}
              className="block text-sm font-semibold text-foreground"
            >
              House number
            </label>
            <input
              id={houseId}
              name="houseNumber"
              type="text"
              required
              autoComplete="address-line1"
              aria-invalid={Boolean(fe.houseNumber)}
              aria-describedby={fe.houseNumber ? `${houseId}-err` : undefined}
              className={fieldClass(Boolean(fe.houseNumber))}
            />
            <FieldError id={`${houseId}-err`} message={fe.houseNumber} />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor={streetId}
              className="block text-sm font-semibold text-foreground"
            >
              Street name
            </label>
            <input
              id={streetId}
              name="streetName"
              type="text"
              required
              autoComplete="address-line2"
              aria-invalid={Boolean(fe.streetName)}
              aria-describedby={fe.streetName ? `${streetId}-err` : undefined}
              className={fieldClass(Boolean(fe.streetName))}
            />
            <FieldError id={`${streetId}-err`} message={fe.streetName} />
          </div>
        </div>

        <div>
          <label
            htmlFor={precinctId}
            className="block text-sm font-semibold text-foreground"
          >
            Voting precinct{" "}
            <span className="font-normal text-foreground-muted">
              (optional, if you know it)
            </span>
          </label>
          <input
            id={precinctId}
            name="precinct"
            type="text"
            className={fieldClass(false)}
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-foreground">
            {volunteerInterestsHeading}
          </legend>
          <div className="space-y-2.5">
            {volunteerInterests.map((interest) => (
              <label
                key={interest.name}
                className="flex items-start gap-3 rounded-lg border border-border bg-background p-3 text-sm text-foreground hover:bg-surface"
              >
                <input
                  type="checkbox"
                  name={interest.name}
                  value={interest.label}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-strong text-primary focus:ring-primary"
                />
                <span>{interest.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-foreground">
            {volunteerSkills.legend}
          </legend>
          <div className="flex flex-wrap gap-4">
            {volunteerSkills.options.map((option) => (
              <label
                key={option}
                className="inline-flex items-center gap-2 text-sm text-foreground"
              >
                <input
                  type="radio"
                  name="skills"
                  value={option}
                  className="h-4 w-4 border-border-strong text-primary focus:ring-primary"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor={ideasId}
            className="block text-sm font-semibold text-foreground"
          >
            {volunteerIdeas.label}{" "}
            <span className="font-normal text-foreground-muted">
              (optional)
            </span>
          </label>
          <textarea
            id={ideasId}
            name="ideas"
            rows={4}
            className={fieldClass(false)}
          />
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
