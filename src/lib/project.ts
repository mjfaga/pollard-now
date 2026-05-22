// Campaign content from the website copy deck. Kept as data so pages
// stay declarative and the same copy can be reused across the site and
// in structured-data (schema) output.

export type Pillar = {
  /** Bold lead-in shown before the body, e.g. "A Community Asset". */
  label: string;
  body: string;
};

// HOME — "Our Foundation"
export const foundation = {
  quote:
    "The very foundation of our town was built on the commitment to educate our children, recognizing that a strong school system is the heartbeat of a thriving community.",
  attribution:
    "Adapted from the 1711 Petition for the Incorporation of Needham",
  body: "We are replacing a 70-year old school into a facility designed for the next century. By moving forward now, we can leverage a state partnership with the Massachusetts School Building Authority (MSBA) to build an energy efficient school that meets the needs of students and benefits our entire town—all while maintaining smart fiscal responsibility.",
};

// HOME — "3 Reasons Why Pollard Matters to Every Resident". `note`
// values reference the footnotes in lib/sources.ts.
export const reasons: ReadonlyArray<Pillar & { note?: number }> = [
  {
    label: "A Resource for the Entire Community",
    body: "The new Pollard is more than a school—it’s a civic hub. Right sized and modernized performance spaces, gymnasiums, and sporting fields will be available for all Needham residents. Additionally, the energy efficient design is projected to save the town $122 thousand annually in energy costs, keeping our operating budget focused on services, not utilities.",
    note: 2,
  },
  {
    label: "Protecting Your Home Equity",
    body: "A town is only as desirable as its schools. Research shows that every $1 invested in school infrastructure can increase local property values by as much as $1.50. Whether you have children in the system or not, a modern Pollard ensures a consistent pipeline of homebuyers and protects the resale value of your home.",
    note: 3,
  },
  {
    label: "Securing Up to $60M in State Funding",
    body: "Through our partnership with the MSBA, Needham has a window to receive up to $60 million in state grants which will directly lower the total amount the town will need to borrow to build the school. A ‘no’ vote in November would likely start a multi-year application process with no guarantee of future funding, resulting in higher costs of construction later.",
  },
];

// HOME — "Why Your Voice Matters Now"
export const voice = {
  intro: [
    "We have an incredible opportunity to shape the future of Needham, and we want you to be a part of it! While our town has been accepted in to the MSBA program to partner together for a new Pollard, the final step to cross the finish line is a community-wide “Yes” vote on Tuesday, November 3, 2026.",
    "Because this local vote happens during the federal election, your help is the most important way of ensuring every neighbor remembers to look for Pollard on their ballot. We are a small team of four neighbors fueled by community spirit, and we’d love for you to join the momentum!",
  ],
  ways: [
    {
      label: "Lend Your Time",
      body: "Help us share the excitement through community outreach.",
    },
    {
      label: "Lend Your Voice",
      body: "Remind your friends and neighbors to show up and vote local this November.",
    },
    {
      label: "Lend Your Support",
      body: "Every donation—large or small—helps us provide the lawn signs and mailers that keep our community informed and inspired.",
    },
  ],
};

// THE PROJECT (about) — "Why Now?"
export const whyNow = {
  headline: "The Key to Needham’s Future",
  intro:
    'Building on the 2020 School Master Plan, the new Pollard is the strategic "first move" that unlocks benefits for students across the entire district.',
  points: [
    {
      label: 'Avoids the "Inflation Trap"',
      body: "Each year we wait to begin the project inflation and escalating construction costs add millions of dollars to the cost.",
    },
    {
      label: "Captures State Funding Now",
      body: "Opportunity to partner with the (MSBA) to potentially receive back as much as 20% of the eligible costs of design and construction.",
    },
    {
      label: "Fixes Urgent Problems",
      body: "A modern facility replaces outdated 1956 infrastructure, including outdated electrical, plumbing, and climate control with a building that meets building codes, universal accessibility and our current educational programming needs.",
    },
    {
      label: "Prevents Costly Repairs",
      body: "A new facility eliminates the need for expensive maintenance on aging systems and 20-year-old modular classrooms that have outlived their purpose; all while significantly reducing ongoing operating costs.",
    },
  ] satisfies Pillar[],
};

