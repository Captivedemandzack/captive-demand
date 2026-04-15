'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AnimatedCTAButton } from '@/components/sections/Hero';
import { Rivet } from '@/components/ui/Rivet';
import { GhlBookingCardContent } from '@/components/booking/GhlLeadConnectorBooking';

const BookingCalendar = () => (
    <div className="w-full min-h-0 max-w-4xl">
        <GhlBookingCardContent iframeId="ghl-booking-widget-about" />
    </div>
);

const TestimonialCard = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="relative bg-[#f6f5f6] border border-[#e8e8e8] rounded-2xl p-6 max-w-md overflow-hidden"
        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.06), inset 0 1px 0 0 rgba(255,255,255,0.4), inset 0 -1px 0 0 rgba(0,0,0,0.04)' }}
    >
        <Rivet className="top-4 left-4" />
        <Rivet className="top-4 right-4" />
        <Rivet className="bottom-4 left-4" />
        <Rivet className="bottom-4 right-4" />
        <p className="text-[#1a1512]/80 text-sm leading-relaxed mb-6">
            Forward thinking, creative team with great chemistry. Ahead of the curve when it comes to the latest design trends! Would recommend for those who prioritise branding, UI and UX.
        </p>
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <Image
                    src="/tricia.webp"
                    alt="Tricia Restifo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <p className="font-semibold text-[#1a1512] text-sm">Tricia Restifo</p>
                <p className="text-[#1a1512]/50 text-xs">VP Finance, Farmulated</p>
            </div>
        </div>
    </motion.div>
);

export function AboutCTA() {
    return (
        <section className="relative z-10 w-full overflow-x-hidden bg-[#FAFAFA] px-4 py-20 md:py-32">
            <div className="mx-auto max-w-7xl">
                <div className="grid min-h-0 grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">

                    {/* Left Side — matches service page CTA exactly */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                                <span className="text-[#d5d5d5] font-light block lg:inline-block mr-0 lg:mr-3 whitespace-nowrap">
                                    Enough about us.
                                </span>
                                <span className="text-[#1a1512] font-light block lg:inline-block whitespace-nowrap">
                                    Let&apos;s talk about you.
                                </span>
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <p className="font-mono text-[13px] leading-relaxed text-[#1a1512]/50 max-w-md mb-8">
                                Book a call with Spencer. No pitch deck, no sales script — just a conversation about what you&apos;re building and how we can help.
                            </p>
                            <AnimatedCTAButton />
                            <p className="font-mono text-[11px] tracking-wide text-[#1a1512]/30 mt-4">
                                or email us at{' '}
                                <a href="mailto:hello@captivedemand.com" className="text-[#E8480C] hover:underline transition-colors">
                                    hello@captivedemand.com
                                </a>
                            </p>
                        </motion.div>

                        <TestimonialCard />
                    </div>

                    {/* Right Side — Booking Calendar */}
                    <div className="flex w-full min-h-0 justify-center self-start lg:justify-end">
                        <BookingCalendar />
                    </div>

                </div>
            </div>
        </section>
    );
}
