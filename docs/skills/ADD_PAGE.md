# Skill: Add a Page

**When to use:** adding a new route (a new URL) to the site.

Routes are folders under `src/app/`. A folder with a `page.tsx` becomes a route at its path
(`src/app/volunteer/page.tsx` → `/volunteer`). Pages are Server Components by default.

## Checklist

1. Create `src/app/<route>/page.tsx`.
2. Export page-level `metadata` (title, description, canonical, Open Graph).
3. Render with the shared `PageHeader` + section layout for consistency.
4. Keep copy in `src/lib/` if it's substantial or reused (see [EDIT_CONTENT](EDIT_CONTENT.md)).
5. Add the route to `src/app/sitemap.ts`.
6. Add a link to it in `src/lib/links.ts` (`navLinks`) if it belongs in the nav.
7. Optionally add `BreadcrumbList` JSON-LD via `breadcrumbSchema()` + `<JsonLd>`.
8. Verify with `npm run dev` (desktop + mobile) and run `npm run lint`.

## Template

```tsx
// src/app/volunteer/page.tsx
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Join the Pollard Now campaign — lend your time, voice, and support.",
  alternates: { canonical: "/volunteer" },
  openGraph: {
    title: "Volunteer — Pollard Now",
    description: "Join the Pollard Now campaign — lend your time, voice, and support.",
    url: "/volunteer",
  },
};

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        title="Lend your time."
        description="A small team of neighbors — we’d love your help."
      />

      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        {/* page content; pull reusable copy from src/lib/ */}
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
```

## Then update the sitemap

`src/app/sitemap.ts` lists every route. Add the new one:

```ts
{ url: `${SITE.url}/volunteer`, lastModified, priority: 0.7, changeFrequency: "monthly" },
```

## Conventions

- **Title**: keep it short — the root layout applies the `%s · Pollard Now` template.
- **Canonical & OG `url`**: use a path (`/volunteer`); `metadataBase` in the layout makes it
  absolute. Don't hardcode the domain.
- **Layout**: `PageHeader` for the top of the page, then `<section className="mx-auto max-w-3xl …">`
  (or `max-w-4xl`) for body content — match the existing pages.
- **Styling**: design tokens only (`bg-surface`, `text-foreground`, …). See
  [DESIGN_SYSTEM](../reference/DESIGN_SYSTEM.md).
- **Interactivity**: only add `"use client"` to a child component that truly needs it; keep the page
  itself a Server Component.

## Don't

- Don't forget `sitemap.ts` — an unlisted page won't be advertised to crawlers.
- Don't inline large bodies of copy; move them to `src/lib/` so content stays editable in one place.
- Don't hand-write JSON-LD; use a builder from `src/lib/schema.ts`.
