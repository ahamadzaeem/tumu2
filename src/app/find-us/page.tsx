"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PillButton from "@/components/PillButton";
import { fetchLocations, StoreLocation, DEFAULT_LOCATIONS } from "@/lib/supabase";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  ExternalLink,
  Search,
  Sparkles,
  Store,
  Compass,
  ArrowUpRight,
  CheckCircle2,
  Coffee,
  Flame,
  Award
} from "lucide-react";

export default function FindUsPage() {
  const [locations, setLocations] = useState<StoreLocation[]>(DEFAULT_LOCATIONS);
  const [selectedCity, setSelectedCity] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLocationId, setActiveLocationId] = useState<string>(DEFAULT_LOCATIONS[0].id);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await fetchLocations();
        if (isMounted && data && data.length > 0) {
          setLocations(data);
          setActiveLocationId(data[0].id);
        }
      } catch (err) {
        console.error("Error loading locations:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const cities = ["ALL", ...Array.from(new Set(locations.map((loc) => loc.city).filter(Boolean)))];

  const filteredLocations = locations.filter((loc) => {
    const matchesCity = selectedCity === "ALL" || loc.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const activeLocation =
    locations.find((l) => l.id === activeLocationId) || filteredLocations[0] || locations[0];

  const scrollToLocator = () => {
    const el = document.getElementById("store-locator-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF4E7] flex flex-col selection:bg-[#DB3E59] selection:text-white overflow-x-hidden font-sans">
      {/* Navigation Header */}
      <Header />

      {/* ─── SECTION 1: HERO (COME FIND US IN PERSON) ─── */}
      <section className="relative w-full min-h-[660px] sm:min-h-[740px] lg:min-h-[820px] bg-[#FAF4E7] overflow-hidden flex items-center pt-24 sm:pt-28 lg:pt-32 border-b border-[#162B3A]/5">
        
        {/* Soft Background Accent Pill / Ambient Shapes */}
        <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-12 -right-24 sm:-top-16 sm:-right-16 lg:-top-20 lg:right-0 w-[480px] sm:w-[640px] lg:w-[820px] h-[280px] sm:h-[360px] lg:h-[440px] bg-gradient-to-r from-[#FF6B8B]/15 via-[#FF8EA4]/20 to-transparent rounded-full rotate-[-22deg] blur-2xl opacity-80" />
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10 relative">
          
          {/* Left Text Overlay */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59]">
                STORE LOCATOR & ACCESS
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#DB3E59]/10 text-[#DB3E59] tracking-widest uppercase">
                店舗案内
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-black uppercase tracking-tight leading-[0.92] mb-5">
              <span className="block text-[#162B3A]">COME FIND US</span>
              <span className="block text-[#DB3E59]">
                IN PERSON<span className="text-[#DB3E59]">.</span>
              </span>
            </h1>

            <div className="w-12 h-1 bg-[#DB3E59] mb-6" />

            <p className="text-[#162B3A]/85 font-semibold text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-[480px] mb-8">
              Fresh-baked crispy pastry sticks, warm caramelized crust, and cold velvet creams piped to order. Step inside our TUMU boutiques and kiosks.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <PillButton variant="pink" showArrow onClick={scrollToLocator}>
                Find Nearest Outlet
              </PillButton>
              <Link href="/franchise">
                <PillButton variant="outline" showArrow>
                  Franchise In Your City
                </PillButton>
              </Link>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-10 mt-10 border-t border-[#162B3A]/10 w-full max-w-[480px]">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#162B3A] tracking-tight">
                  {locations.length}
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-[#162B3A]/60">
                  Global Stores
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#DB3E59] tracking-tight">
                  100%
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-[#162B3A]/60">
                  Piped Fresh
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#162B3A] tracking-tight">
                  Google
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-[#162B3A]/60">
                  Live Navigation
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Store Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl border-2 border-white/60 group">
              <Image
                src="/images/tumu/franchise_new_1.jpg"
                alt="TUMU Kiosk Storefront"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162B3A]/70 via-transparent to-black/10" />

              {/* Floating Pill Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
                      Now Serving Fresh
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-[#162B3A]">
                    Shibuya &bull; Ginza &bull; Singapore &bull; Dubai
                  </h2>
                </div>
                <button
                  onClick={scrollToLocator}
                  className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#DB3E59] text-white hover:scale-105 transition-all shadow-md"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── SECTION 2: INTERACTIVE STORE LOCATOR & GOOGLE MAPS ─── */}
      <section id="store-locator-section" className="relative w-full py-20 sm:py-28 bg-[#FAF4E7] border-b border-[#162B3A]/5">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          
          {/* Section Header */}
          <div className="flex flex-col items-start mb-10 sm:mb-14">
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-3">
              LIVE STORE DIRECTORY
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#162B3A] leading-tight">
              FIND YOUR NEAREST <span className="text-[#DB3E59]">OUTLET.</span>
            </h2>
            <div className="w-12 h-1 bg-[#DB3E59] mt-4 mb-4" />
            <p className="text-[#162B3A]/80 font-semibold text-base sm:text-lg max-w-2xl">
              Select an outlet below to view operating hours, contact info, and open direct GPS navigation in Google Maps.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#162B3A]/10">
            {/* City Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-300 ${
                    selectedCity.toLowerCase() === city.toLowerCase()
                      ? "bg-[#DB3E59] text-white shadow-md scale-105"
                      : "bg-white/85 text-[#162B3A] hover:bg-white hover:text-[#DB3E59] border border-black/5"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-[#162B3A]/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search store name, street, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#162B3A]/10 text-sm font-semibold text-[#162B3A] placeholder-[#162B3A]/40 focus:outline-none focus:border-[#DB3E59] shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#162B3A]/50 hover:text-[#DB3E59]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Two Column Layout: Store List (Left) & Google Maps View (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Location Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4 max-h-[820px] overflow-y-auto pr-2 no-scrollbar">
              <div className="flex items-center justify-between px-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#162B3A]/60">
                  {filteredLocations.length} {filteredLocations.length === 1 ? "Outlet" : "Outlets"} Available
                </span>
                <span className="text-xs font-semibold text-[#DB3E59]">
                  Tap a store to view map
                </span>
              </div>

              {filteredLocations.length === 0 ? (
                <div className="p-10 text-center bg-white rounded-3xl border border-black/5 text-[#162B3A]/70 font-semibold shadow-sm">
                  <Store className="w-10 h-10 text-[#DB3E59] mx-auto mb-3 opacity-60" />
                  <p className="text-base font-bold text-[#162B3A] mb-1">No outlets match your search</p>
                  <p className="text-xs text-[#162B3A]/60">Try searching for &quot;Tokyo&quot;, &quot;Singapore&quot;, or clearing the filter.</p>
                </div>
              ) : (
                filteredLocations.map((loc) => {
                  const isSelected = activeLocation?.id === loc.id;
                  return (
                    <motion.div
                      key={loc.id}
                      layout
                      onClick={() => setActiveLocationId(loc.id)}
                      className={`p-6 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 border relative ${
                        isSelected
                          ? "bg-[#162B3A] text-white border-[#162B3A] shadow-xl scale-[1.01]"
                          : "bg-white text-[#162B3A] border-black/5 hover:border-[#DB3E59]/40 hover:shadow-md"
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                            isSelected
                              ? "bg-white/15 text-white"
                              : "bg-[#162B3A]/5 text-[#162B3A]"
                          }`}
                        >
                          {loc.city} &bull; {loc.country || "Outlet"}
                        </span>
                        
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span
                            className={`text-[11px] font-bold uppercase tracking-wider ${
                              isSelected ? "text-emerald-300" : "text-emerald-600"
                            }`}
                          >
                            Open Today
                          </span>
                        </div>
                      </div>

                      {/* Store Title */}
                      <h3
                        className={`text-xl sm:text-2xl font-black uppercase tracking-tight mb-2 ${
                          isSelected ? "text-white" : "text-[#162B3A]"
                        }`}
                      >
                        {loc.name}
                      </h3>

                      {/* Address */}
                      <div className="flex items-start gap-2.5 mb-3">
                        <MapPin
                          className={`w-4 h-4 shrink-0 mt-1 ${
                            isSelected ? "text-[#FF758F]" : "text-[#DB3E59]"
                          }`}
                        />
                        <p
                          className={`text-xs sm:text-sm font-medium leading-relaxed ${
                            isSelected ? "text-white/80" : "text-[#162B3A]/70"
                          }`}
                        >
                          {loc.address}
                        </p>
                      </div>

                      {/* Working Hours */}
                      {(loc.hours || loc.opening_hours) && (
                        <div className="flex items-center gap-2.5 mb-2">
                          <Clock
                            className={`w-4 h-4 shrink-0 ${
                              isSelected ? "text-[#FF758F]" : "text-[#DB3E59]"
                            }`}
                          />
                          <p
                            className={`text-xs font-semibold ${
                              isSelected ? "text-white/90" : "text-[#162B3A]/80"
                            }`}
                          >
                            {loc.hours || loc.opening_hours}
                          </p>
                        </div>
                      )}

                      {/* Phone */}
                      {loc.phone && (
                        <div className="flex items-center gap-2.5 mb-5">
                          <Phone
                            className={`w-4 h-4 shrink-0 ${
                              isSelected ? "text-[#FF758F]" : "text-[#DB3E59]"
                            }`}
                          />
                          <a
                            href={`tel:${loc.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className={`text-xs font-semibold hover:underline ${
                              isSelected ? "text-white/90" : "text-[#162B3A]/80"
                            }`}
                          >
                            {loc.phone}
                          </a>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-2">
                        <a
                          href={loc.google_maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all active:scale-95 ${
                            isSelected
                              ? "bg-[#DB3E59] text-white hover:bg-[#D81F51] shadow-md"
                              : "bg-[#162B3A] text-white hover:bg-[#DB3E59]"
                          }`}
                        >
                          <Navigation className="w-3.5 h-3.5 fill-current" />
                          <span>Navigate in Maps</span>
                        </a>

                        <button
                          onClick={() => setActiveLocationId(loc.id)}
                          className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                            isSelected
                              ? "bg-white/10 text-white hover:bg-white/20"
                              : "bg-[#162B3A]/5 text-[#162B3A] hover:bg-[#162B3A]/10"
                          }`}
                        >
                          Select
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Right Column: Google Maps Interactive View */}
            <div className="lg:col-span-7 sticky top-28">
              <div className="bg-white rounded-3xl sm:rounded-[36px] p-4 sm:p-6 border border-black/5 shadow-2xl overflow-hidden flex flex-col">
                
                {/* Active Store Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#162B3A]/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#DB3E59]">
                        Selected Destination
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#162B3A] uppercase tracking-tight">
                      {activeLocation?.name || "TUMU Store"}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#162B3A]/70">
                      {activeLocation?.address}
                    </p>
                  </div>

                  <a
                    href={activeLocation?.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DB3E59] text-white hover:bg-[#D81F51] text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all self-start sm:self-center shrink-0"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Embedded Map Frame */}
                <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden border border-black/5 bg-[#EFECE6]">
                  {activeLocation ? (
                    <iframe
                      title={`Google Maps - ${activeLocation.name}`}
                      src={
                        activeLocation.map_embed_url ||
                        `https://maps.google.com/maps?q=${encodeURIComponent(
                          activeLocation.name + " " + activeLocation.address
                        )}&t=&z=15&ie=UTF8&iwloc=&output=embed`
                      }
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#162B3A]/50 font-bold text-sm">
                      Select a store to view map
                    </div>
                  )}

                  {/* Floating GPS Directions Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-xs p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center shrink-0">
                        <Compass className="w-5 h-5 animate-spin-slow" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-black uppercase tracking-wider text-[#162B3A]">
                          Turn-By-Turn
                        </span>
                        <span className="text-[11px] font-medium text-[#162B3A]/60">
                          Live mobile GPS available
                        </span>
                      </div>
                    </div>
                    <a
                      href={activeLocation?.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#162B3A] text-white hover:bg-[#DB3E59] transition-colors"
                      title="Navigate now"
                    >
                      <Navigation className="w-4 h-4 fill-current" />
                    </a>
                  </div>
                </div>

                {/* Bottom Quick Info */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 mt-2">
                  <div className="p-3 rounded-2xl bg-[#FAF4E7] border border-black/5">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-[#162B3A]/50 mb-0.5">
                      Service
                    </span>
                    <span className="text-xs font-bold text-[#162B3A]">
                      Dine-in &amp; Takeaway
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FAF4E7] border border-black/5">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-[#162B3A]/50 mb-0.5">
                      Preparation
                    </span>
                    <span className="text-xs font-bold text-[#DB3E59]">
                      Freshly Piped
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-[#FAF4E7] border border-black/5">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-[#162B3A]/50 mb-0.5">
                      Format
                    </span>
                    <span className="text-xs font-bold text-[#162B3A]">
                      Boutique &amp; Kiosk
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── SECTION 3: THE IN-STORE EXPERIENCE (MATCHING TUMU SIGNATURE SECTIONS) ─── */}
      <section className="relative w-full py-20 sm:py-28 bg-[#FAF4E7] border-b border-[#162B3A]/5">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
          
          <div className="flex flex-col items-start mb-12 sm:mb-16">
            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-3">
              WHAT TO EXPECT
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#162B3A]">
              THE IN-STORE <span className="text-[#DB3E59]">EXPERIENCE.</span>
            </h2>
            <div className="w-12 h-1 bg-[#DB3E59] mt-4 mb-4" />
            <p className="text-[#162B3A]/80 font-semibold text-base sm:text-lg max-w-2xl">
              From the warm aroma of fresh-baked choux pastry to the theatrical cold cream piping station, every visit is designed to delight.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center mb-6">
                <Flame className="w-7 h-7" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-2">
                CRISP ON THE OUTSIDE
              </span>
              <h3 className="text-2xl font-black text-[#162B3A] uppercase tracking-tight mb-3">
                BAKED FRESH DAILY
              </h3>
              <p className="text-sm font-medium text-[#162B3A]/70 leading-relaxed">
                Our pastry sticks are baked in small batches throughout the day in our open-view ovens, keeping the caramelized crunch at its absolute peak.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-[#79D2D9]/20 text-[#162B3A] flex items-center justify-center mb-6">
                <Coffee className="w-7 h-7" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#162B3A] mb-2">
                COLD &amp; VELVETY
              </span>
              <h3 className="text-2xl font-black text-[#162B3A] uppercase tracking-tight mb-3">
                PIPED TO ORDER
              </h3>
              <p className="text-sm font-medium text-[#162B3A]/70 leading-relaxed">
                We never pre-fill our pastries. Your stick is filled cold right before your eyes, maintaining the contrast between warm crunch and chilled cream.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-[#162B3A]/10 text-[#162B3A] flex items-center justify-center mb-6">
                <Award className="w-7 h-7" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-2">
                ON-THE-GO CONVENIENCE
              </span>
              <h3 className="text-2xl font-black text-[#162B3A] uppercase tracking-tight mb-3">
                MESS-FREE DESSERT
              </h3>
              <p className="text-sm font-medium text-[#162B3A]/70 leading-relaxed">
                Engineered with our signature Japanese stick format and custom wrapper, TUMU is made for effortless snacking as you stroll through the city.
              </p>
            </div>

          </div>

          {/* Store Gallery Visuals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            <div className="relative aspect-[16/10] rounded-3xl sm:rounded-[32px] overflow-hidden shadow-lg border border-black/10 group">
              <Image
                src="/images/tumu/franchise_gallery_1.jpg"
                alt="TUMU Kiosk Storefront"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-black uppercase tracking-wider text-[#FF758F] mb-1 block">
                  Store Concept
                </span>
                <h4 className="text-xl font-black text-white uppercase tracking-tight">
                  High-Impact Mall Kiosks
                </h4>
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-3xl sm:rounded-[32px] overflow-hidden shadow-lg border border-black/10 group">
              <Image
                src="/images/tumu/franchise_gallery_2.jpg"
                alt="TUMU Boutique Interior"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-black uppercase tracking-wider text-[#FF758F] mb-1 block">
                  Aesthetic Design
                </span>
                <h4 className="text-xl font-black text-white uppercase tracking-tight">
                  Minimalist Japanese Architecture
                </h4>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── SECTION 4: CALL TO ACTION BANNER (BRING TUMU TO YOUR CITY) ─── */}
      <section className="relative w-full py-20 sm:py-24 bg-[#162B3A] text-white overflow-hidden">
        
        {/* Soft Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#DB3E59]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#79D2D9]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 relative z-10 text-center flex flex-col items-center">
          
          <span className="font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FF758F] mb-3">
            EXPANDING WORLDWIDE
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] mb-6 max-w-3xl">
            CAN&apos;T FIND A STORE IN YOUR CITY YET?
          </h2>

          <p className="text-white/80 font-medium text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Partner with us to launch the next iconic TUMU boutique in your region, or book our catering team for private celebrations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/franchise">
              <PillButton variant="pink" showArrow>
                Franchise Opportunity
              </PillButton>
            </Link>
            <Link href="/catering">
              <PillButton variant="white" showArrow>
                Catering &amp; Events
              </PillButton>
            </Link>
            <Link href="/contact">
              <PillButton variant="outline" className="border-white text-white hover:bg-white hover:text-[#162B3A]" showArrow>
                Contact Team
              </PillButton>
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
