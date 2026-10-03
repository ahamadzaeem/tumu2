"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Cake,
  Users,
  Heart,
  Store,
  ChevronDown,
  CheckCircle2
} from "lucide-react";

export default function CateringPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Birthday Party",
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
        eventType: "Birthday Party",
        message: ""
      });
    }, 4000);
  };

  const scrollToForm = () => {
    const el = document.getElementById("quote-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF5EB] flex flex-col selection:bg-[#DB3E59] selection:text-white overflow-x-hidden font-sans">
      {/* Navigation Header */}
      <Header />

      {/* ─── SECTION 1: HERO (SWEET MOMENTS FOR EVERY OCCASION.) ─── */}
      <section className="relative w-full min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] bg-[#FF758F] overflow-hidden flex items-center pt-28 sm:pt-32 lg:pt-36 pb-16">
        
        {/* Widescreen Hero Grid (Text Left, Pistachio Pastry Banner Right) */}
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10 relative">
          
          {/* Left Text Overlay */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-white/95 mb-1.5">
              EVENTS & CATERING
            </span>
            <div className="w-10 h-[2px] bg-white mb-5" />

            <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-black uppercase tracking-tight leading-[0.92] mb-6">
              <span className="block text-white">SWEET</span>
              <span className="block text-white">MOMENTS</span>
              <span className="block text-[#DB3E59]">FOR EVERY</span>
              <span className="block text-[#DB3E59]">OCCASION<span className="text-[#DB3E59]">.</span></span>
            </h1>

            <p className="text-white/95 font-semibold text-base sm:text-lg lg:text-xl leading-relaxed max-w-[460px] mb-8">
              Bring the unique TUMU experience to your events. From intimate gatherings to large celebrations, we add a sweet touch that everyone will love.
            </p>

            <button
              onClick={scrollToForm}
              className="px-8 py-4 sm:px-9 sm:py-4.5 rounded-full bg-white hover:bg-white/90 text-[#DB3E59] font-black text-sm sm:text-base uppercase tracking-wide transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center gap-2.5"
            >
              <span>Plan Your Event</span>
              <span className="text-lg">→</span>
            </button>
          </motion.div>

          {/* Right Column: Widescreen Pistachio Pastry Banner Cutout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 relative w-full aspect-[16/8] lg:aspect-[16/7] flex items-center justify-center pointer-events-none"
          >
            <Image
              src="/images/tumu/catering_pastry_cutout.png"
              alt="TUMU Pistachio Cream Pastry Lineup"
              fill
              className="object-contain object-center drop-shadow-xl"
              priority
              unoptimized
            />
          </motion.div>

        </div>
      </section>


      {/* ─── SECTION 2: EVENTS WE CATER (PERFECT FOR EVERY CELEBRATION) ─── */}
      <section className="relative w-full bg-[#FAF5EB] py-20 sm:py-28 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.2em] text-[#DB3E59] mb-1.5">
              PERFECT FOR EVERY CELEBRATION
            </span>
            <div className="w-10 h-[2px] bg-[#DB3E59] mb-5" />

            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black uppercase tracking-tight leading-[0.95] mb-6">
              <span className="block text-[#162B3A]">EVENTS</span>
              <span className="block text-[#162B3A]">
                WE <span className="text-[#DB3E59]">CATER.</span>
              </span>
            </h2>

            <p className="text-[#162B3A]/85 font-semibold text-base sm:text-lg leading-relaxed max-w-[400px]">
              Delicious desserts and beverages, tailored for your special moments.
            </p>
          </motion.div>

          {/* Right Column: 2x2 Feature Grid with Vertical Divider Line */}
          <div className="lg:col-span-7 relative">
            
            {/* Center Vertical Divider Line (Hidden on Mobile) */}
            <div className="hidden sm:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#DB3E59]/20 -translate-x-1/2 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 relative z-10 w-full">
              
              {/* Category 1: Birthdays */}
              <div className="flex flex-col items-start sm:pr-4">
                <div className="w-14 h-14 rounded-full bg-[#FFEBEF] text-[#DB3E59] flex items-center justify-center mb-3.5 shadow-sm">
                  <Cake className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-[#162B3A] uppercase mb-1">
                  Birthdays
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#162B3A]/75 leading-relaxed">
                  Make birthdays sweeter with TUMU.
                </p>
              </div>

              {/* Category 2: Corporate Events */}
              <div className="flex flex-col items-start sm:pl-6">
                <div className="w-14 h-14 rounded-full bg-[#FFEBEF] text-[#DB3E59] flex items-center justify-center mb-3.5 shadow-sm">
                  <Users className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-[#162B3A] uppercase mb-1">
                  Corporate Events
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#162B3A]/75 leading-relaxed">
                  Perfect for office meetings and company celebrations.
                </p>
              </div>

              {/* Category 3: Weddings */}
              <div className="flex flex-col items-start sm:pr-4 pt-2">
                <div className="w-14 h-14 rounded-full bg-[#FFEBEF] text-[#DB3E59] flex items-center justify-center mb-3.5 shadow-sm">
                  <Heart className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-[#162B3A] uppercase mb-1">
                  Weddings
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#162B3A]/75 leading-relaxed">
                  Add a unique dessert experience to your big day.
                </p>
              </div>

              {/* Category 4: Festivals & Fairs */}
              <div className="flex flex-col items-start sm:pl-6 pt-2">
                <div className="w-14 h-14 rounded-full bg-[#FFEBEF] text-[#DB3E59] flex items-center justify-center mb-3.5 shadow-sm">
                  <Store className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-[#162B3A] uppercase mb-1">
                  Festivals & Fairs
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#162B3A]/75 leading-relaxed">
                  A crowd favourite for public events.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ─── SECTION 3: PLAN YOUR EVENT WITH TUMU (PASTEL CYAN BACKGROUND FORM) ─── */}
      <section id="quote-form" className="relative w-full bg-[#D9F4F6] py-20 sm:py-28 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.2em] text-[#DB3E59] mb-1.5">
              LET&apos;S MAKE IT SPECIAL
            </span>
            <div className="w-10 h-[2px] bg-[#DB3E59] mb-5" />

            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black uppercase tracking-tight leading-[0.95] mb-6">
              <span className="block text-[#162B3A]">PLAN YOUR</span>
              <span className="block text-[#DB3E59]">EVENT WITH TUMU<span className="text-[#DB3E59]">.</span></span>
            </h2>

            <p className="text-[#162B3A]/85 font-semibold text-base sm:text-lg leading-relaxed max-w-[440px]">
              Tell us about your event and our team will help you create a customised menu and experience that fits your needs.
            </p>
          </motion.div>

          {/* Right Column: Seamless & Minimal Custom Quote Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col w-full"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#DB3E59] mb-4 animate-bounce" />
                <h3 className="text-2xl font-black text-[#162B3A] uppercase mb-2">
                  Quote Request Sent!
                </h3>
                <p className="text-sm font-semibold text-[#162B3A]/80 max-w-sm">
                  Thank you! Our catering coordinator will contact you with a customized event menu and quote shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4.5 w-full">
                {/* Full Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
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
                </div>

                {/* Phone & Event Type Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-white border border-[#162B3A]/10 focus:outline-none focus:border-[#DB3E59] shadow-sm text-sm font-semibold text-[#162B3A] placeholder-[#162B3A]/40 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-white border border-[#162B3A]/10 focus:outline-none focus:border-[#DB3E59] shadow-sm text-sm font-semibold text-[#162B3A] transition-all cursor-pointer appearance-none pr-12"
                    >
                      <option value="Birthday Party">Event Type *</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Wedding / Celebration">Wedding / Celebration</option>
                      <option value="Festival / Fair">Festival / Fair</option>
                      <option value="Other">Other Private Gathering</option>
                    </select>
                    <ChevronDown className="w-5 h-5 text-[#162B3A]/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
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
                    <span>Get a Custom Quote</span>
                    <span className="text-base">→</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
