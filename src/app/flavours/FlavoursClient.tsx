"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { fetchFlavors, Flavor, DEFAULT_FLAVORS } from "@/lib/supabase";

interface CreamFilling {
  id: string;
  number: string;
  name: string;
  collection: "Classic Collection" | "Signature Creations" | "Artisan Selection" | "Indian Inspirations";
  description: string;
  swatchHex: string;
  highlightHex: string;
  shadowHex: string;
  flavorProfile: string;
  bestShellPairing: string;
  tag: string;
}

interface CreamCollectionGroup {
  id: "Classic Collection" | "Signature Creations" | "Artisan Selection" | "Indian Inspirations";
  title: string;
  subtitle: string;
  countBadge: string;
  items: CreamFilling[];
}

const CREAM_COLLECTIONS = [
  { id: "ALL", label: "All Flavours", count: 25 },
  { id: "Classic Collection", label: "Classic", count: 6 },
  { id: "Signature Creations", label: "Signature", count: 9 },
  { id: "Artisan Selection", label: "Artisan", count: 6 },
  { id: "Indian Inspirations", label: "Indian", count: 4 },
];

const CREAM_FILLINGS: CreamFilling[] = [
  // ── CLASSIC COLLECTION (6) ──
  {
    id: "original-custard",
    number: "01",
    name: "Original Custard",
    collection: "Classic Collection",
    description: "Golden Japanese custard cream with a velvety, comforting finish.",
    swatchHex: "#F7C844",
    highlightHex: "#FFF3C4",
    shadowHex: "#C99418",
    flavorProfile: "Velvety • Pure Egg Yolk",
    bestShellPairing: "Tokyo Vanilla Cloud",
    tag: "Traditional"
  },
  {
    id: "madagascar-vanilla",
    number: "02",
    name: "Madagascar Vanilla",
    collection: "Classic Collection",
    description: "Rich Hokkaido cream infused with aromatic Madagascar bourbon vanilla beans.",
    swatchHex: "#F2E7D0",
    highlightHex: "#FFFDF7",
    shadowHex: "#D2C19F",
    flavorProfile: "Bourbon Bean • Hokkaido Milk",
    bestShellPairing: "Pistachio Royale",
    tag: "Bestseller"
  },
  {
    id: "belgian-chocolate",
    number: "03",
    name: "Belgian Chocolate",
    collection: "Classic Collection",
    description: "Silky whipped cream folded with melted single-origin Belgian cocoa.",
    swatchHex: "#5E3A24",
    highlightHex: "#8B5B3A",
    shadowHex: "#381F10",
    flavorProfile: "Melted • Single-Origin Cocoa",
    bestShellPairing: "Strawberry Crush",
    tag: "Classic"
  },
  {
    id: "strawberry-cream",
    number: "04",
    name: "Strawberry Cream",
    collection: "Classic Collection",
    description: "Sweet, tangy Japanese strawberry puree swirled into cloud-soft cream.",
    swatchHex: "#F27A9B",
    highlightHex: "#FFCCD9",
    shadowHex: "#C04768",
    flavorProfile: "Tangy • Sweet Japanese Berry",
    bestShellPairing: "Tokyo Vanilla Cloud",
    tag: "Fruit Blend"
  },
  {
    id: "sea-salt-caramel",
    number: "05",
    name: "Sea Salt Caramel",
    collection: "Classic Collection",
    description: "Slow-simmered buttery caramel balanced with sea salt flakes.",
    swatchHex: "#C87A28",
    highlightHex: "#F6AE61",
    shadowHex: "#8C4E0B",
    flavorProfile: "Buttery • Sea Salt Flakes",
    bestShellPairing: "Biscoff Velvet",
    tag: "Indulgent"
  },
  {
    id: "pistachio-praline",
    number: "06",
    name: "Pistachio Praline",
    collection: "Classic Collection",
    description: "Roasted Mediterranean pistachios stone-ground into a nutty, smooth paste.",
    swatchHex: "#8CAE68",
    highlightHex: "#C4E2A7",
    shadowHex: "#597738",
    flavorProfile: "Stone-Ground • Roasted Nut",
    bestShellPairing: "Dolce Tiramisu",
    tag: "Nutty"
  },

  // ── SIGNATURE CREATIONS (9) ──
  {
    id: "dark-cacao",
    number: "07",
    name: "Dark Cacao",
    collection: "Signature Creations",
    description: "Intense 70% bittersweet dark cocoa cream for deep chocolate lovers.",
    swatchHex: "#301E17",
    highlightHex: "#5A3D33",
    shadowHex: "#160B07",
    flavorProfile: "Intense • 72% Bittersweet Noir",
    bestShellPairing: "Mango Sol",
    tag: "Intense"
  },
  {
    id: "lotus-biscoff-crumble",
    number: "08",
    name: "Lotus Biscoff Crumble",
    collection: "Signature Creations",
    description: "Spiced Belgian caramelized biscuit cream with crunchy cookie crumbles.",
    swatchHex: "#B86227",
    highlightHex: "#E8955B",
    shadowHex: "#7A3A0E",
    flavorProfile: "Caramelized • Spiced Speculoos",
    bestShellPairing: "Biscoff Velvet",
    tag: "Signature"
  },
  {
    id: "lotus-caramel",
    number: "09",
    name: "Lotus Caramel",
    collection: "Signature Creations",
    description: "Decadent fusion of Biscoff spread and golden cooked caramel ribbons.",
    swatchHex: "#B25B1F",
    highlightHex: "#E48E53",
    shadowHex: "#74360B",
    flavorProfile: "Golden Ribbons • Cooked Sugar",
    bestShellPairing: "Tokyo Vanilla Cloud",
    tag: "Caramelized"
  },
  {
    id: "tiramisu-italiano",
    number: "10",
    name: "Tiramisu Italiano",
    collection: "Signature Creations",
    description: "Espresso-soaked savoiardi flavor with sweet Italian mascarpone cream.",
    swatchHex: "#6E5039",
    highlightHex: "#9E775A",
    shadowHex: "#412C1E",
    flavorProfile: "Espresso Roast • Mascarpone",
    bestShellPairing: "Dolce Tiramisu",
    tag: "Coffee"
  },
  {
    id: "hazelnut-dulcey",
    number: "11",
    name: "Hazelnut Dulcey",
    collection: "Signature Creations",
    description: "Roasted Piedmont hazelnuts blended with toasted blonde chocolate cream.",
    swatchHex: "#AF7744",
    highlightHex: "#DCAB7C",
    shadowHex: "#724820",
    flavorProfile: "Toasted Blonde • Cocoa Butter",
    bestShellPairing: "Pistachio Royale",
    tag: "Blonde Cocoa"
  },
  {
    id: "alphonso-mango",
    number: "12",
    name: "Alphonso Mango",
    collection: "Signature Creations",
    description: "Sun-ripened Ratnagiri Alphonso mango nectar whipped into silky cream.",
    swatchHex: "#FFAA1D",
    highlightHex: "#FFD87D",
    shadowHex: "#C67B00",
    flavorProfile: "Sun-Ripened • Pure Nectar",
    bestShellPairing: "Strawberry Crush",
    tag: "Tropical"
  },
  {
    id: "nutella-supreme",
    number: "13",
    name: "Nutella Supreme",
    collection: "Signature Creations",
    description: "Generously loaded roasted hazelnut and cocoa spread folded into filling.",
    swatchHex: "#4E2A1E",
    highlightHex: "#7D4E3D",
    shadowHex: "#29130A",
    flavorProfile: "Piedmont Hazelnut • Cocoa",
    bestShellPairing: "Tokyo Vanilla Cloud",
    tag: "Crowd Favorite"
  },
  {
    id: "kinder-bueno-bliss",
    number: "14",
    name: "Kinder Bueno Bliss",
    collection: "Signature Creations",
    description: "Crispy wafer and creamy hazelnut milk chocolate filling.",
    swatchHex: "#B67E56",
    highlightHex: "#E3B18E",
    shadowHex: "#7A4B29",
    flavorProfile: "Crispy Wafer • Hazelnut Milk",
    bestShellPairing: "Cacao Noir",
    tag: "Trending"
  },
  {
    id: "snickers-temptation",
    number: "15",
    name: "Snickers Temptation",
    collection: "Signature Creations",
    description: "Roasted crunchy peanuts, gooey caramel, and milk chocolate dream.",
    swatchHex: "#472818",
    highlightHex: "#774A33",
    shadowHex: "#231107",
    flavorProfile: "Roasted Peanuts • Nougat",
    bestShellPairing: "Biscoff Velvet",
    tag: "Indulgent"
  },

  // ── ARTISAN SELECTION (6) ──
  {
    id: "pistachio-kunafa",
    number: "16",
    name: "Pistachio Kunafa",
    collection: "Artisan Selection",
    description: "Crispy butter-toasted kataifi kunafa layered with emerald pistachio cream.",
    swatchHex: "#789849",
    highlightHex: "#AFCE83",
    shadowHex: "#4A6922",
    flavorProfile: "Kataifi Crunch • Dubai Viral",
    bestShellPairing: "Pistachio Royale",
    tag: "Dubai Viral"
  },
  {
    id: "persian-pistachio",
    number: "17",
    name: "Persian Pistachio",
    collection: "Artisan Selection",
    description: "Rare aromatic Persian green pistachios with delicate floral undertones.",
    swatchHex: "#5E8752",
    highlightHex: "#90BD84",
    shadowHex: "#38582E",
    flavorProfile: "Aromatic Emerald • Floral",
    bestShellPairing: "Uji Matcha",
    tag: "Artisan"
  },
  {
    id: "omani-halwa",
    number: "18",
    name: "Omani Halwa",
    collection: "Artisan Selection",
    description: "Traditional Gulf spices with rosewater, saffron, and caramelized cardamom.",
    swatchHex: "#934E24",
    highlightHex: "#C87A4B",
    shadowHex: "#5F2E10",
    flavorProfile: "Gulf Spices • Rosewater & Saffron",
    bestShellPairing: "Tokyo Vanilla Cloud",
    tag: "Heritage"
  },
  {
    id: "kyoto-matcha",
    number: "19",
    name: "Kyoto Matcha",
    collection: "Artisan Selection",
    description: "First-harvest ceremonial Uji green tea from Kyoto with deep umami sweetness.",
    swatchHex: "#3E6333",
    highlightHex: "#6A975B",
    shadowHex: "#223B19",
    flavorProfile: "Ceremonial Uji • First Harvest",
    bestShellPairing: "Uji Matcha",
    tag: "Ceremonial"
  },
  {
    id: "ferrero-rocher",
    number: "20",
    name: "Ferrero Rocher",
    collection: "Artisan Selection",
    description: "Whole roasted hazelnuts, wafer crisp, and velvety chocolate praline.",
    swatchHex: "#5E3A24",
    highlightHex: "#8F6043",
    shadowHex: "#361E10",
    flavorProfile: "Whole Hazelnut • Praline Crisp",
    bestShellPairing: "Cacao Noir",
    tag: "Luxury"
  },
  {
    id: "raffaello-coconut",
    number: "21",
    name: "Raffaello Coconut",
    collection: "Artisan Selection",
    description: "Silky white chocolate almond cream rolled in fine toasted coconut snow.",
    swatchHex: "#E5DFD4",
    highlightHex: "#FFFFFF",
    shadowHex: "#BDB4A3",
    flavorProfile: "Coconut Snow • White Chocolate",
    bestShellPairing: "Tokyo Vanilla Cloud",
    tag: "Delicate"
  },

  // ── INDIAN INSPIRATIONS (4) ──
  {
    id: "banarasi-paan",
    number: "22",
    name: "Banarasi Paan",
    collection: "Indian Inspirations",
    description: "Fragrant sweet betel leaf infused with gulkand rose jam and exotic spices.",
    swatchHex: "#306B48",
    highlightHex: "#5C9F78",
    shadowHex: "#1B442C",
    flavorProfile: "Gulkand Jam • Sweet Betel Leaf",
    bestShellPairing: "Tokyo Vanilla Cloud",
    tag: "Royal Heritage"
  },
  {
    id: "gulab-jamun",
    number: "23",
    name: "Gulab Jamun",
    collection: "Indian Inspirations",
    description: "Warm cardamom-infused mawa cream with sweet rose syrup drizzle notes.",
    swatchHex: "#8B4520",
    highlightHex: "#BD6E44",
    shadowHex: "#57250A",
    flavorProfile: "Mawa Cream • Cardamom Syrup",
    bestShellPairing: "Pistachio Royale",
    tag: "Festive"
  },
  {
    id: "kesar-pista-royale",
    number: "24",
    name: "Kesar Pista Royale",
    collection: "Indian Inspirations",
    description: "Royal Kashmiri saffron strands steeped in rich cream with crushed pistachios.",
    swatchHex: "#E28E14",
    highlightHex: "#FFBF59",
    shadowHex: "#A46104",
    flavorProfile: "Kashmiri Saffron • Gold Pista",
    bestShellPairing: "Uji Matcha",
    tag: "Royale"
  },
  {
    id: "madras-filter-coffee",
    number: "25",
    name: "Madras Filter Coffee",
    collection: "Indian Inspirations",
    description: "Authentic South Indian dark chicory roasted brew whipped into coffee cream.",
    swatchHex: "#503322",
    highlightHex: "#7F5841",
    shadowHex: "#2B180E",
    flavorProfile: "South Indian Dark Chicory",
    bestShellPairing: "Dolce Tiramisu",
    tag: "Artisanal Brew"
  }
];

