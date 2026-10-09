"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Utensils, Clock } from "lucide-react";

export default function FreshFromOven() {
  const pillars = [
    {
      icon: Clock,
      title: "FAST AND EASY",
      description: "Baking process for a perfectly crunchy puff every time at every single store."
    },
    {
      icon: Sparkles,
      title: "THE FINEST INGREDIENTS",
      description: "Using only the freshest and highest quality milk and butter."
    },
    {
      icon: Utensils,
      title: "FRESHLY SERVED",
      description: "Filling freshly prepared cream into crunchy puffs with every single order."
    }
  ];

  return (
    <section className="relative w-full min-h-[680px] lg:min-h-[750px] flex flex-col lg:flex-row bg-[#F8F4EC] overflow-hidden">
      {/* Decorative Brand Stripes (Top Edge) */}
      <div 
        className="absolute top-0 left-1/2 w-48 h-full z-0 opacity-30 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(90deg, #6ECBE0 0px, #6ECBE0 24px, #FFFFFF 24px, #FFFFFF 48px, #DB3E59 48px, #DB3E59 72px, #FFFFFF 72px, #FFFFFF 96px)",
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)"
        }}
      />

      {/* Left Content Card / Column */}
      <div className="w-full lg:w-[48%] flex flex-col justify-center px-6 sm:px-10 lg:pl-[7vw] lg:pr-8 py-16 lg:py-20 z-20 bg-[#F8F4EC] lg:bg-transparent">
        
        {/* Why So Fresh Card */}
        <div className="bg-[#DB3E59] text-white p-8 sm:p-10 lg:p-12 rounded-[36px] shadow-2xl relative overflow-hidden border border-white/10">
          <span className="text-white/80 text-xs sm:text-sm tracking-[0.25em] font-extrabold uppercase mb-2 block">
            FRESH FROM OUR OVEN
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase mb-8 leading-tight">
            WHY SO FRESH!?
          </h2>

          <div className="space-y-8">
            {pillars.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 mt-0.5 border border-white/20">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-1 text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed max-w-[380px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Image Container */}
      <div className="relative w-full h-[450px] lg:h-auto lg:absolute lg:top-0 lg:right-0 lg:w-[58%] lg:bottom-0 z-10">
        <div 
          className="absolute inset-0 w-full h-full hidden lg:block"
          style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <Image 
            src="/images/tumu/artisanal_rack.png" 
            alt="TUMU sticks freshly baked on a rack" 
            fill 
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Mobile image */}
        <div className="absolute inset-0 w-full h-full lg:hidden">
          <Image 
            src="/images/tumu/artisanal_rack.png" 
            alt="TUMU sticks freshly baked on a rack" 
            fill 
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
