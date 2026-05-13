import { getAllInsights, getFeaturedInsights } from '@/lib/insights';
import { InsightHero } from '@/components/insights/InsightHero';
import { FeaturedInsight } from '@/components/insights/FeaturedInsight';
import { InsightGrid } from '@/components/insights/InsightGrid';
import { CTASection } from '@/components/sections/CTASection';
import { createSeoMetadata } from '@/lib/site';

export const metadata = createSeoMetadata({
  title: 'Digital Marketing and SEO Insights',
  description:
    'Read Captive Demand insights on SEO, AEO, web design, email marketing, automation, and growth strategy for ambitious companies.',
  path: '/insights',
});

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
