import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, getAllSlugs } from '@/data/case-studies';
import { CaseStudyPageClient } from './client';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
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
