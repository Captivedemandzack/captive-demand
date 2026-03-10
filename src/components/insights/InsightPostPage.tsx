'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { InsightBody } from './InsightBody';
import { RelatedInsights } from './RelatedInsights';
import { CTASection } from '@/components/sections/CTASection';
import { timeAgo, getHeadingsFromBody } from '@/lib/insight-utils';
import type { Insight } from '@/lib/insights';

interface InsightPostPageProps {
  insight: Insight;
  relatedInsights: Insight[];
}

export function InsightPostPage({ insight, relatedInsights }: InsightPostPageProps) {
  const headings = getHeadingsFromBody(insight.body);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="w-full bg-white min-h-screen">
      {/* Post Hero */}
      <section className="w-full bg-white pt-32 md:pt-40 pb-12 md:pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#1a1512]/50 hover:text-[#1a1512] transition-colors mb-8"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to Insights
          </Link>

          <div className="text-center">
            <span className="inline-block px-3 py-1.5 rounded-[8px] text-[10px] font-mono uppercase tracking-wider bg-[#1a1512]/5 text-[#1a1512]/70 mb-6">
              {insight.category}
            </span>
            <h1
              className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-bold text-[#111] leading-tight mb-6 max-w-[800px] mx-auto"
              style={{ fontFamily: 'Nohemi, sans-serif' }}
            >
              {insight.title}
            </h1>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={insight.author.avatar}
                  alt={insight.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-mono text-sm text-[#1a1512]/70">
                {insight.author.name} · {timeAgo(insight.publishedAt)} ·{' '}
                {insight.readTime} min read
              </span>
            </div>
            <div className="relative aspect-video mt-8 rounded-xl overflow-hidden">
              <Image
                src={insight.coverImage}
                alt={insight.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Two-column body */}
      <section className="w-full bg-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[65%_30%] gap-12 lg:gap-16">
            {/* Content column */}
            <div>
              <InsightBody content={insight.body} />

              {/* Author block */}
              <div className="mt-16 pt-12 border-t border-[#e8e8e8]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#1a1512]/40 block mb-3">
                  Written by
                </span>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={insight.author.avatar}
                      alt={insight.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-sans font-bold text-[15px] text-[#1a1512]">
                      {insight.author.name}
                    </p>
                    <p className="font-mono text-[12px] text-[#888]">
                      {insight.author.title}
                    </p>
                  </div>
                </div>
                <p className="font-mono text-[11px] text-[#999] mt-2">
                  Published {new Date(insight.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-[120px] h-fit space-y-8">
              {headings.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#999] block mb-4">
                    / IN THIS INSIGHT
                  </span>
                  <nav className="space-y-2">
                    {headings.map(({ id, text }) => (
                      <button
                        key={id}
                        onClick={() => scrollToHeading(id)}
                        className={`block w-full text-left font-mono text-[12px] transition-colors flex items-center gap-2 ${
                          activeId === id
                            ? 'text-[#E8480C]'
                            : 'text-[#666] hover:text-[#1a1512]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            activeId === id ? 'bg-[#E8480C]' : 'bg-[#999]'
                          }`}
                        />
                        {text}
                      </button>
                    ))}
                  </nav>
                </div>
              )}

              {/* CTA card */}
              <div className="rounded-xl p-6 bg-[#1a1a1a] text-white">
                <p className="font-sans font-bold text-[15px] mb-2">
                  Ready to apply this?
                </p>
                <p className="font-mono text-[12px] text-[#888] mb-4">
                  Book a free strategy call.
                </p>
                <a
                  href="https://connect.captivedemand.com/meetings/spencer-donaldson/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-[#E8480C] text-white font-mono text-xs uppercase tracking-wider py-3 rounded-md hover:opacity-90 transition-opacity"
                >
                  START YOUR BUILD →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <RelatedInsights insights={relatedInsights} />
      <CTASection />
    </main>
  );
}
