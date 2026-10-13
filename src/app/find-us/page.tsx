"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchLocations, StoreLocation, DEFAULT_LOCATIONS } from "@/lib/supabase";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  ExternalLink,
  Search,
  Sparkles,
  Building2
} from "lucide-react";

export default function FindUsPage() {
  const [locations, setLocations] = useState<StoreLocation[]>(DEFAULT_LOCATIONS);
  const [selectedCity, setSelectedCity] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLocationId, setActiveLocationId] = useState<string>(DEFAULT_LOCATIONS[0].id);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const data = await fetchLocations();
      if (isMounted && data && data.length > 0) {
        setLocations(data);
        setActiveLocationId(data[0].id);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const cities = ["ALL", ...Array.from(new Set(locations.map((loc) => loc.city).filter(Boolean)))];

  const filteredLocations = locations.filter((loc) => {
    const matchesCity = selectedCity === "ALL" || loc.city === selectedCity;
    const matchesSearch =
      searchQuery === "" ||
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const activeLocation =
    locations.find((l) => l.id === activeLocationId) || filteredLocations[0] || locations[0];

  return (
    <main className="min-h-screen bg-[#F8F4EC] flex flex-col selection:bg-[#DB3E59] selection:text-white">
      <Header />

      <div className="flex-1 pt-28 sm:pt-36 px-6 lg:px-12 max-w-[1440px] mx-auto w-full pb-24">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#DB3E59] text-xs sm:text-sm font-black uppercase tracking-[0.25em] block mb-3">
            TUMU Store Locator
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-black uppercase tracking-tight text-[#162B3A] leading-tight mb-4">
            FIND A <span className="text-[#DB3E59]">STORE.</span>
          </h1>
          <p className="text-[#162B3A]/80 font-medium text-base sm:text-lg leading-relaxed">
            Experience our fresh-baked crispy pastry sticks and velvety chilled cream in person. Navigate directly with Google Maps.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#162B3A]/10">
          {/* City Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-300 ${
                  selectedCity === city
                    ? "bg-[#DB3E59] text-white shadow-md scale-105"
                    : "bg-white/80 text-[#162B3A] hover:bg-white hover:text-[#DB3E59] border border-black/5"
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#162B3A]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city or mall..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-[#162B3A]/10 text-sm font-semibold text-[#162B3A] placeholder-[#162B3A]/40 focus:outline-none focus:border-[#DB3E59] shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Two Column Layout: Store List (Left) & Google Maps View (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Location Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5 max-h-[780px] overflow-y-auto pr-1 no-scrollbar">
            {filteredLocations.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-black/5 text-[#162B3A]/60 font-semibold">
                No stores found matching your query.
              </div>
            ) : (
              filteredLocations.map((loc) => {
                const isSelected = activeLocation?.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setActiveLocationId(loc.id)}
                    className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border ${
                      isSelected
                        ? "bg-white border-[#DB3E59] shadow-xl ring-2 ring-[#DB3E59]/20 -translate-y-1"
                        : "bg-white/70 hover:bg-white border-black/5 shadow-sm hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#DB3E59] block mb-1">
                          {loc.city}, {loc.country || "Japan"}
                        </span>
                        <h3 className="text-xl font-black text-[#162B3A] tracking-tight">
                          {loc.name}
                        </h3>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide shrink-0 ${
                          loc.status === "Open Now"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-amber-50 text-amber-600 border border-amber-200"
                        }`}
                      >
                        {loc.status || "Open Now"}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm font-medium text-[#162B3A]/80 mb-5">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#DB3E59] shrink-0 mt-0.5" />
                        <span className="leading-snug">{loc.address}</span>
                      </div>
                      {loc.opening_hours && (
                        <div className="flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-[#50B8B1] shrink-0" />
                          <span>{loc.opening_hours}</span>
                        </div>
                      )}
                      {loc.phone && (
                        <div className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 text-[#4694C6] shrink-0" />
                          <span>{loc.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Navigation Button */}
                    <div className="flex items-center gap-3 pt-2 border-t border-black/5">
                      <a
                        href={loc.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-2.5 px-4 rounded-full bg-[#162B3A] hover:bg-[#DB3E59] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Navigate in Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Interactive Map & Live Visual Showcase */}
          <div className="lg:col-span-7 sticky top-32 flex flex-col gap-6">
            {activeLocation && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-black/5 overflow-hidden">
                {/* Store Visual + Details Top Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-black/10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center shrink-0">
                      <Building2 className="w-7 h-7 stroke-[2]" />
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-[#DB3E59] block">
                        Selected Outlet
                      </span>
                      <h2 className="text-2xl font-black text-[#162B3A] tracking-tight">
                        {activeLocation.name}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-[#162B3A]/70">
                        {activeLocation.address}
                      </p>
                    </div>
                  </div>

                  <a
                    href={activeLocation.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Google Maps Interactive Embed Frame */}
                <div className="mt-6 w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden relative border border-black/10 shadow-inner">
                  <iframe
                    title={activeLocation.name}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      `${activeLocation.name} ${activeLocation.address}`
                    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>

                {/* Live Store Highlight Badge */}
                {activeLocation.image && (
                  <div className="mt-6 flex items-center gap-4 p-4 rounded-2xl bg-[#F8F4EC] border border-black/5">
                    <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={activeLocation.image}
                        alt={activeLocation.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#162B3A] block">
                        Store Concept: {activeLocation.name}
                      </span>
                      <span className="text-[11px] text-[#162B3A]/70 font-medium">
                        Hours: {activeLocation.opening_hours || "Open Daily"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
