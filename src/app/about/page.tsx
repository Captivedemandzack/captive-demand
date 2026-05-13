import { AboutHero } from '@/components/about/AboutHero';
import { FounderLetter } from '@/components/about/FounderLetter';
import { AboutStats } from '@/components/about/AboutStats';
import { TeamGrid } from '@/components/about/TeamGrid';
import { ClientLogos } from '@/components/about/ClientLogos';
import { AboutCTA } from '@/components/about/AboutCTA';
import { createSeoMetadata } from '@/lib/site';

export const metadata = createSeoMetadata({
    title: 'About Captive Demand',
    description:
        'Meet Captive Demand, a Nashville digital agency building websites, SEO systems, email marketing, automation, and software with an owner mentality.',
    path: '/about',
});

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
