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
  const lastFrameIndexRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  const dimensionsRef = useRef({
    width: 0,
    height: 0,
    drawW: 0,
    drawH: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─── CREAMY SPRING PHYSICS ───
  // Lower stiffness + balanced damping + slight inertia creates a velvety, buttery scroll feel
  const springConfig = { stiffness: 45, damping: 18, mass: 0.6, restDelta: 0.0001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const renderFrameRef = useRef<(progressVal: number) => void>(() => {});

  // ─── STORYTELLING TRANSITIONS ───
  // 1. Initial text: visible at frame 0, smoothly fades out as user scrolls
  const initialOpacity = useTransform(smoothProgress, [0, 0.08, 0.14], [1, 0.9, 0]);
  const initialY = useTransform(smoothProgress, [0, 0.14], [0, -30]);
  const initialPointerEvents = useTransform(smoothProgress, (val) =>
    val < 0.12 ? "auto" : "none"
  );

  // 2. Middle section (0.14 to 0.80): ABSOLUTELY NO TEXT — pure cinematic video!

  // 3. Last frame reveal (0.80 to 1.0): climax text & CTA reveal over the frame
  const finalOpacity = useTransform(smoothProgress, [0.78, 0.88, 1.0], [0, 1, 1]);
  const finalY = useTransform(smoothProgress, [0.78, 0.88], [35, 0]);
  const finalScale = useTransform(smoothProgress, [0.78, 0.88], [0.95, 1]);
  const finalPointerEvents = useTransform(smoothProgress, (val) =>
    val > 0.8 ? "auto" : "none"
  );

  // Soft ambient overlay for the final climax reveal so text pops while video remains visible
  const finalBackdropOpacity = useTransform(smoothProgress, [0.78, 0.88], [0, 0.35]);

  // Subtle black overlay for 1st text part so text is more visible, smoothly fading out as user begins scrolling
  const initialBackdropOpacity = useTransform(smoothProgress, [0, 0.08, 0.14], [0.22, 0.12, 0]);

  // Bottom scroll cue fades out quickly as user starts scrolling
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.06], [0.8, 0]);

  // Pre-calculate and cache canvas dimensions to avoid GPU context reset during scroll
  const updateDimensions = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const bufferW = Math.round(rect.width * dpr);
    const bufferH = Math.round(rect.height * dpr);

    if (canvas.width !== bufferW || canvas.height !== bufferH) {
      canvas.width = bufferW;
      canvas.height = bufferH;
    }

    // 16:9 1080p source aspect ratio
    const imgAspect = 16 / 9;
    const canvasAspect = bufferW / (bufferH || 1);

    let drawW = bufferW;
    let drawH = bufferH;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawH = Math.round(bufferW / imgAspect);
      offsetY = Math.round((bufferH - drawH) / 2);
    } else {
      drawW = Math.round(bufferH * imgAspect);
      offsetX = Math.round((bufferW - drawW) / 2);
    }

    dimensionsRef.current = {
      width: bufferW,
      height: bufferH,
      drawW,
      drawH,
      offsetX,
      offsetY,
    };

    lastFrameIndexRef.current = -1;
  };

  // Ultra-fast renderFrame: zero context reconfiguration, nearest-frame fallback
  const renderFrame = (progressVal: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const safeProgress = isNaN(progressVal) ? 0 : Math.min(1, Math.max(0, progressVal));
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(safeProgress * (TOTAL_FRAMES - 1)))
    );

    // Skip redundant draw if frame hasn't changed
    if (frameIndex === lastFrameIndexRef.current && lastFrameIndexRef.current !== -1) {
      return;
    }

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
      const { width, height, drawW, drawH, offsetX, offsetY } = dimensionsRef.current;
      if (width > 0 && height > 0 && drawW > 0 && drawH > 0) {
        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        lastFrameIndexRef.current = frameIndex;
      }
    }
  };

  renderFrameRef.current = renderFrame;

  // Progressive preloading of all 240 frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = loadedImages;

    // Load order: Priority 1: frame 0, Priority 2: every 4th frame, Priority 3: remaining frames
    const order: number[] = [0];
    for (let i = 4; i < TOTAL_FRAMES; i += 4) {
      order.push(i);
    }
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      if (i % 4 !== 0) {
        order.push(i);
      }
    }

    order.forEach((i) => {
      const img = new Image();
      loadedImages[i] = img;
      const frameNum = String(i).padStart(3, "0");

      img.onload = () => {
        loadedCount++;
        // As soon as frame 0 or initial frames load, trigger draw
        if (i === 0 || loadedCount === 1) {
          renderFrameRef.current(smoothProgress.get() || 0);
        }
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      img.src = `/images/tumu/scroll-frames/frame_${frameNum}.jpg`;
    });
  }, []);

  // Update canvas on smooth scroll progress and window resize
  useEffect(() => {
    updateDimensions();

    const unsubscribe = smoothProgress.on("change", (val) => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        renderFrame(val);
      });
    });

    const handleResize = () => {
      updateDimensions();
      renderFrame(smoothProgress.get() || 0);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    renderFrame(smoothProgress.get() || 0);

    return () => {
      unsubscribe();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [imagesLoaded]);

  return (
    <section ref={containerRef} className="relative w-full h-[500vh] bg-[#F8F4EC]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Canvas Background Video Frame Sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Subtle Initial Black Overlay (Makes 1st text part more visible, fades out smoothly on scroll) */}
        <motion.div
          style={{ opacity: initialBackdropOpacity }}
          className="absolute inset-0 bg-black pointer-events-none z-10"
        />

        {/* Ambient Climax Backdrop (Fades in at the last frame to ensure text pop) */}
        <motion.div
          style={{ opacity: finalBackdropOpacity }}
          className="absolute inset-0 bg-[#162B3A] pointer-events-none z-10"
        />

        {/* ════════════════════════════════════════════════════════════════
            PHASE 1: CREATIVE INITIAL TEXT (CENTERED - BEFORE SCROLLING)
            Fades out smoothly as the user begins scrolling.
           ════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            opacity: initialOpacity,
            y: initialY,
            pointerEvents: initialPointerEvents as any,
          }}
          className="absolute inset-0 z-30 flex items-center justify-center p-6 pt-16 sm:pt-20"
        >
          <div className="w-full max-w-[900px] mx-auto flex flex-col items-center text-center">
            
            {/* Bold Editorial Headline - Titan One Font Centered */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-[70px] xl:text-[78px] font-normal uppercase tracking-tight leading-[0.95] mb-8 drop-shadow-[0_4px_24px_rgba(22,43,58,0.26)]">
              <span className="block text-[#318EC7]">A CRISP CRUST.</span>
              <span className="block text-[#DE3558]">
                A VELVET HEART<span className="text-[#DE3558]">.</span>
              </span>
            </h1>

            {/* Action Buttons - Brand Pink and Cyan Duo Centered */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#flavours">
                <PillButton variant="pink" showArrow>
                  Explore Our Flavours
                </PillButton>
              </a>
              <Link href="/find-us">
                <PillButton variant="cyan" showArrow>
                  Find a Store
                </PillButton>
              </Link>
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
          <div className="w-full max-w-[880px] mx-auto flex flex-col items-center text-center">

            {/* Grand Climax Headline - Titan One Font with Enhanced Visibility */}
            <h2 className="font-heading text-4xl sm:text-6xl lg:text-[70px] xl:text-[78px] font-normal uppercase tracking-tight leading-[0.95] mb-8 drop-shadow-[0_4px_24px_rgba(22,43,58,0.28)]">
              <span className="block text-[#318EC7]">EVERY BITE,</span>
              <span className="block text-[#DE3558]">
                PURE HAPPINESS<span className="text-[#DE3558]">.</span>
              </span>
            </h2>

            {/* Small CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#flavours">
                <PillButton variant="pink" showArrow>
                  Explore Our Flavours
                </PillButton>
              </a>
              <Link href="/find-us">
                <PillButton variant="white" showArrow>
                  Visit a Store
                </PillButton>
              </Link>
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
