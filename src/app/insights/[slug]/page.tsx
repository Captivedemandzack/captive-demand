import { notFound } from 'next/navigation';
import {
  getInsightBySlug,
  getAllInsightSlugs,
  getRelatedInsights,
} from '@/lib/insights';
import { InsightPostPage } from '@/components/insights/InsightPostPage';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return { title: 'Insight | Captive Demand' };

  return {
    title: `${insight.title} | Captive Demand Insights`,
    description: insight.excerpt,
    openGraph: {
      title: `${insight.title} | Captive Demand Insights`,
      description: insight.excerpt,
      images: insight.coverImage ? [insight.coverImage] : undefined,
    },
  };
}

export default async function InsightSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const relatedInsights = getRelatedInsights(slug, insight.category, 3);

  return (
    <InsightPostPage insight={insight} relatedInsights={relatedInsights} />
  );
}
