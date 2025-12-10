'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type MenuItemProps = {
  text: string;
  href: string;
  className?: string;
  onClick?: () => void;
};

// Sub-components
const MenuLinkItem = ({
  text,
  href,
  className = '',
  onClick
}: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      href={href}
      className={`relative flex items-center justify-start w-full h-[80px] px-6 cursor-pointer overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Background layer for hover effect */}
      <motion.div
        className="absolute inset-0 bg-brand-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Text layer */}
      <span className={`relative z-10 font-sans font-normal text-[18px] tracking-tight transition-colors duration-200 ${isHovered ? 'text-brand-bg' : 'text-brand-dark'}`}>
        {text}
      </span>
    </Link>
  );
};

// @component: Navbar
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Animation variants
  const containerVariants = {
    collapsed: {
      height: 53,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    expanded: {
      height: 'auto',
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.1
      }
    }
  };

  // @return
  return (
    // FIX: 
    // 1. Changed 'w-[50%]' to 'w-[95%] md:w-[50%]' 
    //    (This makes it full width on mobile, centered pill on desktop)
    // 2. Changed 'top-8' to 'top-4 md:top-8' 
    //    (Moves it slightly higher on mobile to save screen real estate)
    <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[50%] max-w-[500px]">
      <motion.div
        className="relative flex flex-col items-center w-full bg-[#f3f4f6] rounded-xl overflow-hidden"
        initial="collapsed"
        animate={isOpen ? "expanded" : "collapsed"}
        variants={containerVariants}
      >
        {/* ... Rest of your code remains exactly the same ... */}
        {/* Top Navigation Bar */}
        <div className="w-full h-[53px] flex items-center justify-between px-8 shrink-0 relative z-20">

          {/* Work Button (Left) */}
          <div className="relative group cursor-pointer h-full flex items-center">
            <Link href="/case-studies" className="absolute inset-0 z-10" />
            <span className="font-mono uppercase text-[13px] tracking-[0.2em] text-brand-dark/60 select-none">
              WORK
            </span>
          </div>

          {/* Logo (Center) */}
          <div className="flex-grow flex justify-center items-center h-full">
            <Link href="/" className="relative flex justify-center items-center w-[120px] h-[30px]">
              <Image
                src="/captive-demand-logo.png"
                alt="Captive Demand"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* About Button (Right - Toggle) */}
          <div
            className="relative cursor-pointer h-full flex items-center select-none"
            onClick={toggleMenu}
          >
            <span className="font-mono uppercase text-[13px] tracking-[0.2em] text-brand-dark/60">
              ABOUT
            </span>
            {/* Invisible clickable area overlay for easier clicking */}
            <div className="absolute inset-0 z-10" />
          </div>
        </div>

        {/* Expanded Content Area */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="w-full flex flex-col"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Grid Links Section with borders */}
              <div className="w-full border-t border-brand-dark/10">
                {/* Row 1 */}
                <div className="flex w-full border-b border-brand-dark/10">
                  <div className="w-1/2 border-r border-brand-dark/10">
                    <MenuLinkItem text="Services" href="/services" onClick={() => setIsOpen(false)} />
                  </div>
                  <div className="w-1/2">
                    <MenuLinkItem text="Process & Pricing" href="/process" onClick={() => setIsOpen(false)} />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex w-full border-b border-brand-dark/10">
                  <div className="w-1/2 border-r border-brand-dark/10">
                    <MenuLinkItem text="Case Studies" href="/case-studies" onClick={() => setIsOpen(false)} />
                  </div>
                  <div className="w-1/2">
                    <MenuLinkItem text="Team" href="/team" onClick={() => setIsOpen(false)} />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex w-full border-b border-brand-dark/10">
                  <div className="w-1/2 border-r border-brand-dark/10">
                    <MenuLinkItem text="Insights" href="/insights" onClick={() => setIsOpen(false)} />
                  </div>
                  <div className="w-1/2">
                    <MenuLinkItem text="Client Portal" href="/portal" onClick={() => setIsOpen(false)} />
                  </div>
                </div>
              </div>

              {/* Contact Info & Address Section */}
              <div className="w-full px-8 py-8 flex flex-col gap-8">
                {/* Contact Info */}
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

                {/* Address Section */}
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
