"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface PillButtonProps {
  children: React.ReactNode;
  variant?: "pink" | "white" | "cyan" | "outline";
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
}

export default function PillButton({
  children,
  variant = "pink",
  onClick,
  className = "",
  showArrow = true,
}: PillButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 h-[48px] px-7 rounded-full font-bold text-sm tracking-wide transition-all duration-200 active:scale-95 cursor-pointer shadow-sm hover:shadow-md";

  const variantStyles = {
    pink: "bg-[#DB3E59] text-white hover:bg-[#D81F51]",
    white: "bg-white text-[#162B3A] hover:bg-[#F0EBE1]",
    cyan: "bg-[#5CBEB3] text-white hover:bg-[#2AA0BC]",
    outline:
      "border-2 border-[#162B3A] text-[#162B3A] hover:bg-[#162B3A] hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <span>{children}</span>
      {showArrow && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
    </button>
  );
}
