# Development

## Prerequisites

- **Node.js 20+** (22 LTS recommended)
- **npm** (ships with Node) — the repo uses `package-lock.json`

No database or accounts are required, and the site runs with no environment variables — the
Cloudflare Turnstile keys are optional (see [Environment variables](#environment-variables)).

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

The site runs with **no environment variables** — every page works without configuration, and
`src/lib/site.ts` holds the canonical URL and site identity as plain constants (update the domain
there, e.g. when moving from `pollard-now.vercel.app` to a custom domain).

The **only** optional config is **Cloudflare Turnstile**, the spam check on the volunteer form
(`/volunteer`). Set **both** keys or **neither** — with neither set, the form falls back to its
honeypot only:

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | public (sent to the browser) | Renders the Turnstile widget |
| `TURNSTILE_SECRET_KEY` | server only — never commit | Verifies the token in the server action |

**Get keys:** in the Cloudflare dashboard → **Turnstile**, create a free widget and add the
production domain (plus `localhost` for dev). Cloudflare also publishes always-pass test keys for
local development.

**Local dev:** put them in `.env.local` (git-ignored via `.env*`):

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

**Production:** add both under Vercel → Project → **Settings → Environment Variables**, then
redeploy. The secret must never be committed (it is covered by `.gitignore`'s `.env*`).

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
