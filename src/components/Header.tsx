"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import PillButton from "./PillButton";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Story", href: "/story" },
    { label: "Franchise", href: "/franchise" },
    { label: "Flavors", href: "/flavors" },
    { label: "Events", href: "/catering" },
    { label: "Find Us", href: "/find-us" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[60px] flex items-center justify-center z-50 bg-[#F8F4EC]/80 backdrop-blur-md border-b border-[#162B3A]/5 transition-all">
        <div className="w-full max-w-[1024px] mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Brand Logo (Far Left) */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/tumu-logo-final.png"
              alt="TUMU Crisp & Cream Logo"
              width={240}
              height={300}
              className="object-contain h-10 sm:h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <ul className="flex items-center justify-between w-full max-w-[500px]">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[13px] font-medium text-[#162B3A]/80 hover:text-[#162B3A] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions (Far Right) */}
          <div className="flex items-center justify-end w-12 md:w-auto">
            {/* Hamburger Menu Toggle (Mobile Only) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-[#162B3A]/80 hover:text-[#162B3A] focus:outline-none cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[2]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-[48px] left-0 right-0 h-screen bg-[#F8F4EC] p-6 flex flex-col gap-6 md:hidden z-40 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold text-[#162B3A] hover:text-[#DB3E59] border-b border-[#162B3A]/10 pb-4"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 flex items-center justify-end mt-auto mb-20">
            <PillButton variant="pink" showArrow>
              Explore TUMU
            </PillButton>
          </div>
        </div>
      )}
    </>
  );
}
