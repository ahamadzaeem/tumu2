"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/cms";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronDown
} from "lucide-react";

export default function ContactPage() {
  const [content, setContent] = useState(getSiteContent());
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const contactData = (content as any)?.contact || {};
  const hero = contactData.hero || {};
  const formSection = contactData.formSection || {};
  const getInTouch = contactData.getInTouch || {};
  const offices = contactData.offices || [
    {
      id: "india",
      country: "INDIA",
      role: "Asia-Pacific Office",
      city: "Bengaluru",
      address: "Starhub Food Works Pvt Ltd, No.1, BC, 212, East of NGEF, Kasturi Nagar, Bengaluru 560043",
      emails: ["franchise@tumuofficial.com", "media@tumuofficial.com"],
    },
    {
      id: "uae",
      country: "UAE",
      role: "MEA & Europe Office",
      city: "Dubai",
      address: "Office : 401 | Al Zarouni Business Centre, Al Barsha 1, Dubai, UAE",
      emails: ["franchise@tumuofficial.com", "media@tumuofficial.com"],
    },
    {
      id: "japan",
      country: "JAPAN",
      role: "Global R&D Office",
      city: "Tokyo",
      address: "Marunouchi Trust Tower Main, 22nd Floor, 1-8-3 Marunouchi, Chiyoda-ku, Tokyo 100-0005, Japan",
      emails: ["enquiry@tumuofficial.jp"],
    },
    {
      id: "uk",
      country: "UNITED KINGDOM",
      role: "UK Regional Office",
      city: "London",
      address: "5 Brayford Square, London E1 0SG, United Kingdom",
      emails: ["franchise@tumuglobal.com", "media@tumuglobal.com"],
    },
  ];
  const cta = contactData.cta || {};
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    interest: "Franchise Opportunity",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        interest: "Franchise Opportunity",
        message: ""
      });
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#FAF5EB] flex flex-col selection:bg-[#DB3E59] selection:text-white overflow-x-hidden font-sans">
      {/* Navigation Header */}
      <Header />

      {/* ─── SECTION 1: HERO (LET'S CONNECT - CONTACT US.) ─── */}
      <section className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] bg-[#FAF5EB] overflow-hidden flex items-center pt-28 sm:pt-32 lg:pt-36 pb-12">
        
        {/* Solid Brand Pink Finger/Capsule Shape on Right Side (Matching Mockup Angle & Scale) */}
        <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[42%] sm:top-[38%] lg:top-[36%] -right-28 sm:-right-24 lg:-right-20 w-[360px] sm:w-[480px] lg:w-[600px] h-[120px] sm:h-[165px] lg:h-[200px] bg-[#DB3E59] rounded-full rotate-[-28deg] transition-all" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[540px] flex flex-col items-start"
          >
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-3">
              {hero.eyebrow || "LET'S CONNECT"}
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-black uppercase tracking-tight leading-[0.92] mb-4">
              <span className="block text-[#162B3A]">{hero.headingLine1 || "CONTACT"}</span>
              <span className="block text-[#DB3E59]">{hero.headingLine2 || "US"}</span>
            </h1>

            <p className="text-[#162B3A]/85 font-semibold text-base sm:text-lg lg:text-xl leading-relaxed max-w-[460px]">
              {hero.description || "We're here to answer your questions, explore franchise opportunities, and tell you more about TUMU"}
            </p>
          </motion.div>
        </div>
      </section>


      {/* ─── SECTION 2: MINIMAL & CLEAN FORM + CONTACT DETAILS ─── */}
      <section className="relative w-full bg-[#FAF5EB] pb-20 sm:pb-28 z-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Seamless & Minimal Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col w-full"
          >
            <div className="flex flex-col items-start mb-7">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#162B3A]">
                {formSection.headingLine1 || "SEND US"} <span className="text-[#DB3E59]">{formSection.headingLine2 || "A MESSAGE"}</span>
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#162B3A]/60 mt-1.5">
                {formSection.subtitle || "Complete the form, and our team will get back to you shortly"}
              </p>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#DB3E59] mb-4 animate-bounce" />
                <h3 className="text-2xl font-black text-[#162B3A] uppercase mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm font-semibold text-[#162B3A]/80 max-w-sm">
                  Thank you for reaching out to TUMU. Our team will review your message and reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4.5 w-full">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-[#162B3A]/10 focus:outline-none focus:border-[#DB3E59] shadow-sm text-sm font-semibold text-[#162B3A] placeholder-[#162B3A]/40 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-[#162B3A]/10 focus:outline-none focus:border-[#DB3E59] shadow-sm text-sm font-semibold text-[#162B3A] placeholder-[#162B3A]/40 transition-all"
                  />
                </div>

                {/* Phone & City Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-[#162B3A]/10 focus:outline-none focus:border-[#DB3E59] shadow-sm text-sm font-semibold text-[#162B3A] placeholder-[#162B3A]/40 transition-all"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City / Location *"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-[#162B3A]/10 focus:outline-none focus:border-[#DB3E59] shadow-sm text-sm font-semibold text-[#162B3A] placeholder-[#162B3A]/40 transition-all"
                  />
                </div>

                {/* Dropdown Interest with Custom Down Arrow */}
                <div className="relative">
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-[#162B3A]/10 focus:outline-none focus:border-[#DB3E59] shadow-sm text-sm font-semibold text-[#162B3A] transition-all cursor-pointer appearance-none pr-12"
                  >
                    <option value="Franchise Opportunity">I&apos;m interested in *</option>
                    <option value="Franchise Opportunity">Franchise Opportunity</option>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Catering & Events">Catering & Events</option>
                    <option value="Media & Partnerships">Media & Partnerships</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#162B3A]/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Your Message *"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-[#162B3A]/10 focus:outline-none focus:border-[#DB3E59] shadow-sm text-sm font-semibold text-[#162B3A] placeholder-[#162B3A]/40 resize-none transition-all"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 sm:py-4.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-sm uppercase tracking-wide transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Submit Enquiry</span>
                    <span className="text-base">→</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right Column: Get In Touch Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-start pt-2"
          >
            <div className="flex flex-col items-start mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#162B3A]">
                {getInTouch.headingLine1 || "GET IN"} <span className="text-[#DB3E59]">{getInTouch.headingLine2 || "TOUCH"}</span>
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#162B3A]/60 mt-1.5">
                {getInTouch.subtitle || "Reach out to us directly through any of the channels below."}
              </p>
            </div>

            <div className="flex flex-col gap-6 w-full">
              {/* Regional Corporate Offices */}
              <div className="flex flex-col gap-4 w-full">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59]">
                  REGIONAL OFFICES
                </span>

                {offices.map((office: any) => (
                  <div key={office.id || office.country} className="p-5 rounded-2xl bg-white border border-[#162B3A]/10 shadow-sm flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-[#DB3E59] bg-[#DB3E59]/10 px-2.5 py-0.5 rounded-full">
                        {office.country}
                      </span>
                      <span className="text-[11px] font-bold text-[#162B3A]/60 uppercase">{office.role}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-black text-[#162B3A] uppercase mt-0.5">
                      {office.city}
                    </h4>
                    <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-[#162B3A]/80 leading-relaxed">
                      <MapPin className="w-4 h-4 text-[#DB3E59] shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold pt-2 border-t border-black/5">
                      {(office.emails || []).map((em: string, idx: number) => (
                        <React.Fragment key={em}>
                          {idx > 0 && <span className="text-[#162B3A]/30">•</span>}
                          <a
                            href={`mailto:${em}`}
                            className={idx === 0 ? "text-[#DB3E59] hover:underline" : "text-[#162B3A]/70 hover:text-[#DB3E59]"}
                          >
                            {em}
                          </a>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </motion.div>

        </div>
      </section>


      {/* ─── SECTION 3: CTA (BRING TUMU TO YOUR CITY.) ─── */}
      <section className="relative w-full bg-[#FFA0B4] py-16 sm:py-24 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-start max-w-[540px]">
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.2em] text-[#DB3E59] mb-3">
              {cta.eyebrow || "LET'S GROW TOGETHER"}
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black uppercase tracking-tight leading-[0.95] mb-4">
              <span className="block text-[#162B3A]">{cta.headingLine1 || "BRING TUMU"}</span>
              <span className="block text-[#162B3A]">
                {cta.headingLine2 || "TO YOUR CITY"}
              </span>
            </h2>

            <div className="text-[#162B3A] font-black text-base sm:text-lg lg:text-xl uppercase tracking-tight leading-snug space-y-1">
              <p>{cta.line1 || "BE THE TALK OF THE TOWN."}</p>
              <p>{cta.line2 || "DON'T JUST BE A FAN OF THE NEXT BIG THING."}</p>
              <p className="text-[#DB3E59]">{cta.line3 || "BE PART OF IT. BE TUMU!"}</p>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href="/franchise"
              className="px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-base uppercase tracking-wide transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-3"
            >
              <span>{cta.buttonText || "Enquire Now"}</span>
              <span className="text-lg">→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
