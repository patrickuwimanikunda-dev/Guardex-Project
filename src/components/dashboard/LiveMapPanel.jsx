import React from "react";
import { motion } from "framer-motion";
import { MapPin, Maximize2 } from "lucide-react";

const mockVehicles = [
  { id: 1, plate: "RAD 234 A", x: 45, y: 35, risk: "safe" },
  { id: 2, plate: "RAB 712 C", x: 62, y: 52, risk: "medium" },
  { id: 3, plate: "RAC 189 B", x: 30, y: 60, risk: "high" },
  { id: 4, plate: "RAD 445 D", x: 72, y: 28, risk: "safe" },
  { id: 5, plate: "RAE 331 A", x: 55, y: 70, risk: "safe" },
  { id: 6, plate: "RAF 892 B", x: 38, y: 45, risk: "medium" },
  { id: 7, plate: "RAG 117 C", x: 80, y: 55, risk: "safe" },
];

const riskDot = {
  safe: "bg-[#22C55E]",
  medium: "bg-[#F59E0B]",
  high: "bg-[#EF4444] pulse-danger",
};

export default function LiveMapPanel({ onVehicleClick }) {
  return (
    <div className="rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#2E7DFF]" />
          <h3 className="text-white/80 text-sm font-semibold">Live Vehicle Map — Rwanda</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {["Safe", "Medium", "High Risk"].map((label, i) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${["bg-[#22C55E]", "bg-[#F59E0B]", "bg-[#EF4444]"][i]}`} />
                <span className="text-white/25 text-[10px]">{label}</span>
              </div>
            ))}
          </div>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/8 transition-colors">
            <Maximize2 className="w-3.5 h-3.5 text-white/30" />
          </button>
        </div>
      </div>
      
      {/* Map area */}
      <div className="relative h-[400px] bg-[#0A1628]">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 20 }).map((_, i) => (
            <React.Fragment key={i}>
              <div className="absolute h-px bg-white w-full" style={{ top: `${(i + 1) * 5}%` }} />
              <div className="absolute w-px bg-white h-full" style={{ left: `${(i + 1) * 5}%` }} />
            </React.Fragment>
          ))}
        </div>
        
        {/* Rwanda outline (simplified) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path
            d="M25,15 L75,12 L85,35 L80,60 L70,80 L40,85 L20,70 L15,40 Z"
            fill="rgba(46,125,255,0.05)"
            stroke="rgba(46,125,255,0.15)"
            strokeWidth="0.5"
          />
        </svg>

        {/* Vehicle markers */}
        {mockVehicles.map((v) => (
          <motion.button
            key={v.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: v.id * 0.1, type: "spring" }}
            onClick={() => onVehicleClick?.(v)}
            className="absolute group"
            style={{ left: `${v.x}%`, top: `${v.y}%`, transform: 'translate(-50%,-50%)' }}
          >
            <div className={`w-4 h-4 rounded-full ${riskDot[v.risk]} border-2 border-[#0A1628] cursor-pointer hover:scale-150 transition-transform`} />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <span className="text-white text-[9px] font-medium">{v.plate}</span>
            </div>
          </motion.button>
        ))}

        {/* Kigali label */}
        <div className="absolute left-[50%] top-[42%] flex items-center gap-1">
          <span className="text-white/15 text-[10px] font-medium">KIGALI</span>
        </div>
      </div>
    </div>
  );
}