# Development

## Prerequisites

- **Node.js 20+** (22 LTS recommended)
- **npm** (ships with Node) — the repo uses `package-lock.json`

No database or accounts are needed to run the site locally. The only environment variables are the
two Mailchimp keys that power the subscribe form (see [Environment variables](#environment-variables));
the rest of the site renders fine without them.

## Setup

```bash
git clone git@github.com:mjfaga/pollard-now.git
cd pollard-now
npm install
npm run dev
```

The site runs at `http://localhost:3000` with hot-reload. Edit any file under `src/` and the page
updates automatically.

## Commands

| Command         | Description                                              |
| --------------- | ------------------------------------------------------- |
| `npm run dev`   | Start the dev server on port 3000                       |
| `npm run build` | Production build (App Router, static-first output)       |
| `npm run start` | Serve the production build locally (run `build` first)  |
| `npm run lint`  | Run ESLint (`eslint-config-next`: web-vitals + TS rules) |

There is no test runner configured. Verify changes by running the dev server and checking the
affected pages (desktop + mobile widths), and by running `npm run lint`.

## Environment variables

The subscribe form delivers signups to Mailchimp via a server action, which needs two values:

| Variable                | Required for      | Notes                                                            |
| ----------------------- | ----------------- | --------------------------------------------------------------- |
| `MAILCHIMP_API_KEY`     | Subscribe form    | Secret. From Mailchimp → Account → Extras → API keys. Includes the datacenter suffix, e.g. `…-us4`. |
| `MAILCHIMP_AUDIENCE_ID` | Subscribe form    | The target audience/list id. "Pollard Now Committee 2026" = `301eaebfa2`. |

Copy `.env.example` to `.env.local` and fill in the key for local dev:

```bash
cp .env.example .env.local   # then paste your MAILCHIMP_API_KEY
```

`.env.local` is git-ignored — **never commit real secrets**. Without these set, the site still runs,
but submitting the subscribe form returns a friendly error instead of adding the contact. The
keys must also be added to the Vercel project (Preview + Production) for deployed environments.

Other configuration lives in `src/lib/site.ts` (canonical URL and site identity as plain constants);
update the domain there when moving to a custom domain.

## Project layout

```
src/app/        App Router routes, layout, global CSS, sitemap/robots
src/components/ Shared UI components
src/lib/        The content "copy deck" + site config (see ARCHITECTURE.md)
public/         Static assets (logos, committee headshots, carousel images)
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for how these fit together.

## Pre-commit / hooks

There are **no Husky or lint-staged hooks** in this repo. Run `npm run lint` manually before
committing. (Note: this working copy is governed by a worktree-enforcement hook — all edits must
happen in a feature worktree, not on `main`. See [AGENTS.md](../../AGENTS.md#worktree-workflow--blocking).)

## Working in worktrees

```bash
git worktree add ../pollard-now-<task> -b <type>/<description> origin/main
cd ../pollard-now-<task>
# ...make changes, commit, push, open PR...
# after merge:
git worktree remove ../pollard-now-<task> && git worktree prune
```

A fresh worktree has no `node_modules` (it is git-ignored). Run `npm install` in the worktree, or
symlink the primary checkout's `node_modules` for a quick spin-up.

## Deploying

Hosting is on **Vercel** (project `pollard-now`).

- **Production**: merging to `main` triggers a production deploy.
- **Previews**: every pull request gets its own preview URL.
- **Build command**: `npm run build` (Vercel default for Next.js). No build-time env vars required.
- **Runtime env vars**: set `MAILCHIMP_API_KEY` and `MAILCHIMP_AUDIENCE_ID` on the Vercel project
  (Preview + Production) so the subscribe form can deliver signups.

For local production parity:

```bash
npm run build
npm run start   # serves the build at http://localhost:3000
```

## Troubleshooting

| Symptom                                   | Fix                                                                         |
| ----------------------------------------- | -------------------------------------------------------------------------- |
| Port 3000 already in use                  | Stop the other process, or run `npm run dev -- -p 3001`.                    |
| Stale build / type errors after a pull    | Delete `.next/` and re-run `npm run dev`.                                   |
| New page returns 404                       | Confirm the folder has a `page.tsx` and the route is added to `sitemap.ts`. |
| Google Translate widget chrome appears    | The default widget is hidden via CSS in `globals.css`; our own switcher     |
|                                           | drives the hidden `<select>`. Don't remove those `.goog-*` rules.          |
| Fonts flash / wrong family                | Fonts load via `next/font`; ensure the `--font-*` variables stay on `<html>`. |
