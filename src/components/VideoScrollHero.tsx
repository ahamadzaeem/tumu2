"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import PillButton from "./PillButton";

const TOTAL_FRAMES = 120;

export default function VideoScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 100, damping: 24, mass: 0.5 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const renderFrameRef = useRef<(progressVal: number) => void>(() => {});

  // ─── STORYTELLING TRANSITIONS ───
  // 1. Initial text on the left: visible at frame 0, smoothly fades out as user scrolls
  const initialOpacity = useTransform(smoothProgress, [0, 0.08, 0.14], [1, 0.9, 0]);
  const initialY = useTransform(smoothProgress, [0, 0.14], [0, -30]);
  const initialPointerEvents = useTransform(smoothProgress, (val) =>
    val < 0.12 ? "auto" : "none"
  );

  // 2. Middle section (0.14 to 0.80): ABSOLUTELY NO TEXT — pure cinematic video!

  // 3. Last frame reveal (0.80 to 1.0): climax text & small CTA reveal over the frame
  const finalOpacity = useTransform(smoothProgress, [0.78, 0.88, 1.0], [0, 1, 1]);
  const finalY = useTransform(smoothProgress, [0.78, 0.88], [35, 0]);
  const finalScale = useTransform(smoothProgress, [0.78, 0.88], [0.95, 1]);
  const finalPointerEvents = useTransform(smoothProgress, (val) =>
    val > 0.8 ? "auto" : "none"
  );

  // Soft ambient overlay for the final climax reveal so text pops while video remains visible
  const finalBackdropOpacity = useTransform(smoothProgress, [0.78, 0.88], [0, 0.35]);

  // Bottom scroll cue fades out quickly as user starts scrolling
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.06], [0.8, 0]);

  // Render current frame on canvas
  const renderFrame = (progressVal: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const safeProgress = isNaN(progressVal) ? 0 : Math.min(1, Math.max(0, progressVal));
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(safeProgress * TOTAL_FRAMES))
    );

    // Get current frame image or fallback to nearest loaded image
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[frameIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[frameIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (img && (img.complete || img.naturalWidth > 0)) {
      const width = canvas.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1440);
      const height = canvas.clientHeight || (typeof window !== "undefined" ? window.innerHeight : 900);

      if (width > 0 && height > 0) {
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        const imgWidth = img.naturalWidth || img.width;
        const imgHeight = img.naturalHeight || img.height;

        if (imgWidth > 0 && imgHeight > 0) {
          const imgAspect = imgWidth / imgHeight;
          const canvasAspect = width / height;

          let drawW = width;
          let drawH = height;
          let offsetX = 0;
          let offsetY = 0;

          if (canvasAspect > imgAspect) {
            drawH = width / imgAspect;
            offsetY = (height - drawH) / 2;
          } else {
            drawW = height * imgAspect;
            offsetX = (width - drawW) / 2;
          }

          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        }
      }
    }
  };

  renderFrameRef.current = renderFrame;

  // Preload all 120 frames & render frame 0 immediately upon load
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = loadedImages;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      loadedImages[i] = img;
      const frameNum = String(i).padStart(3, "0");

      img.onload = () => {
        loadedCount++;
        renderFrameRef.current(smoothProgress.get() || 0);
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      img.src = `/images/tumu/scroll-frames/frame_${frameNum}.jpg`;
    }
  }, []);

  // Re-render frame whenever imagesLoaded changes
  useEffect(() => {
    renderFrame(smoothProgress.get() || 0);
  }, [imagesLoaded]);

  // Update canvas on scroll and window resize
  useEffect(() => {
    const handleScroll = (val: number) => {
      renderFrame(val);
    };

    const unsubscribe = smoothProgress.on("change", (val) => {
      handleScroll(val);
    });

    const handleResize = () => {
      renderFrame(smoothProgress.get() || 0);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    renderFrame(smoothProgress.get() || 0);

    return () => {
      unsubscribe();
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [smoothProgress]);

  const scrollToNext = () => {
    const nextSection = document.getElementById("story-hero") || containerRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 1.5, behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[450vh] bg-[#F8F4EC]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Canvas Background Video Frame Sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Ambient Climax Backdrop (Fades in at the last frame to ensure text pop) */}
        <motion.div
          style={{ opacity: finalBackdropOpacity }}
          className="absolute inset-0 bg-[#162B3A] pointer-events-none z-10"
        />

        {/* ════════════════════════════════════════════════════════════════
            PHASE 1: CREATIVE INITIAL TEXT (LEFT SIDE - BEFORE SCROLLING)
            Fades out smoothly as the user begins scrolling.
           ════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            opacity: initialOpacity,
            y: initialY,
            pointerEvents: initialPointerEvents as any,
          }}
          className="absolute inset-0 z-30 flex items-center pt-16 sm:pt-20"
        >
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
            <div className="max-w-[460px] sm:max-w-[500px] flex flex-col items-start">
              
              {/* Creative Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/5 shadow-xs mb-4">
                <span className="w-2 h-2 rounded-full bg-[#DD4561] animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#162B3A]">
                  CRAFTED IN JAPAN &bull; 職人の手作り
                </span>
              </div>

              {/* Bold Editorial Headline - Using Exact TUMU Logo Colors */}
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black uppercase tracking-tight leading-[0.92] mb-5 drop-shadow-[0_2px_10px_rgba(255,255,255,0.7)]">
                <span className="block text-[#4398CB]">A CRISP CRUST.</span>
                <span className="block text-[#DD4561]">
                  A VELVET HEART<span className="text-[#DD4561]">.</span>
                </span>
              </h1>

              {/* Signature Cyan to Pink Gradient Accent Bar */}
              <div className="w-14 h-1.5 rounded-full bg-gradient-to-r from-[#4398CB] to-[#DD4561] mb-5" />

              {/* Evocative Subtitle */}
              <p className="text-[#162B3A]/90 font-semibold text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-[420px] mb-8 drop-shadow-xs">
                Japan&apos;s iconic choux pastry sticks, baked to golden caramelized crunch and filled cold to order with luscious artisanal cream.
              </p>

              {/* Action Buttons - Brand Pink and Cyan Duo */}
              <div className="flex flex-wrap items-center gap-4">
                <a href="#flavours">
                  <PillButton variant="pink" showArrow>
                    Explore Flavors
                  </PillButton>
                </a>
                <Link href="/find-us">
                  <PillButton variant="cyan" showArrow>
                    Find a Store
                  </PillButton>
                </Link>
              </div>

              {/* Creative Scroll Prompt */}
              <div className="flex items-center gap-2.5 mt-8 text-xs font-bold uppercase tracking-wider text-[#162B3A]/70">
                <span>Scroll down to crack the crust</span>
                <span className="text-[#DD4561] text-base animate-bounce">&darr;</span>
              </div>

            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            PHASE 2: WHILE SCROLLING (FRAMES ~15 TO ~105)
            NO TEXT, NOTHING!
            Pure, unhindered, cinema-grade food animation.
           ════════════════════════════════════════════════════════════════ */}

        {/* ════════════════════════════════════════════════════════════════
            PHASE 3: LAST FRAME REVEAL (CLIMAX TEXT & CTA)
            Comes on the frame once the pastry is fully broken open.
           ════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            opacity: finalOpacity,
            y: finalY,
            scale: finalScale,
            pointerEvents: finalPointerEvents as any,
          }}
          className="absolute inset-0 z-30 flex items-center justify-center p-6"
        >
          <div className="w-full max-w-[820px] mx-auto flex flex-col items-center text-center">
            
            {/* Climax Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/60 shadow-md mb-5">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#DD4561]">
                THE TUMU MOMENT &bull; 至福のひとくち
              </span>
            </div>

            {/* Grand Climax Headline */}
            <h2 className="text-4xl sm:text-6xl lg:text-[68px] font-black uppercase tracking-tight leading-[0.92] mb-5 drop-shadow-[0_2px_12px_rgba(255,255,255,0.7)]">
              <span className="block text-[#4398CB]">EVERY BITE,</span>
              <span className="block text-[#DD4561]">
                PURE HAPPINESS<span className="text-[#DD4561]">.</span>
              </span>
            </h2>

            <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-[#4398CB] to-[#DD4561] mb-5" />

            {/* Narrative Subtitle */}
            <p className="text-[#162B3A] font-bold text-base sm:text-lg lg:text-xl leading-relaxed max-w-[560px] mb-8 drop-shadow-sm">
              Baked fresh throughout the day and filled cold right in front of you. Never pre-filled, always extraordinary.
            </p>

            {/* Small CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <a href="#flavours">
                <PillButton variant="pink" showArrow>
                  Taste Our 8 Flavors
                </PillButton>
              </a>
              <Link href="/find-us">
                <PillButton variant="white" showArrow>
                  Visit a Store
                </PillButton>
              </Link>
              <button
                onClick={scrollToNext}
                className="px-6 py-3 rounded-full bg-white/80 hover:bg-white text-[#162B3A] font-bold text-xs uppercase tracking-wider backdrop-blur-md border border-black/5 transition-all shadow-sm"
              >
                Continue Story &darr;
              </button>
            </div>

          </div>
        </motion.div>

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
