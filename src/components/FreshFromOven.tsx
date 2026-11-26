"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PillButton from "./PillButton";
import { getSiteContent } from "@/lib/cms";

export default function FreshFromOven() {
  const [content, setContent] = useState(getSiteContent());

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const fresh = (content?.home as any)?.freshFromOven || {
    eyebrow: "FRESH FROM OUR OVEN",
    headlineLine1: "BAKED TO",
    headlineLine2: "PERFECTION.",
    headlineLine3: "FILLED WITH",
    headlineLine4: "HAPPINESS.",
    description:
      "Every TUMU stick is freshly baked to a golden crunch and filled with smooth, chilled cream — so you can enjoy the perfect balance of crisp outside, creamy inside, every time.",
    buttonText: "Explore TUMU",
    buttonLink: "/our-story",
  };

  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[720px] flex flex-col lg:flex-row bg-[#F8F4EC] overflow-hidden">
      {/* Left Content Column */}
      <div className="w-full lg:w-[48%] flex flex-col justify-center px-6 sm:px-12 lg:pl-[8vw] lg:pr-10 py-16 sm:py-20 z-20 bg-[#F8F4EC] lg:bg-transparent">
        <h2 className="text-[44px] sm:text-[56px] lg:text-[70px] font-black tracking-tight leading-[0.93] uppercase mb-6 text-[#162B3A]">
          {fresh.headlineLine1 || "BAKED"} <span className="text-[#DB3E59]">TO</span><br />
          {fresh.headlineLine2 || "PERFECTION."}<br />
          {fresh.headlineLine3 || "FILLED"} <span className="text-[#DB3E59]">WITH</span><br />
          <span className="text-[#DB3E59]">{fresh.headlineLine4 || "HAPPINESS."}</span>
        </h2>

        <p className="text-[#162B3A]/80 text-sm sm:text-base lg:text-lg font-semibold leading-relaxed max-w-[460px] mb-8">
          {fresh.description ||
            "Every TUMU stick is freshly baked to a golden crunch and filled with smooth, chilled cream — so you can enjoy the perfect balance of crisp outside, creamy inside, every time."}
        </p>

        <Link href={fresh.buttonLink || "/our-story"} className="w-fit">
          <PillButton variant="pink" showArrow className="px-8 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider">
            {fresh.buttonText || "Explore TUMU"}
          </PillButton>
        </Link>
      </div>

      {/* Right Image Container */}
      <div className="relative w-full h-[400px] sm:h-[480px] lg:h-auto lg:absolute lg:top-0 lg:right-0 lg:w-[58%] lg:bottom-0 z-10">
        <div 
          className="absolute inset-0 w-full h-full hidden lg:block"
          style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <Image 
            src="/images/tumu/artisanal_rack.png" 
            alt="TUMU sticks baked to perfection on an artisanal rack" 
            fill 
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Mobile image without diagonal clip-path */}
        <div className="absolute inset-0 w-full h-full lg:hidden">
          <Image 
            src="/images/tumu/artisanal_rack.png" 
            alt="TUMU sticks baked to perfection on an artisanal rack" 
            fill 
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
