// Volunteer page copy + field definitions (the "copy deck" for /volunteer).
//
// Submissions are forwarded to the campaign's existing Google Form so responses
// keep landing in the same spreadsheet (see src/app/volunteer/actions.ts).
// IMPORTANT: the `label` strings for the interest checkboxes below are sent
// verbatim to Google as the selected option values — they MUST match the
// options defined in that form exactly, or the selection won't be recorded.

export const volunteerIntro = {
  eyebrow: "Get involved",
  title: "Volunteer with Pollard Now",
  description:
    "Pollard will be the biggest project our town has ever taken on, and we'd love your help making it a success. Tell us how you'd like to pitch in — it takes a minute, and your answers help us match you with the right opportunities between now and the vote in November.",
  formHeading: "Volunteer sign-up",
  formNote:
    "Every bit helps — from a conversation at the bus stop, to handing out information at community events, to holding a sign on Election Day.",
} as const;

export const volunteerInterestsHeading =
  "Let us know what works for you — check everything you might be interested in:";

export const volunteerInterests = [
  {
    name: "interestLearnMore",
    label:
      "I am interested in learning more and joining meetings to see how I can best support this effort",
  },
  {
    name: "interestHostGathering",
    label: "I would like to host a gathering at my home about the project",
  },
  {
    name: "interestEventsCommittee",
    label:
      "I would like to join the community events committee and represent Pollard Now at local Needham events",
  },
  {
    name: "interestCanvassing",
    label:
      "I would like to learn more about election canvassing (door knocking, meet my neighbors, hold signs)",
  },
  {
    name: "interestYardSign",
    label: "I would like to host a yardsign",
  },
  {
    name: "interestEndorsement",
    label:
      "I would like to share an endorsement for this project to be featured on the website",
  },
  {
    name: "interestFundraising",
    label: "I would like to help with fundraising efforts for the campaign",
  },
  {
    name: "interestEmailNetwork",
    label: "I would like to email my Needham network in support of Pollard",
  },
] as const;

export const volunteerSkills = {
  legend:
    "Do you have any specific skills you could offer to help us? For example, marketing, social media, or fundraising.",
  options: ["Yes", "No"],
} as const;

export const volunteerIdeas = {
  label:
    "Share any ideas you have to help us get the word out and engage with the community!",
} as const;
