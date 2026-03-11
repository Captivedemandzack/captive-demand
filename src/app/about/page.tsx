'use client';

import { AboutHero } from '@/components/about/AboutHero';
import { FounderLetter } from '@/components/about/FounderLetter';
import { AboutStats } from '@/components/about/AboutStats';
import { TeamGrid } from '@/components/about/TeamGrid';
import { ClientLogos } from '@/components/about/ClientLogos';
import { AboutCTA } from '@/components/about/AboutCTA';

export default function AboutPage() {
    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen">
            <AboutHero />
            <FounderLetter />
            <AboutStats />
            <TeamGrid />
            <ClientLogos />
            <AboutCTA />
        </main>
    );
}
