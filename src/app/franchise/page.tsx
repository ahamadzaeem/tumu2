"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PillButton from "@/components/PillButton";
import {
  CheckCircle2,
  Plus,
  Minus,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building,
  Store,
  Truck,
  ArrowRight
} from "lucide-react";
import { getSiteContent } from "@/lib/cms";

export default function FranchisePage() {
  const [content, setContent] = useState(getSiteContent());
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    contactPerson: "",
    company: "",
    contactNumber: "",
    email: "",
    format: "Mall Kiosk",
    comments: ""
  });

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHash = () => {
        if (window.location.hash === "#form" || window.location.hash === "#franchise-form") {
          const el = document.getElementById("form");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      };
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
        "Fill out our franchise enquiry form below or reach out to our team directly. We'll schedule an initial discussion and guide you through onboarding."
    },
    {
      question: "What is the initial investment?",
      answer:
        "Initial investment varies based on format (Kiosk vs Store vs Food Truck). We are designed with an easy-to-operate model, low capital requirements, and rapid payback targeting ROI within 12 months."
    },
    {
      question: "Do you provide comprehensive training and support?",
      answer:
        "Yes! You are never in business alone. TUMU provides complete support: Site Selection, Operations, Partner Support, Marketing, R&D, Purchasing, Staffing, and Network Oversight."
    },
    {
      question: "Where can I open a TUMU format?",
      answer:
        "We target prime shopping malls, transit hubs, lifestyle destinations, outdoor events, and high-footfall spots across the UAE and internationally."
    },
    {
      question: "How soon can I launch?",
      answer:
        "From signing to grand opening, onboarding typically takes between 4 to 8 weeks depending on site readiness and approvals."
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

  const franchise = content?.franchise || {
    hero: {
      eyebrow: "WHO SAYS NO TO A VIRAL FRANCHISE?",
      headingLine1: "BRING THE JAPAN-MADE",
      headingLine2: "TUMU EXPERIENCE.",
      description:
        "Bring the Japan-made TUMU experience to your market and become part of a brand people love and remember. With simple operations, attractive profit potential, and appeal across all age groups, TUMU is designed to fit into high-traffic locations and everyday destinations.",
      buttonText: "Get Franchise Profile",
      buttonLink: "#form"
    },
    promise: {
      headingLine1: "ROI WITHIN 12 MONTHS.",
      headingLine2: "WE DON'T JUST SAY IT. WE STAND BY IT.",
      headingLine3: "THAT'S OUR PROMISE.",
      description:
        "This promise is not just a verdict. It is the result of hours of research, strategic homework, and industry expertise. Crafted by chef ren and backed by a team with 22 years of hands-on experience in f&b operations, franchising, and marketing.we understand the business. We know the numbers. We know what it takes to make it work.",
      tagline1: "NO SPECULATION. NO EMPTY CLAIMS. NO EXCUSES.",
      tagline2: "JUST EXPERIENCE, STRATEGY, AND ACCOUNTABILITY",
      buttonText: "OWN A FRANCHISE",
      buttonLink: "#form"
    },
    formatsHeader: {
      headingLine1: "THREE FORMATS.",
      headingLine2: "ONE VIRAL BRAND. IT'S TUMU."
    },
    formats: [
      {
        id: "kiosk",
        name: "Kiosk",
        size: "150 sq. ft. approx.",
        description:
          "A compact, eye-catching island concept designed for high visibility, quick service, and maximum customer engagement.",
        image: "/images/tumu/docx_image_14.png"
      },
      {
        id: "store",
        name: "Store",
        size: "300 sq. ft. approx.",
        description:
          "An expanded store format offering enhanced service space and a more immersive TUMU experience.",
        image: "/images/tumu/docx_image_15.png"
      },
      {
        id: "truck",
        name: "TUMU outdoor food truck",
        size: "Versatile Mobile Concept",
        description:
          "A versatile mobile concept designed for events, festivals, catering, and outdoor activations, bringing TUMU’s freshly baked signature pastries directly to customers.",
        image: "/images/tumu/formats/truck_trailer.jpg"
      }
    ],
    support: {
      headingLine1: "NO RETAIL EXPERIENCE?",
      headingLine2: "NO WORRIES. YOU'RE NEVER IN BUSINESS ALONE.",
      headingLine3: "WE'RE WITH YOU EVERY STEP OF YOUR FRANCHISE JOURNEY.",
      description:
        "From day one to every day after.TUMU stands by you with continuous, hands-on support beyond training, every step of your franchise journey",
      pillars: [
        "SITE SELECTION",
        "OPERATIONS",
        "PARTNER SUPPORT",
        "MARKETING",
        "R&D",
        "PURCHASING",
        "STAFFING",
        "NETWORK OVERSIGHT"
      ]
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF4E7] flex flex-col selection:bg-[#DB3E59] selection:text-white">
      {/* Navigation Header */}
      <Header />

      {/* ══════════════════════════════════════════════════════════
          1st SECTION: WHO SAYS NO TO A VIRAL FRANCHISE? (HERO)
         ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[680px] sm:min-h-[760px] lg:min-h-[840px] bg-[#FAF4E7] overflow-hidden flex items-center pt-24 sm:pt-28 lg:pt-32">
        {/* Widescreen Background Composition (Mall Kiosk Render) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/tumu/docx_image_13.png"
            alt="WHO SAYS NO TO A VIRAL FRANCHISE? - TUMU Franchise"
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
            className="max-w-[440px] sm:max-w-[500px] lg:max-w-[540px] flex flex-col items-start bg-[#FAF4E7]/95 sm:bg-transparent p-6 sm:p-0 rounded-3xl backdrop-blur-sm sm:backdrop-blur-none"
          >
            {/* Heading exact as requested */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black uppercase tracking-tight leading-[0.98] mb-4 text-[#DB3E59]">
              {franchise.hero?.eyebrow || "WHO SAYS NO TO A VIRAL FRANCHISE?"}
            </h1>

            <div className="w-14 h-1.5 bg-[#162B3A] mb-5" />

            <p className="text-[#162B3A] font-semibold text-sm sm:text-base lg:text-[17px] leading-relaxed mb-8">
              {franchise.hero?.description}
            </p>

            <a href="#form">
              <PillButton variant="pink" showArrow className="px-8 py-3.5 text-sm sm:text-base font-black uppercase">
                {franchise.hero?.buttonText || "Get Franchise Profile"}
              </PillButton>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2nd SECTION: ROI WITHIN 12 MONTHS (THE PROMISE)
         ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#162B3A] text-white py-20 sm:py-28 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#DB3E59]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#5CBEB3]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Big Bold Statement */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#5CBEB3] mb-3">
                OUR COMMITMENT
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] mb-2 text-[#DB3E59]">
                {franchise.promise?.headingLine1 || "ROI WITHIN 12 MONTHS."}
              </h2>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight text-white mb-2">
                {franchise.promise?.headingLine2 || "WE DON'T JUST SAY IT. WE STAND BY IT."}
              </h3>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight text-[#5CBEB3] mb-6">
                {franchise.promise?.headingLine3 || "THAT'S OUR PROMISE."}
              </h3>

              <div className="w-16 h-1.5 bg-[#DB3E59] mb-6" />

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-8">
                <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#F7B7C6] mb-1">
                  {franchise.promise?.tagline1 || "NO SPECULATION. NO EMPTY CLAIMS. NO EXCUSES."}
                </p>
                <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#5CBEB3]">
                  {franchise.promise?.tagline2 || "JUST EXPERIENCE, STRATEGY, AND ACCOUNTABILITY"}
                </p>
              </div>

              <a href="#form">
                <PillButton variant="pink" showArrow className="px-8 py-3.5 text-sm sm:text-base font-black uppercase">
                  {franchise.promise?.buttonText || "OWN A FRANCHISE"}
                </PillButton>
              </a>
            </div>

            {/* Right Column: Narrative & Credibility */}
            <div className="lg:col-span-6 flex flex-col items-start bg-white/5 border border-white/10 p-8 sm:p-10 rounded-[32px] backdrop-blur-md">
              <span className="px-4 py-1.5 rounded-full bg-[#DB3E59]/20 text-[#F7B7C6] text-xs font-black uppercase tracking-wider mb-5">
                Built on Real Industry Muscle
              </span>

              <p className="text-white/90 font-medium text-base sm:text-lg leading-relaxed mb-6">
                {franchise.promise?.description}
              </p>

              <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-black text-[#DB3E59]">22+</span>
                  <span className="text-xs text-white/70 font-bold uppercase mt-1">
                    Years Combined F&B Experience
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-black text-[#5CBEB3]">Tokyo</span>
                  <span className="text-xs text-white/70 font-bold uppercase mt-1">
                    Authentic Japanese Pastry Origin
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3rd SECTION: THREE FORMATS. ONE VIRAL BRAND. IT'S TUMU.
         ══════════════════════════════════════════════════════════ */}
      <section id="formats" className="relative w-full bg-[#FAF4E7] py-20 sm:py-28 border-b border-[#162B3A]/5 scroll-mt-20">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          
          {/* Header */}
          <div className="flex flex-col items-start mb-14 sm:mb-16">
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-3">
              FLEXIBLE EXPANSION OPTIONS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#162B3A] leading-[0.95]">
              <span className="block text-[#DB3E59]">
                {franchise.formatsHeader?.headingLine1 || "THREE FORMATS."}
              </span>
              <span className="block text-[#162B3A]">
                {franchise.formatsHeader?.headingLine2 || "ONE VIRAL BRAND. IT'S TUMU."}
              </span>
            </h2>
            <div className="w-16 h-1.5 bg-[#DB3E59] mt-5" />
          </div>

          {/* 3 Formats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Format 1: Kiosk */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-lg group hover:shadow-2xl transition-all"
            >
              <div className="relative w-full h-[240px] sm:h-[280px] bg-[#FAF4E7] overflow-hidden">
                <Image
                  src="/images/tumu/docx_image_14.png"
                  alt="TUMU Kiosk - 150 sq. ft."
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#DB3E59] text-white text-xs font-black uppercase tracking-wider shadow">
                    Format 01
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A] mb-1">
                    Kiosk
                  </h3>
                  <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#DB3E59] mb-4">
                    150 sq. ft. approx.
                  </p>
                  <p className="text-sm text-[#162B3A]/80 font-medium leading-relaxed">
                    A compact, eye-catching island concept designed for high visibility, quick service, and maximum customer engagement.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#162B3A]/60">Mall Corridors & Atriums</span>
                  <a href="#form" className="text-xs font-black uppercase text-[#DB3E59] hover:underline flex items-center gap-1">
                    Enquire <span>→</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Format 2: Store */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-lg group hover:shadow-2xl transition-all"
            >
              <div className="relative w-full h-[240px] sm:h-[280px] bg-[#FAF4E7] overflow-hidden">
                <Image
                  src="/images/tumu/docx_image_15.png"
                  alt="TUMU Store - 300 sq. ft."
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#5CBEB3] text-[#162B3A] text-xs font-black uppercase tracking-wider shadow">
                    Format 02
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A] mb-1">
                    Store
                  </h3>
                  <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#5CBEB3] mb-4">
                    300 sq. ft. approx.
                  </p>
                  <p className="text-sm text-[#162B3A]/80 font-medium leading-relaxed">
                    An expanded store format offering enhanced service space and a more immersive TUMU experience.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#162B3A]/60">High-Street & Mall Boutiques</span>
                  <a href="#form" className="text-xs font-black uppercase text-[#DB3E59] hover:underline flex items-center gap-1">
                    Enquire <span>→</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Format 3: TUMU outdoor food truck */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-lg group hover:shadow-2xl transition-all"
            >
              <div className="relative w-full h-[240px] sm:h-[280px] bg-[#FAF4E7] overflow-hidden">
                <Image
                  src="/images/tumu/formats/truck_trailer.jpg"
                  alt="TUMU outdoor food truck"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#162B3A] text-white text-xs font-black uppercase tracking-wider shadow">
                    Format 03
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A] mb-1">
                    TUMU Outdoor
                  </h3>
                  <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#DB3E59] mb-4">
                    Food Truck
                  </p>
                  <p className="text-sm text-[#162B3A]/80 font-medium leading-relaxed">
                    A versatile mobile concept designed for events, festivals, catering, and outdoor activations, bringing TUMU’s freshly baked signature pastries directly to customers.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#162B3A]/60">Events, Festivals & Pop-ups</span>
                  <a href="#form" className="text-xs font-black uppercase text-[#DB3E59] hover:underline flex items-center gap-1">
                    Enquire <span>→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4th SECTION: NO RETAIL EXPERIENCE? NO WORRIES. (SUPPORT)
         ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#FAF4E7] py-20 sm:py-28 overflow-hidden border-b border-[#162B3A]/5">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          
          <div className="flex flex-col items-start max-w-4xl mb-12 sm:mb-16">
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-3">
              END-TO-END FRANCHISE SUPPORT
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[0.98] text-[#162B3A] mb-2">
              {franchise.support?.headingLine1 || "NO RETAIL EXPERIENCE?"}
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight text-[#DB3E59] mb-2">
              {franchise.support?.headingLine2 || "NO WORRIES. YOU'RE NEVER IN BUSINESS ALONE."}
            </h3>
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight leading-tight text-[#162B3A] mb-5">
              {franchise.support?.headingLine3 || "WE'RE WITH YOU EVERY STEP OF YOUR FRANCHISE JOURNEY."}
            </h4>

            <div className="w-16 h-1.5 bg-[#DB3E59] mb-5" />

            <p className="text-[#162B3A]/85 font-semibold text-sm sm:text-base lg:text-lg leading-relaxed">
              {franchise.support?.description}
            </p>
          </div>

          {/* 8 Support Pillars Grid (Exact list from docx) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {(
              franchise.support?.pillars || [
                "SITE SELECTION",
                "OPERATIONS",
                "PARTNER SUPPORT",
                "MARKETING",
                "R&D",
                "PURCHASING",
                "STAFFING",
                "NETWORK OVERSIGHT"
              ]
            ).map((pillar: string, idx: number) => (
              <div
                key={pillar}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-black/5 shadow-sm flex flex-col items-start justify-between group hover:border-[#DB3E59]/30 transition-all hover:-translate-y-1"
              >
                <div className="w-8 h-8 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] font-black text-xs flex items-center justify-center mb-3">
                  0{idx + 1}
                </div>
                <h4 className="text-xs sm:text-sm font-black text-[#162B3A] uppercase tracking-wide leading-snug">
                  {pillar}
                </h4>
              </div>
            ))}
          </div>

          {/* Support Banner Visual */}
          <div className="relative w-full h-[220px] sm:h-[320px] rounded-3xl overflow-hidden border border-black/5 shadow-lg">
            <Image
              src="/images/tumu/docx_image_16.png"
              alt="TUMU Comprehensive Support Journey"
              fill
              className="object-cover object-center"
              unoptimized
            />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5: FREQUENTLY ASKED QUESTIONS
         ══════════════════════════════════════════════════════════ */}
      <section id="faq" className="relative w-full bg-[#D9F4F6] py-20 sm:py-28 overflow-hidden scroll-mt-20">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
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

      {/* ══════════════════════════════════════════════════════════
          SECTION 6: EMBEDDED FRANCHISE APPLICATION FORM
         ══════════════════════════════════════════════════════════ */}
      <section id="form" className="relative w-full bg-[#FFA0B4] py-20 sm:py-28 overflow-hidden scroll-mt-24">
        <div className="absolute -top-12 -right-12 text-[180px] font-black text-white/10 select-none pointer-events-none leading-none tracking-tighter">
          TUMU
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Headline */}
            <div className="lg:col-span-5 flex flex-col items-start pt-2">
              <span className="font-black text-xs sm:text-sm uppercase tracking-[0.2em] text-[#DB3E59] mb-3 bg-white/40 px-3.5 py-1 rounded-full border border-[#DB3E59]/20">
                FRANCHISE APPLICATION
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black uppercase tracking-tight leading-[0.95] mb-5">
                <span className="block text-[#162B3A]">BRING TUMU</span>
                <span className="block text-[#162B3A]">
                  TO <span className="text-[#DB3E59]">YOUR CITY.</span>
                </span>
              </h2>

              <p className="text-base sm:text-lg font-semibold text-[#162B3A]/90 leading-relaxed mb-8">
                Take the first step toward owning a high-performing Japanese dessert franchise. Submit your details below to receive our confidential investor prospectus and store model breakdown.
              </p>

              <div className="flex flex-col gap-3 w-full">
                {[
                  "Complete Operations & Supply Chain Manual",
                  "Turnkey Equipment & Display Layouts",
                  "Target ROI Within 12 Months",
                  "Chef Ren's Proprietary Cream Formulations"
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#DB3E59] text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#162B3A]">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="lg:col-span-7 bg-white rounded-[32px] p-8 sm:p-12 shadow-2xl border border-black/5 w-full">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A] mb-3">
                    Application Received!
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-[#162B3A]/70 max-w-md">
                    Thank you for your interest in bringing TUMU to your market. Our franchise director will contact you within 24 to 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="border-b border-black/10 pb-4 mb-2">
                    <h3 className="text-xl sm:text-2xl font-black uppercase text-[#162B3A]">
                      Confidential Franchise Inquiry
                    </h3>
                    <p className="text-xs font-semibold text-[#162B3A]/60 mt-1">
                      Fill out this quick form and our partnership team will reach out.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="e.g. Sarah Al-Mansoor"
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                        Company / Investor Group
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Hospitality Group"
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        placeholder="+971 50 000 0000"
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                      Preferred Format
                    </label>
                    <select
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                    >
                      <option value="Mall Kiosk">Kiosk (150 sq. ft. approx.)</option>
                      <option value="Retail Outlet">Store (300 sq. ft. approx.)</option>
                      <option value="Food Truck">TUMU Outdoor Food Truck</option>
                      <option value="Multi-Unit / Master Franchise">Multi-Unit / Country Master Franchise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                      Target City, Location &amp; Comments
                    </label>
                    <textarea
                      rows={3}
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      placeholder="Tell us about your target location, malls, or any relevant experience..."
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-medium text-[#162B3A] focus:outline-none focus:border-[#DB3E59] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl active:scale-[0.99] cursor-pointer mt-2"
                  >
                    Submit Franchise Application
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
