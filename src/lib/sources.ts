// Footnotes / academic sources cited in the campaign copy. The `n`
// values match the superscript markers shown next to figures on the
// site (e.g. "$60 million¹"). Rendered as a "Sources & notes" list with
// matching anchor ids so the superscripts can link to them.
export type Source = {
  n: number;
  text: string;
};

export const sources: ReadonlyArray<Source> = [
  {
    n: 1,
    text: "Pollard Middle School Project Submission Documents — PDP Chapter 3.1.1.4: Capital Budget Statement (Page 16).",
  },
  {
    n: 2,
    text: "Pollard Middle School Project Submission Documents — PDP Module 3: Preliminary Design Program (Energy & Sustainability Section).",
  },
  {
    n: 3,
    text: 'Cellini, S. R., Ferreira, F., & Rothstein, J. (2010). “The Value of School Facility Investments: Evidence from a Dynamic Regression Discontinuity Design.” The Quarterly Journal of Economics.',
  },
  {
    n: 4,
    text: "Needham Public Schools FY27 Student Population Enrollment Memorandum (Presented to School Committee Dec. 16, 2025).",
  },
];

export function sourceAnchor(n: number): string {
  return `source-${n}`;
}
