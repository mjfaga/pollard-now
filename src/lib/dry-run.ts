// Local-only escape hatch for previewing the post-submit "thank you" panels
// without delivering anything (no Mailchimp subscriber, no Google Form POST).
//
// Set `FORMS_DRY_RUN=1` in `.env.local` and run `npm run dev`, then submit any
// form to see its success panel. Honored ONLY outside a production build, so a
// deployed site can never silently drop real submissions.
export const isFormsDryRun = () =>
  process.env.NODE_ENV !== "production" && process.env.FORMS_DRY_RUN === "1";
