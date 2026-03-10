'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface InsightBodyProps {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function InsightBody({ content }: InsightBodyProps) {
  return (
    <div className="insight-body prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => {
            const text = String(children);
            const id = slugify(text);
            return (
              <h2
                id={id}
                className="font-sans text-[26px] font-bold text-[#111] mt-10 mb-4 scroll-mt-32"
              >
                {children}
              </h2>
            );
          },
          h3: ({ children }) => (
            <h3 className="font-sans text-[20px] font-semibold text-[#111] mt-8 mb-3">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="font-mono text-[15px] leading-[1.8] text-[#444] mb-5">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-[#111]">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[#E8480C] underline underline-offset-[3px] hover:no-underline"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="font-mono text-[15px] text-[#444] pl-6 my-5 list-disc">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="font-mono text-[15px] text-[#444] pl-6 my-5 list-decimal">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="mb-2 leading-[1.7]">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#E8480C] pl-5 pr-5 py-3 bg-[#fafafa] my-8 rounded-r-lg">
              {children}
            </blockquote>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt ?? ''}
              className="w-full rounded-[10px] my-8"
            />
          ),
          hr: () => (
            <hr className="border-none border-t border-[#e8e8e8] my-10" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
