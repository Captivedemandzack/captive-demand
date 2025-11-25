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
        bg: "#FFE4F2",
        text: "#B83280",
        border: "#B8328078",
    },
    "Web Dev": {
        bg: "#E5EDFF",
        text: "#2B4FFF",
        border: "#2B4FFF80",
    },
    "default": {
        bg: "#2A2A2A",
        text: "#E0E0E0",
        border: "#404040",
    }
};

export function Card({ title, tags, imageSrc, className }: CardProps) {
    return (
        <div
            className={cn(
                "relative flex flex-col overflow-hidden rounded-xl bg-[#121212] text-white shadow-xl transition-transform hover:scale-105",
                className
            )}
            // EDIT: Increased width to 320px ("Slightly Wider")
            style={{ width: "320px", height: "280px", padding: "0" }}
        >
            {/* Image Container */}
            <div className="relative h-[180px] w-[calc(100%-10px)] mx-auto mt-[5px] overflow-hidden rounded-lg bg-gray-800 shrink-0">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                />
            </div>

            {/* Content Container */}
            {/* EDIT: 
                - pt-[20px]: 20px space between Image bottom and Tags top
                - pb-[20px]: 20px space between Title bottom and Card bottom
                - gap-[10px]: Space between Tags and Title
                This ensures the top and bottom spacing is EQUAL.
            */}
            <div className="flex flex-1 flex-col px-5 pt-[20px] pb-[20px] gap-[10px]">

                {/* 1. TAGS (Top) */}
                <div className="flex flex-wrap justify-start gap-2">
                    {tags.map((tag) => {
                        const style = TAG_STYLES[tag] || TAG_STYLES["default"];

                        return (
                            <span
                                key={tag}
                                className="inline-block font-sans text-[14px] font-normal capitalize border leading-none"
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
                <h3 className="text-left text-[20px] font-sans font-normal text-white leading-none m-0">
                    {title}
                </h3>
            </div>
        </div>
    );
}