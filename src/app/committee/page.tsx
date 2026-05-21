import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { ClosingCta } from "@/components/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { committee } from "@/lib/committee";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Meet Your Committee",
  description:
    "Pollard Now is a small team of four Needham neighbors fueled by community spirit. Meet the committee behind the campaign.",
  alternates: { canonical: "/committee" },
  openGraph: {
    title: "Meet Your Committee — Pollard Now",
    description:
      "Pollard Now is a small team of four Needham neighbors fueled by community spirit. Meet the committee behind the campaign.",
    url: "/committee",
  },
};

// Per-member crop focus so the face stays centered across very different
// source photos (studio headshot, garden portrait, etc.).
const focus: Record<string, string> = {
  "meghan-small": "50% 28%",
  "kate-linzmeyer": "50% 30%",
  "dana-brown-malcolm": "50% 35%",
};

export default function CommitteePage() {
  return (
    <>
      <PageHeader
        eyebrow="Meet your committee"
        title="A small team of four neighbors."
        description="We are a small team of four neighbors fueled by community spirit — and we’d love for you to join the momentum. Meet the people behind Pollard Now."
      />

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <ul className="grid gap-8 md:grid-cols-2 md:gap-10">
          {committee.map((m) => (
            <li
              key={m.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface"
            >
              <div className="relative aspect-[4/5] bg-surface-muted">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={`Headshot of ${m.name}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: focus[m.id] ?? "50% 30%" }}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-[#162848]"
                  >
                    <span className="font-display text-6xl font-semibold text-accent-soft">
                      {m.initials}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-7 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-hover">
                  {m.role}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
                  {m.name}
                </h2>
                <div className="mt-4 space-y-3 leading-relaxed text-foreground-muted">
                  {m.paragraphs.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ClosingCta
        heading="Join the momentum."
        body="Lend your time, your voice, or your support. Every neighbor who pitches in helps us cross the finish line for a new Pollard."
      />

      <JsonLd
        id="ld-committee-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Committee", path: "/committee" },
        ])}
      />
    </>
  );
}
