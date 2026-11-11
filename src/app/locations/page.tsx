import type { Metadata } from "next";
import LocationsClient from "./LocationsClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tumu.ae";

export const metadata: Metadata = {
  title: "Store Locations | Japanese Dessert Shop Dubai & UAE",
  description:
    "Find your nearest TUMU Japanese dessert shop in Dubai and UAE. Visit our kiosks and boutiques for freshly baked crispy cream-filled desserts piped to order.",
  keywords: [
    "Japanese dessert shop Dubai",
    "Japanese desserts in UAE",
    "Crispy cream-filled desserts",
    "Dubai dessert cafes",
    "TUMU locations UAE",
    "matcha dessert shop Dubai",
  ],
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "Store Locations | TUMU UAE - Japanese Dessert Shop Dubai",
    description:
      "Find TUMU dessert shops across Dubai & UAE. Freshly baked crispy cream dessert sticks with interactive Google Maps navigation.",
    url: `${siteUrl}/locations`,
  },
};

export default function LocationsPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "TUMU UAE - Japanese Dessert Shop Dubai",
    description:
      "Authentic Japanese dessert shop in Dubai specializing in freshly baked crispy cream-filled dessert sticks.",
    url: `${siteUrl}/locations`,
    telephone: "+971-4-000-0000",
    servesCuisine: "Japanese Pastry & Desserts",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Downtown Dubai & Major Malls",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.1972",
      longitude: "55.2744",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "23:00",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <LocationsClient />
    </>
  );
}

