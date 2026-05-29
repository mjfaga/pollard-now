import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/cta-button";
import {
  ProjectCarousel,
  type CarouselSlide,
} from "@/components/project-carousel";
import { externalLinks } from "@/lib/links";
import { electionDay, foundation, heroAside, reasons, voice } from "@/lib/project";
import { sources, sourceAnchor } from "@/lib/sources";
import logo from "../../public/images/pollard-now-logo-full.png";
import exteriorAerial from "../../public/images/carousel/exterior-aerial.png";
import siteDesign from "../../public/images/carousel/image.png";
import siteComparison from "../../public/images/carousel/site-comparison.png";
import siteCirculation from "../../public/images/carousel/site-circulation.png";
import siteSections from "../../public/images/carousel/site-sections.png";
import siteSectionParking from "../../public/images/carousel/site-section-parking.png";
import currentBackLot from "../../public/images/carousel/IMG_2599-scaled.jpg";
import currentFront from "../../public/images/carousel/IMG_2603-scaled.jpg";

const carouselSlides: CarouselSlide[] = [
  {
    src: exteriorAerial,
    alt: "Illustrated aerial view of the proposed new Pollard Middle School campus showing interconnected building wings with solar panels on rooftops, solar canopy-covered parking areas along Harris Ave and Stevens Road, athletic fields, and the surrounding Needham neighborhood with Defazio Park, Coulton Park, Glenwood Road, Mayo Ave, and Pinewood Road visible. The MBTA commuter rail line runs along the northern edge of the property.",
    title: "The new Pollard — aerial view",
    caption:
      "An illustrated bird’s-eye view of the proposed campus showing the building, solar-covered parking, fields, and its relationship to the surrounding neighborhood.",
  },
  {
    src: siteDesign,
    alt: "Annotated site design diagram for the new Pollard Middle School showing the proposed building, with callouts: supplementing existing planting along frontage, driveway aligned to Mayo Ave, parking trays with PV canopies, bus exit route on-site, covered bike parking near front door, relocated loading dock, reduced bus drive width, outdoor fitness stations, fields relocated to front of school with parking moved to edges, safe bike paths to covered bike parking, second parking lot access, high fencing around field, HP and van spaces near front door, minimizing existing tree removal and replanting with new. Vehicle capacity: 260 parked cars, 26 cars in queue, 19 buses, 5 vans.",
    title: "Site design — current progress",
    caption:
      "The proposed Pollard site with the building’s relationship to fields, parking, bike paths, the loading dock, and existing trees called out.",
  },
  {
    src: siteComparison,
    alt: "Side-by-side neighborhood maps comparing the existing Pollard Middle School site with the proposed new campus. Both maps show surrounding streets including Bradford St, Mayo Ave, Harris Ave, Stevens Rd, Glenwood Rd, Dedham Ave, Pinewood Rd, Eaton Rd, and Coulton Park. The existing map shows the current building footprint and parking. The proposed map shows the new, larger building footprint with reorganized parking and landscaping, fitting within the same property boundaries.",
    title: "Neighborhood context — existing vs. proposed",
    caption:
      "The current and proposed footprints overlaid on the surrounding neighborhood, showing how the new campus fits within the same site boundaries.",
  },
  {
    src: siteCirculation,
    alt: "Site circulation diagram for the proposed Pollard Middle School showing three color-coded traffic routes: orange for buses entering from Bradford St and looping through the bus drop-off area, blue for cars entering from Harris Ave through the parking tiers and car drop-off zone, and red dotted lines for pedestrians and bikes using paths around the perimeter and through the site. Primary, Secondary, and Cafeteria entrances are labeled. The legend lists: Buses, Cars, Pedestrians & Bikes.",
    title: "Site circulation — how traffic flows",
    caption:
      "Color-coded routes for buses (orange), cars (blue), and pedestrians & bikes (red) showing separated circulation through the site.",
  },
  {
    src: siteSections,
    alt: "Two architectural cross-section renderings of the proposed Pollard Middle School. Top: East-West Section showing the building profile from Paper Road through the transition area, bus drop-off, cafeteria, atrium, another transition area, to Coulton Park, with a small site key map. Bottom: North-South Section showing the profile from Harris Ave through the transition area, play fields, car drop-off, main entrance plaza descending through a 30-foot grade change to the cafeteria atrium and secondary entrance level, then the academic courtyard, to the MBTA right-of-way and Defazio Fields.",
    title: "Building cross-sections",
    caption:
      "East-west and north-south cross-sections revealing how the building steps down a 30-foot grade change from Harris Ave to the MBTA rail line.",
  },
  {
    src: siteSectionParking,
    alt: "Architectural cross-section rendering of the proposed Pollard Middle School at the parking area, viewed north-south. From left to right: Harris Ave with a vegetated buffer and transition area, a slope down to the west parking lot with alternate PV canopies over the parking tiers, the west entrance of the building, and continuing to the MBTA right-of-way. A small site key map in the upper right shows the section cut location.",
    title: "Parking cross-section",
    caption:
      "North-south section through the parking area showing the vegetated buffer along Harris Ave, sloped terrain, and solar canopy options over the parking tiers.",
  },
  {
    src: currentFront,
    alt: "Photograph of the current Pollard Middle School building from the front. A brick single-story building with a central tower, fronted by accessible ramps and railings. An American flag is on a pole at the left.",
    title: "Pollard today — the front",
    caption:
      "The current Pollard building, in service since 1969, has been studied, patched, and stretched past its useful life.",
  },
  {
    src: currentBackLot,
    alt: "Photograph of the back of the current Pollard Middle School. Modular trailer classrooms sit on a paved area behind the main building, fenced off, with a small set of red exterior steps leading up to each unit.",
    title: "Pollard today — the modular wing",
    caption:
      "Modular trailers behind the main building have stood in for classroom space the existing footprint can no longer absorb.",
  },
];

