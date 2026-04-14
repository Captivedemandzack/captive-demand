'use client';

import Image from 'next/image';
import { Clock, Globe, Video } from 'lucide-react';

export interface BookingCalendarShellProps {
  children: React.ReactNode;
  /** Shown next to the clock icon (e.g. 15). */
  durationMinutes?: number;
  eventTitle?: string;
  description?: string;
  /** Timezone label under meta row. */
  timezoneLabel?: string;
  className?: string;
}

/**
 * Branded dark “calendar card” chrome around real booking content (e.g. iframe).
 * Does not style third-party iframe internals (cross-origin).
 */
function BookingCalendarShell({
  children,
  durationMinutes = 15,
  eventTitle = 'Intro with Captive Demand',
  description = 'A quick chat about your needs and how Captive Demand can help grow your business.',
  timezoneLabel = 'America/Chicago',
  className = '',
}: BookingCalendarShellProps) {
  return (
    <div
      className={`flex w-full max-w-full flex-col overflow-hidden rounded-3xl bg-[#1a1512] p-4 text-white shadow-2xl ring-1 ring-black/20 sm:p-6 md:p-8 ${className}`}
    >
      <div className="flex shrink-0 flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10">
            <Image
              src="/spencer-donaldson.jpg"
              alt="Spencer Donaldson"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wide text-white/60">Captive Demand</p>
            <h3 className="text-base font-semibold text-white">{eventTitle}</h3>
            <p className="mt-1 text-pretty text-xs leading-relaxed text-white/50">{description}</p>
          </div>
        </div>
        <ul className="flex shrink-0 flex-wrap gap-x-4 gap-y-2 text-xs text-white/70 sm:justify-end">
          <li className="flex items-center gap-1.5">
            <Clock size={14} strokeWidth={1.5} className="shrink-0 text-white/40" aria-hidden />
            <span>{durationMinutes}m</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Video size={14} strokeWidth={1.5} className="shrink-0 text-white/40" aria-hidden />
            <span>Google Meet</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Globe size={14} strokeWidth={1.5} className="shrink-0 text-white/40" aria-hidden />
            <span>{timezoneLabel}</span>
          </li>
        </ul>
      </div>
      <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-[#0f0d0b] ring-1 ring-white/10">
        <div className="relative min-h-[min(42vh,320px)] w-full flex-1 sm:min-h-[min(44vh,380px)]">
          {children}
        </div>
      </div>
    </div>
  );
}

export { BookingCalendarShell };
export default BookingCalendarShell;
