import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, Zap, Wine, AlertTriangle, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";

const speedData = [
  { time: "9:00", speed: 45 },
  { time: "9:15", speed: 72 },
  { time: "9:30", speed: 95 },
  { time: "9:45", speed: 110 },
  { time: "10:00", speed: 85 },
  { time: "10:15", speed: 60 },
  { time: "10:30", speed: 78 },
];

const stats = [
  { icon: Wine, label: "Alcohol Attempts", value: "2", detail: "Last: Yesterday 8:15 PM", color: "#EF4444" },
  { icon: Zap, label: "Overspeed Incidents", value: "5", detail: "Max: 132 km/h on KG 7 Ave", color: "#F59E0B" },
  { icon: AlertTriangle, label: "Swerving Events", value: "3", detail: "Last: Today 9:42 AM", color: "#F59E0B" },
];

export default function DriverHistory({ onBack }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="pt-4 pb-6">
      <button onClick={onBack} className="flex items-center gap-1 text-white/40 text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h2 className="text-xl font-bold text-white mb-6">History & Analytics</h2>

      {/* Driving Score */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#2E7DFF]/15 to-[#2E7DFF]/5 border border-[#2E7DFF]/15 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-xs font-medium mb-1">DRIVING SCORE</p>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-white">87</span>
              <span className="text-[#22C55E] text-xs font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +3
              </span>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4].map(i => (
              <Star key={i} className="w-5 h-5 text-[#F59E0B]" fill="#F59E0B" />
            ))}
            <Star className="w-5 h-5 text-white/15" />
          </div>
        </div>
      </div>

      {/* Speed Chart */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/8 mb-4">
        <p className="text-white/50 text-xs font-medium mb-4">SPEED OVER TIME</p>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={speedData}>
              <defs>
                <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2E7DFF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2E7DFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} width={30} />
              <Area type="monotone" dataKey="speed" stroke="#2E7DFF" strokeWidth={2} fill="url(#speedGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Incident Cards */}
      <div className="space-y-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isOpen = expanded === index;
          return (
            <motion.div
              key={index}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : index)}
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/8 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <p className="text-white/70 text-xs font-medium">{stat.label}</p>
                      <p className="text-white text-xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/30 text-xs mt-3 pt-3 border-t border-white/5">{stat.detail}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}