const CREAM_COLLECTION_GROUPS: CreamCollectionGroup[] = [
  {
    id: "Classic Collection",
    title: "CLASSIC COLLECTION",
    subtitle: "Timeless Japanese & European Creams",
    countBadge: "6 Flavours",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Classic Collection"),
  },
  {
    id: "Signature Creations",
    title: "SIGNATURE CREATIONS",
    subtitle: "Decadent & Globally Celebrated Recipes",
    countBadge: "9 Flavours",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Signature Creations"),
  },
  {
    id: "Artisan Selection",
    title: "ARTISAN SELECTION",
    subtitle: "Middle Eastern Luxury & Kyoto Botanicals",
    countBadge: "6 Flavours",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Artisan Selection"),
  },
  {
    id: "Indian Inspirations",
    title: "INDIAN INSPIRATIONS",
    subtitle: "Royal Saffron, Aromatic Rose & Heritage Sweets",
    countBadge: "4 Flavours",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Indian Inspirations"),
  },
];

const COLLECTIONS_DATA = [
  {
    id: "classic",
    title: "CLASSIC COLLECTION",
    badge: "CRISP & CREAM",
    count: "06 Flavours",
    titleColor: "text-[#FF4A6E]",
    bgGradient: "bg-gradient-to-br from-[#164473] via-[#1B528B] to-[#12385F]",
    badgeBg: "bg-white",
    badgeText: "text-[#164473]",
    dot: "#60A5FA",
    items: [
      { name: "Original Custard", desc: "Golden Japanese custard cream with a velvety, comforting finish." },
      { name: "Madagascar Vanilla", desc: "Rich Hokkaido cream infused with aromatic Madagascar bourbon vanilla beans." },
      { name: "Belgian Chocolate", desc: "Silky whipped cream folded with melted single-origin Belgian cocoa." },
      { name: "Strawberry Cream", desc: "Sweet, tangy Japanese strawberry puree swirled into cloud-soft cream." },
      { name: "Sea Salt Caramel", desc: "Slow-simmered buttery caramel balanced with sea salt flakes." },
      { name: "Pistachio Praline", desc: "Roasted Mediterranean pistachios stone-ground into a nutty, smooth paste." }
    ]
  },
  {
    id: "signature",
    title: "SIGNATURE CREATIONS",
    badge: "CRISP & CREAM",
    count: "09 Flavours",
    titleColor: "text-[#FFE699]",
    bgGradient: "bg-gradient-to-br from-[#BD4E18] via-[#A84210] to-[#8C340B]",
    badgeBg: "bg-[#DB3E59]",
    badgeText: "text-white",
    dot: "#FB923C",
    items: [
      { name: "Dark Cacao", desc: "Intense 70% bittersweet dark cocoa cream for deep chocolate lovers." },
      { name: "Lotus Biscoff Crumble", desc: "Spiced Belgian caramelized biscuit cream with crunchy cookie crumbles." },
      { name: "Lotus Caramel", desc: "Decadent fusion of Biscoff spread and golden cooked caramel ribbons." },
      { name: "Tiramisu Italiano", desc: "Espresso-soaked savoiardi flavor with sweet Italian mascarpone cream." },
      { name: "Hazelnut Dulcey", desc: "Roasted Piedmont hazelnuts blended with toasted blonde chocolate cream." },
      { name: "Alphonso Mango", desc: "Sun-ripened Ratnagiri Alphonso mango nectar whipped into silky cream." },
      { name: "Nutella Supreme", desc: "Generously loaded roasted hazelnut and cocoa spread folded into filling." },
      { name: "Kinder Bueno Bliss", desc: "Crispy wafer and creamy hazelnut milk chocolate filling." },
      { name: "Snickers Temptation", desc: "Roasted crunchy peanuts, gooey caramel, and milk chocolate dream." }
    ]
  },
  {
    id: "artisan",
    title: "ARTISAN SELECTION",
    badge: "CRISP & CREAM",
    count: "06 Flavours",
    titleColor: "text-[#B4F7C3]",
    bgGradient: "bg-gradient-to-br from-[#235C33] via-[#1C4B29] to-[#143B1F]",
    badgeBg: "bg-[#D4F7DC]",
    badgeText: "text-[#143B1F]",
    dot: "#4ADE80",
    items: [
      { name: "Pistachio Kunafa", desc: "Crispy butter-toasted kataifi kunafa layered with emerald pistachio cream." },
      { name: "Persian Pistachio", desc: "Rare aromatic Persian green pistachios with delicate floral undertones." },
      { name: "Omani Halwa", desc: "Traditional Gulf spices with rosewater, saffron, and caramelized cardamom." },
      { name: "Kyoto Matcha", desc: "First-harvest ceremonial Uji green tea from Kyoto with deep umami sweetness." },
      { name: "Ferrero Rocher", desc: "Whole roasted hazelnuts, wafer crisp, and velvety chocolate praline." },
      { name: "Raffaello Coconut", desc: "Silky white chocolate almond cream rolled in fine toasted coconut snow." }
    ]
  },
  {
    id: "indian",
    title: "INDIAN INSPIRATIONS",
    badge: "CRISP & CREAM",
    count: "04 Flavours",
    titleColor: "text-[#FFFFFF]",
    bgGradient: "bg-gradient-to-br from-[#C8851B] via-[#AE7213] to-[#8E5B0B]",
    badgeBg: "bg-[#FEF08A]",
    badgeText: "text-[#4A2E03]",
    dot: "#FACC15",
    items: [
      { name: "Banarasi Paan", desc: "Fragrant sweet betel leaf infused with gulkand rose jam and exotic spices." },
      { name: "Gulab Jamun", desc: "Warm cardamom-infused mawa cream with sweet rose syrup drizzle notes." },
      { name: "Kesar Pista Royale", desc: "Royal Kashmiri saffron strands steeped in rich cream with crushed pistachios." },
      { name: "Madras Filter Coffee", desc: "Authentic South Indian dark chicory roasted brew whipped into coffee cream." }
    ]
  }
];

