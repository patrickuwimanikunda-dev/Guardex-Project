import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Wine, Zap, Smartphone, Clock } from "lucide-react";

const mockAlerts = [
  { id: 1, type: "overspeed", plate: "RAC 189 B", message: "Speed 142 km/h on KG 7 Ave", time: "1 min ago", severity: "critical" },
  { id: 2, type: "alcohol", plate: "RAB 712 C", message: "Alcohol detected — engine blocked", time: "5 min ago", severity: "critical" },
  { id: 3, type: "phone_usage", plate: "RAF 892 B", message: "Phone usage while driving", time: "12 min ago", severity: "medium" },
  { id: 4, type: "swerving", plate: "RAC 189 B", message: "Lane deviation detected", time: "18 min ago", severity: "medium" },
  { id: 5, type: "overspeed", plate: "RAD 445 D", message: "Speed 118 km/h in 80 zone", time: "25 min ago", severity: "medium" },
];

const typeIcons = {
  overspeed: Zap,
  alcohol: Wine,
  phone_usage: Smartphone,
  swerving: AlertTriangle,
};

const sevColors = {
  critical: { bg: "bg-[#EF4444]/10", border: "border-[#EF4444]/15", text: "text-[#EF4444]" },
  medium: { bg: "bg-[#F59E0B]/10", border: "border-[#F59E0B]/15", text: "text-[#F59E0B]" },
};

export default function AlertFeed() {
  return (
    <div className="rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] h-full">
      <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
        <h3 className="text-white/80 text-sm font-semibold">Live Alerts</h3>
        <span className="text-[#EF4444] text-xs font-semibold">{mockAlerts.length} active</span>
      </div>
      <div className="p-3 space-y-2 max-h-[360px] overflow-y-auto">
        {mockAlerts.map((alert, index) => {
          const Icon = typeIcons[alert.type] || AlertTriangle;
          const sev = sevColors[alert.severity] || sevColors.medium;
          return (
            <motion.div
              key={alert.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.06 }}
              className={`p-3 rounded-xl ${sev.bg} border ${sev.border} cursor-pointer hover:bg-opacity-20 transition-all`}
            >
              <div className="flex items-start gap-2.5">
                <Icon className={`w-4 h-4 ${sev.text} flex-shrink-0 mt-0.5`} strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-white/70 text-xs font-semibold">{alert.plate}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-white/20" />
                      <span className="text-white/20 text-[10px]">{alert.time}</span>
                    </div>
                  </div>
                  <p className={`text-xs ${sev.text} opacity-80`}>{alert.message}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}