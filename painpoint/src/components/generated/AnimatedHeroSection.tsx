import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

// Custom Glitch Text Component
const GlitchText = ({
  text
}: {
  text: string;
}) => {
  return <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-black opacity-0 group-hover:opacity-50 animate-pulse translate-x-[2px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-black opacity-0 group-hover:opacity-50 animate-pulse -translate-x-[2px] delay-75">
        {text}
      </span>
    </div>;
};

// Alert Icon Component replicating the mask effect
const AlertIcon = () => <div className="flex-shrink-0 w-5 h-5 bg-[#FF9500] flex items-center justify-center relative overflow-hidden">
    <AlertTriangle size={14} className="text-[#F3F3F3] fill-[#F3F3F3] stroke-[#F3F3F3]" strokeWidth={3} />
  </div>;
type AlertCardProps = {
  text: string;
  position: string;
  delay?: number;
};
const AlertCard = ({
  text,
  position,
  delay = 0
}: AlertCardProps) => {
  return <motion.div initial={{
    opacity: 0,
    scale: 0.9,
    y: 20
  }} animate={{
    opacity: 1,
    scale: 1,
    y: 0
  }} transition={{
    duration: 0.8,
    delay: delay,
    ease: [0.16, 1, 0.3, 1]
  }} className={`absolute hidden md:flex items-center gap-3 bg-[#F3F3F3] p-3.5 pr-6 w-[430px] max-w-full z-20 hover:scale-[1.02] transition-transform duration-200 cursor-default ${position}`}>
      <AlertIcon />
      <p className="font-medium text-[#131313] text-lg leading-tight tracking-tight">
        {text}
      </p>
    </motion.div>;
};

// Mobile version of the card
const MobileAlertCard = ({
  text
}: {
  text: string;
}) => <div className="flex items-center gap-3 bg-[#F3F3F3] p-4 w-full max-w-md mx-auto">
    <AlertIcon />
    <p className="font-medium text-[#131313] text-lg leading-tight tracking-tight">
      {text}
    </p>
  </div>;

// @component: AnimatedHeroSection
export const AnimatedHeroSection = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // @return
  return <div className="w-full min-h-[600px] md:h-[900px] bg-white flex flex-col items-center justify-center relative overflow-hidden px-4 py-12 md:py-0 font-sans">
      
      {/* Background Grid/Decorations could go here if needed, but keeping it clean white as per image */}
      
      {/* Central Heading */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 1,
      delay: 0.2
    }} className="z-10 relative text-center max-w-4xl mx-auto mb-12 md:mb-0">
        <h2 className="text-4xl md:text-6xl font-bold text-[#131313] leading-[1.1] md:leading-none tracking-tight">
          Eliminate the bottlenecks <br className="hidden md:block" />
          that hold you back
        </h2>
      </motion.div>

      {/* Desktop Absolute Positioned Alerts */}
      <div className="absolute inset-0 w-full max-w-[1240px] mx-auto pointer-events-none md:pointer-events-auto">
        <AlertCard text="Teams spend too much time on repetitive tasks." position="top-[20%] left-[5%] lg:left-[15%]" delay={0.6} />
        
        <AlertCard text="Leads slip away without consistent follow-up." position="top-[25%] right-[5%] lg:right-[10%]" delay={0.8} />
        
        <AlertCard text="Outdated workflows hurt customer experience." position="bottom-[25%] left-[10%] lg:left-[20%]" delay={1.0} />
        
        <AlertCard text="Scaling requires more people and higher costs." position="bottom-[20%] right-[10%] lg:right-[15%]" delay={1.2} />
      </div>

      {/* Mobile Stacked Alerts */}
      <div className="md:hidden flex flex-col gap-4 w-full mt-8">
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.6
      }}>
          <MobileAlertCard text="Teams spend too much time on repetitive tasks." />
        </motion.div>
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.7
      }}>
          <MobileAlertCard text="Leads slip away without consistent follow-up." />
        </motion.div>
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.8
      }}>
          <MobileAlertCard text="Outdated workflows hurt customer experience." />
        </motion.div>
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.9
      }}>
          <MobileAlertCard text="Scaling requires more people and higher costs." />
        </motion.div>
      </div>

      {/* Subtle Glitch Effect Overlay (Optional aesthetic touch) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    </div>;
};