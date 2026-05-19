'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';

const STORAGE_KEY = 'shore-partnership-exit-intent-shown';

function hasShownThisSession(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function markShownThisSession(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* ignore */
  }
}

export function ShoreExitIntentModal() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const triggeredRef = useRef(false);

  const dismiss = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (hasShownThisSession()) return;

    const onMouseOut = (e: MouseEvent) => {
      if (triggeredRef.current || hasShownThisSession()) return;
      if (e.clientY > 8) return;
      if (e.relatedTarget instanceof Node) return;

      triggeredRef.current = true;
      markShownThisSession();
      setOpen(true);
      document.documentElement.removeEventListener('mouseout', onMouseOut);
    };

    document.documentElement.addEventListener('mouseout', onMouseOut);
    return () => document.documentElement.removeEventListener('mouseout', onMouseOut);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="shore-exit-backdrop"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-6 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.25 }}
          onClick={dismiss}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="shore-exit-title"
            aria-describedby="shore-exit-desc"
            className="relative w-full max-w-lg rounded-2xl border border-[#1a1512]/8 bg-[#FAFAFA] px-8 pb-8 pt-10 shadow-2xl sm:px-10 sm:pb-10 sm:pt-12"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8, filter: reduceMotion ? 'none' : 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 4, filter: reduceMotion ? 'none' : 'blur(2px)' }}
            transition={{ type: 'spring', duration: reduceMotion ? 0.01 : 0.45, bounce: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full text-[#1a1512]/50 transition-colors duration-150 hover:bg-[#1a1512]/5 hover:text-[#1a1512] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1512]/20"
              aria-label="Close dialog"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8480C]">Shore partners only</p>
            <h2
              id="shore-exit-title"
              className="mt-4 max-w-[18ch] text-balance text-2xl leading-tight tracking-tight text-[#1a1512] sm:text-[1.75rem]"
              style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
            >
              Before you go: free website audit
            </h2>
            <p
              id="shore-exit-desc"
              className="mt-6 max-w-prose text-pretty font-mono text-sm leading-relaxed text-[#1a1512]/65"
            >
              Complimentary for Shore portfolio partners only. List multiple sites and get a prioritized fix list, not a
              pitch deck.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="#free-audit"
                onClick={dismiss}
                className="inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-full bg-[#1a1512] px-8 font-mono text-xs uppercase tracking-[0.12em] text-white transition-transform duration-150 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1512]/30 focus-visible:ring-offset-2"
              >
                Request free audit
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-full border border-[#1a1512]/12 bg-white px-8 font-mono text-xs uppercase tracking-[0.12em] text-[#1a1512]/70 transition-colors duration-150 hover:bg-[#1a1512]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1512]/20 focus-visible:ring-offset-2"
              >
                Continue browsing
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
