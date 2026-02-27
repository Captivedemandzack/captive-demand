"use client";

import { AboutHero } from "@/components/about/AboutHero";
import { FounderQuote } from "@/components/about/FounderQuote";
import { TeamSection } from "@/components/about/TeamSection";
import { AwardsSection } from "@/components/about/AwardsSection";
import { AboutTestimonials } from "@/components/about/AboutTestimonials";
import { WhyWorkWithUs } from "@/components/about/WhyWorkWithUs";
import { CTASection } from "@/components/sections/CTASection";

export default function AboutPage() {
    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen">
            <AboutHero />
            <FounderQuote />
            <TeamSection />
            <AwardsSection />
            <AboutTestimonials />
            <WhyWorkWithUs />
            <CTASection />
        </main>
    );
}
