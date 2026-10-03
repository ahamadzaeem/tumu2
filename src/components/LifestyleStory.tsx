"use client";

import React from "react";
import Image from "next/image";
import PillButton from "./PillButton";
import BrandStripes from "./BrandStripes";

export default function LifestyleStory() {
  return (
    <section id="story" className="relative w-full bg-[#F8F4EC] overflow-hidden py-0">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[480px]">
        {/* Left Side Photography (72% desktop) */}
        <div className="lg:col-span-8 relative min-h-[360px] lg:min-h-[480px] w-full overflow-hidden">
          <Image
            src="/images/tumu/lifestyle_cyan_products.jpg"
            alt="A Little Happiness In Every Bite - TUMU Sticks on Cyan Background"
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 72vw"
          />
        </div>

        {/* Right Side Text Block (28% desktop) */}
        <div className="lg:col-span-4 relative bg-[#F8F4EC] p-8 lg:p-12 flex flex-col justify-center items-start">
          {/* Vertical Pink Stripes on Left Edge of Right Block */}
          <div className="absolute left-0 top-0 bottom-0 hidden lg:block">
            <BrandStripes color="pink" direction="vertical" count={6} className="h-full" />
          </div>

          <div className="pl-0 lg:pl-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight leading-[0.92] uppercase mb-4">
              <span className="block text-[#162B3A]">A LITTLE</span>
              <span className="block text-[#162B3A]">HAPPINESS</span>
              <span className="block text-[#5CBEB3]">IN EVERY BITE.</span>
            </h2>

            <p className="text-[#162B3A] font-bold text-base sm:text-lg mb-8 leading-snug">
              できたての、
              <br />
              とろける幸せを。
            </p>

            <PillButton variant="pink" showArrow>
              Our Story
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
