"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export type CarouselSlide = {
  src: StaticImageData;
  alt: string;
  title: string;
  caption: string;
};

type Props = {
  slides: CarouselSlide[];
  ariaLabel: string;
};

export function ProjectCarousel({ slides, ariaLabel }: Props) {
  const [active, setActive] = useState(0);
  const regionId = useId();
  const liveId = useId();
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  const goTo = useCallback(
    (i: number) => {
      const next = (i + slides.length) % slides.length;
      setActive(next);
    },
    [slides.length],
  );

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(active - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(slides.length - 1);
      }
    },
    [active, goTo, slides.length],
  );

  useEffect(() => {
    slideRefs.current[active]?.focus({ preventScroll: true });
  }, [active]);

  const slide = slides[active];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className="rounded-2xl border border-border bg-surface shadow-sm"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl bg-foreground/5">
        {slides.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            id={`${regionId}-slide-${i}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${s.title}`}
            aria-hidden={i !== active}
            tabIndex={i === active ? 0 : -1}
            onKeyDown={onKey}
            className={`absolute inset-0 transition-opacity duration-300 ${
              i === active
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-contain"
              placeholder="blur"
            />
          </div>
        ))}

        <button
          type="button"
          aria-label="Previous slide"
          aria-controls={regionId}
          onClick={() => goTo(active - 1)}
          className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-background/90 text-foreground shadow-md backdrop-blur transition-colors hover:bg-background"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          aria-controls={regionId}
          onClick={() => goTo(active + 1)}
          className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-background/90 text-foreground shadow-md backdrop-blur transition-colors hover:bg-background"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      <div
        id={regionId}
        className="flex flex-col gap-4 border-t border-border bg-surface-muted px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7"
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
            Slide {active + 1} of {slides.length}
          </p>
          <h3
            id={liveId}
            aria-live="polite"
            className="mt-1 font-display text-lg font-semibold text-foreground"
          >
            {slide.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-foreground-muted">
            {slide.caption}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Choose slide"
          className="flex flex-wrap gap-2"
        >
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`${regionId}-slide-${i}`}
              onClick={() => goTo(i)}
              className={`inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full px-3 text-xs font-semibold transition-colors ${
                i === active
                  ? "bg-primary text-primary-contrast"
                  : "bg-background text-foreground hover:bg-surface"
              }`}
            >
              <span className="sr-only">Show slide {i + 1}: </span>
              <span aria-hidden="true">{i + 1}</span>
              <span className="sr-only">{s.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
