'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InsightCard } from './InsightCard';
import type { Insight } from '@/lib/insights';

const CATEGORIES = [
  'ALL',
  'SEO/AEO',
  'WEBSITE DESIGN',
  'EMAIL MARKETING',
  'MARKETING AUTOMATION',
  'STRATEGY',
  'INDUSTRY INSIGHTS',
];

interface InsightGridProps {
  insights: Insight[];
}

function matchesFilter(insight: Insight, filter: string): boolean {
  if (filter === 'ALL') return true;
  return (
    insight.category.toUpperCase().replace(/\s+/g, ' ') ===
    filter.replace(/\s+/g, ' ')
  );
}

export function InsightGrid({ insights }: InsightGridProps) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = insights.filter((i) => matchesFilter(i, activeFilter));

  return (
    <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-[8px] font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-[#1a1a1a] text-white'
                  : 'bg-white/50 border border-[#e8e8e8] text-[#666] hover:border-[#ccc]'
              }`}
              style={
                activeFilter !== cat
                  ? {
                      boxShadow:
                        'inset 0 1px 0 0 rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.04)',
                    }
                  : undefined
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((insight, index) => (
              <InsightCard key={insight.slug} insight={insight} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-sm text-[#1a1512]/40 uppercase tracking-wider">
              No insights found for this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
