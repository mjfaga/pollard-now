// Frequently asked questions, verbatim from the campaign copy deck.
// Some answers carry a bulleted list (with optional bold lead-ins) and a
// closing note. Used to render the FAQ page and the FAQPage JSON-LD.
export type FaqBullet = {
  /** Optional bold lead-in, e.g. "Annual Range". */
  label?: string;
  text: string;
};

export type Faq = {
  id: string;
  q: string;
  /** Lead answer paragraph. */
  a: string;
  bullets?: FaqBullet[];
  /** Closing note shown after the bullets. */
  footer?: string;
};

export const faqs: ReadonlyArray<Faq> = [
  {
    id: "cost",
    q: "How much will the new school cost?",
    a: "Estimates in November 2025 were for a $336 million project; based on current programming available at Pollard, which generates the number of classrooms and size of classrooms required directly from the MSBA. The town is about to receive the next level of cost estimates now from the construction company in June 2026. Watch for updates here.",
  },
  {
    id: "comparison",
    q: "Is the cost higher than other schools of its kind?",
    a: "No. It is the lowest cost of the projects proposed for an 8/26/25 Project Scope and Budget agreement, to be signed by the town and the MSBA. It represents the maximum amount the project can be.",
  },
  {
    id: "operating-budget",
    q: "How does this compare to our annual operating budget? Could we fund from within?",
    a: "The entire Town of Needham Operating Budget for Fiscal Year 2026 is $235 million. Paying cash for the school would require cutting nearly one-third of the Town’s entire annual operating budget for 5 years.",
  },
  {
    id: "permanent",
    q: "Is this a permanent tax increase?",
    a: "No. This is a temporary Debt Exclusion. It is tied specifically to the Pollard loan. Once the loan is repaid, the tax increase goes away.",
  },
  {
    id: "tax-impact",
    q: "How much will my individual property taxes rise?",
    a: "Based on a $336 million estimate and current town analysis (including a conservative 7% interest rate), the impact is a temporary investment that declines over time.",
    bullets: [
      {
        label: "Annual Range",
        text: "For the average single-family home in Needham (valued at $1.54 million), the additional tax is projected to range from $46 to $2,367 per year.",
      },
      {
        label: "The “Peak” Year",
        text: "The impact is expected to hit its highest point of $2,367 in FY2034.",
      },
    ],
    footer:
      "As we receive updated estimates, we aim to publish a calculator so you may see the impact on your home specifically.",
  },
  {
    id: "auditorium",
    q: "Why is a new auditorium a priority and how does it benefit the town?",
    a: "Needham is lacking a right-sized, modern auditorium to serve the full community. The largest performance space is at Newman Elementary School and is undersized and overused; the new auditorium will be a revenue-generating asset for the whole community. See ACT for Needham for more information.",
    bullets: [
      {
        label: "Safety & Functionality",
        text: "We are replacing an outdated 434-seat space that lacks a backstage, dressing rooms and wings. Modernizing the facility eliminates hazardous exposed cabling and provides a safe “learning lab” for the 100% of Pollard students in performing arts.",
      },
      {
        label: "Solving the Town “Bottleneck”",
        text: "Currently, the Newman stage is the only viable option in town and is overbooked. A modern auditorium frees up space for high school performances, our vibrant local community theatre, and other groups.",
      },
      {
        label: "A New Revenue Stream",
        text: "An up-to-date venue allows Needham to rent to local performing arts organizations that currently go to other towns. This is projected to generate approximately $100 thousand annually to fund ongoing maintenance.",
      },
      {
        label: "A Community Hub",
        text: "Beyond school hours, the space serves every resident as a venue for school performances, town meetings, guest speakers, and local theater productions.",
      },
    ],
  },
  {
    id: "over-budget",
    q: "What happens if the project goes over budget?",
    a: "We’ve built in protection. The project uses a “Construction Manager at Risk” (CMR) model, which provides a Guaranteed Maximum Price. This shifts some of the risk of cost overruns from the taxpayers to the contractor. We also have a dedicated Town committee of experts (PPBC or Permanent Public Building Committee) overseeing every dollar to ensure fiscal accountability.",
  },
  {
    id: "seniors",
    q: "Will this tax increase price seniors or low-income residents out of Needham?",
    a: "We are committed to protecting our most vulnerable neighbors. The Town offers several tax relief and deferral programs specifically for seniors and those on fixed incomes.",
  },
  {
    id: "enrollment",
    q: "Why rebuild Pollard when enrollment is projected to decrease?",
    a: "This isn’t about more seats; it’s about better spaces. While enrollment is steady, our current classrooms are outdated and undersized. A new build allows us to move 6th grade back to Pollard, freeing up space at our crowded elementary schools. It will enable the entire Needham school system to work more efficiently for every student.",
  },
  {
    id: "vote-fails",
    q: "What happens if the vote fails?",
    a: "A failed local vote will likely result in the district having to submit a brand-new Statement of Interest to the Massachusetts School Board Association (MSBA) and await a new invitation to enter the program. We would not receive the state funding at this time, construction costs would continue to rise (4-6% annually), and we would still need to spend incremental dollars on the building for maintenance and emergency repairs if required.",
  },
];

// Flattened answer text (lead + bullets + footer) for FAQPage JSON-LD,
// which expects a single answer string per question.
export function faqAnswerText(faq: Faq): string {
  const parts = [faq.a];
  for (const b of faq.bullets ?? []) {
    parts.push(b.label ? `${b.label}: ${b.text}` : b.text);
  }
  if (faq.footer) parts.push(faq.footer);
  return parts.join(" ");
}
