"use client";

import React from "react";

interface BrandStripesProps {
  color?: "pink" | "blue" | "cyan";
  direction?: "vertical" | "diagonal";
  count?: number;
  stripeWidth?: number;
  gap?: number;
  className?: string;
}

export default function BrandStripes({
  color = "blue",
  direction = "vertical",
  count = 7,
  stripeWidth = 6,
  gap = 7,
  className = "",
}: BrandStripesProps) {
  const colorHex = {
    pink: "#DB3E59",
    blue: "#4694C6",
    cyan: "#5CBEB3",
  }[color];

  const totalWidth = count * (stripeWidth + gap);

  if (direction === "vertical") {
    return (
      <svg
        className={`block select-none ${className}`}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern
          id={`stripe-v-${color}-${stripeWidth}-${gap}`}
          width={stripeWidth + gap}
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width={stripeWidth} height="10" fill={colorHex} />
        </pattern>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#stripe-v-${color}-${stripeWidth}-${gap})`}
        />
      </svg>
    );
  }

  return (
    <svg
      className={`block select-none ${className}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern
        id={`stripe-d-${color}-${stripeWidth}-${gap}`}
        width={stripeWidth + gap}
        height={stripeWidth + gap}
        patternTransform="rotate(45 0 0)"
        patternUnits="userSpaceOnUse"
      >
        <line
          x1="0"
          y1="0"
          x2="0"
          y2={stripeWidth + gap}
          stroke={colorHex}
          strokeWidth={stripeWidth}
        />
      </pattern>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#stripe-d-${color}-${stripeWidth}-${gap})`}
      />
    </svg>
  );
}
