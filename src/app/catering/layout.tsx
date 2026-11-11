import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tumu.ae";

export const metadata: Metadata = {
  title: "Events & Catering | Live Japanese Dessert Station Dubai & UAE",
  description:
    "Book TUMU live dessert catering for private parties, weddings, corporate summits, and celebrations across Dubai & UAE. Freshly baked crispy cream dessert sticks piped on-site.",
  keywords: [
    "Japanese dessert catering Dubai",
    "Japanese desserts in UAE",
    "live dessert station Dubai",
    "corporate catering UAE",
    "wedding dessert station UAE",
  ],
  alternates: {
    canonical: "/catering",
  },
  openGraph: {
    title: "Events & Catering | TUMU UAE - Live Japanese Dessert Bar",
    description:
      "Bring the live TUMU experience to your next gathering. Freshly piped Japanese cream sticks for weddings, parties, and corporate events across UAE.",
    url: `${siteUrl}/catering`,
  },
};

export default function CateringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

