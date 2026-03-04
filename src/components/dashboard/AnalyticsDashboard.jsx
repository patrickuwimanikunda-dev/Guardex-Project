import React from "react";
import { Download, Filter, MapPin } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { Button } from "@/components/ui/button";

const monthlyData = [
  { month: "Sep", accidents: 45 },
  { month: "Oct", accidents: 52 },
  { month: "Nov", accidents: 38 },
  { month: "Dec", accidents: 61 },
  { month: "Jan", accidents: 42 },
  { month: "Feb", accidents: 35 },
];

const riskPieData = [
  { name: "Safe", value: 65, color: "#22C55E" },
  { name: "Medium", value: 25, color: "#F59E0B" },
  { name: "High", value: 10, color: "#EF4444" },
];

const leaderboard = [
  { rank: 1, plate: "RAC 189 B", driver: "Eric Mugabo", score: 92, risk: "high" },
  { rank: 2, plate: "RAB 712 C", driver: "Alice Uwimana", score: 78, risk: "medium" },
  { rank: 3, plate: "RAF 892 B", driver: "Patrick Habimana", score: 65, risk: "medium" },
  { rank: 4, plate: "RAD 445 D", driver: "Grace Ingabire", score: 45, risk: "safe" },
  { rank: 5, plate: "RAE 331 A", driver: "Joseph Niyonzima", score: 32, risk: "safe" },
];

export default function AnalyticsDashboard() {
  const riskColors = {
    safe: "text-[#22C55E]",
    medium: "text-[#F59E0B]",
    high: "text-[#EF4444]",
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white/50 text-xs hover:bg-white/8 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Region: All
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white/50 text-xs hover:bg-white/8 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Date: Last 6 months
          </button>
        </div>
        <Button
          variant="outline"
          className="border-[#2E7DFF]/30 text-[#2E7DFF] hover:bg-[#2E7DFF]/10 text-xs gap-2"
        >
          <Download className="w-3.5 h-3.5" /> Export Analytics
        </Button>
      </div>

      {/* Heatmap + Risk Distribution */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Heatmap */}
        <div className="col-span-2 rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#EF4444]" />
            <h3 className="text-white/80 text-sm font-semibold">Dangerous Zones Heatmap</h3>
          </div>
          <div className="relative h-56 bg-[#0A1628] rounded-xl overflow-hidden">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <path d="M25,15 L75,12 L85,35 L80,60 L70,80 L40,85 L20,70 L15,40 Z"
                fill="rgba(46,125,255,0.05)" stroke="rgba(46,125,255,0.15)" strokeWidth="0.5" />
            </svg>
            {[
              { x: 48, y: 40, intensity: "high" },
              { x: 60, y: 55, intensity: "medium" },
              { x: 35, y: 50, intensity: "medium" },
              { x: 55, y: 30, intensity: "low" },
            ].map((zone, i) => (
              <div key={i} className="absolute rounded-full"
                style={{
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  width: zone.intensity === "high" ? 60 : zone.intensity === "medium" ? 40 : 25,
                  height: zone.intensity === "high" ? 60 : zone.intensity === "medium" ? 40 : 25,
                  background: zone.intensity === "high"
                    ? "radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)"
                    : zone.intensity === "medium"
                    ? "radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)",
                  transform: "translate(-50%, -50%)",
                }} />
            ))}
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
          <h3 className="text-white/80 text-sm font-semibold mb-4">Risk Distribution</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                  {riskPieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {riskPieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-white/30 text-[10px]">{d.name} ({d.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
          <h3 className="text-white/80 text-sm font-semibold mb-4">Monthly Accident Trend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="accidentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0F2241", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff", fontSize: 12 }} />
                                 <Area
                  type="monotone"
                  dataKey="accidents"
                  stroke="#EF4444"
                  strokeWidth={2}
                  fill="url(#accidentGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Leaderboard */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
          <h3 className="text-white/80 text-sm font-semibold mb-4">Driver Risk Leaderboard</h3>
          <div className="space-y-2">
            {leaderboard.map((driver) => (
              <div
                key={driver.rank}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white/20 text-xs font-bold w-4 text-center">#{driver.rank}</span>
                  <div>
                    <p className="text-white/70 text-xs font-medium">{driver.driver}</p>
                    <p className="text-white/25 text-[10px]">{driver.plate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${driver.score}%`,
                        backgroundColor:
                          driver.risk === "high"
                            ? "#EF4444"
                            : driver.risk === "medium"
                            ? "#F59E0B"
                            : "#22C55E",
                      }}
                    />
                  </div>
                  <span className={`text-xs font-bold ${riskColors[driver.risk]}`}>{driver.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
