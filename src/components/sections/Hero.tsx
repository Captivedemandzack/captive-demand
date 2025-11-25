"use client";

import React from "react";
import { Carousel } from "../ui/Carousel";
import { Layers, ShoppingBag, MousePointer2, ArrowRight } from "lucide-react";

// EDIT: Updated tags to ONLY be "Web Design" and "Web Dev"
const PROJECT_ITEMS = [
    {
        title: "Modern Mentor",
        tags: ["Web Design", "Web Dev"],
        imageSrc: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    },
    {
        title: "Endura Commerce",
        tags: ["Web Design", "Web Dev"],
        imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
        title: "Arete Wealth",
        tags: ["Web Design", "Web Dev"],
        imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
    {
        title: "Pixelate Render",
        tags: ["Web Design", "Web Dev"],
        imageSrc: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    },
    {
        title: "Momentum Scroll",
        tags: ["Web Design", "Web Dev"],
        imageSrc: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    },
];

export function Hero() {
    return (
        <section className="relative flex min-h-[150vh] flex-col items-center justify-start overflow-hidden bg-white pt-32 pb-64 text-center font-sans">
            <div className="container relative z-10 mx-auto px-4 max-w-full">

                {/* --- 1. PARTNER PILLS --- */}
                <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
                        <Layers className="h-3.5 w-3.5 text-[#D53369]" />
                        <span>Elementor Agency Partner</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
                        <ShoppingBag className="h-3.5 w-3.5 text-[#95BF47]" />
                        <span>Shopify Partner</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
                        <MousePointer2 className="h-3.5 w-3.5 text-black" />
                        <span>Cursor Experts</span>
                    </div>
                </div>

                {/* --- 2. HEADLINE --- */}
                <div className="mb-10 flex flex-col items-center justify-center">
                    <h1 className="flex w-full flex-nowrap items-center justify-center gap-4 whitespace-nowrap text-[#1a1512] font-normal tracking-tight">
                        <span className="text-[50px] sm:text-[80px] lg:text-[110px] lg:leading-[1.1]">
                            Fast Builds
                        </span>
                        <span className="relative -top-2 sm:-top-4 px-2 text-[#FF5500] text-[60px] sm:text-[90px] lg:text-[130px] leading-none">
                            *
                        </span>
                        <span className="text-[50px] sm:text-[80px] lg:text-[110px] lg:leading-[1.1]">
                            Real Results
                        </span>
                    </h1>
                </div>

                {/* --- 3. SUBTEXT --- */}
                <div className="mx-auto mb-12 max-w-3xl">
                    <p className="text-[16px] sm:text-[18px] leading-loose text-gray-600">
                        We cover your core digital touchpoints with{" "}
                        <span className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900 align-middle mx-1">
                            web design and development
                        </span>
                        ,{" "}
                        <span className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900 align-middle mx-1">
                            no code and low code software
                        </span>
                        ,{" "}
                        <span className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900 align-middle mx-1">
                            SEO
                        </span>
                        , and{" "}
                        <span className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900 align-middle mx-1">
                            email marketing
                        </span>
                        .
                    </p>
                </div>

                {/* --- 4. CAROUSEL --- */}
                <div className="-mt-20 relative z-20">
                    <Carousel items={PROJECT_ITEMS} />
                </div>

                {/* --- 5. CTA BUTTON --- */}
                <div className="relative z-30 -mt-[450px] flex justify-center">
                    <button className="group flex items-center gap-3 rounded-full border border-gray-300 bg-white pl-2 pr-6 py-2 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors group-hover:bg-gray-800">
                            <ArrowRight className="h-4 w-4" />
                        </div>
                        <span className="tracking-wide uppercase text-xs">START YOUR BUILD</span>
                    </button>
                </div>

            </div>
        </section>
    );
}