import { getAllInsights, getFeaturedInsights } from '@/lib/insights';
import { InsightHero } from '@/components/insights/InsightHero';
import { FeaturedInsight } from '@/components/insights/FeaturedInsight';
import { InsightGrid } from '@/components/insights/InsightGrid';
import { CTASection } from '@/components/sections/CTASection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights | Captive Demand',
  description:
    'Strategy, design, and marketing perspectives from Captive Demand.',
};

export default function InsightsPage() {
  const insights = getAllInsights();
  const featured = getFeaturedInsights();

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen">
      <InsightHero />
      <FeaturedInsight insights={featured} />
      <InsightGrid insights={insights} />
      <CTASection />
    </main>
  );
}
