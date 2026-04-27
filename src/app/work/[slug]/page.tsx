import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, getAllSlugs } from '@/data/case-studies';
import { CaseStudyPageClient } from './client';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: 'Case Study' };

  return {
    title: `${study.clientName} Case Study`,
    description: study.shortDescription,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${study.clientName} Case Study | Captive Demand`,
      description: study.shortDescription,
      url: `/work/${slug}`,
      images: study.heroImage ? [study.heroImage] : undefined,
    },
  };
}

export default async function CaseStudyRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return <CaseStudyPageClient study={study} />;
}
