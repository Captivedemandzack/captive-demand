'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { timeAgo } from '@/lib/insight-utils';
import type { Insight } from '@/lib/insights';

interface FeaturedInsightProps {
  insights: Insight[];
}

export function FeaturedInsight({ insights }: FeaturedInsightProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (insights.length === 0) return null;

  const goTo = (i: number) => setActiveIndex(i);
  const prev = () =>
    setActiveIndex((p) => (p === 0 ? insights.length - 1 : p - 1));
  const next = () =>
    setActiveIndex((p) => (p === insights.length - 1 ? 0 : p + 1));

  const insight = insights[activeIndex];

  return (
    <section className="w-full bg-[#FAFAFA] pt-8 md:pt-16 pb-24 md:pb-40 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={insight.slug}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
            className="relative rounded-2xl overflow-hidden bg-white border border-[#e8e8e8]"
            style={{
              boxShadow: '0 4px 20px rgba(26,21,18,0.06), 0 1px 3px rgba(26,21,18,0.08)',
            }}
          >
            <Link href={`/insights/${insight.slug}`} className="block">
              <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] min-h-[380px] md:min-h-[420px]">
                {/* Left — Content */}
                <div className="flex flex-col justify-between p-8 md:p-10 order-2 lg:order-1">
                  <div>
                    <span className="inline-block px-3 py-1.5 rounded-[8px] text-[10px] font-mono uppercase tracking-wider bg-[#1a1512]/5 text-[#1a1512]/70 mb-4">
                      {insight.category}
                    </span>
                    <h2
                      className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111] leading-tight mb-4 font-sans"
                    >
                      {insight.title}
                    </h2>
                    <p className="font-mono text-sm text-[#666] leading-relaxed line-clamp-3 mb-6">
                      {insight.excerpt}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="inline-flex items-center justify-center w-fit gap-2 bg-[#1a1512] text-white px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider">
                      Read More
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={insight.author.avatar}
                          alt={insight.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-mono text-[11px] text-[#1a1512]/60">
                        {insight.author.name} · {timeAgo(insight.publishedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right — Cover image */}
                <div className="relative min-h-[240px] lg:min-h-[420px] order-1 lg:order-2">
                  <Image
                    src={insight.coverImage}
                    alt={insight.title}
                    fill
                    className="object-cover rounded-r-2xl lg:rounded-l-none lg:rounded-r-2xl"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              </div>
            </Link>

            {/* Navigation arrows — bottom right */}
            {insights.length > 1 && (
              <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    prev();
                  }}
                  className="w-10 h-10 rounded-full bg-[#1a1512] text-white flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <ChevronLeft size={18} strokeWidth={2} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    next();
                  }}
                  className="w-10 h-10 rounded-full bg-[#1a1512] text-white flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <ChevronRight size={18} strokeWidth={2} />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        {insights.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {insights.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 h-2 bg-[#1a1512]'
                    : 'w-2 h-2 bg-[#1a1512]/20 hover:bg-[#1a1512]/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
