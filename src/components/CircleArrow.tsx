"use client";

import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface CircleArrowProps {
  direction?: "left" | "right";
  variant?: "blue" | "pink" | "outline" | "white" | "cyan-outline";
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function CircleArrow({
  direction = "right",
  variant = "blue",
  onClick,
  className = "",
  size = "md",
}: CircleArrowProps) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-14 h-14",
  };

  const iconSizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const variantStyles = {
    blue: "bg-[#4694C6] text-white hover:bg-[#1277A6]",
    pink: "bg-[#DB3E59] text-white hover:bg-[#D81F51]",
    outline:
      "border border-[#DB3E59]/40 text-[#DB3E59] hover:bg-[#DB3E59] hover:text-white bg-white/60",
    "cyan-outline":
      "border border-[#5CBEB3] text-[#5CBEB3] hover:bg-[#5CBEB3] hover:text-white bg-transparent",
    white: "bg-white text-[#162B3A] shadow-md hover:bg-[#F8F4EC]",
  };

  const Icon = direction === "left" ? ArrowLeft : ArrowRight;

  return (
    <button
      onClick={onClick}
      className={`rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer ${sizeMap[size]} ${variantStyles[variant]} ${className}`}
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      <Icon className={`${iconSizeMap[size]} stroke-[2.5]`} />
    </button>
  );
}
