import React from "react";
import { Bell, Search } from "lucide-react";

const roleConfig = {
  police: { label: "Police Officer", sub: "Operational Monitoring", icon: "🚔", color: "#2E7DFF" },
  government: { label: "Gov. Authority", sub: "Strategic Analytics", icon: "🏛️", color: "#22C55E" },
  admin: { label: "System Admin", sub: "Full System Control", icon: "⚙️", color: "#A855F7" },
};

export default function DashboardTopBar({ role = "police", alertCount = 3 }) {
  const rc = roleConfig[role] || roleConfig.police;

  return (
    <div className="h-16 bg-[#0A1628]/60 backdrop-blur-xl border-b border-white/6 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-white/25 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search vehicles, drivers..."
            className="h-10 pl-10 pr-4 w-80 rounded-xl bg-white/5 border border-white/8 text-white/70 text-sm placeholder:text-white/20 focus:outline-none focus:border-[#2E7DFF]/30 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Live indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">
          <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-white/40 text-xs font-medium">Live</span>
        </div>

        <button className="relative p-2.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 transition-colors">
          <Bell className="w-4 h-4 text-white/50" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] rounded-full flex items-center justify-center text-[9px] text-white font-bold">
              {alertCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/8">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
            style={{ backgroundColor: `${rc.color}18` }}
          >
            {rc.icon}
          </div>
          <div>
            <p className="text-white/70 text-xs font-semibold">{rc.label}</p>
            <p className="text-white/25 text-[10px]">{rc.sub}</p>
          </div>
        </div>
      </div>
    </div>
  );
}