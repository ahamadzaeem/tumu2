"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FreshFromOven() {
  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[700px] flex flex-col lg:flex-row bg-[#F8F4EC] overflow-hidden">
      {/* Decorative Stripes (Top Edge) */}
      <div 
        className="absolute top-0 left-1/2 w-48 h-full z-0 opacity-80"
        style={{
          background: "repeating-linear-gradient(90deg, #6ECBE0 0px, #6ECBE0 24px, #FFFFFF 24px, #FFFFFF 48px, #DB3E59 48px, #DB3E59 72px, #FFFFFF 72px, #FFFFFF 96px)",
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" // Match image diagonal slope roughly
        }}
      />
      {/* Decorative Stripes (Bottom Right Corner) */}
      <div 
        className="absolute bottom-0 right-0 w-64 h-32 z-20 opacity-90"
        style={{
          background: "repeating-linear-gradient(90deg, #DB3E59 0px, #DB3E59 24px, #FFFFFF 24px, #FFFFFF 48px, #6ECBE0 48px, #6ECBE0 72px, #FFFFFF 72px, #FFFFFF 96px)",
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)" // Triangle
        }}
      />

      {/* Left Content */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-12 lg:pl-[12vw] lg:pr-10 py-20 lg:py-0 z-20 bg-[#F8F4EC] lg:bg-transparent">
        <span className="text-[#DB3E59] text-xs sm:text-sm tracking-[0.25em] font-bold uppercase mb-4 block">
          FRESH FROM OUR OVEN
        </span>
        <h2 className="text-[48px] sm:text-[60px] lg:text-[76px] font-black tracking-tighter leading-[0.95] uppercase mb-8 text-[#1A2E44]">
          BAKED <span className="text-[#DB3E59]">TO</span><br />
          PERFECTION.<br />
          FILLED <span className="text-[#DB3E59]">WITH</span><br />
          <span className="text-[#DB3E59]">HAPPINESS.</span>
        </h2>
        <p className="text-[#1A2E44] font-bold text-base sm:text-lg tracking-wider mb-4 opacity-90">
          焼きたての、特別なおいしさを。
        </p>
        <p className="text-[#1A2E44] text-sm sm:text-base font-medium opacity-80 leading-relaxed max-w-[420px] mb-8">
          Every TUMU stick is freshly baked to a golden crunch and filled with smooth, chilled cream — so you can enjoy the perfect balance of crisp outside, creamy inside, every time.
        </p>
        <button className="bg-[#DB3E59] text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 w-fit hover:scale-105 hover:bg-[#d01c4c] transition-all shadow-lg shadow-pink-500/30">
          Explore TUMU <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Right Image Container */}
      <div className="relative w-full h-[400px] lg:h-auto lg:absolute lg:top-0 lg:right-0 lg:w-[60%] lg:bottom-0 z-10">
        <div 
          className="absolute inset-0 w-full h-full hidden lg:block"
          style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <Image 
            src="/images/tumu/artisanal_rack.png" 
            alt="TUMU sticks baked to perfection on a rack" 
            fill 
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Mobile image without complex clip-path */}
        <div className="absolute inset-0 w-full h-full lg:hidden">
          <Image 
            src="/images/tumu/artisanal_rack.png" 
            alt="TUMU sticks baked to perfection on a rack" 
            fill 
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
