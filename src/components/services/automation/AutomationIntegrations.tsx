'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { AccentBr } from '@/components/ui/accent-br';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_DURATION = 45;
const CARD_SIZE = 100;
const CARD_GAP = 14;
const getRowContentWidth = (itemCount: number) => itemCount * CARD_SIZE + (itemCount - 1) * CARD_GAP;

const row1 = [
    { name: 'Zendesk', logo: '/integrations/zendesk.png' },
    { name: 'Slack', logo: '/integrations/Slack.png' },
    { name: 'OpenAI', logo: '/integrations/openai.png' },
    { isBrandHub: true },
    { name: 'Stripe', logo: '/integrations/stripe.png' },
    { name: 'HubSpot', logo: '/integrations/Hubspot.png' },
    { name: 'Salesforce', logo: '/integrations/Salesforce.png' },
    { name: 'Zapier', logo: '/integrations/Zapier.png' },
];

const row2 = [
    { name: 'Make', logo: '/integrations/make.webp' },
    { name: 'Mailchimp', logo: '/integrations/mailchimp.png' },
    { name: 'Airtable', logo: '/integrations/Airtable.png' },
    { isBrandHub: true },
    { name: 'Pipedrive', logo: '/integrations/piperdrive.png' },
    { name: 'Notion', logo: '/integrations/Notion.webp' },
    { name: 'Calendly', logo: '/integrations/Calendly.png' },
];

const row3 = [
    { name: 'Google Sheets', logo: '/integrations/googlesheets.webp' },
    { name: 'Shopify', logo: '/integrations/shopify2.png' },
    { name: 'Twilio', logo: '/integrations/Twillio.png' },
    { isBrandHub: true },
    { name: 'Kit', logo: '/integrations/kit.svg' },
    { name: 'WordPress', logo: '/integrations/wordpress.png' },
    { name: 'QuickBooks', logo: '/integrations/Quickbooks.png' },
    { name: 'Google Analytics', logo: '/integrations/Googleanalytics.png' },
];

function IntegrationCard({ name, logo, offset = false }: { name: string; logo: string; offset?: boolean }) {
    return (
        <div
            className="integration-card flex-shrink-0 flex items-center justify-center rounded-[12px] bg-white"
            style={{
                width: CARD_SIZE,
                height: CARD_SIZE,
                border: '1px dashed rgba(0,0,0,0.12)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                transform: offset ? 'translateY(7px)' : 'translateY(0)',
            }}
        >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
                <Image
                    src={logo}
                    alt={name}
                    width={44}
                    height={44}
                    className="object-contain w-full h-full"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('span')) {
                            const span = document.createElement('span');
                            span.className = 'font-mono text-[9px] text-[#1a1512]/50 text-center leading-tight px-1';
                            span.textContent = name;
                            parent.appendChild(span);
                        }
                    }}
                />
            </div>
        </div>
    );
}

function BrandHubCard() {
    return (
        <div
            className="integration-card flex-shrink-0 flex items-center justify-center rounded-[12px] bg-white"
            style={{
                width: CARD_SIZE,
                height: CARD_SIZE,
                border: '1px dashed rgba(232,72,12,0.25)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05), 0 0 12px rgba(232,72,12,0.04)',
            }}
        >
            <div className="relative w-10 h-10 flex items-center justify-center">
                <Image src="/C.png" alt="Captive Demand" width={40} height={40} className="object-contain" />
            </div>
        </div>
    );
}

function RowContent({
    items,
    rowIndex,
    copyIndex,
}: {
    items: Array<{ name?: string; logo?: string; isBrandHub?: boolean }>;
    rowIndex: number;
    copyIndex: number;
}) {
    return (
        <>
            {items.map((item, i) => {
                if (item.isBrandHub) {
                    return <BrandHubCard key={`${rowIndex}-${copyIndex}-${i}`} />;
                }
                return (
                    <IntegrationCard
                        key={`${rowIndex}-${copyIndex}-${i}`}
                        name={item.name!}
                        logo={item.logo!}
                    />
                );
            })}
        </>
    );
}

