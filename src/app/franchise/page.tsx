"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
  CheckCircle2,
  Plus,
  Minus,
  Truck
} from "lucide-react";

export default function FranchisePage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedFormat, setSelectedFormat] = useState<"ALL" | "KIOSK" | "OUTLET" | "TRUCK">("ALL");
  const [formData, setFormData] = useState({
    contactPerson: "",
    company: "",
    contactNumber: "",
    email: "",
    format: "Mall Kiosk",
    comments: ""
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHash = () => {
        if (window.location.hash === "#form" || window.location.hash === "#franchise-form") {
          const el = document.getElementById("form");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      };
      // Check immediately
      setTimeout(handleHash, 100);
      window.addEventListener("hashchange", handleHash);
      return () => window.removeEventListener("hashchange", handleHash);
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqList = [
    {
      question: "How do I become a franchise partner?",
      answer:
        "Fill out our franchise enquiry form or reach out to our team directly at franchise@tumu.com. We'll schedule an initial discussion and guide you through our 5-step onboarding process."
    },
    {
      question: "What is the initial investment?",
      answer:
        "Initial investment varies based on store location and format (kiosk vs standalone outlet). Entry budgets typically range from $50,000 to $150,000 with high gross margins (up to 82%)."
    },
    {
      question: "Do you provide training and support?",
      answer:
        "Yes! We provide complete end-to-end support including site selection, store layout design, team training, operational SOPs, branded packaging, and launch marketing."
    },
    {
      question: "Where can I open a TUMU outlet?",
      answer:
        "We target high foot-traffic locations including premium shopping malls, transit hubs, commercial dining centers, and popular retail strips across Asia-Pacific and global key markets."
    },
    {
      question: "How soon can I start?",
      answer:
        "From agreement signing to grand opening, the onboarding process typically takes between 4 to 8 weeks depending on site readiness and local municipal approvals."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        contactPerson: "",
        company: "",
        contactNumber: "",
        email: "",
        format: "Mall Kiosk",
        comments: ""
      });
    }, 5000);
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

            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black uppercase tracking-tight leading-[0.95] mb-5">
              <span className="block text-[#162B3A]">WHO SAYS NO</span>
              <span className="block text-[#DB3E59]">TO A VIRAL</span>
              <span className="block text-[#162B3A]">
                FRANCHISE<span className="text-[#DB3E59]">?</span>
              </span>
            </h1>

            <div className="w-12 h-1 bg-[#DB3E59] mb-5" />

            <p className="text-[#162B3A] font-semibold text-sm sm:text-base leading-relaxed max-w-[340px] sm:max-w-[370px] mb-8">
              Bring the <strong className="font-black text-[#162B3A]">Japan-made TUMU experience</strong> to your market and become part of a brand people love and remember. With simple operations, attractive profit potential, and appeal across all age groups, TUMU is designed to fit into high-traffic locations and everyday destinations.
            </p>

            <a href="#form">
              <PillButton variant="pink" showArrow>
                Get Franchise Profile
              </PillButton>
            </a>
          </motion.div>
        </div>
      </section>


      {/* ─── 3 HIGH-IMPACT FRANCHISE FORMATS: KIOSK, OUTLET & TRUCK ─── */}
      <section id="formats" className="relative w-full bg-[#FAF4E7] py-20 sm:py-28 border-b border-[#162B3A]/5 scroll-mt-20">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="flex flex-col items-start">
              <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-3">
                THREE FORMATS.
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#162B3A] leading-tight">
                ONE VIRAL BRAND. <span className="text-[#DB3E59]">IT'S TUMU.</span>
              </h2>
              <div className="w-12 h-1 bg-[#DB3E59] mt-4" />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {(["ALL", "KIOSK", "OUTLET", "TRUCK"] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedFormat === fmt
                      ? "bg-[#DB3E59] text-white shadow-md scale-105"
                      : "bg-white/80 hover:bg-white text-[#162B3A] border border-black/5"
                  }`}
                >
                  {fmt === "ALL" && "All Formats"}
                  {fmt === "KIOSK" && "01. Mall Kiosk"}
                  {fmt === "OUTLET" && "02. Retail Outlet"}
                  {fmt === "TRUCK" && "03. Food Truck"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-20 sm:gap-28">

            {/* ════════════════════════════════════════════════════════════
                FORMAT 1: MALL KIOSK
               ════════════════════════════════════════════════════════════ */}
            {(selectedFormat === "ALL" || selectedFormat === "KIOSK") && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-8 bg-white/70 backdrop-blur-sm p-6 sm:p-10 lg:p-12 rounded-[36px] border border-black/5 shadow-xl"
              >
                {/* Header & Badges */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3.5 py-1 rounded-full bg-[#55D2DF]/20 text-[#162B3A] font-black text-xs uppercase tracking-wider">
                        Format 01
                      </span>
                      <span className="text-xs font-bold text-[#DB3E59] tracking-widest uppercase">
                        
                      </span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#162B3A]">
                      Kiosk <span className="text-[#DB3E59]">- 150 sq. ft. approx.</span>
                    </h3>
                    <p className="text-sm font-semibold text-[#162B3A]/70 mt-1">
                      A compact, eye-catching island concept designed for high visibility, quick service, and maximum customer engagement.
                    </p>
                  </div>

                  {/* Quick Specs Badges */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-[#162B3A]">
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      📐 Footprint: <strong>80 – 150 sq.ft.</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      ⚡ Setup: <strong>3 – 4 Weeks</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      👥 Staff: <strong>1 – 2 Baristas</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] border border-[#DB3E59]/20 font-black">
                      💰 Low CapEx &amp; Fast ROI
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#162B3A]/85 font-medium leading-relaxed max-w-4xl">
                  Our signature island kiosk maximizes 360-degree visibility with illuminated neon brand arches, iconic curved cyan canopies, and integrated cream-injection taps. Fast customer turnover and high impulse sales with compact space requirements.
                </p>

                {/* Visual Showcase (3-Image Composition) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group">
                    <Image
                      src="/images/tumu/formats/kiosk_elevation.jpg"
                      alt="TUMU Mall Kiosk Front Elevation"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                      Front Elevation
                    </div>
                  </div>

                  <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group">
                    <Image
                      src="/images/tumu/formats/kiosk_perspective.jpg"
                      alt="TUMU Mall Kiosk 3D Perspective"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                      Perspective Angle
                    </div>
                  </div>

                  <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group">
                    <Image
                      src="/images/tumu/formats/kiosk_side.jpg"
                      alt="TUMU Mall Kiosk Side Canopy"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                      Canopy &amp; Vertical Neon
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href="#form"
                    onClick={() => setFormData({ ...formData, format: "Mall Kiosk" })}
                    className="px-7 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <span>Apply for Mall Kiosk</span>
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            )}


            {/* ════════════════════════════════════════════════════════════
                FORMAT 2: RETAIL OUTLET
               ════════════════════════════════════════════════════════════ */}
            {(selectedFormat === "ALL" || selectedFormat === "OUTLET") && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-8 bg-white/70 backdrop-blur-sm p-6 sm:p-10 lg:p-12 rounded-[36px] border border-black/5 shadow-xl"
              >
                {/* Header & Badges */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3.5 py-1 rounded-full bg-[#DB3E59]/20 text-[#DB3E59] font-black text-xs uppercase tracking-wider">
                        Format 02
                      </span>
                      <span className="text-xs font-bold text-[#162B3A] tracking-widest uppercase">
                        
                      </span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#162B3A]">
                      Store <span className="text-[#DB3E59]">- 300 sq. ft. approx.</span>
                    </h3>
                    <p className="text-sm font-semibold text-[#162B3A]/70 mt-1">
                      An expanded store format offering enhanced service space and a more immersive TUMU experience.
                    </p>
                  </div>

                  {/* Quick Specs Badges */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-[#162B3A]">
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      📐 Footprint: <strong>250 – 600 sq.ft.</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      ⚡ Setup: <strong>5 – 8 Weeks</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      👥 Staff: <strong>2 – 4 Staff</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#55D2DF]/20 text-[#162B3A] border border-[#55D2DF]/40 font-black">
                      ✨ Live Bakery Theater &amp; Cafe Seating
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#162B3A]/85 font-medium leading-relaxed max-w-4xl">
                  The complete TUMU brand sanctuary. Features a front service ordering counter, open-concept live filling station where guests watch smooth cream piped into warm, golden crunchy sticks, and optional cafe seating for prolonged dining and higher beverage margins.
                </p>

                {/* Visual Showcase (2-Image Side by Side) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group">
                    <Image
                      src="/images/tumu/formats/outlet_storefront.jpg"
                      alt="TUMU Retail Outlet Storefront"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                      Full Storefront &amp; Live Barista Bar
                    </div>
                  </div>

                  <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group">
                    <Image
                      src="/images/tumu/formats/outlet_counter.jpg"
                      alt="TUMU Retail Outlet Service Counter"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                      POS Service Counter &amp; Illuminated Logo
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href="#form"
                    onClick={() => setFormData({ ...formData, format: "Retail Outlet" })}
                    className="px-7 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <span>Apply for Retail Outlet</span>
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            )}


            {/* ════════════════════════════════════════════════════════════
                FORMAT 3: FOOD TRUCK & TRAILER
               ════════════════════════════════════════════════════════════ */}
            {(selectedFormat === "ALL" || selectedFormat === "TRUCK") && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-8 bg-white/70 backdrop-blur-sm p-6 sm:p-10 lg:p-12 rounded-[36px] border border-black/5 shadow-xl"
              >
                {/* Header & Badges */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3.5 py-1 rounded-full bg-[#162B3A] text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Format 03</span>
                      </span>
                      <span className="text-xs font-bold text-[#DB3E59] tracking-widest uppercase">
                        
                      </span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#162B3A]">
                      TUMU outdoor <span className="text-[#DB3E59]">food truck</span>
                    </h3>
                    <p className="text-sm font-semibold text-[#162B3A]/70 mt-1">
                      A versatile mobile concept designed for events, festivals, catering, and outdoor activations.
                    </p>
                  </div>

                  {/* Quick Specs Badges */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-[#162B3A]">
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      🚚 Mobility: <strong>Versatile Mobile Concept</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      ⚡ Setup: <strong>Plug &amp; Play</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      👥 Staff: <strong>1 – 2 Operators</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#55D2DF]/20 text-[#162B3A] border border-[#55D2DF]/40 font-black">
                      🎪 Events, Festivals &amp; Catering
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#162B3A]/85 font-medium leading-relaxed max-w-4xl">
                  A versatile mobile concept designed for events, festivals, catering, and outdoor activations, bringing TUMU’s freshly baked signature pastries directly to customers.
                </p>

                {/* Visual Showcase (Wide Trailer Hero) */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 group">
                  <Image
                    src="/images/tumu/formats/truck_trailer.jpg"
                    alt="TUMU Mobile Food Truck Trailer"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-black uppercase tracking-wider">
                    Custom Japanese Mobile Trailer Unit
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href="#form"
                    onClick={() => setFormData({ ...formData, format: "Food Truck" })}
                    className="px-7 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <span>Apply for Food Truck</span>
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            )}

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
              ROI WITHIN 12 MONTHS.
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black uppercase tracking-tight leading-[0.95] mb-4">
              <span className="block text-[#162B3A]">WE DON'T JUST SAY IT.</span>
              <span className="block text-[#DB3E59]">WE STAND BY IT.</span>
              <span className="block text-[#162B3A]">THAT'S OUR PROMISE.</span>
            </h2>

            <div className="w-12 h-1 bg-[#DB3E59] mb-4" />

            <p className="text-[#162B3A] font-semibold text-xs sm:text-sm leading-relaxed max-w-[350px] mb-6">
              This promise is not just a verdict. It is the result of hours of research, strategic homework, and industry expertise. Crafted by chef ren and backed by a team with 22 years of hands-on experience in f&b operations, franchising, and marketing.we understand the business. We know the numbers. We know what it takes to make it work.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/90 border border-black/5 shadow-sm mb-6 w-full">
              <p className="text-[11px] font-black uppercase text-[#DB3E59] tracking-wider mb-1">
                NO SPECULATION. NO EMPTY CLAIMS. NO EXCUSES.
              </p>
              <p className="text-[11px] font-black uppercase text-[#162B3A] tracking-wider">
                JUST EXPERIENCE, STRATEGY, AND ACCOUNTABILITY
              </p>
            </div>

            <a href="#form" className="mb-6">
              <PillButton variant="pink" showArrow>
                OWN A FRANCHISE
              </PillButton>
            </a>

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
      <section id="process" className="relative w-full bg-[#55D2DF] py-16 sm:py-24 overflow-hidden scroll-mt-20">
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
              NO RETAIL EXPERIENCE? NO WORRIES.
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-black uppercase tracking-tight leading-[1.02] mb-4">
              <span className="block text-[#162B3A]">YOU'RE NEVER IN</span>
              <span className="block text-[#DB3E59]">BUSINESS ALONE.</span>
              <span className="block text-[#162B3A] text-lg sm:text-xl lg:text-[22px] mt-2 font-bold normal-case">
                We're with you every step of your franchise journey.
              </span>
            </h2>

            <div className="w-10 h-1 bg-[#DB3E59] mb-4" />

            <p className="text-[#162B3A]/85 font-semibold text-xs sm:text-sm leading-relaxed max-w-[400px] mb-4">
              From day one to every day after.TUMU stands by you with continuous, hands-on support beyond training, every step of your franchise journey
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {[
                "SITE SELECTION", "OPERATIONS", "PARTNER SUPPORT", "MARKETING",
                "R&D", "PURCHASING", "STAFFING", "NETWORK OVERSIGHT"
              ].map(p => (
                <span key={p} className="px-2.5 py-1 rounded-lg bg-white border border-black/5 text-[10px] font-black uppercase text-[#DB3E59]">
                  {p}
                </span>
              ))}
            </div>
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


      {/* ─── SECTION 5.5: FREQUENTLY ASKED QUESTIONS (CYAN BACKGROUND ACCORDION) ─── */}
      <section id="faq" className="relative w-full bg-[#D9F4F6] py-20 sm:py-28 overflow-hidden scroll-mt-20">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Title Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-3">
              FREQUENTLY ASKED
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none mb-4 whitespace-nowrap">
              <span className="text-[#162B3A]">QUEST</span>
              <span className="text-[#DB3E59]">IONS.</span>
            </h2>

            <div className="w-12 h-1 bg-[#DB3E59]" />
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 flex flex-col w-full divide-y divide-[#162B3A]/15 border-t border-b border-[#162B3A]/15">
            {faqList.map((item, idx) => (
              <div key={idx} className="py-5 sm:py-6 flex flex-col">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex items-center justify-between w-full text-left gap-4 focus:outline-none group cursor-pointer"
                >
                  <span className="text-base sm:text-lg lg:text-xl font-bold text-[#162B3A] group-hover:text-[#DB3E59] transition-colors">
                    {item.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center shrink-0">
                    {openFaq === idx ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {openFaq === idx && (
                  <p className="mt-3 text-sm sm:text-base font-medium text-[#162B3A]/80 leading-relaxed pr-8 animate-in fade-in duration-200">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ─── SECTION 6: EMBEDDED FRANCHISE APPLICATION FORM ─── */}
      <section id="form" className="relative w-full bg-[#FFA0B4] py-20 sm:py-28 overflow-hidden scroll-mt-24">
        {/* Subtle decorative background watermark */}
        <div className="absolute -top-12 -right-12 text-[180px] font-black text-white/10 select-none pointer-events-none leading-none tracking-tighter">
          TUMU
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Headline & Value Prop */}
            <div className="lg:col-span-5 flex flex-col items-start pt-2">
              <span className="font-black text-xs sm:text-sm uppercase tracking-[0.2em] text-[#DB3E59] mb-3 bg-white/40 px-3.5 py-1 rounded-full border border-[#DB3E59]/20">
                FRANCHISE APPLICATION</span>

              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black uppercase tracking-tight leading-[0.95] mb-5">
                <span className="block text-[#162B3A]">BRING TUMU</span>
                <span className="block text-[#162B3A]">
                  TO <span className="text-[#DB3E59]">YOUR CITY.</span>
                </span>
              </h2>

              <div className="w-14 h-1.5 bg-[#DB3E59] rounded-full mb-6" />

              <p className="text-[#162B3A]/85 font-medium text-base sm:text-lg leading-relaxed mb-8">
                Join Japan’s most exciting artisanal crunchy cream stick phenomenon. Select your preferred concept—<strong>Mall Kiosk</strong>, <strong>Retail Outlet</strong>, or <strong>Food Truck</strong>—and get in touch directly with our business development team.
              </p>

              {/* Perks Checklist */}
              <div className="flex flex-col gap-4 w-full text-[#162B3A] font-semibold text-sm sm:text-base">
                <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/60">
                  <div className="w-7 h-7 rounded-full bg-[#DB3E59] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    ✓
                  </div>
                  <span>Turnkey store setup &amp; custom Japanese equipment</span>
                </div>

                <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/60">
                  <div className="w-7 h-7 rounded-full bg-[#DB3E59] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    ✓
                  </div>
                  <span>Direct proprietary ingredient &amp; crust supply chain</span>
                </div>

                <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/60">
                  <div className="w-7 h-7 rounded-full bg-[#DB3E59] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    ✓
                  </div>
                  <span>Comprehensive staff pastry training &amp; SOP manuals</span>
                </div>

                <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/60">
                  <div className="w-7 h-7 rounded-full bg-[#DB3E59] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    ✓
                  </div>
                  <span>High gross margin with quick operational payback</span>
                </div>
              </div>
            </div>

            {/* Right Column: Embedded Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-[#FAF4E7] rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-2xl border border-black/10 relative overflow-hidden">
                
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <CheckCircle2 className="w-20 h-20 text-[#DB3E59] mb-5 animate-bounce" />
                    <h3 className="text-3xl font-black text-[#162B3A] uppercase tracking-tight mb-3">
                      Enquiry Submitted!
                    </h3>
                    <p className="text-base sm:text-lg font-semibold text-[#162B3A]/80 max-w-md mx-auto mb-8 leading-relaxed">
                      Thank you for your interest in the TUMU {formData.format} franchise. Our regional franchise director will review your submission and contact you within 24–48 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3.5 rounded-full bg-[#162B3A] text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-all"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#162B3A]">
                        Franchise Inquiry Form
                      </h3>
                      <p className="text-sm font-semibold text-[#162B3A]/70 mt-1">
                        Please fill in your details below. All fields marked with * are required.
                      </p>
                    </div>

                    {/* Format Selector Pills */}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-2">
                        Preferred Franchise Format *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { key: "Mall Kiosk", label: "Mall Kiosk", sub: "80–200 sq.ft." },
                          { key: "Retail Outlet", label: "Retail Outlet", sub: "250–600 sq.ft." },
                          { key: "Food Truck", label: "Food Truck", sub: "Mobile Trailer" },
                        ].map((fmt) => {
                          const isActive = formData.format === fmt.key;
                          return (
                            <button
                              type="button"
                              key={fmt.key}
                              onClick={() => setFormData({ ...formData, format: fmt.key })}
                              className={`px-4 py-3 rounded-2xl border text-left transition-all cursor-pointer ${
                                isActive
                                  ? "bg-[#DB3E59] border-[#DB3E59] text-white shadow-md scale-[1.02]"
                                  : "bg-white/80 hover:bg-white border-black/10 text-[#162B3A]"
                              }`}
                            >
                              <div className="text-xs font-black uppercase tracking-wider">{fmt.label}</div>
                              <div className={`text-[11px] font-semibold ${isActive ? "text-white/80" : "text-[#162B3A]/60"}`}>
                                {fmt.sub}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formData.contactPerson}
                          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                          className="w-full px-5 py-3.5 rounded-2xl bg-white border border-black/15 focus:outline-none focus:border-[#DB3E59] text-sm font-semibold text-[#162B3A] shadow-sm transition-all placeholder:text-[#162B3A]/40"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                          Company / Organization *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Company or Individual"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-5 py-3.5 rounded-2xl bg-white border border-black/15 focus:outline-none focus:border-[#DB3E59] text-sm font-semibold text-[#162B3A] shadow-sm transition-all placeholder:text-[#162B3A]/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                          Contact Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 / International number"
                          value={formData.contactNumber}
                          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                          className="w-full px-5 py-3.5 rounded-2xl bg-white border border-black/15 focus:outline-none focus:border-[#DB3E59] text-sm font-semibold text-[#162B3A] shadow-sm transition-all placeholder:text-[#162B3A]/40"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-5 py-3.5 rounded-2xl bg-white border border-black/15 focus:outline-none focus:border-[#DB3E59] text-sm font-semibold text-[#162B3A] shadow-sm transition-all placeholder:text-[#162B3A]/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                        Target Location &amp; Comments *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us about your target city, preferred mall/location, investment readiness, or timeline..."
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-2xl bg-white border border-black/15 focus:outline-none focus:border-[#DB3E59] text-sm font-semibold text-[#162B3A] shadow-sm resize-none transition-all placeholder:text-[#162B3A]/40"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 sm:py-5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-sm sm:text-base uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl active:scale-98 flex items-center justify-center gap-3 cursor-pointer"
                      >
                        <span>Submit Franchise Application</span>
                        <span className="text-lg">→</span>
                      </button>
                    </div>

                    <p className="text-[11px] font-semibold text-[#162B3A]/60 text-center">
                      🔒 Your information is confidential and strictly used for TUMU franchise qualification.
                    </p>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </main>
  );
}
