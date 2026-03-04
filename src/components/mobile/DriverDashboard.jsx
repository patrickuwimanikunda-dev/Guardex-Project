import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wine, Smartphone, AlertTriangle, Phone, Star, Bell, BellOff, X, CheckCircle, Zap } from "lucide-react";
import Speedometer from "./Speedometer";
import StatusIndicator from "./StatusIndicator";
import RiskLevelCard from "./RiskLevelCard";
import BottomNav from "./BottomNav";

function NotificationToast({ note, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, []);

  const colors = {
    danger: "border-[#EF4444]/40 bg-[#EF4444]/10",
    warning: "border-[#F59E0B]/40 bg-[#F59E0B]/10",
    safe: "border-[#22C55E]/40 bg-[#22C55E]/10",
    info: "border-[#2E7DFF]/40 bg-[#2E7DFF]/10",
  };
  const textColors = { danger: "text-[#EF4444]", warning: "text-[#F59E0B]", safe: "text-[#22C55E]", info: "text-[#2E7DFF]" };

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      className={`flex items-start gap-3 p-3 rounded-2xl border ${colors[note.type] || colors.info} backdrop-blur-sm`}
    >
      <Bell className={`w-4 h-4 mt-0.5 flex-shrink-0 ${textColors[note.type]}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-bold ${textColors[note.type]}`}>{note.title}</p>
        <p className="text-white/50 text-[10px] mt-0.5">{note.message}</p>
      </div>
      <button onClick={onDismiss} className="text-white/20 hover:text-white/40">
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

// Simulate live sensor data changes
function useLiveDriving(initial) {
  const [data, setData] = useState({
    speed: initial?.speed || 72,
    risk_level: initial?.risk_level || "safe",
    driving_score: initial?.driving_score || 87,
    alcohol_status: initial?.alcohol_status || "clear",
    phone_usage: initial?.phone_usage || false,
    swerving_detected: initial?.swerving_detected || false,
    engine_status: initial?.engine_status || "active",
    connected: initial?.connected !== false,
    crash_probability: initial?.crash_probability || 12,
    plate_number: initial?.plate_number || "RAD 234 A",
    driver_name: initial?.driver_name || "Jean Baptiste",
  });

  const tick = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      tick.current += 1;
      setData(prev => {
        // Vary speed naturally
        const speedDelta = (Math.random() - 0.45) * 8;
        const newSpeed = Math.max(0, Math.min(160, Math.round(prev.speed + speedDelta)));

        // Occasionally simulate events
        const phoneUsage = tick.current % 23 === 0 ? !prev.phone_usage : prev.phone_usage;
        const swerving = tick.current % 31 === 0 ? !prev.swerving_detected : prev.swerving_detected;
        const alcoholStatus = prev.alcohol_status; // doesn't change while driving

        // Risk level based on speed + flags
        let risk_level = "safe";
        let crash_probability = Math.max(5, Math.min(95, Math.round((newSpeed / 160) * 50 + (swerving ? 25 : 0) + (phoneUsage ? 15 : 0))));
        if (crash_probability > 60 || newSpeed > 120) risk_level = "high";
        else if (crash_probability > 35 || newSpeed > 90) risk_level = "medium";

        const driving_score = Math.max(40, Math.min(100, Math.round(100 - (newSpeed > 100 ? 20 : 0) - (swerving ? 15 : 0) - (phoneUsage ? 10 : 0))));

        return { ...prev, speed: newSpeed, risk_level, driving_score, phone_usage: phoneUsage, swerving_detected: swerving, crash_probability };
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return data;
}

export default function DriverDashboard({ vehicle, onNavigate, onSOS }) {
  const liveData = useLiveDriving(vehicle);
  const [notifications, setNotifications] = useState([]);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [notifLog, setNotifLog] = useState([]);
  const [showLog, setShowLog] = useState(false);
  const prevData = useRef(liveData);
  const notifId = useRef(0);

  const addNotif = (title, message, type = "info") => {
    if (!notifEnabled) return;
    const id = ++notifId.current;
    const note = { id, title, message, type, time: new Date().toLocaleTimeString() };
    setNotifications(n => [note, ...n].slice(0, 3));
    setNotifLog(l => [note, ...l].slice(0, 20));
  };

  const dismissNotif = (id) => setNotifications(n => n.filter(x => x.id !== id));

  // Watch for state changes and fire notifications
  useEffect(() => {
    const prev = prevData.current;

    if (liveData.speed > 120 && prev.speed <= 120)
      addNotif("⚠️ Overspeed Alert", `Speed reached ${liveData.speed} km/h — slow down!`, "danger");
    if (liveData.speed <= 120 && prev.speed > 120)
      addNotif("✅ Speed Normalized", `Speed back to ${liveData.speed} km/h`, "safe");
    if (liveData.phone_usage && !prev.phone_usage)
      addNotif("📱 Phone Usage Detected", "Put down your phone while driving.", "warning");
    if (!liveData.phone_usage && prev.phone_usage)
      addNotif("✅ Phone Put Down", "Good — focus on the road.", "safe");
    if (liveData.swerving_detected && !prev.swerving_detected)
      addNotif("🚗 Swerving Detected", "Lane deviation detected — stay in lane!", "danger");
    if (!liveData.swerving_detected && prev.swerving_detected)
      addNotif("✅ Driving Stable", "Lane deviation resolved.", "safe");
    if (liveData.risk_level === "high" && prev.risk_level !== "high")
      addNotif("🚨 High Risk Level", "Your driving risk is critically high!", "danger");
    if (liveData.risk_level === "safe" && prev.risk_level !== "safe")
      addNotif("🟢 Risk Cleared", "Driving risk is back to safe levels.", "safe");

    prevData.current = liveData;
  }, [liveData.speed, liveData.phone_usage, liveData.swerving_detected, liveData.risk_level]);

  return (
    <div className="relative min-h-[800px] pb-24">
      {/* Notification toasts */}
      <div className="absolute top-0 left-0 right-0 z-40 space-y-2 px-1 pt-1">
        <AnimatePresence>
          {notifications.map(note => (
            <NotificationToast key={note.id} note={note} onDismiss={() => dismissNotif(note.id)} />
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between pt-4 mb-4 mt-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${liveData.connected ? 'bg-[#22C55E] pulse-safe' : 'bg-[#EF4444]'}`} />
            <span className="text-white/50 text-xs">{liveData.connected ? 'Live' : 'Offline'}</span>
          </div>
          <h2 className="text-white font-bold text-lg tracking-wide">{liveData.plate_number}</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20">
            <Star className="w-3.5 h-3.5 text-[#F59E0B]" fill="#F59E0B" />
            <motion.span key={liveData.driving_score} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-[#F59E0B] text-xs font-bold">{liveData.driving_score}</motion.span>
          </div>
          <button
            onClick={() => setShowLog(!showLog)}
            className="relative p-2 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-colors"
          >
            {notifEnabled ? <Bell className="w-4 h-4 text-white/50" /> : <BellOff className="w-4 h-4 text-white/30" />}
            {notifLog.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] rounded-full text-[8px] text-white flex items-center justify-center font-bold">
                {Math.min(9, notifLog.length)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Notification log panel */}
      <AnimatePresence>
        {showLog && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 rounded-2xl bg-[#0F2241] border border-white/10 overflow-hidden"
          >
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/70 text-xs font-semibold">Notification Log</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setNotifEnabled(!notifEnabled)}
                    className={`text-[10px] px-2 py-1 rounded-lg border transition-colors ${notifEnabled ? 'bg-[#22C55E]/15 border-[#22C55E]/25 text-[#22C55E]' : 'bg-white/5 border-white/10 text-white/30'}`}
                  >
                    {notifEnabled ? "ON" : "OFF"}
                  </button>
                  <button onClick={() => setShowLog(false)} className="text-white/30"><X className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              {notifLog.length === 0 ? (
                <p className="text-white/20 text-[10px] text-center py-2">No notifications yet</p>
              ) : (
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {notifLog.map(n => (
                    <div key={n.id} className="flex items-start gap-2 text-[10px]">
                      <span className="text-[#2E7DFF]/50 font-mono flex-shrink-0">{n.time}</span>
                      <span className="text-white/40">{n.title}: {n.message}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speedometer */}
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="mb-5">
        <Speedometer speed={liveData.speed} />
        <p className="text-center text-white/20 text-[10px] mt-1 flex items-center justify-center gap-1">
          <Zap className="w-3 h-3" /> Live data updating
        </p>
      </motion.div>

      {/* Status indicators */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-3 mb-4">
        <StatusIndicator icon={Wine} label="Alcohol" status={liveData.alcohol_status === "clear" ? "safe" : "danger"} value={liveData.alcohol_status === "clear" ? "Clear" : "Detected"} />
        <StatusIndicator icon={Smartphone} label="Phone" status={liveData.phone_usage ? "warning" : "safe"} value={liveData.phone_usage ? "In Use" : "Not Used"} />
        <StatusIndicator icon={AlertTriangle} label="Swerving" status={liveData.swerving_detected ? "danger" : "safe"} value={liveData.swerving_detected ? "Detected" : "Stable"} />
      </motion.div>

      {/* Risk level */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mb-4">
        <RiskLevelCard level={liveData.risk_level} crashProbability={liveData.crash_probability} />
      </motion.div>

      {/* SOS Button */}
      <motion.button
        onClick={onSOS}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="fixed bottom-28 right-8 w-16 h-16 rounded-full bg-[#EF4444] flex items-center justify-center shadow-lg shadow-red-500/30 z-50"
        whileTap={{ scale: 0.9 }}
      >
        <Phone className="w-6 h-6 text-white" fill="white" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <span className="text-[#EF4444] text-[8px] font-black">SOS</span>
        </span>
      </motion.button>

      <BottomNav active="dashboard" onNavigate={onNavigate} />
    </div>
  );
}