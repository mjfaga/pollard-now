# Pollard Now

A community campaign website supporting the **debt exclusion override to build a new Pollard Middle
School** (grades 6–8) in Needham, Massachusetts. Built and maintained by a small group of neighbors
to explain the project, lay out the finances, and rally a "Yes" vote on **Tuesday, November 3,
2026**.

The site is a fast, static-first marketing site: a handful of editorial pages driven by a typed
"copy deck" of content, with full SEO/structured-data, on-page translation, and accessible,
no-framework-required interactions.

## Architecture at a glance

| Layer     | Technology                       | Purpose                                            |
| --------- | -------------------------------- | -------------------------------------------------- |
| Framework | Next.js 16 (App Router)          | Server-rendered, static-first pages with React 19  |
| Language  | TypeScript 5 (strict)            | Type safety across content + components            |
| Styling   | Tailwind CSS v4 + CSS variables  | Utility classes themed by design tokens            |
| Fonts     | `next/font` — Geist + Fraunces   | Body sans + display serif, self-hosted             |
| Content   | Typed modules in `src/lib/`      | The campaign "copy deck" as data                   |
| SEO       | Metadata API + JSON-LD + sitemap | Rich previews, structured data, crawl hints        |
| i18n      | Google Translate widget          | On-demand page translation (10 languages)          |
| Hosting   | Vercel                           | Edge network, preview deploys                       |
| Linting   | ESLint 9 (`eslint-config-next`)  | Core Web Vitals + TypeScript rules                 |

### Content-as-data

There is **no CMS and no database**. All campaign copy lives as typed data in `src/lib/` (the copy
deck), and pages render it declaratively. To change what the site says, you edit a `.ts` file in
`src/lib/` — not the page markup. See [Editing content](docs/skills/EDIT_CONTENT.md).

## Quick start

```bash
# Prerequisites: Node.js 20+ (22 LTS recommended)

# Clone and install
git clone git@github.com:mjfaga/pollard-now.git
cd pollard-now
npm install

# Run the dev server
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000). **No environment variables are
required** to run locally. Edit any file under `src/` and the page hot-reloads.

## Commands

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server (port 3000) |
| `npm run build` | Production build                 |
| `npm run start` | Serve the production build       |
| `npm run lint`  | Run ESLint                       |

## Project structure

```
src/
├── app/                    # App Router — one folder per route
│   ├── page.tsx            # Home (/)
│   ├── plan/               # The Plan (/plan)
│   ├── committee/          # Committee (/committee)
│   ├── faq/                # FAQ (/faq) — static <details> accordion
│   ├── contact/            # Contact (/contact) — forms + server actions
│   ├── layout.tsx          # Root layout: fonts, metadata, header/footer, i18n
│   ├── globals.css         # Tailwind import + design tokens (CSS variables)
│   ├── icon.svg            # Favicon (light/dark via prefers-color-scheme)
│   ├── sitemap.ts          # Generated sitemap.xml
│   ├── robots.ts           # Generated robots.txt
│   └── not-found.tsx       # 404 page
├── components/             # Shared UI (header, footer, nav, carousel, CTAs)
└── lib/                    # The copy deck + site config (content-as-data)
    ├── site.ts             # Site identity (name, URL, OG image) — single source of truth
    ├── links.ts            # Nav links + external links (donate, volunteer)
    ├── project.ts          # Home + Plan body copy (reasons, finances, plan, etc.)
    ├── faqs.ts             # FAQ questions/answers
    ├── committee.ts        # Committee member bios
    ├── sources.ts          # Footnotes / cited sources
    └── schema.ts           # JSON-LD builders (Organization, WebSite, FAQPage)
```

## Documentation

| Doc                                              | Description                                         |
| ------------------------------------------------ | --------------------------------------------------- |
| [AGENTS.md](AGENTS.md)                           | Conventions, guardrails, and indexes for AI agents  |
| [Development](docs/reference/DEVELOPMENT.md)     | Setup, commands, deploy, troubleshooting            |
| [Architecture](docs/reference/ARCHITECTURE.md)   | Routing, content model, SEO, i18n, forms, rendering |
| [Design System](docs/reference/DESIGN_SYSTEM.md) | Color tokens, typography, spacing, accessibility    |

### Task playbooks

| Playbook                                    | When to use                                 |
| ------------------------------------------- | ------------------------------------------- |
| [Edit content](docs/skills/EDIT_CONTENT.md) | Change copy, FAQs, committee bios, or links |
| [Add a page](docs/skills/ADD_PAGE.md)       | Add a new route to the site                 |

## Deploying

The site is hosted on **Vercel** (`pollard-now` project). Pushing to `main` ships to production;
every pull request gets a preview deployment. See
[Development](docs/reference/DEVELOPMENT.md#deploying).
