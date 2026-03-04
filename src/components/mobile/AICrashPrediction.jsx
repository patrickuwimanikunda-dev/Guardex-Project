import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, AlertTriangle, TrendingUp } from "lucide-react";

const riskFactors = [
  { label: "Speed Pattern", value: 72, color: "#F59E0B" },
  { label: "Time of Day", value: 45, color: "#2E7DFF" },
  { label: "Road Conditions", value: 38, color: "#22C55E" },
  { label: "Driver Fatigue", value: 60, color: "#EF4444" },
  { label: "Weather Impact", value: 25, color: "#A855F7" },
];

export default function AICrashPrediction({ onBack }) {
  const crashProb = 23;

  return (
    <div className="pt-4 pb-6">
      <button onClick={onBack} className="flex items-center gap-1 text-white/40 text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex items-center gap-2 mb-8">
        <Brain className="w-5 h-5 text-[#A855F7]" />
        <h2 className="text-xl font-bold text-white">AI Crash Prediction</h2>
      </div>

      {/* Probability circle */}
      <div className="flex justify-center mb-8">
        <div className="relative w-44 h-44">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
            <motion.circle
              cx="100" cy="100" r="85"
              fill="none"
              stroke={crashProb > 50 ? "#EF4444" : crashProb > 30 ? "#F59E0B" : "#22C55E"}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 85}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 85 * (1 - crashProb / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold text-white"
            >
              {crashProb}%
            </motion.span>
            <span className="text-white/30 text-xs font-medium">Crash Risk</span>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/8 mb-4">
        <p className="text-white/50 text-xs font-medium mb-4">CONTRIBUTING FACTORS</p>
        <div className="space-y-4">
          {riskFactors.map((factor, index) => (
            <motion.div
              key={factor.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white/60 text-xs">{factor.label}</span>
                <span className="text-white/40 text-xs font-semibold">{factor.value}%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: factor.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${factor.value}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Warning */}
      <div className="p-4 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[#F59E0B] text-sm font-semibold mb-1">Predictive Warning</p>
            <p className="text-white/40 text-xs leading-relaxed">
              Based on current driving patterns and environmental factors, the AI model suggests reducing speed and increasing following distance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}