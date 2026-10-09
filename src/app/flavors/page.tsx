import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const FLAVORS = [
  {
    id: 1,
    name: "Vanilla Bean Dream",
    description: "Classic Madagascar vanilla bean with a creamy finish.",
    color: "bg-white", 
    textColor: "text-[#1A2E44]",
    tagBg: "bg-[#1A2E44]",
    tagText: "text-white",
    tag: "Classic",
    image: "/images/tumu/flavour_v3_02_vanilla.png"
  },
  {
    id: 2,
    name: "Double Dark Chocolate",
    description: "Rich, decadent dark chocolate made from single-origin cocoa.",
    color: "bg-[#3D1C00]", 
    textColor: "text-white",
    tagBg: "bg-white",
    tagText: "text-[#3D1C00]",
    tag: "Bestseller",
    image: "/images/tumu/flavour_v3_01_dark_chocolate.png"
  },
  {
    id: 3,
    name: "Strawberry Fields",
    description: "Freshly picked strawberries folded into a smooth cream base.",
    color: "bg-[#FF9999]", 
    textColor: "text-[#1A2E44]",
    tagBg: "bg-[#1A2E44]",
    tagText: "text-white",
    tag: "Fruity",
    image: "/images/tumu/flavour_v3_05_strawberry_bliss.png"
  },
  {
    id: 4,
    name: "Matcha Green Tea",
    description: "Authentic Asian inspired matcha green tea for a calm, earthy flavor.",
    color: "bg-[#98FF98]", 
    textColor: "text-[#1A2E44]",
    tagBg: "bg-[#1A2E44]",
    tagText: "text-white",
    tag: "Asian Inspired",
    image: "/images/tumu/flavour_v3_04_matcha_green_tea.png"
  },
  {
    id: 5,
    name: "Tiramisu Indulgence",
    description: "A rich coffee and mascarpone blend dusted with fine cocoa.",
    color: "bg-[#C68E17]", 
    textColor: "text-white",
    tagBg: "bg-white",
    tagText: "text-[#C68E17]",
    tag: "Signature",
    image: "/images/tumu/flavour_v3_07_tiramisu_indulgence.png"
  },
  {
    id: 6,
    name: "Pistachio Crunch",
    description: "Roasted pistachios blended for a nutty perfection with a crunchy finish.",
    color: "bg-[#93C572]", 
    textColor: "text-[#1A2E44]",
    tagBg: "bg-[#1A2E44]",
    tagText: "text-white",
    tag: "Signature",
    image: "/images/tumu/flavour_v3_08_pistachio_crunch.png"
  },
  {
    id: 7,
    name: "Mango Infusion",
    description: "Sweet, tropical mango puree swirled into a refreshing cream base.",
    color: "bg-[#FFE066]", // Mango yellow
    textColor: "text-[#1A2E44]",
    tagBg: "bg-[#1A2E44]",
    tagText: "text-white",
    tag: "Fruit Blends",
    image: "/images/tumu/flavour_v2_new_mango.png"
  },
  {
    id: 8,
    name: "Lotus Biscoff",
    description: "Iconic caramelized biscuit butter topped with crushed Biscoff crumbs.",
    color: "bg-[#D35400]", // Caramel/Biscoff dark orange
    textColor: "text-white",
    tagBg: "bg-white",
    tagText: "text-[#D35400]",
    tag: "Signature",
    image: "/images/tumu/flavour_v3_03_lotus_biscoff.png"
  }
];

export default function FlavorsPage() {
  return (
    <main className="min-h-screen bg-[#F8F4EC] flex flex-col selection:bg-[#DB3E59] selection:text-white">
      <Header />
      <div className="flex-1 pt-32 px-6 lg:px-12 max-w-[1440px] mx-auto w-full pb-20">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-[#1A2E44] uppercase mb-6 drop-shadow-sm">
            Our Flavors
          </h1>
          <p className="text-xl text-[#1A2E44] opacity-80 max-w-2xl mx-auto font-medium">
            Discover our carefully crafted selection of artisanal flavors, made fresh daily with locally sourced ingredients.
          </p>
        </div>

        {/* Flavors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-10">
          {FLAVORS.map((flavor) => (
            <div 
              key={flavor.id} 
              className={`group relative ${flavor.color} rounded-[120px] p-8 pb-16 pt-32 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center border-none mt-24`}
            >
              {/* Product Image popping out of the card */}
              <div className="absolute -top-32 w-full flex justify-center h-[280px] z-20">
                <div className="relative w-[140px] h-full">
                  <Image 
                    src={flavor.image} 
                    alt={flavor.name}
                    fill
                    className="object-contain object-center drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              
              <div className="relative z-10 mt-20 flex flex-col items-center">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 ${flavor.tagBg} ${flavor.tagText}`}>
                  {flavor.tag}
                </span>
                
                <h3 className={`text-2xl font-bold mb-4 leading-tight transition-colors duration-300 ${flavor.textColor}`}>
                  {flavor.name}
                </h3>
                
                <p className={`${flavor.textColor} opacity-80 font-medium leading-relaxed px-4`}>
                  {flavor.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </main>
  );
}
