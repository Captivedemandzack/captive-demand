'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import {
  AuditRequestModal,
  type AuditRequestModalProps,
} from '@/components/shore-partnership/AuditRequestModal';

type AuditModalOptions = Pick<
  AuditRequestModalProps,
  'analyticsLeadSource' | 'analyticsFormName' | 'portfolioPlaceholder' | 'successMessage'
>;

interface AuditRequestModalContextValue {
  openAuditModal: (options?: AuditModalOptions) => void;
  closeAuditModal: () => void;
}

const AuditRequestModalContext = createContext<AuditRequestModalContextValue | null>(null);

export function AuditRequestModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<AuditModalOptions>({});

  const openAuditModal = useCallback((nextOptions?: AuditModalOptions) => {
    setOptions(nextOptions ?? {});
    setOpen(true);
  }, []);

  const closeAuditModal = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ openAuditModal, closeAuditModal }),
    [openAuditModal, closeAuditModal],
  );

  return (
    <AuditRequestModalContext.Provider value={value}>
      {children}
      <AuditRequestModal
        open={open}
        onOpenChange={setOpen}
        variant="full"
        formSource="audit-form"
        recaptchaAction="shore_audit_form"
        analyticsLeadSource={options.analyticsLeadSource ?? 'homepage_audit'}
        analyticsFormName={options.analyticsFormName ?? 'audit-form'}
        portfolioPlaceholder={options.portfolioPlaceholder}
        successMessage={options.successMessage}
      />
    </AuditRequestModalContext.Provider>
  );
}

export function useAuditRequestModal(): AuditRequestModalContextValue {
  const ctx = useOptionalAuditRequestModal();
  if (!ctx) {
    throw new Error('useAuditRequestModal must be used within AuditRequestModalProvider');
  }
  return ctx;
}

export function useOptionalAuditRequestModal(): AuditRequestModalContextValue | null {
  return useContext(AuditRequestModalContext);
}
