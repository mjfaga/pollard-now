import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguageSwitcher } from "@/components/language-switcher";

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

const SITE_URL = "https://pollardnow.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pollard Now — The Time is Now for Pollard",
    template: "%s · Pollard Now",
  },
  description:
    "A Needham community campaign to support the debt exclusion override and build a new Pollard Middle School for grades 6–8.",
  keywords: [
    "Pollard Middle School",
    "Needham",
    "debt exclusion",
    "school override",
    "Pollard Now",
  ],
  openGraph: {
    title: "Pollard Now — The Time is Now for Pollard",
    description:
      "Building a sustainable, 21st-century middle school for our students and a stronger future for the Needham community.",
    url: SITE_URL,
    siteName: "Pollard Now",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pollard Now — The Time is Now for Pollard",
    description:
      "Building a sustainable, 21st-century middle school for our students and a stronger future for the Needham community.",
  },
  robots: { index: true, follow: true },
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
      </body>
    </html>
  );
}
