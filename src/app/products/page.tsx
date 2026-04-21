import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Products | Captive Demand',
    description:
        'Purpose-built tools from Captive Demand. Currently: CalSync — automatic Google Calendar sync for freelancers and agency operators.',
    alternates: { canonical: 'https://captivedemand.com/products' },
};

const products = [
    {
        name: 'CalSync',
        href: '/products/calsync',
        tagline: 'Merge Google Calendars automatically',
        description:
            'Auto-sync events across Google Workspace accounts every 5 minutes. Stop double-booking without the manual copy-paste.',
        price: '$2.99/mo',
        accent: '#2563eb',
    },
];

export default function ProductsIndexPage() {
    return (
        <main className="w-full bg-[#FAFAFA]">
            <section className="relative w-full px-4 pt-36 pb-16 md:pt-48 md:pb-24">
                <div className="mx-auto max-w-7xl">
                    <span className="block mb-4 font-mono text-sm uppercase tracking-wider text-[#1a1512]/70">
                        / Products
                    </span>
                    <h1
                        className="max-w-4xl text-[clamp(2.25rem,5vw+1rem,4.5rem)] leading-[1.05] tracking-tight text-[#1a1512]"
                        style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300 }}
                    >
                        Tools we built because<br />
                        <span className="text-[#1a1512]/45">we needed them ourselves.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl font-mono text-sm md:text-base text-[#1a1512]/60 leading-relaxed">
                        Every product here solves a problem we hit while running the agency. Productized. Priced fairly.
                        Still supported by us.
                    </p>
                </div>
            </section>

            <section className="w-full px-4 pb-32">
                <div className="mx-auto max-w-7xl">
                    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {products.map((p) => (
                            <li key={p.name}>
                                <Link
                                    href={p.href}
                                    className="group relative flex flex-col gap-6 rounded-2xl border border-[#1a1512]/8 bg-white p-8 transition-all duration-300 hover:-translate-y-0.5"
                                    style={{ boxShadow: '0 10px 32px -20px rgba(26,21,18,0.18)' }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="h-3 w-3 rounded-full"
                                            style={{ backgroundColor: p.accent }}
                                        />
                                        <ArrowUpRight
                                            size={18}
                                            strokeWidth={1.75}
                                            className="text-[#1a1512]/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                    </div>

                                    <div>
                                        <h2
                                            className="text-3xl md:text-4xl text-[#1a1512]"
                                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 400 }}
                                        >
                                            {p.name}
                                        </h2>
                                        <p className="mt-2 font-mono text-sm uppercase tracking-wider text-[#1a1512]/55">
                                            {p.tagline}
                                        </p>
                                    </div>

                                    <p className="text-[15px] text-[#1a1512]/70 leading-relaxed">{p.description}</p>

                                    <div className="mt-auto flex items-center justify-between border-t border-[#1a1512]/6 pt-5">
                                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#1a1512]/50">
                                            Starting at
                                        </span>
                                        <span
                                            className="text-[15px]"
                                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500, color: p.accent }}
                                        >
                                            {p.price}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
