import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguageSwitcher } from "@/components/language-switcher";

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
      </body>
    </html>
  );
}
