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
  Minus
} from "lucide-react";

export default function FranchisePage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedFormat, setSelectedFormat] = useState<"ALL" | "KIOSK_1" | "KIOSK_2" | "STORE" | "TRUCK">("ALL");
  const [formData, setFormData] = useState({
    contactPerson: "",
    company: "",
    contactNumber: "",
    email: "",
    format: "Kiosk 1",
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
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black uppercase tracking-tight leading-[0.95] mb-5">
              <span className="block text-[#162B3A]">WHO SAYS NO</span>
              <span className="block text-[#DB3E59]">TO A VIRAL</span>
              <span className="block text-[#162B3A]">
                FRANCHISE<span className="text-[#DB3E59]">?</span>
              </span>
            </h1>

            <div className="w-12 h-1 bg-[#DB3E59] mb-5" />

            <p className="text-[#162B3A] font-semibold text-sm sm:text-base leading-relaxed max-w-[340px] sm:max-w-[370px] mb-8">
              Bring the Japan-made TUMU experience to your market and become part of a brand people love and remember. With simple operations, attractive profit potential, and appeal across all age groups, TUMU is designed to fit into high-traffic locations and everyday destinations.
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
              <span className="font-heading text-[18px] xs:text-[20px] sm:text-2xl lg:text-[26px] text-[#DB3E59] uppercase tracking-wide leading-tight mb-3 block">
                THREE FORMATS.
              </span>
              <h2 className="text-[34px] xs:text-[38px] sm:text-[46px] lg:text-5xl font-black uppercase tracking-tight leading-tight">
                <span className="block text-[#162B3A]">ONE VIRAL BRAND.</span>
                <span className="block text-[#DB3E59]">IT&apos;S TUMU.</span>
              </h2>
              <div className="w-12 h-1 bg-[#DB3E59] mt-4" />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {(
                [
                  { id: "ALL", label: "All Formats" },
                  { id: "KIOSK_1", label: "Kiosk 1" },
                  { id: "KIOSK_2", label: "Kiosk 2" },
                  { id: "STORE", label: "Store" },
                  { id: "TRUCK", label: "Outdoor Truck" },
                ] as const
              ).map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedFormat === fmt.id
                      ? "bg-[#DB3E59] text-white shadow-md scale-105"
                      : "bg-white/80 hover:bg-white text-[#162B3A] border border-black/5"
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-20 sm:gap-28">

            {/* ════════════════════════════════════════════════════════════
                FORMAT 1: KIOSK 1 (Island Concept)
               ════════════════════════════════════════════════════════════ */}
            {(selectedFormat === "ALL" || selectedFormat === "KIOSK_1") && (
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
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#162B3A]">
                      Kiosk 1 <span className="text-[#DB3E59]">- 150 sq. ft. approx.</span>
                    </h3>
                    <p className="text-sm font-semibold text-[#162B3A]/70 mt-1">
                      A compact, eye-catching island concept designed for high visibility, quick service, and maximum customer engagement.
                    </p>
                  </div>

                  {/* Quick Specs Badges (Clean & Simple without symbols) */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-[#162B3A]">
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      Footprint: <strong>150 sq. ft. approx.</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      Setup: <strong>3 – 4 Weeks</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      Staff: <strong>1 – 2 Baristas</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] border border-[#DB3E59]/20 font-black">
                      Low CapEx &amp; Fast ROI
                    </span>
                  </div>
                </div>

                {/* Visual Showcase (All 3 Relevant Images) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group">
                    <Image
                      src="/images/tumu/formats/kiosk1_exterior.jpg"
                      alt="TUMU Kiosk 1 Branded Corner & Neon Logo"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group">
                    <Image
                      src="/images/tumu/formats/kiosk1_counter.jpg"
                      alt="TUMU Kiosk 1 Service Counter Perspective"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group">
                    <Image
                      src="/images/tumu/formats/kiosk1_front.jpg"
                      alt="TUMU Kiosk 1 Front Elevation & Service Window"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href="#form"
                    onClick={() => setFormData({ ...formData, format: "Kiosk 1" })}
                    className="px-7 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <span>Apply for Kiosk 1</span>
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            )}


            {/* ════════════════════════════════════════════════════════════
                FORMAT 2: KIOSK 2 (Canopy Design)
               ════════════════════════════════════════════════════════════ */}
            {(selectedFormat === "ALL" || selectedFormat === "KIOSK_2") && (
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
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#162B3A]">
                      Kiosk 2 <span className="text-[#DB3E59]">- 150 sq. ft. approx.</span>
                    </h3>
                    <p className="text-sm font-semibold text-[#162B3A]/70 mt-1">
                      A vibrant signature kiosk featuring curved canopy architecture and prominent vertical neon signage.
                    </p>
                  </div>

                  {/* Quick Specs Badges (Clean & Simple without symbols) */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-[#162B3A]">
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      Footprint: <strong>150 sq. ft. approx.</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      Setup: <strong>3 – 4 Weeks</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      Staff: <strong>1 – 2 Baristas</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] border border-[#DB3E59]/20 font-black">
                      High-Traffic Mall Turnkey
                    </span>
                  </div>
                </div>

                {/* Visual Showcase (All 3 Relevant Images) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group">
                    <Image
                      src="/images/tumu/formats/kiosk_elevation.jpg"
                      alt="TUMU Kiosk 2 Front Elevation"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group">
                    <Image
                      src="/images/tumu/formats/kiosk_perspective.jpg"
                      alt="TUMU Kiosk 2 3D Perspective"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group">
                    <Image
                      src="/images/tumu/formats/kiosk_side.jpg"
                      alt="TUMU Kiosk 2 Canopy & Vertical Neon"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href="#form"
                    onClick={() => setFormData({ ...formData, format: "Kiosk 2" })}
                    className="px-7 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <span>Apply for Kiosk 2</span>
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            )}


            {/* ════════════════════════════════════════════════════════════
                FORMAT 3: STORE (Retail Outlet)
               ════════════════════════════════════════════════════════════ */}
            {(selectedFormat === "ALL" || selectedFormat === "STORE") && (
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
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#162B3A]">
                      Store <span className="text-[#DB3E59]">- 300 sq. ft. approx.</span>
                    </h3>
                    <p className="text-sm font-semibold text-[#162B3A]/70 mt-1">
                      An expanded store format offering enhanced service space and a more immersive TUMU experience.
                    </p>
                  </div>

                  {/* Quick Specs Badges (Clean & Simple without symbols) */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-[#162B3A]">
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      Footprint: <strong>300 sq. ft. approx.</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      Setup: <strong>5 – 8 Weeks</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      Staff: <strong>2 – 4 Staff</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#55D2DF]/20 text-[#162B3A] border border-[#55D2DF]/40 font-black">
                      Live Bakery Theater &amp; Cafe Seating
                    </span>
                  </div>
                </div>

                {/* Visual Showcase (2 Best Images) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group">
                    <Image
                      src="/images/tumu/formats/outlet_storefront.jpg"
                      alt="TUMU Retail Outlet Storefront"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group">
                    <Image
                      src="/images/tumu/formats/outlet_counter.jpg"
                      alt="TUMU Retail Outlet Service Counter"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href="#form"
                    onClick={() => setFormData({ ...formData, format: "Store" })}
                    className="px-7 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <span>Apply for Store</span>
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            )}


            {/* ════════════════════════════════════════════════════════════
                FORMAT 4: OUTDOOR TRUCK
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
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#162B3A]">
                      Outdoor <span className="text-[#DB3E59]">Truck</span>
                    </h3>
                    <p className="text-sm font-semibold text-[#162B3A]/70 mt-1">
                      A versatile mobile concept designed for events, festivals, catering, and outdoor activations.
                    </p>
                  </div>

                  {/* Quick Specs Badges (Clean & Simple without symbols) */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-[#162B3A]">
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      Mobility: <strong>Versatile Mobile Concept</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      Setup: <strong>Plug &amp; Play</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                      Staff: <strong>1 – 2 Operators</strong>
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#55D2DF]/20 text-[#162B3A] border border-[#55D2DF]/40 font-black">
                      Events, Festivals &amp; Catering
                    </span>
                  </div>
                </div>

                {/* Visual Showcase (Only 1 Image) */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 group">
                  <Image
                    src="/images/tumu/formats/truck_trailer.jpg"
                    alt="TUMU Mobile Food Truck Trailer"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href="#form"
                    onClick={() => setFormData({ ...formData, format: "Outdoor Truck" })}
                    className="px-7 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <span>Apply for Outdoor Truck</span>
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

        {/* Text Overlay (LEFT ALIGNED - STRICTLY INSIDE THE OFF-WHITE LEFT AREA) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 flex justify-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[380px] xs:max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] flex flex-col items-start max-sm:bg-[#FAF4E7]/95 max-sm:p-6 max-sm:rounded-3xl max-sm:shadow-xl max-sm:backdrop-blur-md max-sm:border max-sm:border-black/5"
          >
            <h2 className="text-[20px] xs:text-[23px] sm:text-[29px] lg:text-[34px] xl:text-[38px] font-black uppercase tracking-tight leading-[1.05] mb-4">
              <span className="block text-[#DB3E59] whitespace-nowrap">ROI WITHIN 12 MONTHS.</span>
              <span className="block text-[#162B3A] whitespace-nowrap">WE DON&apos;T JUST SAY IT.</span>
              <span className="block text-[#DB3E59] whitespace-nowrap">WE STAND BY IT.</span>
              <span className="block text-[#162B3A] whitespace-nowrap">THAT&apos;S OUR PROMISE.</span>
            </h2>

            <div className="w-12 h-1 bg-[#DB3E59] mb-4" />

            <p className="text-[#162B3A] font-semibold text-xs sm:text-sm leading-relaxed max-w-[380px] sm:max-w-[410px] mb-6">
              This promise is not just a verdict. It is the result of hours of research, strategic homework, and industry expertise. Crafted by chef ren and backed by a team with 22 years of hands-on experience in f&b operations, franchising, and marketing.we understand the business. We know the numbers. We know what it takes to make it work.
            </p>

            <div className="p-4 rounded-2xl bg-white/95 border border-black/5 shadow-sm mb-6 w-full">
              <p className="text-[11px] sm:text-xs font-black uppercase text-[#DB3E59] tracking-wider mb-1">
                NO SPECULATION. NO EMPTY CLAIMS. NO EXCUSES.
              </p>
              <p className="text-[11px] sm:text-xs font-black uppercase text-[#162B3A] tracking-wider">
                JUST EXPERIENCE, STRATEGY, AND ACCOUNTABILITY
              </p>
            </div>

            <a href="#form">
              <PillButton variant="pink" showArrow className="px-8 py-3.5 text-xs sm:text-sm font-black uppercase">
                OWN A FRANCHISE
              </PillButton>
            </a>
          </motion.div>
        </div>
      </section>


      {/* ─── SECTION: COMPREHENSIVE SUPPORT ─── */}
      <section className="relative w-full bg-[#FAF4E7] py-16 sm:py-24 overflow-hidden border-b border-[#162B3A]/5">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Text Column with Right Border Divider */}
          <div className="lg:col-span-7 flex flex-col items-start lg:pr-12 lg:border-r border-[#DB3E59]/20">
            <span className="font-heading text-[15px] xs:text-[17px] sm:text-lg lg:text-xl text-[#DB3E59] uppercase tracking-wide leading-tight mb-3 block">
              NO RETAIL EXPERIENCE?
            </span>

            <h2 className="text-[28px] xs:text-[32px] sm:text-[38px] lg:text-[42px] font-black uppercase tracking-tight leading-[0.98] mb-3">
              <span className="block text-[#162B3A]">NO WORRIES.</span>
              <span className="block text-[#DB3E59]">YOU&apos;RE NEVER IN BUSINESS ALONE.</span>
            </h2>

            <h3 className="text-lg xs:text-xl sm:text-2xl font-black uppercase tracking-tight leading-snug text-[#162B3A] mb-4">
              WE&apos;RE WITH YOU EVERY STEP OF YOUR FRANCHISE JOURNEY.
            </h3>

            <div className="w-12 h-1 bg-[#DB3E59] mb-5" />

            <p className="text-[#162B3A]/85 font-semibold text-sm sm:text-base leading-relaxed max-w-[500px] mb-6">
              From day one to every day after. TUMU stands by you with continuous, hands-on support beyond training, every step of your franchise journey
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/5 shadow-sm w-full">
              <p className="text-xs sm:text-sm font-black uppercase text-[#162B3A] tracking-wider leading-relaxed">
                SITE SELECTION • OPERATIONS • PARTNER SUPPORT • MARKETING • R&amp;D • PURCHASING • STAFFING • NETWORK OVERSIGHT
              </p>
            </div>
          </div>

          {/* Right Column: 4 Clean Vertical Support Features (No Card Enclosures) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-7 w-full lg:pl-8">
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
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {[
                          { key: "Kiosk 1", label: "Kiosk 1", sub: "150 sq. ft." },
                          { key: "Kiosk 2", label: "Kiosk 2", sub: "150 sq. ft." },
                          { key: "Store", label: "Store", sub: "300 sq. ft." },
                          { key: "Outdoor Truck", label: "Outdoor Truck", sub: "Mobile Trailer" },
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
