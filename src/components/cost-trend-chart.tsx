import { externalLinks } from "@/lib/links";
import { constructionCost } from "@/lib/project";

// A pared-back, stylized visual of rising school-construction costs, shown
// under "Why Now". Server component, no client JS. The SVG curve is purely
// decorative (aria-hidden); every figure it depicts is also rendered as
// real text so the chart is fully accessible.
export function CostTrendChart() {
  const { eyebrow, stat, statCaption, blurb, unit, start, end, sourceLabel } =
    constructionCost;

  // SVG geometry. A smooth, accelerating curve from the 2019 anchor to the
  // 2023 anchor — a trend line, not per-year data.
  const W = 560;
  const H = 200;
  const pad = 14;
  const plotW = W - pad * 2;
  const plotH = H - pad * 2;
  const yMax = 760; // headroom above the 2023 figure
  const y = (v: number) => pad + plotH * (1 - v / yMax);
  const x0 = pad;
  const x1 = pad + plotW;
  const ys = y(start.value);
  const ye = y(end.value);
  const baseline = pad + plotH;
  const line = `M ${x0} ${ys} C ${x0 + plotW * 0.42} ${y(start.value + 14)} ${
    x0 + plotW * 0.72
  } ${y(start.value + 92)} ${x1} ${ye}`;
  const area = `${line} L ${x1} ${baseline} L ${x0} ${baseline} Z`;

  return (
    <figure className="mt-10 rounded-3xl border border-border bg-surface p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-[minmax(0,16rem)_1fr] md:items-center md:gap-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-hover">
            {eyebrow}
          </p>
          <p className="mt-3 font-display text-5xl font-bold leading-none text-primary md:text-6xl">
            {stat}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
            {statCaption}
          </p>
        </div>

        <div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="cost-fill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-accent)"
                  stopOpacity="0.26"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-accent)"
                  stopOpacity="0.02"
                />
              </linearGradient>
            </defs>
            <line
              x1={x0}
              y1={baseline}
              x2={x1}
              y2={baseline}
              stroke="var(--color-border)"
              strokeWidth="1.5"
            />
            <path d={area} fill="url(#cost-fill)" />
            <path
              d={line}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx={x0} cy={ys} r="5" className="fill-accent" />
            <circle cx={x1} cy={ye} r="6.5" className="fill-accent" />
          </svg>
          <div className="mt-3 flex items-center justify-between text-sm text-foreground-muted">
            <span>
              <span className="font-semibold text-foreground">{start.year}</span>{" "}
              ≈ ${start.value}
              {unit}
            </span>
            <span aria-hidden="true" className="text-accent">
              ⟶
            </span>
            <span>
              <span className="font-semibold text-foreground">{end.year}</span> ≈
              ${end.value}
              {unit}
            </span>
          </div>
        </div>
      </div>

      <figcaption className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-foreground-muted">
        {blurb}{" "}
        <a
          href={externalLinks.costData}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
        >
          Source: {sourceLabel}
          <span aria-hidden="true"> ↗</span>
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}
