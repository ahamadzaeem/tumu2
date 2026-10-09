"use client";

import React from "react";
import Image from "next/image";
import PillButton from "./PillButton";
import BrandStripes from "./BrandStripes";
import { Store, Globe, TrendingUp } from "lucide-react";

export default function FranchiseSection() {
  const features = [
    { icon: Store, title: "Proven Concept" },
    { icon: Globe, title: "Global Support" },
    { icon: TrendingUp, title: "Growing Market" },
  ];

  return (
    <section id="franchise" className="relative w-full bg-[#F8F4EC] flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side Content Area (40% desktop) */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 sm:px-16 py-16 lg:py-16 z-20">
        
        {/* Far-Left Diagonal Cyan Stripe Motif */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12">
          <BrandStripes color="cyan" direction="diagonal" className="w-full h-full opacity-100" />
        </div>

        <div className="pl-6 sm:pl-12 max-w-[500px]">
          <h2 className="text-[40px] sm:text-[50px] lg:text-[54px] font-heading tracking-tight leading-[0.95] uppercase mb-6">
            <span className="block text-[#DB3E59]">TUMU</span>
            <span className="block text-[#162B3A]">FRANCHISE</span>
            <span className="block text-[#162B3A]">WITH TUMU</span>
          </h2>

          <p className="text-[#162B3A]/85 text-base leading-relaxed font-medium mb-10">
            Bring Japanese quality and a joyful snacking experience to your city.
          </p>

          {/* 3 Icon Labels without circles */}
          <div className="grid grid-cols-3 gap-4 mb-10 w-[300px]">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="flex flex-col items-center text-center group">
                  <div className="flex items-center justify-center text-[#162B3A] mb-2 group-hover:scale-110 group-hover:text-[#4694C6] transition-all">
                    <Icon className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <span className="text-[#162B3A] font-bold text-xs leading-tight">
                    {feat.title}
                  </span>
                </div>
              );
            })}
          </div>

          <PillButton variant="pink" showArrow className="w-fit px-8 py-3.5 text-base">
            Become a Partner
          </PillButton>
        </div>
      </div>

      {/* Right Side Visual (60% desktop) - Single Storefront Image */}
      <div className="w-full lg:w-[60%] relative flex items-center justify-center bg-white z-20">
        <Image
          src="/images/tumu/franchise_kiosk_cyan.jpg"
          alt="TUMU Architectural Franchise Storefront"
          width={1536}
          height={1024}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </section>
  );
}
