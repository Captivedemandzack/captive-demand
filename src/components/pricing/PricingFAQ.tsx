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
        question: "Is there a free trial available?",
        answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
        question: "Can I change my plan later?",
        answer: "Of course. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle, and we'll prorate any differences.",
    },
    {
        question: "What is your cancellation policy?",
        answer: "You can cancel your subscription at any time with no penalties. Your access continues until the end of your current billing period. We don't believe in lock-in contracts.",
    },
    {
        question: "Can other info be added to an invoice?",
        answer: "Yes, you can add your company details, VAT number, purchase order numbers, and any other billing information directly from your account settings.",
    },
    {
        question: "How does billing work?",
        answer: "We bill monthly or annually depending on your chosen plan. All payments are processed securely through Stripe. You'll receive a detailed invoice via email after each payment.",
    },
    {
        question: "How do I change my account email?",
        answer: "You can update your email address from the account settings page. We'll send a verification link to your new email to confirm the change.",
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
            onClick={onClick}
            className="w-full flex items-center justify-between py-6 text-left group"
        >
            <span
                className="text-base md:text-lg text-[#1a1512] pr-8"
                style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
            >
                {item.question}
            </span>

            <div className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                ${isOpen
                    ? 'bg-[#1a1512] text-white'
                    : 'bg-[#f3f4f6] text-[#1a1512]/40 group-hover:bg-[#e8e8e8]'
                }
            `}>
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
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="pb-6 pr-12">
                        <p className="font-mono text-sm text-[#1a1512]/60 leading-relaxed">
                            {item.answer}
                        </p>
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
        <section className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Centered Header */}
                <div className="text-center mb-12 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl lg:text-5xl text-[#1a1512] mb-4"
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
                        Everything you need to know about the product and billing.
                    </motion.p>
                </div>

                {/* Accordion */}
                <div className="w-full">
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

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="font-mono text-sm text-[#1a1512]/50">
                        Still need help? Reach out to us via{' '}
                        <a
                            href="mailto:hello@captivedemand.com"
                            className="text-[#ff5501] underline underline-offset-2 hover:text-[#1a1512] transition-colors"
                        >
                            hello@captivedemand.com
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
