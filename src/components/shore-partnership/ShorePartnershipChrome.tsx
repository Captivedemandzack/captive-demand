'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { CTAButton } from '@/components/ui/CTAButton';
import { cn } from '@/lib/utils';
import { CAPTIVE_DEMAND_LOGO, SHORE_LOGO_ASPECT, SHORE_LOGOMARK_URL } from '@/lib/shore-partnership';

const NAV_LINKS = [
  { label: 'Approach', href: '#approach' },
  { label: 'Case studies', href: '#case-studies' },
  { label: 'Free audit', href: '#free-audit' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'How we execute', href: '#operating-model' },
  { label: 'Contact', href: '#contact' },
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
          <span className={cn('mx-2 font-nohemi text-lg font-light italic text-brand-orange/70', scrolled && 'text-brand-orange/90')}>
            ×
          </span>
          <span className={cn('relative shrink-0 transition-[filter] duration-300', scrolled && 'brightness-0 invert')}>
            <span
              className="relative block h-8 shrink-0 overflow-hidden"
              style={{ width: Math.round(32 * SHORE_LOGO_ASPECT) }}
            >
              <Image
                src={SHORE_LOGOMARK_URL}
                alt="Shore Capital Partners"
                fill
                className="object-contain object-left"
                sizes="120px"
                quality={85}
                priority
              />
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Shore partnership page sections">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-150',
                scrolled ? 'text-white/75 hover:text-white' : 'text-[#1a1512]/60 hover:text-[#1a1512]',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <CTAButton
          variant={scrolled ? 'bookCallOrange' : 'dark'}
          text="START A PROJECT"
          href="#contact"
          ariaLabel="Start a project: jump to the Shore lead form"
          className="hidden sm:inline-flex"
        />
      </div>
    </header>
  );
}
