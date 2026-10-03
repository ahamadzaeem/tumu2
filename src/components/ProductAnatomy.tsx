"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ProductAnatomy() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 70, damping: 20, mass: 0.8 };

  // ─── 2-STEP ZOOM ANIMATIONS ───
  // Step 1 [0.15 - 0.48]: Focus on exterior crisp stick
  // Step 2 [0.52 - 0.85]: MAIN FOCUS ON CREAM - Zoom & pan directly onto the top cream filling opening!
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.48, 0.55, 0.82, 0.92, 1],
    [1, 1.6, 1.6, 1.6, 2.4, 2.4, 1, 1]
  );
  const scale = useSpring(rawScale, springConfig);

  // Y Translation: Push down (+32%) in Step 2 so top cream filling opening is right in the central view
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.48, 0.55, 0.82, 0.92, 1],
    [0, 4, 4, 4, 32, 32, 0, 0]
  );
  const smoothY = useSpring(rawY, springConfig);
  const y = useTransform(smoothY, (val) => `${val}%`);

  // X Translation: Shift left (-16%) in Step 2 to center the cream filling opening on screen
  const rawX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.48, 0.55, 0.82, 0.92, 1],
    [0, 4, 4, 4, -16, -16, 0, 0]
  );
  const smoothX = useSpring(rawX, springConfig);
  const x = useTransform(smoothX, (val) => `${val}%`);

  // ─── 2-STEP TEXT ANIMATIONS ───
  // Step 01: Crisp Outside
  const opacityCrunch = useSpring(useTransform(scrollYProgress, [0.12, 0.20, 0.42, 0.48], [0, 1, 1, 0]), springConfig);
  const yCrunch = useSpring(useTransform(scrollYProgress, [0.12, 0.20, 0.42, 0.48], [60, 0, 0, -60]), springConfig);
  const lineCrunch = useSpring(useTransform(scrollYProgress, [0.12, 0.20, 0.42, 0.48], [0, 1, 1, 0]), springConfig);

  // Step 02: Creamy Inside
  const opacityCream = useSpring(useTransform(scrollYProgress, [0.52, 0.58, 0.78, 0.84], [0, 1, 1, 0]), springConfig);
  const yCream = useSpring(useTransform(scrollYProgress, [0.52, 0.58, 0.78, 0.84], [60, 0, 0, -60]), springConfig);
  const lineCream = useSpring(useTransform(scrollYProgress, [0.52, 0.58, 0.78, 0.84], [0, 1, 1, 0]), springConfig);

  const opacityTitle = useSpring(useTransform(scrollYProgress, [0, 0.10], [1, 0]), springConfig);

  const features = [
    {
      num: "01",
      title: "CRISP OUTSIDE",
      description: "Golden baked exterior with a delicate crunch in every bite.",
      opacity: opacityCrunch,
      yPos: yCrunch,
      lineScale: lineCrunch,
      color: "text-[#5CBEB3]", // Cyan
      lineBg: "bg-[#5CBEB3]"
    },
    {
      num: "02",
      title: "CREAMY INSIDE",
      description: "Smooth and chilled cream filling with a rich and velvety texture.",
      opacity: opacityCream,
      yPos: yCream,
      lineScale: lineCream,
      color: "text-[#DB3E59]", // Pink
      lineBg: "bg-[#DB3E59]"
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
              {/* Massive Background Number */}
              <div className={`absolute -left-6 -top-16 lg:-left-12 lg:-top-24 text-[140px] lg:text-[180px] font-black opacity-20 ${feature.color} select-none pointer-events-none leading-none tracking-tighter mix-blend-multiply`}>
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
