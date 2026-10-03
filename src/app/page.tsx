import React from "react";
import Header from "@/components/Header";
import VideoScrollHero from "@/components/VideoScrollHero";
import Hero from "@/components/Hero";
import RealIngredients from "@/components/RealIngredients";
import ProductAnatomy from "@/components/ProductAnatomy";
import Flavours from "@/components/Flavours";
import FreshFromOven from "@/components/FreshFromOven";
import FranchiseSection from "@/components/FranchiseSection";
import HappinessSection from "@/components/HappinessSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F4EC] flex flex-col selection:bg-[#DB3E59] selection:text-white">
      {/* 1. Header / Navigation */}
      <Header />

      {/* 2. Premiere 120-Frame Interactive Video Scroll Hero (First Section) */}
      <VideoScrollHero />

      {/* 3. Hero Section */}
      <Hero />

      {/* 3. Real Ingredients Section */}
      <RealIngredients />

      {/* 4. Product Anatomy Strip */}
      <ProductAnatomy />

      {/* 5. Flavours Section */}
      <Flavours />

      {/* 6. Fresh From Our Oven Section */}
      <FreshFromOven />

      {/* 7. Happiness CTA Section */}
      <HappinessSection />

      {/* 8. Franchise Section */}
      <FranchiseSection />

      {/* 9. Footer */}
      <Footer />
    </main>
  );
}
