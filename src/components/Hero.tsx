"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PillButton from "./PillButton";
import { getSiteContent } from "@/lib/cms";

export default function Hero() {
  const [content, setContent] = useState(getSiteContent());

  useEffect(() => {
    // Optionally fetch live CMS updates if available
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const hero = content?.home?.hero || {
    eyebrow: "Five Years. Countless Experiments.\nOne Vision. Tumu Is Finally Here\nall the way from JAPAN",
    headlineLine1: "CRISP OUTSIDE.",
    headlineLine2: "CREAMY INSIDE.",
    description: "",
    primaryBtnText: "Explore TUMU",
    primaryBtnLink: "/our-story",
    secondaryBtnText: "",
    secondaryBtnLink: "",
  };

  return (
    <section className="relative w-full h-screen min-h-[580px] sm:min-h-[640px] overflow-hidden flex items-center bg-[#6BE6EC]">
      {/* ─── FULL BACKGROUND IMAGE (EXACT FRAMING AS USER SCREENSHOT) ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/tumu/hero_turquoise.png"
          alt="TUMU UAE - Japanese Cream-Filled Crispy Desserts"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ─── TEXT CONTENT: PROMINENT & BOLD IN THE LEFT EMPTY ZONE ─── */}
      <div className="relative z-30 w-full max-w-[1440px] mx-auto flex items-center">
        <div className="flex flex-col justify-center pl-5 sm:pl-8 lg:pl-16 xl:pl-20 pt-8 sm:pt-12 lg:pt-0 max-w-[280px] xs:max-w-[310px] sm:max-w-[380px] lg:max-w-[640px]">
          
          {/* Eyebrow / Story Prelude - Enlarged as requested */}
          <div className="mb-3 lg:mb-4">
            <p className="font-heading text-[15px] xs:text-[17px] sm:text-xl lg:text-2xl xl:text-[26px] text-[#162B3A] uppercase tracking-tight leading-snug whitespace-pre-line drop-shadow-sm">
              {hero.eyebrow}
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="font-black uppercase tracking-tight leading-[0.92] mb-5 lg:mb-6 text-[36px] xs:text-[40px] sm:text-[46px] lg:text-[clamp(3.4rem,6vw,5rem)]">
            <span className="block text-[#162B3A]">{hero.headlineLine1}</span>
            <span className="block text-[#DB3E59]">{hero.headlineLine2}</span>
          </h1>

          {hero.description ? (
            <p className="text-[#162B3A]/85 font-bold text-xs sm:text-sm lg:text-base max-w-md mb-5 lg:mb-8 leading-relaxed">
              {hero.description}
            </p>
          ) : null}

          {/* Action CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <Link href={hero.primaryBtnLink || "/our-story"}>
              <PillButton variant="pink" showArrow className="px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm lg:text-base font-black shadow-md">
                {hero.primaryBtnText || "Explore TUMU"}
              </PillButton>
            </Link>
            {hero.secondaryBtnText ? (
              <Link href={hero.secondaryBtnLink || "/flavours"}>
                <PillButton variant="outline" showArrow className="px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm lg:text-base font-black">
                  {hero.secondaryBtnText}
                </PillButton>
              </Link>
            ) : null}
          </div>

        </div>
      </div>
    </section>
  );
}
