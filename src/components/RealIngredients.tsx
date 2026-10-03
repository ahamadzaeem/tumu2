"use client";

import React from "react";
import Image from "next/image";
import CircleArrow from "./CircleArrow";
import BrandStripes from "./BrandStripes";

export default function RealIngredients() {
  return (
    <section className="relative w-full bg-[#F8F4EC] overflow-hidden flex flex-col lg:flex-row">
      {/* Left Side Photography (approx 62% width on desktop) */}
      <div className="w-full lg:w-[62%] relative min-h-[400px] lg:min-h-[560px] overflow-hidden flex-shrink-0">
        <Image
          src="/images/tumu/real_ingredients.png"
          alt="Real Ingredients - Strawberry TUMU explosion"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 62vw"
        />
      </div>

      {/* Right Side Text Content (approx 38% width on desktop) */}
      <div className="w-full lg:w-[38%] relative bg-[#F8F4EC] p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-center items-start">
        
        <span className="text-[#DB3E59] font-semibold text-lg uppercase tracking-[0.15em] mb-2">
          REAL
        </span>

        <h2 className="text-4xl sm:text-5xl xl:text-[46px] font-black tracking-tight leading-[1.1] uppercase mb-6 text-[#162B3A]">
          <span className="block">INGREDIENTS.</span>
          <span className="block">EXCEPTIONAL</span>
          <span className="block">TASTE.</span>
        </h2>

        <p className="text-[#162B3A] font-bold text-base sm:text-lg mb-10 leading-relaxed tracking-wide" style={{ fontFamily: "var(--font-noto-jp), sans-serif" }}>
          素材から、
          <br />
          特別なおいしさを。
        </p>

        <CircleArrow variant="cyan-outline" size="md" />

        {/* Far Right Vertical Blue Stripes */}
        <div className="absolute right-[4%] top-0 bottom-[15%] w-12 hidden lg:block pointer-events-none z-10">
          <BrandStripes color="blue" direction="vertical" stripeWidth={5} gap={6} className="h-full w-full" />
        </div>

        {/* Bottom Right Pink Wedge Corner Accent */}
        <div 
          className="absolute bottom-0 right-0 w-[80%] h-[20%] bg-[#DB3E59] hidden lg:block z-20 pointer-events-none"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </div>
    </section>
  );
}
