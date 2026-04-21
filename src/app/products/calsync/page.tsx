import type { Metadata } from 'next';
import { CalSyncPage } from '@/components/products/calsync/CalSyncPage';

const PAGE_URL = 'https://captivedemand.com/products/calsync';

export const metadata: Metadata = {
    title: 'How to Merge Google Calendars Automatically | CalSync by Captive Demand',
    description:
        'Learn how to merge Google Calendars across Workspace accounts. CalSync copies events automatically every 5 minutes so you never double-book. Start a free trial.',
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: 'How to Merge Google Calendars Automatically | CalSync',
        description:
            'Stop double-booking across Google Workspace accounts. CalSync auto-syncs your calendars every 5 minutes.',
        url: PAGE_URL,
        type: 'website',
        siteName: 'Captive Demand',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'How to Merge Google Calendars Automatically | CalSync',
        description:
            'Auto-sync Google Calendars across Workspace accounts every 5 minutes. No double-booking.',
    },
    robots: { index: true, follow: true },
};

const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CalSync',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://www.calsync.party',
    description:
        'Automatically merge Google Calendars across Workspace accounts. Events sync every 5 minutes.',
    offers: {
        '@type': 'Offer',
        price: '2.99',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
    },
    featureList: [
        'Automatic sync every 5 minutes',
        'Busy-only or full-detail privacy controls',
        'Unlimited calendar connections and merges',
        'Loop prevention',
        'AES-256-GCM encrypted token storage',
    ],
    provider: {
        '@type': 'Organization',
        name: 'Captive Demand',
        url: 'https://captivedemand.com',
    },
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Does CalSync work with personal Gmail accounts or only Google Workspace?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'CalSync works with any Google account — personal Gmail and Google Workspace alike.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is my calendar data secure?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. CalSync uses OAuth for authentication with minimal permission scopes (calendar events only — no email access). All tokens are encrypted at rest using AES-256-GCM.',
            },
        },
        {
            '@type': 'Question',
            name: 'How often do events sync?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Every 5 minutes. When an event is created, updated, or cancelled on your source calendar, CalSync reflects the change on the destination within the next sync cycle.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I sync more than two calendars?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. You can create unlimited merges between any combination of connected calendars.',
            },
        },
        {
            '@type': 'Question',
            name: 'What if I cancel — do the copied events disappear?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Events that have already been copied remain on the destination calendar. New events will stop syncing.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does CalSync support Outlook or Apple Calendar?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Not yet — Google Calendar only for now. Outlook and Apple Calendar support is on the roadmap.',
            },
        },
        {
            '@type': 'Question',
            name: 'What happens after the free trial?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'After 3 days, your subscription begins at $2.99/month. You can cancel anytime before the trial ends and you won\u2019t be charged.',
            },
        },
    ],
};

export default function CalSyncProductPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <CalSyncPage />
        </>
    );
}