const STICK_PIECES = [
  { src: "/images/tumu/cut_piece_1.png", range: [0.0, 0.35] as [number, number], startX: -140, startY: 0, startRotate: 0 },
  { src: "/images/tumu/cut_piece_2.png", range: [0.15, 0.5] as [number, number], startX: -140, startY: 0, startRotate: 0 },
  { src: "/images/tumu/cut_piece_3.png", range: [0.3, 0.65] as [number, number], startX: -140, startY: 0, startRotate: 0 },
  { src: "/images/tumu/cut_piece_4.png", range: [0.45, 0.8] as [number, number], startX: -140, startY: 0, startRotate: 0 },
  { src: "/images/tumu/cut_piece_5.png", range: [0.6, 0.95] as [number, number], startX: -140, startY: 0, startRotate: 0 },
];

function StickPieceLayer({
  src,
  progress,
  range,
  startX,
  startY,
  startRotate,
  index,
}: {
  src: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  startX: number;
  startY: number;
  startRotate: number;
  index: number;
}) {
  const x = useTransform(progress, range, [startX, 0]);
  const y = useTransform(progress, range, [startY, 0]);
  const rotate = useTransform(progress, range, [startRotate, 0]);
  const opacity = useTransform(progress, [range[0], range[0] + 0.12], [0, 1]);

  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <Image
        src={src}
        alt={`TUMU Sliced Stick Piece ${index + 1}`}
        fill
        className="object-contain object-center"
        sizes="(max-width: 1024px) 100vw, 1200px"
        priority
      />
    </motion.div>
  );
}

