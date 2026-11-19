"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillButton from "./PillButton";
import { getSiteContent } from "@/lib/cms";

export default function VideoScrollHero() {
  const [content, setContent] = useState(getSiteContent());

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const heroData = content?.home?.videoScrollHero || {
    phase1Headline1: "a unique viral concept.",
    phase1Headline2: "crafted by a japanese chef",
    phase1Btn1Text: "Own a Franchise.",
    phase1Btn1Link: "/franchise#form",
    phase1Btn2Text: "",
    phase1Btn2Link: "",
    phase3Headline1: "EVERY BITE,",
    phase3Headline2: "PURE HAPPINESS.",
    phase3Btn1Text: "What is TUMU",
    phase3Btn1Link: "/our-story",
    phase3Btn2Text: "Own a Franchise",
    phase3Btn2Link: "/franchise#form",
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Framer Motion scroll tracker for perfectly synchronized text transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─── STORYTELLING TRANSITIONS ───
  // 1. Initial text: visible at frame 0, smoothly fades out as user scrolls
  const initialOpacity = useTransform(scrollYProgress, [0, 0.08, 0.14], [1, 0.9, 0]);
  const initialY = useTransform(scrollYProgress, [0, 0.14], [0, -30]);
  const initialPointerEvents = useTransform(scrollYProgress, (val) =>
    val < 0.12 ? "auto" : "none"
  );

  // Subtle initial backdrop to enhance initial text legibility without blocking the product
  const initialBackdropOpacity = useTransform(scrollYProgress, [0, 0.08, 0.14], [0.10, 0.05, 0]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.06], [0.8, 0]);

  // ─── OPTION 1: HARDWARE-ACCELERATED VIDEO SCROLL SCRUBBING ───
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    let st: ScrollTrigger | null = null;

    const setupVideoScrubber = () => {
      // Warm up video decoder on mobile/iOS
      video.play().then(() => {
        video.pause();
      }).catch(() => {});

      st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15, // Ultra-responsive 150ms interpolation for silky smooth 60fps
        onUpdate: (self) => {
          if (!video.duration || isNaN(video.duration)) return;
          const targetTime = Math.min(
            self.progress * (video.duration - 0.05),
            video.duration - 0.05
          );
          // Only update if difference is meaningful to save GPU cycles
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
    }

    return () => {
      if (st) st.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[500vh] bg-[#F8F4EC]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Hardware-Accelerated Scrubbed Video Element */}
        <video
          ref={videoRef}
          src="/images/tumu/hero-scroll.mp4"
          preload="auto"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 gpu-layer"
        />

        {/* Subtle Initial Black Overlay for Title Legibility */}
        <motion.div
          style={{ opacity: initialBackdropOpacity }}
          className="absolute inset-0 bg-black pointer-events-none z-10"
        />

        {/* ════════════════════════════════════════════════════════════════
            PHASE 1: REFINED INITIAL TEXT (COMPACT & BALANCED)
            Small, bold, lowercase text letting product image shine through.
            Fades out smoothly as the user begins scrolling.
           ════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            opacity: initialOpacity,
            y: initialY,
            pointerEvents: initialPointerEvents as any,
          }}
          className="absolute inset-0 z-30 flex items-center justify-center p-6 pt-12 sm:pt-16"
        >
          <div className="w-full max-w-[640px] mx-auto flex flex-col items-center text-center">
            
            {/* Standardised Hero Typography */}
            <h1 className="text-[34px] xs:text-[38px] sm:text-[44px] lg:text-5xl font-black uppercase tracking-tight leading-[0.92] mb-5 text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
              <span className="block text-white">{heroData.phase1Headline1 || "a unique viral concept."}</span>
              <span className="block text-white">
                {heroData.phase1Headline2 || "crafted by a japanese chef"}
              </span>
            </h1>

            {/* Action Buttons - Own a Franchise */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {heroData.phase1Btn1Text && (
                <Link href={heroData.phase1Btn1Link || "/franchise#form"}>
                  <PillButton variant="pink" showArrow className="px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm lg:text-base font-black">
                    {heroData.phase1Btn1Text}
                  </PillButton>
                </Link>
              )}
              {heroData.phase1Btn2Text && (
                <Link href={heroData.phase1Btn2Link || "/franchise#form"}>
                  <PillButton variant="cyan" showArrow className="px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm lg:text-base font-black">
                    {heroData.phase1Btn2Text}
                  </PillButton>
                </Link>
              )}
            </div>

          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            SCROLL EXPERIENCE: PURE PRODUCT FOCUS
            No text overlays during or at the end of the scroll,
            allowing the crispy pastry break and cream to be fully showcased.
           ════════════════════════════════════════════════════════════════ */}

        {/* Initial Scroll Cue (Only visible at the very beginning) */}
        <motion.div
          style={{ opacity: scrollCueOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#162B3A]/70">
            Scroll to Explore
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-[#162B3A]/60 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#DB3E59]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
