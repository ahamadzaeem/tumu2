import type { Metadata } from "next";
import FaqClient from "./FaqClient";
import { FAQ_ITEMS } from "@/data/faq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tumu.ae";

export const metadata: Metadata = {
  title: "FAQs | Japanese Desserts & Franchise Questions in UAE",
  description:
    "Find answers to frequently asked questions about TUMU's crispy cream-filled Japanese desserts, Halal ingredients, Dubai store locations, and dessert franchise opportunities in UAE.",
  keywords: [
    "Japanese desserts in UAE",
    "Japanese cream desserts",
    "Crispy cream-filled desserts",
    "Japanese dessert shop Dubai",
    "Matcha desserts UAE",
    "Dessert franchise UAE",
    "TUMU FAQ",
  ],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQs | TUMU UAE - Japanese Desserts & Franchise Info",
    description:
      "All your questions answered: halal certification, fresh baking process, Dubai stores, and franchise requirements in the UAE.",
    url: `${siteUrl}/faq`,
  },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient />
    </>
  );
}

