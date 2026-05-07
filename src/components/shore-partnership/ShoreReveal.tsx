'use client';

import { useReducedMotion } from 'framer-motion';
import { motion } from 'framer-motion';

const easePowerOut = [0.215, 0.61, 0.355, 1] as [number, number, number, number];

interface ShoreRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ShoreReveal({ children, className, delay = 0 }: ShoreRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px', amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.58,
        delay: reduceMotion ? 0 : delay,
        ease: easePowerOut,
      }}
    >
      {children}
    </motion.div>
  );
}
