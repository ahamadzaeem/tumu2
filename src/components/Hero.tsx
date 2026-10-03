"use client";

import React from "react";
import Image from "next/image";
import PillButton from "./PillButton";
import BrandStripes from "./BrandStripes";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center pt-24 pb-0 bg-transparent">

      {/* ─── NEW BACKGROUND IMAGE ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/tumu/hero_turquoise.png"
          alt="TUMU hero background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ─── TEXT CONTENT (ON TOP OF EVERYTHING) ─── */}
      <div className="relative z-30 w-full max-w-[1440px] mx-auto flex items-center">
        <div
          className="flex flex-col justify-center pl-6 sm:pl-12 lg:pl-16 xl:pl-20"
        >
          {/* Decorative Script Subhead */}
          <div className="mb-2">
            <span className="font-subhead text-[36px] sm:text-[42px] text-[#162B3A] inline-block drop-shadow-sm">
              Discover the magic
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="font-black uppercase tracking-tight leading-[0.9] mb-8"
            style={{ fontSize: "clamp(3rem, 6vw, 4.8rem)" }}
          >
            <span className="block text-[#162B3A]">CRISP OUTSIDE.</span>
            <span className="block text-[#DB3E59]">CREAMY INSIDE.</span>
          </h1>

          <div>
            <PillButton variant="pink" showArrow>Explore TUMU</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
