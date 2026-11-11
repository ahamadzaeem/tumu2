import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tumu.ae";

export const metadata: Metadata = {
  title: "Contact Us | TUMU Japanese Desserts Dubai & UAE",
  description:
    "Get in touch with TUMU UAE. Contact our team for guest inquiries, corporate catering, brand partnerships, and dessert franchise opportunities in Dubai and the UAE.",
  keywords: [
    "Contact TUMU",
    "Japanese dessert shop Dubai",
    "Japanese desserts in UAE",
    "TUMU phone number",
    "Dubai dessert headquarters",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | TUMU UAE - Japanese Cream-Filled Crispy Desserts",
    description:
      "Connect with the TUMU UAE team for guest inquiries, catering events, and franchise questions in Dubai.",
    url: `${siteUrl}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

