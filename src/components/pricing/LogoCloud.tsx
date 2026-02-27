'use client';

import React from 'react';
import { motion } from 'framer-motion';

const logos = [
    { name: "Upwork", width: 100 },
    { name: "Plaid", width: 80 },
    { name: "Splunk", width: 90 },
    { name: "Ghost", width: 80 },
    { name: "Square", width: 90 },
    { name: "Wealthsimple", width: 120 },
    { name: "Uber", width: 70 },
    { name: "Twitch", width: 80 },
];

export function LogoCloud() {
    return (
        <section className="w-full bg-[#FAFAFA] py-16 md:py-24 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16"
                >
                    {logos.map((logo, i) => (
                        <motion.div
                            key={logo.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className="opacity-30 hover:opacity-100 transition-opacity duration-300 cursor-default"
                        >
                            <span
                                className="text-[#1a1512] text-lg md:text-xl font-semibold tracking-tight select-none"
                                style={{
                                    fontFamily: logo.name === "Ghost" ? "'Nohemi', sans-serif" : "var(--font-syne), sans-serif",
                                    fontWeight: logo.name === "Twitch" ? 800 : 600,
                                    fontStyle: logo.name === "Ghost" ? "italic" : "normal",
                                    letterSpacing: logo.name === "Splunk" ? "0.05em" : "-0.02em",
                                }}
                            >
                                {logo.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
