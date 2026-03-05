"use client";

import React from "react";
import { ArrowThreeDots } from "./ArrowThreeDots";

// --- Shared shapes for all button variants ---

const CornerShape = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 48"
    className={className}
    style={{ display: "block" }}
  >
    <path
      d="M0 0h5.63c7.808 0 13.536 7.337 11.642 14.91l-6.09 24.359A11.527 11.527 0 0 1 0 48V0Z"
      fill="currentColor"
    />
  </svg>
);

const IconBlobShape = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 51 48"
    className={className}
    style={{ display: "block" }}
  >
    <path
      fill="currentColor"
      d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z"
    />
  </svg>
);

export type CTAButtonVariant =
  | "grey" // Grey label + grey blob → orange on hover (CaseStudies, About, ExampleWork)
  | "dark" // Dark label + orange blob (FeaturesSection)
  | "bookCall" // Dark label + gray blob → dark on hover (ProcessSection default)
  | "bookCallOrange" // White label + black blob → white on hover (ProcessSection onOrange)
  | "pricing"; // Dark or light based on isDarkBg, full width

export interface CTAButtonProps {
  variant: CTAButtonVariant;
  text: string;
  href?: string;
  as?: "a" | "button";
  target?: string;
  rel?: string;
  isDarkBg?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

const variantConfig: Record<
  CTAButtonVariant,
  {
    labelClasses: string;
    cornerClasses: string;
    blobClasses: string;
    iconDefault: string;
    iconHover: string;
    blobDefault?: string;
    blobHover?: string;
  }
> = {
  grey: {
    labelClasses:
      "bg-[#e8e8e8] text-[#1a1512] group-hover:bg-[#ff5501] group-hover:text-white",
    cornerClasses: "text-[#e8e8e8] group-hover:text-[#ff5501]",
    blobClasses: "text-[#e8e8e8] group-hover:text-[#ff5501]",
    iconDefault: "#1a1512",
    iconHover: "#FFFFFF",
  },
  dark: {
    labelClasses: "bg-[#1a1512] text-white",
    cornerClasses: "text-[#1a1512]",
    blobClasses: "text-[#ff5501] group-hover:text-[#1a1512]",
    iconDefault: "#FFFFFF",
    iconHover: "#FFFFFF",
  },
  bookCall: {
    labelClasses:
      "bg-[#1a1512] text-white group-hover:bg-[#332D2A]",
    cornerClasses: "text-[#1a1512] group-hover:text-[#332D2A]",
    blobClasses: "text-[#f3f4f6] group-hover:text-[#1a1512]",
    iconDefault: "#1a1512",
    iconHover: "#FFFFFF",
  },
  bookCallOrange: {
    labelClasses: "bg-white text-[#1a1512]",
    cornerClasses: "text-white",
    blobClasses: "text-[#1a1512] group-hover:text-white",
    iconDefault: "#FFFFFF",
    iconHover: "#1a1512",
  },
  pricing: {
    labelClasses: "",
    cornerClasses: "",
    blobClasses: "",
    iconDefault: "#FFFFFF",
    iconHover: "#FFFFFF",
  },
};

export function CTAButton({
  variant,
  text,
  href,
  as,
  target,
  rel,
  isDarkBg = false,
  fullWidth = false,
  className = "",
  style = {},
  ariaLabel,
}: CTAButtonProps) {
  const isAnchor = as === "a" || (href != null && href !== "");
  const El = isAnchor ? "a" : "button";

  const baseConfig =
    variant === "pricing"
      ? isDarkBg
        ? {
            labelClasses:
              "bg-white text-[#1a1512] group-hover:bg-[#ff5501] group-hover:text-white",
            cornerClasses: "text-white group-hover:text-[#ff5501]",
            blobClasses: "text-white group-hover:text-[#ff5501]",
            iconDefault: "#1a1512",
            iconHover: "#FFFFFF",
          }
        : {
            labelClasses:
              "bg-[#1a1512] text-white group-hover:bg-[#ff5501]",
            cornerClasses: "text-[#1a1512] group-hover:text-[#ff5501]",
            blobClasses: "text-[#1a1512] group-hover:text-[#ff5501]",
            iconDefault: "#FFFFFF",
            iconHover: "#FFFFFF",
          }
      : variantConfig[variant];

  const labelSpan = (
    <span
      className={`
        relative flex items-center h-12 pl-5 pr-2 ${fullWidth ? "flex-grow mr-4" : "mr-4"}
        rounded-l-xl font-mono text-sm uppercase tracking-normal
        transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
        ${baseConfig.labelClasses}
      `}
    >
      <span className="z-10 relative">{text}</span>
      <div
        className={`absolute top-0 right-[-16px] bottom-0 w-[18px] h-12 transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${baseConfig.cornerClasses}`}
      >
        <CornerShape className="w-full h-full" />
      </div>
    </span>
  );

  const iconBlob = (
    <i className="relative block w-[51px] h-12 transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]">
      <div
        className={`absolute inset-0 z-0 transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${baseConfig.blobClasses}`}
      >
        <IconBlobShape className="w-full h-full" />
      </div>
      <span className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">
        <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] translate-x-0 group-hover:translate-x-[150%]">
          <ArrowThreeDots color={baseConfig.iconDefault} className="w-5 h-5" />
        </span>
        <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] -translate-x-[150%] group-hover:translate-x-0">
          <ArrowThreeDots color={baseConfig.iconHover} className="w-5 h-5" />
        </span>
      </span>
    </i>
  );

  const content = (
    <>
      {labelSpan}
      {iconBlob}
    </>
  );

  const commonClasses = `group relative inline-flex items-center text-left cursor-pointer no-underline focus:outline-none ${fullWidth ? "w-full" : ""} ${className}`.trim();

  if (isAnchor) {
    return (
      <a
        href={href ?? "#"}
        target={target}
        rel={rel}
        className={commonClasses}
        style={style}
        aria-label={ariaLabel ?? text}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={commonClasses}
      style={style}
      aria-label={ariaLabel ?? text}
    >
      {content}
    </button>
  );
}
