"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Flavour {
  id: string;
  name: string;
  category: string;
  image: string;
}

export default function Flavours() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const scrollRef = useRef<HTMLDivElement>(null);

  const flavours: Flavour[] = [
    {
      id: "matcha_green_tea",
      name: "Matcha Green Tea",
      category: "ASIAN INSPIRED",
      image: "/images/tumu/flavour_v3_04_matcha_green_tea.png",
    },
    {
      id: "vanilla",
      name: "Vanilla",
      category: "CLASSIC",
      image: "/images/tumu/flavour_v3_02_vanilla.png",
    },
    {
      id: "pistachio_crunch",
      name: "Pistachio Crunch",
      category: "SIGNATURE",
      image: "/images/tumu/flavour_v3_08_pistachio_crunch.png",
    },
    {
      id: "strawberry_bliss",
      name: "Strawberry Bliss",
      category: "FRUIT BLENDS",
      image: "/images/tumu/flavour_v3_05_strawberry_bliss.png",
    },
    {
      id: "dark_chocolate",
      name: "Dark Chocolate",
      category: "CLASSIC",
      image: "/images/tumu/flavour_v3_01_dark_chocolate.png",
    },
    {
      id: "tiramisu_indulgence",
      name: "Tiramisu Indulgence",
      category: "SIGNATURE",
      image: "/images/tumu/flavour_v3_07_tiramisu_indulgence.png",
    },
    {
      id: "mango_infusion",
      name: "Mango Infusion",
      category: "FRUIT BLENDS",
      image: "/images/tumu/flavour_v2_new_mango.png",
    },
    {
      id: "lotus_biscoff",
      name: "Lotus Biscoff",
      category: "SIGNATURE",
      image: "/images/tumu/flavour_v3_03_lotus_biscoff.png",
    },
  ];

  const categories = ["ALL", "CLASSIC", "SIGNATURE", "ASIAN INSPIRED", "FRUIT BLENDS"];

  const filteredFlavours =
    activeCategory === "ALL"
      ? flavours
      : flavours.filter(
          (f) => f.category === activeCategory
        );

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="flavours" className="relative w-full bg-[#50B8B1] py-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <span className="text-[#DB3E59] text-sm tracking-[0.2em] uppercase font-bold block mb-4">
              FLAVOURS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading tracking-tight leading-[1.1] uppercase text-[#DB3E59]">
              <span className="block">A FLAVOUR</span>
              <span className="block">FOR EVERY MOOD</span>
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-6 max-w-sm">
            <p className="text-[#162B3A] text-sm font-semibold leading-relaxed md:text-right">
              From timeless classics to bold Japanese-inspired creations, each TUMU is made to delight.
            </p>
            {/* Nav Arrows */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleScroll("left")}
                className="w-10 h-10 rounded-full border border-[#DB3E59]/40 flex items-center justify-center text-[#DB3E59] hover:bg-[#DB3E59] hover:text-white transition-colors"
                aria-label="Previous flavours"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleScroll("right")}
                className="w-10 h-10 rounded-full border border-[#DB3E59]/40 flex items-center justify-center text-[#DB3E59] hover:bg-[#DB3E59] hover:text-white transition-colors"
                aria-label="Next flavours"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar mb-16 pb-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
               <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-300 shrink-0 ${
                  isActive
                    ? "bg-[#DB3E59] text-white shadow-md"
                    : "bg-white/30 text-[#162B3A] hover:bg-white/60 hover:text-[#DB3E59]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-12 pt-8 items-end"
        >
          {filteredFlavours.map((item) => (
            <div
              key={item.id}
              className="relative shrink-0 flex flex-col items-center group cursor-pointer w-[100px] sm:w-[130px] lg:w-[160px]"
            >
              {/* Product Image */}
              <div className="relative w-full h-[250px] sm:h-[320px] lg:h-[380px] mb-6 flex justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover object-center drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2"
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, 280px"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-[#162B3A] font-extrabold text-center text-sm sm:text-base leading-tight px-2 group-hover:text-[#DB3E59] transition-colors">
                {item.name.split(" ").map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
