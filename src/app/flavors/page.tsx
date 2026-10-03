import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FlavorsPage() {
  return (
    <main className="min-h-screen bg-[#F8F4EC] flex flex-col selection:bg-[#DB3E59] selection:text-white">
      <Header />
      <div className="flex-1 pt-32 px-6 lg:px-12 max-w-[1440px] mx-auto w-full">
        <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-[#1A2E44] uppercase mb-8">Our Flavors</h1>
        <p className="text-lg text-[#1A2E44] opacity-80 max-w-2xl">Page content coming soon.</p>
      </div>
      <Footer />
    </main>
  );
}
