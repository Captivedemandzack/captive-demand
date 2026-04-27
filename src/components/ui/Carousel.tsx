"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
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
    const outerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const isVisibleRef = useRef(true);
    const tickerFnRef = useRef<(() => void) | null>(null);

    const [config, setConfig] = useState({
        radius: 2025,
        cardWidth: 360,
        gap: 100
    });

    const [duplicationCount, setDuplicationCount] = useState(3);

    const extendedItems = React.useMemo(() => {
        return Array(duplicationCount).fill(items).flat();
    }, [items, duplicationCount]);

    /** Pause the GSAP ticker when the carousel scrolls out of view.
     *  This frees the main thread so touch events work on the rest of the page. */
    useEffect(() => {
        const el = outerRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
            { rootMargin: '200px' },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useLayoutEffect(() => {
        const updateConfig = () => {
            const isMobile = window.innerWidth < 768;
            const isTablet = window.innerWidth < 1024;

            if (isMobile) {
                setDuplicationCount(2);
            } else {
                setDuplicationCount(16);
            }

            if (isTablet) {
                setConfig({ radius: 1600, cardWidth: 280, gap: 80 });
            } else {
                setConfig({ radius: 2025, cardWidth: 360, gap: 100 });
            }
        };

        updateConfig();
        window.addEventListener('resize', updateConfig);

        const isMobile = window.innerWidth < 768;

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

            const MOBILE_SPEED = 0.05;
            const DESKTOP_SPEED = 0.05;
            const targetSpeed = isMobile ? MOBILE_SPEED : DESKTOP_SPEED;

            gsap.to(progress, {
                speed: targetSpeed,
                blur: 0,
                duration: 2.5,
                ease: 'power4.out',
            });

            const animate = () => {
                if (!isVisibleRef.current) return;

                globalRotation -= progress.speed;

                if (!isMobile && containerRef.current) {
                    containerRef.current.style.filter = `blur(${progress.blur}px)`;
                }

                cards.forEach((card, index) => {
                    if (!card) return;

                    const rawAngle = globalRotation + (index * angleStep);
                    const angle = wrapAngle(rawAngle);

                    if (Math.abs(angle) > 60) {
                        card.style.visibility = 'hidden';
                    } else {
                        card.style.visibility = 'visible';
                    }

                    if (Math.abs(angle) > 100) {
                        return;
                    }

                    gsap.set(card, {
                        transformOrigin: `50% ${config.radius}px`,
                        rotation: angle,
                        zIndex: Math.round(10000 - Math.abs(angle))
                    });
                });
            };

            tickerFnRef.current = animate;
            gsap.ticker.add(animate);
        }, containerRef);

        return () => {
            window.removeEventListener('resize', updateConfig);
            if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
            ctx.revert();
        };
    }, [extendedItems.length, config.radius, config.cardWidth, config.gap]);

    return (
        <div ref={outerRef} className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden pt-0 pb-4 min-h-[600px]">
            <div ref={containerRef} className="relative h-full w-full flex justify-center opacity-0">
                <div className="relative w-0 h-0 top-0">
                    {extendedItems.map((item, index) => (
                        <div
                            key={`${item.title}-${index}`}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            className="absolute will-change-transform"
                            aria-hidden={index >= items.length}
                            role={index >= items.length ? "presentation" : undefined}
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
                                titleAs={index < items.length ? "h3" : "div"}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}