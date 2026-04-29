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

const INITIAL_RENDERED_IMAGE_COUNT = 6;
const VISIBLE_CARD_ANGLE = 60;
const NEAR_VISIBLE_IMAGE_ANGLE = 90;
const TRANSFORM_UPDATE_ANGLE = 100;

const createInitialRenderedImageIndexes = () =>
    new Set<number>(Array.from({ length: INITIAL_RENDERED_IMAGE_COUNT }, (_, index) => index));

export function Carousel({ items }: CarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const outerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const isVisibleRef = useRef(true);
    const tickerFnRef = useRef<(() => void) | null>(null);
    const renderedImageIndexesRef = useRef(createInitialRenderedImageIndexes());

    const [config, setConfig] = useState({
        radius: 2025,
        cardWidth: 360,
        gap: 100
    });

    const [duplicationCount, setDuplicationCount] = useState(2);
    const [renderedImageIndexes, setRenderedImageIndexes] = useState(createInitialRenderedImageIndexes);

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
            let lastContainerFilter = "";

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
                    const nextFilter = progress.blur > 0.01 ? `blur(${progress.blur}px)` : "";
                    if (nextFilter !== lastContainerFilter) {
                        containerRef.current.style.filter = nextFilter;
                        lastContainerFilter = nextFilter;
                    }
                }

                let shouldSyncRenderedImages = false;

                cards.forEach((card, index) => {
                    if (!card) return;

                    const rawAngle = globalRotation + (index * angleStep);
                    const angle = wrapAngle(rawAngle);
                    const isNearVisible = Math.abs(angle) <= NEAR_VISIBLE_IMAGE_ANGLE;

                    if (isNearVisible && !renderedImageIndexesRef.current.has(index)) {
                        renderedImageIndexesRef.current.add(index);
                        shouldSyncRenderedImages = true;
                    }

                    const visibility = Math.abs(angle) > VISIBLE_CARD_ANGLE ? 'hidden' : 'visible';
                    if (card.style.visibility !== visibility) {
                        card.style.visibility = visibility;
                    }

                    if (Math.abs(angle) > TRANSFORM_UPDATE_ANGLE) {
                        return;
                    }

                    card.style.transformOrigin = `50% ${config.radius}px`;
                    card.style.transform = `rotate(${angle}deg)`;
                    card.style.zIndex = `${Math.round(10000 - Math.abs(angle))}`;
                });

                if (shouldSyncRenderedImages) {
                    setRenderedImageIndexes(new Set(renderedImageIndexesRef.current));
                }
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
                                renderImage={renderedImageIndexes.has(index)}
                                imageLoading={index < 2 ? "eager" : "lazy"}
                                imageFetchPriority={index === 0 ? "high" : "low"}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}