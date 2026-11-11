import type { Metadata } from "next";
import FlavoursClient from "./FlavoursClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tumu.ae";

export const metadata: Metadata = {
  title: "Our Flavours | Japanese Cream Desserts & Matcha in UAE",
  description:
    "Explore TUMU's authentic Japanese cream desserts and matcha desserts in UAE. Handcrafted crispy cream-filled pastry sticks filled with Uji Matcha, Madagascar Vanilla, and Belgian Chocolate.",
  keywords: [
    "Japanese cream desserts",
    "Matcha desserts UAE",
    "Japanese desserts in UAE",
    "Crispy cream-filled desserts",
    "TUMU flavours",
    "Dubai matcha pastry",
    "Japanese sweet sticks Dubai",
  ],
  alternates: {
    canonical: "/flavours",
  },
  openGraph: {
    title: "Our Flavours | TUMU UAE - Japanese Cream & Matcha Desserts",
    description:
      "Handcrafted crispy cream-filled dessert sticks. Discover our signature Uji Matcha, Madagascar Vanilla, and specialty Japanese flavours in UAE.",
    url: `${siteUrl}/flavours`,
  },
};

export default function FlavoursPage() {
  const flavoursSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "TUMU Japanese Cream-Filled Crispy Desserts",
    description: "Lineup of Japanese crispy cream desserts and matcha desserts in UAE.",
    itemListElement: [
      {
        "@type": "Product",
        position: 1,
        name: "Madagascar Vanilla Custard Stick",
        description:
          "Crispy golden Japanese pastry stick filled with silky chilled Madagascar vanilla bean cream.",
        category: "Japanese cream desserts",
        brand: {
          "@type": "Brand",
          name: "TUMU UAE",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "AED",
          price: "18.00",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Product",
        position: 2,
        name: "Ceremonial Uji Matcha Cream Stick",
        description:
          "Crispy cream-filled dessert infused with ceremonial Uji green tea from Kyoto. Authentic matcha desserts UAE.",
        category: "Matcha desserts UAE",
        brand: {
          "@type": "Brand",
          name: "TUMU UAE",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "AED",
          price: "20.00",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Product",
        position: 3,
        name: "Belgian Dark Chocolate Stick",
        description:
          "Rich decadent Belgian cocoa ganache cream piped into freshly baked crunchy pastry.",
        category: "Japanese cream desserts",
        brand: {
          "@type": "Brand",
          name: "TUMU UAE",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "AED",
          price: "19.00",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(flavoursSchema) }}
      />
      <FlavoursClient />
    </>
  );
}

