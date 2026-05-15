import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguageSwitcher } from "@/components/language-switcher";
import { JsonLd } from "@/components/json-ld";
import { SITE, absUrl } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const TRANSLATE_LANGS = "ar,zh-CN,nl,en,fr,de,it,pt,ru,es";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const defaultTitle = `${SITE.name} — ${SITE.tagline}`;
const defaultSocialDescription =
  "Building a sustainable, 21st-century middle school for our students and a stronger future for the Needham community.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: defaultTitle,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    "Pollard Middle School",
    "Pollard Now",
    "Needham",
    "Needham Massachusetts",
    "Needham schools",
    "debt exclusion override",
    "school building override",
    "Pollard Building Project",
    "school construction Needham",
    "middle school grades 6-8",
  ],
  category: "civic",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    title: defaultTitle,
    description: defaultSocialDescription,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    images: [
      {
        url: absUrl(SITE.ogImage),
        width: SITE.ogImageWidth,
        height: SITE.ogImageHeight,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultSocialDescription,
    images: [absUrl(SITE.ogImage)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/icon.svg" },
  verification: {
    // Add real verification tokens here when configured.
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <LanguageSwitcher />
        <div
          id="google_translate_element"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden opacity-0"
        />
        <Script id="gt-init" strategy="afterInteractive">
          {`
            window.googleTranslateElementInit = function () {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: '${TRANSLATE_LANGS}',
                autoDisplay: false,
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            };
          `}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <JsonLd id="ld-website" data={websiteSchema()} />
        <JsonLd id="ld-organization" data={organizationSchema()} />
      </body>
    </html>
  );
}
