"use client";

import React, { useLayoutEffect, useRef } from "react";
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
    // Increased RADIUS from 1800 to 2025 to maintain same perspective angle with wider cards
    const RADIUS = 2025;     // The size of the wheel (increased proportionally: 1800 * 360/320)
    const CARD_WIDTH = 360;  // Increased from 320px for more inline space
    const GAP = 100;         // Gap set to 100px for tighter spacing
    const SPEED = 0.01;

    // 16x Duplication for infinite buffer
    const extendedItems = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            // Fade in container immediately before any positioning
            gsap.to(containerRef.current, { 
                opacity: 1, 
                duration: 0.5 
            });

            const cards = cardsRef.current;
            let globalRotation = 0;

            // Mutable proxy object for spin-down animation
            const progress = { speed: 2.0, blur: 10 };

            const circumference = 2 * Math.PI * RADIUS;
            const arcLength = CARD_WIDTH + GAP;
            const angleStep = (arcLength / circumference) * 360;

            const totalAngleSpread = extendedItems.length * angleStep;
            const wrapAngle = gsap.utils.wrap(
                -totalAngleSpread / 2,
                totalAngleSpread / 2
            );

            // Spin-down intro animation
            gsap.to(progress, {
                speed: SPEED,
                blur: 0,
                duration: 2.5,
                ease: 'power4.out',
            });

            const animate = () => {
                // Use dynamic speed from progress object
                globalRotation -= progress.speed;

                // Apply blur to container for better performance
                if (containerRef.current) {
                    containerRef.current.style.filter = `blur(${progress.blur}px)`;
                }

                cards.forEach((card, index) => {
                    if (!card) return;

                    const rawAngle = globalRotation + (index * angleStep);
                    const angle = wrapAngle(rawAngle);

                    if (Math.abs(angle) > 60) {
                        card.style.visibility = 'hidden';
                        return;
                    }
                    card.style.visibility = 'visible';

                    // --- PURE ROTATION ---
                    gsap.set(card, {
                        transformOrigin: `50% ${RADIUS}px`,
                        rotation: angle,
                        zIndex: Math.round(10000 - Math.abs(angle))
                    });
                });
            };

            gsap.ticker.add(animate);
        }, containerRef);

        return () => ctx.revert();
    }, [extendedItems.length]);

    return (
        // Container Setup: Removed top padding (pt-0) to fix the gap
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden pt-0 pb-4 min-h-[600px]">
            <div ref={containerRef} className="relative h-full w-full flex justify-center opacity-0">
                {/* Anchor Point: Removed top offset (top-0) */}
                <div className="relative w-0 h-0 top-0"> 
                    {extendedItems.map((item, index) => (
                        <div
                            key={`${item.title}-${index}`}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            className="absolute will-change-transform"
                            style={{
                                width: `${CARD_WIDTH}px`,
                                left: `-${CARD_WIDTH / 2}px`,
                                top: "50px"
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