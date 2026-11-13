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
      eyebrow: "OUR STORY",
      headingLine1: "A SIMPLE",
      headingLine2: "IDEA.",
      description: "To introduce authentic Japanese desserts in UAE by turning a timeless choux pastry into a new kind of sensory joy — crispy cream-filled desserts with an audible golden crunch outside, and chilled smooth cream inside."
    },
    section2: {
      eyebrow: "CRAFTED DIFFERENTLY",
      headingLine1: "TRADITION MEETS",
      headingLine2: "INNOVATION.",
      description: "We take inspiration from classic Japanese patisserie traditions and elevate them with modern textures and vibrant global flavours. Every TUMU dessert stick is freshly baked on-site, filled to order with premium Japanese cream desserts, and delivered warm and crisp directly to your hands."
    },
    section3: {
      eyebrow: "ALL THE WAY FROM",
      heading: "JAPAN!",
      description: "Rooted in Japanese craftsmanship and uncompromising attention to detail, TUMU brings the soul of Japan's pastry culture to the UAE. Visit our Japanese dessert shop Dubai locations to taste the magic firsthand."
    }
  };
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
              {story.section1?.eyebrow}
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-black uppercase tracking-tight leading-[0.92] mb-5">
              <span className="block text-[#162B3A]">{story.section1?.headingLine1}</span>
              <span className="block text-[#DB3E59]">
                {story.section1?.headingLine2}
              </span>
            </h1>

            <div className="w-12 h-1 bg-[#DB3E59] mb-5 sm:mb-6" />

            <p className="text-[#162B3A] max-sm:text-white max-sm:drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-bold sm:font-semibold text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-[460px]">
              {story.section1?.description}
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
              {story.section2?.eyebrow}
            </span>

            <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-black uppercase tracking-tight leading-[0.92] mb-5">
              <span className="block text-[#162B3A]">{story.section2?.headingLine1}</span>
              <span className="block text-white">
                {story.section2?.headingLine2}
              </span>
            </h2>

            <div className="w-12 h-1 bg-[#DB3E59] mb-5 sm:mb-6" />

            <p className="text-white font-bold sm:font-semibold text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-[480px]">
              {story.section2?.description}
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
              {story.section3?.eyebrow}
            </span>

            <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-black uppercase tracking-tight leading-[0.92] mb-5">
              <span className="block text-[#E52D50]">
                {story.section3?.heading}
              </span>
            </h2>

            <div className="w-12 h-1 bg-[#E52D50] mb-5 sm:mb-6" />

            <p className="text-white font-bold sm:font-semibold text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-[460px] mb-8">
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

