"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PillButton from "@/components/PillButton";
import { getSiteContent } from "@/lib/cms";
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
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";

const FORMAT_GALLERY = [
  { src: "/images/tumu/formats/kiosk1_exterior.jpg", alt: "TUMU Kiosk 1 Branded Corner & Neon Logo", label: "1. KIOSK – TUMU Premium Island" },
  { src: "/images/tumu/formats/kiosk1_counter.jpg", alt: "TUMU Kiosk 1 Service Counter Perspective", label: "1. KIOSK – TUMU Premium Island" },
  { src: "/images/tumu/formats/kiosk1_front.jpg", alt: "TUMU Kiosk 1 Front Elevation & Service Window", label: "1. KIOSK – TUMU Premium Island" },
  { src: "/images/tumu/formats/kiosk_elevation.jpg", alt: "TUMU Kiosk 2 Front Elevation", label: "2. KIOSK – TUMU Express Stop" },
  { src: "/images/tumu/formats/kiosk_perspective.jpg", alt: "TUMU Kiosk 2 3D Perspective", label: "2. KIOSK – TUMU Express Stop" },
  { src: "/images/tumu/formats/kiosk_side.jpg", alt: "TUMU Kiosk 2 Canopy & Vertical Neon", label: "2. KIOSK – TUMU Express Stop" },
  { src: "/images/tumu/formats/outlet_storefront.jpg", alt: "TUMU Retail Outlet Storefront", label: "3. TUMU Experience Store" },
  { src: "/images/tumu/formats/outlet_counter.jpg", alt: "TUMU Retail Outlet Service Counter", label: "3. TUMU Experience Store" },
  { src: "/images/tumu/formats/truck_trailer.jpg", alt: "TUMU Go Mobile Food Truck Trailer", label: "4. TUMU Go – Mobile Truck" },
];

