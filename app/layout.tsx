import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { profile, site, seo } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";

// Self-host Inter via next/font: removes the render-blocking rsms.me request
// and avoids CLS from late font swaps.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const title = `${profile.name} — ${profile.role} | React + TypeScript`;
const description =
  "Frontend Engineer with 3+ years building scalable React + TypeScript apps for fintech and enterprise platforms, including Bima Sugam (a government insurance initiative) at Onetick. Specializing in performance, testing, and reusable component systems.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: seo.keywords,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  publisher: profile.name,
  applicationName: `${profile.name} — Portfolio`,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  // Stop iOS Safari from auto-linking numbers/emails in body copy —
  // it breaks our custom styling for the contact list.
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: `${profile.name} — Portfolio`,
    title,
    description,
    url: site.url,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    // `-1` means "no limit" — lets Google show the full snippet/video preview
    // instead of truncating, which helps rich results for the case studies.
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // Fill these in from Search Console / Bing Webmaster when verifying.
    // google: "your-google-verification-token",
    // other: { "msvalidate.01": "your-bing-verification-token" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd />
      </head>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:text-bg focus:px-3 focus:py-1.5"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
