'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const menuSections = [
    { title: "Expertise & Capabilities", href: "/services" },
    { title: "Process & Pricing", href: "/process" },
    { title: "Outcomes", href: "/case-studies" },
    { title: "Team", href: "/team" },
    { title: "Careers", href: "/careers" },
    { title: "Analogue Store", href: "/store" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Centered Navigation Bar */}
            <header className="fixed inset-x-0 top-8 z-50 flex justify-center px-4">
                <div className="flex items-center justify-between gap-12 rounded-xl bg-[#E5E5EA] px-8 py-4 shadow-lg lg:gap-32 lg:px-12">
                    {/* Left: WORK */}
                    <Link
                        href="/case-studies"
                        className="font-mono text-sm uppercase tracking-wider text-brand-dark/60 transition-colors hover:text-brand-dark"
                    >
                        WORK
                    </Link>

                    {/* Center: Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/captive-demand-logo.png"
                            alt="Captive Demand"
                            width={180}
                            height={40}
                            className="h-7 w-auto lg:h-8"
                            priority
                        />
                    </Link>

                    {/* Right: ABOUT (triggers menu) */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="font-mono text-sm uppercase tracking-wider text-brand-dark/60 transition-colors hover:text-brand-dark"
                    >
                        ABOUT
                    </button>
                </div>
            </header>

            {/* Dropdown Menu - No Visible Overlay */}
            {isOpen && (
                <>
                    {/* Invisible backdrop to close menu */}
                    <div 
                        className="fixed inset-0 z-[45]" 
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Menu Panel */}
                    <div className="fixed inset-x-0 top-8 z-50 flex justify-center px-4">
                        <div className="w-full max-w-md overflow-hidden rounded-xl bg-[#E5E5EA] shadow-2xl">
                            {/* Top Bar */}
                            <div className="flex items-center justify-between border-b border-black/10 px-8 py-4 lg:px-12">
                                <div className="font-mono text-sm uppercase tracking-wider text-brand-dark/60">WORK</div>
                                <Image
                                    src="/captive-demand-logo.png"
                                    alt="Captive Demand"
                                    width={160}
                                    height={36}
                                    className="h-7 w-auto"
                                    priority
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="font-mono text-sm uppercase tracking-wider text-brand-dark/60 transition-colors hover:text-brand-dark"
                                >
                                    ABOUT
                                </button>
                            </div>

                            {/* Menu Content */}
                            <div className="px-8 py-8 lg:px-12">
                                {/* Navigation Grid - 2 columns */}
                                <div className="mb-8 grid grid-cols-2 gap-y-6 gap-x-12">
                                    {menuSections.map((section, idx) => (
                                        <Link
                                            key={idx}
                                            href={section.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-left text-base font-normal text-brand-dark transition-colors hover:text-brand-accent"
                                        >
                                            {section.title}
                                        </Link>
                                    ))}
                                </div>

                                {/* Contact Info */}
                                <div className="border-t border-black/10 pt-6">
                                    <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-brand-dark/60">
                                        GENERAL INQUIRIES
                                    </p>
                                    <a
                                        href="tel:+31646139198"
                                        className="block text-base font-normal text-brand-dark transition-colors hover:text-brand-accent"
                                    >
                                        +316 46 13 91 98
                                    </a>
                                    <a
                                        href="mailto:ralph@analogueagency.com"
                                        className="mb-2 block text-base font-normal text-brand-dark transition-colors hover:text-brand-accent"
                                    >
                                        ralph@analogueagency.com
                                    </a>
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsOpen(false)}
                                        className="inline-block text-base font-normal text-brand-dark underline underline-offset-2 transition-colors hover:text-brand-accent"
                                    >
                                        Plan a Call
                                    </Link>

                                    {/* Visit Section */}
                                    <div className="mt-6">
                                        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-brand-dark/60">
                                            VISIT
                                        </p>
                                        <p className="text-sm font-normal leading-relaxed text-brand-dark">
                                            Oudeschans 26-H
                                            <br />
                                            1011LB, Amsterdam
                                            <br />
                                            The Netherlands
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}