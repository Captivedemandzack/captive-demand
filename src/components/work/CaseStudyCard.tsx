'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/data/case-studies';

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  variant?: 'default' | 'compact';
}

export function CaseStudyCard({ study, index, variant = 'default' }: CaseStudyCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Link href={`/work/${study.slug}`} className="block group">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative overflow-hidden rounded-2xl bg-white cursor-pointer"
        style={{
          boxShadow: '0 4px 20px rgba(26,21,18,0.04), 0 1px 3px rgba(26,21,18,0.06)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-7 bg-[#f3f4f6] flex items-center px-3 z-10 rounded-t-2xl">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#1a1512]/15" />
              <div className="w-2 h-2 rounded-full bg-[#1a1512]/15" />
              <div className="w-2 h-2 rounded-full bg-[#1a1512]/15" />
            </div>
          </div>
          <Image
            src={study.heroImage}
            alt={study.clientName}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3
                className="text-lg text-[#1a1512] mb-0.5"
                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
              >
                {study.clientName}
              </h3>
              <span className="font-mono text-[11px] text-[#1a1512]/40 uppercase tracking-wider">
                {study.industry}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center group-hover:bg-[#ff5501] group-hover:text-white transition-colors duration-300">
              <ArrowUpRight size={14} className="text-[#1a1512]/40 group-hover:text-white transition-colors" strokeWidth={1.5} />
            </div>
          </div>

          <p className="font-mono text-xs text-[#1a1512]/50 leading-relaxed mb-4">
            {study.shortDescription}
          </p>

          {/* Stats row */}
          {variant === 'default' && (
            <div className="flex items-center gap-6 mb-4 pb-4">
              {study.stats.slice(0, 3).map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-xl text-[#1a1512]"
                    style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                  >
                    {stat.value}
                  </span>
                  <span className="font-mono text-[9px] text-[#1a1512]/40 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {study.services.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-[4px] text-[10px] font-mono uppercase tracking-wider bg-[#f3f4f6] text-[#1a1512]/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover cursor button (desktop only) — line + dot from cursor to button, same style as carousel */}
        <div
          className="absolute pointer-events-none z-20 transition-opacity duration-200 hidden lg:block"
          style={{
            left: mousePos.x + 40,
            top: mousePos.y + 60,
            opacity: isHovering ? 1 : 0,
          }}
        >
          <div className="relative">
            <svg className="absolute" style={{ left: 0, top: 0, overflow: 'visible' }} width="10" height="10">
              <line x1="0" y1="0" x2="-40" y2="-60" stroke="#ff5501" strokeWidth="1.5" />
              <rect x="-44" y="-64" width="8" height="8" fill="#ff5501" />
            </svg>
            <div className="inline-flex items-center gap-2 bg-[#1a1512] text-[#ff5501] px-6 py-3 border border-[#ff5501]/50 whitespace-nowrap rounded-xl font-mono text-xs uppercase tracking-wider">
              <span>Read case study</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={2} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
