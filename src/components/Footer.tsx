"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSiteContent } from "@/lib/cms";

export default function Footer() {
  const [content, setContent] = useState(getSiteContent());

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, []);

  const general = content?.general || {
    description: "Japan's viral snack sensation – golden and crispy on the outside, with chilled, creamy perfection on the inside",
    instagramUrl: "https://instagram.com/tumu_uae",
    facebookUrl: "https://facebook.com/tumuae",
    youtubeUrl: "https://youtube.com/@tumuae",
    copyrightText: "© 2026 TUMU UAE. All rights reserved."
  };

  return (
    <footer className="w-full bg-[#F8F4EC] border-t border-[#162B3A]/10 pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#162B3A]/10">
          {/* Brand Logo Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex flex-col items-start mb-3 overflow-hidden group">
              <Image
                src="/images/tumu-logo-final.png"
                alt="TUMU Crisp & Cream Logo"
                width={200}
                height={250}
                className="object-contain h-[75px] sm:h-[85px] w-auto mb-3 group-hover:scale-105 transition-transform duration-200"
                priority
              />
            </Link>
            <p className="text-xs text-[#162B3A]/70 font-medium max-w-[220px]">
              {general.description}
            </p>
          </div>

          {/* EXPLORE (2 cols) - Dedicated SEO Pages */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#162B3A] mb-4">
              EXPLORE
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold text-[#162B3A]">
              <li>
                <Link href="/" className="hover:text-[#DB3E59] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/flavours" className="hover:text-[#DB3E59] transition-colors">
                  Our Flavours
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-[#DB3E59] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-[#DB3E59] transition-colors">
                  Store Locations
                </Link>
              </li>
              <li>
                <Link href="/franchise" className="hover:text-[#DB3E59] transition-colors">
                  Franchise
                </Link>
              </li>
            </ul>
          </div>

          {/* HELP & INFO (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#162B3A] mb-4">
              HELP &amp; INFO
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold text-[#162B3A]">
              <li>
                <Link href="/faq" className="hover:text-[#DB3E59] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#DB3E59] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/catering" className="hover:text-[#DB3E59] transition-colors">
                  Events &amp; Catering
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
                <a href={general.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#DB3E59] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href={general.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#DB3E59] transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href={general.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#DB3E59] transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#162B3A]/70">
          <div>{general.copyrightText}</div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-[#DB3E59] transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-[#DB3E59] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
