"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProductAnatomy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─── VIDEO SCROLL DRIVER (Smooth RAF Lerp for Butter-Smooth Scrubbing) ───
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is strictly paused so scroll exclusively controls playback
    video.pause();

    let targetTime = 0;
    let animId: number;

    const render = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        const current = video.currentTime;
        const diff = targetTime - current;

        // Smoothly interpolate towards target time with a responsive lerp factor
        if (Math.abs(diff) > 0.003) {
          video.currentTime = current + diff * 0.28;
        } else {
          video.currentTime = targetTime;
        }
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (video && video.duration && !isNaN(video.duration)) {
        // Clamp target time between 0 and duration
        targetTime = Math.min(Math.max(latest * video.duration, 0.001), video.duration - 0.02);
      }
    });

    return () => {
      cancelAnimationFrame(animId);
      unsubscribe();
    };
  }, [scrollYProgress]);

  // Set initial video frame on load
  const handleLoadedMetadata = () => {
    setIsVideoReady(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0.01;
    }
  };

  // ─── 3-STEP SCROLL ANIMATIONS (Synchronized with 3D Video Progression) ───
  // Step 1 [0.10 - 0.35]: Crunchy Almond Topping
  const opacityAlmond = useTransform(scrollYProgress, [0.08, 0.16, 0.32, 0.38], [0, 1, 1, 0]);
  const yAlmond = useTransform(scrollYProgress, [0.08, 0.16, 0.32, 0.38], [50, 0, 0, -50]);
  const lineAlmond = useTransform(scrollYProgress, [0.08, 0.16, 0.32, 0.38], [0, 1, 1, 0]);

  // Step 2 [0.40 - 0.65]: Hot, Golden & Crispy Outer Layer
  const opacityCrunch = useTransform(scrollYProgress, [0.40, 0.48, 0.62, 0.68], [0, 1, 1, 0]);
  const yCrunch = useTransform(scrollYProgress, [0.40, 0.48, 0.62, 0.68], [50, 0, 0, -50]);
  const lineCrunch = useTransform(scrollYProgress, [0.40, 0.48, 0.62, 0.68], [0, 1, 1, 0]);

  // Step 3 [0.70 - 0.95]: Smooth and Chilled Cream
  const opacityCream = useTransform(scrollYProgress, [0.70, 0.77, 0.90, 0.96], [0, 1, 1, 0]);
  const yCream = useTransform(scrollYProgress, [0.70, 0.77, 0.90, 0.96], [50, 0, 0, -50]);
  const lineCream = useTransform(scrollYProgress, [0.70, 0.77, 0.90, 0.96], [0, 1, 1, 0]);

  const opacityTitle = useTransform(scrollYProgress, [0, 0.10], [1, 0]);

  const features = [
    {
      num: "01",
      title: "Crunchy Almond Topping",
      description: "Specially crafted almond crunch with our secret recipe for an irresistibly crispy bite",
      opacity: opacityAlmond,
      yPos: yAlmond,
      lineScale: lineAlmond,
      color: "text-[#318EC7]", // Brand Cyan
      lineBg: "bg-[#318EC7]",
      lineWidth: "w-16 sm:w-24 md:w-32 lg:w-40",
    },
    {
      num: "02",
      title: "Hot, Golden & Crispy Outer Layer",
      description: "Oven-baked to a rich golden crunch every single order.",
      opacity: opacityCrunch,
      yPos: yCrunch,
      lineScale: lineCrunch,
      color: "text-[#DE3558]", // Brand Pink
      lineBg: "bg-[#DE3558]",
      lineWidth: "w-20 sm:w-28 md:w-36 lg:w-48",
    },
    {
      num: "03",
      title: "Smooth and Chilled Cream",
      description: "Velvety Japanese cream piped fresh into the warm crust.",
      opacity: opacityCream,
      yPos: yCream,
      lineScale: lineCream,
      color: "text-[#318EC7]", // Brand Cyan
      lineBg: "bg-[#318EC7]",
      lineWidth: "w-40 sm:w-64 md:w-80 lg:w-[380px] xl:w-[440px] 2xl:w-[520px]",
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAF4E7] h-[380vh] sm:h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* ─── FULL-BLEED 3D PRODUCT ANIMATION VIDEO ─── */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/tumo_dessert_animation.mp4"
            poster="/videos/tumu_product_poster.jpg"
            onLoadedMetadata={handleLoadedMetadata}
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay to enhance text legibility on left */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#FAF4E7]/40 via-transparent to-transparent z-10" />
        </div>

        {/* ─── MAIN SECTION TITLE (Top Right, Fades out smoothly on initial scroll) ─── */}
        <motion.div 
          style={{ opacity: opacityTitle }}
          className="absolute right-6 sm:right-12 lg:right-16 xl:right-20 top-24 lg:top-32 z-30 pointer-events-none flex flex-col items-end text-right"
        >
          <span className="font-heading text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DB3E59] mb-2 block font-black">
            ANATOMY OF PERFECTION
          </span>
          <h2 className="text-[34px] xs:text-[38px] sm:text-[44px] lg:text-5xl font-black tracking-tight leading-[0.95] uppercase text-[#162B3A] mb-4">
            <span className="block">WHAT&apos;S INSIDE</span>
            <span className="block text-[#DB3E59]">A TUMU</span>
          </h2>
          <div className="w-16 h-1.5 bg-[#DB3E59]" />
        </motion.div>

        {/* ─── 3-STEP FEATURE ANNOTATIONS OVERLAY ─── */}
        <div className="absolute left-6 sm:left-12 lg:left-16 xl:left-20 top-1/2 -translate-y-1/2 z-40 w-full max-w-[440px] pointer-events-none">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              style={{ opacity: feature.opacity, y: feature.yPos }}
              className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col"
            >
              {/* Massive Background Number */}
              <div className={`absolute -left-4 -top-16 lg:-left-10 lg:-top-24 text-[130px] lg:text-[170px] font-heading font-normal opacity-40 sm:opacity-50 ${feature.color} select-none pointer-events-none leading-none tracking-tight`}>
                {feature.num}
              </div>
              
              <div className="relative z-10 pl-2 lg:pl-6 pt-4 max-sm:bg-white/85 max-sm:backdrop-blur-md max-sm:p-4 max-sm:rounded-2xl max-sm:shadow-lg">
                <div className="flex items-center gap-4 mb-3">
                  {/* Title */}
                  <h3 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[40px] font-black uppercase tracking-tight text-[#162B3A] drop-shadow-sm leading-tight">
                    {feature.title}
                  </h3>
                  
                  {/* Animated Line Indicator */}
                  <div className="items-center pt-1 hidden sm:flex shrink-0">
                    <motion.div 
                      className={`h-[4px] ${feature.lineWidth} ${feature.lineBg} origin-left rounded-l-full shadow-sm`}
                      style={{ scaleX: feature.lineScale }} 
                    />
                    <div className="relative flex items-center justify-center shrink-0">
                      <motion.div 
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full ${feature.lineBg} shadow-md`}
                        style={{ scale: feature.lineScale }} 
                      />
                      <motion.div 
                        animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                        className={`absolute w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full ${feature.lineBg} pointer-events-none`}
                      />
                    </div>
                  </div>
                </div>

                {/* Description text */}
                <p className="text-[#162B3A] font-bold text-base sm:text-lg lg:text-xl leading-relaxed max-w-[360px] drop-shadow-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── SCROLL HINT (Bottom Center) ─── */}
        <motion.div
          style={{ opacity: opacityTitle }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2"
        >
          <span className="text-[11px] font-black uppercase tracking-widest text-[#162B3A]/60">
            Scroll to Explore
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-[#162B3A]/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-2 rounded-full bg-[#DB3E59]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
