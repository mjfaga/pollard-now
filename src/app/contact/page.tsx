import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "./contact-form";
import { SubscribeForm } from "./subscribe-form";
import { JsonLd } from "@/components/json-ld";
import { SocialLinks } from "@/components/social-links";
import { externalLinks } from "@/lib/links";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send Pollard Now a message or sign up for email updates about the campaign and the Pollard Middle School building project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Pollard Now",
    description:
      "Send Pollard Now a message or sign up for email updates about the campaign and the Pollard Middle School building project.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact us & sign up for our mailing list."
        description="Send us a message or join the email list — short, occasional updates with key dates, talking points, and ways to help. A real person reads every note."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:gap-12 md:px-8 md:py-20">
        <div className="rounded-2xl border border-border bg-surface p-7 md:p-8">
          <ContactForm />
        </div>

        <div className="rounded-2xl border border-border bg-surface-muted p-7 md:p-8">
          <SubscribeForm />
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-3 md:px-8">
          <a
            href={externalLinks.donate}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
          >
            <h3 className="font-display text-lg font-semibold text-foreground">
              Donate{" "}
              <span aria-hidden="true" className="text-foreground-muted">
                ↗
              </span>
              <span className="sr-only">(opens in new tab)</span>
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              One-time gifts via PayPal — every dollar funds outreach.
            </p>
          </a>
          <Link
            href="/volunteer"
            className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
          >
            <h3 className="font-display text-lg font-semibold text-foreground">
              Volunteer
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Tell us what you&apos;d love to help with — we&apos;ll match you
              to a real task.
            </p>
          </Link>
          <a
            href={externalLinks.projectPage}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
          >
            <h3 className="font-display text-lg font-semibold text-foreground">
              Official Pollard Middle School Project page{" "}
              <span aria-hidden="true" className="text-foreground-muted">
                ↗
              </span>
              <span className="sr-only">(opens in new tab)</span>
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Plans, documents, and meeting updates from Needham Public Schools.
            </p>
          </a>
        </div>
      </section>

      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-12 text-center md:px-8">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Follow the campaign
          </h2>
          <p className="max-w-md text-sm text-foreground-muted">
            Events, reminders, and ways to help — follow Pollard Now on Facebook
            and @pollardnow26 on Instagram.
          </p>
          <SocialLinks variant="default" />
        </div>
      </section>

      <JsonLd
        id="ld-contact-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
