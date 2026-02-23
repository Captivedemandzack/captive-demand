import React from 'react';

interface MockBrowserWindowProps {
  children: React.ReactNode;
}

export default function MockBrowserWindow({ children }: MockBrowserWindowProps) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border border-[#1a1512]/5">
      {/* Header Bar */}
      <div className="h-8 bg-[#1a1512]/5 flex items-center px-4">
        {/* Window Controls */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#1a1512]/20" />
          <div className="w-3 h-3 rounded-full bg-[#1a1512]/20" />
          <div className="w-3 h-3 rounded-full bg-[#1a1512]/20" />
        </div>
      </div>
      
      {/* Content Area */}
      <div className="w-full h-[calc(100%-2rem)] overflow-hidden">
        {children}
      </div>
    </div>
  );
}
