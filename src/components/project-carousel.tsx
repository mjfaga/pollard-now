"use client";

import Image, { type StaticImageData } from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const regionId = useId();
  const liveId = useId();
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

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
      } else if (e.key === "Enter" || e.key === " ") {
        if ((e.target as HTMLElement).dataset.role === "open-lightbox") {
          e.preventDefault();
          openLightbox(e.currentTarget as HTMLElement);
        }
      }
    },
    [active, goTo, slides.length],
  );

  useEffect(() => {
    slideRefs.current[active]?.focus({ preventScroll: true });
  }, [active]);

  // Sync native <dialog> with our open state.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (lightboxOpen && !dlg.open) {
      dlg.showModal();
    } else if (!lightboxOpen && dlg.open) {
      dlg.close();
    }
  }, [lightboxOpen]);

  // Keyboard handling inside the lightbox: arrows advance, Escape closes
  // (already free with <dialog>'s default behavior).
  useEffect(() => {
    if (!lightboxOpen) return;
    const onLightboxKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(active - 1);
      }
    };
    window.addEventListener("keydown", onLightboxKey);
    return () => window.removeEventListener("keydown", onLightboxKey);
  }, [lightboxOpen, active, goTo]);

  function openLightbox(trigger?: HTMLElement) {
    if (trigger) lastTriggerRef.current = trigger;
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
    // Return focus to the element that opened the lightbox.
    lastTriggerRef.current?.focus({ preventScroll: true });
  }

  const slide = slides[active];

  return (
    <>
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
              <button
                type="button"
                data-role="open-lightbox"
                aria-label={`View ${s.title} full screen`}
                onClick={(e) => openLightbox(e.currentTarget)}
                className="group absolute inset-0 block h-full w-full cursor-zoom-in"
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
                <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-foreground/85 px-3 py-1.5 text-xs font-semibold text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M9 21H3v-6" />
                    <path d="M21 3l-7 7" />
                    <path d="M3 21l7-7" />
                  </svg>
                  Expand
                </span>
              </button>
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

      <dialog
        ref={dialogRef}
        aria-label={`${slide.title} — slide ${active + 1} of ${slides.length}`}
        onClose={() => setLightboxOpen(false)}
        onClick={(e) => {
          // Click on backdrop (the dialog element itself) closes;
          // clicks on inner content shouldn't.
          if (e.target === e.currentTarget) closeLightbox();
        }}
        className="m-0 h-screen max-h-none w-screen max-w-none bg-foreground/95 p-0 text-background backdrop:bg-foreground/80"
      >
        <div
          className="flex h-full w-full flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-background/70">
                Slide {active + 1} of {slides.length}
              </p>
              <h2 className="mt-0.5 truncate font-display text-lg font-semibold">
                {slide.title}
              </h2>
            </div>
            <button
              type="button"
              autoFocus
              onClick={closeLightbox}
              aria-label="Close full-screen view"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/15 text-background hover:bg-background/25"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </header>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-4 md:px-12">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => goTo(active - 1)}
              className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/15 text-background hover:bg-background/25 md:left-6"
            >
              <svg
                width="22"
                height="22"
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
            <div className="relative h-full w-full max-w-6xl">
              <Image
                key={active}
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => goTo(active + 1)}
              className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/15 text-background hover:bg-background/25 md:right-6"
            >
              <svg
                width="22"
                height="22"
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

          <footer className="border-t border-background/15 bg-foreground px-4 py-4 md:px-6">
            <p className="mx-auto max-w-4xl text-sm leading-relaxed text-background/85">
              {slide.caption}
            </p>
          </footer>
        </div>
      </dialog>
    </>
  );
}
