import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Captive Demand',
  description: 'Terms of service for Captive Demand.',
};

export default function TermsPage() {
  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen py-20 md:py-32 px-4">
      <div className="mx-auto max-w-3xl">
        <h1
          className="text-4xl md:text-5xl text-[#1a1512] mb-8"
          style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
        >
          Terms of Service
        </h1>
        <p className="text-[#1a1512]/80 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US')}
        </p>
        <div className="prose prose-[#1a1512] max-w-none space-y-6 text-[#1a1512]/80">
          <p>
            By using the Captive Demand website and services, you agree to these terms. Please read them carefully.
          </p>
          <h2 className="text-xl font-semibold text-[#1a1512] mt-8">Services</h2>
          <p>
            Captive Demand provides web design, development, and marketing services. Specific deliverables and terms are defined in individual project agreements.
          </p>
          <h2 className="text-xl font-semibold text-[#1a1512] mt-8">Intellectual Property</h2>
          <p>
            Work product and deliverables are transferred per the terms of each project agreement. Our website content and branding remain our property.
          </p>
          <h2 className="text-xl font-semibold text-[#1a1512] mt-8">Contact</h2>
          <p>
            For questions about these terms, contact us at{' '}
            <a href="mailto:hello@captivedemand.com" className="text-[#E8480C] hover:underline">
              hello@captivedemand.com
            </a>
            .
          </p>
        </div>
        <Link
          href="/"
          className="inline-block mt-12 text-[#E8480C] hover:underline font-mono text-sm uppercase tracking-wider"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
