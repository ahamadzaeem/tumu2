"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plus, Minus, HelpCircle, Sparkles, Store, Flame, Award } from "lucide-react";
import { FAQ_ITEMS } from "@/data/faq";

export default function FaqClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = [
    "ALL",
    "Product & Concept",
    "Ingredients & Dietary",
    "Store Locations & Delivery",
    "Franchise & Expansion",
  ];

  const filteredItems =
    selectedCategory === "ALL"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#FAF4E7] flex flex-col selection:bg-[#DB3E59] selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full pt-32 sm:pt-40 pb-16 px-6 lg:px-12 max-w-[1440px] mx-auto text-center">
        <span className="text-[#DB3E59] text-xs sm:text-sm font-black uppercase tracking-[0.25em] block mb-3">
          HELP &amp; FREQUENTLY ASKED QUESTIONS • よくある質問
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#162B3A] mb-6">
          FREQUENTLY ASKED <span className="text-[#DB3E59]">QUESTIONS.</span>
        </h1>
        <div className="w-16 h-1.5 bg-[#DB3E59] mx-auto rounded-full mb-6" />
        <p className="text-[#162B3A]/80 text-base sm:text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about our authentic <strong>Japanese desserts in UAE</strong>, fresh ingredients, <strong>matcha desserts</strong>, store locations in Dubai, and <strong>dessert franchise UAE</strong> opportunities.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#DB3E59] text-white shadow-md scale-105"
                  : "bg-white/80 text-[#162B3A] hover:bg-white hover:text-[#DB3E59] border border-black/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion Section */}
      <section className="relative w-full pb-28 px-6 lg:px-12 max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          {filteredItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white/80 rounded-2xl sm:rounded-3xl border border-black/5 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#DB3E59]">
                      {item.category}
                    </span>
                    <span className="text-base sm:text-lg lg:text-xl font-black text-[#162B3A] group-hover:text-[#DB3E59] transition-colors leading-snug">
                      {item.question}
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <Minus className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-[#162B3A]/85 font-medium text-sm sm:text-base leading-relaxed border-t border-black/5 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-[32px] bg-[#162B3A] text-white text-center flex flex-col items-center">
          <HelpCircle className="w-12 h-12 text-[#DB3E59] mb-4" />
          <h3 className="text-2xl sm:text-3xl font-black uppercase mb-2">
            Still Have Questions?
          </h3>
          <p className="text-white/80 text-sm sm:text-base max-w-md mx-auto mb-6">
            Our guest support and franchise development teams are ready to help. Reach out directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              Contact Us →
            </Link>
            <Link
              href="/franchise#form"
              className="px-6 py-3 rounded-full bg-white hover:bg-[#FAF4E7] text-[#162B3A] text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              Franchise Inquiry →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

