"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CardProps {
    title: string;
    tags: string[];
    imageSrc: string;
    className?: string;
}

interface TagStyle {
    bg: string;
    text: string;
    border: string;
}

// Shared pill component — less round (matches card radius), bezel + depth
function TagPill({ tag, style }: { tag: string; style: TagStyle }) {
    return (
        <span
            className="inline-block font-mono text-[10px] font-normal uppercase leading-none"
            style={{
                backgroundColor: style.bg,
                color: style.text,
                borderColor: style.border,
                padding: "3px 8px",
                borderRadius: "4px",
                borderWidth: "1px",
                borderStyle: "solid",
                boxShadow: `
                    inset 0px 1px 0px 0px rgba(255, 255, 255, 0.5),
                    inset 0px 1px 2px 0px rgba(0, 0, 0, 0.06),
                    0px 1px 2px 0px rgba(255, 255, 255, 0.06)
                `,
            }}
        >
            {tag}
        </span>
    );
}

// Updated Tag Styles Configuration
const TAG_STYLES: Record<string, TagStyle> = {
    // CONDENSED: "Website" (uses old "Web Design" colors - Orange)
    "Website": {
        bg: "rgba(255, 240, 230, 0.7)",
        text: "rgba(255, 85, 0, 0.9)",
        border: "rgba(255, 85, 0, 1)",
    },
    // REASSIGNED: "SEO" (uses old "Web Dev" colors - Teal)
    "SEO": {
        bg: "#E0F2F2",
        text: "#008080",
        border: "#008080",
    },
    // REASSIGNED: "Software" (uses old "SEO" colors - Dark Blue)
    "Software": {
        bg: "#DCE4F2",
        text: "#293445",
        border: "#293445",
    },
    // KEPT: "Email Marketing" (Same as before)
    "Email Marketing": {
        bg: "#ECEEF6",
        text: "#5C6BC0",
        border: "#5C6BC0",
    },
    "default": {
        bg: "#F2F2F2",
        text: "#505050",
        border: "#505050",
    }
};

export function Card({ title, tags, imageSrc, className }: CardProps) {
    // Data Cleaning Helper:
    // If your data still says "Web Design" or "Web Dev", we map it to "Website" for display.
    // If it's already updated in the data, it just passes through.
    const cleanTags = tags.map(tag => {
        if (tag === "Web Design" || tag === "Web Dev") return "Website";
        return tag;
    });

    // Remove duplicates (e.g., if a project had both "Web Design" and "Web Dev", it would show "Website" twice without this)
    const uniqueTags = Array.from(new Set(cleanTags));

    return (
        <div
            className={cn(
                // ADDED: border border-[#1a1512]/5 for the 1px thin border
                "relative flex flex-col overflow-hidden rounded-xl bg-[#f3f4f6] text-[#121212] transition-all hover:scale-105 border border-[#1a1512]/5",
                className
            )}
            // EDIT: Unlocked width/height so parent Carousel controls size
            style={{ width: "100%", height: "100%", padding: "0", boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.05), inset 0 1px 0 0 rgba(255,255,255,0.4)' }}
        >
            {/* Image Container */}
            <div className="relative h-[180px] w-[calc(100%-10px)] mx-auto mt-[5px] overflow-hidden rounded-lg bg-gray-200 shrink-0">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover object-top transition-transform duration-500 hover:scale-110"
                />
            </div>

            {/* Content Container */}
            <div className="flex flex-1 flex-col px-5 pt-[20px] pb-[20px] gap-[10px]">

                {/* 1. TAGS (Top) */}
                <div className="flex flex-wrap justify-start gap-1.5 items-baseline">
                    {uniqueTags.map((tag) => (
                        <TagPill key={tag} tag={tag} style={TAG_STYLES[tag] || TAG_STYLES["default"]} />
                    ))}
                </div>

                {/* 2. TITLE (Bottom) */}
                <h3 className="text-left text-[16px] font-normal text-[#121212] leading-none m-0 uppercase" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}>
                    {title}
                </h3>
            </div>
        </div>
    );
}