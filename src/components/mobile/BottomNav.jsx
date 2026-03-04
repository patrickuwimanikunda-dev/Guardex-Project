import React from "react";
import { LayoutDashboard, Activity, History, User } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Activity, label: "Monitor", id: "monitor" },
  { icon: History, label: "History", id: "history" },
  { icon: User, label: "Profile", id: "profile" },
];

export default function BottomNav({ active = "dashboard", onNavigate }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#0A1628]/90 backdrop-blur-xl border-t border-white/8">
      <div className="flex justify-around items-center py-3 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className="flex flex-col items-center gap-1 transition-all duration-200"
            >
              <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-[#2E7DFF]/20' : ''}`}>
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#2E7DFF]' : 'text-white/40'}`} />
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-[#2E7DFF]' : 'text-white/30'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Home indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-white/20 rounded-full" />
      </div>
    </div>
  );
}