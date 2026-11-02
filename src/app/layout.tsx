import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const archivo = localFont({
  src: "./fonts/archivo-latin-standard-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Unfold | Media. Technology. Culture. Experiences.",
  description:
    "We tell stories, build communities, and create experiences around the things shaping tomorrow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable} antialiased`}
    >
      <body className="min-h-svh">
        <SmoothScroll />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
