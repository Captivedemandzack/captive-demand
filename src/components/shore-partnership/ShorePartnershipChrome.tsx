'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { CTAButton } from '@/components/ui/CTAButton';
import { cn } from '@/lib/utils';
import { CAPTIVE_DEMAND_LOGO, SHORE_LOGOMARK_URL } from '@/lib/shore-partnership';

const NAV_LINKS = [
  { label: 'Approach', href: '#approach' },
  { label: 'Services', href: '#services' },
  { label: 'Case studies', href: '#case-studies' },
  { label: 'Engage', href: '#engage' },
];

/**
 * Fixed top bar aligned with main site chrome (#FAFAFA + blur; inverts to ink on scroll).
 */
export function ShorePartnershipChrome() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-[60] backdrop-blur-md transition-[background-color,color] duration-300',
        scrolled
          ? 'bg-[#1a1512]/95 text-white'
          : 'bg-[#FAFAFA]/90 text-[#1a1512]',
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-container-px">
        <Link
          href="/"
          aria-label="Captive Demand × Shore Capital Partners"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <span className={cn('relative shrink-0 leading-none transition-[filter] duration-300', scrolled && 'brightness-0 invert')}>
            <Image
              src={CAPTIVE_DEMAND_LOGO}
              alt="Captive Demand home"
              width={152}
              height={28}
              className="h-7 w-auto max-h-7 max-w-[152px] object-contain object-left"
              sizes="152px"
              priority
            />
          </span>
          <span
            className={cn(
              'mx-4 hidden font-mono text-[12px] uppercase tracking-[0.18em] sm:inline',
              scrolled ? 'text-white/35' : 'text-[#1a1512]/30',
            )}
            aria-hidden
          >
            ×
          </span>
          <span className="relative hidden h-6 w-[58px] shrink-0 sm:block" aria-hidden>
            <Image
              src={SHORE_LOGOMARK_URL}
              alt=""
              fill
              className={cn(
                'object-contain object-center transition-[filter] duration-300',
                scrolled ? 'opacity-90 brightness-0 invert' : 'opacity-85',
              )}
              sizes="58px"
            />
          </span>
        </Link>

        <nav aria-label="Partnership shortcuts" className="flex items-center gap-3 sm:gap-6">
          <ul className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-150',
                    scrolled
                      ? 'text-white/75 hover:text-white'
                      : 'text-[#1a1512]/70 hover:text-brand-orange',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <CTAButton
            variant="dark"
            text="START A PROJECT"
            href="#contact"
            ariaLabel="Start a project with Captive Demand"
          />
        </nav>
      </div>
    </header>
  );
}
