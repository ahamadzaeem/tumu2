import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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

const openSans = localFont({
  src: "../fonts/OpenSans-Variable.ttf",
  variable: "--font-opensans",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "TUMU | Crisp & Cream - Modern Japanese Desserts",
  description: "A golden, crispy stick filled with smooth, chilled cream — crafted with the finest ingredients from Japan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${titanOne.variable} ${sughoiy.variable} ${notoSansJP.variable} antialiased`}>
      <body className="min-h-screen bg-[#F8F4EC] text-[#162B3A] font-sans selection:bg-[#DB3E59] selection:text-white">
        {children}
      </body>
    </html>
  );
}

