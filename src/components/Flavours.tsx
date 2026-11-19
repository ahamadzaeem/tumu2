"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { fetchFlavors, Flavor, DEFAULT_FLAVORS } from "@/lib/supabase";
import { getSiteContent } from "@/lib/cms";

export default function Flavours() {
  const [flavours, setFlavours] = useState<Flavor[]>(DEFAULT_FLAVORS);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [content, setContent] = useState(getSiteContent());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const flavoursData = content?.home?.flavoursSection || {
    eyebrow: "FLAVOURS",
    headingLine1: "A FLAVOUR",
    headingLine2: "FOR EVERY MOOD",
    description: "From timeless classics to bold Japanese-inspired creations, each TUMU is made to delight.",
    btnText: "Explore All 12 Flavours & Matcha Desserts",
    btnLink: "/flavours"
  };

  useEffect(() => {
    let isMounted = true;
    async function loadFlavors() {
      const data = await fetchFlavors();
      if (isMounted && data && data.length > 0) {
        setFlavours(data);
      }
    }
    loadFlavors();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute dynamic categories based on loaded flavors
  const distinctCategories = Array.from(
    new Set(flavours.map((f) => f.category).filter(Boolean))
  );
  const categories = ["ALL", ...distinctCategories];

  const filteredFlavours =
    activeCategory === "ALL"
      ? flavours
      : flavours.filter((f) => f.category === activeCategory);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="flavours" className="relative w-full bg-[#50B8B1] scroll-mt-20 pt-28 pb-24 lg:scroll-mt-24 lg:pt-36 lg:pb-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20">
        
        {/* Section Header */}
        <div className="mb-8 text-left">
          <h2 className="font-black uppercase tracking-tight leading-[0.92] text-[36px] xs:text-[40px] sm:text-[46px] lg:text-[clamp(3.4rem,6vw,5rem)] text-[#162B3A]">
            FLAVOURS
          </h2>
        </div>

        {/* 6 Flavour Product Lineup */}
        <div
          ref={scrollRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 pb-12 pt-2 items-end justify-items-center"
        >
          {flavours.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="relative shrink-0 flex flex-col items-center group cursor-pointer w-full max-w-[180px]"
            >
              {/* Product Image */}
              <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[360px] mb-4 flex justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain object-center drop-shadow-[0_16px_24px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2"
                  sizes="(max-width: 640px) 150px, (max-width: 1024px) 220px, 280px"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-[#162B3A] font-black text-center text-xs sm:text-sm lg:text-base leading-tight px-1 group-hover:text-white transition-colors">
                {item.name.split(" ").map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom Section - 35 Unique Flavors & MORE FLAVORS Button */}
        {(() => {
          const rawDesc = content?.home?.flavoursSection?.description || "35 Unique Flavors, Made with Japan's Finest Ingredients";
          const [headlinePart, subtitlePart] = rawDesc.includes(",")
            ? rawDesc.split(/,\s*(.+)/)
            : [rawDesc, ""];

          return (
            <div className="mt-12 sm:mt-16 flex flex-col items-center text-center gap-6 sm:gap-8 max-w-3xl mx-auto px-4">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-black uppercase tracking-tight leading-[0.92] text-[30px] xs:text-[36px] sm:text-[46px] lg:text-[clamp(3.2rem,5.5vw,4.5rem)] text-[#162B3A]">
                  {headlinePart || "35 UNIQUE FLAVORS"}
                </h3>
                {subtitlePart ? (
                  <p className="font-heading text-[15px] xs:text-[17px] sm:text-xl lg:text-2xl text-[#162B3A] uppercase tracking-wide leading-snug">
                    {subtitlePart}
                  </p>
                ) : null}
              </div>

              <a
                href={content?.home?.flavoursSection?.btnLink || "/flavours"}
                className="inline-flex items-center gap-2 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs sm:text-sm lg:text-base font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <span>{content?.home?.flavoursSection?.btnText || "MORE FLAVORS"}</span>
                <span>→</span>
              </a>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
