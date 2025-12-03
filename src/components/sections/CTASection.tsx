"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, Video, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

// Calendar Component
const BookingCalendar = () => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  // December 2025 calendar data
  const calendarDays = [
    { day: null }, { day: 1 }, { day: 2 }, { day: 3, available: true, selected: true }, { day: 4, available: true }, { day: 5 }, { day: 6 },
    { day: 7 }, { day: 8, available: true }, { day: 9, available: true }, { day: 10, available: true }, { day: 11, available: true }, { day: 12 }, { day: 13 },
    { day: 14 }, { day: 15, available: true }, { day: 16, available: true }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 },
    { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 },
    { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 }, { day: null }, { day: null }, { day: null }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-[#1a1512] rounded-3xl p-8 text-white max-w-md w-full"
    >
      {/* Header */}
      <div className="mb-6">
        {/* Logo */}
        <div className="w-10 h-10 bg-[#ff5501] rounded-lg flex items-center justify-center mb-4">
          <span className="text-white font-bold text-lg">CD</span>
        </div>
        <p className="text-white/60 text-sm mb-1">Captive Demand</p>
        <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Nohemi, sans-serif' }}>
          Intro with Captive Demand
        </h3>
        <p className="text-white/50 text-sm leading-relaxed">
          A quick chat about your needs and how Captive Demand can help grow your business.
        </p>
      </div>

      {/* Meeting Details */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3 text-white/70 text-sm">
          <Clock size={16} strokeWidth={1.5} />
          <span>20m</span>
        </div>
        <div className="flex items-center gap-3 text-white/70 text-sm">
          <Video size={16} strokeWidth={1.5} />
          <span>Google Meet</span>
        </div>
        <div className="flex items-center gap-3 text-white/70 text-sm">
          <Globe size={16} strokeWidth={1.5} />
          <span>America/Chicago</span>
          <ChevronRight size={14} className="ml-auto" />
        </div>
      </div>

      {/* Calendar */}
      <div>
        {/* Month Header */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg">
            <span className="font-semibold">December</span>{' '}
            <span className="text-white/50">2025</span>
          </h4>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map((day) => (
            <div key={day} className="text-center text-[10px] text-white/40 font-mono tracking-wider py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((item, index) => (
            <div key={index} className="aspect-square flex items-center justify-center">
              {item.day && (
                <button 
                  className={`
                    w-full h-full rounded-lg text-sm font-medium transition-all
                    ${item.selected 
                      ? 'bg-white text-[#1a1512] ring-2 ring-white' 
                      : item.available 
                        ? 'bg-white/10 text-white hover:bg-white/20' 
                        : 'text-white/30 cursor-default'
                    }
                  `}
                  disabled={!item.available}
                >
                  {item.day}
                  {item.selected && <span className="block w-1 h-1 bg-[#1a1512] rounded-full mx-auto mt-0.5" />}
                </button>
              )}
            </div>
          ))}
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
    className="bg-white rounded-2xl p-6 shadow-lg max-w-md"
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
  return (
    <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side - CTA Text */}
          <div>
            {/* Ready Set Go */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl leading-[1.1]" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                <span className="block text-[#d5d5d5] italic font-light">Ready.</span>
                <span className="block text-[#ff5501] italic font-light">Set.</span>
                <span className="block text-[#1a1512] font-semibold not-italic">Go.</span>
              </h2>
            </motion.div>

            {/* Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-2xl md:text-3xl text-[#1a1512]/60 leading-relaxed" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}>
                Time to{' '}
                <span className="text-[#ff5501]">Captivate</span>
                <br />
                the market.
              </p>
            </motion.div>

            {/* Testimonial */}
            <TestimonialCard />
          </div>

          {/* Right Side - Booking Calendar */}
          <div className="flex justify-center lg:justify-end">
            <BookingCalendar />
          </div>

        </div>
      </div>
    </section>
  );
}

