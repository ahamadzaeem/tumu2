"use client";

import React from "react";
import Image from "next/image";
import CircleArrow from "./CircleArrow";
import { ArrowRight } from "lucide-react";

export default function ProcessTimeline() {
  const steps = [
    {
      num: "01",
      title: "BAKE",
      japanese: "丁寧に焼き上げる",
      image: "/images/tumu/process_01_bake.jpg",
    },
    {
      num: "02",
      title: "CRUNCH",
      japanese: "サクサクの食感",
      image: "/images/tumu/process_02_crunch.jpg",
    },
    {
      num: "03",
      title: "FILL",
      japanese: "なめらかなクリーム",
      image: "/images/tumu/process_03_fill.jpg",
    },
    {
      num: "04",
      title: "FINISH",
      japanese: "仕上げのトッピング",
      image: "/images/tumu/process_04_finish.jpg",
    },
    {
      num: "05",
      title: "SERVE",
      japanese: "できたてをお届け",
      image: "/images/tumu/process_05_serve.jpg",
    },
  ];

  return (
    <section id="process" className="w-full bg-[#F8F4EC] py-16 border-t border-[#162B3A]/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Heading Block */}
        <div className="lg:col-span-4 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[0.92] uppercase mb-2">
            <span className="block text-[#162B3A]">FROM OUR OVEN</span>
            <span className="block text-[#DB3E59]">TO YOU</span>
          </h2>
          <p className="text-[#5CBEB3] font-bold text-sm sm:text-base mb-6">
            おいしさができるまで
          </p>
          <CircleArrow variant="blue" size="lg" />
        </div>

        {/* Process Steps Row */}
        <div className="lg:col-span-8 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-4">
          {steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex flex-col items-center text-center min-w-[100px] sm:min-w-[120px] shrink-0 group cursor-pointer">
                {/* Circle Photo */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-110 bg-white">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 80px, 96px"
                  />
                </div>

                {/* Step Info */}
                <span className="text-[#DB3E59] font-black text-xs block mb-0.5">
                  {step.num}
                </span>
                <h3 className="text-[#162B3A] font-extrabold text-xs sm:text-sm uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[#162B3A]/70 font-semibold text-[10px] sm:text-xs">
                  {step.japanese}
                </p>
              </div>

              {/* Connecting Arrow */}
              {idx < steps.length - 1 && (
                <div className="shrink-0 text-[#162B3A]/30">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
