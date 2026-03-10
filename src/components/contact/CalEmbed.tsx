'use client';

import React, { useEffect, useState } from 'react';

/** Cal.com embed — shows placeholder if not configured */
export function CalEmbed() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use placeholder until Cal.com is configured
  const usePlaceholder = true;

  if (!mounted || usePlaceholder) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 font-mono text-[12px] text-[#666]">
          <span className="flex items-center gap-1.5">
            <span>⏱</span> 30 MIN
          </span>
          <span className="flex items-center gap-1.5">
            <span>📹</span> GOOGLE MEET
          </span>
          <span className="flex items-center gap-1.5">
            <span>📅</span> FREE STRATEGY CALL
          </span>
        </div>
        <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-8 text-center">
          <h3 className="font-sans font-bold text-[18px] text-[#111] mb-2">
            Schedule a 30-min strategy call
          </h3>
          <p className="font-mono text-[13px] text-[#666] mb-6 max-w-sm mx-auto">
            Calendar embed coming soon. In the meantime, email us directly to
            schedule.
          </p>
          <a
            href="mailto:hello@captivedemand.com?subject=Schedule%20Strategy%20Call"
            className="inline-flex items-center justify-center bg-[#E8480C] text-white font-mono text-xs uppercase tracking-wider py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
          >
            EMAIL TO SCHEDULE →
          </a>
        </div>
      </div>
    );
  }

  // Cal.com embed (when configured)
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 font-mono text-[12px] text-[#666]">
        <span>⏱ 30 MIN</span>
        <span>📹 GOOGLE MEET</span>
        <span>📅 FREE STRATEGY CALL</span>
      </div>
      <div className="min-h-[500px]">
        {/* Cal embed would go here - import Cal, getCalApi from @calcom/embed-react */}
      </div>
    </div>
  );
}
