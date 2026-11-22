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
    japaneseTitle: "クラシック",
    subtitle: "Timeless Japanese & European Creams",
    countBadge: "6 Flavours",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Classic Collection"),
  },
  {
    id: "Signature Creations",
    title: "SIGNATURE CREATIONS",
    japaneseTitle: "シグネチャー",
    subtitle: "Decadent & Globally Celebrated Recipes",
    countBadge: "9 Flavours",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Signature Creations"),
  },
  {
    id: "Artisan Selection",
    title: "ARTISAN SELECTION",
    japaneseTitle: "職人の技",
    subtitle: "Middle Eastern Luxury & Kyoto Botanicals",
    countBadge: "6 Flavours",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Artisan Selection"),
  },
  {
    id: "Indian Inspirations",
    title: "INDIAN INSPIRATIONS",
    japaneseTitle: "伝統の香り",
    subtitle: "Royal Saffron, Aromatic Rose & Heritage Sweets",
    countBadge: "4 Flavours",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Indian Inspirations"),
  },
];

export default function FlavoursClient() {
  const [flavors, setFlavors] = useState<Flavor[]>(DEFAULT_FLAVORS);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeCard, setActiveCard] = useState<number>(0);

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

  // Track active collection on scroll
  useEffect(() => {
    const handleScroll = () => {
      const c0 = document.getElementById("cream-card-0");
      const c1 = document.getElementById("cream-card-1");
      const c2 = document.getElementById("cream-card-2");
      const c3 = document.getElementById("cream-card-3");
      const cards = [c0, c1, c2, c3];
      const threshold = window.innerHeight * 0.4;
      let current = 0;
      cards.forEach((card, idx) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          if (rect.top <= threshold) {
            current = idx;
          }
        }
      });
      setActiveCard(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCard = (idx: number) => {
    const el = document.getElementById(`cream-card-${idx}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const categories = [
    "ALL",
    ...Array.from(new Set(flavors.map((f) => f.category).filter(Boolean))),
  ];

  const filteredFlavors =
    selectedCategory === "ALL"
      ? flavors
      : flavors.filter((f) => f.category === selectedCategory);

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
            SECTION 2: CREAM FILLINGS (Interactive Overlapping Cards)
            ══════════════════════════════════════════════════════════════ */}
        <section className="mt-32 pt-8 pb-12">
          
          {/* Outer Blue Showcase Container with Ambient Aura */}
          <div className="rounded-[44px] sm:rounded-[60px] bg-gradient-to-b from-[#3478BA] via-[#387DBF] to-[#2B6EA9] text-white p-6 sm:p-10 lg:p-14 shadow-2xl border border-white/20 relative overflow-visible transition-all duration-700">
            
            {/* Ambient Background Aura reacting to active collection */}
            <div 
              className={`pointer-events-none absolute inset-0 rounded-[44px] sm:rounded-[60px] blur-3xl opacity-35 transition-colors duration-1000 ${
                activeCard === 0
                  ? "bg-[#184E82]"
                  : activeCard === 1
                  ? "bg-[#BD4E18]"
                  : activeCard === 2
                  ? "bg-[#235C33]"
                  : "bg-[#C8851B]"
              }`}
            />

            {/* Section Header */}
            <div className="relative z-10 max-w-4xl mb-8 sm:mb-10">
              <span className="text-white/80 text-xs sm:text-sm font-black uppercase tracking-[0.25em] block mb-2 font-mono">
                COLLECTIONS &bull; 25 UNIQUE FILLINGS
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-white mb-3 leading-none drop-shadow-sm">
                CREAM FILLINGS
              </h2>
              <p className="font-heading text-base sm:text-lg lg:text-xl text-white/95 tracking-wide font-medium max-w-3xl">
                Cream fillings made with Japanese imports blended with premium local ingredients
              </p>
            </div>

            {/* Interactive Collection Switcher Pills */}
            <div className="relative z-10 flex flex-wrap items-center gap-2.5 sm:gap-3 mb-12 sm:mb-16">
              {[
                { label: "Classic Collection", count: "06", dot: "#60A5FA" },
                { label: "Signature Creations", count: "09", dot: "#FB923C" },
                { label: "Artisan Selection", count: "06", dot: "#4ADE80" },
                { label: "Indian Inspirations", count: "04", dot: "#FACC15" },
              ].map((tab, idx) => (
                <button
                  key={tab.label}
                  onClick={() => scrollToCard(idx)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    activeCard === idx
                      ? "bg-white text-[#162B3A] shadow-xl scale-105"
                      : "bg-white/15 text-white/85 hover:bg-white/25 hover:text-white border border-white/15"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shadow-sm"
                    style={{ backgroundColor: tab.dot }}
                  />
                  <span>{tab.label}</span>
                  <span className="opacity-60 text-[11px] font-mono">({tab.count})</span>
                </button>
              ))}
            </div>

            {/* Main Two-Column Row: Left Overlapping Stacking Cards + Right Sticky Sliced Stick */}
            <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-14">
              
              {/* Left Column: 4 Stacking Cards that Overlap on Scroll */}
              <div className="flex-1 w-full max-w-2xl relative">
                
                {/* ── CARD 0: CLASSIC COLLECTION (Cerulean Indigo) ── */}
                <div 
                  id="cream-card-0"
                  className="sticky top-28 lg:top-32 z-10 rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#164473] via-[#1B528B] to-[#12385F] border border-white/25 p-6 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.3)] mb-40 sm:mb-52 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-3 mb-6 border-b border-white/20 pb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#FF4A6E] tracking-tight uppercase leading-none drop-shadow-sm">
                        CLASSIC COLLECTION
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#164473] bg-white px-3.5 py-1 rounded-full shadow-sm font-mono">
                        CRISP &amp; CREAM
                      </span>
                      <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-white/80 bg-white/15 px-3 py-1 rounded-full font-mono">
                        06 Flavours
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {[
                      "Original Custard",
                      "Madagascar Vanilla",
                      "Belgian Chocolate",
                      "Strawberry Cream",
                      "Sea Salt Caramel",
                      "Pistachio Praline"
                    ].map((name) => (
                      <div
                        key={name}
                        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3.5 transition-all duration-200 group/item"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-white/90 group-hover/item:scale-125 transition-transform shrink-0 shadow-sm" />
                        <span className="font-heading font-bold text-white text-base sm:text-lg tracking-wide leading-tight">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── CARD 1: SIGNATURE CREATIONS (Biscoff Velvet Terracotta) ── */}
                <div 
                  id="cream-card-1"
                  className="sticky top-32 lg:top-36 z-20 rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#BD4E18] via-[#A84210] to-[#8C340B] border border-white/25 p-6 sm:p-9 shadow-[0_25px_55px_rgba(0,0,0,0.35)] mb-40 sm:mb-52 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-3 mb-6 border-b border-white/20 pb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#FFE699] tracking-tight uppercase leading-none drop-shadow-sm">
                        SIGNATURE CREATIONS
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#DB3E59] px-3.5 py-1 rounded-full shadow-sm font-mono">
                        CRISP &amp; CREAM
                      </span>
                      <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-white/80 bg-white/15 px-3 py-1 rounded-full font-mono">
                        09 Flavours
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {[
                      "Dark Cacao",
                      "Lotus Biscoff Crumble",
                      "Lotus Caramel",
                      "Tiramisu Italiano",
                      "Hazelnut Dulcey",
                      "Alphonso Mango",
                      "Nutella Supreme",
                      "Kinder Bueno Bliss",
                      "Snickers Temptation"
                    ].map((name) => (
                      <div
                        key={name}
                        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3.5 transition-all duration-200 group/item"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-white/90 group-hover/item:scale-125 transition-transform shrink-0 shadow-sm" />
                        <span className="font-heading font-bold text-white text-base sm:text-lg tracking-wide leading-tight">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── CARD 2: ARTISAN SELECTION (Kyoto Uji Matcha Green) ── */}
                <div 
                  id="cream-card-2"
                  className="sticky top-36 lg:top-40 z-30 rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#235C33] via-[#1C4B29] to-[#143B1F] border border-white/25 p-6 sm:p-9 shadow-[0_30px_60px_rgba(0,0,0,0.40)] mb-40 sm:mb-52 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-3 mb-6 border-b border-white/20 pb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#B4F7C3] tracking-tight uppercase leading-none drop-shadow-sm">
                        ARTISAN SELECTION
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#143B1F] bg-[#D4F7DC] px-3.5 py-1 rounded-full shadow-sm font-mono">
                        CRISP &amp; CREAM
                      </span>
                      <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-white/80 bg-white/15 px-3 py-1 rounded-full font-mono">
                        06 Flavours
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {[
                      "Pistachio Kunafa",
                      "Persian Pistachio",
                      "Omani Halwa",
                      "Kyoto Matcha",
                      "Ferrero Rocher",
                      "Raffaello Coconut"
                    ].map((name) => (
                      <div
                        key={name}
                        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3.5 transition-all duration-200 group/item"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-white/90 group-hover/item:scale-125 transition-transform shrink-0 shadow-sm" />
                        <span className="font-heading font-bold text-white text-base sm:text-lg tracking-wide leading-tight">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── CARD 3: INDIAN INSPIRATIONS (Dolce Tiramisu / Saffron Gold) ── */}
                <div 
                  id="cream-card-3"
                  className="sticky top-40 lg:top-44 z-40 rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#C8851B] via-[#AE7213] to-[#8E5B0B] border border-white/25 p-6 sm:p-9 shadow-[0_35px_65px_rgba(0,0,0,0.45)] mb-8 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-3 mb-6 border-b border-white/20 pb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#FFFFFF] tracking-tight uppercase leading-none drop-shadow-sm">
                        INDIAN INSPIRATIONS
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#4A2E03] bg-[#FEF08A] px-3.5 py-1 rounded-full shadow-sm font-mono">
                        CRISP &amp; CREAM
                      </span>
                      <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-white/80 bg-white/15 px-3 py-1 rounded-full font-mono">
                        04 Flavours
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {[
                      "Banarasi Paan",
                      "Gulab Jamun",
                      "Kesar Pista Royale",
                      "Madras Filter Coffee"
                    ].map((name) => (
                      <div
                        key={name}
                        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3.5 transition-all duration-200 group/item"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-white/90 group-hover/item:scale-125 transition-transform shrink-0 shadow-sm" />
                        <span className="font-heading font-bold text-white text-base sm:text-lg tracking-wide leading-tight">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Sticky Uploaded TUMU Pastry Stick */}
              <div className="w-full lg:w-[380px] xl:w-[440px] shrink-0 flex flex-col items-center lg:sticky lg:top-28 self-start pt-2">
                
                {/* Pastry Stick with interactive ambient glow */}
                <div className="relative w-[280px] sm:w-[340px] lg:w-[380px] h-[520px] sm:h-[640px] lg:h-[720px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:scale-[1.02]">
                  <Image
                    src="/images/tumu/cut_tumu_stick.png"
                    alt="TUMU Sliced Pastry Stick with Chilled Cream Filling"
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 1024px) 340px, 440px"
                    priority
                  />
                </div>

                {/* Slogan Pill */}
                <div className="mt-4 px-6 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-black uppercase tracking-widest text-center shadow-lg">
                  外はサクッ、中はとろり &bull; Crisp &amp; Cream
                </div>

              </div>

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

