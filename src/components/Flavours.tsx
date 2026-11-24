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
    headingLine1: "CRUSTÉ FLAVOURS",
    subheading: "EXPLORE TUMU’S SIGNATURE CRISPY SHELL FLAVOURS",
    headingLine2: "",
    description: "25 UNIQUE FLAVOURS, MADE WITH JAPAN'S FINEST INGREDIENTS",
    btnText: "MORE FLAVOURS",
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
    <section id="flavours" className="relative w-full bg-[#DB3E59] scroll-mt-20 pt-28 pb-24 lg:scroll-mt-24 lg:pt-36 lg:pb-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-left">
          {/* 1. Heading */}
          <h2 className="font-black uppercase tracking-tight leading-[0.92] text-[36px] xs:text-[40px] sm:text-[46px] lg:text-[clamp(3.4rem,6vw,5rem)] text-white drop-shadow-sm">
            {content?.home?.flavoursSection?.headingLine1 || "CRUSTÉ FLAVOURS"}
          </h2>

          {/* 2. Subtitle */}
          <p className="font-heading text-[16px] xs:text-[18px] sm:text-[22px] lg:text-[24px] text-white/95 uppercase tracking-wide mt-2 sm:mt-3">
            {content?.home?.flavoursSection?.subheading || "EXPLORE TUMU’S SIGNATURE CRISPY SHELL FLAVOURS"}
          </p>

          {/* 3. Tagline directly underneath heading */}
          {(() => {
            const rawDesc = content?.home?.flavoursSection?.description || "25 Unique Flavours, Made with Japan's Finest Ingredients";
            const [headlinePart, subtitlePart] = rawDesc.includes(",")
              ? rawDesc.split(/,\s*(.+)/)
              : [rawDesc, ""];

            const cleanHeadline = (headlinePart || "25 UNIQUE FLAVOURS").replace(/,\s*$/, "");

            return (
              <div className="mt-2 sm:mt-2.5 space-y-1">
                <p className="font-heading text-[16px] xs:text-[18px] sm:text-[22px] lg:text-[24px] text-white/95 uppercase tracking-wide">
                  {cleanHeadline}
                </p>
                {subtitlePart ? (
                  <p className="font-heading text-[16px] xs:text-[18px] sm:text-[22px] lg:text-[24px] text-white/95 uppercase tracking-wide">
                    {subtitlePart}
                  </p>
                ) : null}
              </div>
            );
          })()}

          {/* 4. More Flavours Tab directly underneath text */}
          <div className="mt-6 sm:mt-8">
            <a
              href={content?.home?.flavoursSection?.btnLink || "/flavours"}
              className="inline-flex items-center gap-2 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[#50B8B1] hover:bg-[#43A29B] text-white text-xs sm:text-sm lg:text-base font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <span>{content?.home?.flavoursSection?.btnText || "MORE FLAVOURS"}</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* 8 Flavour Product Lineup */}
        <div
          ref={scrollRef}
          className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-4 sm:gap-6 pt-2 items-end justify-items-center"
        >
          {flavours.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="relative shrink-0 flex flex-col items-center group cursor-pointer w-full max-w-[155px]"
            >
              {/* Product Image */}
              <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[300px] mb-3 flex justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain object-center drop-shadow-[0_16px_24px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2"
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 220px"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-white font-black uppercase text-center text-xs sm:text-sm lg:text-[15px] leading-tight px-1 group-hover:text-[#162B3A] transition-colors drop-shadow-sm">
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
