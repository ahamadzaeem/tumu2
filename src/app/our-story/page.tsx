import type { Metadata } from "next";
import OurStoryClient from "./OurStoryClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tumu.ae";

export const metadata: Metadata = {
  title: "Our Story | Authentic Japanese Desserts in UAE & Dubai",
  description:
    "Learn the story of TUMU UAE. Crafting authentic Japanese cream desserts and crispy cream-filled desserts with Japanese pastry perfection, freshly baked daily in Dubai.",
  keywords: [
    "Japanese desserts in UAE",
    "Japanese cream desserts",
    "Crispy cream-filled desserts",
    "Japanese dessert shop Dubai",
    "TUMU story",
    "Japanese bakery history UAE",
  ],
  alternates: {
    canonical: "/our-story",
  },
  openGraph: {
    title: "Our Story | TUMU UAE - Japanese Cream-Filled Crispy Desserts",
    description:
      "A simple idea inspired by Japanese craft: turning classic pastry into an extraordinary crispy cream-filled dessert in the UAE.",
    url: `${siteUrl}/our-story`,
  },
};

export default function OurStoryPage() {
  const storySchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Our Story - TUMU UAE",
    description:
      "The journey of TUMU bringing authentic Japanese crispy cream-filled desserts to Dubai and the UAE.",
    url: `${siteUrl}/our-story`,
    mainEntity: {
      "@type": "Organization",
      name: "TUMU UAE",
      url: siteUrl,
      logo: `${siteUrl}/images/tumu-logo-final.png`,
      sameAs: [
        "https://www.instagram.com/tumu_uae",
        "https://www.facebook.com/tumuae",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storySchema) }}
      />
      <OurStoryClient />
    </>
  );
}

