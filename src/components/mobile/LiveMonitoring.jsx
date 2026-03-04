import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Gauge, AlertTriangle, Clock, Bell, X } from "lucide-react";

function useSimLive(initial) {
  const [data, setData] = useState({ speed: initial?.speed || 94, riskScore: initial?.risk_score || 35 });
  useEffect(() => {
    const iv = setInterval(() => {
      setData(prev => ({
        speed: Math.max(0, Math.min(160, Math.round(prev.speed + (Math.random() - 0.45) * 7))),
        riskScore: Math.max(5, Math.min(95, Math.round(prev.riskScore + (Math.random() - 0.48) * 4))),
      }));
    }, 1200);
    return () => clearInterval(iv);
  }, []);
  return data;
}

export default function LiveMonitoring({ vehicle, onBack }) {
  const { speed, riskScore } = useSimLive(vehicle);
  const [alerts, setAlerts] = useState([
    { id: 1, message: "Speed exceeded 120 km/h", time: "2 min ago", severity: "high" },
    { id: 2, message: "Phone usage detected", time: "8 min ago", severity: "medium" },
    { id: 3, message: "Lane deviation detected", time: "15 min ago", severity: "medium" },
    { id: 4, message: "Speed normalized", time: "18 min ago", severity: "low" },
  ]);
  const prevSpeed = useRef(speed);

  useEffect(() => {
    if (speed > 120 && prevSpeed.current <= 120) {
      const newAlert = { id: Date.now(), message: `Speed reached ${speed} km/h — overspeed!`, time: "now", severity: "high" };
      setAlerts(a => [newAlert, ...a].slice(0, 8));
    }
    prevSpeed.current = speed;
  }, [speed]);

  const dismiss = (id) => setAlerts(a => a.filter(x => x.id !== id));

  const sevColors = {
    high: "bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444]",
    medium: "bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[#F59E0B]",
    low: "bg-[#22C55E]/10 border-[#22C55E]/20 text-[#22C55E]",
  };

  const riskColor = riskScore > 60 ? "#EF4444" : riskScore > 35 ? "#F59E0B" : "#22C55E";

  return (
    <div className="pt-4 pb-6">
      <button onClick={onBack} className="flex items-center gap-1 text-white/40 text-sm mb-6 hover:text-white/60 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Live Monitoring</h2>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20">
          <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
          <span className="text-[#22C55E] text-[10px] font-bold">LIVE</span>
        </div>
      </div>

      {/* Speed + Location */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/8">
          <Gauge className="w-5 h-5 text-[#2E7DFF] mb-2" />
          <p className="text-white/40 text-[10px] font-medium mb-1">SPEED</p>
          <motion.p key={speed} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-3xl font-bold" style={{ color: speed > 120 ? "#EF4444" : speed > 90 ? "#F59E0B" : "white" }}>
            {speed}<span className="text-sm text-white/30 ml-1">km/h</span>
          </motion.p>
          {speed > 120 && <p className="text-[#EF4444] text-[9px] font-bold mt-1 animate-pulse">⚠️ OVERSPEED</p>}
        </div>
        <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/8 relative overflow-hidden">
          <MapPin className="w-5 h-5 text-[#22C55E] mb-2" />
          <p className="text-white/40 text-[10px] font-medium mb-1">LOCATION</p>
          <p className="text-xs text-white/70 font-medium">Kigali, KG 5 Ave</p>
          <p className="text-[9px] text-white/30 mt-0.5">-1.9441, 30.0619</p>
          <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
            <div className="grid grid-cols-4 gap-0.5 h-full">
              {Array.from({ length: 16 }).map((_, i) => <div key={i} className="bg-white/50 rounded-sm" />)}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Meter */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/8 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/50 text-xs font-medium">Dynamic Risk Score</span>
          <motion.span key={riskScore} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-sm font-bold" style={{ color: riskColor }}>
            {riskScore}%
          </motion.span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden bg-white/5">
          <div className="h-full risk-gauge rounded-full relative">
            <motion.div
              className="absolute top-0 bottom-0 w-1.5 bg-white rounded-full shadow-lg"
              animate={{ left: `${Math.min(98, riskScore)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-[#22C55E]/60">Safe</span>
          <span className="text-[10px] text-[#F59E0B]/60">Caution</span>
          <span className="text-[10px] text-[#EF4444]/60">High Risk</span>
        </div>
      </div>

      {/* Alert Feed */}
      <div className="mb-4">
        <h3 className="text-white/50 text-xs font-medium mb-3 flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5" /> LIVE ALERTS ({alerts.length})
        </h3>
        <div className="space-y-2">
          <AnimatePresence>
            {alerts.map(alert => (
              <motion.div
                key={alert.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                className={`p-3 rounded-xl border ${sevColors[alert.severity]}`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium flex-1">{alert.message}</p>
                  <div className="flex items-center gap-2 ml-2">
                    <div className="flex items-center gap-1 text-white/25">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px]">{alert.time}</span>
                    </div>
                    <button onClick={() => dismiss(alert.id)} className="text-white/20 hover:text-white/40">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}