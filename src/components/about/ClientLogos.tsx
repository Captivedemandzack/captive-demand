'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AccentBr } from '@/components/ui/accent-br';

type Testimonial = {
    quote: string;
    author: string;
    role: string;
    company: string;
    image: string;
};

const LOGOS: { name: string; src: string; logoScale?: number; testimonial?: Testimonial }[] = [
    { name: 'Hitx', src: '/logos/hitx.svg', testimonial: { quote: 'Captive Demand helped us build a digital presence that truly represents our brand.', author: 'Partner', role: 'Team', company: 'Hitx', image: '/spencer-donaldson.jpg' } },
    { name: 'Velocity', src: '/logos/velocity.png', logoScale: 1.2, testimonial: { quote: "Captive Demand is different than any other agency we have worked with. They take a genuine interest in your success and back up their promises with results. Our website is everything we wanted and more.", author: 'Ben Elizer', role: 'CEO', company: 'Velocity International', image: '/ben.webp' } },
    { name: 'Farmulated', src: '/logos/farmulated.png', logoScale: 1.2, testimonial: { quote: "Spencer is knowledgeable, patient, and open to listen! He's willing to try anything to help move the needle, and he's easy to talk to... I feel like he really cares about our business. In addition, our traffic has grown from 1,200 users per month to 11,000 users per month and revenue has increased by 34% YOY.", author: 'Tricia Restifo', role: 'VP Finance', company: 'Farmulated', image: '/tricia.webp' } },
    { name: 'Modern Mentor', src: '/logos/modernmentor.png', logoScale: 1.2, testimonial: { quote: "I cannot say enough amazing things about this team and the work they deliver. I worked with Zachary and Spencer to build my dream Wordpress website plus a custom-built, member-only dashboard that exceeded my expectations.", author: 'Amy Schols', role: 'CEO', company: 'Modern Mentor', image: '/amy.jpg' } },
    { name: 'Boombox', src: '/logos/boombox.svg', logoScale: 1.35, testimonial: { quote: "I've been working in SEO for about a decade now. I've always built my teams in-house because agencies always tend to be too expensive or terrible quality. Captive had very fair prices and followed a process nearly identical to the one I was used to running with my in-house teams, so I knew the quality would be excellent.", author: 'Jordan Schneider', role: 'Head of Marketing', company: 'Boombox', image: '/Jordan.jpeg' } },
    { name: 'Finally Home Services', src: '/logos/finallyhomeservices.png', logoScale: 0.8, testimonial: { quote: "They are always on time and they're always willing to listen to my non-tech vision and translate the vision into core pieces of my business. They are responsive, have a high quality of work, and always listen to my goals.", author: 'Bonnie Paik', role: 'Owner', company: 'Finally Home Services', image: '/bonnie.webp' } },
    { name: 'BachBar', src: '/logos/bachbar.png', logoScale: 1.35, testimonial: { quote: "Our business went from only referral-based clients to having an entire authoritative online presence that allowed us to grow by over 1,000% in our first true year of business. It opened doors to partnerships that we did not believe were possible.", author: 'Matthew Ford', role: 'Founder', company: 'BachBar', image: '/matthew.webp' } },
    { name: 'Endura Commerce', src: '/logos/enduracommerce.svg', testimonial: { quote: "Spencer is the best. He has helped us with our website needs and is always responsive. He is also great to collaborate with when it comes to marketing strategies. Highly recommend.", author: 'Michael Scott', role: 'CEO', company: 'Endura Commerce', image: '/michael.jpg' } },
    { name: 'First Future', src: '/logos/firstfuture.png', logoScale: 0.8, testimonial: { quote: 'Working with Captive Demand on our digital presence was a game-changer. They made everything feel more intentional and aligned with who we are.', author: 'Partner', role: 'Team', company: 'First Future', image: '/spencer-donaldson.jpg' } },
    { name: 'Voyage and Vibes', src: '/logos/voyageandvibes.png', logoScale: 1.2, testimonial: { quote: 'Captive Demand helped us bring our vision to life with a website that truly speaks to our audience.', author: 'Partner', role: 'Team', company: 'Voyage and Vibes', image: '/spencer-donaldson.jpg' } },
    { name: 'Mountain Sledge', src: '/logos/mountainsledge.png', logoScale: 1.35, testimonial: { quote: 'They delivered exactly what we needed for our brand and online presence.', author: 'Partner', role: 'Team', company: 'Mountain Sledge', image: '/spencer-donaldson.jpg' } },
    { name: 'The Skin Real', src: '/logos/theskinreal.png', logoScale: 1.35, testimonial: { quote: 'Professional, responsive, and results-driven. They understood our brand from day one.', author: 'Partner', role: 'Team', company: 'The Skin Real', image: '/spencer-donaldson.jpg' } },
];

const BADGES: { label: string; icon: string }[] = [
    { label: 'Top Web Design Agency of 2025', icon: '/clutch.png' },
    { label: 'Elementor Agency Partner', icon: '/Elementor-Logo-Symbol-Red (1).svg' },
    { label: 'Shopify Partner', icon: '/shopify_glyph.svg' },
    { label: 'Cursor Experts', icon: '/CUBE_2D_LIGHT.svg' },
];

const POPOVER_PADDING = 16;
const POPOVER_MAX_WIDTH = 352; // 22rem

