import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";

export default function RiskLevelCard({ level = "safe", crashProbability }) {
  const configs = {
    safe: {
      icon: ShieldCheck,
      label: "Low Risk",
      sublabel: "All systems normal",
      bg: "from-[#22C55E]/20 to-[#22C55E]/5",
      border: "border-[#22C55E]/20",
      iconColor: "text-[#22C55E]",
      barColor: "bg-[#22C55E]",
      barWidth: "w-1/4"
    },
    medium: {
      icon: AlertTriangle,
      label: "Medium Risk",
      sublabel: "Caution advised",
      bg: "from-[#F59E0B]/20 to-[#F59E0B]/5",
      border: "border-[#F59E0B]/20",
      iconColor: "text-[#F59E0B]",
      barColor: "bg-[#F59E0B]",
      barWidth: "w-2/3"
    },
    high: {
      icon: ShieldAlert,
      label: "High Risk",
      sublabel: "Immediate attention required",
      bg: "from-[#EF4444]/20 to-[#EF4444]/5",
      border: "border-[#EF4444]/20",
      iconColor: "text-[#EF4444]",
      barColor: "bg-[#EF4444]",
      barWidth: "w-full"
    }
  };

  const c = configs[level] || configs.safe;
  const Icon = c.icon;

  return (
    <motion.div
      layout
      className={`w-full p-4 rounded-2xl bg-gradient-to-r ${c.bg} border ${c.border} ${level === 'high' ? 'pulse-danger' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${c.iconColor}`} />
          <div>
            <p className={`text-sm font-bold ${c.iconColor}`}>{c.label}</p>
            <p className="text-white/30 text-[10px]">{c.sublabel}</p>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${c.iconColor} bg-white/5`}>
          LIVE
        </div>
      </div>
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${c.barColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: crashProbability != null ? `${crashProbability}%` : level === 'safe' ? '25%' : level === 'medium' ? '66%' : '100%' }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      {crashProbability != null && (
        <p className="text-[10px] text-white/25 mt-1.5 text-right">Crash probability: <span className="font-bold text-white/50">{crashProbability}%</span></p>
      )}
    </motion.div>
  );
}