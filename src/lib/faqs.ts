export type Faq = {
  id: string;
  q: string;
  a: string;
};

// Defaults shipped with the site. Used for the initial render, the
// FAQPage JSON-LD schema, and as the "Reset to default" target in the
// in-browser editor.
export const defaultFaqs: ReadonlyArray<Faq> = [
  {
    id: "ask",
    q: "What is Pollard Now asking me to do?",
    a: "Support passage of the debt exclusion override in Needham to fund a new Pollard Middle School for grades 6–8. That means voting on the override when it appears on the ballot — and, if you can, helping us reach neighbors with accurate information before then.",
  },
  {
    id: "override",
    q: "What is a debt exclusion override?",
    a: "A debt exclusion is the way Massachusetts cities and towns vote to fund a specific capital project — like a new school — outside the normal Proposition 2½ limits on property tax growth. It is tied to one project. When the borrowing for that project is paid off, the temporary tax increase ends.",
  },
  {
    id: "new-build",
    q: "Why a new building instead of renovating Pollard?",
    a: "The current building has been studied, patched, and stretched well past its useful life. A new build is the option that delivers modern learning space, long-term operating savings, and a building that can serve Needham for decades. The Needham Public Schools project page has the full feasibility analysis.",
  },
  {
    id: "non-parents",
    q: "How does this benefit residents who don’t have middle schoolers?",
    a: "Strong public schools are one of the biggest reasons families choose Needham — and that protects home values across the whole community. A modern, energy-efficient building also lowers long-term operating costs and creates space the town can use beyond the school day, for athletics, the arts, and community events.",
  },
  {
    id: "schedule",
    q: "When would construction happen?",
    a: "Schedule and phasing are managed by Needham Public Schools and the town. The most current timeline lives on the official Pollard Building Project page — please use that as the source of truth.",
  },
  {
    id: "cost",
    q: "How much will it cost the average household?",
    a: "Cost estimates depend on the final scope, financing terms, and your assessed property value. The Needham Public Schools project page publishes the most recent figures and impact tables — we link to it below.",
  },
  {
    id: "documents",
    q: "Where do I find the official project documents?",
    a: "The Needham Public Schools Pollard Building Project page is the authoritative source for plans, financial projections, meeting minutes, and timeline updates.",
  },
  {
    id: "help",
    q: "I’d like to help. What can I do?",
    a: "Three high-leverage things: (1) talk to your neighbors, (2) sign up for our email updates so you have facts and dates handy, and (3) donate or volunteer to help us reach every household in town.",
  },
];

export const FAQ_STORAGE_KEY = "pollardnow:faqs:v1";