function MarqueeGridRow({
    items,
    direction,
    rowIndex,
}: {
    items: Array<{ name?: string; logo?: string; isBrandHub?: boolean }>;
    direction: 'left' | 'right';
    rowIndex: number;
}) {
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        const contentWidth = getRowContentWidth(items.length);
        const xTo = direction === 'right' ? -contentWidth : contentWidth;

        const tl = gsap.timeline({ repeat: -1 });
        tl.to(el, { x: xTo, duration: SCROLL_DURATION, ease: 'none' });
        tl.set(el, { x: 0 }); // Instant reset — invisible because next copy is identical

        return () => {
            tl.kill();
        };
    }, [direction, items.length]);

    const rowClasses = [
        'flex items-start justify-center gap-[14px] shrink-0',
        rowIndex === 0 ? 'mr-0' : '',
        rowIndex === 2 ? 'pb-0 ml-[30px]' : '',
    ]
        .filter(Boolean)
        .join(' ');

    const NUM_COPIES = 4;

    return (
        <div className="overflow-hidden w-full">
            <div ref={trackRef} className={`flex ${rowClasses}`}>
                {Array.from({ length: NUM_COPIES }, (_, i) => (
                    <RowContent key={i} items={items} rowIndex={rowIndex} copyIndex={i} />
                ))}
            </div>
        </div>
    );
}

export function AutomationIntegrations() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (labelRef.current) {
                const originalText = 'INTEGRATIONS';
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                gsap.to(
                    {},
                    {
                        duration: 1.2,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: labelRef.current,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                        },
                        onUpdate: function () {
                            const progress = this.progress();
                            let result = '';
                            for (let i = 0; i < originalText.length; i++) {
                                if (originalText[i] === ' ') {
                                    result += ' ';
                                } else if (progress > i / originalText.length) {
                                    result += originalText[i];
                                } else {
                                    result += chars[Math.floor(Math.random() * chars.length)];
                                }
                            }
                            if (labelRef.current) {
                                labelRef.current.textContent = '/ ' + result;
                            }
                        },
                        onComplete: function () {
                            if (labelRef.current) {
                                labelRef.current.textContent = '/ INTEGRATIONS';
                            }
                        },
                    }
                );
            }

            const cards = sectionRef.current?.querySelectorAll('.integration-card');
            if (cards) {
                gsap.from(cards, {
                    opacity: 0,
                    y: 24,
                    duration: 0.8,
                    ease: 'power4.out',
                    stagger: 0.04,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#FAFAFA] py-20 md:py-32 overflow-hidden relative">
            <NoiseOverlay />

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <span
                        ref={labelRef}
                        className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4"
                    >
                        / INTEGRATIONS
                    </span>
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512] tracking-tighter"
                        style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                    >
                        Connect your stack.<AccentBr />
                        <span className="text-[#1a1512]/40">We handle the rest.</span>
                    </h2>
                </div>

                {/* Infinite marquee with edge fade — mask only so section bg (#FAFAFA + noise) shows through */}
                <div className="relative flex flex-col items-center pt-5 pb-5 overflow-hidden">
                    <div
                        className="flex flex-col items-center gap-[14px] w-full"
                        style={{
                            maskImage:
                                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 120px, black 280px, black calc(100% - 280px), rgba(0,0,0,0.4) calc(100% - 120px), transparent 100%)',
                            WebkitMaskImage:
                                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 120px, black 280px, black calc(100% - 280px), rgba(0,0,0,0.4) calc(100% - 120px), transparent 100%)',
                        }}
                    >
                        <MarqueeGridRow items={row1} direction="right" rowIndex={0} />
                        <MarqueeGridRow items={row2} direction="left" rowIndex={1} />
                        <MarqueeGridRow items={row3} direction="right" rowIndex={2} />
                    </div>
                </div>

                <p className="text-center mt-10 font-mono text-sm text-[#1a1512]/40">
                    + custom API integrations for any tool in your workflow
                </p>
            </div>
        </section>
    );
}
