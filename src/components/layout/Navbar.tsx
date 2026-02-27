'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const serviceSubMenu = [
  { text: "Website", href: "/services/website" },
  { text: "SEO", href: "/services/seo" },
  { text: "Email", href: "/services/email-marketing" },
  { text: "Software", href: "/services/software" },
  { text: "Automation", href: "/services/automation" },
];

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
    <div className="relative flex items-center justify-start w-full h-[80px] px-6 cursor-pointer overflow-hidden group">
      <motion.div
        className="absolute inset-0 bg-brand-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered || isSubMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <span className={`relative z-10 font-sans font-normal text-[18px] tracking-tight transition-colors duration-200 ${isHovered || isSubMenuOpen ? 'text-brand-bg' : 'text-brand-dark'}`}>
        {text}
      </span>
      {hasSubMenu && (
        <ChevronRight
          className={`absolute right-6 transition-transform duration-300 ${isSubMenuOpen ? 'rotate-90' : 'rotate-0'} ${isHovered || isSubMenuOpen ? 'text-brand-bg' : 'text-brand-dark'}`}
          size={20}
        />
      )}
    </div>
  );

  const fadeStyle: React.CSSProperties = {
    filter: isFaded ? 'blur(3px)' : 'blur(0px)',
    opacity: isFaded ? 0.25 : 1,
    transition: 'filter 0.35s ease, opacity 0.35s ease',
  };

  if (hasSubMenu) {
    return (
      <div
        onClick={toggleSubMenu}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={className}
        style={fadeStyle}
      >
        {LinkContent}
      </div>
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
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="relative flex items-center w-full h-10 pl-10 pr-6 text-brand-bg hover:bg-white/10 transition-colors duration-200 text-[16px] font-normal"
      style={{
        filter: isFaded ? 'blur(3px)' : 'blur(0px)',
        opacity: isFaded ? 0.25 : 1,
        transition: 'filter 0.35s ease, opacity 0.35s ease',
      }}
    >
      {text}
    </Link>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [hoveredMainItem, setHoveredMainItem] = useState<string | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsServicesOpen(false);
      setHoveredMainItem(null);
      setHoveredSubItem(null);
    }
  };

  const closeAllMenus = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
    setHoveredMainItem(null);
    setHoveredSubItem(null);
  };

  const toggleServicesSubMenu = () => {
    setIsServicesOpen(!isServicesOpen);
    setHoveredSubItem(null);
  };

  const containerVariants = {
    collapsed: {
      height: 53,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    },
    expanded: {
      height: 'auto',
      transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    }
  };

  const mainItems = ["Services", "Process & Pricing", "Case Studies", "Team", "Insights", "Client Portal"];

  const isMainFaded = (itemText: string) =>
    hoveredMainItem !== null && hoveredMainItem !== itemText;

  const isSubFaded = (itemText: string) =>
    hoveredSubItem !== null && hoveredSubItem !== itemText;

  return (
    <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[50%] max-w-[500px]">
      <motion.div
        className="relative flex flex-col items-center w-full rounded-xl overflow-hidden backdrop-blur-2xl bg-white/70 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.7)]"
        initial="collapsed"
        animate={isOpen ? "expanded" : "collapsed"}
        variants={containerVariants}
      >
        {/* Top Navigation Bar */}
        <div className="w-full h-[53px] flex items-center justify-between px-8 shrink-0 relative z-20">
          <div className="relative group cursor-pointer h-full flex items-center">
            <Link href="/case-studies" className="absolute inset-0 z-10" onClick={closeAllMenus} />
            <span className="font-mono uppercase text-[13px] tracking-[0.2em] text-brand-dark/60 select-none">
              WORK
            </span>
          </div>

          <div className="flex-grow flex justify-center items-center h-full">
            <Link href="/" className="relative flex justify-center items-center w-[120px] h-[30px]" onClick={closeAllMenus}>
              <Image
                src="/captive-demand-logo.png"
                alt="Captive Demand"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          <div
            className="relative cursor-pointer h-full flex items-center select-none"
            onClick={toggleMenu}
          >
            <span className="font-mono uppercase text-[13px] tracking-[0.2em] text-brand-dark/60">
              {isOpen ? 'CLOSE' : 'ABOUT'}
            </span>
            <div className="absolute inset-0 z-10" />
          </div>
        </div>

        {/* Expanded Content Area */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="w-full flex flex-col"
              variants={{
                hidden: { opacity: 0, transition: { duration: 0.2 } },
                visible: { opacity: 1, transition: { duration: 0.4, delay: 0.1 } }
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="w-full border-t border-brand-dark/10">
                {/* Row 1 - Services & Process */}
                <div className="flex w-full border-b border-brand-dark/10">
                  <div className={`w-1/2 border-r border-brand-dark/10 ${isServicesOpen ? 'bg-brand-dark' : ''}`}>
                    <MenuLinkItem
                      text="Services"
                      href="/services"
                      hasSubMenu={true}
                      isSubMenuOpen={isServicesOpen}
                      toggleSubMenu={toggleServicesSubMenu}
                      isFaded={isMainFaded("Services")}
                      onHoverStart={() => setHoveredMainItem("Services")}
                      onHoverEnd={() => setHoveredMainItem(null)}
                    />

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="w-full flex flex-col"
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
                      text="Process & Pricing"
                      href="/pricing"
                      onClick={closeAllMenus}
                      isFaded={isMainFaded("Process & Pricing")}
                      onHoverStart={() => setHoveredMainItem("Process & Pricing")}
                      onHoverEnd={() => setHoveredMainItem(null)}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex w-full border-b border-brand-dark/10">
                  <div className="w-1/2 border-r border-brand-dark/10">
                    <MenuLinkItem
                      text="Case Studies"
                      href="/case-studies"
                      onClick={closeAllMenus}
                      isFaded={isMainFaded("Case Studies")}
                      onHoverStart={() => setHoveredMainItem("Case Studies")}
                      onHoverEnd={() => setHoveredMainItem(null)}
                    />
                  </div>
                  <div className="w-1/2">
                    <MenuLinkItem
                      text="Team"
                      href="/team"
                      onClick={closeAllMenus}
                      isFaded={isMainFaded("Team")}
                      onHoverStart={() => setHoveredMainItem("Team")}
                      onHoverEnd={() => setHoveredMainItem(null)}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex w-full border-b border-brand-dark/10">
                  <div className="w-1/2 border-r border-brand-dark/10">
                    <MenuLinkItem
                      text="Insights"
                      href="/insights"
                      onClick={closeAllMenus}
                      isFaded={isMainFaded("Insights")}
                      onHoverStart={() => setHoveredMainItem("Insights")}
                      onHoverEnd={() => setHoveredMainItem(null)}
                    />
                  </div>
                  <div className="w-1/2">
                    <MenuLinkItem
                      text="Client Portal"
                      href="/portal"
                      onClick={closeAllMenus}
                      isFaded={isMainFaded("Client Portal")}
                      onHoverStart={() => setHoveredMainItem("Client Portal")}
                      onHoverEnd={() => setHoveredMainItem(null)}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Info & Address Section */}
              <div className="w-full px-8 py-8 flex flex-col gap-8">
                <div className="flex flex-col items-start gap-3">
                  <span className="font-mono uppercase text-[11px] tracking-[0.15em] text-brand-dark/50">
                    GENERAL INQUIRIES
                  </span>
                  <div className="flex flex-col items-start gap-1">
                    <a href="mailto:hello@captivedemand.com" className="text-[17px] font-normal text-brand-dark hover:opacity-70 transition-opacity">
                      hello@captivedemand.com
                    </a>
                    <a href="tel:+16159092337" className="text-[17px] font-normal text-brand-dark hover:opacity-70 transition-opacity">
                      615.909.2337
                    </a>
                    <a href="https://connect.captivedemand.com/meetings/spencer-donaldson/discovery-call" target="_blank" rel="noopener noreferrer" className="text-[17px] font-normal text-brand-dark hover:opacity-70 transition-opacity mt-1 underline underline-offset-2">
                      Plan a Call
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3">
                  <span className="font-mono uppercase text-[11px] tracking-[0.15em] text-brand-dark/50">
                    VISIT
                  </span>
                  <div className="flex flex-col items-start">
                    <span className="text-[17px] font-normal text-brand-dark">
                      901 Woodland St, Suite 104,
                    </span>
                    <span className="text-[17px] font-normal text-brand-dark">
                      Nashville, TN 37206
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