function FootnoteRef({ n }: { n: number }) {
  return (
    <sup className="ml-0.5">
      <a
        id={`fnref-${n}`}
        href={`#${sourceAnchor(n)}`}
        className="font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
        aria-label={`See source ${n}`}
      >
        {n}
      </a>
    </sup>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-gradient-to-b from-surface-muted via-background to-background"
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 right-[-12rem] -z-10 h-[420px] w-[420px] rounded-full bg-primary opacity-10 blur-3xl"
        />
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-8 md:pb-24 md:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              />
              Needham, Massachusetts
            </p>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl"
            >
              A Stronger Pollard.
              <br />
              <span className="underline decoration-accent decoration-[3px] underline-offset-8">
                A Stronger Needham.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
              An investment in our schools is an investment in our community. By
              replacing our aging and undersized, Pollard middle school with a
              modern, energy efficient building we protect our property values,
              open the potential for up to $60 million
              <FootnoteRef n={1} /> in state funding, and create a contemporary
              learning environment for our students and a resource for every
              resident.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="#your-voice" variant="primary">
                Vote YES in November
              </CtaLink>
              <CtaLink href="/volunteer" variant="secondary">
                Volunteer
              </CtaLink>
              <CtaLink href={externalLinks.donate} external variant="ghost">
                Donate
              </CtaLink>
            </div>

            <p className="mt-6 text-sm text-foreground-muted">
              Talk to your neighbors. Sign up for updates. Help.
            </p>
          </div>

          <aside
            aria-label="Key vote details"
            className="relative flex flex-col gap-6 rounded-3xl border border-border bg-surface p-7 shadow-sm md:p-8"
          >
            <div className="flex items-center gap-4">
              <Image
                src={logo}
                alt="Pollard Now"
                sizes="96px"
                className="h-16 w-auto rounded-lg shadow-sm"
              />
              <h2 className="font-display text-xl font-semibold text-foreground">
                The ask
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-foreground-muted">
              {heroAside.intro}
            </p>

            <div className="rounded-2xl bg-primary p-6 text-primary-contrast">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-soft">
                {electionDay.label}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold leading-tight">
                {electionDay.date}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                Vote <span className="font-semibold text-white">YES</span> on the
                debt exclusion to fund a new Pollard Middle School for grades
                6–8.
              </p>
            </div>

            <ul className="space-y-3">
              {heroAside.facts.map((fact) => (
                <li
                  key={fact.label}
                  className="flex gap-3 text-sm leading-relaxed text-foreground-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                  />
                  <span>
                    <span className="font-semibold text-foreground">
                      {fact.label}:
                    </span>{" "}
                    {fact.body}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto border-t border-border pt-4">
              <a
                href={externalLinks.projectPage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover"
              >
                Visit the official Pollard Middle School Project page
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Our Foundation */}
      <section
        aria-labelledby="foundation-heading"
        className="border-y border-border bg-surface"
      >
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
          <h2
            id="foundation-heading"
            className="text-sm font-semibold uppercase tracking-wider text-accent-hover"
          >
            Our Foundation
          </h2>
          <figure className="mt-5">
            <blockquote className="border-l-4 border-accent pl-5 font-display text-2xl font-medium leading-snug text-foreground md:text-3xl">
              “{foundation.quote}”
            </blockquote>
            <figcaption className="mt-3 pl-5 text-sm text-foreground-muted">
              — {foundation.attribution}
            </figcaption>
          </figure>
          <p className="mt-8 text-lg leading-relaxed text-foreground-muted">
            {foundation.body}
          </p>
        </div>
      </section>

      {/* 3 Reasons */}
      <section
        aria-labelledby="reasons-heading"
        className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-hover">
            Why Pollard matters to every resident
          </p>
          <h2
            id="reasons-heading"
            className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl"
          >
            Three reasons this matters — whether or not you have kids in school.
          </h2>
        </div>

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {reasons.map((r, i) => (
            <li
              key={r.label}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-lg font-semibold text-primary-contrast"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                {r.label}
              </h3>
              <p className="mt-2 leading-relaxed text-foreground-muted">
                {r.body}
                {r.note ? <FootnoteRef n={r.note} /> : null}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* The plan in pictures */}
      <section
        aria-labelledby="plans-heading"
        className="border-t border-border bg-surface-muted"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-hover">
                What’s being built — and what we have today
              </p>
              <h2
                id="plans-heading"
                className="mt-2 font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl"
              >
                The plan in pictures.
              </h2>
            </div>
            <p className="max-w-md text-foreground-muted">
              Site design, plan comparison, and photos of the building Needham
              has today.
            </p>
          </div>

          <div className="mt-8">
            <ProjectCarousel
              slides={carouselSlides}
              ariaLabel="Pollard project plans and current building photos"
            />
          </div>
          <p className="mt-4 text-sm text-foreground-muted">
            Full-resolution plans and ongoing updates live on the{" "}
            <a
              href={externalLinks.projectPage}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-primary-hover"
            >
              official Pollard Middle School Project page
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
            .
          </p>
        </div>
      </section>

      {/* Why Your Voice Matters Now */}
      <section
        id="your-voice"
        aria-labelledby="voice-heading"
        className="scroll-mt-24 bg-primary text-primary-contrast"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-soft">
              Why your voice matters now
            </p>
            <h2
              id="voice-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl"
            >
              The final step is a community-wide “Yes.”
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/85">
              {voice.intro.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </div>

          <p className="mt-10 text-sm font-semibold uppercase tracking-wider text-accent-soft">
            Here’s how we can win together
          </p>
          <ul className="mt-5 grid gap-5 md:grid-cols-3">
            {voice.ways.map((w) => (
              <li
                key={w.label}
                className="rounded-2xl bg-primary-hover/70 p-7 ring-1 ring-white/10"
              >
                <h3 className="font-display text-xl font-semibold">{w.label}</h3>
                <p className="mt-2 text-white/85">{w.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-foreground hover:bg-accent-hover hover:text-primary-contrast"
            >
              Volunteer
            </Link>
            <a
              href={externalLinks.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-primary hover:bg-white/90"
            >
              Donate
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
            >
              Get updates
            </Link>
          </div>
        </div>
      </section>

      {/* Official project page */}
      <section
        aria-labelledby="project-page-heading"
        className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20"
      >
        <div className="relative overflow-hidden rounded-3xl bg-[#162848] p-7 text-white md:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
          />
          <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12">
            <div className="flex items-center justify-center rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 md:p-8">
              <Image
                src={logo}
                alt="Pollard Now"
                sizes="(min-width: 768px) 240px, 180px"
                className="h-32 w-auto md:h-40"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-soft">
                From Needham Public Schools
              </p>
              <h2
                id="project-page-heading"
                className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl"
              >
                Plans, financials, and the latest updates — straight from the
                source.
              </h2>
              <p className="mt-4 max-w-2xl text-white/80">
                Plans, financial impact tables, meeting minutes, and the latest
                timeline updates from the Pollard Building Project.
              </p>
              <div className="mt-7">
                <a
                  href={externalLinks.projectPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-foreground hover:bg-accent-hover hover:text-primary-contrast"
                >
                  Open the project page
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sources & notes */}
      <section
        aria-labelledby="sources-heading"
        className="border-t border-border bg-surface-muted"
      >
        <div className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-14">
          <h2
            id="sources-heading"
            className="text-xs font-semibold uppercase tracking-wider text-foreground-muted"
          >
            Sources &amp; notes
          </h2>
          <ol className="mt-4 space-y-2 text-sm leading-relaxed text-foreground-muted">
            {sources.map((s) => (
              <li key={s.n} id={sourceAnchor(s.n)} className="scroll-mt-24">
                <span className="font-semibold text-foreground">{s.n}.</span>{" "}
                {s.text}{" "}
                <a
                  href={`#fnref-${s.n}`}
                  className="font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
                  aria-label={`Back to reference ${s.n}`}
                >
                  ↩
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
