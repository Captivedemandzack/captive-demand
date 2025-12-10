"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
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

    // Initial state
    const [config, setConfig] = useState({
        radius: 2025,
        cardWidth: 360,
        gap: 100
    });

    // 16x Duplication for infinite buffer
    const extendedItems = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];

    useLayoutEffect(() => {
        const updateConfig = () => {
            // Using 1024px (Tablet Landscape) as the breakpoint
            if (window.innerWidth < 1024) {
                // TABLET & MOBILE:
                // - Smaller cards (280px)
                // - Wider gap (80px) to give that "spaced out" look you wanted
                // - Adjusted radius to maintain perspective with the new gaps
                setConfig({ radius: 1600, cardWidth: 280, gap: 80 });
            } else {
                // DESKTOP / LAPTOP:
                // - RESTORED: cardWidth 360, gap 100 (Back to original tight spacing)
                // - Standard radius
                setConfig({ radius: 2025, cardWidth: 360, gap: 100 });
            }
        };

        updateConfig();
        window.addEventListener('resize', updateConfig);

        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            gsap.to(containerRef.current, {
                opacity: 1,
                duration: 0.5
            });

            const cards = cardsRef.current;
            let globalRotation = 0;

            const progress = { speed: 2.0, blur: 10 };

            const circumference = 2 * Math.PI * config.radius;
            const arcLength = config.cardWidth + config.gap;
            const angleStep = (arcLength / circumference) * 360;

            const totalAngleSpread = extendedItems.length * angleStep;
            const wrapAngle = gsap.utils.wrap(
                -totalAngleSpread / 2,
                totalAngleSpread / 2
            );

            gsap.to(progress, {
                speed: 0.01,
                blur: 0,
                duration: 2.5,
                ease: 'power4.out',
            });

            const animate = () => {
                globalRotation -= progress.speed;

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

                    gsap.set(card, {
                        transformOrigin: `50% ${config.radius}px`,
                        rotation: angle,
                        zIndex: Math.round(10000 - Math.abs(angle))
                    });
                });
            };

            gsap.ticker.add(animate);
        }, containerRef);

        return () => {
            window.removeEventListener('resize', updateConfig);
            ctx.revert();
        };
    }, [extendedItems.length, config.radius, config.cardWidth, config.gap]);

    return (
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden pt-0 pb-4 min-h-[600px]">
            <div ref={containerRef} className="relative h-full w-full flex justify-center opacity-0">
                <div className="relative w-0 h-0 top-0">
                    {extendedItems.map((item, index) => (
                        <div
                            key={`${item.title}-${index}`}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            className="absolute will-change-transform"
                            style={{
                                width: `${config.cardWidth}px`,
                                left: `-${config.cardWidth / 2}px`,
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