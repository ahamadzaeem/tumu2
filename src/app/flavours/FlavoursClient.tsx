"use client";

import React, { useState, useEffect } from "react";
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
  japaneseLabel: string;
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
  japaneseTitle: string;
  subtitle: string;
  countBadge: string;
  items: CreamFilling[];
}

const CREAM_COLLECTIONS = [
  { id: "ALL", label: "All 25 Swatches", count: 25 },
  { id: "Classic Collection", label: "Classic Vol. 01", count: 6 },
  { id: "Signature Creations", label: "Signature Vol. 02", count: 9 },
  { id: "Artisan Selection", label: "Artisan Vol. 03", count: 6 },
  { id: "Indian Inspirations", label: "Indian Vol. 04", count: 4 },
];

const CREAM_FILLINGS: CreamFilling[] = [
  // ── CLASSIC COLLECTION (6) ──
  {
    id: "original-custard",
    number: "01",
    name: "Original Custard",
    japaneseLabel: "カスタード",
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
    japaneseLabel: "バニラ",
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
    japaneseLabel: "ショコラ",
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
    japaneseLabel: "イチゴ",
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
    japaneseLabel: "キャラメル",
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
    japaneseLabel: "ピスタチオ",
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
    japaneseLabel: "カカオ",
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
    japaneseLabel: "ビスコフ",
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
    japaneseLabel: "キャラメル",
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
    japaneseLabel: "ティラミス",
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
    japaneseLabel: "ドゥルセ",
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
    japaneseLabel: "マンゴー",
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
    japaneseLabel: "ヌテラ",
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
    japaneseLabel: "ブエノ",
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
    japaneseLabel: "スニッカーズ",
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
    japaneseLabel: "クナファ",
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
    japaneseLabel: "ピスタチオ",
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
    japaneseLabel: "ハルワ",
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
    japaneseLabel: "宇治抹茶",
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
    japaneseLabel: "ロシェ",
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
    japaneseLabel: "ココナッツ",
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
    japaneseLabel: "パーン",
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
    japaneseLabel: "ジャムン",
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
    japaneseLabel: "ケサール",
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
    japaneseLabel: "珈琲",
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
    japaneseTitle: "クラシック • VOL. 01",
    subtitle: "Timeless Japanese & European Creams",
    countBadge: "6 Swatches",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Classic Collection"),
  },
  {
    id: "Signature Creations",
    title: "SIGNATURE CREATIONS",
    japaneseTitle: "贅沢な味 • VOL. 02",
    subtitle: "Decadent & Globally Celebrated Recipes",
    countBadge: "9 Swatches",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Signature Creations"),
  },
  {
    id: "Artisan Selection",
    title: "ARTISAN SELECTION",
    japaneseTitle: "職人の技 • VOL. 03",
    subtitle: "Middle Eastern Luxury & Kyoto Botanicals",
    countBadge: "6 Swatches",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Artisan Selection"),
  },
  {
    id: "Indian Inspirations",
    title: "INDIAN INSPIRATIONS",
    japaneseTitle: "宮廷の香り • VOL. 04",
    subtitle: "Royal Saffron, Aromatic Rose & Heritage Sweets",
    countBadge: "4 Swatches",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Indian Inspirations"),
  },
];

