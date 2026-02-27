"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type TeamMember = {
    name: string;
    role: string;
    image: string;
};

const TEAM_MEMBERS: TeamMember[] = [
    {
        name: "Spencer Donaldson",
        role: "Founder & CEO",
        image: "/spencer-donaldson-2.png",
    },
    {
        name: "Michael Turner",
        role: "Lead Designer",
        image: "/michael-turner-2.png",
    },
    {
        name: "Zack Creasy",
        role: "Senior Engineer",
        image: "/zack-creasy.png",
    },
    {
        name: "Tricia Restifo",
        role: "VP Finance, Partner",
        image: "/tricia.webp",
    },
];

const stagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
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

export function TeamSection() {
    return (
        <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-[#1a1512]/50 block mb-3">
                            Our team
                        </span>
                        <h2
                            className="text-[clamp(2rem,4vw+1rem,3.5rem)] leading-[1.1] tracking-tighter text-[#1a1512]"
                            style={{
                                fontFamily: "Nohemi, sans-serif",
                                fontWeight: 300,
                            }}
                        >
                            Meet the team
                        </h2>
                    </div>
                    <p className="max-w-md text-[#1a1512]/60 text-sm md:text-base leading-relaxed font-sans">
                        We&apos;re a team of designers, strategists, and
                        builders driven by curiosity and craft. Every project we
                        take on is powered by collaboration, diverse
                        perspectives, and a shared mission to deliver real
                        results.
                    </p>
                </div>

                {/* Team Grid */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                >
                    {TEAM_MEMBERS.map((member) => (
                        <motion.div
                            key={member.name}
                            variants={fadeUp}
                            whileHover={{ y: -4 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                            }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-white shadow-md mb-4 transition-shadow duration-300 group-hover:shadow-xl">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <h3 className="font-semibold text-[#1a1512] text-sm md:text-base">
                                {member.name}
                            </h3>
                            <p className="font-mono text-xs text-[#1a1512]/50 uppercase tracking-wider mt-1">
                                {member.role}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
