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
  accentColor: string;
  bgLight: string;
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
  { id: "ALL", label: "All 25 Tickets", count: 25 },
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
    accentColor: "#E5A93C",
    bgLight: "bg-[#FFF9E6]",
    tag: "Traditional"
  },
  {
    id: "madagascar-vanilla",
    number: "02",
    name: "Madagascar Vanilla",
    japaneseLabel: "バニラ",
    collection: "Classic Collection",
    description: "Rich Hokkaido cream infused with aromatic Madagascar bourbon vanilla beans.",
    accentColor: "#DB3E59",
    bgLight: "bg-[#FFF0F3]",
    tag: "Bestseller"
  },
  {
    id: "belgian-chocolate",
    number: "03",
    name: "Belgian Chocolate",
    japaneseLabel: "ショコラ",
    collection: "Classic Collection",
    description: "Silky whipped cream folded with melted single-origin Belgian cocoa.",
    accentColor: "#5A3825",
    bgLight: "bg-[#F7EFE9]",
    tag: "Classic"
  },
  {
    id: "strawberry-cream",
    number: "04",
    name: "Strawberry Cream",
    japaneseLabel: "イチゴ",
    collection: "Classic Collection",
    description: "Sweet, tangy Japanese strawberry puree swirled into cloud-soft cream.",
    accentColor: "#DB3E59",
    bgLight: "bg-[#FFF0F3]",
    tag: "Fruit Blend"
  },
  {
    id: "sea-salt-caramel",
    number: "05",
    name: "Sea Salt Caramel",
    japaneseLabel: "キャラメル",
    collection: "Classic Collection",
    description: "Slow-simmered buttery caramel balanced with sea salt flakes.",
    accentColor: "#C68E17",
    bgLight: "bg-[#FFF8E7]",
    tag: "Indulgent"
  },
  {
    id: "pistachio-praline",
    number: "06",
    name: "Pistachio Praline",
    japaneseLabel: "ピスタチオ",
    collection: "Classic Collection",
    description: "Roasted Mediterranean pistachios stone-ground into a nutty, smooth paste.",
    accentColor: "#50B8B1",
    bgLight: "bg-[#EBF7F6]",
    tag: "Nutty"
  },

  // ── SIGNATURE CREATIONS (9) ──
  {
    id: "dark-cacao",
    number: "07",
    name: "Dark Cacao",
    japaneseLabel: "ダークカカオ",
    collection: "Signature Creations",
    description: "Intense 70% bittersweet dark cocoa cream for deep chocolate lovers.",
    accentColor: "#3D1C00",
    bgLight: "bg-[#ECE6E2]",
    tag: "Intense"
  },
  {
    id: "lotus-biscoff-crumble",
    number: "08",
    name: "Lotus Biscoff Crumble",
    japaneseLabel: "ビスコフ",
    collection: "Signature Creations",
    description: "Spiced Belgian caramelized biscuit cream with crunchy cookie crumbles.",
    accentColor: "#D35400",
    bgLight: "bg-[#FFF3E6]",
    tag: "Signature"
  },
  {
    id: "lotus-caramel",
    number: "09",
    name: "Lotus Caramel",
    japaneseLabel: "キャラメル",
    collection: "Signature Creations",
    description: "Decadent fusion of Biscoff spread and golden cooked caramel ribbons.",
    accentColor: "#C68E17",
    bgLight: "bg-[#FFF7E6]",
    tag: "Caramelized"
  },
  {
    id: "tiramisu-italiano",
    number: "10",
    name: "Tiramisu Italiano",
    japaneseLabel: "ティラミス",
    collection: "Signature Creations",
    description: "Espresso-soaked savoiardi flavor with sweet Italian mascarpone cream.",
    accentColor: "#795548",
    bgLight: "bg-[#F3ECE8]",
    tag: "Coffee"
  },
  {
    id: "hazelnut-dulcey",
    number: "11",
    name: "Hazelnut Dulcey",
    japaneseLabel: "ヘーゼル",
    collection: "Signature Creations",
    description: "Roasted Piedmont hazelnuts blended with toasted blonde chocolate cream.",
    accentColor: "#B78727",
    bgLight: "bg-[#FBF5E6]",
    tag: "Blonde Cocoa"
  },
  {
    id: "alphonso-mango",
    number: "12",
    name: "Alphonso Mango",
    japaneseLabel: "マンゴー",
    collection: "Signature Creations",
    description: "Sun-ripened Ratnagiri Alphonso mango nectar whipped into silky cream.",
    accentColor: "#FF9800",
    bgLight: "bg-[#FFF6E5]",
    tag: "Tropical"
  },
  {
    id: "nutella-supreme",
    number: "13",
    name: "Nutella Supreme",
    japaneseLabel: "ヌテラ",
    collection: "Signature Creations",
    description: "Generously loaded roasted hazelnut and cocoa spread folded into filling.",
    accentColor: "#5D4037",
    bgLight: "bg-[#EFEBE9]",
    tag: "Crowd Favorite"
  },
  {
    id: "kinder-bueno-bliss",
    number: "14",
    name: "Kinder Bueno Bliss",
    japaneseLabel: "ブエノ",
    collection: "Signature Creations",
    description: "Crispy wafer and creamy hazelnut milk chocolate filling.",
    accentColor: "#DB3E59",
    bgLight: "bg-[#FFF0F3]",
    tag: "Trending"
  },
  {
    id: "snickers-temptation",
    number: "15",
    name: "Snickers Temptation",
    japaneseLabel: "スニッカーズ",
    collection: "Signature Creations",
    description: "Roasted crunchy peanuts, gooey caramel, and milk chocolate dream.",
    accentColor: "#6D4C41",
    bgLight: "bg-[#EFEBE9]",
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
    accentColor: "#50B8B1",
    bgLight: "bg-[#EBF7F6]",
    tag: "Dubai Viral"
  },
  {
    id: "persian-pistachio",
    number: "17",
    name: "Persian Pistachio",
    japaneseLabel: "ピスタチオ",
    collection: "Artisan Selection",
    description: "Rare aromatic Persian green pistachios with delicate floral undertones.",
    accentColor: "#4E9F3D",
    bgLight: "bg-[#F0F8EE]",
    tag: "Artisan"
  },
  {
    id: "omani-halwa",
    number: "18",
    name: "Omani Halwa",
    japaneseLabel: "ハルワ",
    collection: "Artisan Selection",
    description: "Traditional Gulf spices with rosewater, saffron, and caramelized cardamom.",
    accentColor: "#C68E17",
    bgLight: "bg-[#FFF8E6]",
    tag: "Heritage"
  },
  {
    id: "kyoto-matcha",
    number: "19",
    name: "Kyoto Matcha",
    japaneseLabel: "宇治抹茶",
    collection: "Artisan Selection",
    description: "First-harvest ceremonial Uji green tea from Kyoto with deep umami sweetness.",
    accentColor: "#2E7D32",
    bgLight: "bg-[#EDF7ED]",
    tag: "Ceremonial"
  },
  {
    id: "ferrero-rocher",
    number: "20",
    name: "Ferrero Rocher",
    japaneseLabel: "ロシェ",
    collection: "Artisan Selection",
    description: "Whole roasted hazelnuts, wafer crisp, and velvety chocolate praline.",
    accentColor: "#8D6E63",
    bgLight: "bg-[#EFEBE9]",
    tag: "Luxury"
  },
  {
    id: "raffaello-coconut",
    number: "21",
    name: "Raffaello Coconut",
    japaneseLabel: "ココナッツ",
    collection: "Artisan Selection",
    description: "Silky white chocolate almond cream rolled in fine toasted coconut snow.",
    accentColor: "#50B8B1",
    bgLight: "bg-[#F3FAFA]",
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
    accentColor: "#2E7D32",
    bgLight: "bg-[#EDF7ED]",
    tag: "Royal Heritage"
  },
  {
    id: "gulab-jamun",
    number: "23",
    name: "Gulab Jamun",
    japaneseLabel: "ジャムン",
    collection: "Indian Inspirations",
    description: "Warm cardamom-infused mawa cream with sweet rose syrup drizzle notes.",
    accentColor: "#DB3E59",
    bgLight: "bg-[#FFF0F3]",
    tag: "Festive"
  },
  {
    id: "kesar-pista-royale",
    number: "24",
    name: "Kesar Pista Royale",
    japaneseLabel: "ケサール",
    collection: "Indian Inspirations",
    description: "Royal Kashmiri saffron strands steeped in rich cream with crushed pistachios.",
    accentColor: "#F57C00",
    bgLight: "bg-[#FFF4E5]",
    tag: "Royale"
  },
  {
    id: "madras-filter-coffee",
    number: "25",
    name: "Madras Filter Coffee",
    japaneseLabel: "珈琲",
    collection: "Indian Inspirations",
    description: "Authentic South Indian dark chicory roasted brew whipped into coffee cream.",
    accentColor: "#4E342E",
    bgLight: "bg-[#EFEBE9]",
    tag: "Artisanal Brew"
  }
];

