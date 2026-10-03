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

  // ─── Image Animations ───
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 0.95, 1],
    [1, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 1, 1]
  );
  const scale = useSpring(rawScale, springConfig);

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 0.95, 1],
    [0, 42, 42, 0, 0, -42, -42, 0, 0]
  );
  const smoothY = useSpring(rawY, springConfig);
  const y = useTransform(smoothY, (val) => `${val}%`);

  const crumbsParallax = useTransform(smoothY, (val) => `${val * -0.15}%`);

  // ─── Text & Element Animations ───
  // Opacities
  const opacityCrunch = useSpring(useTransform(scrollYProgress, [0.05, 0.1, 0.25, 0.3], [0, 1, 1, 0]), springConfig);
  const yCrunch = useSpring(useTransform(scrollYProgress, [0.05, 0.1, 0.25, 0.3], [60, 0, 0, -60]), springConfig);
  const lineCrunch = useSpring(useTransform(scrollYProgress, [0.05, 0.1, 0.25, 0.3], [0, 1, 1, 0]), springConfig);

  const opacityCream = useSpring(useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]), springConfig);
  const yCream = useSpring(useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.6], [60, 0, 0, -60]), springConfig);
  const lineCream = useSpring(useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]), springConfig);

  const opacityStick = useSpring(useTransform(scrollYProgress, [0.65, 0.7, 0.85, 0.9], [0, 1, 1, 0]), springConfig);
  const yStick = useSpring(useTransform(scrollYProgress, [0.65, 0.7, 0.85, 0.9], [60, 0, 0, -60]), springConfig);
  const lineStick = useSpring(useTransform(scrollYProgress, [0.65, 0.7, 0.85, 0.9], [0, 1, 1, 0]), springConfig);

  const opacityTitle = useSpring(useTransform(scrollYProgress, [0, 0.05], [1, 0]), springConfig);

  const features = [
    {
      num: "01",
      title: "CRISP OUTSIDE",
      description: "Golden baked exterior with a delicate crunch in every bite.",
      opacity: opacityCrunch,
      yPos: yCrunch,
      lineScale: lineCrunch,
      color: "text-[#5CBEB3]" // Cyan
    },
    {
      num: "02",
      title: "CREAMY INSIDE",
      description: "Smooth and chilled cream filling with a rich and velvety texture.",
      opacity: opacityCream,
      yPos: yCream,
      lineScale: lineCream,
      color: "text-[#DB3E59]" // Pink
    },
    {
      num: "03",
      title: "PERFECTLY BAKED",
      description: "Light, airy and perfectly baked for a golden, crispy experience.",
      opacity: opacityStick,
      yPos: yStick,
      lineScale: lineStick,
      color: "text-[#4694C6]" // Blue
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-[#F8F4EC] h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Main Title (Visible initially, fades out) */}
        <motion.div 
          style={{ opacity: opacityTitle }}
          className="absolute left-6 sm:left-12 lg:left-16 xl:left-20 top-24 lg:top-32 z-30"
        >
          <h2 className="text-4xl sm:text-5xl xl:text-[54px] font-black tracking-tight leading-[1] uppercase text-[#162B3A] mb-8">
            <span className="block">WHAT&apos;S INSIDE</span>
            <span className="block">A TUMU</span>
          </h2>
          <div className="w-16 h-1.5 bg-[#DB3E59]"></div>
        </motion.div>

        {/* Feature Descriptions */}
        <div className="absolute left-6 sm:left-12 lg:left-16 xl:left-20 top-1/2 -translate-y-1/2 z-40 w-full max-w-[420px]">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              style={{ opacity: feature.opacity, y: feature.yPos, pointerEvents: "none" }}
              className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col"
            >
              {/* Massive Background Number with ENHANCED PRESENCE */}
              {/* Darker opacity (20% instead of 10%), massive size, pulled slightly up to frame the text */}
              <div className={`absolute -left-6 -top-16 lg:-left-12 lg:-top-24 text-[140px] lg:text-[180px] font-black opacity-20 ${feature.color} select-none pointer-events-none leading-none tracking-tighter mix-blend-multiply`}>
                {feature.num}
              </div>
              
              <div className="relative z-10 pl-2 lg:pl-6 pt-4">
                <div className="flex items-center gap-4 mb-4">
                  {/* Larger, heavier title */}
                  <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-black uppercase tracking-tight text-[#162B3A] whitespace-nowrap drop-shadow-sm">
                    {feature.title}
                  </h3>
                  
                  {/* Thicker, more prominent animated line */}
                  <div className="flex items-center pt-2 hidden sm:flex">
                    <motion.div 
                      className="h-[4px] w-16 sm:w-24 lg:w-40 bg-[#5CBEB3] origin-left rounded-l-full shadow-sm" 
                      style={{ scaleX: feature.lineScale }} 
                    />
                    <motion.div 
                      className="w-4 h-4 rounded-full bg-[#5CBEB3] shrink-0 shadow-sm" 
                      style={{ scale: feature.lineScale }} 
                    />
                  </div>
                </div>

                {/* Larger, bolder description text */}
                <p className="text-[#162B3A]/90 font-bold text-lg lg:text-xl leading-relaxed max-w-[340px] drop-shadow-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Center Image Composition */}
        <motion.div 
          style={{ scale, y }}
          className="relative w-full h-[600px] lg:h-[800px] flex items-center justify-center z-10 origin-center"
        >
          {/* Layer 1: Background Shapes */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative w-[110%] h-[110%] md:w-[90%] md:h-[90%]">
              <Image
                src="/images/tumu/anatomy_bg_shapes.png"
                alt="Teal, blue, and pink layered shapes"
                fill
                className="object-contain object-center opacity-90 scale-110"
              />
            </div>
          </div>

          {/* Layer 2: Exploded Golden Wafer */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="relative w-full h-[80%] md:h-[90%]">
              <Image
                src="/images/tumu/anatomy_wafer.png"
                alt="Exploded golden wafer with cream swirl"
                fill
                className="object-contain object-center scale-110"
              />
            </div>
          </div>

          {/* Layer 3: Scattered Golden Crumbs */}
          <motion.div 
            style={{ y: crumbsParallax }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/tumu/anatomy_crumbs.png"
                alt="Scattered golden crumbs"
                fill
                className="object-contain object-center scale-125 md:scale-110"
              />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
