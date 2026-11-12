"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductAnatomy from "@/components/ProductAnatomy";
import RealIngredients from "@/components/RealIngredients";
import { ArrowRight, Sparkles, Flame, Snowflake, Clock, Award } from "lucide-react";
import { getSiteContent } from "@/lib/cms";

export default function ProcessClient() {
  const [content, setContent] = useState(getSiteContent());

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const hero = content?.process?.hero || {
    eyebrow: "ARTISANAL CRAFTSMANSHIP • おいしさができるまで",
    headingLine1: "FROM OUR OVEN",
    headingLine2: "TO YOU.",
    description: "The secret behind the finest crispy cream-filled desserts and Japanese desserts in UAE: an obsession with texture, temperature contrast, and zero compromise on fresh ingredients."
  };

  const icons = [Flame, Sparkles, Snowflake, Award, Clock];
  const images = [
    "/images/tumu/process_01_bake.jpg",
    "/images/tumu/process_02_crunch.jpg",
    "/images/tumu/process_03_fill.jpg",
    "/images/tumu/process_04_finish.jpg",
    "/images/tumu/process_05_serve.jpg",
  ];

  const steps = (content?.process?.steps || []).map((stepItem: any, i: number) => ({
    num: stepItem.step || `0${i + 1}`,
    title: stepItem.title,
    kanji: stepItem.kanji,
    subtitle: stepItem.subtitle,
    description: stepItem.description,
    image: images[i] || images[0],
    icon: icons[i] || Sparkles,
  }));

  return (
    <main className="min-h-screen bg-[#FAF4E7] flex flex-col selection:bg-[#DB3E59] selection:text-white">
      <Header />

      {/* ─── HERO SECTION ─── */}
      <section className="relative w-full pt-32 sm:pt-40 pb-16 sm:pb-24 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[#DB3E59] text-xs sm:text-sm font-black uppercase tracking-[0.25em] block mb-3">
            {hero.eyebrow}
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#162B3A] mb-6 leading-[0.95]">
            {hero.headingLine1} <span className="text-[#DB3E59]">{hero.headingLine2}</span>
          </h1>
          <div className="w-16 h-1.5 bg-[#DB3E59] mx-auto rounded-full mb-6" />
          <p className="text-[#162B3A]/80 text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
            {hero.description}
          </p>
        </div>
      </section>

      {/* ─── 5-STEP ARTISANAL TIMELINE ─── */}
      <section className="relative w-full py-12 px-6 lg:px-12 max-w-[1440px] mx-auto pb-24">
        <div className="flex flex-col gap-12 sm:gap-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isEven = idx % 2 === 1;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-8 lg:gap-16 bg-white/70 backdrop-blur-sm p-6 sm:p-10 lg:p-12 rounded-[36px] border border-black/5 shadow-sm`}
              >
                {/* Visual Image */}
                <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-md group">
                  <Image
                    src={step.image}
                    alt={`${step.title} - Step ${step.num} of TUMU Japanese Cream Desserts Process`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white font-black text-xs uppercase tracking-wider flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-[#DB3E59]" />
                    <span>Step {step.num}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-black text-[#DB3E59] tracking-widest uppercase">
                      STEP {step.num}
                    </span>
                    <span className="text-xs font-bold text-[#162B3A]/60 tracking-wider">
                      {step.kanji}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[#162B3A] tracking-tight mb-2">
                    {step.title}
                  </h2>
                  <h3 className="text-base sm:text-lg font-bold text-[#5CBEB3] mb-4">
                    {step.subtitle}
                  </h3>

                  <p className="text-sm sm:text-base text-[#162B3A]/80 font-medium leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#162B3A] bg-[#FAF4E7] px-4 py-2 rounded-full border border-black/5">
                    <Sparkles className="w-4 h-4 text-[#DB3E59]" />
                    <span>Prepared live on-site across all Dubai &amp; UAE stores</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── PRODUCT ANATOMY STRIP ─── */}
      <ProductAnatomy />

      {/* ─── REAL INGREDIENTS ─── */}
      <RealIngredients />

      {/* ─── CTA FOOTER ─── */}
      <section className="w-full bg-[#FFA0B4] py-16 sm:py-20 text-center px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-2 bg-white/50 px-4 py-1 rounded-full">
            EXPERIENCE THE MAGIC
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#162B3A] mb-4 tracking-tight">
            Taste The Freshness Today
          </h2>
          <p className="text-sm sm:text-base text-[#162B3A]/85 font-semibold mb-8">
            Experience why TUMU is celebrated as the premier <strong>Japanese dessert shop Dubai</strong>. Order now or visit any location.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/flavours"
              className="px-8 py-4 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              Explore Flavours →
            </Link>
            <Link
              href="/locations"
              className="px-8 py-4 rounded-full bg-[#162B3A] hover:bg-black text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              View Locations →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