// THE PROJECT (about) — "The Plan (A Modern Pollard)"
export const plan = {
  headline: "A Building Designed for the Whole Community.",
  intro:
    "The new Pollard isn’t just a building; it is a generational investment in Needham’s future.",
  points: [
    {
      label: "A Community Asset",
      body: "More than just a school—modernized, right sized performance spaces, gymnasium and sporting fields will be a resource for every Needham resident.",
    },
    {
      label: "Designed for All",
      body: "The new building will meet modern building codes, featuring energy-efficient climate control, advanced safety systems, and full accessibility for every resident.",
    },
    {
      label: "Curriculum-Ready",
      body: "New, appropriately sized classrooms and modern science labs allow for the hands-on experiments and projects that are critical to our students’ learning.",
    },
    {
      label: "Makes District-Wide Progress",
      body: 'Completing Pollard is the fastest and cheapest way to then address needs at High Rock and Mitchell, providing a seamless "swing space" solution for future projects.',
    },
  ] satisfies Pillar[],
};

// THE PROJECT (about) — "The Finances (Debt Exclusion Explained)"
export const finances = {
  headline: "Smart Investing. Long Term Value.",
  intro:
    "A Debt Exclusion is a transparent, project-specific funding tool designed for major civic assets. It allows a town to raise taxes outside the limits of Massachusetts Proposition 2½ only for the amount required to pay the annual principal and interest on the debt for a specific project.",
  points: [
    {
      label: "Required by Law",
      body: "Massachusetts law (Proposition 2½) strictly limits how much a town can raise in taxes each year.",
    },
    {
      label: "Earmarked for Pollard",
      body: "Every dollar is legally restricted to the school project and cannot be diverted to other town spending.",
    },
    {
      label: "Temporary by Design",
      body: 'Unlike an operating override, this tax increase has an expiration date. Once the building is paid for, the tax "falls off" your bill.',
    },
    {
      label: "Fiscally Responsible",
      body: "We borrow at low municipal bond rates, thanks to the town’s excellent AAA rating and pay it back over time, effectively “locking in” today’s construction prices while spreading the cost across the generations who will use the school.",
    },
  ] satisfies Pillar[],
};

// THE PROJECT (about) — "Why Now?" inflation visual. Figures come from
// the Massachusetts School Building Authority's published cost data for
// new school construction ($/sq ft). The endpoints are MSBA's reported
// figures — about $440/sq ft in 2019 climbing to roughly $698/sq ft by
// the end of 2023, a ~59% rise over five years. The chart draws a trend
// curve between those anchors (it does not assert exact intermediate
// years).
export const constructionCost = {
  eyebrow: "The cost of waiting",
  stat: "+59%",
  statCaption:
    "rise in Massachusetts new-school construction cost per square foot over five years",
  blurb:
    "Each year of delay locks in higher construction costs — pushing the project’s price up by millions before a shovel hits the ground.",
  unit: "/sq ft",
  start: { year: "2019", value: 440 },
  end: { year: "2023", value: 698 },
  sourceLabel: "Massachusetts School Building Authority cost data",
};

// HOME — hero "The ask" card supporting facts shown beneath the Election
// Day box. Truncated versions of the four "Why Now" points on the Plan
// page (see `whyNow.points`) — keep the two in sync.
export const heroAside = {
  intro: "Here’s what’s on the ballot this November — and why it matters.",
  facts: [
    {
      label: "Beat the Inflation Trap",
      body: "Delaying construction adds millions in costs every year.",
    },
    {
      label: "Secure State Funding",
      body: "Opportunity to receive state funding for up to 20% of the project.",
    },
    {
      label: "Replace 1956 Infrastructure",
      body: "Swaps failing electrical, plumbing, and HVAC for modern, up-to-code systems.",
    },
    {
      label: "End Costly Emergency Repairs",
      body: "Eliminates expensive maintenance on obsolete systems and old trailers.",
    },
  ] satisfies Pillar[],
};

// Key date used across the site.
export const electionDay = {
  label: "Election Day",
  date: "Tuesday, November 3, 2026",
};
