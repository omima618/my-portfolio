import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { profile } from "@/content/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const description =
  "Omima Khaled Ghanem — Frontend Developer (Angular, React, Next.js) and Software Tester with 4+ years building web apps and 3+ years in QA, using AI agents to ship stable releases.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} — Frontend Developer & Software Tester`, template: `%s · ${profile.shortName}` },
  description,
  keywords: ["Omima Ghanem", "Frontend Developer", "Software Tester", "Angular", "React", "Next.js", "QA", "Portfolio", "Alexandria"],
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  openGraph: {
    type: "website",
    title: `${profile.name} — Frontend Developer & Software Tester`,
    description,
    images: [{ url: profile.photo, width: 1180, height: 1180, alt: profile.name }],
  },
  twitter: { card: "summary", title: profile.name, description, images: [profile.photo] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0a10" },
  ],
};

// Applies the saved (or system) theme before first paint — no flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${jakarta.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
