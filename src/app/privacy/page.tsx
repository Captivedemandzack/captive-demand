import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Captive Demand',
  description: 'Privacy policy for Captive Demand.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen py-20 md:py-32 px-4">
      <div className="mx-auto max-w-3xl">
        <h1
          className="text-4xl md:text-5xl text-[#1a1512] mb-8"
          style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
        >
          Privacy Policy
        </h1>
        <p className="text-[#1a1512]/80 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US')}
        </p>
        <div className="prose prose-[#1a1512] max-w-none space-y-6 text-[#1a1512]/80">
          <p>
            Captive Demand (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. This policy describes how we collect, use, and protect your information when you use our website or services.
          </p>
          <h2 className="text-xl font-semibold text-[#1a1512] mt-8">Information We Collect</h2>
          <p>
            We may collect information you provide directly (e.g., contact form submissions, email) and usage data (e.g., analytics) when you visit our site.
          </p>
          <h2 className="text-xl font-semibold text-[#1a1512] mt-8">How We Use It</h2>
          <p>
            We use your information to respond to inquiries, improve our services, and communicate with you about projects and updates.
          </p>
          <h2 className="text-xl font-semibold text-[#1a1512] mt-8">Contact</h2>
          <p>
            For questions about this policy, contact us at{' '}
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
