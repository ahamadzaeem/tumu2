"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProductAnatomy() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─── 2-STEP ZOOM ANIMATIONS (Direct GPU-driven transforms with Lenis smooth scroll) ───
  // Step 1 [0.15 - 0.48]: Focus on exterior crisp stick
  // Step 2 [0.52 - 0.85]: MAIN FOCUS ON CREAM - Zoom & pan directly onto the top cream filling opening!
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.48, 0.55, 0.82, 0.92, 1],
    [1, 1.6, 1.6, 1.6, 2.4, 2.4, 1, 1]
  );

  // Y Translation: Push down (+32%) in Step 2 so top cream filling opening is right in the central view
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.48, 0.55, 0.82, 0.92, 1],
    [0, 4, 4, 4, 32, 32, 0, 0]
  );
  const y = useTransform(rawY, (val) => `${val}%`);

  // X Translation: Shift left (-16%) in Step 2 to center the cream filling opening on screen
  const rawX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.48, 0.55, 0.82, 0.92, 1],
    [0, 4, 4, 4, -16, -16, 0, 0]
  );
  const x = useTransform(rawX, (val) => `${val}%`);

  // ─── 3-STEP SCROLL ANIMATIONS (Matching Reference Image) ───
  // Step 1 [0.10 - 0.35]: Crunchy Almond Topping
  const opacityAlmond = useTransform(scrollYProgress, [0.10, 0.18, 0.32, 0.38], [0, 1, 1, 0]);
  const yAlmond = useTransform(scrollYProgress, [0.10, 0.18, 0.32, 0.38], [60, 0, 0, -60]);
  const lineAlmond = useTransform(scrollYProgress, [0.10, 0.18, 0.32, 0.38], [0, 1, 1, 0]);

  // Step 2 [0.40 - 0.65]: Hot, Golden & Crispy Outer Layer
  const opacityCrunch = useTransform(scrollYProgress, [0.40, 0.48, 0.60, 0.66], [0, 1, 1, 0]);
  const yCrunch = useTransform(scrollYProgress, [0.40, 0.48, 0.60, 0.66], [60, 0, 0, -60]);
  const lineCrunch = useTransform(scrollYProgress, [0.40, 0.48, 0.60, 0.66], [0, 1, 1, 0]);

  // Step 3 [0.68 - 0.92]: Smooth and Chilled Cream
  const opacityCream = useTransform(scrollYProgress, [0.68, 0.74, 0.88, 0.94], [0, 1, 1, 0]);
  const yCream = useTransform(scrollYProgress, [0.68, 0.74, 0.88, 0.94], [60, 0, 0, -60]);
  const lineCream = useTransform(scrollYProgress, [0.68, 0.74, 0.88, 0.94], [0, 1, 1, 0]);

  const opacityTitle = useTransform(scrollYProgress, [0, 0.10], [1, 0]);

  const features = [
    {
      num: "01",
      title: "Crunchy Almond Topping",
      description: "Delicately roasted nuts for an irresistible crunch.",
      opacity: opacityAlmond,
      yPos: yAlmond,
      lineScale: lineAlmond,
      color: "text-[#318EC7]", // Brand Cyan
      lineBg: "bg-[#318EC7]"
    },
    {
      num: "02",
      title: "Hot, Golden & Crispy Outer Layer",
      description: "Oven-baked to a rich golden crunch every single order.",
      opacity: opacityCrunch,
      yPos: yCrunch,
      lineScale: lineCrunch,
      color: "text-[#DE3558]", // Brand Pink
      lineBg: "bg-[#DE3558]"
    },
    {
      num: "03",
      title: "Smooth and Chilled Cream",
      description: "Velvety Japanese cream piped fresh into the warm crust.",
      opacity: opacityCream,
      yPos: yCream,
      lineScale: lineCream,
      color: "text-[#318EC7]", // Brand Cyan
      lineBg: "bg-[#318EC7]"
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-[#F8F4EC] h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Main Title (Visible initially, fades out) */}
        <motion.div 
          style={{ opacity: opacityTitle }}
          className="absolute left-6 sm:left-12 lg:left-16 xl:left-20 top-24 lg:top-32 z-30 pointer-events-none"
        >
          <h2 className="text-4xl sm:text-5xl xl:text-[54px] font-black tracking-tight leading-[1] uppercase text-[#162B3A] mb-8">
            <span className="block">WHAT&apos;S INSIDE</span>
            <span className="block">A TUMU</span>
          </h2>
          <div className="w-16 h-1.5 bg-[#DB3E59]"></div>
        </motion.div>

        {/* Feature Descriptions (2 Steps) */}
        <div className="absolute left-6 sm:left-12 lg:left-16 xl:left-20 top-1/2 -translate-y-1/2 z-40 w-full max-w-[440px] pointer-events-none">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              style={{ opacity: feature.opacity, y: feature.yPos }}
              className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col"
            >
              {/* Massive Background Number - Enhanced Visibility */}
              <div className={`absolute -left-6 -top-16 lg:-left-12 lg:-top-24 text-[140px] lg:text-[180px] font-heading font-normal opacity-50 sm:opacity-60 ${feature.color} select-none pointer-events-none leading-none tracking-tight`}>
                {feature.num}
              </div>
              
              <div className="relative z-10 pl-2 lg:pl-6 pt-4">
                <div className="flex items-center gap-4 mb-4">
                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-black uppercase tracking-tight text-[#162B3A] whitespace-nowrap drop-shadow-sm">
                    {feature.title}
                  </h3>
                  
                  {/* Animated Line */}
                  <div className="flex items-center pt-2 hidden sm:flex">
                    <motion.div 
                      className={`h-[4px] w-16 sm:w-24 lg:w-40 ${feature.lineBg} origin-left rounded-l-full shadow-sm`}
                      style={{ scaleX: feature.lineScale }} 
                    />
                    <motion.div 
                      className={`w-4 h-4 rounded-full ${feature.lineBg} shrink-0 shadow-sm`}
                      style={{ scale: feature.lineScale }} 
                    />
                  </div>
                </div>

                {/* Description text */}
                <p className="text-[#162B3A]/90 font-bold text-lg lg:text-xl leading-relaxed max-w-[340px] drop-shadow-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Center Image Composition */}
        <motion.div 
          style={{ scale, y, x }}
          className="absolute inset-0 w-full h-full flex items-center justify-center z-10 origin-center"
        >
          {/* Layer 1: Background Shapes (Behind) */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-full h-full max-w-[1200px] lg:max-w-[1400px]">
              <Image
                src="/images/tumu/anatomy_bg_shapes.png"
                alt="Teal, blue, and pink layered shapes"
                fill
                className="object-contain object-center opacity-95 scale-100"
              />
            </div>
          </div>

          {/* Layer 2: Cream-Filled Snack Stick Cutout (On Top - FULL SECTION COVER) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <Image
              src="/images/tumu/anatomy_wafer.png"
              alt="Cream-filled crispy snack close-up"
              fill
              className="object-cover object-center w-full h-full"
              priority
              unoptimized
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
