'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

const serviceSubMenu = [
  { text: 'Website', href: '/services/website' },
  { text: 'SEO', href: '/services/seo' },
  { text: 'Email', href: '/services/email-marketing' },
  { text: 'Software', href: '/services/software' },
  { text: 'Automation', href: '/services/automation' },
];

/** Desktop: single frosted surface (md+). */
const GLASS_DESKTOP =
  'md:border md:border-white/20 md:bg-white/30 md:shadow-[0_8px_32px_rgba(0,0,0,0.08),0_1px_8px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.3)] md:backdrop-blur-md md:backdrop-saturate-150';

/** Mobile: motion shell — no backdrop-filter (Analogue “menu wrap”). */
const GLASS_OUTER_MOBILE = 'max-md:border-0 max-md:bg-transparent';

/**
 * Mobile frosted fill: blur + border + inset highlight only.
 * Outer drop shadow lives on the non-overflow parent so `overflow-y-auto` does not clip it.
 */
const MENU_BG_MOBILE =
  'pointer-events-none absolute inset-0 z-0 rounded-xl border border-white/20 bg-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] backdrop-blur-md backdrop-saturate-150 md:hidden';

type MenuItemProps = {
  text: string;
  href: string;
  className?: string;
  onClick?: () => void;
  hasSubMenu?: boolean;
  isSubMenuOpen?: boolean;
  toggleSubMenu?: () => void;
  isFaded?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
};

const MenuLinkItem = ({
  text,
  href,
  className = '',
  onClick,
  hasSubMenu = false,
  isSubMenuOpen = false,
  toggleSubMenu,
  isFaded = false,
  onHoverStart,
  onHoverEnd,
}: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleEnter = () => {
    setIsHovered(true);
    onHoverStart?.();
  };
  const handleLeave = () => {
    setIsHovered(false);
    onHoverEnd?.();
  };

  const LinkContent = (
    <div className="group relative flex h-[80px] w-full cursor-pointer items-center justify-start overflow-hidden px-6">
      <motion.div
        className="absolute inset-0 bg-brand-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered || isSubMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <span
        className={`relative z-10 font-sans text-[18px] font-normal tracking-tight transition-colors duration-200 ${
          isHovered || isSubMenuOpen ? 'text-brand-bg' : 'text-brand-dark'
        }`}
      >
        {text}
      </span>
      {hasSubMenu && (
        <ChevronRight
          className={`absolute right-6 transition-transform duration-300 ${
            isSubMenuOpen ? 'rotate-90' : 'rotate-0'
          } ${isHovered || isSubMenuOpen ? 'text-brand-bg' : 'text-brand-dark'}`}
          size={20}
          strokeWidth={1.5}
          aria-hidden
        />
      )}
    </div>
  );

  /** Opacity-only fade: avoids `filter: blur()` on interactive rows (Safari hit-testing). */
  const fadeStyle: React.CSSProperties = {
    opacity: isFaded ? 0.25 : 1,
    transition: 'opacity 0.35s ease',
  };

  if (hasSubMenu) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleSubMenu?.();
        }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn(
          className,
          'w-full touch-manipulation appearance-none border-0 bg-transparent p-0 text-left',
        )}
        style={fadeStyle}
      >
        {LinkContent}
      </button>
    );
  }

  return (
    <Link
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={className}
      style={fadeStyle}
    >
      {LinkContent}
    </Link>
  );
};