const CREAM_COLLECTION_GROUPS: CreamCollectionGroup[] = [
  {
    id: "Classic Collection",
    title: "CLASSIC COLLECTION",
    japaneseTitle: "クラシック • TRADITION",
    subtitle: "Timeless Japanese & European Creams",
    countBadge: "6 Tickets",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Classic Collection"),
  },
  {
    id: "Signature Creations",
    title: "SIGNATURE CREATIONS",
    japaneseTitle: "贅沢な味 • INDULGENCE",
    subtitle: "Decadent & Globally Celebrated Recipes",
    countBadge: "9 Tickets",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Signature Creations"),
  },
  {
    id: "Artisan Selection",
    title: "ARTISAN SELECTION",
    japaneseTitle: "職人の技 • BOTANICAL",
    subtitle: "Middle Eastern Luxury & Kyoto Botanicals",
    countBadge: "6 Tickets",
    items: CREAM_FILLINGS.filter((f) => f.collection === "Artisan Selection"),
  },
  {
    id: "Indian Inspirations",
    title: "INDIAN INSPIRATIONS",
    japaneseTitle: "宮廷の香り • HERITAGE",
    subtitle: "Royal Saffron, Aromatic Rose & Heritage Sweets",
    countBadge: "4 Tickets",
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
            SECTION 2: 25 CHILLED CREAM FILLINGS (Concept 2: Shibuya Dessert Board)
            ══════════════════════════════════════════════════════════════ */}
        <section className="mt-32 pt-16 border-t-3 border-dashed border-[#162B3A]/20">
          
          {/* Shibuya Dessert Board Container */}
          <div className="rounded-[40px] bg-[#FAF4E7] border-3 border-[#162B3A] p-6 sm:p-10 lg:p-12 shadow-[8px_8px_0px_#162B3A] relative">
            
            {/* Board Header Bar */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-10 border-b-3 border-dashed border-[#162B3A]/20">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162B3A] text-white text-xs font-black uppercase tracking-widest mb-3 shadow-[2px_2px_0px_#DB3E59]">
                  <span className="w-2 h-2 rounded-full bg-[#DB3E59] animate-ping" />
                  <span>TOKYO CONFECTIONERY TICKET BOARD • 渋谷甘味</span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#162B3A] leading-[0.92]">
                  CREAM FILLINGS
                </h2>
                <p className="font-heading text-sm sm:text-base lg:text-lg text-[#162B3A]/80 tracking-wide mt-2 font-bold uppercase">
                  Cream fillings made with Japanese imports blended with premium local ingredients
                </p>
              </div>

              {/* Retro Ticket Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {CREAM_COLLECTIONS.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCreamCollection(col.id)}
                    className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 border-2 border-[#162B3A] ${
                      selectedCreamCollection === col.id
                        ? "bg-[#DB3E59] text-white shadow-[3px_3px_0px_#162B3A] -translate-y-0.5"
                        : "bg-white text-[#162B3A] hover:bg-[#FFF9E6] shadow-[2px_2px_0px_#162B3A]"
                    }`}
                  >
                    <span>{col.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                      selectedCreamCollection === col.id ? "bg-white/25 text-white" : "bg-[#162B3A]/10 text-[#162B3A]"
                    }`}>
                      {col.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Tokyo Collection Shelves */}
            <div className="space-y-12">
              {displayedGroups.map((group) => (
                <div key={group.id} className="relative">
                  {/* Collection Header (Official Red Headline) */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b-2 border-[#162B3A]/15">
                    <div className="flex items-center gap-3">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#DB3E59] border-2 border-[#162B3A]" />
                      <div>
                        <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#DB3E59] tracking-tight uppercase leading-none drop-shadow-2xs">
                          {group.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#162B3A]/60 font-bold uppercase tracking-wider mt-1 font-mono">
                          {group.japaneseTitle} • {group.subtitle}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-white border-2 border-[#162B3A] shadow-[2px_2px_0px_#162B3A] text-xs font-black uppercase tracking-wider text-[#162B3A]">
                      {group.countBadge}
                    </span>
                  </div>

                  {/* Flavor Tickets Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {group.items.map((filling) => (
                      <div
                        key={filling.id}
                        className={`group/stamp relative p-4 sm:p-5 rounded-2xl ${filling.bgLight} border-2 border-[#162B3A] shadow-[4px_4px_0px_#162B3A] hover:shadow-[6px_6px_0px_#DB3E59] hover:-translate-y-1 hover:-translate-x-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-200 cursor-pointer flex flex-col justify-between`}
                      >
                        <div>
                          {/* Top Ticket Header */}
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="font-heading text-xs font-black text-[#162B3A] tracking-wider px-2 py-0.5 rounded-md bg-white border border-[#162B3A]/30 shadow-2xs">
                              NO. {filling.number}
                            </span>
                            <span className="font-bold text-[11px] text-[#DB3E59] tracking-widest uppercase bg-white/90 px-2 py-0.5 rounded-md border border-[#DB3E59]/30">
                              {filling.japaneseLabel}
                            </span>
                          </div>

                          {/* Flavor Name */}
                          <h4 className="font-heading font-black text-lg sm:text-xl text-[#162B3A] group-hover/stamp:text-[#DB3E59] transition-colors leading-tight mb-1.5">
                            {filling.name}
                          </h4>

                          {/* Flavor Description */}
                          <p className="text-xs text-[#162B3A]/75 font-medium leading-relaxed mb-4">
                            {filling.description}
                          </p>
                        </div>

                        {/* Bottom Ticket Perforated Tear Line & Stamp Tag */}
                        <div className="pt-2.5 border-t border-dashed border-[#162B3A]/20 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-[#162B3A]/70">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: filling.accentColor }} />
                            <span>{filling.tag}</span>
                          </span>
                          <span className="text-[#162B3A]/40 font-mono">TUMU CREAM</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Pairing Counter Banner */}
            <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#162B3A] text-white border-2 border-[#162B3A] shadow-[6px_6px_0px_#DB3E59] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#50B8B1] block mb-1">
                  200 PAIRING COMBINATIONS
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
                  8 Crunchy Shells × 25 Cream Fillings
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-medium mt-1">
                  Pick any Crusté outer shell and inject your favourite chilled cream fresh inside.
                </p>
              </div>
              <Link
                href="/locations"
                className="shrink-0 px-8 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-2 border-white/20 shadow-[3px_3px_0px_#50B8B1] hover:scale-105 active:scale-95"
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

