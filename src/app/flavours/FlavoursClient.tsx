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
            SECTION 2: 25 CHILLED CREAM FILLINGS (Concept 3: Confectionery Swatch Palette)
            ══════════════════════════════════════════════════════════════ */}
        <section className="mt-32 pt-16 border-t border-[#162B3A]/10">
          
          {/* Confectionery Palette Outer Frame */}
          <div className="rounded-[44px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#FFFDF9] border border-[#162B3A]/8 p-6 sm:p-10 lg:p-14 shadow-[0_10px_40px_rgba(22,43,58,0.03)] relative">
            
            {/* Header: Pantone Culinary Collection */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-12 border-b border-[#162B3A]/10">
              <div>
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#162B3A]/10 shadow-sm text-xs font-bold tracking-widest uppercase mb-3 text-[#162B3A]">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#F7C844]" />
                    <span className="w-2 h-2 rounded-full bg-[#F27A9B]" />
                    <span className="w-2 h-2 rounded-full bg-[#3E6333]" />
                    <span className="w-2 h-2 rounded-full bg-[#5E3A24]" />
                  </span>
                  <span>THE CREAM SWATCH PALETTE // 25 CULINARY HUES</span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#162B3A] leading-[0.92]">
                  CREAM FILLINGS
                </h2>
                <p className="font-heading text-sm sm:text-base lg:text-lg text-[#162B3A]/80 tracking-wide mt-2 font-bold uppercase">
                  Cream fillings made with Japanese imports blended with premium local ingredients
                </p>
              </div>

              {/* Volume Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {CREAM_COLLECTIONS.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCreamCollection(col.id)}
                    className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                      selectedCreamCollection === col.id
                        ? "bg-[#DB3E59] text-white shadow-md scale-105"
                        : "bg-white text-[#162B3A]/80 hover:bg-white hover:text-[#DB3E59] border border-[#162B3A]/10"
                    }`}
                  >
                    <span>{col.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      selectedCreamCollection === col.id ? "bg-white/25 text-white" : "bg-[#162B3A]/5 text-[#162B3A]/60"
                    }`}>
                      {col.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Curated Collection Volumes */}
            <div className="space-y-16">
              {displayedGroups.map((group) => (
                <div key={group.id} className="relative">
                  
                  {/* Collection Header (Bold Red Headline from Client Spec) */}
                  <div className="flex flex-wrap items-end justify-between gap-3 pb-4 mb-8 border-b border-[#162B3A]/10">
                    <div>
                      <span className="text-xs font-black tracking-widest text-[#162B3A]/50 uppercase font-mono block mb-1">
                        {group.japaneseTitle}
                      </span>
                      <h3 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#DB3E59] tracking-tight uppercase leading-none">
                        {group.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#162B3A]/70 font-semibold uppercase tracking-wider mt-1.5">
                        {group.subtitle}
                      </p>
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-white border border-[#162B3A]/10 shadow-xs text-xs font-black uppercase tracking-wider text-[#162B3A]">
                      {group.countBadge}
                    </span>
                  </div>

                  {/* Pantone Swatch Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {group.items.map((filling) => (
                      <div
                        key={filling.id}
                        className="group relative bg-white rounded-[32px] p-6 border border-[#162B3A]/8 shadow-[0_4px_24px_rgba(22,43,58,0.03)] hover:shadow-[0_20px_48px_rgba(22,43,58,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer backdrop-blur-sm"
                      >
                        {/* Top Card Bar: Swatch ID & Tag */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-mono text-[11px] font-bold text-[#162B3A]/50 tracking-wider">
                            SWATCH // {filling.number}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#162B3A]/70 bg-[#FAF4E7] px-2.5 py-0.5 rounded-full border border-black/5">
                            {filling.tag}
                          </span>
                        </div>

                        {/* Dimensional Cream Swatch / Pipette Swirl */}
                        <div className="relative w-28 h-28 mx-auto my-3 flex items-center justify-center">
                          {/* Ambient Color Glow */}
                          <div
                            className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-55 transition-opacity duration-300"
                            style={{ backgroundColor: filling.swatchHex }}
                          />
                          
                          {/* 3D Glossy Cream Swatch Circle */}
                          <div
                            className="w-24 h-24 rounded-full relative shadow-[0_8px_24px_rgba(0,0,0,0.12)] border-2 border-white transition-all duration-300 group-hover:scale-105 group-hover:rotate-6 flex items-center justify-center"
                            style={{
                              background: `radial-gradient(circle at 35% 28%, ${filling.highlightHex}, ${filling.swatchHex} 52%, ${filling.shadowHex} 100%)`
                            }}
                          >
                            {/* Whipped Piped Cream Texture */}
                            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
                              <path d="M50 14 C66 18, 82 34, 82 50 C82 68, 66 84, 50 84 C32 84, 18 68, 18 50 C18 36, 28 22, 42 16 C54 12, 64 24, 62 36 C60 44, 48 48, 42 45" fill="none" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
                            </svg>
                            {/* Specular Gloss Reflection */}
                            <div className="absolute top-3 left-4 w-4 h-2 bg-white/80 rounded-full rotate-[-30deg] blur-[0.4px]" />
                            {/* Embedded Japanese Kanji / Katakana Stamp */}
                            <span className="relative z-10 text-white font-black text-xs sm:text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] tracking-widest select-none">
                              {filling.japaneseLabel}
                            </span>
                          </div>
                        </div>

                        {/* Flavour Name & Flavor Profile */}
                        <div className="text-center my-2">
                          <h4 className="font-heading font-black text-xl sm:text-2xl text-[#162B3A] group-hover:text-[#DB3E59] transition-colors leading-tight mb-1">
                            {filling.name}
                          </h4>
                          <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#DB3E59] mb-2 font-mono">
                            {filling.flavorProfile}
                          </span>
                          <p className="text-xs sm:text-[13px] text-[#162B3A]/70 font-medium leading-relaxed px-1">
                            {filling.description}
                          </p>
                        </div>

                        {/* Bottom Swatch Spec Strip */}
                        <div className="pt-3 mt-4 border-t border-[#162B3A]/8 flex items-center justify-between text-[11px]">
                          <span className="inline-flex items-center gap-1.5 font-mono font-bold text-[#162B3A]/60 uppercase">
                            <span className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: filling.swatchHex }} />
                            <span>{filling.swatchHex}</span>
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#162B3A]/50">
                            Pair: <span className="text-[#162B3A]/80 font-bold">{filling.bestShellPairing}</span>
                          </span>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

            {/* Bottom Pairing Summary Card */}
            <div className="mt-16 p-8 sm:p-10 rounded-[32px] bg-white border border-[#162B3A]/10 shadow-[0_8px_30px_rgba(22,43,58,0.05)] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] text-xs font-black uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>200 FLAVOUR COMBINATIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A]">
                  8 Crunchy Shells × 25 Cream Fillings
                </h3>
                <p className="text-xs sm:text-sm text-[#162B3A]/75 font-medium mt-1 max-w-xl">
                  Match your favourite crispy Crusté shell with any freshly whipped chilled cream filling for a customized Japanese patisserie experience.
                </p>
              </div>
              <Link
                href="/locations"
                className="shrink-0 px-8 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95"
              >
                Find A Store Near You →
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

