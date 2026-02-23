import React from 'react';

interface GlassDocumentFrameProps {
  children: React.ReactNode;
}

export default function GlassDocumentFrame({ children }: GlassDocumentFrameProps) {
  return (
    <div className="w-full h-full relative">
      {/* Document Container with A4-like ratio */}
      <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        
        {/* Orange Header Line - Brand Accent */}
        <div className="w-full h-1 bg-[#ff5501] flex-shrink-0" />
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4">
          {children}
        </div>
        
        {/* Subtle Paper Texture Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a1512' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>
    </div>
  );
}
