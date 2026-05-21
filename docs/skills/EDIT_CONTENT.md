# Skill: Edit Content

**When to use:** changing any words on the site — headlines, body copy, FAQs, committee bios, cited
sources, navigation labels, or external links.

**Golden rule:** edit the **data** in `src/lib/`, not the page markup in `src/app/`. Pages render
the data; they rarely contain literal copy.

## Where each kind of content lives

| You want to change…                          | Edit this file        |
| -------------------------------------------- | --------------------- |
| Site name, tagline, canonical URL, OG image  | `src/lib/site.ts`     |
| Nav labels, donate/volunteer/external links  | `src/lib/links.ts`    |
| Home + Plan body copy (reasons, finances, …) | `src/lib/project.ts`  |
| FAQ questions & answers                       | `src/lib/faqs.ts`     |
| Committee member bios                         | `src/lib/committee.ts`|
| Footnotes / cited sources                    | `src/lib/sources.ts`  |
| Election day or other shared dates           | `src/lib/project.ts` (`electionDay`) |

## Steps

1. **Find the right module** from the table above and open it. Each export is plain typed data with
   comments indicating which page/section it feeds.
2. **Edit the strings.** Keep the existing object shape — TypeScript will flag a missing field.
   Preserve typographic punctuation (curly quotes `’ “ ”`, em dashes `—`) already used in the copy.
3. **Mind the cross-references:**
   - Footnote markers (e.g. a `note: 2` on a reason, or a superscript in copy) must point to an
     existing `n` in `src/lib/sources.ts`. Add the source there if you introduce a new citation.
   - Anything in `site.ts` ripples into metadata and JSON-LD — double-check the URL/OG image.
4. **Verify** with `npm run dev` and view the affected page at desktop and mobile widths. For FAQ
   changes, confirm the page still renders and the `FAQPage` structured data updates (it is built
   from the same `faqs` array).
5. `npm run lint` before committing.

## Examples

### Add an FAQ

In `src/lib/faqs.ts`, append to the `faqs` array (keep `id` unique):

```ts
{
  id: "tax-impact",
  q: "How will this affect my taxes?",
  a: "A debt exclusion temporarily raises taxes only to pay off this project…",
  // optional:
  bullets: [{ label: "Annual range", text: "$X–$Y for the median home" }],
  footer: "The increase ends once the bond is repaid.",
},
```

No page edit is needed — `/faq` and its JSON-LD both read from this array.

### Add a committee member

In `src/lib/committee.ts`, append to `committee`. Provide `image` as a path under `public/`
(e.g. `/images/committee/jane-doe.jpg`) or `null` to use the monogram fallback; set `initials`
either way.

### Change a link

Update the URL in `src/lib/links.ts` (`externalLinks` for donate/volunteer/etc., `navLinks` for the
header). Don't hardcode URLs in components.

## Don't

- Don't paste copy directly into JSX in `src/app/` — it belongs in `src/lib/`.
- Don't hardcode the production domain; derive it from `SITE.url` / `absUrl()`.
- Don't add a citation marker without a matching entry in `sources.ts`.
