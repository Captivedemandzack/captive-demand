import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type InsightAuthor = {
  name: string;
  title: string;
  avatar: string;
};

export type InsightFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: InsightAuthor;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  coverImage: string;
  tags?: string[];
};

export type Insight = InsightFrontmatter & {
  body: string;
};

const INSIGHTS_DIR = path.join(process.cwd(), 'content/insights');

const CATEGORIES = [
  'SEO/AEO',
  'Website Design',
  'Email Marketing',
  'Marketing Automation',
  'Strategy',
  'Industry Insights',
] as const;

function getInsightFiles(): string[] {
  if (!fs.existsSync(INSIGHTS_DIR)) return [];
  return fs
    .readdirSync(INSIGHTS_DIR)
    .filter(
      (f) =>
        (f.endsWith('.md') || f.endsWith('.mdx')) && f !== 'README.md'
    );
}

function parseInsightFile(filePath: string): Insight {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const slug =
    data.slug ?? path.basename(filePath, path.extname(filePath));
  return {
    ...(data as Omit<InsightFrontmatter, 'slug'>),
    slug,
    body: content.trim(),
  };
}

export function getAllInsights(): Insight[] {
  const files = getInsightFiles();
  const insights = files
    .map((f) => parseInsightFile(path.join(INSIGHTS_DIR, f)))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  return insights;
}

export function getFeaturedInsights(): Insight[] {
  return getAllInsights()
    .filter((i) => i.featured)
    .slice(0, 3);
}

export function getInsightBySlug(slug: string): Insight | undefined {
  const files = getInsightFiles();
  for (const f of files) {
    const insight = parseInsightFile(path.join(INSIGHTS_DIR, f));
    if (insight.slug === slug) return insight;
  }
  return undefined;
}

export function getInsightsByCategory(category: string): Insight[] {
  return getAllInsights().filter(
    (i) => i.category.toLowerCase() === category.toLowerCase()
  );
}

export function getRelatedInsights(
  slug: string,
  category: string,
  limit = 3
): Insight[] {
  const sameCategory = getInsightsByCategory(category).filter(
    (i) => i.slug !== slug
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const rest = getAllInsights()
    .filter((i) => i.slug !== slug && !sameCategory.some((s) => s.slug === i.slug))
    .slice(0, limit - sameCategory.length);
  return [...sameCategory, ...rest];
}

export function getAllInsightSlugs(): string[] {
  return getAllInsights().map((i) => i.slug);
}

export function getInsightCategories(): string[] {
  return [...CATEGORIES];
}
