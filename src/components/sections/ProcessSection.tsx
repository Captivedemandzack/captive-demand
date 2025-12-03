"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper Shapes
const DecorativeShapeWithLine = ({ shapeColor = "#e5e5e5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
  <div className="flex items-end w-full">
    <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
      <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
    </svg>
    <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
  </div>
);

// Button shapes (from Hero)
const CornerShape = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 48" className={className} style={{ display: 'block' }}>
    <path d="M0 0h5.63c7.808 0 13.536 7.337 11.642 14.91l-6.09 24.359A11.527 11.527 0 0 1 0 48V0Z" fill="currentColor" />
  </svg>
);

const IconBlobShape = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 48" className={className} style={{ display: 'block' }}>
    <path fill="currentColor" d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z" />
  </svg>
);

const ArrowIcon = ({ color = "currentColor", className = "" }: { color?: string; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 10" fill="none" className={className}>
    <path fill={color} d="M7.703 5.8H.398V4.6h7.305l-3.36-3.36.855-.84 4.8 4.8-4.8 4.8-.855-.84 3.36-3.36Z" />
  </svg>
);

// Hero-style Animated CTA Button - Light mode for orange card background
const BookCallButton = () => (
  <a href="#" className="group relative inline-flex items-center text-left cursor-pointer no-underline focus:outline-none" aria-label="Book a Call">
    {/* Label Container - Light background, dark text */}
    <span className="
        relative flex items-center h-12 pl-5 pr-2 mr-4
        bg-[#1a1512] text-white
        rounded-l-xl
        font-mono text-sm uppercase tracking-normal
        transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
        group-hover:bg-white group-hover:text-[#1a1512]
      ">
      <span className="z-10 relative">Book an intro call</span>

      {/* Decorative Corner that connects label to icon */}
      <div className="absolute top-0 right-[-16px] bottom-0 w-[18px] h-12 text-[#1a1512] group-hover:text-white transition-colors duration-300">
        <CornerShape className="w-full h-full" />
      </div>
    </span>

    {/* Icon Container */}
    <i className="
        relative block w-[51px] h-12 
        transform-gpu
        transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
      ">
      {/* Blob Shape Background - Light on normal, orange on hover */}
      <div className="absolute inset-0 z-0 text-white group-hover:text-[#ff5501] transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]">
        <IconBlobShape className="w-full h-full" />
      </div>

      {/* The Sliding Arrows Container */}
      <span className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">
        {/* Default Dark Arrow (Visible initially) */}
        <span className="
            absolute flex items-center justify-center w-full h-full
            transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            translate-x-0 group-hover:translate-x-[150%]
          ">
          <ArrowIcon color="#1a1512" className="w-5 h-5" />
        </span>
 
        {/* Hover White Arrow (Coming from left) */}
        <span className="
            absolute flex items-center justify-center w-full h-full
            transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            -translate-x-[150%] group-hover:translate-x-0
          ">
          <ArrowIcon color="#FFFFFF" className="w-5 h-5" />
        </span>
      </span>
    </i>
  </a>
);

// Website Wireframe UI - Far right and bottom edge
const WebsiteWireframe = () => (
  <div className="absolute bottom-0 right-0 w-full h-60 overflow-hidden pointer-events-none">
    <div className="absolute -right-4 -bottom-12 w-[320px] bg-white rounded-xl border border-[#1a1512]/10 overflow-hidden shadow-lg">
      {/* Browser bar */}
      <div className="bg-[#f5f5f5] px-3 py-2 flex items-center gap-2 border-b border-[#1a1512]/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1a1512]/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#1a1512]/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#1a1512]/10" />
        </div>
        <div className="flex-1 h-4 bg-[#1a1512]/5 rounded mx-4" />
      </div>
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Nav */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-3 bg-[#1a1512]/10 rounded" />
          <div className="flex gap-3">
            <div className="w-8 h-2 bg-[#1a1512]/5 rounded" />
            <div className="w-8 h-2 bg-[#1a1512]/5 rounded" />
            <div className="w-8 h-2 bg-[#1a1512]/5 rounded" />
          </div>
        </div>
        {/* Hero section */}
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <div className="w-3/4 h-4 bg-[#1a1512]/15 rounded" />
            <div className="w-full h-3 bg-[#1a1512]/10 rounded" />
            <div className="w-2/3 h-3 bg-[#1a1512]/10 rounded" />
            <div className="w-20 h-6 bg-[#ff5501]/30 rounded mt-3" />
          </div>
          <div className="w-24 h-20 bg-[#1a1512]/5 rounded" />
        </div>
        {/* Features */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="h-12 bg-[#1a1512]/5 rounded" />
          <div className="h-12 bg-[#1a1512]/5 rounded" />
          <div className="h-12 bg-[#1a1512]/5 rounded" />
        </div>
      </div>
    </div>
  </div>
);

// Proposal Wireframe UI - Far right and bottom edge
const ProposalWireframe = () => (
  <div className="absolute bottom-0 right-0 w-full h-60 overflow-hidden pointer-events-none">
    <div className="absolute -right-2 -bottom-16 w-[300px] bg-white rounded-xl border border-[#1a1512]/10 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-[#1a1512] px-4 py-3 flex items-center justify-between">
        <div className="w-20 h-3 bg-white/30 rounded" />
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>
      </div>
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="space-y-2 mb-4">
          <div className="w-1/2 h-4 bg-[#1a1512]/15 rounded" />
          <div className="w-3/4 h-2 bg-[#1a1512]/5 rounded" />
        </div>
        {/* Timeline */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-[#ff5501]/40" />
          <div className="flex-1 h-1 bg-[#1a1512]/10 rounded" />
          <div className="w-3 h-3 rounded-full bg-[#1a1512]/10" />
          <div className="flex-1 h-1 bg-[#1a1512]/10 rounded" />
          <div className="w-3 h-3 rounded-full bg-[#1a1512]/10" />
        </div>
        {/* Deliverables list */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Check size={12} className="text-[#ff5501]/60" />
            <div className="flex-1 h-2 bg-[#1a1512]/10 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <Check size={12} className="text-[#ff5501]/60" />
            <div className="flex-1 h-2 bg-[#1a1512]/10 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <Check size={12} className="text-[#ff5501]/60" />
            <div className="flex-1 h-2 bg-[#1a1512]/10 rounded" />
          </div>
        </div>
        {/* Price */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1a1512]/5">
          <div className="w-12 h-3 bg-[#1a1512]/10 rounded" />
          <div className="w-16 h-4 bg-[#1a1512]/20 rounded" />
        </div>
      </div>
    </div>
  </div>
);

// Process Step Card
const ProcessCard = ({ 
  timeline, 
  title, 
  description, 
  icon,
  hasButton,
  isOrange,
  wireframe,
  headshot,
  delay 
}: { 
  timeline: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  hasButton?: boolean;
  isOrange?: boolean;
  wireframe?: 'website' | 'proposal';
  headshot?: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className={`relative rounded-2xl p-6 md:p-8 border flex flex-col min-h-[420px] overflow-hidden ${
      isOrange 
        ? 'bg-[#ff5501] border-[#ff5501] text-white' 
        : 'bg-[#f6f5f6] border-[#1a1512]/5'
    }`}
  >
    {/* Timeline Badge + Headshot */}
    <div className="flex items-start justify-between mb-6">
      <span className={`font-mono text-xs uppercase tracking-wider ${
        isOrange ? 'text-white/70' : 'text-[#1a1512]/50'
      }`}>
        {timeline}
      </span>
      {headshot && (
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shadow-lg border-2 border-white/20">
          <Image 
            src={headshot} 
            alt="Team member" 
            width={80} 
            height={80} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {icon && !headshot && (
        <div className={isOrange ? 'text-white' : 'text-[#ff5501]'}>
          {icon}
        </div>
      )}
    </div>

    {/* Title */}
    <h3 
      className={`text-xl md:text-2xl mb-4 ${isOrange ? 'text-white' : 'text-[#1a1512]'}`}
      style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
    >
      {title}
    </h3>

    {/* Description */}
    <p className={`font-mono text-sm leading-relaxed mb-6 ${
      isOrange ? 'text-white/80' : 'text-[#1a1512]/60'
    }`}>
      {description}
    </p>

    {/* CTA Button (only on first card) */}
    {hasButton && (
      <div className="mt-auto relative z-10">
        <BookCallButton />
        <p className={`font-mono text-xs mt-4 ${isOrange ? 'text-white/60' : 'text-[#1a1512]/40'}`}>
          Only 20-30min. Friendly chat, no pressure.
        </p>
      </div>
    )}

    {/* Wireframe graphics - positioned at bottom right edge */}
    {wireframe === 'proposal' && <ProposalWireframe />}
    {wireframe === 'website' && <WebsiteWireframe />}
  </motion.div>
);

// Main Process Section
export function ProcessSection() {
  const labelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (labelRef.current) {
      const originalText = "OUR PROCESS";
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
            labelRef.current.textContent = "/ OUR PROCESS";
          }
        }
      });
    }
  }, []);

  const processSteps = [
    {
      timeline: "NOW",
      title: "Let's have a chat",
      description: "We'll talk through your goals, blockers, and what you actually need. No fluff. No 10-page briefs.",
      hasButton: true,
      isOrange: true,
      headshot: "/jordan.jpeg"
    },
    {
      timeline: "1-2 DAYS",
      title: "Receive your proposal",
      description: "Get a clear, strategic plan within 1-2 days. No jargon. No guesswork. Just a clear path forward.",
      wireframe: 'proposal' as const
    },
    {
      timeline: "WEEK 1",
      title: "Kick off your project",
      description: "We get moving fast with weekly check-ins, async updates, and zero black holes.",
      icon: <Check size={20} strokeWidth={2} />,
      wireframe: 'website' as const
    }
  ];

  return (
    <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          {/* Decorative shape with extending line - full width */}
          <div className="mb-6 w-full">
            <DecorativeShapeWithLine shapeColor="#d5d5d5" lineColor="#e5e5e5" />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div>
              {/* Label */}
              <span 
                ref={labelRef}
                className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-4"
              >
                / OUR PROCESS
              </span>
              
              {/* Main Heading */}
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512]"
                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
              >
                From intro to impact<br />
                <span className="text-[#1a1512]/40">in record time.</span>
              </h2>
            </div>

            {/* Subtext - Right aligned */}
            <div className="md:max-w-md md:text-right">
              <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed uppercase tracking-wide">
                We're on a mission to help local businesses dominate their digital presence...{' '}
                <a href="#" className="text-[#1a1512] underline underline-offset-2 hover:text-[#ff5501] transition-colors">
                  let's build together.
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {processSteps.map((step, index) => (
            <ProcessCard 
              key={index}
              timeline={step.timeline}
              title={step.title}
              description={step.description}
              icon={step.icon}
              hasButton={step.hasButton}
              isOrange={step.isOrange}
              wireframe={step.wireframe}
              headshot={step.headshot}
              delay={index * 0.1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
