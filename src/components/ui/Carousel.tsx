"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card } from "./Card";

interface CarouselProps {
    items: {
        title: string;
        tags: string[];
        imageSrc: string;
    }[];
}

export function Carousel({ items }: CarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    // --- PURE SPOKE CONFIGURATION ---
    const RADIUS = 1800;     // The size of the wheel
    const CARD_WIDTH = 320;
    const GAP = 100;          // The space between cards
    const SPEED = 0.01;

    // 16x Duplication for infinite buffer
    const extendedItems = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;
            const cards = cardsRef.current;
            let globalRotation = 0;

            const circumference = 2 * Math.PI * RADIUS;
            const arcLength = CARD_WIDTH + GAP;
            const angleStep = (arcLength / circumference) * 360;

            const totalAngleSpread = extendedItems.length * angleStep;
            const wrapAngle = gsap.utils.wrap(
                -totalAngleSpread / 2,
                totalAngleSpread / 2
            );

            const animate = () => {
                globalRotation -= SPEED;

                // Note: We no longer calculate centerX/Y here. 
                // We rely on CSS absolute positioning for the start point.

                cards.forEach((card, index) => {
                    if (!card) return;

                    const rawAngle = globalRotation + (index * angleStep);
                    const angle = wrapAngle(rawAngle);

                    if (Math.abs(angle) > 60) {
                        card.style.visibility = 'hidden';
                        return;
                    }
                    card.style.visibility = 'visible';

                    // --- THE FIX: PURE ROTATION ---
                    // We do NOT translate X or Y anymore.
                    // We just rotate. The 'transformOrigin' acts as the anchor.
                    gsap.set(card, {
                        // 1. Pivot point is centered horizontally (50%) 
                        //    and pushed down by the Radius distance.
                        transformOrigin: `50% ${RADIUS}px`,

                        // 2. We simply rotate. The pivot handles the arc movement.
                        rotation: angle,

                        // 3. Just z-index for layering
                        zIndex: Math.round(10000 - Math.abs(angle))
                    });
                });
            };

            gsap.ticker.add(animate);
        }, containerRef);

        return () => ctx.revert();
    }, [extendedItems.length]);

    return (
        // Container Setup
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden py-24 min-h-[1000px]">
            <div ref={containerRef} className="relative h-full w-full flex justify-center">
                {/* We use a Flex container to perfectly center the "Deck" 
                   at the top of the wheel before we start rotating them.
                */}
                <div className="relative w-0 h-0 top-[50px]"> {/* 'Anchor Point' */}
                    {extendedItems.map((item, index) => (
                        <div
                            key={`${item.title}-${index}`}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            className="absolute will-change-transform"
                            // Center the card on the anchor point
                            style={{
                                width: `${CARD_WIDTH}px`,
                                left: `-${CARD_WIDTH / 2}px`,
                                top: "0px"
                            }}
                        >
                            <Card
                                title={item.title}
                                tags={item.tags}
                                imageSrc={item.imageSrc}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}