function AnimatedCutStick() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center 45%"],
  });

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full max-w-4xl mx-auto my-6 sm:my-8 flex flex-col items-center"
    >
      <div className="relative w-full aspect-[1024/237] drop-shadow-[0_28px_40px_rgba(0,0,0,0.32)]">
        {STICK_PIECES.map((piece, idx) => (
          <StickPieceLayer
            key={piece.src}
            src={piece.src}
            progress={scrollYProgress}
            range={piece.range}
            startX={piece.startX}
            startY={piece.startY}
            startRotate={piece.startRotate}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default function FlavoursClient() {
  const [flavors, setFlavors] = useState<Flavor[]>(DEFAULT_FLAVORS);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const data = await fetchFlavors();
      if (isMounted && data && data.length > 0) {
        setFlavors(data);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredFlavors = flavors;

  return (
    <main className="min-h-screen bg-[#F8F4EC] flex flex-col selection:bg-[#DB3E59] selection:text-white">
      <Header />
      <div className="flex-1 pt-32 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto w-full pb-20">
        
        {/* Hero Section with Targeted Keywords */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <span className="text-[#DB3E59] text-xs sm:text-sm font-black uppercase tracking-[0.25em] block mb-3">
            OUR FLAVOURS
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-[#162B3A] uppercase mb-6 leading-[0.95] drop-shadow-sm">
            SO MANY FLAVOURS, WHAT&apos;S YOUR PICK?
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#162B3A]/85 max-w-3xl mx-auto font-medium leading-relaxed">
            Discover the perfect bite with TUMU! Enjoy 8 classic flavours of crunchy outer layers paired with 25 delicious flavours of chilled cream filling. With so many exciting combinations to choose from, there’s a flavour for everyone!
          </p>
        </div>

        {/* Section Header: CRUSTÉ FLAVOURS */}
        <div className="text-left mt-16 mb-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#162B3A]">
            CRUSTÉ FLAVOURS
          </h2>
          <p className="font-heading text-base sm:text-lg lg:text-xl text-[#162B3A]/80 uppercase tracking-wide mt-1.5">
            EXPLORE TUMU&apos;S SIGNATURE CRISPY SHELL FLAVOURS
          </p>
        </div>

        {/* Flavors Grid: 2 in a row on phone, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 pt-4 sm:pt-6">
          {filteredFlavors.map((flavor) => (
            <div 
              key={flavor.id} 
              className={`group relative ${flavor.color || "bg-white"} rounded-[48px] sm:rounded-[120px] p-3 sm:p-8 pb-7 sm:pb-16 pt-14 sm:pt-28 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center border-none mt-14 sm:mt-28`}
            >
              {/* Product Image popping out of the card */}
              <div className="absolute -top-14 sm:-top-32 w-full flex justify-center h-[170px] sm:h-[360px] z-20">
                <div className="relative w-[100px] sm:w-[195px] h-full">
                  <Image 
                    src={flavor.image} 
                    alt={`${flavor.name} - Japanese cream dessert by TUMU UAE`}
                    fill
                    className="object-contain object-center drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 120px, 200px"
                  />
                </div>
              </div>
              
              <div className="relative z-10 mt-12 sm:mt-28 flex flex-col items-center w-full">
                <span className={`inline-block px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-bold tracking-wider uppercase mb-2 sm:mb-6 ${flavor.tagBg || "bg-[#1A2E44]"} ${flavor.tagText || "text-white"}`}>
                  {flavor.tag || flavor.category}
                </span>
                
                <h2 className={`text-sm sm:text-2xl font-bold uppercase tracking-tight mb-1.5 sm:mb-4 leading-tight transition-colors duration-300 ${flavor.textColor || "text-[#1A2E44]"}`}>
                  {flavor.name}
                </h2>
                
                <p className={`${flavor.textColor || "text-[#1A2E44]"} opacity-80 font-medium leading-normal sm:leading-relaxed px-1 sm:px-4 text-[11px] sm:text-base line-clamp-3 sm:line-clamp-none`}>
                  {flavor.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 2: CREAM FILLINGS (Poster Theme: Pink + Teal + Pastel Yellow)
            ══════════════════════════════════════════════════════════════ */}
        <section className="mt-20 sm:mt-28 pt-4 sm:pt-8 pb-12">
          <div className="rounded-[32px] sm:rounded-[52px] bg-[#E93556] text-white p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
            
            {/* Top Header Row: Title Left + 25 Unique Fillings Badge Right */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
              <div>
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-[60px] text-white leading-[0.96] tracking-tight">
                  Cream Filling<br />
                  Flavours
                </h2>
                <p className="font-heading text-base sm:text-lg lg:text-xl text-white/95 uppercase tracking-wide mt-3 max-w-3xl leading-relaxed">
                  CREAM FILLINGS MADE WITH JAPANESE IMPORTS BLENDED WITH PREMIUM LOCAL INGREDIENTS
                </p>
              </div>

              {/* Pastel Yellow 25 Unique Fillings Badge */}
              <div className="bg-[#FDE67B] rounded-2xl px-7 py-4 sm:px-9 sm:py-5 text-center shadow-lg shrink-0 self-start md:self-end">
                <span className="font-heading text-4xl sm:text-5xl text-[#E93556] leading-none block">
                  25
                </span>
                <span className="font-sans font-black text-[10px] sm:text-xs tracking-[0.15em] uppercase text-[#162B3A] mt-1 block">
                  UNIQUE FILLINGS
                </span>
              </div>
            </div>

            {/* Centerpiece: Scroll-Animated Sliced TUMU Pastry Stick */}
            <AnimatedCutStick />

            {/* 2x2 Collection Cards Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {COLLECTIONS_DATA.map((col, idx) => {
                const isTealHighlight = idx === 3;
                return (
                  <div
                    key={col.id}
                    className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                      isTealHighlight
                        ? "bg-[#28B4AB] border border-[#28B4AB] shadow-xl"
                        : "bg-white/[0.12] border border-white/35 shadow-lg backdrop-blur-sm"
                    }`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <h3 className="font-heading text-2xl sm:text-3xl text-white leading-tight capitalize">
                          {col.title.toLowerCase()}
                        </h3>
                        <span className="bg-[#FDE67B] text-[#E93556] font-sans font-black text-[11px] sm:text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shrink-0 shadow-sm">
                          {col.count}
                        </span>
                      </div>

                      {/* 2-Column Bulleted List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-2">
                        {col.items.map((item) => (
                          <div key={item.name} className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-[#FDE67B] shrink-0" />
                            <span className="font-sans font-semibold text-white text-sm sm:text-[15px] leading-snug">
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Brand Sign-off */}
            <div className="relative z-10 mt-10 sm:mt-12 pt-2 flex justify-end">
              <span className="font-heading text-xl sm:text-2xl text-white/95 tracking-wide">
                All the way from Japan!
              </span>
            </div>

          </div>
        </section>

        {/* Bottom CTA for Franchise & Locations */}
        <div className="mt-24 p-8 sm:p-12 rounded-[36px] bg-white/70 border border-black/5 text-center flex flex-col items-center max-w-4xl mx-auto shadow-sm">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[#162B3A] mb-4 tracking-tight">
            GOT A TUMU CRAVING? WE’VE GOT YOU!
          </h3>
          <p className="font-heading text-sm sm:text-base lg:text-lg text-[#162B3A]/85 uppercase tracking-wide max-w-2xl mb-8">
            VISIT ANY OF OUR OUTLETS ACROSS INDIA OR GET IN TOUCH TO EXPLORE BRINGING A TUMU FRANCHISE TO YOUR REGION
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/locations"
              className="px-8 py-3.5 rounded-full bg-[#162B3A] hover:bg-black text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              Find a Store Near You →
            </Link>
            <Link
              href="/franchise#form"
              className="px-8 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              Franchise Opportunities →
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}

