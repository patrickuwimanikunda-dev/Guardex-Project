import React from "react";
import { motion } from "framer-motion";
import { Brain, TrendingUp, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const trendData = [
  { day: "Mon", probability: 15 },
  { day: "Tue", probability: 22 },
  { day: "Wed", probability: 18 },
  { day: "Thu", probability: 30 },
  { day: "Fri", probability: 45 },
  { day: "Sat", probability: 38 },
  { day: "Sun", probability: 28 },
];

const factors = [
  { label: "Aggregate Speed Pattern", value: 62, color: "#F59E0B" },
  { label: "Alcohol Violation Rate", value: 45, color: "#EF4444" },
  { label: "Time-of-Day Risk", value: 55, color: "#2E7DFF" },
  { label: "Weather Conditions", value: 30, color: "#A855F7" },
  { label: "Road Infrastructure", value: 38, color: "#22C55E" },
  { label: "Driver Fatigue Index", value: 50, color: "#F97316" },
];

export default function AIPredictionPanel() {
  const overallProbability = 23;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Probability display */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 flex flex-col items-center justify-center">
          <Brain className="w-8 h-8 text-[#A855F7] mb-4" />
          <div className="relative w-36 h-36 mb-4">
            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
              <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="12" />
              <motion.circle
                cx="100" cy="100" r="85"
                fill="none"
                stroke="#A855F7"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 85}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 85 * (1 - overallProbability / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">{overallProbability}%</span>
              <span className="text-white/30 text-xs">Crash Risk</span>
            </div>
          </div>
          <p className="text-white/40 text-xs text-center">National average crash probability based on real-time data</p>
        </div>

        {/* Trend */}
        <div className="col-span-2 rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#A855F7]" />
            <h3 className="text-white/80 text-sm font-semibold">Predictive Trend — Weekly</h3>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#0F2241', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontSize: 12 }} />
                <Area type="monotone" dataKey="probability" stroke="#A855F7" strokeWidth={2} fill="url(#predGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk factors */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
          <h3 className="text-white/80 text-sm font-semibold">Contributing Risk Factors</h3>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          {factors.map((factor, index) => (
            <motion.div
              key={factor.label}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white/50 text-xs">{factor.label}</span>
                <span className="text-white/30 text-xs font-semibold">{factor.value}%</span>
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
    </div>
  );
}