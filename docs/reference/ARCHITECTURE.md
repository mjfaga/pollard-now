# Architecture

Pollard Now is a **static-first Next.js App Router site**. Its defining idea is **content-as-data**:
the campaign's words live in typed modules under `src/lib/`, and the pages under `src/app/` render
that data. There is no CMS, database, or auth.

## Rendering model

- **Server Components by default.** Pages and most components render on the server with no
  client-side JavaScript shipped for them.
- **`"use client"` only for interaction.** The handful of client components are: the project
  carousel, the desktop and mobile nav, the language switcher, and the contact/subscribe forms.
- **Progressive enhancement first.** Where a native element does the job, it is used directly — the
  FAQ accordion is a plain `<details>/<summary>` and works with JavaScript disabled.

## Routing

One folder per route under `src/app/`:

| Route        | File                        | Notes                                            |
| ------------ | --------------------------- | ------------------------------------------------ |
| `/`          | `app/page.tsx`              | Home — hero, reasons, "why now", CTAs            |
| `/plan`      | `app/plan/page.tsx`         | The Plan — why now, plan, finances               |
| `/committee` | `app/committee/page.tsx`    | Committee member bios                            |
| `/faq`       | `app/faq/page.tsx`          | FAQ accordion + `FAQPage` JSON-LD                |
| `/contact`   | `app/contact/page.tsx`      | Contact + subscribe forms (server actions)       |
| 404          | `app/not-found.tsx`         | Not-found page                                   |

Cross-cutting files:

- `app/layout.tsx` — root layout: fonts, global metadata, `SiteHeader`/`SiteFooter`, the language
  switcher, the Google Translate bootstrap, and site-wide JSON-LD.
- `app/globals.css` — Tailwind import + design tokens (see [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)).
- `app/sitemap.ts` and `app/robots.ts` — generated `sitemap.xml` / `robots.txt`.
- `app/icon.svg` — favicon with light/dark variants via an embedded `prefers-color-scheme` block.

## Content model (`src/lib/`)

This is the heart of the site. Each module is plain, typed, server-importable data.

| Module        | Exports                                                          | Used by                          |
| ------------- | --------------------------------------------------------------- | -------------------------------- |
| `site.ts`     | `SITE` (identity, URL, OG image), `absUrl()`                    | layout metadata, schema, links   |
| `links.ts`    | `navLinks`, `externalLinks`                                     | header, footer, nav, CTAs        |
| `project.ts`  | `foundation`, `reasons`, `voice`, `whyNow`, `plan`, `finances`, `electionDay` | Home + Plan pages |
| `faqs.ts`     | `faqs` (`Faq[]`)                                                | FAQ page + `faqPageSchema()`     |
| `committee.ts`| `committee` (`CommitteeMember[]`)                               | Committee page                   |
| `sources.ts`  | `sources`, `sourceAnchor()`                                     | footnotes / superscripts         |
| `schema.ts`   | `websiteSchema()`, `organizationSchema()`, `breadcrumbSchema()`, `faqPageSchema()` | layout + pages |

**Single source of truth.** `site.ts` is the only place the canonical URL and OG image are defined;
everything else (metadata, structured data, absolute links) derives from it via `absUrl()`. Footnote
numbers in `project.ts`/`faqs.ts` reference entries in `sources.ts`, which the pages render as a
linked "Sources & notes" list.

To change copy, edit these modules — see [EDIT_CONTENT](../skills/EDIT_CONTENT.md).

## SEO & structured data

- **Metadata API**: the root layout sets defaults, a title template (`%s · Pollard Now`), Open Graph,
  Twitter cards, robots directives, keywords, and the canonical URL. Individual pages export their
  own `metadata` to override title/description.
- **JSON-LD**: emitted through the `<JsonLd>` component (`src/components/json-ld.tsx`), which safely
  serializes server-side constants (escaping `<`). Builders live in `src/lib/schema.ts`:
  `WebSite` + `Organization` are emitted site-wide from the layout; `FAQPage` is emitted on the FAQ
  page. Reuse a builder rather than hand-writing JSON-LD.
- **Sitemap/robots**: `app/sitemap.ts` lists all routes; `app/robots.ts` allows crawling and points
  to the sitemap. New routes must be added to `sitemap.ts`.

## Internationalization

On-page translation is provided by the **Google Translate widget**, bootstrapped in `app/layout.tsx`
into a hidden `#google_translate_element`. A custom `LanguageSwitcher` component drives the hidden
`<select class="goog-te-combo">`, so users get a branded control instead of Google's default chrome
(which is hidden via the `.goog-*` rules in `globals.css`). Ten languages are configured via
`TRANSLATE_LANGS` in the layout.

## Forms

The contact and subscribe forms post to **server actions** in `src/app/contact/actions.ts`
(`submitContact`, `subscribeEmail`). Today they:

- validate input (required fields + email shape) and return a typed `ActionState`,
- include a honeypot (`website`) field for basic spam resistance,
- and **stub delivery** — there is a `TODO` to wire a real email/CRM destination.

The client form components (`contact-form.tsx`, `subscribe-form.tsx`) use these actions with
`useActionState` for inline validation and status messaging. Before sending real submissions
anywhere, get an approved, secure destination (see [AGENTS.md](../../AGENTS.md#ask-first)).

## Assets

Static assets live in `public/`: the full and compact logos, committee headshots
(`public/images/committee/`), and carousel imagery (`public/images/carousel/`). Committee members
without a headshot fall back to a monogram avatar built from their `initials`.
