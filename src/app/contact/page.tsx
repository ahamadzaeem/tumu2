"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Plus,
  Minus,
  CheckCircle2,
  ChevronDown
} from "lucide-react";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqList = [
    {
      question: "How do I become a franchise partner?",
      answer:
        "Fill out our franchise enquiry form above or reach out to our team directly at franchise@tumu.com. We'll schedule an initial discussion and guide you through our 5-step onboarding process."
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

  return (
    <main className="min-h-screen bg-[#FAF5EB] flex flex-col selection:bg-[#DB3E59] selection:text-white overflow-x-hidden font-sans">
      {/* Navigation Header */}
      <Header />

      {/* ─── SECTION 1: HERO (LET'S CONNECT - CONTACT US.) ─── */}
      <section className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] bg-[#FAF5EB] overflow-hidden flex items-center pt-28 sm:pt-32 lg:pt-36 pb-12">
        
        {/* Soft Vibrant Pink Pill Shape in Top Right Background (Matching Mockup Angle & Scale) */}
        <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-10 -right-20 sm:-top-16 sm:-right-16 lg:-top-20 lg:right-0 w-[460px] sm:w-[620px] lg:w-[780px] h-[260px] sm:h-[340px] lg:h-[420px] bg-gradient-to-r from-[#FF6B8B] to-[#FF8EA4] rounded-full rotate-[-22deg] opacity-90 shadow-2xl transition-all" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[540px] flex flex-col items-start"
          >
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-3">
              LET&apos;S CONNECT
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-black uppercase tracking-tight leading-[0.92] mb-4">
              <span className="block text-[#162B3A]">CONTACT</span>
              <span className="block text-[#DB3E59]">US<span className="text-[#DB3E59]">.</span></span>
            </h1>

            <div className="w-12 h-1 bg-[#DB3E59] mb-6" />

            <p className="text-[#162B3A]/85 font-semibold text-base sm:text-lg lg:text-xl leading-relaxed max-w-[460px]">
              We&apos;re here to answer your questions, discuss franchise opportunities, or simply share more about TUMU.
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
                SEND US <span className="text-[#DB3E59]">A MESSAGE</span>
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#162B3A]/60 mt-1.5">
                Fill in the form and our team will get back to you shortly.
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
            <div className="flex flex-col items-start mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#162B3A]">
                GET IN <span className="text-[#DB3E59]">TOUCH</span>
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#162B3A]/60 mt-1.5">
                Reach out to us directly through any of the channels below.
              </p>
            </div>

            <div className="flex flex-col gap-8 w-full">
              {/* Channel 1: Phone */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-[#FFEBEF] text-[#DB3E59] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black text-[#162B3A] mb-0.5">
                    Phone
                  </span>
                  <a
                    href="tel:+6581234567"
                    className="text-sm sm:text-base font-semibold text-[#162B3A]/80 hover:text-[#DB3E59] transition-colors"
                  >
                    +65 8123 4567
                  </a>
                </div>
              </div>

              {/* Channel 2: Email */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-[#FFEBEF] text-[#DB3E59] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black text-[#162B3A] mb-0.5">
                    Email
                  </span>
                  <a
                    href="mailto:franchise@tumu.com"
                    className="text-sm sm:text-base font-semibold text-[#162B3A]/80 hover:text-[#DB3E59] transition-colors"
                  >
                    franchise@tumu.com
                  </a>
                </div>
              </div>

              {/* Channel 3: Head Office */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-[#FFEBEF] text-[#DB3E59] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black text-[#162B3A] mb-0.5">
                    Head Office
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-[#162B3A]/80 max-w-[280px] leading-relaxed">
                    10 Anson Road, #24-15 International Plaza, Singapore 079903
                  </p>
                </div>
              </div>

              {/* Channel 4: Business Hours */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-[#FFEBEF] text-[#DB3E59] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black text-[#162B3A] mb-0.5">
                    Business Hours
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-[#162B3A]/80 leading-relaxed">
                    Mon – Fri: 9:00 AM – 6:00 PM (SGT)
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </section>


      {/* ─── SECTION 3: FREQUENTLY ASKED QUESTIONS (CYAN BACKGROUND ACCORDION) ─── */}
      <section className="relative w-full bg-[#D9F4F6] py-20 sm:py-28 overflow-hidden">
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
                  className="flex items-center justify-between w-full text-left gap-4 focus:outline-none group"
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


      {/* ─── SECTION 4: CTA (BRING TUMU TO YOUR CITY.) ─── */}
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
            <Link
              href="/franchise"
              className="px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-base uppercase tracking-wide transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-3"
            >
              <span>Enquire Now</span>
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
