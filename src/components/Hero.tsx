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
    <>
      {/* ─── MOBILE VIEW (< lg): VERTICAL STACK (OPTION 2: TEXT ON TOP, FULL TUMU BELOW) ─── */}
      <section className="relative w-full bg-[#6BE6EC] flex flex-col pt-28 pb-0 lg:hidden overflow-hidden">
        {/* Top: Text Content Area (No text over pastries) */}
        <div className="relative z-10 w-full px-6 sm:px-10 flex flex-col items-start mb-4">
          {/* Eyebrow / Story Prelude */}
          <div className="mb-3 max-w-md">
            <p className="font-heading text-xs sm:text-sm text-[#162B3A] uppercase tracking-wide leading-tight whitespace-pre-line drop-shadow-sm">
              {hero.eyebrow}
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="font-black uppercase tracking-tight leading-[0.92] mb-4 text-[32px] sm:text-4xl">
            <span className="block text-[#162B3A]">{hero.headlineLine1}</span>
            <span className="block text-[#DB3E59]">{hero.headlineLine2}</span>
          </h1>

          {hero.description ? (
            <p className="text-[#162B3A]/85 font-bold text-xs sm:text-sm max-w-md mb-4 leading-relaxed">
              {hero.description}
            </p>
          ) : null}

          {/* Action CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <Link href={hero.primaryBtnLink || "/our-story"}>
              <PillButton variant="pink" showArrow className="px-6 py-2.5 text-xs sm:text-sm font-black">
                {hero.primaryBtnText || "Explore TUMU"}
              </PillButton>
            </Link>
            {hero.secondaryBtnText ? (
              <Link href={hero.secondaryBtnLink || "/flavours"}>
                <PillButton variant="outline" showArrow className="px-6 py-2.5 text-xs sm:text-sm font-black">
                  {hero.secondaryBtnText}
                </PillButton>
              </Link>
            ) : null}
          </div>
        </div>

        {/* Bottom: Complete, Unobstructed TUMU Pastries in Full Straight View */}
        <div className="relative w-full h-[320px] sm:h-[400px] mt-2">
          <Image
            src="/images/tumu/hero_turquoise.png"
            alt="TUMU UAE - Japanese Cream-Filled Crispy Desserts"
            fill
            priority
            className="object-cover object-[75%_center]"
            sizes="100vw"
          />
        </div>
      </section>

      {/* ─── DESKTOP VIEW (>= lg): FULL-SCREEN HERO WITH SIDE-BY-SIDE COMPOSITION ─── */}
      <section className="hidden lg:flex relative w-full h-screen overflow-hidden items-center pt-24 pb-0 bg-[#6BE6EC]">
        {/* Background Image */}
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

        {/* Text Content */}
        <div className="relative z-30 w-full max-w-[1440px] mx-auto flex items-center">
          <div className="flex flex-col justify-center pl-16 xl:pl-20">
            {/* Eyebrow / Story Prelude */}
            <div className="mb-4">
              <p className="font-heading text-lg sm:text-xl lg:text-2xl text-[#162B3A] uppercase tracking-wide leading-tight whitespace-pre-line drop-shadow-sm">
                {hero.eyebrow}
              </p>
            </div>

            {/* Main Headline */}
            <h1
              className="font-black uppercase tracking-tight leading-[0.9] mb-6"
              style={{ fontSize: "clamp(3rem, 6vw, 4.8rem)" }}
            >
              <span className="block text-[#162B3A]">{hero.headlineLine1}</span>
              <span className="block text-[#DB3E59]">{hero.headlineLine2}</span>
            </h1>

            {hero.description ? (
              <p className="text-[#162B3A]/85 font-bold text-sm sm:text-base max-w-md mb-8 leading-relaxed">
                {hero.description}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <Link href={hero.primaryBtnLink || "/our-story"}>
                <PillButton variant="pink" showArrow>
                  {hero.primaryBtnText || "Explore TUMU"}
                </PillButton>
              </Link>
              {hero.secondaryBtnText ? (
                <Link href={hero.secondaryBtnLink || "/flavours"}>
                  <PillButton variant="outline" showArrow>
                    {hero.secondaryBtnText}
                  </PillButton>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
