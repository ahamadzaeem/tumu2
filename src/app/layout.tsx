import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Preloader from "@/components/Preloader";

const titanOne = localFont({
  src: "../fonts/TitanOne-Regular.ttf",
  variable: "--font-titan",
  weight: "400",
  display: "swap",
});

const sughoiy = localFont({
  src: "../fonts/Sughoiy-RplYe.ttf",
  variable: "--font-sughoiy",
  weight: "400",
  display: "swap",
});

const segoeWP = localFont({
  src: "../fonts/SegoeWP.ttf",
  variable: "--font-segoe",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF4E7",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tumu.ae";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TUMU UAE | Japanese Cream-Filled Crispy Desserts",
    template: "%s | TUMU UAE - Japanese Cream-Filled Crispy Desserts",
  },
  description:
    "Experience authentic Japanese desserts in UAE. TUMU specializes in golden crispy cream-filled dessert sticks freshly baked and piped with smooth, chilled cream. Visit our Japanese dessert shop Dubai or explore dessert franchise UAE opportunities.",
  keywords: [
    "Japanese desserts in UAE",
    "Japanese cream desserts",
    "Crispy cream-filled desserts",
    "Japanese dessert shop Dubai",
    "Matcha desserts UAE",
    "Dessert franchise UAE",
    "TUMU UAE",
    "TUMU Dubai",
    "Japanese bakery Dubai",
    "artisanal crispy cream sticks",
    "Dubai dessert cafes",
  ],
  authors: [{ name: "TUMU Crisp & Cream UAE" }],
  creator: "TUMU UAE",
  publisher: "TUMU UAE",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: siteUrl,
    siteName: "TUMU UAE",
    title: "TUMU UAE | Japanese Cream-Filled Crispy Desserts",
    description:
      "Authentic Japanese desserts in UAE. Freshly baked crispy pastry sticks filled with chilled, smooth creams. Visit our Dubai dessert shop or inquire for dessert franchise UAE.",
    images: [
      {
        url: "/images/tumu/hero_turquoise.png",
        width: 1200,
        height: 630,
        alt: "TUMU UAE Japanese Cream-Filled Crispy Desserts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TUMU UAE | Japanese Cream-Filled Crispy Desserts",
    description:
      "Authentic Japanese desserts in UAE. Freshly baked crispy pastry sticks filled with chilled, smooth cream in Dubai.",
    images: ["/images/tumu/hero_turquoise.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/tumu-logo-final.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Bakery", "FoodEstablishment"],
        "@id": `${siteUrl}/#organization`,
        name: "TUMU UAE",
        alternateName: "TUMU Crisp & Cream",
        url: siteUrl,
        logo: `${siteUrl}/images/tumu-logo-final.png`,
        image: `${siteUrl}/images/tumu/hero_turquoise.png`,
        description:
          "Authentic Japanese cream-filled crispy dessert sticks in Dubai and UAE. Freshly baked pastry crunch with signature chilled creams including Uji Matcha and Madagascar Vanilla.",
        telephone: "+971-4-000-0000",
        priceRange: "$$",
        servesCuisine: ["Japanese", "Dessert", "Pastry"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dubai",
          addressRegion: "Dubai",
          addressCountry: "AE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "25.1972",
          longitude: "55.2744",
        },
        areaServed: {
          "@type": "Country",
          name: "United Arab Emirates",
        },
        sameAs: [
          "https://www.instagram.com/tumu_uae",
          "https://www.facebook.com/tumuae",
        ],
        hasMenu: `${siteUrl}/flavours`,
        potentialAction: {
          "@type": "OrderAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/locations`,
            inLanguage: "en-AE",
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "TUMU UAE",
        description: "Japanese Cream-Filled Crispy Desserts in UAE",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "en-AE",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${segoeWP.variable} ${titanOne.variable} ${sughoiy.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F8F4EC] text-[#162B3A] font-sans selection:bg-[#DB3E59] selection:text-white">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
