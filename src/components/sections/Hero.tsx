"use client";

import React from "react";
import { Carousel } from "../ui/Carousel";

const PROJECT_ITEMS = [
    {
        title: "Pixelate Image Render Effect",
        tags: ["Web Design", "Development"],
        imageSrc: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    },
    {
        title: "Directional List Hover",
        tags: ["UI/UX", "React"],
        imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
        title: "Flick Cards Slider",
        tags: ["Animation", "Design"],
        imageSrc: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    },
    {
        title: "3D Image Carousel",
        tags: ["3D", "Webflow"],
        imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
    {
        title: "Momentum Based Hover",
        tags: ["Interaction", "JavaScript"],
        imageSrc: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    },
];

export function Hero() {
    return (
        // EDIT 1: Changed min-h-screen to min-h-[150vh] and pb-64
        // This makes the section MASSIVE so there is room for the "Flow" below.
        <section className="relative flex min-h-[150vh] flex-col items-center justify-start overflow-hidden bg-[#Fdfdfd] pt-32 pb-64 text-center font-sans">
            <div className="container relative z-10 mx-auto px-4 max-w-full">

                {/* --- HEADER SECTION --- */}
                <div className="mb-10 flex flex-col items-center justify-center">
                    <h1 className="flex w-full flex-nowrap items-center justify-center gap-3 whitespace-nowrap text-[#201d1d] font-normal tracking-tight">
                        <span className="text-[50px] sm:text-[80px] lg:text-[116px] lg:leading-[116px]">
                            Dev Toolkit
                        </span>
                        <span className="relative -top-1 sm:-top-3 px-1 text-[#635BFF] text-[50px] sm:text-[80px] lg:text-[116px] lg:leading-[116px]">
                            *
                        </span>
                        <span className="text-[50px] sm:text-[80px] lg:text-[116px] lg:leading-[116px]">
                            Built to Flex
                        </span>
                    </h1>
                </div>

                <div className="mx-auto mb-4 max-w-4xl">
                    <p className="text-[18px] sm:text-[23px] leading-[27px] font-normal text-[#201d1d]">
                        Platform packed with{" "}
                        <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-[#201d1d] align-middle mx-1">
                            Webflow
                        </span>{" "}
                        &{" "}
                        <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-[#201d1d] align-middle mx-1">
                            HTML resources
                        </span>,{" "}
                        <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-[#201d1d] align-middle mx-1">
                            icons
                        </span>,{" "}
                        <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-[#201d1d] align-middle mx-1">
                            easings
                        </span>{" "}
                        and a{" "}
                        <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-[#201d1d] align-middle mx-1">
                            page transition course
                        </span>
                    </p>
                </div>

                {/* --- CAROUSEL (THE BRIDGE) --- */}
                {/* Keeps the negative margin to tuck it under the title */}
                <div className="-mt-20 relative z-20">
                    <Carousel items={PROJECT_ITEMS} />
                </div>

                {/* --- NEXT SECTION CONTENT (THE FLOW) --- */}
                {/* This sits physically BELOW the carousel in the DOM, 
                    creating that visual effect where the cards arch over it. 
                */}
                <div className="mx-auto -mt-[200px] max-w-3xl relative z-10">
                    <h2 className="text-[32px] sm:text-[45px] leading-tight font-normal text-[#201d1d] tracking-tight">
                        Osmo is an ever-growing platform with Webflow & HTML resources. Get exclusive access to the elements, techniques and code behind award-winning work.
                    </h2>
                </div>

            </div>
        </section>
    );
}