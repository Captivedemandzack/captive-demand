'use client';

import React, { useState } from 'react';
import { CTAButton } from '@/components/ui/CTAButton';
import { Check } from 'lucide-react';
import { CalEmbed } from './CalEmbed';

type Tab = 'message' | 'call';

export function ContactFormCard() {
  const [activeTab, setActiveTab] = useState<Tab>('message');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback: open mailto and show success
        const subject = encodeURIComponent(`Project inquiry from ${formData.fullName}`);
        const body = encodeURIComponent(
          `Name: ${formData.fullName}\nEmail: ${formData.email}\nService: ${formData.service}\nBudget: ${formData.budget}\n\nMessage:\n${formData.message}`
        );
        window.location.href = `mailto:hello@captivedemand.com?subject=${subject}&body=${body}`;
        setSubmitted(true);
      }
    } catch {
      const subject = encodeURIComponent(`Project inquiry from ${formData.fullName}`);
      const body = encodeURIComponent(
        `Name: ${formData.fullName}\nEmail: ${formData.email}\nService: ${formData.service}\nBudget: ${formData.budget}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:hello@captivedemand.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  };

  const inputBase =
    'w-full bg-[#fafafa] border border-[#e0e0e0] rounded-lg px-3.5 py-3 font-mono text-[13px] text-[#111] outline-none transition-colors focus:border-[#E8480C] focus:bg-white';
  const labelBase =
    'font-mono uppercase text-[10px] text-[#999] tracking-[0.08em] block mb-2';

  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white p-8">
      {/* Tab switcher */}
      <div className="flex p-1 rounded-lg bg-[#f4f4f4] mb-8">
        <button
          type="button"
          onClick={() => setActiveTab('message')}
          className={`flex-1 py-2.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all ${
            activeTab === 'message'
              ? 'bg-[#1a1a1a] text-white'
              : 'text-[#888] hover:text-[#111]'
          }`}
        >
          Send a message
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('call')}
          className={`flex-1 py-2.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all ${
            activeTab === 'call'
              ? 'bg-[#1a1a1a] text-white'
              : 'text-[#888] hover:text-[#111]'
          }`}
        >
          Book a call
        </button>
      </div>

      {activeTab === 'message' ? (
        submitted ? (
          <div className="py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-[#E8480C]/10 flex items-center justify-center mx-auto mb-6">
              <Check size={28} className="text-[#E8480C]" strokeWidth={2} />
            </div>
            <h3 className="font-sans font-bold text-[20px] text-[#111] mb-2">
              Message received.
            </h3>
            <p className="font-mono text-sm text-[#666]">
              We&apos;ll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className={labelBase}>
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                required
                placeholder="Spencer Donaldson"
                className={inputBase}
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, fullName: e.target.value }))
                }
              />
            </div>
            <div>
              <label htmlFor="email" className={labelBase}>
                Work Email *
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="spencer@company.com"
                className={inputBase}
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>
            <div>
              <label htmlFor="service" className={labelBase}>
                Service Interested In *
              </label>
              <select
                id="service"
                required
                className={inputBase}
                value={formData.service}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, service: e.target.value }))
                }
              >
                <option value="">Select one...</option>
                <option value="Website Design/Development">
                  Website Design/Development
                </option>
                <option value="SEO/AEO">SEO/AEO</option>
                <option value="Email Marketing">Email Marketing</option>
                <option value="Marketing Automation">
                  Marketing Automation
                </option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>
            <div>
              <label htmlFor="budget" className={labelBase}>
                Budget Range
              </label>
              <select
                id="budget"
                className={inputBase}
                value={formData.budget}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, budget: e.target.value }))
                }
              >
                <option value="">Select one...</option>
                <option value="Under $5K">Under $5K</option>
                <option value="$5K–$10K">$5K–$10K</option>
                <option value="$10K–$25K">$10K–$25K</option>
                <option value="$25K+">$25K+</option>
                <option value="Let's talk">Let&apos;s talk</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className={labelBase}>
                Tell us about your project
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="What are you building? What's the goal? Any timeline?"
                className={`${inputBase} resize-none`}
                value={formData.message}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, message: e.target.value }))
                }
              />
            </div>

            <div className="pt-2">
              <CTAButton
                variant="dark"
                text="SEND MESSAGE"
                as="button"
                type="submit"
                fullWidth
              />
            </div>
            <p className="font-mono text-[11px] text-[#999]">
              No spam. No sales calls. We respond within 24 hours.
            </p>
          </form>
        )
      ) : (
        <CalEmbed />
      )}
    </div>
  );
}
