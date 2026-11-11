"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import PillButton from "./PillButton";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Story", href: "/our-story" },
    { label: "Flavours", href: "/flavours" },
    { label: "Process", href: "/process" },
    { label: "Locations", href: "/locations" },
    { label: "Franchise", href: "/franchise" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 pointer-events-none px-5 sm:px-8 lg:px-14 flex items-center justify-between">
        
        {/* ─── BRAND LOGO (OUTSIDE NAV BAR ON THE LEFT - PROMINENT & BIGGER) ─── */}
        <div className="pointer-events-auto flex items-center">
          <Link href="/" className="group flex items-center transition-transform hover:scale-105 duration-200">
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
        <nav className="pointer-events-auto hidden md:flex items-center gap-6 lg:gap-8 bg-white/95 backdrop-blur-md px-6 lg:px-8 py-2.5 rounded-full shadow-[0_10px_35px_rgba(22,43,58,0.1)] border border-[#162B3A]/8 transition-all duration-300 absolute left-1/2 -translate-x-1/2">
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
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#DB3E59]" />
                )}
              </Link>
            );
          })}

          {/* CTA Button Inside Floating Pill - Straight to Franchise Form */}
          <Link
            href="/franchise#form"
            className="ml-2 px-5 py-2.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm hover:shadow active:scale-95 flex items-center gap-1.5"
          >
            <span>Franchise Now</span>
            <span className="text-sm">→</span>
          </Link>
        </nav>

        {/* ─── MOBILE HAMBURGER TOGGLE (RIGHT SIDE ON MOBILE) ─── */}
        <div className="md:hidden pointer-events-auto">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 rounded-full bg-white/95 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-[#162B3A]/10 text-[#162B3A] hover:text-[#DB3E59] focus:outline-none cursor-pointer transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[2.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[2.5]" />
            )}
          </button>
        </div>

      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#F8F4EC] p-8 pt-28 flex flex-col gap-6 md:hidden z-40 animate-in slide-in-from-top duration-300">
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
          <div className="pt-4 flex flex-col gap-3 mt-auto mb-16">
            <Link href="/our-story" onClick={() => setMobileMenuOpen(false)}>
              <PillButton variant="pink" showArrow className="w-full justify-center">
                What is TUMU
              </PillButton>
            </Link>
            <Link href="/franchise#form" onClick={() => setMobileMenuOpen(false)}>
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

