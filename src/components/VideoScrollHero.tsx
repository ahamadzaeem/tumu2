"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

import PillButton from "./PillButton";

const TOTAL_FRAMES = 120;

const CHECKPOINTS = [
  {
    start: 0,
    end: 0.25,
    subtitle: "THE ART OF CRAFTSMANSHIP",
    titleLine1: "FRESHLY BAKED",
    titleLine2: "CRUNCH.",
    description: "Every TUMU starts with our signature golden pastry dough, baked to crisp perfection.",
    btnText: "Discover the process",
    textColor: "text-[#5CBEB3]"
  },
  {
    start: 0.25,
    end: 0.50,
    subtitle: "SIGNATURE FILLING",
    titleLine1: "VELVETY CREAM",
    titleLine2: "INJECTION.",
    description: "Generously injected with ultra-smooth, chilled artisanal cream from top to bottom.",
    btnText: "Taste the cream",
    textColor: "text-[#DB3E59]"
  },
  {
    start: 0.50,
    end: 0.75,
    subtitle: "PERFECT HARMONY",
    titleLine1: "CRISP & CREAM",
    titleLine2: "BALANCE.",
    description: "The irresistible contrast of warm, golden outer crunch and cool, silky cream inside.",
    btnText: "Our flavours",
    textColor: "text-[#4694C6]"
  },
  {
    start: 0.75,
    end: 1.0,
    subtitle: "PURE HAPPINESS",
    titleLine1: "DISCOVER YOUR",
    titleLine2: "TUMU.",
    description: "Handcrafted daily for an unforgettable dessert experience in every bite.",
    btnText: "Find a store",
    textColor: "text-[#DB3E59]"
  }
];

export default function VideoScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeCheckpointIndex, setActiveCheckpointIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 100, damping: 24, mass: 0.5 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const renderFrameRef = useRef<(progressVal: number) => void>(() => {});

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
    // Assign imagesRef immediately BEFORE setting src or load handlers
    imagesRef.current = loadedImages;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      loadedImages[i] = img;
      const frameNum = String(i).padStart(3, "0");

      img.onload = () => {
        loadedCount++;
        // Render immediately as soon as frame 0 or any early frame finishes loading
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

      const currentIdx = CHECKPOINTS.findIndex(
        (cp) => val >= cp.start && val <= cp.end
      );
      if (currentIdx !== -1 && currentIdx !== activeCheckpointIndex) {
        setActiveCheckpointIndex(currentIdx);
      }
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

    // Initial render attempt
    renderFrame(smoothProgress.get() || 0);

    return () => {
      unsubscribe();
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [smoothProgress, activeCheckpointIndex]);

  const activeCheckpoint = CHECKPOINTS[activeCheckpointIndex] || CHECKPOINTS[0];

  return (
    <section ref={containerRef} className="relative w-full h-[500vh] bg-[#F8F4EC]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Canvas Background Video Frame Sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Very Light Subtle Soft Gradient Overlay (Left to Center) */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[52%] bg-gradient-to-r from-[#F8F4EC]/75 via-[#F8F4EC]/35 to-transparent z-10 pointer-events-none" />

        {/* Floating Checkpoint UI (Matched exact design from reference image) */}
        <div className="relative z-30 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 flex items-center justify-between pointer-events-none">
          
          <div className="max-w-[560px]">
            {/* Dynamic Text Checkpoint Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCheckpointIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-start"
              >
                {/* 1. Subtitle Category Tag */}
                <span className={`font-black text-xs sm:text-sm uppercase tracking-[0.18em] mb-3 ${activeCheckpoint.textColor}`}>
                  {activeCheckpoint.subtitle}
                </span>

                {/* 2. Main Headline in 2 lines in primary brand color */}
                <h1 className={`text-4xl sm:text-5xl lg:text-[56px] font-black uppercase tracking-tight leading-[0.95] mb-6 ${activeCheckpoint.textColor}`}>
                  <span className="block">{activeCheckpoint.titleLine1}</span>
                  <span className="block">{activeCheckpoint.titleLine2}</span>
                </h1>

                {/* 3. Description subtext in white */}
                <p className="text-white font-bold sm:font-semibold text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-[440px] mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  {activeCheckpoint.description}
                </p>

                {/* 4. Pink Pill Button */}
                <div className="pointer-events-auto">
                  <PillButton variant="pink" showArrow>
                    {activeCheckpoint.btnText}
                  </PillButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Scroll Cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-75">
          <span className="text-xs font-bold uppercase tracking-widest text-[#162B3A]">Scroll to Explore</span>
          <div className="w-5 h-9 rounded-full border-2 border-[#162B3A] flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#162B3A]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