export default function FranchisePage() {
  const [content, setContent] = useState(getSiteContent());
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const franchiseHero = (content?.franchise as any)?.hero || {};
  const cmsFormats = (content?.franchise as any)?.formats || [];

  const getFormatMeta = (formatId: string, fallback: { name: string; setup?: string; size?: string; staff: string; cost: string; roi: string; description: string }) => {
    const fmt = cmsFormats.find((f: any) => f.id === formatId);
    return {
      name: fmt?.name || fallback.name,
      setup: fmt?.setup || fallback.setup,
      size: fmt?.size || fallback.size,
      staff: fmt?.staff || fallback.staff,
      cost: fmt?.cost || fallback.cost,
      roi: fmt?.roi || fallback.roi,
      description: fmt?.description || fallback.description,
    };
  };

  const getFormatGallery = (formatId: string, fallbackIndices: number[]) => {
    const fmt = cmsFormats.find((f: any) => f.id === formatId);
    if (fmt?.gallery && Array.isArray(fmt.gallery) && fmt.gallery.length > 0) {
      return fmt.gallery.map((g: any) => ({
        src: g.src,
        alt: g.alt || fmt.name,
        label: fmt.name,
      }));
    }
    return fallbackIndices.map((idx) => FORMAT_GALLERY[idx]);
  };

  const galleryItems = React.useMemo(() => {
    const f1 = getFormatGallery("kiosk_1", [0, 1, 2]);
    const f2 = getFormatGallery("kiosk_2", [3, 4, 5]);
    const f3 = getFormatGallery("store", [6, 7]);
    const f4 = getFormatGallery("truck", [8]);
    return [...f1, ...f2, ...f3, ...f4];
  }, [cmsFormats]);

  const openLightboxBySrc = (src: string) => {
    const idx = galleryItems.findIndex((item) => item.src === src);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    contactPerson: "",
    company: "",
    contactNumber: "",
    email: "",
    format: "1. KIOSK – TUMU Premium Island",
    comments: ""
  });

  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % galleryItems.length));
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + galleryItems.length) % galleryItems.length));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, galleryItems.length]);

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

  const faqList: { question: string; answer: string; bullets?: string[] }[] = [
    {
      question: "How can I become a franchise partner?",
      answer:
        "To get started, simply fill out our franchise enquiry form or contact our team directly at franchise@tumuofficial.com Once we receive your enquiry, we'll arrange an initial discussion to learn more about your goals and guide you through our simple 5-step franchise onboarding process."
    },
    {
      question: "What is the initial investment?",
      answer:
        "The initial investment varies depending on the store location and format (kiosk or full-sized store). Entry-level investment typically starts from USD 150,000. The projected ROI is designed to be achieved within 12 months, subject to the outlet's size and location."
    },
    {
      question: "What kind of support do franchise partners receive?",
      answer:
        "Yes! We provide comprehensive end-to-end support, covering every stage of your franchise journey, including site selection, store layout and design, team recruitment and training, operational SOPs, financial planning, and launch marketing."
    },
    {
      question: "Where Can I Open a TUMU Outlet?",
      answer:
        "TUMU is ideal for high-footfall locations where customers seek a quick, affordable treat. Our preferred locations include:",
      bullets: [
        "Shopping malls and food courts",
        "Metro stations and airports",
        "Cinemas and entertainment centers",
        "Hotels and petrol stations",
        "Universities and campuses",
        "Theme parks and attractions",
        "Sports venues and event spaces",
        "Beaches, waterfronts, and popular retail streets"
      ]
    },
    {
      question: "How long does it take to open a TUMU franchise?",
      answer:
        "From signing the franchise agreement to the grand opening, the process typically takes 4 to 8 weeks, depending on site readiness, fit-out completion, and local municipal approvals."
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

      {/* ─── SECTION 1: HERO (WHO SAYS NO TO A VIRAL FRANCHISE?) ─── */}
      <section className="relative w-full bg-[#FAF4E7] overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Franchise Headline & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black uppercase tracking-tight leading-[0.94] mb-5">
              <span className="block text-[#162B3A]">{franchiseHero.headingLine1 || "WHO SAYS NO"}</span>
              <span className="block text-[#DB3E59]">{franchiseHero.headingLine2 || "TO A VIRAL"}</span>
              <span className="block text-[#162B3A]">
                {(franchiseHero.headingLine3 || "FRANCHISE?").replace(/\?$/, "")}<span className="text-[#DB3E59]">?</span>
              </span>
            </h1>

            <div className="w-12 h-1 bg-[#DB3E59] mb-6" />

            <p className="text-[#162B3A]/85 font-semibold text-base sm:text-lg leading-relaxed max-w-[500px] mb-8">
              {franchiseHero.description || "Bring the Japan-made TUMU experience to your market and become part of a brand people love and remember. With simple operations, attractive profit potential, and appeal across all age groups, TUMU is designed to fit into high-traffic locations and everyday destinations."}
            </p>

            <a href={franchiseHero.buttonLink || "#form"}>
              <PillButton variant="pink" showArrow>
                {franchiseHero.buttonText || "Get Franchise Profile"}
              </PillButton>
            </a>
          </motion.div>

          {/* Right Column: Cutout Kiosk Outlet with Lady + Brand Teal Capsule Backdrop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Solid Brand Teal Finger/Capsule Shape Behind Outlet (Different Angle & Brand Color) */}
            <div className="absolute -right-24 sm:-right-28 lg:-right-32 top-1/2 -translate-y-1/2 w-[380px] sm:w-[500px] lg:w-[620px] h-[150px] sm:h-[200px] lg:h-[240px] bg-[#28B4AB] rounded-full rotate-[22deg] pointer-events-none z-0" />

            <div className="relative z-10 w-full aspect-[772/650] max-w-[620px]">
              <Image
                src="/images/tumu/formats/kiosk_hero_cutout.png"
                alt="TUMU Kiosk Franchise Outlet"
                fill
                className="object-contain object-center drop-shadow-[0_24px_40px_rgba(0,0,0,0.18)]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>


      {/* ─── SECTION 2: WHY TUMU / ROI ─── */}
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
              <span className="block text-[#DB3E59] whitespace-nowrap">ROI WITHIN 12 MONTHS</span>
              <span className="block text-[#162B3A] whitespace-nowrap">WE DON&apos;T JUST SAY IT</span>
              <span className="block text-[#DB3E59] whitespace-nowrap">WE STAND BY IT</span>
              <span className="block text-[#162B3A] whitespace-nowrap">THAT&apos;S OUR PROMISE</span>
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


      {/* ─── SECTION 3: 3 HIGH-IMPACT FRANCHISE FORMATS: KIOSK, OUTLET & TRUCK ─── */}
      <section id="formats" className="relative w-full bg-[#FAF4E7] py-20 sm:py-28 scroll-mt-20">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          
          <div className="flex flex-col items-start mb-12 sm:mb-16">
            <span className="font-heading text-[18px] xs:text-[20px] sm:text-2xl lg:text-[26px] text-[#DB3E59] uppercase tracking-wide leading-tight mb-3 block">
              FOUR FORMATS
            </span>
            <h2 className="text-[34px] xs:text-[38px] sm:text-[46px] lg:text-5xl font-black uppercase tracking-tight leading-tight">
              <span className="block text-[#162B3A]">ONE VIRAL BRAND</span>
              <span className="block text-[#DB3E59]">IT&apos;S TUMU</span>
            </h2>
            <div className="w-12 h-1 bg-[#DB3E59] mt-4" />
          </div>

          <div className="flex flex-col gap-20 sm:gap-28">

            {/* ════════════════════════════════════════════════════════════
                FORMAT 1: KIOSK 1 (Island Concept)
               ════════════════════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8 bg-white/70 backdrop-blur-sm p-6 sm:p-10 lg:p-12 rounded-[36px] border border-black/5 shadow-xl"
            >
              {/* Header & Badges */}
              {(() => {
                const f1 = getFormatMeta("kiosk_1", {
                  name: "1. KIOSK – TUMU Premium Island",
                  setup: "3–4 Weeks",
                  staff: "2 + 1 Supervisor",
                  cost: "Low",
                  roi: "Less than 12 Months",
                  description: "A compact, eye-catching island concept designed for high visibility, quick service, and maximum customer engagement.",
                });
                const [prefix, suffix] = f1.name.includes("–") ? f1.name.split("–") : [f1.name, ""];
                return (
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/10">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#162B3A]">
                        {prefix.trim()}{suffix ? <> <span className="text-[#DB3E59]">– {suffix.trim()}</span></> : null}
                      </h3>
                      <p className="text-sm font-semibold text-[#162B3A]/70 mt-1">
                        {f1.description}
                      </p>
                    </div>

                    {/* Quick Specs Badges */}
                    <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-[#162B3A]">
                      <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                        Setup: <strong>{f1.setup}</strong>
                      </span>
                      <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                        Staff: <strong>{f1.staff}</strong>
                      </span>
                      <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                        Cost: <strong>{f1.cost}</strong>
                      </span>
                      <span className="px-4 py-2 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] border border-[#DB3E59]/20 font-black">
                        ROI: <strong>{f1.roi}</strong>
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Visual Showcase (Dynamic Gallery Images) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {getFormatGallery("kiosk_1", [0, 1, 2]).map((img: any, idx: number) => (
                  <button
                    key={`${img.src}-${idx}`}
                    type="button"
                    onClick={() => openLightboxBySrc(img.src)}
                    className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group cursor-zoom-in text-left"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      unoptimized={img.src?.startsWith("data:")}
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>


            {/* ════════════════════════════════════════════════════════════
                FORMAT 2: KIOSK 2 (Canopy Design)
               ════════════════════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8 bg-white/70 backdrop-blur-sm p-6 sm:p-10 lg:p-12 rounded-[36px] border border-black/5 shadow-xl"
            >
              {/* Header & Badges */}
              {(() => {
                const f2 = getFormatMeta("kiosk_2", {
                  name: "2. KIOSK – TUMU Express Stop",
                  setup: "3–4 Weeks",
                  staff: "2 + 1 Supervisor",
                  cost: "Low",
                  roi: "Less than 12 Months",
                  description: "A vibrant signature kiosk featuring curved canopy architecture and prominent vertical neon signage.",
                });
                const [prefix, suffix] = f2.name.includes("–") ? f2.name.split("–") : [f2.name, ""];
                return (
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/10">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#162B3A]">
                        {prefix.trim()}{suffix ? <> <span className="text-[#DB3E59]">– {suffix.trim()}</span></> : null}
                      </h3>
                      <p className="text-sm font-semibold text-[#162B3A]/70 mt-1">
                        {f2.description}
                      </p>
                    </div>

                    {/* Quick Specs Badges */}
                    <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-[#162B3A]">
                      <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                        Setup: <strong>{f2.setup}</strong>
                      </span>
                      <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                        Staff: <strong>{f2.staff}</strong>
                      </span>
                      <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                        Cost: <strong>{f2.cost}</strong>
                      </span>
                      <span className="px-4 py-2 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] border border-[#DB3E59]/20 font-black">
                        ROI: <strong>{f2.roi}</strong>
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Visual Showcase (Dynamic Gallery Images) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {getFormatGallery("kiosk_2", [3, 4, 5]).map((img: any, idx: number) => (
                  <button
                    key={`${img.src}-${idx}`}
                    type="button"
                    onClick={() => openLightboxBySrc(img.src)}
                    className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group cursor-zoom-in text-left"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      unoptimized={img.src?.startsWith("data:")}
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>


            {/* ════════════════════════════════════════════════════════════
                FORMAT 3: STORE (Retail Outlet)
               ════════════════════════════════════════════════════════════ */}
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
                    3. TUMU <span className="text-[#DB3E59]">Experience Store</span>
                  </h3>
                  <p className="text-sm font-semibold text-[#162B3A]/70 mt-1">
                    An expanded flagship store format offering enhanced service space and a more immersive TUMU experience.
                  </p>
                </div>

                {/* Quick Specs Badges */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-[#162B3A]">
                  <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                    Staff: <strong>3 + 1 Supervisor</strong>
                  </span>
                  <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                    Cost: <strong>Medium</strong>
                  </span>
                  <span className="px-4 py-2 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] border border-[#DB3E59]/20 font-black">
                    ROI: <strong>12–15 Months</strong>
                  </span>
                </div>
              </div>

              {/* Visual Showcase (Dynamic Gallery Images) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {getFormatGallery("store", [6, 7]).map((img: any, idx: number) => (
                  <button
                    key={`${img.src}-${idx}`}
                    type="button"
                    onClick={() => openLightboxBySrc(img.src)}
                    className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-black/10 group cursor-zoom-in text-left"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      unoptimized={img.src?.startsWith("data:")}
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>


            {/* ════════════════════════════════════════════════════════════
                FORMAT 4: OUTDOOR TRUCK
               ════════════════════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8 bg-white/70 backdrop-blur-sm p-6 sm:p-10 lg:p-12 rounded-[36px] border border-black/5 shadow-xl"
            >
              {/* Header & Badges */}
              {(() => {
                const f4 = getFormatMeta("truck", {
                  name: "4. TUMU Go – Mobile Truck",
                  size: "5 m × 2.5 m",
                  staff: "2",
                  cost: "Approx. USD 50K",
                  roi: "Less than 6 Months",
                  description: "A versatile mobile concept designed for events, festivals, catering, and outdoor activations.",
                });
                const [prefix, suffix] = f4.name.includes("–") ? f4.name.split("–") : [f4.name, ""];
                return (
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/10">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#162B3A]">
                        {prefix.trim()}{suffix ? <> <span className="text-[#DB3E59]">– {suffix.trim()}</span></> : null}
                      </h3>
                      <p className="text-sm font-semibold text-[#162B3A]/70 mt-1">
                        {f4.description}
                      </p>
                    </div>

                    {/* Quick Specs Badges */}
                    <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-[#162B3A]">
                      <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                        Size: <strong>{f4.size}</strong>
                      </span>
                      <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                        Staff: <strong>{f4.staff}</strong>
                      </span>
                      <span className="px-4 py-2 rounded-full bg-[#FAF4E7] border border-black/5">
                        Cost: <strong>{f4.cost}</strong>
                      </span>
                      <span className="px-4 py-2 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] border border-[#DB3E59]/20 font-black">
                        ROI: <strong>{f4.roi}</strong>
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Visual Showcase (Dynamic Gallery Images) */}
              {(() => {
                const truckImgs = getFormatGallery("truck", [8]);
                return (
                  <div className={truckImgs.length === 1 ? "" : "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"}>
                    {truckImgs.map((img: any, idx: number) => (
                      <button
                        key={`${img.src}-${idx}`}
                        type="button"
                        onClick={() => openLightboxBySrc(img.src)}
                        className={`relative ${truckImgs.length === 1 ? "aspect-[16/10] sm:aspect-[16/9]" : "aspect-[16/11]"} rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 group cursor-zoom-in text-left w-full`}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          unoptimized={img.src?.startsWith("data:")}
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <span className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </motion.div>

          </div>

        </div>
      </section>
      {/* ─── SECTION 4: COMPREHENSIVE SUPPORT ─── */}
      <section className="relative w-full bg-[#FAF4E7] py-16 sm:py-24 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Text Column with Right Border Divider */}
          <div className="lg:col-span-7 flex flex-col items-start lg:pr-12 lg:border-r border-[#DB3E59]/20">
            <span className="font-heading text-[28px] xs:text-[32px] sm:text-[38px] lg:text-[42px] text-[#DB3E59] uppercase tracking-tight leading-[0.98] mb-3 block">
              NO RETAIL EXPERIENCE?
            </span>

            <h2 className="font-black uppercase tracking-tight leading-[0.98] mb-3">
              <span className="block font-heading text-[15px] xs:text-[17px] sm:text-lg lg:text-xl text-[#162B3A] tracking-wide mb-2">NO WORRIES</span>
              <span className="block text-[28px] xs:text-[32px] sm:text-[38px] lg:text-[42px] text-[#DB3E59]">YOU&apos;RE NEVER IN BUSINESS ALONE</span>
            </h2>

            <h3 className="text-lg xs:text-xl sm:text-2xl font-black uppercase tracking-tight leading-snug text-[#162B3A] mb-4">
              WE&apos;RE WITH YOU EVERY STEP OF YOUR FRANCHISE JOURNEY
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
            <span className="font-heading text-[15px] xs:text-[17px] sm:text-lg lg:text-xl text-[#DB3E59] uppercase tracking-wide leading-tight mb-3 block">
              FREQUENTLY ASKED
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none mb-4 whitespace-nowrap text-[#162B3A]">
              QUESTIONS
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
                  <div className="mt-3 text-sm sm:text-base font-medium text-[#162B3A]/80 leading-relaxed pr-8 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-3 space-y-1.5 list-disc pl-5 text-[#162B3A]/85">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-8">
              <a
                href="#form"
                className="inline-block text-xs sm:text-sm font-black uppercase tracking-wide text-[#162B3A] hover:text-[#DB3E59] transition-colors"
              >
                REQUEST THE FULL FINANCIAL REPORT AND DETAILED FRANCHISE INVESTMENT PROFILE BY CLICKING THE LINK BELOW →
              </a>
            </div>
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
                  TO <span className="text-[#DB3E59]">YOUR CITY</span>
                </span>
              </h2>

              <div className="w-14 h-1.5 bg-[#DB3E59] rounded-full mb-6" />

              <p className="text-[#162B3A]/85 font-medium text-base sm:text-lg leading-relaxed mb-8">
                Join Japan’s most exciting artisanal crunchy cream stick phenomenon. Select your preferred concept—<strong>Premium Island</strong>, <strong>Express Stop</strong>, <strong>Experience Store</strong>, or <strong>Mobile Truck</strong>—and get in touch directly with our business development team.
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
                          { key: "1. KIOSK – TUMU Premium Island", label: "1. Premium Island", sub: "Kiosk • Low Cost" },
                          { key: "2. KIOSK – TUMU Express Stop", label: "2. Express Stop", sub: "Kiosk • Low Cost" },
                          { key: "3. TUMU Experience Store", label: "3. Experience Store", sub: "Store • Med Cost" },
                          { key: "4. TUMU Go – Mobile Truck", label: "4. Mobile Truck", sub: "Truck • USD 50K" },
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


      {/* Fullscreen Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close image viewer"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/15 hover:bg-[#DB3E59] text-white flex items-center justify-center transition-colors cursor-pointer z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
              }}
              aria-label="Previous image"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-[#DB3E59] text-white flex items-center justify-center transition-colors cursor-pointer z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image Container */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[70vh] sm:h-[78vh] rounded-2xl overflow-hidden"
            >
              <Image
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].alt}
                fill
                unoptimized={galleryItems[lightboxIndex].src?.startsWith("data:")}
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Caption */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-4 text-center px-4"
            >
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] block">
                {galleryItems[lightboxIndex].label}
              </span>
              <p className="text-sm sm:text-base font-semibold text-white/90 mt-1">
                {galleryItems[lightboxIndex].alt} ({lightboxIndex + 1} / {galleryItems.length})
              </p>
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
              }}
              aria-label="Next image"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-[#DB3E59] text-white flex items-center justify-center transition-colors cursor-pointer z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </main>
  );
}
