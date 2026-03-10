'use client';

import React from 'react';

const stats = [
  { value: '50+', label: 'BRANDS SERVED' },
  { value: '4.9', label: 'AVG. RATING' },
  { value: '2', label: 'SPOTS LEFT THIS MONTH' },
];

export function TrustBar() {
  return (
    <section className="w-full bg-white py-10 border-y border-[#e8e8e8]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && (
                <div className="hidden md:block w-px h-12 bg-[#e8e8e8]" />
              )}
              <div className="text-center">
                <p
                  className="font-sans font-bold text-[28px] text-[#111] mb-1"
                  style={{ fontFamily: 'Nohemi, sans-serif' }}
                >
                  {stat.value}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#999]">
                  {stat.label}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
