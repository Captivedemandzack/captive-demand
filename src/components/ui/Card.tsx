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

const TAG_STYLES: Record<string, TagStyle> = {
    "Web Design": {
        bg: "#FFF0E6",
        text: "#FF5500",
        border: "#FF5500",
    },
    "Web Dev": {
        bg: "#E0F2F2",
        text: "#008080",
        border: "#008080",
    },
    "Software": {
        bg: "#FFF5D1",
        text: "#CCA000AD",
        border: "#CCA000AD",
    },
    "SEO": {
        bg: "#DCE4F2",
        text: "#293445",
        border: "#293445",
    },
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
    return (
        <div
            className={cn(
                "relative flex flex-col overflow-hidden rounded-xl bg-[#f3f4f6] text-[#121212] transition-transform hover:scale-105",
                className
            )}
            // EDIT: Unlocked width/height so parent Carousel controls size
            style={{ width: "100%", height: "100%", padding: "0" }}
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
                <div className="flex flex-wrap justify-start gap-2">
                    {tags.map((tag) => {
                        const style = TAG_STYLES[tag] || TAG_STYLES["default"];

                        return (
                            <span
                                key={tag}
                                className="inline-block font-mono text-[11px] font-normal uppercase border leading-none"
                                style={{
                                    backgroundColor: style.bg,
                                    color: style.text,
                                    borderColor: style.border,
                                    padding: "4px 10px",
                                    borderRadius: "30px",
                                    borderWidth: "1px"
                                }}
                            >
                                {tag}
                            </span>
                        );
                    })}
                </div>

                {/* 2. TITLE (Bottom) */}
                <h3 className="text-left text-[16px] font-normal text-[#121212] leading-none m-0 uppercase" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}>
                    {title}
                </h3>
            </div>
        </div>
    );
}