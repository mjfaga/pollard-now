# Design System

The visual system is small and token-driven. Colors, and the font families, are defined once as
**CSS custom properties** in `src/app/globals.css` and exposed to Tailwind v4 through the
`@theme inline` block. Components reference **semantic token classes** (`bg-primary`,
`text-foreground`, `border-border`) — never raw hex values or arbitrary colors.

## Color tokens

Defined in `:root` in `globals.css` and available as Tailwind classes (`bg-*`, `text-*`,
`border-*`, `ring-*`).

| Token              | Value     | Role                                                        |
| ------------------ | --------- | ---------------------------------------------------------- |
| `background`       | `#f6f9fb` | Page background (light cool blue)                          |
| `surface`          | `#ffffff` | Cards / raised surfaces                                    |
| `surface-muted`    | `#e6eff4` | Subtle fills, hover backgrounds (light blue-gray)         |
| `foreground`       | `#15243a` | Primary text (deep navy)                                   |
| `foreground-muted` | `#4d5d72` | Secondary text                                             |
| `primary`          | `#1f4e5f` | Brand teal — primary buttons, headings, active nav         |
| `primary-hover`    | `#163842` | Primary hover state                                        |
| `primary-contrast` | `#ffffff` | Text/icons on primary backgrounds                          |
| `accent`           | `#c8861d` | Gold accent — highlights, markers (darkened for AA on text)|
| `accent-hover`     | `#8a5a0c` | Accent button hover / accent label text                    |
| `accent-soft`      | `#fbe9c4` | Soft gold wash — eyebrow labels, background orbs           |
| `border`           | `#d1dde6` | Default hairline borders                                   |
| `border-strong`    | `#a6bbc9` | Emphasized borders                                         |
| `ring`             | `#1f4e5f` | Focus-visible outline color                                |
| `danger`           | `#a3252d` | Errors / destructive                                       |
| `success`          | `#1f6f43` | Success states                                             |

**Contrast note:** `accent` and `accent-hover` were tuned to meet **WCAG AA (4.5:1)** for small
label text on light surfaces (see the comment in `globals.css`). Preserve that when adjusting the
palette.

To add or change a token, edit both the `:root` value and the matching `--color-*` mapping in
`@theme inline` so the Tailwind utility stays in sync.

## Typography

Two self-hosted families load via `next/font` in `app/layout.tsx` and are exposed as Tailwind
families:

| Family         | Font     | Tailwind class | Use                                    |
| -------------- | -------- | -------------- | -------------------------------------- |
| `--font-sans`  | Inter      | `font-sans`    | Body copy, UI, navigation (default)    |
| `--font-display` | Montserrat | `font-display` | Display headings, hero, section titles |

Montserrat is the campaign's collateral typeface (postcard + sign) — a geometric sans that
complements the wide "Pollard NOW" wordmark — and is used for display headings. Inter handles body
copy by default (set via `--font-sans`). Both are variable fonts loaded through `next/font/google`.

## Spacing & layout

- Content is centered in a `max-w-6xl` container with horizontal padding that steps up at the `md`
  breakpoint (`px-5` → `md:px-8`).
- Tailwind's default spacing scale is used throughout; there are no custom spacing tokens.
- The header is sticky (`sticky top-0`) with a translucent, blurred background.

## Iconography & decoration

- Inline SVGs are used for small icons (e.g. the FAQ +/- toggle). Mark them `aria-hidden="true"`.
- Decorative flourishes (blurred "orbs" using `accent-soft`, the hero underline using `accent`) are
  purely visual and must be `aria-hidden` / non-interactive.
- The favicon (`app/icon.svg`) is a navy badge with a white "O" + gold check, with a light/dark
  variant via an embedded `@media (prefers-color-scheme: dark)` block.

## Accessibility

These are built into `globals.css` and the components — keep them intact:

- **Skip link** (`.skip-link`) to `#main`.
- **Focus-visible** outlines on all interactive elements (`outline: 3px solid var(--ring)`).
- **Reduced motion**: animations/transitions collapse under `prefers-reduced-motion: reduce`.
- **Color contrast** at WCAG AA (see the contrast note above).
- Provide `aria-label` on icon-only controls and `aria-current` on the active nav item.

## Motion

Motion is minimal: hover color transitions, the carousel, and the nav. Anything new should be subtle
and must honor `prefers-reduced-motion`.
