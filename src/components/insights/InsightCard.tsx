'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { timeAgo } from '@/lib/insight-utils';
import type { Insight } from '@/lib/insights';

interface InsightCardProps {
  insight: Insight;
  index?: number;
}

export function InsightCard({ insight, index = 0 }: InsightCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link href={`/insights/${insight.slug}`} className="block group">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        }}
        viewport={{ once: true, margin: '-50px' }}
        className="relative overflow-hidden rounded-[14px] bg-white border border-[#e8e8e8] cursor-pointer"
        style={{
          boxShadow: '0 4px 20px rgba(26,21,18,0.04), 0 1px 3px rgba(26,21,18,0.06)',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{
          y: -4,
          transition: { type: 'spring', stiffness: 400, damping: 10 },
        }}
      >
        {/* Cover image — 16:9 */}
        <div className="relative aspect-video overflow-hidden rounded-t-[14px]">
          <Image
            src={insight.coverImage}
            alt={insight.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Hover overlay — thin orange bar at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-9 flex items-center justify-center bg-[#E8480C] text-white font-mono text-[11px] uppercase tracking-wider transition-all duration-300"
            style={{
              transform: isHovering ? 'translateY(0)' : 'translateY(100%)',
            }}
          >
            Read Insight →
          </div>
        </div>

        {/* Card body */}
        <div className="p-5">
          <span className="inline-block px-2.5 py-1 rounded-[6px] text-[10px] font-mono uppercase tracking-wider bg-[#f3f4f6] text-[#1a1512]/60 mb-3">
            {insight.category}
          </span>
          <h3
            className="text-[17px] font-bold text-[#111] line-clamp-2 mb-2 font-sans"
          >
            {insight.title}
          </h3>
          <p className="font-mono text-[13px] text-[#666] line-clamp-3 leading-relaxed mb-4">
            {insight.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={insight.author.avatar}
                  alt={insight.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-mono text-[11px] text-[#1a1512]/70">
                {insight.author.name}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#999]">
              {timeAgo(insight.publishedAt)} · {insight.readTime} min read
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
