'use client';

import React from 'react';

import { GhlBookingCardContent } from '@/components/booking/GhlLeadConnectorBooking';

/** LeadConnector booking widget — "Book a call" tab on the contact page */
export function CalEmbed() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 font-mono text-[12px] text-[#666]">
        <span className="flex items-center gap-1.5">
          <span>⏱</span> 15 MIN
        </span>
        <span className="flex items-center gap-1.5">
          <span>📹</span> GOOGLE MEET
        </span>
        <span className="flex items-center gap-1.5">
          <span>📅</span> FREE STRATEGY CALL
        </span>
      </div>
      <GhlBookingCardContent iframeId="ghl-booking-widget-contact" />
      <p className="text-center font-mono text-[11px] text-[#666]">
        Prefer email?{' '}
        <a
          href="mailto:hello@captivedemand.com?subject=Schedule%20Strategy%20Call"
          className="text-[#E8480C] hover:underline"
        >
          hello@captivedemand.com
        </a>
      </p>
    </div>
  );
}
