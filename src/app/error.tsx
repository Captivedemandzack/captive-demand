'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-container-px py-24 text-center">
      <div className="max-w-md space-y-2">
        <h1 className="font-nohemi text-h2 text-[#1a1512] text-balance">Something went wrong</h1>
        <p className="text-body text-pretty text-[#1a1512]/75">
          This page hit an unexpected error. Check the terminal running{' '}
          <span className="font-mono text-sm">next dev</span> for the stack trace.
        </p>
        {process.env.NODE_ENV === 'development' && error.message ? (
          <pre className="mt-4 max-h-40 overflow-auto rounded-xl border border-[#e8e8e8] bg-[#f6f5f6] p-4 text-left font-mono text-xs text-[#1a1512]/90">
            {error.message}
          </pre>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-[#1a1512] px-8 py-3 font-medium text-[#FAF9F6] transition-transform hover:scale-105"
      >
        Try again
      </button>
    </div>
  );
}
