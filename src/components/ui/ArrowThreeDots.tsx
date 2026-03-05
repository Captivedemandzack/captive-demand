"use client";

import React from "react";

/** Three dots forming a right-pointing arrow. Used across all CTA button variants. */
export function ArrowThreeDots({
  color = "currentColor",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <g opacity={1}>
        <circle cx="10.2004" cy="7.1999" r="1.8" fill={color} />
        <circle cx="10.2004" cy="16.8" r="1.8" fill={color} />
        <circle cx="14.9992" cy="12.0002" r="1.8" fill={color} />
      </g>
    </svg>
  );
}
