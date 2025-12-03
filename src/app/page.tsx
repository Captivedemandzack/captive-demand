import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { BentoGridSection } from "@/components/sections/BentoGridSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

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
