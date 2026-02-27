"use client";

import React from "react";

interface EyebrowHeadingProps {
    category: string;
    label: string;
    dark?: boolean;
    className?: string;
}

export function EyebrowHeading({ category, label, dark = false, className = "" }: EyebrowHeadingProps) {
    const bracketColor = dark ? "text-white/20" : "text-[#1a1512]/20";
    const categoryColor = dark ? "text-white/40" : "text-[#1a1512]/40";
    const labelColor = dark ? "text-white/90" : "text-[#1a1512]";

    return (
        <div className={`inline-flex items-center gap-1 ${className}`}>
            {/* Left Bracket */}
            <svg
                width="6"
                height="28"
                viewBox="0 0 6 28"
                fill="none"
                className={`flex-shrink-0 ${bracketColor}`}
            >
                <path
                    d="M5 1H1V27H5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
            </svg>

            {/* Content */}
            <div className="flex items-center gap-1.5 px-1 py-1">
                <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${categoryColor}`}>
                    {category}:
                </span>
                <span
                    className={`text-xs tracking-[0.15em] uppercase font-medium ${labelColor}`}
                    style={{ fontFamily: 'Nohemi, sans-serif' }}
                >
                    {label}
                </span>
            </div>

            {/* Right Bracket */}
            <svg
                width="6"
                height="28"
                viewBox="0 0 6 28"
                fill="none"
                className={`flex-shrink-0 ${bracketColor}`}
            >
                <path
                    d="M1 1H5V27H1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
            </svg>
        </div>
    );
}