"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-[#FAF4E7] flex flex-col selection:bg-[#DB3E59] selection:text-white">
      {/* Navigation Header */}
      <Header />

      {/* ─── SECTION 1: A SIMPLE IDEA. ─── */}
      <section className="relative w-full h-[620px] sm:h-[720px] lg:h-[820px] bg-[#FAF4E7] overflow-hidden flex items-center pt-16 lg:pt-20">
        {/* Full-Bleed Section 1 Widescreen Background Composition */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/tumu/story_section_1.png"
            alt="A Simple Idea - TUMU Story"
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
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[480px] lg:max-w-[540px] flex flex-col items-start"
          >
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] max-sm:drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] mb-2 sm:mb-3">
              OUR STORY
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-black uppercase tracking-tight leading-[0.92] mb-5">
              <span className="block text-[#162B3A] max-sm:text-white max-sm:drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">A SIMPLE</span>
              <span className="block text-[#DB3E59] max-sm:drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                IDEA<span className="text-[#DB3E59]">.</span>
              </span>
            </h1>

            <div className="w-12 h-1 bg-[#DB3E59] mb-5 sm:mb-6 max-sm:shadow-md" />

            <p className="text-white sm:text-[#162B3A]/85 font-bold sm:font-semibold text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-[460px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] sm:drop-shadow-none">
              To turn a timeless pastry into a new kind of experience — crisp on the outside, creamy on the inside, and unforgettable with every bite.
            </p>
          </motion.div>
        </div>
      </section>


      {/* ─── SECTION 2: TRADITION MEETS INNOVATION. ─── */}
      <section className="relative w-full h-[620px] sm:h-[720px] lg:h-[820px] bg-[#79D2D9] overflow-hidden flex items-center">
        {/* Full-Bleed Section 2 Widescreen Background Composition */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/tumu/story_section_2.png"
            alt="Tradition Meets Innovation - TUMU Story"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>

        {/* Text Overlay (Right Aligned) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[500px] lg:max-w-[560px] flex flex-col items-start"
          >
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#162B3A] max-sm:text-white max-sm:drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] mb-2 sm:mb-3">
              CRAFTED DIFFERENTLY
            </span>

            <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-black uppercase tracking-tight leading-[0.92] mb-5">
              <span className="block text-[#162B3A] max-sm:text-white max-sm:drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">TRADITION MEETS</span>
              <span className="block text-white max-sm:drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                INNOVATION<span className="text-[#DB3E59]">.</span>
              </span>
            </h2>

            <div className="w-12 h-1 bg-[#DB3E59] mb-5 sm:mb-6 max-sm:shadow-md" />

            <p className="text-white sm:text-[#162B3A] font-bold sm:font-semibold text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-[480px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] sm:drop-shadow-none">
              We take inspiration from classic choux pastry and reimagine it with modern flavours, creative textures, and a relentless focus on quality. Every TUMU is freshly baked, filled to order, and made to bring a little happiness to your day.
            </p>
          </motion.div>
        </div>
      </section>


      {/* ─── SECTION 3: ALL THE WAY FROM JAPAN! ─── */}
      <section className="relative w-full h-[620px] sm:h-[720px] lg:h-[820px] bg-[#FACDD1] overflow-hidden flex items-center">
        {/* Full-Bleed Section 3 Widescreen Background Composition */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/tumu/story_section_3.png"
            alt="All The Way From Japan - TUMU Story"
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
            className="max-w-[480px] lg:max-w-[520px] flex flex-col items-start"
          >
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#162B3A] max-sm:text-white max-sm:drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] mb-2 sm:mb-3">
              ALL THE WAY FROM
            </span>

            <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-black uppercase tracking-tight leading-[0.92] mb-5">
              <span className="block text-[#E52D50] max-sm:text-white max-sm:drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                JAPAN<span className="text-[#E52D50]">!</span>
              </span>
            </h2>

            <div className="w-12 h-1 bg-[#E52D50] mb-5 sm:mb-6 max-sm:shadow-md" />

            <p className="text-white sm:text-[#162B3A] font-bold sm:font-semibold text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-[460px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] sm:drop-shadow-none">
              Rooted in Japanese craft and attention to detail, TUMU brings a taste of Japan to your everyday moments — crispy, creamy, and full of joy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
