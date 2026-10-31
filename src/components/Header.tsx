"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import PillButton from "./PillButton";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Story", href: "/story" },
    { label: "Franchise", href: "/franchise" },
    { label: "Flavors", href: "/flavors" },
    { label: "Find Us", href: "/find-us" },
    { label: "Events", href: "/catering" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 h-[92px] sm:h-[104px] flex items-center justify-center z-50 transition-all duration-300 border-b-0 overflow-visible ${
          scrolled
            ? "bg-white/85 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 flex items-center justify-between overflow-visible">
          
          {/* Brand Logo (Left Column - 100% Increased Size) */}
          <div className="flex-1 flex items-center justify-start overflow-visible py-2">
            <Link href="/" className="flex items-center group py-1 overflow-visible">
              <Image
                src="/images/tumu-logo-final.png"
                alt="TUMU Crisp & Cream Logo"
                width={280}
                height={400}
                className="object-contain h-[105px] sm:h-[118px] md:h-[128px] w-auto transition-transform duration-200 group-hover:scale-105 drop-shadow-sm"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation (PERFECTLY CENTERED) */}
          <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-12">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm sm:text-base font-bold text-[#162B3A] hover:text-[#DB3E59] transition-colors duration-200 tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Column (Franchise Now CTA on Desktop / Mobile Toggle) */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="hidden md:flex items-center">
              <Link
                href="/franchise"
                className="px-6 py-2.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs lg:text-sm font-black uppercase tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-1.5"
              >
                <span>Franchise Now</span>
                <span>→</span>
              </Link>
            </div>
            {/* Hamburger Menu Toggle (Mobile Only) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#162B3A] hover:text-[#DB3E59] focus:outline-none cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7 stroke-[2.5]" />
              ) : (
                <Menu className="w-7 h-7 stroke-[2.5]" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-[88px] left-0 right-0 h-screen bg-[#F8F4EC] p-8 flex flex-col gap-6 md:hidden z-40 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black text-[#162B3A] hover:text-[#DB3E59] border-b border-[#162B3A]/10 pb-4"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3 mt-auto mb-24">
            <Link href="/story" onClick={() => setMobileMenuOpen(false)}>
              <PillButton variant="pink" showArrow className="w-full justify-center">
                What is TUMU
              </PillButton>
            </Link>
            <Link href="/franchise" onClick={() => setMobileMenuOpen(false)}>
              <PillButton variant="cyan" showArrow className="w-full justify-center">
                Franchise Now
              </PillButton>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
