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
    eyebrow: "TUMU FRANCHISE",
    headingLine1: "Be Part of a Growing,",
    headingLine2: "Viral & Unique Brand from Japan!",
    description: "",
    buttonText: "Join Our Growing Franchise Family",
    buttonLink: "/franchise#form",
    format1: "Easy-to-Operate Format",
    format2: "Low Investment",
    format3: "Attractive Returns",
    format4: "Target ROI Within 12 Months"
  };

  const benefits = [
    { title: franchiseCta.format1 || "Easy-to-Operate Format" },
    { title: franchiseCta.format2 || "Low Investment" },
    { title: franchiseCta.format3 || "Attractive Returns" },
    { title: franchiseCta.format4 || "Target ROI Within 12 Months" },
  ];

  return (
    <section id="franchise" className="relative w-full bg-[#F8F4EC] flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side Content Area (42% desktop) */}
      <div className="w-full lg:w-[42%] flex flex-col justify-center px-8 sm:px-14 py-16 lg:py-20 z-20">
        
        {/* Far-Left Diagonal Cyan Stripe Motif */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12">
          <BrandStripes color="cyan" direction="diagonal" className="w-full h-full opacity-100" />
        </div>

        <div className="pl-6 sm:pl-10 max-w-[520px]">
          {/* Standardised small, bold, lowercase heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold lowercase tracking-tight leading-tight mb-5">
            <span className="block text-[#DB3E59]">{(franchiseCta.headingLine1 || "be part of a growing,").toLowerCase()}</span>
            <span className="block text-[#162B3A]">{(franchiseCta.headingLine2 || "viral & unique brand from japan!").toLowerCase()}</span>
          </h2>

          {/* Key Franchise Advantages List */}
          <div className="flex flex-col gap-3 mb-8">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#DB3E59] shrink-0" />
                <span className="text-[#162B3A] font-bold text-sm sm:text-base tracking-normal lowercase">
                  {b.title.toLowerCase()}
                </span>
              </div>
            ))}
          </div>

          <Link href={franchiseCta.buttonLink || "/franchise#form"}>
            <PillButton variant="pink" showArrow className="w-fit px-6 py-2.5 text-xs sm:text-sm font-bold lowercase tracking-normal">
              {(franchiseCta.buttonText || "join our growing franchise family").toLowerCase()}
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