function LogoCard({ logo }: { logo: (typeof LOGOS)[number] }) {
    const [open, setOpen] = useState(false);
    const [popoverStyle, setPopoverStyle] = useState<{ left: number; top: number } | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearCloseTimeout = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    };

    const scheduleClose = () => {
        clearCloseTimeout();
        closeTimeoutRef.current = setTimeout(() => {
            setOpen(false);
            setPopoverStyle(null);
        }, 150);
    };

    const updatePopoverPosition = () => {
        const card = cardRef.current;
        const modal = modalRef.current;
        if (!card || typeof window === 'undefined') return;

        const cardRect = card.getBoundingClientRect();
        const viewportW = window.innerWidth;
        const maxW = Math.min(POPOVER_MAX_WIDTH, viewportW - POPOVER_PADDING * 2);
        const popoverW = modal ? Math.min(modal.getBoundingClientRect().width, maxW) : maxW;
        const popoverH = modal ? modal.getBoundingClientRect().height : 200;

        const cardCenterX = cardRect.left + cardRect.width / 2;
        let left = cardCenterX - popoverW / 2;
        left = Math.max(POPOVER_PADDING, Math.min(left, viewportW - popoverW - POPOVER_PADDING));

        const top = cardRect.top - popoverH - 8;

        setPopoverStyle({ left, top });
    };

    useEffect(() => {
        if (!open) return;
        const raf = requestAnimationFrame(() => {
            requestAnimationFrame(updatePopoverPosition);
        });
        window.addEventListener('resize', updatePopoverPosition);
        window.addEventListener('scroll', updatePopoverPosition, true);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', updatePopoverPosition);
            window.removeEventListener('scroll', updatePopoverPosition, true);
        };
    }, [open]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node) && cardRef.current && !cardRef.current.contains(e.target as Node)) {
                setOpen(false);
                setPopoverStyle(null);
            }
        };
        if (open) document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            clearCloseTimeout();
        };
    }, [open]);

    const t = logo.testimonial;

    const popoverContent = open && t && (
        <div
            ref={modalRef}
            className="fixed z-[9999] rounded-2xl bg-[#f3f4f6] p-4 md:p-6 shadow-sm border border-[#1a1512]/5 max-w-[calc(100vw-2rem)] w-[min(22rem,calc(100vw-2rem))]"
            style={popoverStyle ? { left: popoverStyle.left, top: popoverStyle.top } : { left: -9999, top: 0 }}
            onMouseEnter={() => clearCloseTimeout()}
            onMouseLeave={() => scheduleClose()}
        >
            <p className="text-[#1a1512]/80 italic text-[13px] md:text-[15px] leading-relaxed mb-3 md:mb-4">
                &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={t.image}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div>
                    <p className="text-[#1a1512] font-semibold text-[14px]" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                        {t.author}
                    </p>
                    <p className="text-[#1a1512]/50 text-xs">
                        {t.role}, {t.company}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative">
            <div
                ref={cardRef}
                className="group relative flex flex-col items-center justify-center gap-1.5 h-28 md:h-32 rounded-[6px] border border-[#d5d5d5]/40 bg-white/50 backdrop-blur-[10px] transition-all duration-300 hover:border-[#d5d5d5] hover:shadow-md cursor-pointer overflow-visible"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)' }}
                onClick={() => t && setOpen((o) => !o)}
                onMouseEnter={() => { if (t) { clearCloseTimeout(); setOpen(true); } }}
                onMouseLeave={() => t && scheduleClose()}
            >
                <div className="absolute -top-[1px] -left-[1px] w-[16px] h-[16px] border-t-[2px] border-l-[2px] border-[#d5d5d5] rounded-tl-[6px] pointer-events-none z-10" />
                <div className="absolute -bottom-[1px] -right-[1px] w-[16px] h-[16px] border-b-[2px] border-r-[2px] border-[#d5d5d5] rounded-br-[6px] pointer-events-none z-10" />
                <div className="relative w-20 h-10 md:w-24 md:h-12 flex items-center justify-center opacity-90 transition-opacity duration-300 group-hover:opacity-100 flex-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={logo.src}
                        alt={logo.name}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                        style={{
                            filter: 'grayscale(100%) brightness(0) saturate(100%) opacity(0.55)',
                            transform: logo.logoScale ? `scale(${logo.logoScale})` : undefined,
                        }}
                    />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8480C] pb-1">
                    QUOTE
                </span>
            </div>

            {typeof document !== 'undefined' && createPortal(popoverContent, document.body)}
        </div>
    );
}

const DecorativeShapeWithLine = () => (
    <div className="flex items-end w-full">
        <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
            <path d="M0 8 L0 0 L68 0 L80 8 Z" fill="#d5d5d5" />
        </svg>
        <div className="flex-1 h-[1px] self-end bg-[#e5e5e5]" />
    </div>
);

export function ClientLogos() {
    return (
        <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="mx-auto max-w-7xl">
                {/* Header — same structure as TeamGrid */}
                <div className="mb-12 md:mb-16">
                    <div className="mb-6 w-full">
                        <DecorativeShapeWithLine />
                    </div>
                    <div className="flex flex-col gap-8">
                        <div>
                            <span className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4">
                                / Trusted By
                            </span>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512] max-w-2xl md:max-w-3xl lg:max-w-4xl"
                                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                            >
                                Adding $100M+ in revenue<AccentBr />
                                <span className="text-[#1a1512]/40">to our partners.</span>
                            </h2>
                        </div>
                        {/* Pills on own row — let them wrap, headline gets full width */}
                        <div className="flex flex-wrap gap-2">
                            {BADGES.map((badge) => (
                                <span
                                    key={badge.label}
                                    className="flex items-center gap-2.5 rounded-xl border border-[#1a1512]/[0.06] bg-white/80 px-4 py-2 font-mono uppercase text-[11px] tracking-[0.15em] text-[#121212]/70"
                                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)' }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={badge.icon} alt="" className="w-4 h-4 shrink-0 object-contain" />
                                    {badge.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Logo Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-visible">
                    {LOGOS.map((logo, i) => (
                        <LogoCard key={i} logo={logo} />
                    ))}
                </div>
            </div>
        </section>
    );
}
