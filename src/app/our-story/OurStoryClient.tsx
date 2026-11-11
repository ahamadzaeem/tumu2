"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OurStoryClient() {
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
            alt="A Simple Idea - TUMU Story Japanese Desserts in UAE"
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
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-2 sm:mb-3">
              OUR STORY • 私たちの物語
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-black uppercase tracking-tight leading-[0.92] mb-5">
              <span className="block text-[#162B3A]">A SIMPLE</span>
              <span className="block text-[#DB3E59]">
                IDEA<span className="text-[#DB3E59]">.</span>
              </span>
            </h1>

            <div className="w-12 h-1 bg-[#DB3E59] mb-5 sm:mb-6" />

            <p className="text-[#162B3A] max-sm:text-white max-sm:drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-bold sm:font-semibold text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-[460px]">
              To introduce authentic <strong>Japanese desserts in UAE</strong> by turning a timeless choux pastry into a new kind of sensory joy — <strong>crispy cream-filled desserts</strong> with an audible golden crunch outside, and chilled smooth cream inside.
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
            alt="Tradition Meets Innovation - TUMU Japanese Cream Desserts"
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
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#162B3A] mb-2 sm:mb-3">
              CRAFTED DIFFERENTLY • 職人のこだわり
            </span>

            <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-black uppercase tracking-tight leading-[0.92] mb-5">
              <span className="block text-[#162B3A]">TRADITION MEETS</span>
              <span className="block text-white">
                INNOVATION<span className="text-[#DB3E59]">.</span>
              </span>
            </h2>

            <div className="w-12 h-1 bg-[#DB3E59] mb-5 sm:mb-6" />

            <p className="text-white font-bold sm:font-semibold text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-[480px]">
              We take inspiration from classic Japanese patisserie traditions and elevate them with modern textures and vibrant global flavours. Every TUMU dessert stick is freshly baked on-site, filled to order with premium <strong>Japanese cream desserts</strong>, and delivered warm and crisp directly to your hands.
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
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#162B3A] mb-2 sm:mb-3">
              ALL THE WAY FROM
            </span>

            <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-black uppercase tracking-tight leading-[0.92] mb-5">
              <span className="block text-[#E52D50]">
                JAPAN<span className="text-[#E52D50]">!</span>
              </span>
            </h2>

            <div className="w-12 h-1 bg-[#E52D50] mb-5 sm:mb-6" />

            <p className="text-white font-bold sm:font-semibold text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-[460px] mb-8">
              Rooted in Japanese craftsmanship and uncompromising attention to detail, TUMU brings the soul of Japan’s pastry culture to the UAE. Visit our <strong>Japanese dessert shop Dubai</strong> locations to taste the magic firsthand.
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

