import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tumu.ae";

export const metadata: Metadata = {
  title: "Dessert Franchise UAE | Partner with TUMU Japanese Desserts",
  description:
    "Explore dessert franchise UAE opportunities with TUMU. Turnkey franchise formats: Mall Kiosks, Retail Outlets, and Food Trucks. High ROI, full training, and proprietary Japanese dessert supply chain.",
  keywords: [
    "Dessert franchise UAE",
    "Japanese desserts in UAE",
    "Japanese cream desserts",
    "Crispy cream-filled desserts",
    "Japanese dessert shop Dubai",
    "TUMU franchise",
    "Dubai F&B franchise",
    "food kiosk franchise UAE",
  ],
  alternates: {
    canonical: "/franchise",
  },
  openGraph: {
    title: "Dessert Franchise UAE | TUMU Japanese Cream Stick Concept",
    description:
      "Join the fastest-growing Japanese dessert concept in the UAE. Turnkey setup, high gross margins, and proven mall kiosk & retail formats.",
    url: `${siteUrl}/franchise`,
  },
};

export default function FranchiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