export default function FlavoursClient() {
  const [flavors, setFlavors] = useState<Flavor[]>(DEFAULT_FLAVORS);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedCreamCollection, setSelectedCreamCollection] = useState<string>("ALL");

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

  const categories = [
    "ALL",
    ...Array.from(new Set(flavors.map((f) => f.category).filter(Boolean))),
  ];

  const filteredFlavors =
    selectedCategory === "ALL"
      ? flavors
      : flavors.filter((f) => f.category === selectedCategory);

  const displayedGroups =
    selectedCreamCollection === "ALL"
      ? CREAM_COLLECTION_GROUPS
      : CREAM_COLLECTION_GROUPS.filter((g) => g.id === selectedCreamCollection);

  return (
    <main className="min-h-screen bg-[#F8F4EC] flex flex-col selection:bg-[#DB3E59] selection:text-white">
      <Header />
      <div className="flex-1 pt-32 px-6 lg:px-12 max-w-[1440px] mx-auto w-full pb-20">
        
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

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#DB3E59] text-white shadow-md scale-105"
                    : "bg-white/80 text-[#162B3A] hover:bg-white hover:text-[#DB3E59] border border-black/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Section Header: CRUSTÉ FLAVOURS */}
        <div className="text-left mt-16 mb-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#162B3A]">
            CRUSTÉ FLAVOURS
          </h2>
          <p className="font-heading text-base sm:text-lg lg:text-xl text-[#162B3A]/80 tracking-wide mt-1.5">
            Explore TUMU&apos;s signature crispy shell flavours
          </p>
        </div>

        {/* Flavors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-6">
          {filteredFlavors.map((flavor) => (
            <div 
              key={flavor.id} 
              className={`group relative ${flavor.color || "bg-white"} rounded-[120px] p-8 pb-16 pt-28 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center border-none mt-28`}
            >
              {/* Product Image popping out of the card */}
              <div className="absolute -top-32 w-full flex justify-center h-[315px] sm:h-[360px] z-20">
                <div className="relative w-[165px] sm:w-[195px] h-full">
                  <Image 
                    src={flavor.image} 
                    alt={`${flavor.name} - Japanese cream dessert by TUMU UAE`}
                    fill
                    className="object-contain object-center drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                    sizes="200px"
                  />
                </div>
              </div>
              
              <div className="relative z-10 mt-28 flex flex-col items-center">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 ${flavor.tagBg || "bg-[#1A2E44]"} ${flavor.tagText || "text-white"}`}>
                  {flavor.tag || flavor.category}
                </span>
                
                <h2 className={`text-2xl font-bold mb-4 leading-tight transition-colors duration-300 ${flavor.textColor || "text-[#1A2E44]"}`}>
                  {flavor.name}
                </h2>
                
                <p className={`${flavor.textColor || "text-[#1A2E44]"} opacity-80 font-medium leading-relaxed px-4 text-sm sm:text-base`}>
                  {flavor.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 2: 25 CHILLED CREAM FILLINGS (Apple / SpaceX Precision Spec Module)
            ══════════════════════════════════════════════════════════════ */}
        <section className="mt-32 pt-16 border-t border-[#162B3A]/10">
          
          {/* Aerospace Dark Precision Canvas */}
          <div className="rounded-[40px] bg-[#0B151F] border border-white/10 p-6 sm:p-10 lg:p-14 shadow-[0_25px_80px_rgba(11,21,31,0.4)] relative overflow-hidden text-white">
            
            {/* Subtle SpaceX Orbital Grid Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#DB3E59]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#50B8B1]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header: Mission Telemetry & Specs */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-12 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-mono tracking-widest uppercase mb-3 text-white/70">
                  <span className="w-2 h-2 rounded-full bg-[#50B8B1] animate-pulse" />
                  <span>SYSTEM 25 // DUAL-CORE INJECTION</span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[0.92]">
                  CREAM FILLINGS
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-white/70 tracking-wide mt-2 font-medium">
                  Cream fillings made with Japanese imports blended with premium local ingredients
                </p>
              </div>

              {/* Apple-Style Segmented Navigation Bar */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
                {CREAM_COLLECTIONS.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCreamCollection(col.id)}
                    className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      selectedCreamCollection === col.id
                        ? "bg-[#DB3E59] text-white shadow-[0_0_20px_rgba(219,62,89,0.4)]"
                        : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <span>{col.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Collection Stages */}
            <div className="relative z-10 space-y-14">
              {displayedGroups.map((group) => (
                <div key={group.id} className="relative">
                  
                  {/* Collection Header (Bold Red Headline from Client Spec) */}
                  <div className="flex flex-wrap items-end justify-between gap-3 pb-4 mb-6 border-b border-white/10">
                    <div>
                      <span className="text-[11px] font-mono font-bold tracking-widest text-[#50B8B1] uppercase block mb-1">
                        {group.japaneseTitle} // STAGE SPECIFICATION
                      </span>
                      <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#DB3E59] tracking-tight uppercase leading-none">
                        {group.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/50 font-mono tracking-wider mt-1.5">
                        {group.subtitle}
                      </p>
                    </div>
                    <span className="px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-mono font-bold uppercase tracking-widest text-white/80">
                      {group.countBadge}
                    </span>
                  </div>

                  {/* Precision Spec Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {group.items.map((filling) => (
                      <div
                        key={filling.id}
                        className="group relative rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#DB3E59]/50 transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
                      >
                        <div>
                          {/* Top Row: Monospace Code & LED Telemetry Dot */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="font-mono text-[11px] font-bold text-white/40 tracking-wider">
                              SPEC // {filling.number}
                            </span>
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-white/20 shadow-sm"
                                style={{
                                  backgroundColor: filling.swatchHex,
                                  boxShadow: `0 0 10px ${filling.swatchHex}80`
                                }}
                              />
                              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/40 bg-white/[0.05] px-2 py-0.5 rounded">
                                {filling.tag}
                              </span>
                            </div>
                          </div>

                          {/* Flavour Name */}
                          <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#DB3E59] transition-colors tracking-tight mb-1">
                            {filling.name}
                          </h4>

                          {/* Flavor Formulation Profile */}
                          <span className="block text-[11px] font-mono text-[#50B8B1] tracking-wide mb-2.5">
                            {filling.flavorProfile}
                          </span>

                          {/* Description */}
                          <p className="text-xs text-white/65 font-normal leading-relaxed mb-4">
                            {filling.description}
                          </p>
                        </div>

                        {/* Bottom Telemetry Strip */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-white/40 text-[10px] uppercase tracking-wider">
                            PAIR: <span className="text-white/80 font-bold">{filling.bestShellPairing}</span>
                          </span>
                          <span className="text-white/70 font-bold tracking-widest text-[11px]">
                            {filling.japaneseLabel}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

            {/* Bottom 200 Combinations Telemetry HUD */}
            <div className="relative z-10 mt-16 p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#50B8B1] uppercase block mb-1">
                  MATRIX // 200 DUAL-CORE CONFIGURATIONS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-white">
                  8 Crunchy Shells × 25 Cream Fillings
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-normal mt-1 max-w-xl">
                  Engineered for maximum crunch and temperature contrast. Inject freshly chilled cream into any Crusté outer shell.
                </p>
              </div>
              <Link
                href="/locations"
                className="shrink-0 px-8 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(219,62,89,0.4)] hover:scale-105 active:scale-95"
              >
                Locate Nearest Store →
              </Link>
            </div>

          </div>
        </section>

        {/* Bottom CTA for Franchise & Locations */}
        <div className="mt-24 p-8 sm:p-12 rounded-[36px] bg-white/70 border border-black/5 text-center flex flex-col items-center max-w-4xl mx-auto shadow-sm">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-2">
            TASTE THE DIFFERENCE
          </span>
          <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#162B3A] mb-4">
            Craving Authentic Japanese Desserts in Dubai?
          </h3>
          <p className="text-sm sm:text-base text-[#162B3A]/80 font-medium max-w-xl mb-6">
            Visit our dessert shops across Dubai and the UAE, or enquire about bringing a TUMU dessert franchise to your territory.
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

