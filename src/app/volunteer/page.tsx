import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { volunteerIntro } from "@/lib/volunteer";
import { VolunteerForm } from "./volunteer-form";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Sign up to volunteer with Pollard Now — host a yard sign, knock on doors, share an endorsement, or help get out the YES vote for the new Pollard Middle School.",
  alternates: { canonical: "/volunteer" },
  openGraph: {
    title: "Volunteer with Pollard Now",
    description:
      "Sign up to volunteer with Pollard Now — host a yard sign, knock on doors, share an endorsement, or help get out the YES vote for the new Pollard Middle School.",
    url: "/volunteer",
  },
};

export default function VolunteerPage() {
  // Public site key (safe to expose). When unset, the form runs honeypot-only.
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? null;

  return (
    <>
      <PageHeader
        eyebrow={volunteerIntro.eyebrow}
        title={volunteerIntro.title}
        description={volunteerIntro.description}
      />

      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <div className="rounded-2xl border border-border bg-surface p-7 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            {volunteerIntro.formHeading}
          </h2>
          <p className="mt-2 text-foreground-muted">{volunteerIntro.formNote}</p>
          <div className="mt-7">
            <VolunteerForm turnstileSiteKey={turnstileSiteKey} />
          </div>
        </div>
      </section>

      <JsonLd
        id="ld-volunteer-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Volunteer", path: "/volunteer" },
        ])}
      />
    </>
  );
}
