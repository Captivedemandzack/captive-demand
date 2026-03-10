'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    quote:
      "Spencer is knowledgeable, patient, and open to listen! He's willing to try anything to help move the needle...",
    author: 'Tricia Restifo',
    title: 'VP Finance, Farmulated',
    avatar: '/tricia.webp',
  },
  {
    quote:
      "Our business went from only referral-based clients to having an entire authoritative online presence that allowed us to grow by over 1,000%...",
    author: 'Matthew Ford',
    title: 'Founder, North Star Nature Suites',
    avatar: '/matthew.webp',
  },
  {
    quote:
      "Captive Demand is different than any other agency we have worked with. They take a genuine interest in your success and back up their promises with results.",
    author: 'Ben Elizer',
    title: 'CEO, Velocity International',
    avatar: '/ben.webp',
  },
  {
    quote:
      "They are always on time and they're always willing to listen to my non-tech vision and translate the vision into core pieces of my business.",
    author: 'Bonnie Paik',
    title: 'Owner, Apex Digital',
    avatar: '/bonnie.webp',
  },
];

export function TestimonialMarquee() {
  const duped = [...testimonials, ...testimonials];

  return (
    <section className="w-full bg-white py-12 md:py-16 overflow-hidden border-y border-[#e8e8e8]">
      <motion.div
        className="flex gap-6"
        animate={{ x: [0, -1440] }}
        transition={{
          x: { repeat: Infinity, repeatType: 'loop', duration: 40, ease: 'linear' },
        }}
      >
        {duped.map((t, i) => (
          <div
            key={`${t.author}-${i}`}
            className="flex-shrink-0 w-[360px] rounded-xl border border-[#e8e8e8] bg-white p-5 md:p-6"
          >
            <p className="font-mono text-[13px] text-[#444] leading-relaxed line-clamp-2 mb-4">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                <Image src={t.avatar} alt={t.author} fill className="object-cover" />
              </div>
              <div>
                <p className="font-sans font-bold text-[13px] text-[#111]">
                  {t.author}
                </p>
                <p className="font-mono text-[11px] text-[#888]">{t.title}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
