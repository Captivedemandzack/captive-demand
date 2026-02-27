import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { BentoGridSection } from "@/components/sections/BentoGridSection";

const TestimonialsSection = dynamic(() =>
    import("@/components/sections/TestimonialsSection").then(m => ({ default: m.TestimonialsSection }))
);
const ProcessSection = dynamic(() =>
    import("@/components/sections/ProcessSection").then(m => ({ default: m.ProcessSection }))
);
const CaseStudiesSection = dynamic(() =>
    import("@/components/sections/CaseStudiesSection").then(m => ({ default: m.CaseStudiesSection }))
);
const FAQSection = dynamic(() =>
    import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection }))
);
const CTASection = dynamic(() =>
    import("@/components/sections/CTASection").then(m => ({ default: m.CTASection }))
);

export default function Home() {
    return (
        <main>
            <Hero />
            <AboutSection />
            <FeaturesSection />
            <BentoGridSection />
            <TestimonialsSection />
            <ProcessSection />
            <CaseStudiesSection />
            <FAQSection />
            <CTASection />
        </main>
    );
}
