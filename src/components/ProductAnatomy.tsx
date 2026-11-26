"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSiteContent } from "@/lib/cms";

export default function ProductAnatomy() {
  const [content, setContent] = useState(getSiteContent());
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const anatomy = content?.home?.productAnatomy || {
    eyebrow: "ANATOMY OF PERFECTION",
    headingLine1: "WHAT'S INSIDE",
    headingLine2: "A TUMU",
    layer1Title: "Crunchy Almond Topping",
    layer1Desc: "Specially crafted almond crunch with our secret recipe for an irresistibly crispy bite",
    layer2Title: "Hot, Golden & Crispy Outer Layer",
    layer2Desc: "Oven-baked to a rich golden crunch every single order.",
    layer3Title: "Smooth and Chilled Cream",
    layer3Desc: "Velvety Japanese cream piped fresh into the warm crust.",
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─── HIGH-PRECISION 60FPS VIDEO SCROLL DRIVER (Lag-Free & Full 1080p Quality) ───
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // 1. Force iOS & Android WebKit inline playback attributes
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("preload", "auto");

    // 2. Decoder warm-up on mobile without fighting autoplay
    let isPrimed = false;
    const primeVideo = () => {
      if (isPrimed || !video) return;
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
            isPrimed = true;
          })
          .catch(() => {});
      }
    };

    primeVideo();

    // Unlock on first touch/interaction for iOS Low Power Mode
    const onUserInteraction = () => {
      primeVideo();
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("scroll", onUserInteraction);
    };
    window.addEventListener("touchstart", onUserInteraction, { passive: true });
    window.addEventListener("pointerdown", onUserInteraction, { passive: true });
    window.addEventListener("scroll", onUserInteraction, { passive: true });

    if (video.readyState < 2) {
      video.load();
    }

    let st: ScrollTrigger | null = null;

    const setupVideoScrubber = () => {
      primeVideo();

      if (st) st.kill();

      st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15, // Responsive 150ms interpolation synchronized with Lenis
        onUpdate: (self) => {
          if (!video.duration || isNaN(video.duration)) return;
          const maxTime = Math.max(0, video.duration - 0.05);
          const targetTime = Math.max(0, Math.min(self.progress * maxTime, maxTime));

          // Direct high-precision seeking (no fastSeek jumping, no event throttling)
          if (Math.abs(video.currentTime - targetTime) > 0.01) {
            video.currentTime = targetTime;
          }
        },
      });
    };

    if (video.readyState >= 1) {
      setupVideoScrubber();
    } else {
      video.addEventListener("loadedmetadata", setupVideoScrubber, { once: true });
      video.addEventListener("canplay", setupVideoScrubber, { once: true });
    }

    return () => {
      if (st) st.kill();
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("scroll", onUserInteraction);
      video.removeEventListener("loadedmetadata", setupVideoScrubber);
      video.removeEventListener("canplay", setupVideoScrubber);
    };
  }, []);

  // ─── 3-STEP SCROLL ANIMATIONS (Smooth Non-Glitching Cross-Fades) ───
  // Step 1 [0.08 - 0.38]: Crunchy Almond Topping
  const opacityAlmond = useTransform(scrollYProgress, [0.08, 0.16, 0.32, 0.40], [0, 1, 1, 0]);
  const yAlmond = useTransform(scrollYProgress, [0.08, 0.16, 0.32, 0.40], [30, 0, 0, -30]);
  const lineAlmond = useTransform(scrollYProgress, [0.08, 0.16, 0.32, 0.40], [0, 1, 1, 0]);

  // Step 2 [0.38 - 0.68]: Hot, Golden & Crispy Outer Layer
  const opacityCrunch = useTransform(scrollYProgress, [0.38, 0.46, 0.62, 0.70], [0, 1, 1, 0]);
  const yCrunch = useTransform(scrollYProgress, [0.38, 0.46, 0.62, 0.70], [30, 0, 0, -30]);
  const lineCrunch = useTransform(scrollYProgress, [0.38, 0.46, 0.62, 0.70], [0, 1, 1, 0]);

  // Step 3 [0.68 - 0.98]: Smooth and Chilled Cream
  const opacityCream = useTransform(scrollYProgress, [0.68, 0.76, 0.90, 0.98], [0, 1, 1, 0]);
  const yCream = useTransform(scrollYProgress, [0.68, 0.76, 0.90, 0.98], [30, 0, 0, -30]);
  const lineCream = useTransform(scrollYProgress, [0.68, 0.76, 0.90, 0.98], [0, 1, 1, 0]);

  const opacityTitle = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const features = [
    {
      num: "01",
      title: anatomy.layer1Title || "Crunchy Almond Topping",
      description: anatomy.layer1Desc || "Specially crafted almond crunch with our secret recipe for an irresistibly crispy bite",
      opacity: opacityAlmond,
      yPos: yAlmond,
      lineScale: lineAlmond,
      color: "text-[#318EC7]", // Brand Cyan
      lineBg: "bg-[#318EC7]",
      lineWidth: "w-16 sm:w-24 md:w-28 lg:w-36",
      lineRotation: "rotate-0",
    },
    {
      num: "02",
      title: anatomy.layer2Title || "Hot, Golden & Crispy Outer Layer",
      description: anatomy.layer2Desc || "Oven-baked to a rich golden crunch every single order.",
      opacity: opacityCrunch,
      yPos: yCrunch,
      lineScale: lineCrunch,
      color: "text-[#DE3558]", // Brand Pink
      lineBg: "bg-[#DE3558]",
      lineWidth: "w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24",
      lineRotation: "rotate-0",
    },
    {
      num: "03",
      title: anatomy.layer3Title || "Smooth and Chilled Cream",
      description: anatomy.layer3Desc || "Velvety Japanese cream piped fresh into the warm crust.",
      opacity: opacityCream,
      yPos: yCream,
      lineScale: lineCream,
      color: "text-[#318EC7]", // Brand Cyan
      lineBg: "bg-[#318EC7]",
      lineWidth: "w-40 sm:w-[180px] md:w-[210px] lg:w-[270px] xl:w-[340px] 2xl:w-[420px]",
      lineRotation: "rotate-[28deg] sm:rotate-[29deg] lg:rotate-[28.5deg] xl:rotate-[27deg]",
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAF4E7] h-[320vh] sm:h-[380vh]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        
        {/* ─── FULL-BLEED 1080P PRODUCT ANIMATION VIDEO (Pristine Original Quality) ─── */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/tumo_dessert_animation.mp4"
            poster="/videos/tumu_product_poster.jpg"
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-cover object-center gpu-layer pointer-events-none"
          />
          {/* Subtle gradient overlay to enhance text legibility on left */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#FAF4E7]/40 via-transparent to-transparent z-10" />
        </div>

        {/* ─── MAIN SECTION TITLE (Top Right, Fades out smoothly on initial scroll) ─── */}
        <motion.div 
          style={{ opacity: opacityTitle }}
          className="absolute right-4 sm:right-12 lg:right-16 xl:right-20 top-20 sm:top-24 lg:top-28 z-30 pointer-events-none flex flex-col items-end text-right"
        >
          <span className="font-heading text-[16px] xs:text-[18px] sm:text-2xl lg:text-[26px] text-[#DB3E59] uppercase tracking-wide leading-tight mb-2 sm:mb-3 block">
            {anatomy.eyebrow || "ANATOMY OF PERFECTION"}
          </span>
          <h2 className="font-black uppercase tracking-tight leading-[0.92] mb-4 sm:mb-6 text-[32px] xs:text-[38px] sm:text-[46px] lg:text-[clamp(3.4rem,6vw,5rem)]">
            <span className="block text-[#162B3A]">{(anatomy as any).headingLine1 || "WHAT'S INSIDE"}</span>
            <span className="block text-[#DB3E59]">{(anatomy as any).headingLine2 || "A TUMU"}</span>
          </h2>
        </motion.div>

        {/* ─── 3-STEP FEATURE ANNOTATIONS OVERLAY (Docked bottom on mobile, left on desktop) ─── */}
        <div className="absolute left-4 right-4 sm:right-auto sm:left-12 lg:left-16 xl:left-20 bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-40 w-auto pointer-events-none pb-[env(safe-area-inset-bottom,0)]">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              style={{ opacity: feature.opacity, y: feature.yPos }}
              className="absolute bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-full sm:w-[380px] md:w-[420px] flex flex-col"
            >
              {/* Massive Background Number (Desktop only) */}
              <div className={`hidden sm:block absolute -left-4 sm:-left-8 top-0 text-[100px] lg:text-[130px] font-heading font-normal opacity-25 ${feature.color} select-none pointer-events-none leading-none tracking-tight`}>
                {feature.num}
              </div>
              
              {/* Card Container (Crisp & lightweight on mobile, transparent on desktop) */}
              <div className="relative z-10 p-4 sm:p-0 sm:pl-2 lg:pl-6 sm:pt-4 bg-[#FAF4E7]/96 sm:bg-transparent rounded-2xl sm:rounded-none border border-black/5 sm:border-0 shadow-lg sm:shadow-none">
                {/* Mobile Layer Progress Pill Badge */}
                <div className="flex sm:hidden items-center justify-between mb-2 pb-2 border-b border-black/5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white ${feature.lineBg}`}>
                    Layer {feature.num}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          dotIdx === idx ? `w-4 ${feature.lineBg}` : "w-1.5 bg-[#162B3A]/25"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative inline-flex items-center mb-1.5 sm:mb-3">
                  {/* Title */}
                  <h3 className="text-base xs:text-lg sm:text-2xl lg:text-[34px] font-black uppercase tracking-tight text-[#162B3A] drop-shadow-sm leading-[1.15]">
                    {feature.title}
                  </h3>
                  
                  {/* Animated Line Indicator (Desktop/Tablet) */}
                  <div className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center shrink-0 pointer-events-none origin-left ${feature.lineRotation || ""}`}>
                    <motion.div 
                      className={`h-[4px] ${feature.lineWidth} ${feature.lineBg} origin-left rounded-l-full shadow-sm`}
                      style={{ scaleX: feature.lineScale }} 
                    />
                    <div className="relative flex items-center justify-center shrink-0">
                      <motion.div 
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full ${feature.lineBg} shadow-md border-2 border-white`}
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
                <p className="text-[#162B3A] font-medium sm:font-bold text-xs sm:text-base lg:text-lg leading-relaxed max-w-[360px] drop-shadow-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── SCROLL HINT (Bottom Center) ─── */}
        <motion.div
          style={{ opacity: opacityTitle }}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2"
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
