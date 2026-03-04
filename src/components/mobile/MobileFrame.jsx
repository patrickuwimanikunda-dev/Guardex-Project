import React from "react";

export default function MobileFrame({ children }) {
  return (
    <div className="w-[390px] min-h-[844px] mx-auto bg-[#0A1628] relative overflow-hidden rounded-[40px] shadow-2xl border border-white/10">
      {/* Status bar */}
      <div className="flex justify-between items-center px-8 pt-3 pb-1 text-white/70 text-xs font-medium z-50 relative">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-2.5 border border-white/50 rounded-sm relative">
            <div className="absolute inset-0.5 bg-white/60 rounded-[1px]" style={{ width: '70%' }} />
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 relative" style={{ minHeight: '800px' }}>
        {children}
      </div>
    </div>
  );
}