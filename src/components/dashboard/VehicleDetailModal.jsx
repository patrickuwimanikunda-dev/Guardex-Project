import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Car, User, Shield, Activity, Wine, Zap, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const speedData = [
  { time: "9:00", speed: 45 },
  { time: "9:15", speed: 72 },
  { time: "9:30", speed: 95 },
  { time: "9:45", speed: 110 },
  { time: "10:00", speed: 85 },
  { time: "10:15", speed: 60 },
];

export default function VehicleDetailModal({ vehicle, onClose }) {
  if (!vehicle) return null;

  const riskColors = {
    safe: "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20",
    medium: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
    high: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl rounded-2xl bg-[#0F2241] border border-white/10 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2E7DFF]/15 flex items-center justify-center">
                <Car className="w-6 h-6 text-[#2E7DFF]" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">{vehicle.plate}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <User className="w-3 h-3 text-white/30" />
                  <span className="text-white/40 text-xs">Jean Baptiste Mugisha</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${riskColors[vehicle.risk]} border text-xs font-semibold capitalize px-3 py-1`}>
                {vehicle.risk} Risk
              </Badge>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <Tabs defaultValue="overview">
              <TabsList className="bg-white/5 border border-white/8 mb-6">
                <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                <TabsTrigger value="speed" className="text-xs">Speed Graph</TabsTrigger>
                <TabsTrigger value="alcohol" className="text-xs">Alcohol Logs</TabsTrigger>
                <TabsTrigger value="incidents" className="text-xs">Incidents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Activity, label: "Risk Score", value: "35/100", color: "#F59E0B" },
                    { icon: Zap, label: "Speed", value: "72 km/h", color: "#2E7DFF" },
                    { icon: Shield, label: "Driving Score", value: "87", color: "#22C55E" },
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <Icon className="w-5 h-5 mb-2" style={{ color: stat.color }} />
                        <p className="text-white/30 text-[10px] mb-0.5">{stat.label}</p>
                        <p className="text-white font-bold">{stat.value}</p>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="speed">
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={speedData}>
                      <defs>
                        <linearGradient id="modalSpeedGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2E7DFF" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#2E7DFF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                      <Area type="monotone" dataKey="speed" stroke="#2E7DFF" strokeWidth={2} fill="url(#modalSpeedGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="alcohol">
                <div className="space-y-2">
                  {[
                    { date: "Feb 25, 14:32", result: "Detected", level: "0.08 BAC" },
                    { date: "Feb 24, 08:15", result: "Clear", level: "0.00 BAC" },
                    { date: "Feb 23, 19:40", result: "Clear", level: "0.00 BAC" },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <Wine className={`w-4 h-4 ${log.result === 'Detected' ? 'text-[#EF4444]' : 'text-[#22C55E]'}`} />
                        <span className="text-white/50 text-xs">{log.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/30 text-xs">{log.level}</span>
                        <Badge className={`text-[10px] ${log.result === 'Detected' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#22C55E]/10 text-[#22C55E]'}`}>
                          {log.result}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="incidents">
                <div className="space-y-2">
                  {[
                    { type: "Overspeed", detail: "132 km/h on KG 7 Ave", icon: Zap, color: "#F59E0B" },
                    { type: "Swerving", detail: "Lane deviation — Nyarutarama", icon: AlertTriangle, color: "#EF4444" },
                    { type: "Overspeed", detail: "118 km/h in 80 zone", icon: Zap, color: "#F59E0B" },
                  ].map((incident, i) => {
                    const Icon = incident.icon;
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <Icon className="w-4 h-4" style={{ color: incident.color }} />
                        <div>
                          <p className="text-white/70 text-xs font-medium">{incident.type}</p>
                          <p className="text-white/30 text-[10px]">{incident.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/8 flex gap-3">
            <button className="flex-1 py-2.5 rounded-xl bg-[#2E7DFF] text-white text-xs font-semibold hover:bg-[#2E7DFF]/90 transition-colors">
              Dispatch Officer
            </button>
            <button className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-xs font-semibold hover:bg-white/8 transition-colors">
              Generate Report
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}