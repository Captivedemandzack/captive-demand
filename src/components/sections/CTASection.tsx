"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Clock, Video, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

// Calendar Component
const BookingCalendar = () => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const calendarDays = [
    { day: null }, { day: 1 }, { day: 2 }, { day: 3, available: true, selected: true }, { day: 4, available: true }, { day: 5 }, { day: 6 },
    { day: 7 }, { day: 8, available: true }, { day: 9, available: true }, { day: 10, available: true }, { day: 11, available: true }, { day: 12 }, { day: 13 },
    { day: 14 }, { day: 15, available: true }, { day: 16, available: true }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 },
    { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 },
    { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 }, { day: null }, { day: null }, { day: null }
  ];

  // 6 relevant business hours
  const timeSlots = [
    "10:00am", "11:00am", "12:00pm",
    "1:00pm", "2:00pm", "3:00pm"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-[#1a1512] rounded-3xl p-6 md:p-8 text-white w-full max-w-4xl shadow-2xl overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-0">

        {/* LEFT COLUMN: Info & Calendar Grid */}
        <div className="flex-1 md:pr-8 flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 relative">
                <Image
                  src="/spencer-donaldson.jpg"
                  alt="Spencer Donaldson"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-white/60 text-xs font-medium tracking-wide uppercase mb-0.5">Captive Demand</p>
                <h3 className="text-lg font-semibold text-white">Intro with Captive Demand</h3>
              </div>
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-6">
              A quick chat about your needs and how Captive Demand can help grow your business.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <Clock size={16} strokeWidth={1.5} className="text-white/40" />
                <span>20m</span>
              </div>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <Video size={16} strokeWidth={1.5} className="text-white/40" />
                <span>Google Meet</span>
              </div>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <Globe size={16} strokeWidth={1.5} className="text-white/40" />
                <span>America/Chicago</span>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-medium">December 2025</h4>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 flex items-center justify-center text-white/30 hover:text-white transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-7 h-7 flex items-center justify-center text-white/30 hover:text-white transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {days.map((day) => (
                <div key={day} className="text-center text-[10px] text-white/30 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1 gap-x-1">
              {calendarDays.map((item, index) => (
                <div key={index} className="aspect-square flex items-center justify-center">
                  {item.day && (
                    <button
                      className={`
                        w-8 h-8 md:w-9 md:h-9 rounded-full text-sm font-medium transition-all relative flex items-center justify-center
                        ${item.selected
                          ? 'bg-white text-[#1a1512]'
                          : item.available
                            ? 'bg-[#2a2522] text-white hover:bg-[#3a3532]'
                            : 'text-white/20 cursor-default'
                        }
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

        {/* RIGHT COLUMN: Time Slots (Simplified) */}
        <div className="flex-1 md:border-l border-white/10 md:pl-8 flex flex-col">

          <div className="flex items-center justify-between mb-6 pt-2">
            <span className="text-white font-medium">Thu 11</span>
            <div className="flex bg-[#2a2522] rounded-md p-1 text-xs">
              <button className="px-3 py-1.5 rounded bg-[#3a3532] text-white font-medium shadow-sm">12h</button>
              <button className="px-3 py-1.5 rounded text-white/40 hover:text-white transition-colors">24h</button>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            {timeSlots.map((time, i) => (
              <button
                key={i}
                className="w-full text-center py-3.5 rounded-xl border border-white/10 text-white font-medium 
                           bg-transparent hover:border-white/40 hover:bg-white/5
                           transition-all duration-200 active:scale-[0.98] text-sm"
              >
                {time}
              </button>
            ))}
          </div>

        </div>

      </div>
    </motion.div>
  );
};

// Testimonial Card
const TestimonialCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
    viewport={{ once: true }}
    className="bg-[#f6f5f6] border border-[#e8e8e8] rounded-2xl p-6 max-w-md"
  >
    <p className="text-[#1a1512]/80 text-sm leading-relaxed mb-6">
      Forward thinking, creative team with great chemistry. Ahead of the curve when it comes to the latest design trends! Would recommend for those who prioritise branding, UI and UX.
    </p>
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
        <Image
          src="/tricia.webp"
          alt="Tricia Restifo"
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <p className="font-semibold text-[#1a1512] text-sm">Tricia Restifo</p>
        <p className="text-[#1a1512]/50 text-xs">VP Finance, Farmulated</p>
      </div>
    </div>
  </motion.div>
);

// Main CTA Section
export function CTASection() {
  const containerRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0.8, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section ref={containerRef} className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4 overflow-hidden relative z-10">
      <motion.div style={{ y, scale, opacity }} className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start lg:items-center">

          {/* Left Side */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              {/* EDIT: Increased mobile size to text-3xl */}
              <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                <span className="text-[#d5d5d5] font-light block lg:inline-block mr-0 lg:mr-3 whitespace-nowrap">
                  Don't talk to a sales rep.
                </span>
                <span className="text-[#1a1512] font-light block lg:inline-block whitespace-nowrap">
                  Talk to a founder.
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p
                className="text-2xl md:text-3xl leading-snug"
                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
              >
                <span className="text-[#d5d5d5]">Time to </span>
                <span className="text-[#ff5501]">Captivate</span>
                <br />
                <span className="text-[#d5d5d5]">the market.</span>
              </p>
            </motion.div>

            <TestimonialCard />
          </div>

          {/* Right Side */}
          <div className="flex justify-center lg:justify-end w-full">
            <BookingCalendar />
          </div>

        </div>
      </motion.div>
    </section>
  );
}