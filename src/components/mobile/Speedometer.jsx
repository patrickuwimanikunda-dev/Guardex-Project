import React from "react";
import { motion } from "framer-motion";

export default function Speedometer({ speed = 0, maxSpeed = 180 }) {
  const percentage = Math.min(speed / maxSpeed, 1);
  const circumference = 2 * Math.PI * 80;
  const activeArc = circumference * 0.75;
  const offset = activeArc - (activeArc * percentage);
  
  const getColor = () => {
    if (percentage < 0.5) return "#22C55E";
    if (percentage < 0.75) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div className="relative w-52 h-52 mx-auto">
      {/* Glow effect */}
      <div 
        className="absolute inset-4 rounded-full blur-2xl opacity-20"
        style={{ backgroundColor: getColor() }}
      />
      
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-[135deg]">
        {/* Background track */}
        <circle
          cx="100" cy="100" r="80"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${activeArc} ${circumference}`}
        />
        {/* Active arc */}
        <motion.circle
          cx="100" cy="100" r="80"
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${activeArc} ${circumference}`}
          initial={{ strokeDashoffset: activeArc }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {/* Tick marks */}
        {Array.from({ length: 19 }).map((_, i) => {
          const angle = (i * (270 / 18)) * (Math.PI / 180);
          const r1 = 68;
          const r2 = i % 3 === 0 ? 62 : 65;
          return (
            <line
              key={i}
              x1={100 + r1 * Math.cos(angle)}
              y1={100 + r1 * Math.sin(angle)}
              x2={100 + r2 * Math.cos(angle)}
              y2={100 + r2 * Math.sin(angle)}
              stroke={i % 3 === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}
              strokeWidth={i % 3 === 0 ? 2 : 1}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      
      {/* Center display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          key={speed}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-5xl font-bold text-white tabular-nums"
        >
          {speed}
        </motion.span>
        <span className="text-white/30 text-xs font-medium tracking-widest mt-1">KM/H</span>
      </div>
    </div>
  );
}