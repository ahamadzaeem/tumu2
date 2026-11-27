"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/cms";

export default function OurStoryClient() {
  const [content, setContent] = useState(getSiteContent());

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const story = content?.story || {
    section1: {
      heading: "FIVE YEARS OF MIXING, BAKING, TESTING & DREAMING",
      p1: "What began as a dream in the mind of a Japanese chef became a five-year journey of passion, creativity and countless experiments.",
      p2: "Every detail perfected. Every bite imagined differently.",
      p3: "Meet TUMU – where crispy warmth meets creamy sweetness, bringing together hot and cold, crisp and smooth in one unforgettable bite.",
      tagline: "HOT. CRISPY. SWEET. CREAMY. SIMPLY TUMU.",
    },
    section2: {
      eyebrow: "THE ARTIST BEHIND TUMU",
      headingLine1: "JAPANESE PASTRY ARTIST |",
      headingLine2: "CHEF REN",
      description:
        "The art of sweetness, perfected. Crafted by Tokyo based Chef Ren, TUMU combines Japanese precision with irresistible indulgence. From its delicate crisp shell to its smooth, rich cream, every detail is made to delight the senses.",
    },
    section3: {
      heading: "80% JAPANESE INGREDIENTS DELICIOUSLY TUMU",
      description:
        "Made with ingredients sourced from Japan for authentic Japanese quality. So, bite with caution! Smooth, chilled cream is about to ooze out and create a deliciously messy experience.",
    },
  };

  return (
    <main className="min-h-screen bg-[#FAF4E7] flex flex-col selection:bg-[#DB3E59] selection:text-white">
      {/* Navigation Header */}
      <Header />

      {/* ─── SECTION 1: FIVE YEARS OF MIXING, BAKING, TESTING & DREAMING ─── */}
      <section className="relative w-full min-h-[640px] sm:min-h-[720px] lg:min-h-[820px] bg-[#FAF4E7] overflow-hidden flex items-center pt-24 pb-16 lg:pt-28 lg:pb-20">
        {/* Background Composition */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/tumu/story_section_1.png"
            alt="FIVE YEARS OF MIXING, BAKING, TESTING & DREAMING - TUMU Story"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>

        {/* Text Overlay */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[560px] lg:max-w-[640px] flex flex-col items-start bg-[#FAF4E7]/90 sm:bg-transparent p-6 sm:p-0 rounded-3xl backdrop-blur-sm sm:backdrop-blur-none"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-black uppercase tracking-tight leading-[1.05] mb-6 text-[#162B3A]">
              {story.section1?.heading || "FIVE YEARS OF MIXING, BAKING, TESTING & DREAMING"}
            </h1>

            <div className="w-14 h-1.5 bg-[#DB3E59] mb-6" />

            <div className="flex flex-col gap-4 text-[#162B3A] text-base sm:text-lg lg:text-[19px] leading-relaxed font-semibold">
              <p>{story.section1?.p1}</p>
              <p className="text-[#DB3E59] font-bold">{story.section1?.p2}</p>
              <p>{story.section1?.p3}</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-black uppercase text-[#162B3A] tracking-tight pt-2">
                {story.section1?.tagline || "HOT. CRISPY. SWEET. CREAMY. SIMPLY TUMU."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: BLUE BG TUMU IMAGE (JAPANESE PASTRY ARTIST | CHEF REN) ─── */}
      <section className="relative w-full min-h-[620px] sm:min-h-[720px] lg:min-h-[820px] bg-[#79D2D9] overflow-hidden flex items-center py-16 lg:py-20">
        {/* Background Composition */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/tumu/story_section_2.png"
            alt="Japanese Pastry Artist Chef Ren - TUMU Japanese Cream Desserts"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>

        {/* Text Overlay (Right Aligned, shifted right away from the pistachio pastry design) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:pr-14 flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[420px] sm:max-w-[460px] lg:max-w-[490px] xl:max-w-[510px] flex flex-col items-start bg-[#79D2D9]/90 sm:bg-transparent p-6 sm:p-0 rounded-3xl backdrop-blur-sm sm:backdrop-blur-none"
          >
            <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-2 sm:mb-3 font-black">
              {story.section2?.eyebrow || "THE ARTIST BEHIND TUMU"}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black uppercase tracking-tight leading-[1.02] mb-4">
              <span className="block text-[#162B3A]">{story.section2?.headingLine1 || "JAPANESE PASTRY ARTIST |"}</span>
              <span className="block text-[#DB3E59]">{story.section2?.headingLine2 || "CHEF REN"}</span>
            </h2>

            <div className="w-14 h-1.5 bg-[#162B3A] mb-5" />

            <p className="text-[#162B3A] text-sm sm:text-base lg:text-[17px] leading-relaxed font-bold max-w-[460px]">
              {story.section2?.description}
            </p>

            {/* Quick Craft Credentials */}
            <div className="grid grid-cols-3 gap-3 pt-5 mt-5 border-t border-[#162B3A]/15 w-full max-w-[460px]">
              <div className="flex flex-col items-center text-center">
                <span className="text-xl sm:text-2xl font-black text-[#DB3E59] uppercase">TOKYO</span>
                <span className="text-[10px] sm:text-xs font-bold text-[#162B3A] uppercase mt-0.5 tracking-wider">ORIGIN</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-xl sm:text-2xl font-black text-[#162B3A] uppercase">5 YEARS</span>
                <span className="text-[10px] sm:text-xs font-bold text-[#162B3A] uppercase mt-0.5 tracking-wider">MASTERY</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-xl sm:text-2xl font-black text-[#DB3E59] uppercase">100%</span>
                <span className="text-[10px] sm:text-xs font-bold text-[#162B3A] uppercase mt-0.5 tracking-wider">ARTISANAL</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: 80% JAPANESE INGREDIENTS. DELICIOUSLY TUMU! ─── */}
      <section className="relative w-full min-h-[620px] sm:min-h-[720px] lg:min-h-[820px] bg-[#FACDD1] overflow-hidden flex items-center py-16 lg:py-20">
        {/* Background Composition */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/tumu/story_section_3.png"
            alt="80% Japanese Ingredients - TUMU Story"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>

        {/* Text Overlay (Left Aligned) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[440px] sm:max-w-[460px] lg:max-w-[480px] flex flex-col items-start bg-[#FACDD1]/90 sm:bg-transparent p-6 sm:p-0 rounded-3xl backdrop-blur-sm sm:backdrop-blur-none"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-black uppercase tracking-tight leading-[1.02] mb-4 text-[#E52D50]">
              {story.section3?.heading || "80% JAPANESE INGREDIENTS DELICIOUSLY TUMU!"}
            </h2>

            <div className="w-14 h-1.5 bg-[#E52D50] mb-5" />

            <p className="text-[#162B3A] font-bold text-base sm:text-lg lg:text-[18px] leading-relaxed mb-8 max-w-[460px]">
              {story.section3?.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/flavours"
                className="px-8 py-3.5 rounded-full bg-[#162B3A] hover:bg-black text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Explore Our Flavours →
              </Link>
              <Link
                href="/locations"
                className="px-8 py-3.5 rounded-full bg-white hover:bg-[#FAF4E7] text-[#162B3A] text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Find Store Locations →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
