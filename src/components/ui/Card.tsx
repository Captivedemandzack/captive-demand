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

const TAG_COLORS: Record<string, string> = {
    "Email Marketing": "bg-purple-500/90",
    "Web Design": "bg-blue-500/90",
    "Development": "bg-green-500/90",
    "UI/UX": "bg-pink-500/90",
    "React": "bg-cyan-500/90",
    "Animation": "bg-orange-500/90",
    "Design": "bg-indigo-500/90",
    "3D": "bg-red-500/90",
    "Webflow": "bg-teal-500/90",
    "Interaction": "bg-yellow-500/90",
    "JavaScript": "bg-amber-500/90",
};

export function Card({ title, tags, imageSrc, className }: CardProps) {
    return (
        <div
            className={cn(
                "relative flex flex-col overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-2xl transition-transform hover:scale-105",
                className
            )}
            style={{ width: "280px", height: "360px", padding: "15px" }}
        >
            <div className="relative h-52 w-full overflow-hidden rounded-xl bg-secondary/50">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                />
            </div>
            <div className="flex flex-1 flex-col justify-between pt-4">
                <div>
                    <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className={cn(
                                    "rounded-full px-3 py-1 text-xs font-medium text-white",
                                    TAG_COLORS[tag] || "bg-gray-500/90"
                                )}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
