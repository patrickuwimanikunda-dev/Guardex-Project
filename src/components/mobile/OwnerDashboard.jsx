import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Shield, FileText, User, Gauge, Power, Bell, CheckCircle, X } from "lucide-react";

function ActionFeedback({ message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-3 p-3 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/25 mb-4"
    >
      <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
      <p className="text-[#22C55E] text-xs font-medium flex-1">{message}</p>
      <button onClick={onClose}><X className="w-3.5 h-3.5 text-white/25" /></button>
    </motion.div>
  );
}

export default function OwnerDashboard({ vehicle, onBack }) {
  const driverName = vehicle?.driver_name || "Jean Baptiste";
  const riskLevel = vehicle?.risk_level || "safe";
  const speed = vehicle?.speed || 72;
  const engineStatus = vehicle?.engine_status || "active";
  const plate = vehicle?.plate_number || "RAD 234 A";

  const [feedback, setFeedback] = useState(null);
  const [engineLocked, setEngineLocked] = useState(engineStatus !== "active");
  const [notifications, setNotifications] = useState([
    { id: 1, msg: "Speed reached 98 km/h — 3 min ago", type: "warning" },
    { id: 2, msg: "Phone usage detected — 7 min ago", type: "danger" },
    { id: 3, msg: "Trip started: Kigali → Musanze", type: "info" },
  ]);

  const riskColors = {
    safe: { bg: "bg-[#22C55E]/10", text: "text-[#22C55E]", border: "border-[#22C55E]/20", dot: "bg-[#22C55E]" },
    medium: { bg: "bg-[#F59E0B]/10", text: "text-[#F59E0B]", border: "border-[#F59E0B]/20", dot: "bg-[#F59E0B]" },
    high: { bg: "bg-[#EF4444]/10", text: "text-[#EF4444]", border: "border-[#EF4444]/20", dot: "bg-[#EF4444]" },
  };
  const rc = riskColors[riskLevel] || riskColors.safe;

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleCall = () => showFeedback(`📞 Calling ${driverName}... (${plate})`);
  const handlePolice = () => showFeedback("🚔 Police notified! Location shared. Case #GX-" + Math.floor(Math.random() * 9000 + 1000));
  const handleEngine = () => {
    setEngineLocked(!engineLocked);
    showFeedback(engineLocked ? `✅ Engine remotely UNLOCKED for ${plate}` : `🔒 Engine remotely LOCKED for ${plate}`);
  };
  const handleReports = () => showFeedback("📊 Report generated: Last 7 days · Score 87 · 3 alerts");
  const dismissNotif = (id) => setNotifications(n => n.filter(x => x.id !== id));

  const notifColors = {
    warning: "border-[#F59E0B]/25 text-[#F59E0B]",
    danger: "border-[#EF4444]/25 text-[#EF4444]",
    info: "border-[#2E7DFF]/25 text-[#2E7DFF]",
  };

  return (
    <div className="pt-4 pb-6">
      <button onClick={onBack} className="flex items-center gap-1 text-white/40 text-sm mb-5 hover:text-white/60 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h2 className="text-xl font-bold text-white mb-1">Vehicle Monitor</h2>
      <p className="text-white/35 text-sm mb-5">{plate}</p>

      <AnimatePresence>
        {feedback && <ActionFeedback message={feedback} onClose={() => setFeedback(null)} />}
      </AnimatePresence>

      {/* Map placeholder */}
      <div className="w-full h-40 rounded-2xl bg-[#0F2241] border border-white/8 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-[#22C55E] rounded-full animate-ping" />
            <div className="w-3 h-3 bg-[#22C55E] rounded-full absolute top-0.5 left-0.5" />
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`h${i}`} className="absolute h-px bg-white/5 w-full" style={{ top: `${(i + 1) * 12.5}%` }} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`v${i}`} className="absolute w-px bg-white/5 h-full" style={{ left: `${(i + 1) * 12.5}%` }} />
          ))}
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/50">
          <MapPin className="w-3 h-3 text-[#22C55E]" />
          <span className="text-white/70 text-[10px]">Kigali, KG 5 Ave — Live</span>
        </div>
        <div className="absolute bottom-3 right-3 text-white/20 text-[10px] font-mono">GPS ●</div>
      </div>

      {/* Driver + Stats */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/8">
          <User className="w-5 h-5 text-[#2E7DFF] mb-2" />
          <p className="text-white/40 text-[10px] font-medium mb-0.5">DRIVER</p>
          <p className="text-white text-sm font-semibold">{driverName}</p>
          <div className={`mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${rc.bg} border ${rc.border}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${rc.dot}`} />
            <span className={`text-[10px] font-semibold ${rc.text} capitalize`}>{riskLevel} Risk</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-24">
          <div className="flex-1 p-3 rounded-2xl bg-white/5 border border-white/8 flex flex-col items-center justify-center">
            <Gauge className="w-4 h-4 text-white/40 mb-1" />
            <motion.p key={speed} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-white text-lg font-bold">{speed}</motion.p>
            <p className="text-white/30 text-[8px]">KM/H</p>
          </div>
          <button
            onClick={handleEngine}
            className={`flex-1 p-3 rounded-2xl border flex flex-col items-center justify-center transition-colors ${engineLocked ? 'bg-[#EF4444]/10 border-[#EF4444]/20' : 'bg-[#22C55E]/10 border-[#22C55E]/20'}`}
          >
            <Power className={`w-4 h-4 mb-1 ${engineLocked ? 'text-[#EF4444]' : 'text-[#22C55E]'}`} />
            <p className={`text-[10px] font-semibold ${engineLocked ? 'text-[#EF4444]' : 'text-[#22C55E]'}`}>{engineLocked ? "Locked" : "Active"}</p>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="mb-4">
          <p className="text-white/30 text-xs font-medium mb-2 flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5" /> ALERTS
          </p>
          <div className="space-y-2">
            <AnimatePresence>
              {notifications.map(n => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className={`flex items-center justify-between p-2.5 rounded-xl border bg-white/[0.02] ${notifColors[n.type]}`}
                >
                  <p className="text-[10px] font-medium">{n.msg}</p>
                  <button onClick={() => dismissNotif(n.id)} className="text-white/20 ml-2">
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <p className="text-white/30 text-xs font-medium mb-3">QUICK ACTIONS</p>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={handleCall} className="p-4 rounded-2xl bg-[#2E7DFF]/10 border border-[#2E7DFF]/15 flex flex-col items-center gap-2 hover:bg-[#2E7DFF]/20 transition-colors active:scale-95">
          <Phone className="w-5 h-5 text-[#2E7DFF]" />
          <span className="text-white/60 text-[10px] font-medium">Call Driver</span>
        </button>
        <button onClick={handlePolice} className="p-4 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/15 flex flex-col items-center gap-2 hover:bg-[#EF4444]/20 transition-colors active:scale-95">
          <Shield className="w-5 h-5 text-[#EF4444]" />
          <span className="text-white/60 text-[10px] font-medium">Notify Police</span>
        </button>
        <button onClick={handleEngine} className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-colors active:scale-95 ${engineLocked ? 'bg-[#22C55E]/10 border-[#22C55E]/15 hover:bg-[#22C55E]/20' : 'bg-[#F59E0B]/10 border-[#F59E0B]/15 hover:bg-[#F59E0B]/20'}`}>
          <Power className={`w-5 h-5 ${engineLocked ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`} />
          <span className="text-white/60 text-[10px] font-medium">{engineLocked ? "Unlock Engine" : "Lock Engine"}</span>
        </button>
        <button onClick={handleReports} className="p-4 rounded-2xl bg-white/5 border border-white/8 flex flex-col items-center gap-2 hover:bg-white/8 transition-colors active:scale-95">
          <FileText className="w-5 h-5 text-white/50" />
          <span className="text-white/60 text-[10px] font-medium">View Reports</span>
        </button>
      </div>
    </div>
  );
}