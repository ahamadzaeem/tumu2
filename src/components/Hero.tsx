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
    <section className="relative w-full h-screen overflow-hidden flex items-center pt-24 pb-0 bg-transparent">
      {/* ─── NEW BACKGROUND IMAGE ─── */}
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

      {/* ─── TEXT CONTENT (ON TOP OF EVERYTHING) ─── */}
      <div className="relative z-30 w-full max-w-[1440px] mx-auto flex items-center">
        <div className="flex flex-col justify-center pl-6 sm:pl-12 lg:pl-16 xl:pl-20">
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
  );
}