const SubMenuItem = ({
  text,
  href,
  onClick,
  isFaded = false,
  onHoverStart,
  onHoverEnd,
}: MenuItemProps) => {
  const spanStyle: React.CSSProperties = {
    opacity: isFaded ? 0.25 : 1,
    transition: 'opacity 0.35s ease',
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="relative flex w-full items-center pl-10 pr-6 text-[16px] font-normal text-brand-bg transition-colors duration-200 max-md:min-h-11 md:h-10"
    >
      <span style={spanStyle}>{text}</span>
    </Link>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [hoveredMainItem, setHoveredMainItem] = useState<string | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => {
      if (prev) {
        setIsServicesOpen(false);
        setHoveredMainItem(null);
        setHoveredSubItem(null);
      }
      return !prev;
    });
  };

  const closeAllMenus = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
    setHoveredMainItem(null);
    setHoveredSubItem(null);
  };

  const toggleServicesSubMenu = () => {
    setIsServicesOpen((open) => !open);
    setHoveredSubItem(null);
  };

  const containerVariants = {
    collapsed: {
      height: 53,
      transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
    },
    expanded: {
      height: 'auto',
      transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
    },
  };

  const isMainFaded = (itemText: string) => hoveredMainItem !== null && hoveredMainItem !== itemText;

  const isSubFaded = (itemText: string) => hoveredSubItem !== null && hoveredSubItem !== itemText;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center pt-4 md:pt-8">
      <div
        className={cn(
          'pointer-events-auto w-[95%] max-w-[500px] touch-manipulation md:w-[50%]',
          /* Same ambient shadow as desktop glass; lives here so motion panel overflow does not clip it. */
          'max-md:rounded-xl max-md:shadow-[0_8px_32px_rgba(0,0,0,0.08),0_1px_8px_rgba(0,0,0,0.04)]',
        )}
      >
        <motion.div
          className={cn(
            'relative flex w-full flex-col items-center rounded-xl',
            /* Closed: no vertical scroll container — iOS Safari can swallow the first tap on overflow:auto. */
            isOpen ? 'max-md:overflow-x-hidden max-md:overflow-y-auto md:overflow-hidden' : 'overflow-hidden',
            GLASS_DESKTOP,
            GLASS_OUTER_MOBILE,
          )}
          initial="collapsed"
          animate={isOpen ? 'expanded' : 'collapsed'}
          variants={containerVariants}
        >
          <div aria-hidden className={MENU_BG_MOBILE} />
          <div className="relative z-10 flex w-full flex-col items-center">
            {/* Equal 1fr side tracks so the logo stays optically centered (ABOUT/CLOSE widths differ). */}
            <div className="relative z-30 isolate grid h-[53px] w-full shrink-0 grid-cols-[1fr_auto_1fr] items-center px-8">
              <div className="relative flex min-h-[48px] min-w-0 items-center justify-self-start">
                <Link
                  href="/work"
                  className="absolute z-10 touch-manipulation max-md:inset-y-0 max-md:left-0 max-md:min-h-[48px] max-md:w-[min(100%,4.5rem)] md:inset-0"
                  onClick={closeAllMenus}
                />
                <span className="pointer-events-none font-mono text-[13px] uppercase tracking-[0.2em] text-brand-dark/60 select-none">
                  WORK
                </span>
              </div>

              <div className="relative flex h-[30px] w-[120px] shrink-0 justify-self-center max-md:min-h-[44px]">
                <Link
                  href="/"
                  className="relative z-10 flex size-full touch-manipulation items-center justify-center"
                  onClick={closeAllMenus}
                >
                  <Image
                    src="/captive-demand-logo.png"
                    alt="Captive Demand"
                    fill
                    className="object-contain"
                    priority
                  />
                </Link>
              </div>

              <div className="flex min-h-[48px] min-w-0 justify-self-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu();
                  }}
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? 'site-nav-flyout' : undefined}
                  aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  className="relative z-20 flex min-h-[48px] min-w-[4.5rem] cursor-pointer select-none items-center justify-end border-0 bg-transparent p-0 font-mono text-[13px] uppercase tracking-[0.2em] text-brand-dark/60 touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {isOpen ? 'CLOSE' : 'ABOUT'}
                </button>
              </div>
            </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="site-nav-flyout"
                className="flex w-full flex-col"
                variants={{
                  hidden: { opacity: 0, transition: { duration: 0.2 } },
                  visible: { opacity: 1, transition: { duration: 0.4, delay: 0.1 } },
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="w-full border-t border-brand-dark/10">
                  <div className="flex w-full border-b border-brand-dark/10">
                    <div className={`w-1/2 border-r border-brand-dark/10 ${isServicesOpen ? 'bg-brand-dark' : ''}`}>
                      <MenuLinkItem
                        text="Services"
                        href="/services"
                        hasSubMenu
                        isSubMenuOpen={isServicesOpen}
                        toggleSubMenu={toggleServicesSubMenu}
                        isFaded={isMainFaded('Services')}
                        onHoverStart={() => setHoveredMainItem('Services')}
                        onHoverEnd={() => setHoveredMainItem(null)}
                      />

                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="flex w-full flex-col overflow-hidden"
                          >
                            {serviceSubMenu.map((item) => (
                              <SubMenuItem
                                key={item.text}
                                text={item.text}
                                href={item.href}
                                onClick={closeAllMenus}
                                isFaded={isSubFaded(item.text)}
                                onHoverStart={() => setHoveredSubItem(item.text)}
                                onHoverEnd={() => setHoveredSubItem(null)}
                              />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="w-1/2">
                      <MenuLinkItem
                        text="Pricing"
                        href="/pricing"
                        onClick={closeAllMenus}
                        isFaded={isMainFaded('Pricing')}
                        onHoverStart={() => setHoveredMainItem('Pricing')}
                        onHoverEnd={() => setHoveredMainItem(null)}
                      />
                    </div>
                  </div>

                  <div className="flex w-full border-b border-brand-dark/10">
                    <div className="w-1/2 border-r border-brand-dark/10">
                      <MenuLinkItem
                        text="Case Studies"
                        href="/work"
                        onClick={closeAllMenus}
                        isFaded={isMainFaded('Case Studies')}
                        onHoverStart={() => setHoveredMainItem('Case Studies')}
                        onHoverEnd={() => setHoveredMainItem(null)}
                      />
                    </div>
                    <div className="w-1/2">
                      <MenuLinkItem
                        text="Our Story"
                        href="/about"
                        onClick={closeAllMenus}
                        isFaded={isMainFaded('Our Story')}
                        onHoverStart={() => setHoveredMainItem('Our Story')}
                        onHoverEnd={() => setHoveredMainItem(null)}
                      />
                    </div>
                  </div>

                  <div className="flex w-full border-b border-brand-dark/10">
                    <div className="w-1/2 border-r border-brand-dark/10">
                      <MenuLinkItem
                        text="Insights"
                        href="/insights"
                        onClick={closeAllMenus}
                        isFaded={isMainFaded('Insights')}
                        onHoverStart={() => setHoveredMainItem('Insights')}
                        onHoverEnd={() => setHoveredMainItem(null)}
                      />
                    </div>
                    <div className="w-1/2">
                      <MenuLinkItem
                        text="Contact Us"
                        href="/contact"
                        onClick={closeAllMenus}
                        isFaded={isMainFaded('Contact Us')}
                        onHoverStart={() => setHoveredMainItem('Contact Us')}
                        onHoverEnd={() => setHoveredMainItem(null)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-8 px-8 py-8">
                  <div className="flex flex-col items-start gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-brand-dark/50">
                      GENERAL INQUIRIES
                    </span>
                    <div className="flex flex-col items-start gap-1">
                      <a
                        href="mailto:hello@captivedemand.com"
                        className="text-[17px] font-normal text-brand-dark transition-opacity hover:opacity-70"
                      >
                        hello@captivedemand.com
                      </a>
                      <a
                        href="tel:+16159092337"
                        className="text-[17px] font-normal text-brand-dark transition-opacity hover:opacity-70"
                      >
                        615.909.2337
                      </a>
                      <Link
                        href="/contact"
                        className="mt-1 text-[17px] font-normal text-brand-dark underline underline-offset-2 transition-opacity hover:opacity-70"
                      >
                        Plan a Call
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-brand-dark/50">VISIT</span>
                    <div className="flex flex-col items-start">
                      <span className="text-[17px] font-normal text-brand-dark">901 Woodland St, Suite 104,</span>
                      <span className="text-[17px] font-normal text-brand-dark">Nashville, TN 37206</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
