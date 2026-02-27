"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const LargeQuoteIcon = () => (
    <svg
        width="48"
        height="42"
        viewBox="0 0 24 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M19.7711 12.3665C20.0495 11.3681 18.976 10.6575 17.9395 10.6575C16.5573 10.6575 15.3611 10.1461 14.351 9.12342C13.2878 8.10074 12.7561 6.86277 12.7561 5.40948C12.7561 3.90236 13.2878 2.61054 14.351 1.53403C15.3611 0.511342 16.6104 0 18.099 0C19.9065 0 21.3419 0.645908 22.4051 1.93772C23.4684 3.22954 24 4.89814 24 6.94351C24 10.496 23.0431 13.4026 21.1292 15.6632C19.3099 17.8634 16.818 19.5043 13.6535 20.5857C13.3829 20.6782 13.0928 20.5194 13.0184 20.2432C12.9581 20.0193 13.0593 19.7839 13.2603 19.6683C15.079 18.6223 16.6387 17.3143 17.9395 15.744C18.8192 14.7163 19.4297 13.5904 19.7711 12.3665ZM7.01491 12.6167C7.29338 11.6183 6.21987 10.9077 5.18331 10.9077C3.80108 10.9077 2.60493 10.3963 1.59484 9.37366C0.531589 8.35098 0 7.11299 0 5.6597C0 4.15258 0.531589 2.86076 1.59484 1.78425C2.60493 0.761562 3.85425 0.25022 5.3428 0.25022C7.15032 0.25022 8.58571 0.896128 9.64896 2.18794C10.7122 3.47976 11.2438 5.14836 11.2438 7.19373C11.2438 10.7462 10.2869 13.6528 8.37306 15.9135C6.55373 18.1137 4.06185 19.7545 0.897371 20.836C0.626768 20.9285 0.336657 20.7696 0.262276 20.4935C0.201963 20.2696 0.30315 20.0341 0.504164 19.9185C2.32284 18.8726 3.88253 17.5645 5.18331 15.9942C6.06302 14.9665 6.67355 13.8407 7.01491 12.6167Z"
            fill="url(#quoteGradientLarge)"
        />
        <defs>
            <linearGradient
                id="quoteGradientLarge"
                x1="-4.65"
                y1="13.23"
                x2="27.28"
                y2="14.36"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0.127" stopColor="#FF3407" />
                <stop offset="0.227" stopColor="#FC964C" />
                <stop offset="0.305" stopColor="#FC964C" />
                <stop offset="0.491" stopColor="#F62F03" />
                <stop offset="1" stopColor="#FD7C34" />
            </linearGradient>
        </defs>
    </svg>
);

const staggerChildren = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
};

export function FounderQuote() {
    return (
        <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <motion.div
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl mx-auto border-t border-[#1a1512]/5 pt-16 md:pt-24"
            >
                {/* Quote Icon */}
                <motion.div variants={fadeUp} className="mb-8">
                    <LargeQuoteIcon />
                </motion.div>

                {/* Quote Text */}
                <motion.blockquote
                    variants={fadeUp}
                    className="text-[clamp(1.5rem,3vw+0.5rem,2.5rem)] leading-[1.3] tracking-tight text-[#1a1512] mb-12"
                    style={{ fontFamily: "Nohemi, sans-serif", fontWeight: 300 }}
                >
                    &ldquo;We believe great design starts with empathy and ends
                    with impact. Our approach is simple, listen closely, solve
                    creatively, and build with purpose.&rdquo;
                </motion.blockquote>

                {/* Author */}
                <motion.div
                    variants={fadeUp}
                    className="flex items-center gap-4"
                >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                        <Image
                            src="/spencer-donaldson-2.png"
                            alt="Spencer Donaldson"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-semibold text-[#1a1512] text-sm">
                            Spencer Donaldson
                        </p>
                        <p className="font-mono text-xs text-[#1a1512]/50 uppercase tracking-wider">
                            Founder of Captive Demand
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
