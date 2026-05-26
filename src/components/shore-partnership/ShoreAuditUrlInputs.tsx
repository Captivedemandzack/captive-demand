'use client';

import { SITE_FORM_INPUT_CLASS, SITE_FORM_LABEL_CLASS } from '@/lib/site-surfaces';
import { cn } from '@/lib/utils';

interface ShoreAuditUrlInputsProps {
  urls: string[];
  onChange: (urls: string[]) => void;
  idPrefix?: string;
  compact?: boolean;
}

export function ShoreAuditUrlInputs({
  urls,
  onChange,
  idPrefix = 'audit-url',
  compact = false,
}: ShoreAuditUrlInputsProps) {
  const updateUrl = (index: number, value: string) => {
    const next = [...urls];
    next[index] = value;
    onChange(next);
  };

  const addUrl = () => onChange([...urls, '']);

  const removeUrl = (index: number) => {
    if (urls.length <= 1) return;
    onChange(urls.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <span className={SITE_FORM_LABEL_CLASS}>Site URLs</span>
      {urls.map((url, index) => (
        <div key={`${idPrefix}-${index}`} className="flex items-center gap-2">
          <input
            id={`${idPrefix}-${index}`}
            type="url"
            required={index === 0}
            value={url}
            onChange={(e) => updateUrl(index, e.target.value)}
            className={cn(SITE_FORM_INPUT_CLASS, 'min-w-0 flex-1')}
            placeholder={`https://site-${index + 1}.com`}
          />
          {index > 0 ? (
            <button
              type="button"
              onClick={() => removeUrl(index)}
              className="shrink-0 font-mono text-[15px] text-[#1a1512]/50 underline-offset-2 transition-colors duration-150 hover:text-[#1a1512] hover:underline"
            >
              Remove
            </button>
          ) : null}
        </div>
      ))}
      <button
        type="button"
        onClick={addUrl}
        className={cn(
          'inline-flex items-center rounded-full border border-[#1a1512] bg-transparent font-mono uppercase tracking-[0.1em] text-[#1a1512] transition-colors duration-150 hover:bg-[#1a1512]/5',
          compact ? 'px-3 py-1.5 text-[13px]' : 'px-4 py-2 text-[13px]',
        )}
      >
        + Add another site
      </button>
    </div>
  );
}
