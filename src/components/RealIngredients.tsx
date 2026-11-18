"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CircleArrow from "./CircleArrow";
import BrandStripes from "./BrandStripes";
import { getSiteContent } from "@/lib/cms";

export default function RealIngredients() {
  const [content, setContent] = useState(getSiteContent());

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const real = content?.home?.realIngredients || {
    eyebrow: "JUST 3 STEPS.",
    heading: "UNIQUELY DELICIOUS.",
    description: "Bake It • Fill It • Serve It",
  };

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
        
        <span className="text-[#DB3E59] font-bold text-xs sm:text-sm lowercase tracking-normal mb-1.5">
          {(real.eyebrow || "just 3 steps.").toLowerCase()}
        </span>

        {/* Standardised small, bold, lowercase heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold lowercase tracking-tight leading-tight mb-6 text-[#162B3A]">
          <span className="block text-[#162B3A]">uniquely</span>
          <span className="block text-[#DB3E59]">delicious.</span>
        </h2>

        {/* The 3 Steps */}
        <div className="flex flex-col gap-3 mb-8 w-full">
          {[
            { num: "01", label: "bake it", desc: "golden crust baked crunchy to perfection" },
            { num: "02", label: "fill it", desc: "fresh chilled cream piped inside on order" },
            { num: "03", label: "serve it", desc: "served immediately at peak freshness" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 group">
              <span className="w-7 h-7 rounded-full bg-[#162B3A] text-white text-xs font-bold flex items-center justify-center shrink-0 group-hover:bg-[#DB3E59] transition-colors">
                {s.num}
              </span>
              <span className="text-base sm:text-lg font-bold text-[#162B3A] lowercase tracking-normal group-hover:text-[#DB3E59] transition-colors">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <Link href="/process" aria-label="Learn about our 3-step process">
          <CircleArrow variant="cyan-outline" size="md" />
        </Link>

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
