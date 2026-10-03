"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#F8F4EC] border-t border-[#162B3A]/10 pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#162B3A]/10">
          {/* Brand Logo Column (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <Link href="/" className="flex flex-col items-start mb-4 overflow-hidden">
              <Image
                src="/images/tumu-logo-final.png"
                alt="TUMU Crisp & Cream Logo"
                width={240}
                height={300}
                className="object-contain w-28 sm:w-36 h-auto mb-4"
                priority
              />
            </Link>
            <p className="text-xs text-[#162B3A]/70 font-medium max-w-[220px]">
              Modern Japanese dessert sticks made with golden crisp exterior and
              chilled smooth cream.
            </p>
          </div>

          {/* EXPLORE (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#162B3A] mb-4">
              EXPLORE
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold text-[#162B3A]">
              <li>
                <Link href="#flavours" className="hover:text-[#DB3E59] transition-colors">
                  Flavours
                </Link>
              </li>
              <li>
                <Link href="#story" className="hover:text-[#DB3E59] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#process" className="hover:text-[#DB3E59] transition-colors">
                  Process
                </Link>
              </li>
              <li>
                <Link href="#stores" className="hover:text-[#DB3E59] transition-colors">
                  Where to Buy
                </Link>
              </li>
              <li>
                <Link href="#franchise" className="hover:text-[#DB3E59] transition-colors">
                  Franchise
                </Link>
              </li>
            </ul>
          </div>

          {/* HELP (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#162B3A] mb-4">
              HELP
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold text-[#162B3A]">
              <li>
                <Link href="#" className="hover:text-[#DB3E59] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#DB3E59] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* FOLLOW (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#162B3A] mb-4">
              FOLLOW
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold text-[#162B3A]">
              <li>
                <a href="#" className="hover:text-[#DB3E59] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#DB3E59] transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#DB3E59] transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* SWEET UPDATES Newsletter (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h4 className="text-lg font-black uppercase tracking-tight leading-tight mb-3">
              <span className="text-[#DB3E59]">SWEET UPDATES </span>
              <span className="text-[#5CBEB3]">IN YOUR INBOX.</span>
            </h4>

            {subscribed ? (
              <p className="text-sm font-bold text-[#4694C6] bg-white p-3 rounded-full">
                Thank you for subscribing! ✨
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="w-full relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full h-12 pl-5 pr-14 rounded-full bg-white border border-[#162B3A]/20 text-sm text-[#162B3A] placeholder-[#162B3A]/50 focus:outline-none focus:border-[#DB3E59] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 w-10 h-10 rounded-full bg-[#DB3E59] text-white flex items-center justify-center hover:bg-[#D81F51] transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#162B3A]/70">
          <div>© 2024 TUMU. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-[#DB3E59]">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="#" className="hover:text-[#DB3E59]">
              Terms
            </Link>
            <span>|</span>
            <span className="hover:text-[#DB3E59] cursor-pointer">日本語</span>
            <span>|</span>
            <span className="text-[#DB3E59] font-bold cursor-pointer">English</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
