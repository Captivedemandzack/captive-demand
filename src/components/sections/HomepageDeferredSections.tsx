"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

const AboutSection = dynamic(() =>
    import("@/components/sections/AboutSection").then((m) => ({ default: m.AboutSection }))
);
const FeaturesSection = dynamic(() =>
    import("@/components/sections/FeaturesSection").then((m) => ({ default: m.FeaturesSection }))
);
const IndustriesFolderSection = dynamic(() =>
    import("@/components/sections/IndustriesFolderSection").then((m) => ({ default: m.IndustriesFolderSection }))
);
const BentoGridSection = dynamic(() =>
    import("@/components/sections/BentoGridSection").then((m) => ({ default: m.BentoGridSection }))
);
const TestimonialsSection = dynamic(() =>
    import("@/components/sections/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection }))
);
const ProcessSection = dynamic(() =>
    import("@/components/sections/ProcessSection").then((m) => ({ default: m.ProcessSection }))
);
const CaseStudiesSection = dynamic(() =>
    import("@/components/sections/CaseStudiesSection").then((m) => ({ default: m.CaseStudiesSection }))
);
const FAQSection = dynamic(() =>
    import("@/components/sections/FAQSection").then((m) => ({ default: m.FAQSection }))
);
const CTASection = dynamic(() =>
    import("@/components/sections/CTASection").then((m) => ({ default: m.CTASection }))
);

type LazySectionProps = {
    children: React.ReactNode;
    minHeightClassName: string;
};

function LazySection({ children, minHeightClassName }: LazySectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [shouldMount, setShouldMount] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || shouldMount) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldMount(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "650px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [shouldMount]);

    return (
        <div ref={ref} className={shouldMount ? undefined : minHeightClassName}>
            {shouldMount ? children : null}
        </div>
    );
}

export function HomepageDeferredSections() {
    return (
        <>
            <LazySection minHeightClassName="min-h-[720px]">
                <AboutSection />
            </LazySection>
            <LazySection minHeightClassName="min-h-[760px]">
                <FeaturesSection />
            </LazySection>
            <LazySection minHeightClassName="min-h-[860px]">
                <IndustriesFolderSection />
            </LazySection>
            <LazySection minHeightClassName="min-h-[1100px]">
                <BentoGridSection />
            </LazySection>
            <LazySection minHeightClassName="min-h-[900px]">
                <TestimonialsSection />
            </LazySection>
            <LazySection minHeightClassName="min-h-[760px]">
                <ProcessSection />
            </LazySection>
            <LazySection minHeightClassName="min-h-[820px]">
                <CaseStudiesSection />
            </LazySection>
            <LazySection minHeightClassName="min-h-[760px]">
                <FAQSection />
            </LazySection>
            <LazySection minHeightClassName="min-h-[720px]">
                <CTASection />
            </LazySection>
        </>
    );
}
