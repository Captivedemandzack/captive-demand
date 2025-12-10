"use client";

import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Data
interface FAQItem {
  question: string;
  answer: string;
  tags: string[];
}

const faqData: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer: "We offer comprehensive digital marketing solutions including website design & development, SEO/AEO optimization, email marketing, software development, and workflow automation. Each service is tailored to help local businesses grow their online presence and drive revenue.",
    tags: ["Services", "Overview"]
  },
  {
    question: "How long does a typical project take?",
    answer: "Timeline varies by project scope. Website projects typically launch within 4-8 weeks. SEO results begin showing within 3-6 months. Email marketing campaigns can generate revenue within days of launch. We'll set clear expectations during our initial consultation.",
    tags: ["Timeline", "Process"]
  },
  {
    question: "What's your pricing structure?",
    answer: "We offer flexible pricing based on your needs—from one-time projects to ongoing retainers. Every engagement starts with a discovery call where we understand your goals and provide a transparent quote. No hidden fees, no surprises.",
    tags: ["Pricing", "Budget"]
  },
  {
    question: "Do I need technical knowledge?",
    answer: "Not at all. We handle all the technical aspects of your digital presence—from development to optimization. You focus on running your business while we take care of the digital side. We keep you informed with clear, jargon-free updates.",
    tags: ["Technical", "Support"]
  },
  {
    question: "How do you measure success?",
    answer: "We're obsessed with data. Every project includes clear KPIs—whether that's increased traffic, higher conversion rates, more qualified leads, or revenue growth. We provide regular reports and are always transparent about what's working.",
    tags: ["Results", "Analytics"]
  }
];

// Helper: Decorative Line
const DecorativeShapeWithLine = ({ shapeColor = "#e5e5e5", lineColor = "#e5e5e5" }: { shapeColor?: string; lineColor?: string }) => (
  <div className="flex items-end w-full">
    <svg viewBox="0 0 80 8" className="w-20 h-2 flex-shrink-0" preserveAspectRatio="none">
      <path d="M0 8 L0 0 L68 0 L80 8 Z" fill={shapeColor} />
    </svg>
    <div className="flex-1 h-[1px] self-end" style={{ backgroundColor: lineColor }} />
  </div>
);

// FAQ Accordion Item Component
// UPDATED: Border radius reduced to 'rounded-3xl' (approx 24px) to match screenshots better.
const FAQAccordionItem = ({
  item,
  isOpen,
  onClick,
  delay
}: {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    viewport={{ once: true }}
    className="group w-full"
  >
    <div
      className={`
        relative w-full overflow-hidden transition-all duration-300
        ${isOpen ? 'bg-[#1a1512]' : 'bg-[#f3f4f6] hover:bg-[#e8e8e8]'}
        rounded-3xl /* UPDATED: Reduced radius from 2rem to 3xl (1.5rem/24px) */
      `}
    >
      <button
        onClick={onClick}
        className="w-full relative flex items-center justify-between p-6 pr-8 min-h-[84px] text-left"
      >
        <div className="flex flex-col items-start gap-2">
          <span
            className={`text-lg md:text-xl transition-colors ${isOpen ? 'text-white' : 'text-[#1a1512]'
              }`}
            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
          >
            {item.question}
          </span>

          {/* Tags */}
          <div className="flex gap-2">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors ${isOpen
                    ? 'bg-white/10 text-white/60'
                    : 'bg-[#1a1512]/5 text-[#1a1512]/40'
                  }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ml-4 ${isOpen ? 'bg-white/10' : 'bg-[#e8e8e8] group-hover:bg-[#d5d5d5]'
          }`}>
          <Plus
            size={20}
            className={`transition-all duration-300 ${isOpen ? 'rotate-45 text-white' : 'text-[#1a1512]/40'
              }`}
            strokeWidth={1.5}
          />
        </div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-8 pt-0 max-w-2xl">
              <p className="font-mono text-sm text-white/60 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const labelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (labelRef.current) {
      const originalText = "FAQ";
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      gsap.to({}, {
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: labelRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        onUpdate: function () {
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
        onComplete: function () {
          if (labelRef.current) {
            labelRef.current.textContent = "/ FAQ";
          }
        }
      });
    }
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4 overflow-hidden" id="faq">
      <div className="max-w-7xl mx-auto">

        {/* Decorative line */}
        <div className="mb-6 w-full">
          <DecorativeShapeWithLine shapeColor="#d5d5d5" lineColor="#e5e5e5" />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left Column */}
          <div className="flex flex-col">
            <span
              ref={labelRef}
              className="font-mono text-sm tracking-wider text-[#1a1512]/70 uppercase block mb-6"
            >
              / FAQ
            </span>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-[#1a1512] mb-6"
              style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
            >
              Commonly given<br />answers
            </h2>

            <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed mb-8 max-w-sm">
              Don't find what you are looking for?{' '}
              <a
                href="#contact"
                className="text-[#1a1512] underline underline-offset-2 hover:text-[#ff5501] transition-colors"
              >
                Send us a message.
              </a>
            </p>

            {/* UPDATED IMAGE CONTAINER: Matches the rounded-3xl radius */}
            <div className="hidden lg:block mt-auto w-full relative h-80 rounded-3xl overflow-hidden bg-gray-200">
              <Image
                src="/ff.png"
                alt="FAQ Illustration"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="space-y-3">
            {faqData.map((item, index) => (
              <FAQAccordionItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
                delay={index * 0.05}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}