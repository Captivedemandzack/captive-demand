'use client';

import { MessageCircle } from 'lucide-react';

import { shorePartnershipBookingUrl } from '@/lib/shore-partnership';

export function ShoreLiveChatFab() {
  const bookingHref = shorePartnershipBookingUrl();

  return (
    <a
      href={bookingHref}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[70] flex items-center gap-2 rounded-full bg-[#1a1512] py-3 pl-4 pr-5 font-mono text-[13px] uppercase tracking-[0.12em] text-white shadow-[0_4px_24px_rgba(0,0,0,0.18),inset_0_1px_0_0_rgba(255,255,255,0.12)] transition-transform duration-200 hover:scale-[1.03] active:scale-95 max-sm:bottom-4 max-sm:right-4"
      aria-label="Chat with someone now. Book a call with Captive Demand"
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ff5501] opacity-50" />
        <span className="relative inline-flex size-2 rounded-full bg-[#ff5501]" />
      </span>
      <MessageCircle size={16} strokeWidth={1.5} aria-hidden />
      Chat now
    </a>
  );
}
