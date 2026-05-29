// The four neighbors who make up the Pollard Now committee. Bios are
// verbatim from the campaign copy deck. `image` is a path under
// /public; members without a headshot fall back to a monogram avatar.
export type CommitteeMember = {
  id: string;
  name: string;
  role: string;
  image: string | null;
  /** Initials used for the monogram fallback when there is no headshot. */
  initials: string;
  paragraphs: string[];
};

export const committee: ReadonlyArray<CommitteeMember> = [
  {
    id: "meghan-small",
    name: "Meghan Small",
    role: "Chair",
    image: "/images/committee/meghan-small.jpg",
    initials: "MS",
    paragraphs: [
      "I moved to Needham specifically for its reputation as a world-class community to raise a family, and seeing my two boys thrive at Newman has only deepened that commitment. While I am constantly impressed by the innovative programs our middle school teachers provide, I believe the time has come to provide them with a facility that matches their excellence.",
      "In my almost ten years as a resident, I’ve worked to give back to the institutions that make Needham special. As a current Trustee of the Needham Free Public Library and a newly elected Town Meeting Member, I have seen firsthand how careful planning leads to success. Most notably, I helped oversee the design and execution of the library’s new teen space, which we completed under budget without touching contingency funds. As a trained lawyer and Chair of PollardNow, I am excited to apply that same fiscal discipline and advocacy to ensure we secure a modern, efficient Pollard for the next generation.",
    ],
  },
  {
    id: "kate-linzmeyer",
    name: "Kate Linzmeyer",
    role: "Reach",
    image: "/images/committee/kate-linzmeyer.jpg",
    initials: "KL",
    paragraphs: [
      "Our family’s journey in Needham began in 2017 when we opened Reveler Beverage Co. on Chestnut Street. What started as a business venture quickly became a home; by 2018, we moved from the city to become full-time residents. Eight years later, we love the “walkable” life Needham offers—whether it’s scooting with our three kids (ages 10, 7, and 3) to school, commuting via the train, or greeting neighbors at the shop.",
      "In 2023, I joined Town Meeting to deepen my civic roots. Now, as a member of this committee, I’m combining my 20+ years in advertising and marketing with my passion for our public schools. I’m excited to build spaces where our community can gather, learn, and work together to secure a strong future for Pollard. This is, without a doubt, my most important campaign to date!",
    ],
  },
  {
    id: "stefanie-forman",
    name: "Stefanie Forman",
    role: "Field",
    image: null,
    initials: "SF",
    paragraphs: [
      "I have always believed that a community is only as strong as its schools. Since moving to Needham in 2018, I’ve dedicated my time to supporting our town’s youngest residents—whether as the Newman PTC President, a coach for youth softball and soccer, or leading our local Girl Scout troop. With three young children of my own, I am deeply invested in ensuring our schools continue to be a place where every child can thrive.",
      "My work as Vice Chair for Citizens for Needham Schools and as a Town Meeting Member for Precinct E has allowed me to connect with neighbors across the town. As the Field Lead and Treasurer for PollardNow, I am excited to take those conversations to you. I look forward to meeting even more of you as we advocate for this vital investment in our community’s future.",
    ],
  },
  {
    id: "dana-brown-malcolm",
    name: "Dana Brown Malcolm",
    role: "Communications",
    image: "/images/committee/dana-brown-malcolm.jpg",
    initials: "DM",
    paragraphs: [
      "My husband and I moved to Needham for its reputation, but we stayed for its heart. We chose this town to find a school system that could support our son, Henry, and his specific needs as a student with autism. After seeing him thrive at Newman and now at Pollard, I am more committed than ever to ensuring that every student and teacher—especially those in our vital Special Education programs—has the modern, accessible space they deserve.",
      "Beyond the schools, we’ve fallen in love with Needham’s 300-year charm and the deep community ties we’ve made here. While this is my first time volunteering for the town, I am thrilled to lend my 20+ years of marketing and business leadership to the PollardNow mission. This isn’t just about a building; it’s about ensuring our town’s resources match the strength of our community.",
    ],
  },
];
