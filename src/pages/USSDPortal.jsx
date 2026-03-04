import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowLeft, CheckCircle, XCircle, Car } from "lucide-react";

// ── Credentials from localStorage ─────────────────────────────────────────
const getVehicleOwners = () => {
  try { return JSON.parse(localStorage.getItem("guardex_vehicle_owners") || "[]"); } catch { return []; }
};
const getDrivers = () => {
  try { return JSON.parse(localStorage.getItem("guardex_drivers") || "[]"); } catch { return []; }
};
const getFamilyMembers = () => {
  try { return JSON.parse(localStorage.getItem("guardex_family_members") || "[]"); } catch { return []; }
};

// ── USSD States ────────────────────────────────────────────────────────────
// flow: dial → menu → login(role) → result
export default function USSDPortal() {
  const [stage, setStage] = useState("dial"); // dial | menu | login | result
  const [selectedRole, setSelectedRole] = useState(null);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null); // { success, name, message }
  const [typing, setTyping] = useState(""); // simulates USSD dial typing

  // Simulate dialing
  const handleDial = () => {
    if (typing !== "*860#") { setTyping("*860#"); return; }
    setStage("menu");
    setTyping("");
  };

  const menuOptions = [
    { id: "owner", label: "1. Vehicle Owner", color: "#2E7DFF", icon: "🚗" },
    { id: "driver", label: "2. Driver", color: "#22C55E", icon: "🧑‍✈️" },
    { id: "family", label: "3. Family Member", color: "#A855F7", icon: "👨‍👩‍👧" },
  ];

  const handleMenuSelect = (option) => {
    setSelectedRole(option);
    setStage("login");
    setUsername("");
    setPassword("");
  };

  const handleLogin = () => {
    let users = [];
    if (selectedRole.id === "owner") users = getVehicleOwners();
    else if (selectedRole.id === "driver") users = getDrivers();
    else if (selectedRole.id === "family") users = getFamilyMembers();

    const match = users.find(u => u.username === username && u.password === password);
    if (match) {
      setResult({ success: true, name: match.fullName, message: `Welcome, ${match.fullName}!\nYour vehicle status is ACTIVE.\nDriving score: 87/100\nEngine: ON` });
    } else {
      setResult({ success: false, message: "Access Denied.\nInvalid credentials.\nPlease try again or contact your administrator." });
    }
    setStage("result");
  };

  const reset = () => {
    setStage("dial");
    setTyping("");
    setSelectedRole(null);
    setUsername("");
    setPassword("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#060D18] flex items-center justify-center p-4">
      {/* Background ambient */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#22C55E]/6 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/3 w-60 h-60 bg-[#2E7DFF]/6 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            {/* Car + Shield logo */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2E7DFF] to-[#1B3A5C] flex items-center justify-center relative">
              <Car className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <h1 className="text-white font-bold text-xl tracking-tight">Guardex</h1>
              <p className="text-white/25 text-[10px] tracking-widest">USSD PORTAL</p>
            </div>
          </div>
          <p className="text-white/30 text-sm">For users without smartphones</p>
          <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20">
            <Phone className="w-3 h-3 text-[#22C55E]" />
            <span className="text-[#22C55E] text-xs font-medium">Dial *860# to start</span>
          </div>
        </motion.div>

        {/* Phone mockup */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="bg-[#0A1628] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Phone screen */}
            <div className="bg-[#060D18] mx-3 mt-3 rounded-2xl border border-white/5 min-h-[320px] p-5 flex flex-col">
              <AnimatePresence mode="wait">
                {/* DIAL stage */}
                {stage === "dial" && (
                  <motion.div key="dial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
                    <div className="text-center mb-6">
                      <p className="text-white/30 text-xs mb-2">Enter USSD code</p>
                      <div className="text-white text-2xl font-mono font-bold tracking-widest min-h-[36px]">
                        {typing || <span className="text-white/15">_</span>}
                      </div>
                    </div>
                    {/* Keypad */}
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      {["1","2","3","4","5","6","7","8","9","*","0","#"].map(k => (
                        <button
                          key={k}
                          onClick={() => {
                            if (k === "#" && typing.endsWith("*860")) { setTyping(typing + "#"); return; }
                            if (typing.length < 5) setTyping(typing + k);
                          }}
                          className="h-12 rounded-xl bg-white/5 border border-white/8 text-white font-semibold text-base hover:bg-white/10 transition-colors active:scale-95"
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleDial}
                      className="mt-4 w-full h-11 rounded-xl bg-[#22C55E] hover:bg-[#22C55E]/90 text-white font-semibold text-sm transition-colors"
                    >
                      {typing === "*860#" ? "Connect" : "Dial"}
                    </button>
                  </motion.div>
                )}

                {/* MENU stage */}
                {stage === "menu" && (
                  <motion.div key="menu" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex-1 flex flex-col">
                    <div className="border-b border-white/8 pb-3 mb-4">
                      <p className="text-[#22C55E] text-xs font-bold font-mono">GUARDEX USSD *860#</p>
                      <p className="text-white/60 text-xs mt-1">Select your role:</p>
                    </div>
                    <div className="space-y-2 flex-1">
                      {menuOptions.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => handleMenuSelect(opt)}
                          className="w-full p-3 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] text-left flex items-center gap-3 transition-colors group"
                        >
                          <span className="text-xl">{opt.icon}</span>
                          <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-white/15 text-[10px] mt-4 text-center font-mono">0. Cancel</p>
                  </motion.div>
                )}

                {/* LOGIN stage */}
                {stage === "login" && (
                  <motion.div key="login" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex-1 flex flex-col">
                    <button onClick={() => setStage("menu")} className="flex items-center gap-1 text-white/30 text-xs mb-4 hover:text-white/50">
                      <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                    <div className="border-b border-white/8 pb-3 mb-4">
                      <p className="text-[#22C55E] text-xs font-bold font-mono">GUARDEX USSD *860#</p>
                      <p className="text-white/60 text-xs mt-1">{selectedRole?.icon} {selectedRole?.label}</p>
                    </div>
                    <div className="space-y-3 flex-1">
                      <div>
                        <label className="text-white/25 text-[10px] font-mono block mb-1">Enter Username/ID:</label>
                        <input
                          type="text"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                          placeholder="e.g. VO-2024-0001"
                          className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-mono focus:outline-none focus:border-[#22C55E]/40 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-white/25 text-[10px] font-mono block mb-1">Enter Password:</label>
                        <input
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="••••••"
                          className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm focus:outline-none focus:border-[#22C55E]/40 transition-colors"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleLogin}
                      className="mt-4 w-full h-11 rounded-xl bg-[#22C55E] hover:bg-[#22C55E]/90 text-white font-semibold text-sm transition-colors"
                    >
                      Login →
                    </button>
                  </motion.div>
                )}

                {/* RESULT stage */}
                {stage === "result" && (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center text-center">
                    {result?.success ? (
                      <>
                        <CheckCircle className="w-12 h-12 text-[#22C55E] mb-3" />
                        <p className="text-[#22C55E] font-bold text-sm mb-2">Access Granted</p>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-12 h-12 text-red-400 mb-3" />
                        <p className="text-red-400 font-bold text-sm mb-2">Access Denied</p>
                      </>
                    )}
                    <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4 w-full text-left">
                      {result?.message?.split("\n").map((line, i) => (
                        <p key={i} className="text-white/50 text-xs font-mono">{line}</p>
                      ))}
                    </div>
                    <button
                      onClick={reset}
                      className="mt-4 w-full h-11 rounded-xl bg-white/5 border border-white/10 text-white/50 text-sm hover:bg-white/8 transition-colors"
                    >
                      End Session
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Phone bottom bar */}
            <div className="flex items-center justify-center py-3">
              <div className="w-24 h-1 bg-white/10 rounded-full" />
            </div>
          </div>
        </motion.div>

        <p className="text-center text-white/15 text-xs mt-6">
          Simulated USSD terminal · Guardex Rwanda
        </p>
      </div>
    </div>
  );
}