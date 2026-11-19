"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import PillButton from "./PillButton";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection for header backdrop refinement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    { label: "Story", href: "/our-story", num: "01" },
    { label: "Flavours", href: "/flavours", num: "02" },
    { label: "Process", href: "/process", num: "03" },
    { label: "Locations", href: "/locations", num: "04" },
    { label: "Franchise", href: "/franchise", num: "05" },
    { label: "Contact", href: "/contact", num: "06" },
  ];

  // Motion Variants
  const menuContainerVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.32,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const navItemVariants: Variants = {
    closed: {
      opacity: 0,
      y: 20,
      x: -8,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        damping: 24,
        stiffness: 300,
      },
    },
  };

  const footerActionVariants: Variants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 22,
        stiffness: 280,
        delay: 0.35,
      },
    },
  };

  return (
    <>
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 pointer-events-none px-5 sm:px-8 lg:px-14 flex items-center justify-between">
        
        {/* ─── BRAND LOGO (OUTSIDE NAV BAR ON THE LEFT - PROMINENT & BIGGER) ─── */}
        <div className="pointer-events-auto flex items-center">
          <Link href="/" className="group flex items-center transition-transform hover:scale-105 active:scale-95 duration-200">
            <Image
              src="/images/tumu-logo-final.png"
              alt="TUMU Crisp & Cream Logo"
              width={300}
              height={380}
              className="object-contain h-[85px] sm:h-[95px] md:h-[105px] w-auto drop-shadow-md"
              priority
            />
          </Link>
        </div>

        {/* ─── FLOATING PILL NAV BAR (STRICTLY CENTERED HORIZONTALLY) ─── */}
        <nav
          className={`pointer-events-auto hidden md:flex items-center gap-6 lg:gap-8 bg-white/95 backdrop-blur-md px-6 lg:px-8 py-2.5 rounded-full shadow-[0_10px_35px_rgba(22,43,58,0.1)] border border-[#162B3A]/8 transition-all duration-300 absolute left-1/2 -translate-x-1/2 ${
            scrolled ? "shadow-[0_14px_40px_rgba(22,43,58,0.14)] py-2 scale-[0.98]" : ""
          }`}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative text-xs lg:text-[13px] font-black uppercase tracking-wider transition-colors duration-200 py-1 ${
                  isActive ? "text-[#DB3E59]" : "text-[#162B3A] hover:text-[#DB3E59]"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="desktopActiveDot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#DB3E59]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* CTA Button Inside Floating Pill - Straight to Franchise Form */}
          <Link
            href="/franchise#form"
            className="ml-2 px-5 py-2.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm hover:shadow active:scale-95 flex items-center gap-1.5 group"
          >
            <span>Franchise Now</span>
            <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </nav>

        {/* ─── MOBILE HAMBURGER TOGGLE (RIGHT SIDE ON MOBILE) ─── */}
        <div className="md:hidden pointer-events-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="relative p-3.5 rounded-full bg-white/95 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-[#162B3A]/10 text-[#162B3A] hover:text-[#DB3E59] focus:outline-none cursor-pointer transition-colors"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 stroke-[2.5]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu-icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 stroke-[2.5]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

      </header>

      {/* ─── ANIMATED FULLSCREEN MOBILE MENU ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-menu"
            variants={menuContainerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-[#FAF4E7]/98 backdrop-blur-2xl z-40 md:hidden flex flex-col justify-between px-7 sm:px-10 pt-28 pb-8 overflow-y-auto"
          >
            {/* Subtle decorative background watermark */}
            <div className="absolute -bottom-6 -right-6 text-[180px] font-black text-[#DB3E59]/5 select-none pointer-events-none leading-none tracking-tighter">
              ツム
            </div>

            {/* Navigation Links List */}
            <nav className="flex flex-col gap-2 relative z-10 my-auto py-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.label}
                    variants={navItemVariants}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center justify-between py-3.5 border-b border-[#162B3A]/8 transition-colors duration-200 ${
                        isActive ? "text-[#DB3E59]" : "text-[#162B3A] hover:text-[#DB3E59]"
                      }`}
                    >
                      <div className="flex items-baseline gap-3.5">
                        <span className="font-mono text-xs font-bold text-[#162B3A]/30 group-hover:text-[#DB3E59]/60 transition-colors">
                          {item.num}
                        </span>
                        <span className="text-[26px] sm:text-[30px] font-black tracking-tight uppercase leading-none">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isActive && (
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#DB3E59] bg-[#DB3E59]/10 px-2.5 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                        <ArrowRight
                          className={`w-5 h-5 transition-transform duration-200 ${
                            isActive
                              ? "text-[#DB3E59] translate-x-0"
                              : "text-[#162B3A]/30 group-hover:text-[#DB3E59] group-hover:translate-x-1"
                          }`}
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Floating Action CTAs */}
            <motion.div
              variants={footerActionVariants}
              className="relative z-10 flex flex-col gap-3 pt-4 mt-auto"
            >
              <Link href="/our-story" onClick={() => setMobileMenuOpen(false)}>
                <PillButton variant="pink" showArrow className="w-full justify-center py-3.5 text-sm font-black uppercase tracking-wider shadow-md">
                  What is TUMU
                </PillButton>
              </Link>
              <Link href="/franchise#form" onClick={() => setMobileMenuOpen(false)}>
                <PillButton variant="cyan" showArrow className="w-full justify-center py-3.5 text-sm font-black uppercase tracking-wider shadow-md">
                  Franchise Now
                </PillButton>
              </Link>

              <div className="text-center pt-2">
                <span className="text-[11px] font-bold text-[#162B3A]/50 uppercase tracking-widest">
                  Japanese Patisserie Craft • Dubai & UAE
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
