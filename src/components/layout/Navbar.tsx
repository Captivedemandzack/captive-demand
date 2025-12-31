'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react'; // Import for the arrow icon

// --- NEW SERVICE SUBMENU OPTIONS ---
const serviceSubMenu = [
  { text: "Website", href: "/services/website" },
  { text: "SEO", href: "/services/seo" },
  { text: "Email", href: "/services/email" },
  { text: "Software", href: "/services/software" },
  { text: "Automation", href: "/services/automation" },
];

// Types
type MenuItemProps = {
  text: string;
  href: string;
  className?: string;
  onClick?: () => void;
  hasSubMenu?: boolean; // New prop
  isSubMenuOpen?: boolean; // New prop
  toggleSubMenu?: () => void; // New prop
};

// Sub-components
const MenuLinkItem = ({
  text,
  href,
  className = '',
  onClick,
  hasSubMenu = false,
  isSubMenuOpen = false,
  toggleSubMenu
}: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const LinkContent = (
    <div className="relative flex items-center justify-start w-full h-[80px] px-6 cursor-pointer overflow-hidden group">
      {/* Background layer for hover effect */}
      <motion.div
        className="absolute inset-0 bg-brand-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered || isSubMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Text layer */}
      <span className={`relative z-10 font-sans font-normal text-[18px] tracking-tight transition-colors duration-200 ${isHovered || isSubMenuOpen ? 'text-brand-bg' : 'text-brand-dark'}`}>
        {text}
      </span>

      {/* Chevron Icon for Submenu */}
      {hasSubMenu && (
        <ChevronRight
          className={`absolute right-6 transition-transform duration-300 ${isSubMenuOpen ? 'rotate-90' : 'rotate-0'} ${isHovered || isSubMenuOpen ? 'text-brand-bg' : 'text-brand-dark'}`}
          size={20}
        />
      )}
    </div>
  );

  if (hasSubMenu) {
    // If it has a submenu, it's a button/div to toggle the menu
    return (
      <div
        onClick={toggleSubMenu} // Use the toggle function passed down
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={className}
      >
        {LinkContent}
      </div>
    );
  } else {
    // Regular Link item
    return (
      <Link
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className={className}
      >
        {LinkContent}
      </Link>
    );
  }
};

// Sub-component for the nested menu links
const SubMenuItem = ({ text, href, onClick }: MenuItemProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative flex items-center w-full h-10 pl-10 pr-6 text-brand-bg hover:bg-white/10 transition-colors duration-200 text-[16px] font-normal"
    >
      {text}
    </Link>
  );
};

// @component: Navbar
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // NEW STATE: To track if the Services submenu is open
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Close the submenu if the main menu closes
    if (isOpen) {
      setIsServicesOpen(false);
    }
  };

  const closeAllMenus = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  // Function to toggle the Services submenu
  const toggleServicesSubMenu = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  // Animation variants
  // NOTE: The height calculation is now much more complex and should be based
  // on content, but for this example, we'll keep the auto height for spring
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
      height: 'auto', // Keep 'auto' for dynamic height based on content
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  };

  // @return
  return (
    <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[50%] max-w-[500px]">
      <motion.div
        className="relative flex flex-col items-center w-full bg-[#f3f4f6] rounded-xl overflow-hidden"
        initial="collapsed"
        animate={isOpen ? "expanded" : "collapsed"}
        variants={containerVariants}
      >
        {/* Top Navigation Bar */}
        <div className="w-full h-[53px] flex items-center justify-between px-8 shrink-0 relative z-20">
          {/* Work Button (Left) */}
          <div className="relative group cursor-pointer h-full flex items-center">
            {/* IMPORTANT: Use closeAllMenus on navigation links */}
            <Link href="/case-studies" className="absolute inset-0 z-10" onClick={closeAllMenus} />
            <span className="font-mono uppercase text-[13px] tracking-[0.2em] text-brand-dark/60 select-none">
              WORK
            </span>
          </div>

          {/* Logo (Center) */}
          <div className="flex-grow flex justify-center items-center h-full">
            {/* IMPORTANT: Use closeAllMenus on navigation links */}
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

          {/* About Button (Right - Toggle) */}
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
              variants={{ // Use the same content variants from original code
                hidden: { opacity: 0, transition: { duration: 0.2 } },
                visible: { opacity: 1, transition: { duration: 0.4, delay: 0.1 } }
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Grid Links Section with borders */}
              <div className="w-full border-t border-brand-dark/10">
                {/* Row 1 - Services & Process */}
                <div className="flex w-full border-b border-brand-dark/10">
                  {/* Services Column */}
                  <div className={`w-1/2 border-r border-brand-dark/10 ${isServicesOpen ? 'bg-brand-dark' : ''}`}>
                    {/* Services Menu Item (The one that opens the submenu) */}
                    <MenuLinkItem
                      text="Services"
                      href="/services" // Placeholder, but toggleSubMenu handles click
                      hasSubMenu={true} // New prop to indicate submenu
                      isSubMenuOpen={isServicesOpen} // New prop for visual state
                      toggleSubMenu={toggleServicesSubMenu} // New toggle function
                    />

                    {/* Submenu Links (Conditional Rendering) */}
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
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Process & Pricing Column (Unchanged) */}
                  <div className="w-1/2">
                    <MenuLinkItem text="Process & Pricing" href="/process" onClick={closeAllMenus} />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex w-full border-b border-brand-dark/10">
                  <div className="w-1/2 border-r border-brand-dark/10">
                    <MenuLinkItem text="Case Studies" href="/case-studies" onClick={closeAllMenus} />
                  </div>
                  <div className="w-1/2">
                    <MenuLinkItem text="Team" href="/team" onClick={closeAllMenus} />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex w-full border-b border-brand-dark/10">
                  <div className="w-1/2 border-r border-brand-dark/10">
                    <MenuLinkItem text="Insights" href="/insights" onClick={closeAllMenus} />
                  </div>
                  <div className="w-1/2">
                    <MenuLinkItem text="Client Portal" href="/portal" onClick={closeAllMenus} />
                  </div>
                </div>
              </div>

              {/* Contact Info & Address Section (Unchanged) */}
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