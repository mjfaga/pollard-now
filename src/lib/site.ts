// Single source of truth for site identity. Update here when migrating
// the canonical domain (e.g. to pollardnow.com after launch).
export const SITE = {
  url: "https://pollard-now.vercel.app",
  name: "Pollard Now",
  shortName: "Pollard Now",
  tagline: "A Stronger Pollard. A Stronger Needham.",
  description:
    "A Needham, Massachusetts community campaign supporting the debt exclusion override to build a new Pollard Middle School for grades 6–8.",
  locale: "en_US",
  ogImage: "/images/pollard-now-logo-full.png",
  ogImageWidth: 536,
  ogImageHeight: 330,
  area: { city: "Needham", region: "Massachusetts", country: "US" },
} as const;

export function absUrl(pathname: string): string {
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  return `${SITE.url}${pathname}`;
}
