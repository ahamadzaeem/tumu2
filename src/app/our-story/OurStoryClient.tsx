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
      tagline: "Hot. Crispy. Sweet. Creamy. Simply TUMU.",
    },
    section2: {
      eyebrow: "CRAFTED DIFFERENTLY",
      headingLine1: "TRADITION MEETS",
      headingLine2: "INNOVATION.",
      description:
        "We take inspiration from classic Japanese patisserie traditions and elevate them with modern textures and vibrant global flavours. Every TUMU dessert stick is freshly baked on-site, filled to order with premium Japanese cream desserts, and delivered warm and crisp directly to your hands.",
    },
    chefSection: {
      eyebrow: "THE ARTIST BEHIND TUMU",
      subheading: "Japanese Pastry Artist | Chef Ren",
      description:
        "The art of sweetness, perfected. Crafted by Tokyo-based Chef Ren, TUMU combines Japanese precision with irresistible indulgence. From its delicate crisp shell to its smooth, rich cream, every detail is made to delight the senses.",
    },
    section3: {
      heading: "80% JAPANESE INGREDIENTS. DELICIOUSLY TUMU!",
      description:
        "made with ingredients sourced from japan for authentic japanese quality. so, bite with caution! smooth, chilled cream is about to ooze out and create a deliciously messy experience",
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
              <p className="text-lg sm:text-xl lg:text-2xl font-black text-[#162B3A] tracking-tight pt-2">
                {story.section1?.tagline || "Hot. Crispy. Sweet. Creamy. Simply TUMU."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: BLUE BG TUMU IMAGE (TRADITION MEETS INNOVATION) ─── */}
      <section className="relative w-full min-h-[620px] sm:min-h-[720px] lg:min-h-[820px] bg-[#79D2D9] overflow-hidden flex items-center py-16 lg:py-20">
        {/* Background Composition */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/tumu/story_section_2.png"
            alt="Tradition Meets Innovation - TUMU Japanese Cream Desserts"
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
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#162B3A] mb-2 sm:mb-3">
              {story.section2?.eyebrow || "CRAFTED DIFFERENTLY"}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black uppercase tracking-tight leading-[1.02] mb-4">
              <span className="block text-[#162B3A]">{story.section2?.headingLine1 || "TRADITION MEETS"}</span>
              <span className="block text-[#DB3E59]">{story.section2?.headingLine2 || "INNOVATION."}</span>
            </h2>

            <div className="w-14 h-1.5 bg-white mb-5" />

            <p className="text-white text-sm sm:text-base lg:text-[17px] leading-relaxed font-bold drop-shadow-sm max-w-[460px]">
              {story.section2?.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── NEW SECTION: THE ARTIST BEHIND TUMU (CHEF REN DEDICATED SECTION) ─── */}
      <section className="relative w-full bg-[#FAF4E7] py-20 sm:py-28 overflow-hidden border-t border-b border-[#162B3A]/10">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Chef Text Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-3">
                {story.chefSection?.eyebrow || "THE ARTIST BEHIND TUMU"}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.02] mb-5 text-[#162B3A]">
                {story.chefSection?.subheading || "Japanese Pastry Artist | Chef Ren"}
              </h2>

              <div className="w-16 h-1.5 bg-[#DB3E59] mb-6" />

              <p className="text-[#162B3A] text-base sm:text-lg lg:text-xl leading-relaxed font-medium mb-6">
                {story.chefSection?.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#162B3A]/10 w-full">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black text-[#DB3E59]">Tokyo</span>
                  <span className="text-xs font-bold text-[#162B3A]/70 uppercase mt-0.5">Origin of Craft</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black text-[#5CBEB3]">5 Years</span>
                  <span className="text-xs font-bold text-[#162B3A]/70 uppercase mt-0.5">Recipe Mastery</span>
                </div>
                <div className="flex flex-col col-span-2 sm:col-span-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#162B3A]">100%</span>
                  <span className="text-xs font-bold text-[#162B3A]/70 uppercase mt-0.5">Artisanal Dedication</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Image Box on Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 w-full flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <Image
                  src="/images/tumu/docx_image_11.png"
                  alt="Japanese Pastry Artist Chef Ren - TUMU"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#162B3A]/85 backdrop-blur-md text-white border border-white/10">
                  <span className="text-[11px] font-black uppercase text-[#DB3E59] tracking-wider block mb-0.5">
                    Master Japanese Patissier
                  </span>
                  <span className="text-sm font-black uppercase tracking-tight text-white">
                    Chef Ren • Tokyo, Japan
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
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
              {story.section3?.heading || "80% JAPANESE INGREDIENTS. DELICIOUSLY TUMU!"}
            </h2>

            <div className="w-14 h-1.5 bg-[#E52D50] mb-5" />

            <p className="text-[#162B3A] font-bold text-xs sm:text-sm lg:text-[15px] leading-relaxed mb-8 max-w-[420px]">
              {story.section3?.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/process"
                className="px-8 py-3.5 rounded-full bg-[#162B3A] hover:bg-black text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Discover Our Process →
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
