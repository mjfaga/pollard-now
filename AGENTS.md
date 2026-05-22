<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Pollard Now — Agent Guide

A community campaign website for the **Pollard Middle School debt exclusion override** in Needham,
Massachusetts (vote: Tuesday, November 3, 2026). It is a static-first marketing site: a few
editorial pages rendered from a typed "copy deck" of content, plus SEO/structured data, on-page
translation, and accessible interactions. **No CMS, no database, no auth, no runtime environment
variables.**

## Technology Stack

| Technology   | Version | Purpose                                                  |
| ------------ | ------- | -------------------------------------------------------- |
| Next.js      | 16.2    | App framework (App Router, static-first)                 |
| React        | 19.2    | UI library                                               |
| TypeScript   | 5.x     | Type safety (strict mode)                                |
| Tailwind CSS | 4.x     | Styling via utilities + CSS-variable design tokens       |
| `next/font`  | —       | Self-hosted Inter (sans) + Montserrat (display)         |
| ESLint       | 9.x     | `eslint-config-next` (core-web-vitals + typescript)      |
| npm          | —       | Package manager (`package-lock.json`)                    |
| Vercel       | —       | Hosting + preview deploys                                 |

## Skills Index

- [EDIT_CONTENT](docs/skills/EDIT_CONTENT.md) — Change copy, FAQs, committee bios, sources, or links
- [ADD_PAGE](docs/skills/ADD_PAGE.md) — Add a new route to the App Router

## Reference Index

- [DEVELOPMENT](docs/reference/DEVELOPMENT.md) — Setup, commands, deploy, troubleshooting
- [ARCHITECTURE](docs/reference/ARCHITECTURE.md) — Routing, content model, SEO, i18n, forms, rendering
- [DESIGN_SYSTEM](docs/reference/DESIGN_SYSTEM.md) — Color tokens, typography, spacing, accessibility

## Development Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server on http://localhost:3000
npm run build      # Production build
npm run start      # Serve the production build
npm run lint       # Run ESLint
```

There is **no test suite** and **no `.env`** — the site needs no environment variables to run.

## Code Conventions

### Content-as-data (the most important rule)

All campaign copy lives as **typed data in `src/lib/`** — this is the "copy deck." Pages in
`src/app/` import that data and render it declaratively. **To change what the site says, edit the
data module, not the page markup.**

- `site.ts` — site identity (name, canonical URL, OG image). Single source of truth; changing the
  domain happens here.
- `links.ts` — `navLinks` (header/footer nav) and `externalLinks` (donate, volunteer, etc.).
- `project.ts` — Home + Plan body copy, exported as typed objects (`foundation`, `reasons`, `voice`,
  `whyNow`, `plan`, `finances`, `electionDay`).
- `faqs.ts` — FAQ entries (`q`, `a`, optional `bullets`, `footer`).
- `committee.ts` — committee member bios.
- `sources.ts` — footnotes cited by superscripts in the copy.
- `schema.ts` — JSON-LD builders that reuse the same content.

See [EDIT_CONTENT](docs/skills/EDIT_CONTENT.md).

### Components & rendering

- **Server Components by default.** Add `"use client"` only when a component needs interactivity
  (`project-carousel`, the nav menus, `language-switcher`, the contact/subscribe forms).
- **Import alias**: use `@/*` for `src/*` (e.g. `import { SITE } from "@/lib/site"`).
- Shared UI lives in `src/components/`; route-specific UI co-locates inside the route folder
  (e.g. `src/app/contact/contact-form.tsx`).
- Prefer **plain HTML + progressive enhancement**: the FAQ accordion is a `<details>/<summary>`
  element and works with JS disabled. Reach for client JS last.

### Styling

- **Tailwind v4 with design tokens.** Use semantic token classes (`bg-primary`, `text-foreground`,
  `border-border`, `bg-accent`), not raw hex or arbitrary colors. Tokens are defined as CSS variables
  in `src/app/globals.css` and exposed to Tailwind via `@theme inline`.
- Fonts are applied with the `font-sans` (Inter) and `font-display` (Montserrat) families.
- See [DESIGN_SYSTEM](docs/reference/DESIGN_SYSTEM.md).

### Accessibility (non-negotiable)

- Every page is reachable and operable without JavaScript where possible.
- Provide `aria-label` on icon-only controls; mark decorative elements `aria-hidden="true"`.
- Maintain the skip link, focus-visible outlines, and `prefers-reduced-motion` handling already in
  `globals.css`. Keep color choices at WCAG AA (the `accent` token is intentionally darkened for
  small-text contrast — see the comment in `globals.css`).

### SEO

- Page titles/descriptions go through the Next.js Metadata API (`metadata` export). The root layout
  sets defaults and the title template.
- Structured data is emitted via `<JsonLd>` using builders in `src/lib/schema.ts`. When adding a
  page that warrants structured data (e.g. an FAQ), reuse a builder rather than hand-writing JSON-LD.
- New routes must be added to `src/app/sitemap.ts`.

## Worktree Workflow — BLOCKING

**All code changes MUST be made in a feature worktree, never directly on `main`.** A pre-edit hook
enforces this: editing files in the primary checkout (on `main`) is blocked.

```bash
# 1. Create a worktree off the latest main
git worktree add ../pollard-now-<task> -b <type>/<description> origin/main

# 2. Do all edits in that worktree
cd ../pollard-now-<task>

# 3. After the PR merges, clean up
git worktree remove ../pollard-now-<task>
git worktree prune
```

Branch names use a `type/description` form, e.g. `redesign/favicon-menu`, `docs/readme-and-agents`.
The only work permitted directly on `main` is read-only exploration and worktree management.

## Critical Guardrails

### Always

- **Work in a feature worktree** (see above). Verify `git branch --show-current` is not `main`
  before editing.
- **Edit content in `src/lib/`**, not in page markup, when changing copy.
- **Use design tokens** for color/typography; keep contrast at WCAG AA.
- **Keep it accessible**: labels on interactive elements, decorative nodes `aria-hidden`, no
  keyboard traps, respect reduced motion.
- **Add new routes to `src/app/sitemap.ts`** and give them page-level `metadata`.
- **Run `npm run lint`** before opening a PR.

### Ask First

- New dependencies (the stack is intentionally minimal — Next + React + Tailwind only).
- Changing the canonical domain or any value in `src/lib/site.ts`.
- Wiring real delivery for the contact/subscribe forms (they currently validate only — see
  [ARCHITECTURE](docs/reference/ARCHITECTURE.md#forms)).
- Removing or restructuring a page (campaign stakeholders rely on specific URLs).

### Never

- Commit `.env*` files or secrets (the site needs none anyway).
- Introduce a database, CMS, or auth without explicit direction — content is intentionally static
  data.
- Use raw hex colors or arbitrary Tailwind values where a design token exists.
- Hardcode the production URL — derive links from `SITE.url` / `absUrl()` in `src/lib/site.ts`.
- Put personally identifiable form submissions anywhere without an approved, secure destination.

