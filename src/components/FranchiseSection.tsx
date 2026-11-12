"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PillButton from "./PillButton";
import BrandStripes from "./BrandStripes";
import { Store, Globe, TrendingUp } from "lucide-react";
import { getSiteContent } from "@/lib/cms";

export default function FranchiseSection() {
  const [content, setContent] = useState(getSiteContent());

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const franchiseCta = content?.home?.franchiseCta || {
    eyebrow: "TUMU FRANCHISE • フランチャイズ",
    headingLine1: "TUMU FRANCHISE",
    headingLine2: "WITH TUMU",
    description: "Partner with the premier dessert franchise UAE opportunity. Bring authentic Japanese desserts, high operating margins, and turnkey store formats to your city.",
    buttonText: "Franchise Now",
    buttonLink: "/franchise#form",
    format1: "01. Mall Kiosk",
    format2: "02. Retail Outlet",
    format3: "03. Food Truck"
  };

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
            <span className="block text-[#DB3E59]">{franchiseCta.headingLine1}</span>
            <span className="block text-[#162B3A]">{franchiseCta.headingLine2}</span>
          </h2>

          <p className="text-[#162B3A]/85 text-base leading-relaxed font-medium mb-10">
            {franchiseCta.description}
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

          {/* 3 Formats Highlights */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 rounded-full bg-[#162B3A]/5 text-[#162B3A] font-bold text-xs">
              {franchiseCta.format1}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#162B3A]/5 text-[#162B3A] font-bold text-xs">
              {franchiseCta.format2}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#162B3A]/5 text-[#162B3A] font-bold text-xs">
              {franchiseCta.format3}
            </span>
          </div>

          <Link href={franchiseCta.buttonLink || "/franchise#form"}>
            <PillButton variant="pink" showArrow className="w-fit px-8 py-3.5 text-base">
              {franchiseCta.buttonText || "Franchise Now"}
            </PillButton>
          </Link>
        </div>
      </div>

      {/* Right Side Visual (60% desktop) - New Kiosk Elevation Image */}
      <div className="w-full lg:w-[60%] relative flex items-center justify-center bg-[#FAF4E7] z-20 p-4 sm:p-8 lg:p-12">
        <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/60 group">
          <Image
            src="/images/tumu/formats/kiosk_elevation.jpg"
            alt="TUMU Architectural Franchise Storefront"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />
        </div>
      </div>
    </section>
  );
}
