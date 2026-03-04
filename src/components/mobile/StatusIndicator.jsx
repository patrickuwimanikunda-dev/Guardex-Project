import React from "react";

export default function StatusIndicator({ icon: Icon, label, status = "safe", value }) {
  const colors = {
    safe: { bg: "bg-[#22C55E]/10", border: "border-[#22C55E]/20", text: "text-[#22C55E]", dot: "bg-[#22C55E]" },
    warning: { bg: "bg-[#F59E0B]/10", border: "border-[#F59E0B]/20", text: "text-[#F59E0B]", dot: "bg-[#F59E0B]" },
    danger: { bg: "bg-[#EF4444]/10", border: "border-[#EF4444]/20", text: "text-[#EF4444]", dot: "bg-[#EF4444]" },
  };

  const c = colors[status] || colors.safe;

  return (
    <div className={`flex-1 p-3 rounded-2xl ${c.bg} border ${c.border}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        <Icon className={`w-4 h-4 ${c.text}`} strokeWidth={1.5} />
      </div>
      <p className="text-white/60 text-[10px] font-medium mb-0.5">{label}</p>
      <p className={`text-xs font-semibold ${c.text}`}>{value}</p>
    </div>
  );
}