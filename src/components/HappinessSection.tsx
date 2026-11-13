"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getSiteContent } from "@/lib/cms";

export default function HappinessSection() {
  const [content, setContent] = useState(getSiteContent());

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const happiness = content?.home?.happinessSection || {
    headingLine1: "TASTE IT ONCE.",
    headingLine2: "CRAVE IT FOREVER.",
    headingLine3: "LET HAPPINESS FLOW",
    japaneseText: "できたての、とろける幸せを。",
    btnText: "Our Story",
    btnLink: "/our-story",
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F8F4EC] lg:h-[500px] flex flex-col lg:flex-row shadow-xl">
      {/* Left Image Area (70% on desktop) */}
      <div className="relative w-full lg:w-[70%] h-[350px] lg:h-full overflow-hidden">
        <Image 
          src="/images/tumu/happiness_banner_cropped.jpg" 
          alt="Colorful TUMU sticks" 
          fill 
          className="object-cover object-center" 
        />
        
        {/* Line Design (Stripes) placed at the right edge of the image */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-[40px] z-10 hidden lg:block"
          style={{
            background: "repeating-linear-gradient(90deg, #DB3E59, #DB3E59 3px, transparent 3px, transparent 7px)",
          }}
        />
      </div>

      {/* Decorative Line Design for Mobile (Bottom Edge of image) */}
      <div 
        className="w-full h-[15px] lg:hidden z-10"
        style={{
          background: "repeating-linear-gradient(0deg, #DB3E59, #DB3E59 3px, transparent 3px, transparent 7px)",
        }}
      />

      {/* Right Content Area (30% on desktop) */}
      <div className="w-full lg:w-[30%] h-full bg-[#F8F4EC] flex flex-col justify-center px-8 sm:px-12 py-12 lg:py-0 z-20">
        <h2 className="text-[32px] sm:text-[40px] lg:text-[42px] font-black tracking-tight leading-[1.05] mb-6">
          <span className="block text-[#1A2E44]">{happiness.headingLine1}</span>
          <span className="block text-[#1A2E44]">{happiness.headingLine2}</span>
          <span className="block text-[#0088CC]">{happiness.headingLine3}</span>
        </h2>
        
        <p className="text-[#1A2E44] font-bold text-base sm:text-lg mb-8 tracking-wider whitespace-pre-line">
          {happiness.japaneseText}
        </p>
        
        <Link 
          href={happiness.btnLink || "/our-story"}
          className="bg-[#DB3E59] text-white px-8 py-3 rounded-full font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 w-fit hover:scale-105 hover:bg-[#d01c4c] transition-all shadow-lg shadow-pink-500/30"
        >
          {happiness.btnText || "Our Story"} <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
