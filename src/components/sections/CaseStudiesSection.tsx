"use client";

import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper Shapes - Decorative shape with extending line
const DecorativeShapeWithLine = ({ shapeColor = "#e5e5e5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
  <div className="flex items-end w-full">
    {/* Angled shape */}
    <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
      <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
    </svg>
    {/* Extending line - bottom aligned */}
    <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
  </div>
);



// Types
type Stat = {
  value: string;
  label: string;
  suffix?: string;
};

type CaseStudy = {
  id: number;
  client: string;
  clientLogo?: string;
  year: string;
  headline: string;
  stats: Stat[];
  image: string;
};

// Case Study Card Component with cursor-following button
const CaseStudyCard = ({ study, index }: { study: CaseStudy; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden shadow-lg group cursor-pointer rounded-2xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Container for both panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[500px]">
        
        {/* Left Side - Content */}
        <div className="bg-[#e8e8e8] p-8 md:p-12 flex flex-col justify-between">
          {/* Top Row - Logo and Year */}
          <div className="flex items-start justify-between mb-8">
            {study.clientLogo ? (
              <div className="h-8 relative">
                <Image
                  src={study.clientLogo}
                  alt={study.client}
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain opacity-60"
                  style={{ filter: 'grayscale(100%) brightness(0.4)' }}
                />
              </div>
            ) : (
              <span className="font-mono text-lg font-bold text-[#1a1512]/60 uppercase tracking-wider">
                {study.client}
              </span>
            )}
            <span className="font-mono text-sm text-[#1a1512]/40 tracking-wider">
              /{study.year}
            </span>
          </div>

          {/* Headline */}
          <div className="flex-1 flex items-center">
            <h3 
              className="text-2xl md:text-3xl lg:text-4xl text-[#1a1512] leading-tight"
              style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
            >
              {study.headline}
            </h3>
          </div>

          {/* Stats */}
          <div className="mt-8">
            {/* Divider shape with extending line */}
            <div className="mb-8">
              <DecorativeShapeWithLine shapeColor="#d5d5d5" lineColor="#d5d5d5" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {study.stats.map((stat, statIndex) => (
                <div key={statIndex} className="flex flex-col">
                  <span 
                    className="text-2xl md:text-3xl lg:text-4xl text-[#1a1512] mb-2"
                    style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                  >
                    {stat.value}
                    {stat.suffix && <span className="text-lg md:text-xl">{stat.suffix}</span>}
                  </span>
                  <span className="font-mono text-[10px] md:text-xs text-[#1a1512]/50 uppercase tracking-wider leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Full Cover Image */}
        <div className="relative overflow-hidden">
          {/* Full Cover Image */}
          <Image
            src={study.image}
            alt={study.headline}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
      
      {/* Hover Button - Positioned below/right of cursor with line pointing to cursor */}
      <div 
        className="absolute pointer-events-none z-20 transition-opacity duration-200"
        style={{
          left: mousePos.x + 40,
          top: mousePos.y + 60,
          opacity: isHovering ? 1 : 0,
        }}
      >
        <div className="relative">
          {/* Line from top-left of button to cursor position (dot) */}
          <svg 
            className="absolute"
            style={{
              left: 0,
              top: 0,
              overflow: 'visible'
            }}
            width="10" 
            height="10"
          >
            {/* Diagonal line from button corner to cursor */}
            <line x1="0" y1="0" x2="-40" y2="-60" stroke="#ff5501" strokeWidth="1.5" />
            {/* Dot at cursor position */}
            <rect x="-44" y="-64" width="8" height="8" fill="#ff5501" />
          </svg>
          
          {/* Button */}
          <div className="flex items-center gap-4 bg-[#1a1512] text-[#ff5501] px-6 py-3 border border-[#ff5501]/50 whitespace-nowrap">
            <span className="font-mono text-sm uppercase tracking-[0.2em]">Learn More</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Data - You can update these with real case studies
const caseStudies: CaseStudy[] = [
  {
    id: 1,
    client: "Kana",
    clientLogo: "/logos/Kana.svg",
    year: "2025",
    headline: "AI-Powered SaaS Platform for Healthcare Compliance",
    stats: [
      { value: "34%", label: "INCREASE IN REVENUE" },
      { value: "9x", label: "ORGANIC TRAFFIC" },
      { value: "$2.1M", label: "ANNUAL REVENUE" }
    ],
    image: "/mockup3.png"
  },
  {
    id: 2,
    client: "Dubsy",
    clientLogo: "/logos/dubsy.svg",
    year: "2025",
    headline: "Mobile App Landing Page for AI Karaoke Platform",
    stats: [
      { value: "50K+", label: "APP DOWNLOADS" },
      { value: "4.8", label: "APP STORE RATING", suffix: "★" },
      { value: "12x", label: "USER ENGAGEMENT" }
    ],
    image: "/mockup4.png"
  }
];

// Component
export function CaseStudiesSection() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    // Scramble animation for label
    if (labelRef.current) {
      const originalText = "CASE STUDIES";
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      
      gsap.to({}, {
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: labelRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        onUpdate: function() {
          const progress = this.progress();
          let result = "";
          for (let i = 0; i < originalText.length; i++) {
            if (originalText[i] === " ") {
              result += " ";
            } else if (progress > i / originalText.length) {
              result += originalText[i];
            } else {
              result += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          if (labelRef.current) {
            labelRef.current.textContent = "/ " + result;
          }
        },
        onComplete: function() {
          if (labelRef.current) {
            labelRef.current.textContent = "/ CASE STUDIES";
          }
        }
      });
    }
  }, []);

  return (
    <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          {/* Decorative shape with extending line - full width */}
          <div className="mb-6 w-full">
            <DecorativeShapeWithLine shapeColor="#d5d5d5" lineColor="#e5e5e5" />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            
            {/* Label */}
            <span 
              ref={labelRef}
              className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4"
            >
              / CASE STUDIES
            </span>
            
            {/* Main Heading */}
            <h2 
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512]"
              style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
            >
              Latest works
            </h2>
          </div>
          
          {/* CTA Button */}
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-[#1a1512]/10 rounded-lg hover:border-[#1a1512]/30 transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-mono text-sm text-[#1a1512] tracking-wide">More case studies</span>
            <div className="w-8 h-8 rounded border border-[#1a1512]/10 flex items-center justify-center group-hover:bg-[#1a1512] group-hover:border-[#1a1512] transition-colors">
              <ArrowUpRight className="w-4 h-4 text-[#1a1512] group-hover:text-white transition-colors" strokeWidth={1.5} />
            </div>
          </motion.a>
          </div>
        </div>

        {/* Case Study Cards */}
        <div className="flex flex-col gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
