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
    pink: "bg-[#DD4561] text-white hover:bg-[#C9334F]",
    white: "bg-white text-[#162B3A] hover:bg-[#FAF4E7] border border-black/5",
    cyan: "bg-[#4398CB] text-white hover:bg-[#3488BA]",
    outline:
      "border-2 border-[#4398CB] text-[#162B3A] bg-white/70 backdrop-blur-sm hover:bg-[#4398CB] hover:text-white",
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
