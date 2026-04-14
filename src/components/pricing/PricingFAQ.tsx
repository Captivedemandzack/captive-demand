'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: 'How does the project process work?',
        answer:
            'After your intro call, we scope the project, send a proposal, and kick off within 1–2 weeks of deposit. Most projects are delivered in 3–6 weeks depending on complexity and how quickly we receive content from you.',
    },
    {
        question: 'Do I own everything after the project?',
        answer:
            'Yes — you own 100% of the code, design, and content. We hand off all files and credentials at launch. No lock-in, no ongoing fees unless you choose a maintenance retainer.',
    },
    {
        question: 'What if I need changes after launch?',
        answer:
            'Every tier includes post-launch support (30–180 days depending on tier). After that, we offer flexible maintenance retainers or bill at our hourly rate for one-off requests.',
    },
    {
        question: 'How much do I pay upfront?',
        answer:
            'We work on a 50% deposit to kick off, 50% on completion model. For larger Enterprise and Custom projects we can structure payments across milestones.',
    },
    {
        question: 'Do you work with businesses outside Nashville?',
        answer:
            'Yes — we work with clients across the US and internationally. All collaboration happens over Zoom, Slack, and Loom.',
    },
    {
        question: 'What makes Captive Demand different from other agencies?',
        answer:
            "We're operators, not just designers. We've built and run businesses ourselves, which means we think about your site as a growth tool — not a brochure. Every decision we make is tied to outcomes.",
    },
];

const FAQAccordionItem = ({
    item,
    isOpen,
    onClick,
    delay,
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
        className="w-full border-b border-[#1a1512]/10 last:border-b-0"
    >
        <button
            type="button"
            onClick={onClick}
            className="group flex w-full items-center justify-between py-6 text-left"
        >
            <span
                className="pr-8 text-base text-[#1a1512] md:text-lg"
                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
            >
                {item.question}
            </span>

            <div
                className={`
                flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300
                ${
                    isOpen
                        ? 'bg-[#1a1512] text-white'
                        : 'bg-[#f3f4f6] text-[#1a1512]/40 group-hover:bg-[#e8e8e8]'
                }
            `}
            >
                <Plus
                    size={16}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    strokeWidth={1.5}
                />
            </div>
        </button>

        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <div className="pb-6 pr-12">
                        <p className="font-mono text-sm leading-relaxed text-[#1a1512]/60">{item.answer}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

export function PricingFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-[#FAFAFA] px-4 py-20 md:py-32">
            <div className="mx-auto max-w-3xl">
                <div className="mb-12 text-center md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-4 text-3xl text-[#1a1512] md:text-4xl lg:text-5xl"
                        style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                    >
                        Questions and answers
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        viewport={{ once: true }}
                        className="font-mono text-sm text-[#1a1512]/60"
                    >
                        Common questions about pricing, process, and how we work together.
                    </motion.p>
                </div>

                <div className="w-full">
                    {faqData.map((item, index) => (
                        <FAQAccordionItem
                            key={item.question}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                            delay={index * 0.05}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="font-mono text-sm text-[#1a1512]/50">
                        Still need help? Reach out to us via{' '}
                        <a
                            href="mailto:hello@captivedemand.com"
                            className="text-[#ff5501] underline underline-offset-2 transition-colors hover:text-[#1a1512]"
                        >
                            hello@captivedemand.com
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
