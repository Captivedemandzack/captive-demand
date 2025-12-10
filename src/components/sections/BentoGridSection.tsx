"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, Shield, Zap, Search, TrendingUp, BarChart2, BarChart3, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BentoGridSection() {
  const servicesLabelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!servicesLabelRef.current) return;

    const element = servicesLabelRef.current;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
    const originalText = element.textContent || '';

    // Wrap each character
    const wrappedText = originalText.split('').map((char, i) =>
      `<span class="char" data-char="${char}" data-index="${i}">${char}</span>`
    ).join('');

    element.innerHTML = wrappedText;
    const charElements = element.querySelectorAll('.char');

    const state = { progress: 0 };

    gsap.to(state, {
      progress: 1,
      duration: 1.5,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 100%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        charElements.forEach((charEl, index) => {
          const char = charEl as HTMLElement;
          const originalChar = char.getAttribute('data-char') || '';

          if (originalChar === ' ' || originalChar === '/') {
            char.textContent = originalChar;
            return;
          }

          const charProgress = Math.max(0, Math.min(1, (state.progress * 1.5) - (index / charElements.length) * 0.5));

          if (charProgress >= 0.8) {
            char.textContent = originalChar;
          } else {
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            char.textContent = randomChar;
          }
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="w-full min-h-screen bg-[#FAFAFA] text-[#1a1512] py-20 md:py-32 font-sans">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8 h-px"
        >
          {/* Horizontal Line */}
          <div className="relative h-px w-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              className="absolute left-0 h-px bg-[#e5e5e5]"
            />
          </div>

          {/* SVG Decorative Shape */}
          <svg
            className="absolute bottom-0 left-0 flex-shrink-0"
            width="80"
            height="8"
            viewBox="0 0 80 8"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 7 L0 0 L68 0 L80 7 L80 8 L0 8 Z"
              fill="#e5e5e5"
            />
          </svg>
        </motion.div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 mb-6">
          <span className="text-sm font-normal text-[#1a1512]">/</span>
          <span
            ref={servicesLabelRef}
            className="text-sm font-normal tracking-[0.02em] text-[#1a1512] uppercase"
            style={{ fontFamily: '"Roboto Mono", monospace' }}
          >
            OUR SERVICES
          </span>
        </div>

        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12 mb-16">
          {/* Left Side - Heading */}
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-4xl lg:text-5xl tracking-wide text-[#1a1512]"
              style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300, letterSpacing: '0.05em' }}
            >
              Everything you need. Nothing you don't.
            </motion.h2>
          </div>

          {/* Right Side - Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex-1 md:max-w-xl"
          >
            <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed uppercase tracking-wide">
              Stop piecing your company together with isolated vendors. We align your design, tech, and traffic into one synchronized system. Every component on this list is chosen because it amplifies the others and drives hard revenue.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid - 2 Equal Cards on Top, 3 Equal Cards on Bottom */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-8">

          {/* Card 1 - Web Design & Development (Top Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-[#e8e8e8] rounded-3xl p-6 md:p-8 shadow-lg border border-[#1a1512]/5 hover:shadow-xl transition-shadow col-span-2 md:col-span-3 max-h-[400px] overflow-hidden group"
          >
            <div className="mb-6">
              <h3 className="text-[16px] font-normal text-[#1a1512] mb-3 uppercase" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}>Website Design & Development</h3>
              <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed uppercase tracking-wide">
                <b>The Closer.</b> We don't build digital brochures. We build sites that do one job: turn strangers into customers. If it doesn't convert, we don't ship it.
              </p>
            </div>

            {/* Web Design Graphic - Arc Stack */}
            <div className="relative w-full h-48 flex items-center justify-center overflow-visible">
              <div className="relative w-full max-w-md h-40">

                {/* Browser Window 1 - Far Left */}
                <div className="absolute -left-4 top-10 w-52 bg-[#1E2025] border border-white/10 rounded-lg shadow-2xl transform -rotate-[20deg] opacity-50 transition-all duration-500 group-hover:-rotate-[28deg] group-hover:-translate-x-4 overflow-hidden">
                  <div className="flex items-center gap-1 px-2 py-1.5 bg-[#16181C] border-b border-white/5">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/30" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                      <div className="w-2 h-2 rounded-full bg-green-500/30" />
                    </div>
                  </div>
                  <div className="relative w-full h-32 overflow-hidden">
                    <Image
                      src="/goodmanors.png"
                      alt="Website Example"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Browser Window 2 - Left */}
                <div className="absolute left-12 top-4 w-52 bg-[#1E2025] border border-white/10 rounded-lg shadow-2xl transform -rotate-[10deg] opacity-70 transition-all duration-500 group-hover:-rotate-[14deg] group-hover:-translate-x-2 overflow-hidden z-10">
                  <div className="flex items-center gap-1 px-2 py-1.5 bg-[#16181C] border-b border-white/5">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/30" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                      <div className="w-2 h-2 rounded-full bg-green-500/30" />
                    </div>
                  </div>
                  <div className="relative w-full h-32 overflow-hidden">
                    <Image
                      src="/Firstfuture.png"
                      alt="Website Example"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Browser Window 3 - Center (Main) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-52 bg-[#1E2025] border border-white/15 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-105 group-hover:border-[#ff5501]/30 overflow-hidden z-20">
                  <div className="flex items-center justify-between px-2 py-1.5 bg-[#16181C] border-b border-white/5">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/40" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                      <div className="w-2 h-2 rounded-full bg-green-500/40" />
                    </div>
                    <div className="flex-1 mx-2 h-4 bg-white/5 rounded flex items-center px-1.5">
                      <div className="text-[7px] text-white/40">captivedemand.com</div>
                    </div>
                  </div>
                  <div className="relative w-full h-32 overflow-hidden">
                    <Image
                      src="/Brooks Banking Hero  copy.png"
                      alt="Brooks Banking Website"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Browser Window 4 - Right */}
                <div className="absolute right-12 top-4 w-52 bg-[#1E2025] border border-white/10 rounded-lg shadow-2xl transform rotate-[10deg] opacity-70 transition-all duration-500 group-hover:rotate-[14deg] group-hover:translate-x-2 overflow-hidden z-10">
                  <div className="flex items-center gap-1 px-2 py-1.5 bg-[#16181C] border-b border-white/5">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/30" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                      <div className="w-2 h-2 rounded-full bg-green-500/30" />
                    </div>
                  </div>
                  <div className="relative w-full h-32 overflow-hidden">
                    <Image
                      src="/Symmetri.png"
                      alt="Website Example"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Browser Window 5 - Far Right */}
                <div className="absolute -right-4 top-10 w-52 bg-[#1E2025] border border-white/10 rounded-lg shadow-2xl transform rotate-[20deg] opacity-50 transition-all duration-500 group-hover:rotate-[28deg] group-hover:translate-x-4 overflow-hidden">
                  <div className="flex items-center gap-1 px-2 py-1.5 bg-[#16181C] border-b border-white/5">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/30" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                      <div className="w-2 h-2 rounded-full bg-green-500/30" />
                    </div>
                  </div>
                  <div className="relative w-full h-32 overflow-hidden">
                    <Image
                      src="/theskinreal.png"
                      alt="Website Example"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Card 2 - Email Marketing (Top Right) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#e8e8e8] rounded-3xl p-6 md:p-8 shadow-lg border border-[#1a1512]/5 hover:shadow-xl transition-shadow col-span-2 md:col-span-3 max-h-[400px] overflow-hidden group"
          >
            <div className="mb-6">
              <h3 className="text-[16px] font-normal text-[#1a1512] mb-3 uppercase" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}>Email Marketing</h3>
              <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed uppercase tracking-wide">
                <b>The Follow-Up.</b> 98% of people leave your site without buying. We build the automated emails that chase them down and bring them back until they do.
              </p>
            </div>

            {/* Email Marketing Graphic */}
            <div className="relative w-full h-52 flex items-center justify-center">
              {/* Background radial glow */}
              <div className="absolute w-32 h-32 bg-[#ff5501]/10 blur-[50px] rounded-full" />

              {/* Main Container */}
              <div className="relative w-full max-w-md h-44">

                {/* Card 1: Analytics Dashboard (Back Left - Symmetrical) */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-32 h-32 bg-white border border-[#1a1512]/10 rounded-xl p-3 transform -rotate-3 opacity-80 scale-95 transition-all duration-500 group-hover:-translate-x-8 group-hover:-rotate-6 group-hover:opacity-95 overflow-hidden z-0 shadow-lg">
                  <div className="text-[10px] text-[#1a1512] mb-2 font-semibold">Email Performance</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] text-[#1a1512]/60">Open Rate</span>
                      <span className="text-[10px] text-[#ff5501] font-semibold">42.3%</span>
                    </div>
                    <div className="h-1 w-full bg-[#1a1512]/5 rounded-full overflow-hidden">
                      <div className="h-full w-[42%] bg-[#ff5501]/50 rounded-full" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] text-[#1a1512]/60">Click Rate</span>
                      <span className="text-[10px] text-[#8b5cf6] font-semibold">28.1%</span>
                    </div>
                    <div className="h-1 w-full bg-[#1a1512]/5 rounded-full overflow-hidden">
                      <div className="h-full w-[28%] bg-[#8b5cf6]/50 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Card 2: Campaign Status (Back Right - Symmetrical) */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-32 h-32 bg-white border border-[#1a1512]/10 rounded-xl p-3 transform rotate-3 opacity-80 scale-95 transition-all duration-500 group-hover:translate-x-8 group-hover:rotate-6 group-hover:opacity-95 overflow-hidden z-0 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#ff5501] animate-pulse" />
                    <span className="text-[9px] text-[#1a1512] font-semibold">Campaign Active</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[8px] text-[#1a1512]/60">Sent</span>
                      <span className="text-[9px] text-[#1a1512]/90">12,451</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[8px] text-[#1a1512]/60">Delivered</span>
                      <span className="text-[9px] text-[#ff5501]">11,892</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[8px] text-[#1a1512]/60">Revenue</span>
                      <span className="text-[9px] text-[#ff5501]">$8,421</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Email Example (Front Center - Scrolling Window) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-44 bg-white border border-[#1a1512]/10 rounded-xl shadow-2xl overflow-hidden z-20 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                  {/* Email Client Header */}
                  <div className="bg-[#f8f9fa] border-b border-[#1a1512]/10 px-3 py-1.5 relative z-10">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[8px] text-[#1a1512]/40 font-medium">From:</span>
                      <span className="text-[8px] text-[#1a1512]/70">info@farmulated.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] text-[#1a1512]/40 font-medium">Subject:</span>
                      <span className="text-[8px] text-[#1a1512]/70 truncate">Claim Your 30% Off Before Time Runs Out!</span>
                    </div>
                  </div>

                  {/* Email Content - Hover Scroll Window */}
                  <div className="relative w-full h-[calc(100%-42px)] overflow-hidden">
                    <motion.div
                      className="relative w-full"
                      initial={{ y: 0 }}
                      whileHover={{ y: -120 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut"
                      }}
                    >
                      <div className="relative w-full aspect-[9/16]">
                        <Image
                          src="/emailexample.png"
                          alt="Email Marketing Example"
                          fill
                          className="object-contain object-top"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Software Development (Orange - Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-[#ff5501] rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow col-span-2 md:col-span-2 group"
          >
            <div className="mb-6">
              <h4 className="text-[16px] font-normal text-white mb-3 uppercase" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}>
                Software Development
              </h4>
              <p className="font-mono text-sm text-white/80 leading-relaxed uppercase tracking-wide">
                <b>The Custom Edge.</b> You can’t beat your competitors if you use the exact same tools as them. We build the custom tech that gives you an unfair advantage.
              </p>
            </div>

            {/* Software Dev Graphic */}
            <div className="w-full h-full flex items-start justify-center relative px-6 pt-4">

              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ff5501]/5 blur-[60px] rounded-full pointer-events-none" />

              {/* Composition Container */}
              <div className="relative w-[300px] h-[130px]">

                {/* LAYER 1: BACKGROUND DASHBOARD UI */}
                <div className="absolute bottom-2 left-2 w-[190px] h-[105px] bg-[#16181C] rounded-xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_25px_50px_-12px_rgba(255,85,1,0.15)] z-0">

                  {/* Dashboard Header */}
                  <div className="p-3 border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-[#ff5501]/10">
                        <BarChart3 size={12} className="text-[#ff5501]" />
                      </div>
                      <span className="text-[10px] font-medium text-white/80">Analytics</span>
                    </div>

                    {/* Deploy Success Badge */}
                    <div className="flex items-center gap-1 bg-[#ff5501]/10 border border-[#ff5501]/20 px-1.5 py-0.5 rounded-full">
                      <CheckCircle2 size={8} className="text-[#ff5501]" />
                      <span className="text-[8px] font-bold text-[#ff5501]">Deploy Success</span>
                    </div>
                  </div>

                  {/* Dashboard Content - Chart */}
                  <div className="flex-1 p-4 flex items-end justify-between gap-2">
                    {/* Bar 1 */}
                    <div className="w-full bg-white/5 rounded-t-sm h-[40%] relative overflow-hidden">
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-[#ff5501]/80"
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                      />
                    </div>
                    {/* Bar 2 */}
                    <div className="w-full bg-white/5 rounded-t-sm h-[65%] relative overflow-hidden">
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-[#ff5501]/80"
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                      />
                    </div>
                    {/* Bar 3 */}
                    <div className="w-full bg-white/5 rounded-t-sm h-[50%] relative overflow-hidden">
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-[#ff5501]/80"
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                      />
                    </div>
                    {/* Bar 4 */}
                    <div className="w-full bg-white/5 rounded-t-sm h-[85%] relative overflow-hidden">
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-[#ff5501]/80"
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                      />
                    </div>
                    {/* Bar 5 */}
                    <div className="w-full bg-white/5 rounded-t-sm h-[60%] relative overflow-hidden">
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-[#ff5501]/80"
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                      />
                    </div>
                  </div>

                </div>

                {/* LAYER 2: FOREGROUND CODE EDITOR */}
                <div className="absolute top-0 right-0 w-[185px] h-[100px] bg-[#0F1115] rounded-lg border border-white/5 shadow-2xl overflow-hidden transform transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-1 group-hover:rotate-1 z-20">

                  {/* Editor Header */}
                  <div className="h-5 bg-white/5 border-b border-white/5 flex items-center px-2 space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  </div>

                  {/* Code Content */}
                  <div className="p-2 font-mono text-[8px] leading-relaxed text-white/70">
                    <div className="flex"><span className="text-[#8b5cf6] mr-1">return</span> (</div>
                    <div className="pl-2 text-white/60">
                      {'<'}DashboardLayout{'>'}
                    </div>
                    <div className="pl-3 text-white/60">
                      {'<'}Analytics <span className="text-[#ff5501]">data</span>={'{'}...{'}'} /{'>'}
                    </div>
                    <div className="pl-3 text-white/60">
                      {'<'}StatusBadge /{'>'}
                    </div>
                    <div className="pl-2 text-white/60">
                      {'<'}/DashboardLayout{'>'}
                    </div>
                    <div className="flex">);</div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Card 4 - SEO Services (No Background - Bottom Center) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-start col-span-2 md:col-span-2 group"
          >
            <div className="bg-[#e8e8e8] rounded-3xl p-6 mb-6 w-full aspect-video flex items-center justify-center overflow-hidden">
              {/* SEO Graphic */}
              <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">

                {/* Search Bar Abstract */}
                <div className="w-56 h-10 bg-[#1a1512] rounded-full border border-[#1a1512]/20 flex items-center px-4 gap-3 shadow-lg relative z-20 group-hover:border-[#1a1512]/40 transition-colors">
                  <Search size={14} className="text-white/60" />
                  <div className="h-1.5 w-24 bg-white/20 rounded-full overflow-hidden relative">
                    {/* Typing animation effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>

                {/* Ranking List / Chart */}
                <div className="w-56 bg-white border border-[#1a1512]/10 rounded-xl p-3 shadow-xl relative z-10 flex flex-col gap-2">

                  {/* Item 1 - The Winner */}
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-[#ff5501]/10 border border-[#ff5501]/20 transition-all duration-500 group-hover:translate-x-1 group-hover:bg-[#ff5501]/20 group-hover:border-[#ff5501]/40">
                    <div className="text-[10px] font-bold text-[#ff5501]">#1</div>
                    <div className="flex-1 h-1.5 bg-[#ff5501]/30 rounded-full" />
                    <TrendingUp size={12} className="text-[#ff5501]" />
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-3 p-2 rounded-lg border border-transparent opacity-60">
                    <div className="text-[10px] font-bold text-[#1a1512]/40">#2</div>
                    <div className="flex-1 h-1.5 bg-[#1a1512]/10 rounded-full" />
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center gap-3 p-2 rounded-lg border border-transparent opacity-40">
                    <div className="text-[10px] font-bold text-[#1a1512]/30">#3</div>
                    <div className="flex-1 h-1.5 bg-[#1a1512]/10 rounded-full" />
                  </div>
                </div>

              </div>
            </div>

            <h4 className="text-[16px] font-normal text-[#1a1512] mb-2 uppercase" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}>
              SEO/AEO
            </h4>
            <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed uppercase tracking-wide">
              <b>The Compounder.</b> Paid ads are a treadmill. You have to keep spending to keep moving. We build an organic search strategy that gains momentum over time. We build the infrastructure. You collect the dividends.
            </p>
          </motion.div>

          {/* Card 5 - Workflow Automation (No Background - Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-start col-span-2 md:col-span-2"
          >
            <div className="bg-[#e8e8e8] rounded-3xl p-6 mb-6 w-full aspect-video flex items-center justify-center overflow-hidden">
              <div className="grid grid-cols-3 gap-2 max-w-sm">
                {/* Gmail */}
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md p-3">
                  <Image
                    src="/512px-Gmail_icon_(2020).svg.png"
                    alt="Gmail"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                {/* Slack */}
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md p-3">
                  <Image
                    src="/Slack_icon_2019.svg.png"
                    alt="Slack"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                {/* Notion */}
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md p-3">
                  <Image
                    src="/notion-icon.png"
                    alt="Notion"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                {/* Airtable */}
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md p-3">
                  <Image
                    src="/airtable.png"
                    alt="Airtable"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                {/* HubSpot */}
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md p-3">
                  <Image
                    src="/hubspot.png"
                    alt="HubSpot"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                {/* Google Analytics */}
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md p-3">
                  <Image
                    src="/Google-Analytics-logo-01.png"
                    alt="Google Analytics"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <h4 className="text-[16px] font-normal text-[#1a1512] mb-2 uppercase" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}>
              Workflow Automation
            </h4>
            <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed uppercase tracking-wide">
              <b>The Time Saver.</b> Stop copy-pasting data between spreadsheets. We wire your apps together to handle the busy work so you can get back to actual business.
            </p>
          </motion.div>

        </div>
      </div >
    </section >
  );
}

