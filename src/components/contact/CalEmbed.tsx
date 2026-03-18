'use client';

import React from 'react';
import Image from 'next/image';
import { Clock, Video, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

/** Booking calendar UI component — shown in the "Book a call" tab on contact page */
function BookingCalendar() {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const calendarDays = [
    { day: null }, { day: 1 }, { day: 2 }, { day: 3, available: true, selected: true }, { day: 4, available: true }, { day: 5 }, { day: 6 },
    { day: 7 }, { day: 8, available: true }, { day: 9, available: true }, { day: 10, available: true }, { day: 11, available: true }, { day: 12 }, { day: 13 },
    { day: 14 }, { day: 15, available: true }, { day: 16, available: true }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 },
    { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 },
    { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 }, { day: null }, { day: null }, { day: null },
  ];
  const timeSlots = ['10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm'];

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
      <div className="bg-[#1a1512] rounded-2xl p-6 text-white shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 md:gap-0">
          {/* Left: Info & Calendar */}
          <div className="flex-1 md:pr-6 flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 relative flex-shrink-0">
                  <Image src="/spencer-donaldson.jpg" alt="Spencer Donaldson" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-white/60 text-[10px] font-medium tracking-wide uppercase mb-0.5">Captive Demand</p>
                  <h3 className="text-base font-semibold text-white">Intro with Captive Demand</h3>
                </div>
              </div>
              <p className="text-white/50 text-xs leading-relaxed mb-4">
                A quick chat about your needs and how Captive Demand can help grow your business.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <Clock size={14} strokeWidth={1.5} className="text-white/40" />
                  <span>20m</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <Video size={14} strokeWidth={1.5} className="text-white/40" />
                  <span>Google Meet</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <Globe size={14} strokeWidth={1.5} className="text-white/40" />
                  <span>America/Chicago</span>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">
                  {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h4>
                <div className="flex items-center gap-1">
                  <button type="button" className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-white transition-colors">
                    <ChevronLeft size={14} />
                  </button>
                  <button type="button" className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-white transition-colors">
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 mb-1">
                {days.map((day) => (
                  <div key={day} className="text-center text-[9px] text-white/30 font-medium py-1">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-0.5 gap-x-0.5">
                {calendarDays.map((item, index) => (
                  <div key={index} className="aspect-square flex items-center justify-center">
                    {item.day && (
                      <button
                        type="button"
                        className={`
                          w-7 h-7 rounded-full text-xs font-medium transition-all flex items-center justify-center
                          ${item.selected ? 'bg-white text-[#1a1512]' : item.available ? 'bg-[#2a2522] text-white hover:bg-[#3a3532]' : 'text-white/20 cursor-default'}
                        `}
                        disabled={!item.available}
                      >
                        {item.day}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right: Time slots */}
          <div className="flex-1 md:border-l border-white/10 md:pl-6 flex flex-col">
            <div className="flex items-center justify-between mb-4 pt-1">
              <span className="text-white font-medium text-sm">Thu 11</span>
              <div className="flex bg-[#2a2522] rounded-md p-0.5 text-[10px]">
                <button type="button" className="px-2.5 py-1 rounded bg-[#3a3532] text-white font-medium">12h</button>
                <button type="button" className="px-2.5 py-1 rounded text-white/40 hover:text-white transition-colors">24h</button>
              </div>
            </div>
            <div className="space-y-2">
              {timeSlots.map((time, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-full text-center py-3 rounded-lg border border-white/10 text-white font-medium text-xs bg-transparent hover:border-white/40 hover:bg-white/5 transition-all duration-200 active:scale-[0.98]"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="font-mono text-[11px] text-[#666] text-center">
        Prefer email?{' '}
        <a href="mailto:hello@captivedemand.com?subject=Schedule%20Strategy%20Call" className="text-[#E8480C] hover:underline">
          hello@captivedemand.com
        </a>
      </p>
    </div>
  );
}

export function CalEmbed() {
  return <BookingCalendar />;
}
