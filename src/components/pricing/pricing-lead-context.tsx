'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type PricingModalTier = 'launch' | 'scale' | 'enterprise' | 'custom';

type PricingLeadContextValue = {
  openModal: (tier: PricingModalTier) => void;
  closeModal: () => void;
  isOpen: boolean;
  initialTier: PricingModalTier;
};

const PricingLeadContext = createContext<PricingLeadContextValue | null>(null);

export function PricingLeadProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialTier, setInitialTier] = useState<PricingModalTier>('scale');

  const openModal = useCallback((tier: PricingModalTier) => {
    setInitialTier(tier);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
      isOpen,
      initialTier,
    }),
    [openModal, closeModal, isOpen, initialTier],
  );

  return <PricingLeadContext.Provider value={value}>{children}</PricingLeadContext.Provider>;
}

export function usePricingLeadOptional() {
  return useContext(PricingLeadContext);
}

export function usePricingLead() {
  const ctx = useContext(PricingLeadContext);
  if (!ctx) throw new Error('usePricingLead requires PricingLeadProvider');
  return ctx;
}
