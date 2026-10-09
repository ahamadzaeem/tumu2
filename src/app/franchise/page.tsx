"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PillButton from "@/components/PillButton";
import {
  Gem,
  Heart,
  TrendingUp,
  Store,
  GraduationCap,
  Megaphone,
  Package,
  BarChart3,
  X,
  CheckCircle2
} from "lucide-react";

export default function FranchisePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    contactPerson: "",
    company: "",
    contactNumber: "",
    email: "",
    comments: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormData({
        contactPerson: "",
        company: "",
        contactNumber: "",
        email: "",
        comments: ""
      });
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#FAF4E7] flex flex-col selection:bg-[#DB3E59] selection:text-white">
      {/* Navigation Header */}
      <Header />

      {/* ─── SECTION 1: HERO (A SWEET BUSINESS OPPORTUNITY.) ─── */}
      <section className="relative w-full min-h-[680px] sm:min-h-[760px] lg:min-h-[840px] bg-[#FAF4E7] overflow-hidden flex items-center pt-24 sm:pt-28 lg:pt-32">
        {/* Widescreen Background Composition (Mall Kiosk Render) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/tumu/franchise_hero_kiosk.png"
            alt="TUMU Kiosk Franchise Opportunity"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>

        {/* Text Overlay (Left Aligned - STRICTLY CONTAINED WITHIN OFF-WHITE AREA) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] flex flex-col items-start max-sm:bg-[#FAF4E7]/95 max-sm:p-6 max-sm:rounded-3xl max-sm:shadow-xl max-sm:backdrop-blur-md max-sm:border max-sm:border-black/5"
          >
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-3">
              FRANCHISE WITH TUMU
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[46px] font-black uppercase tracking-tight leading-[0.95] mb-6">
              <span className="block text-[#162B3A]">A SWEET</span>
              <span className="block text-[#DB3E59]">BUSINESS</span>
              <span className="block text-[#162B3A]">
                OPPORTUNITY<span className="text-[#DB3E59]">.</span>
              </span>
            </h1>

            <p className="text-[#162B3A] font-semibold text-sm sm:text-base leading-relaxed max-w-[340px] sm:max-w-[370px] mb-8">
              Bring Japan&apos;s loved dessert experience to your city. Simple operations, high margins, and a brand people remember.
            </p>

            <PillButton variant="pink" showArrow onClick={() => setModalOpen(true)}>
              Enquire Now
            </PillButton>
          </motion.div>
        </div>
      </section>


      {/* ─── STORE FORMAT & KIOSK GALLERY SECTION (2X SIZE) ─── */}
      <section className="relative w-full bg-[#FAF4E7] py-20 sm:py-28 border-b border-[#162B3A]/5">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          
          <div className="flex flex-col items-start mb-10 sm:mb-14">
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-3">
              RETAIL CONCEPT & STORE DESIGN
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#162B3A]">
              HIGH-IMPACT <span className="text-[#DB3E59]">STORE FORMATS.</span>
            </h2>
            <div className="w-12 h-1 bg-[#DB3E59] mt-4" />
          </div>

          {/* 8-Card Grid Layout featuring BOTH original renders and new storefronts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {/* Image 1: Original Gallery 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative aspect-[16/9] rounded-3xl sm:rounded-[32px] overflow-hidden bg-black/5 border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src="/images/tumu/franchise_gallery_1.jpg"
                alt="TUMU Kiosk Store Render Front View"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                unoptimized
              />
            </motion.div>

            {/* Image 2: Original Gallery 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative aspect-[16/9] rounded-3xl sm:rounded-[32px] overflow-hidden bg-black/5 border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src="/images/tumu/franchise_gallery_2.jpg"
                alt="TUMU Kiosk Side View"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                unoptimized
              />
            </motion.div>

            {/* Image 3: Original Gallery 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative aspect-[16/9] rounded-3xl sm:rounded-[32px] overflow-hidden bg-black/5 border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src="/images/tumu/franchise_gallery_3.jpg"
                alt="TUMU Kiosk Mall Layout"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                unoptimized
              />
            </motion.div>

            {/* Image 4: Original Gallery 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative aspect-[16/9] rounded-3xl sm:rounded-[32px] overflow-hidden bg-black/5 border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src="/images/tumu/franchise_gallery_4.jpg"
                alt="TUMU Neon Branding Close-up"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                unoptimized
              />
            </motion.div>

            {/* Image 5: New Store 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="group relative aspect-[16/9] rounded-3xl sm:rounded-[32px] overflow-hidden bg-black/5 border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src="/images/tumu/franchise_new_1.jpg"
                alt="TUMU Storefront 1"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                unoptimized
              />
            </motion.div>

            {/* Image 6: New Store 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="group relative aspect-[16/9] rounded-3xl sm:rounded-[32px] overflow-hidden bg-black/5 border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src="/images/tumu/franchise_new_2.jpg"
                alt="TUMU Storefront 2"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                unoptimized
              />
            </motion.div>

            {/* Image 7: New Store 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="group relative aspect-[16/9] rounded-3xl sm:rounded-[32px] overflow-hidden bg-black/5 border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src="/images/tumu/franchise_new_3.jpg"
                alt="TUMU Storefront 3"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                unoptimized
              />
            </motion.div>

            {/* Image 8: New Store 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="group relative aspect-[16/9] rounded-3xl sm:rounded-[32px] overflow-hidden bg-black/5 border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src="/images/tumu/franchise_new_4.jpg"
                alt="TUMU Storefront 4"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                unoptimized
              />
            </motion.div>
          </div>

        </div>
      </section>
      <section className="relative w-full min-h-[680px] sm:min-h-[760px] lg:min-h-[840px] bg-[#FAF4E7] overflow-hidden flex items-center py-16 sm:py-24">
        {/* Background Image Composition (Left diagonal pastry layout) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/tumu/franchise_section_2.png"
            alt="Why TUMU - Product Lineup"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>

        {/* Text Overlay & 2x2 Feature Grid (LEFT ALIGNED - STRICTLY INSIDE THE OFF-WHITE LEFT AREA) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 flex justify-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[340px] sm:max-w-[360px] lg:max-w-[380px] flex flex-col items-start max-sm:bg-[#FAF4E7]/95 max-sm:p-6 max-sm:rounded-3xl max-sm:shadow-xl max-sm:backdrop-blur-md max-sm:border max-sm:border-black/5"
          >
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-3">
              WHY TUMU
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black uppercase tracking-tight leading-[0.95] mb-4">
              <span className="block text-[#162B3A]">MORE THAN</span>
              <span className="block text-[#162B3A]">
                JUST <span className="text-[#DB3E59]">A DESSERT.</span>
              </span>
            </h2>

            <div className="w-12 h-1 bg-[#DB3E59] mb-4" />

            <p className="text-[#162B3A] font-semibold text-xs sm:text-sm leading-relaxed max-w-[350px] mb-8">
              A unique, premium, and highly craveable dessert experience inspired by Japan — now ready to grow with partners like you.
            </p>

            {/* 2x2 Feature Grid (With Pristine White Backdrop Cards for 100% Legibility) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4.5 w-full">
              {/* Feature 1 */}
              <div className="flex flex-col items-start bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-md border border-black/5 transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center mb-2.5 shrink-0">
                  <Gem className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#162B3A] uppercase mb-1">
                  Unique Product
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-[#162B3A]/80 leading-snug">
                  A distinctive dessert concept.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-start bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-md border border-black/5 transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center mb-2.5 shrink-0">
                  <Heart className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#162B3A] uppercase mb-1">
                  Proven Concept
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-[#162B3A]/80 leading-snug">
                  Built around a memorable product experience.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-start bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-md border border-black/5 transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center mb-2.5 shrink-0">
                  <TrendingUp className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#162B3A] uppercase mb-1">
                  Growing Demand
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-[#162B3A]/80 leading-snug">
                  Designed for today&apos;s grab-and-go audience.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-start bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-md border border-black/5 transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center mb-2.5 shrink-0">
                  <Store className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#162B3A] uppercase mb-1">
                  Strong Brand Identity
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-[#162B3A]/80 leading-snug">
                  Japanese-inspired, instantly recognizable.
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </section>


      {/* ─── SECTION 3: STRONG UNIT ECONOMICS (HIGH MARGINS.) ─── */}
      <section className="relative w-full bg-[#FAF4E7] py-16 sm:py-24 border-t border-b border-[#162B3A]/5">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 flex flex-col items-start">
          
          {/* Section Header */}
          <span className="font-black text-xs sm:text-sm uppercase tracking-[0.2em] text-[#DB3E59] mb-3">
            STRONG UNIT ECONOMICS
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-black uppercase tracking-tight leading-[0.92] mb-4">
            <span className="block text-[#162B3A]">HIGH MARGINS.</span>
            <span className="block text-[#DB3E59]">GREATER POTENTIAL<span className="text-[#DB3E59]">.</span></span>
          </h2>

          <div className="w-10 h-1 bg-[#DB3E59] mb-4" />

          <p className="text-[#162B3A]/85 font-semibold text-base sm:text-lg leading-relaxed max-w-[500px] mb-12 sm:mb-16">
            A profitable, scalable business model built for today&apos;s dessert culture.
          </p>

          {/* 4 Metrics Grid with Vertical Divider Lines */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 w-full">
            {/* Metric 1 */}
            <div className="flex flex-col items-start lg:pr-8 lg:border-r border-[#DB3E59]/25">
              <span className="text-5xl sm:text-6xl lg:text-[76px] font-black text-[#DB3E59] tracking-tight leading-none mb-3">
                82%
              </span>
              <span className="text-sm sm:text-base font-bold text-[#162B3A]/90 max-w-[160px] leading-snug">
                Single Pastry Gross Margin
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-start lg:px-8 lg:border-r border-[#DB3E59]/25">
              <span className="text-5xl sm:text-6xl lg:text-[76px] font-black text-[#DB3E59] tracking-tight leading-none mb-3">
                75%
              </span>
              <span className="text-sm sm:text-base font-bold text-[#162B3A]/90 max-w-[160px] leading-snug">
                5-Pc Combo Box Gross Margin
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-start lg:px-8 lg:border-r border-[#DB3E59]/25">
              <span className="text-5xl sm:text-6xl lg:text-[76px] font-black text-[#DB3E59] tracking-tight leading-none mb-3">
                65%
              </span>
              <span className="text-sm sm:text-base font-bold text-[#162B3A]/90 max-w-[160px] leading-snug">
                Fruit-Based Coffee Gross Margin
              </span>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col items-start lg:pl-8">
              <span className="text-5xl sm:text-6xl lg:text-[76px] font-black text-[#DB3E59] tracking-tight leading-none mb-3">
                NO
              </span>
              <span className="text-sm sm:text-base font-bold text-[#162B3A]/90 max-w-[160px] leading-snug">
                Royalty Fees
              </span>
            </div>
          </div>

        </div>
      </section>


      {/* ─── SECTION 4: PARTNERSHIP PROCESS. (CYAN BACKGROUND WITH HORIZONTAL TIMELINE) ─── */}
      <section className="relative w-full bg-[#55D2DF] py-16 sm:py-24 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Title Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.2em] text-[#DB3E59] mb-2">
              A SIMPLE
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black uppercase tracking-tight leading-[0.95] mb-3">
              <span className="block text-[#162B3A]">PARTNERSHIP</span>
              <span className="block text-[#DB3E59]">PROCESS<span className="text-[#DB3E59]">.</span></span>
            </h2>

            <div className="w-10 h-1 bg-[#DB3E59]" />
          </div>

          {/* Right Horizontal Timeline Column */}
          <div className="lg:col-span-8 w-full relative pt-2">
            {/* Connecting Horizontal Line */}
            <div className="hidden sm:block absolute top-[22px] left-[16px] right-[16px] h-[2px] bg-[#DB3E59]/40 z-0" />

            {/* 5 Steps Row */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-3 relative z-10 w-full">
              {/* Step 1 */}
              <div className="flex flex-col items-start">
                <div className="w-8 h-8 rounded-full bg-[#DB3E59] text-white font-bold text-xs flex items-center justify-center mb-3 shadow-sm ring-4 ring-[#55D2DF]">
                  01
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#162B3A] uppercase mb-1">
                  Enquire
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-[#162B3A]/85 leading-tight">
                  Share your interest with our team.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-start">
                <div className="w-8 h-8 rounded-full bg-[#DB3E59] text-white font-bold text-xs flex items-center justify-center mb-3 shadow-sm ring-4 ring-[#55D2DF]">
                  02
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#162B3A] uppercase mb-1">
                  Discussion
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-[#162B3A]/85 leading-tight">
                  Understand the location and opportunity.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-start">
                <div className="w-8 h-8 rounded-full bg-[#DB3E59] text-white font-bold text-xs flex items-center justify-center mb-3 shadow-sm ring-4 ring-[#55D2DF]">
                  03
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#162B3A] uppercase mb-1">
                  Agreement
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-[#162B3A]/85 leading-tight">
                  Finalize terms and onboarding.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-start">
                <div className="w-8 h-8 rounded-full bg-[#DB3E59] text-white font-bold text-xs flex items-center justify-center mb-3 shadow-sm ring-4 ring-[#55D2DF]">
                  04
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#162B3A] uppercase mb-1">
                  Setup & Training
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-[#162B3A]/85 leading-tight">
                  Store setup, team training and launch plan.
                </p>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-start">
                <div className="w-8 h-8 rounded-full bg-[#DB3E59] text-white font-bold text-xs flex items-center justify-center mb-3 shadow-sm ring-4 ring-[#55D2DF]">
                  05
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#162B3A] uppercase mb-1">
                  Grand Opening
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-[#162B3A]/85 leading-tight">
                  Start serving TUMU in your city.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ─── SECTION 5: COMPREHENSIVE SUPPORT (WITH YOU AT EVERY STEP.) ─── */}
      <section className="relative w-full bg-[#FAF4E7] py-16 sm:py-24 overflow-hidden border-b border-[#162B3A]/5">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Text Column with Right Border Divider */}
          <div className="lg:col-span-5 flex flex-col items-start lg:pr-12 lg:border-r border-[#DB3E59]/20">
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.2em] text-[#DB3E59] mb-3">
              COMPREHENSIVE SUPPORT
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-black uppercase tracking-tight leading-[0.95] mb-4">
              <span className="block text-[#162B3A]">WITH YOU</span>
              <span className="block text-[#162B3A]">
                AT <span className="text-[#DB3E59]">EVERY STEP.</span>
              </span>
            </h2>

            <div className="w-10 h-1 bg-[#DB3E59] mb-4" />

            <p className="text-[#162B3A]/85 font-semibold text-xs sm:text-sm leading-relaxed max-w-[400px]">
              From setup to scale, we provide everything you need to run a successful TUMU store.
            </p>
          </div>

          {/* Right Column: 4 Clean Vertical Support Features (No Card Enclosures) */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-7 w-full lg:pl-4">
            {/* Support 1 */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base font-black text-[#162B3A] uppercase mb-0.5">
                  Training & SOPs
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#162B3A]/75 leading-tight">
                  Complete training for your team.
                </p>
              </div>
            </div>

            {/* Support 2 */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center shrink-0">
                <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base font-black text-[#162B3A] uppercase mb-0.5">
                  Pre-opening Support
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#162B3A]/75 leading-tight">
                  Marketing and launch support.
                </p>
              </div>
            </div>

            {/* Support 3 */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center shrink-0">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base font-black text-[#162B3A] uppercase mb-0.5">
                  Branded Assets
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#162B3A]/75 leading-tight">
                  Packaging, uniforms and store visuals.
                </p>
              </div>
            </div>

            {/* Support 4 */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base font-black text-[#162B3A] uppercase mb-0.5">
                  Ongoing Guidance
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#162B3A]/75 leading-tight">
                  Operational support and growth strategies.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ─── SECTION 6: CTA (BRING TUMU TO YOUR CITY.) ─── */}
      <section className="relative w-full bg-[#FFA0B4] py-16 sm:py-24 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-start max-w-[540px]">
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.2em] text-[#DB3E59] mb-3">
              LET&apos;S GROW TOGETHER
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black uppercase tracking-tight leading-[0.95] mb-4">
              <span className="block text-[#162B3A]">BRING TUMU</span>
              <span className="block text-[#162B3A]">
                TO <span className="text-[#DB3E59]">YOUR CITY.</span>
              </span>
            </h2>

            <div className="w-10 h-1 bg-[#DB3E59] mb-4" />

            <p className="text-[#162B3A]/85 font-semibold text-sm sm:text-base leading-relaxed">
              Be part of a fast-growing dessert brand with a strong identity, loyal customers, and high returns.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-base uppercase tracking-wide transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-3"
            >
              <span>Enquire Now</span>
              <span className="text-lg">→</span>
            </button>
          </div>

        </div>
      </section>


      {/* ─── FRANCHISE APPLICATION MODAL ─── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[540px] bg-[#FAF4E7] rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#162B3A] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-[#DB3E59] mb-4 animate-bounce" />
                  <h3 className="text-2xl font-black text-[#162B3A] uppercase mb-2">
                    Enquiry Received!
                  </h3>
                  <p className="text-base font-semibold text-[#162B3A]/80 max-w-xs">
                    Thank you for your interest in TUMU Franchise. Our team will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
                  <div className="text-center mb-2">
                    <p className="text-sm font-semibold text-[#162B3A]/80 leading-relaxed max-w-md mx-auto">
                      Fill in the inquiry form and someone from our franchise department will get in touch with you.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162B3A] mb-1.5">Contact Person</label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-full bg-white border border-black/15 focus:outline-none focus:border-[#DB3E59] text-sm font-semibold text-[#162B3A] shadow-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162B3A] mb-1.5">Company / Organization</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-full bg-white border border-black/15 focus:outline-none focus:border-[#DB3E59] text-sm font-semibold text-[#162B3A] shadow-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162B3A] mb-1.5">Contact Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-full bg-white border border-black/15 focus:outline-none focus:border-[#DB3E59] text-sm font-semibold text-[#162B3A] shadow-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162B3A] mb-1.5">Email address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-full bg-white border border-black/15 focus:outline-none focus:border-[#DB3E59] text-sm font-semibold text-[#162B3A] shadow-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#162B3A] mb-1.5">Comments</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white border border-black/15 focus:outline-none focus:border-[#DB3E59] text-sm font-semibold text-[#162B3A] shadow-sm resize-none transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-sm uppercase tracking-wide transition-all shadow-md active:scale-95"
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </main>
  );
}
