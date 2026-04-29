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

const INITIAL_RENDERED_IMAGE_COUNT = 10;
const EAGER_IMAGE_COUNT = 5;
const VISIBLE_CARD_ANGLE = 60;
const NEAR_VISIBLE_IMAGE_ANGLE = 90;
const TRANSFORM_UPDATE_ANGLE = 100;

const createInitialRenderedImageIndexes = (totalCount = 0) => {
    const indexes = new Set<number>();
    const count = Math.min(INITIAL_RENDERED_IMAGE_COUNT, Math.max(totalCount, INITIAL_RENDERED_IMAGE_COUNT));

    for (let index = 0; index < count; index += 1) {
        indexes.add(index);
    }

    // The carousel wraps around a circle. On first paint, cards on the left side
    // can be the final duplicate items in extendedItems, not just indexes 0..N.
    // Render those immediately too so visible edge cards never pop in blank.
    for (let index = Math.max(0, totalCount - count); index < totalCount; index += 1) {
        indexes.add(index);
    }

    return indexes;
};

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

    const initialRenderedImageIndexes = React.useMemo(
        () => createInitialRenderedImageIndexes(extendedItems.length),
        [extendedItems.length]
    );

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

        // Respect users (and audit tools) that ask for reduced motion: render the
        // carousel statically without the rotating ticker. Lighthouse evaluates
        // with prefers-reduced-motion: no-preference by default, so this only
        // catches users with the OS setting on - it won't help PSI.
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            const cards = cardsRef.current;
            let globalRotation = 0;

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
            const progress = {
                speed: prefersReducedMotion ? 0 : targetSpeed * 9,
                blur: !isMobile && !prefersReducedMotion ? 10 : 0,
            };
            let lastContainerFilter = "";

            // Position every card once at globalRotation = 0. This puts the cards
            // in their resting arc layout WITHOUT requiring the GSAP ticker to be
            // running, so the page is paint-stable for Lighthouse / Largest
            // Contentful Paint detection during the audit measurement window.
            const positionCardsStatic = () => {
                cards.forEach((card, index) => {
                    if (!card) return;
                    const rawAngle = globalRotation + index * angleStep;
                    const angle = wrapAngle(rawAngle);
                    const visibility = Math.abs(angle) > VISIBLE_CARD_ANGLE ? "hidden" : "visible";
                    card.style.visibility = visibility;
                    if (Math.abs(angle) > TRANSFORM_UPDATE_ANGLE) return;
                    card.style.transformOrigin = `50% ${config.radius}px`;
                    card.style.transform = `rotate(${angle}deg)`;
                    card.style.zIndex = `${Math.round(10000 - Math.abs(angle))}`;
                });
            };

            positionCardsStatic();
            // Container is no longer faded in via JS; the static cards above are
            // already painted, so we keep the container fully opaque from the start.
            if (containerRef.current) {
                containerRef.current.style.opacity = "1";
                if (progress.blur > 0) {
                    containerRef.current.style.filter = `blur(${progress.blur}px)`;
                    lastContainerFilter = containerRef.current.style.filter;
                } else {
                    containerRef.current.style.filter = "";
                }
            }

            const animate = () => {
                if (!isVisibleRef.current) return;

                globalRotation -= progress.speed;

                if (!isMobile && containerRef.current) {
                    const nextFilter = progress.blur > 0.1 ? `blur(${progress.blur}px)` : "";
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

            // Start the intro on the first visible frame so the carousel never
            // appears static before the speed/blur entrance begins. Keep it short
            // so Lighthouse can still settle after the initial above-fold paint.
            if (!prefersReducedMotion) {
                gsap.ticker.add(animate);
                animate();
                gsap.to(progress, {
                    speed: targetSpeed,
                    blur: 0,
                    duration: 0.9,
                    ease: "power4.out",
                });
            }
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
                                renderImage={initialRenderedImageIndexes.has(index) || renderedImageIndexes.has(index)}
                                imageLoading={initialRenderedImageIndexes.has(index) || index < EAGER_IMAGE_COUNT ? "eager" : "lazy"}
                                imageFetchPriority="auto"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}