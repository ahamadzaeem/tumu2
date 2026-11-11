import type { Metadata } from "next";
import ProcessClient from "./ProcessClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tumu.ae";

export const metadata: Metadata = {
  title: "Our Process | Artisanal Japanese Baking & Fresh Chilled Cream",
  description:
    "Discover the 5-step craftsmanship behind TUMU's crispy cream-filled desserts in the UAE. From golden convection baking to piping fresh chilled cream to order in Dubai.",
  keywords: [
    "Crispy cream-filled desserts",
    "Japanese cream desserts",
    "Japanese desserts in UAE",
    "Japanese dessert shop Dubai",
    "TUMU baking process",
    "Japanese patisserie technique",
  ],
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: "Our Process | TUMU UAE - The Art of Crispy Cream Desserts",
    description:
      "Explore how TUMU crafts its iconic crispy cream dessert sticks. Baked golden, crusted with almonds, and filled fresh to order in UAE.",
    url: `${siteUrl}/process`,
  },
};

export default function ProcessPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How TUMU Crafts Crispy Cream-Filled Japanese Desserts",
    description:
      "The 5-step artisanal process used by TUMU UAE to bake golden pastry sticks and pipe fresh chilled cream to order.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Bake to Golden Perfection",
        text: "Artisanal convection baking of choux dough sticks using authentic Japanese flour and unbleached butter.",
        image: `${siteUrl}/images/tumu/process_01_bake.jpg`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Create the Signature Almond Crust",
        text: "Coating sticks with toasted crushed almonds and pearl sugar for an audible, satisfying crunch.",
        image: `${siteUrl}/images/tumu/process_02_crunch.jpg`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Pipe Silky Cream to Order",
        text: "Injecting chilled silky creams (Uji Matcha, Madagascar Vanilla, Dark Chocolate) fresh at order time to guarantee zero sogginess.",
        image: `${siteUrl}/images/tumu/process_03_fill.jpg`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Artisanal Garnishing and Finish",
        text: "Applying ceremonial matcha dust, roasted pistachio crumbles, or cocoa dusting with pastry chef precision.",
        image: `${siteUrl}/images/tumu/process_04_finish.jpg`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Serve Fresh at Peak Temperature Contrast",
        text: "Delivering the pastry within seconds to experience the contrast of warm, flaky crust with chilled smooth cream.",
        image: `${siteUrl}/images/tumu/process_05_serve.jpg`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ProcessClient />
    </>
  );
}

