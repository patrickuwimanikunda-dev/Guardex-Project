import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, ChevronRight, Lock, Eye, EyeOff, UserPlus, Check, X } from "lucide-react";

// Hardcoded credentials for police & government
const CREDENTIALS = {
  police: [
    { id: "POL-2024-0892", password: "police123" },
    { id: "POL-2024-0100", password: "officer2024" },
  ],
  government: [
    { id: "GOV-AUTH-0145", password: "gov2024" },
    { id: "GOV-AUTH-0200", password: "authority123" },
  ],
};

// Admin accounts stored in localStorage
const getAdminAccounts = () => {
  try {
    return JSON.parse(localStorage.getItem("guardex_admins") || "[]");
  } catch {
    return [];
  }
};

const roles = [
  {
    id: "police",
    title: "Police Officer",
    subtitle: "Operational Monitoring",
    description: "Real-time vehicle tracking, live alerts, dispatch management and incident response.",
    icon: "🚔",
    color: "#2E7DFF",
    bg: "from-[#2E7DFF]/15 to-[#2E7DFF]/5",
    border: "border-[#2E7DFF]/20",
    activeBorder: "border-[#2E7DFF]/60",
    badge: "bg-[#2E7DFF]/15 text-[#2E7DFF]",
    features: ["Live Vehicle Map", "Alert Feed", "Dispatch Officer", "Incident Reports"],
    idLabel: "Badge / Officer ID",
    idPlaceholder: "e.g. POL-2024-0892",
  },
  {
    id: "government",
    title: "Government Authority",
    subtitle: "Strategic Analytics",
    description: "National heatmaps, accident trends, risk analytics and policy-level reporting.",
    icon: "🏛️",
    color: "#22C55E",
    bg: "from-[#22C55E]/15 to-[#22C55E]/5",
    border: "border-[#22C55E]/20",
    activeBorder: "border-[#22C55E]/60",
    badge: "bg-[#22C55E]/15 text-[#22C55E]",
    features: ["National Heatmap", "Trend Charts", "Risk Leaderboard", "AI Prediction"],
    idLabel: "Government ID",
    idPlaceholder: "e.g. GOV-AUTH-0145",
  },
  {
    id: "admin",
    title: "System Administrator",
    subtitle: "Full System Control",
    description: "Manage vehicles, users, algorithm weights, hardware status and system logs.",
    icon: "⚙️",
    color: "#A855F7",
    bg: "from-[#A855F7]/15 to-[#A855F7]/5",
    border: "border-[#A855F7]/20",
    activeBorder: "border-[#A855F7]/60",
    badge: "bg-[#A855F7]/15 text-[#A855F7]",
    features: ["Manage Vehicles", "Manage Users", "Algorithm Weights", "System Logs"],
    idLabel: "Admin Username",
    idPlaceholder: "Enter admin username",
  },
];

export default function RoleLoginScreen({ onEnter, initialRole }) {
  const [selected, setSelected] = useState(initialRole || null);
  const [step, setStep] = useState(initialRole ? "login" : "select");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [adminView, setAdminView] = useState("login"); // "login" | "register"

  // Registration state
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regFullName, setRegFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  const selectedRole = roles.find(r => r.id === selected);

  const handleContinue = () => {
    if (!selected) return;
    setStep("login");
    setError("");
    setUserId("");
    setPassword("");
  };

  const handleLogin = () => {
    setError("");

    if (selected === "police" || selected === "government") {
      const validCreds = CREDENTIALS[selected];
      const match = validCreds.find(c => c.id === userId && c.password === password);
      if (!match) {
        setError("Invalid credentials. Access denied.");
        return;
      }
      onEnter(selected);
    } else if (selected === "admin") {
      const admins = getAdminAccounts();
      const match = admins.find(a => a.username === userId && a.password === password);
      if (!match) {
        setError("Invalid admin credentials. Access denied.");
        return;
      }
      onEnter("admin");
    }
  };

  const handleRegister = () => {
    setError("");
    if (!regUsername || !regPassword || !regConfirm || !regFullName || !regEmail) {
      setError("All fields are required.");
      return;
    }
    if (regPassword !== regConfirm) {
      setError("Passwords do not match.");
      return;
    }
    if (regPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const admins = getAdminAccounts();
    if (admins.find(a => a.username === regUsername)) {
      setError("Username already exists.");
      return;
    }
    admins.push({ username: regUsername, password: regPassword, fullName: regFullName, email: regEmail });
    localStorage.setItem("guardex_admins", JSON.stringify(admins));
    setRegSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#060D18] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#2E7DFF]/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-[#A855F7]/6 rounded-full blur-[100px]" />

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2E7DFF] to-[#1B3A5C] flex items-center justify-center">
              <Car className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <h1 className="text-white font-bold text-2xl tracking-tight">Guardex</h1>
              <p className="text-white/25 text-xs tracking-widest">COMMAND CENTER</p>
            </div>
          </div>
          <h2 className="text-white/70 text-lg font-medium">
            {step === "select" ? "Select your access role to continue" : `Login as ${selectedRole?.title}`}
          </h2>
        </motion.div>

        {step === "select" ? (
          <>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {roles.map((role, index) => (
                <motion.button
                  key={role.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelected(role.id)}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${role.bg} border-2 text-left transition-all duration-300 ${
                    selected === role.id ? role.activeBorder : role.border + " hover:border-white/15"
                  }`}
                >
                  <div className="text-4xl mb-4">{role.icon}</div>
                  <div className="mb-1">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${role.badge}`}>{role.subtitle}</span>
                  </div>
                  <h3 className="text-white font-bold text-base mt-3 mb-2">{role.title}</h3>
                  <p className="text-white/35 text-xs leading-relaxed mb-4">{role.description}</p>
                  <div className="space-y-1.5">
                    {role.features.map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: role.color }} />
                        <span className="text-white/30 text-[10px]">{f}</span>
                      </div>
                    ))}
                  </div>
                  {selected === role.id && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 flex items-center gap-1.5" style={{ color: role.color }}>
                      <div className="w-4 h-4 rounded-full flex items-center justify-center border-2" style={{ borderColor: role.color }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: role.color }} />
                      </div>
                      <span className="text-xs font-semibold">Selected</span>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleContinue}
                disabled={!selected}
                className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                  selected ? "bg-[#2E7DFF] hover:bg-[#2E7DFF]/90 text-white" : "bg-white/5 text-white/20 cursor-not-allowed border border-white/8"
                }`}
              >
                Continue to Login <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : selected === "admin" ? (
          /* Admin login OR register */
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-sm mx-auto">
            {/* Role badge */}
            <div className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r ${selectedRole?.bg} border ${selectedRole?.border} mb-6`}>
              <span className="text-3xl">{selectedRole?.icon}</span>
              <div>
                <p className="text-white font-semibold">{selectedRole?.title}</p>
                <p className="text-white/30 text-xs">{selectedRole?.subtitle}</p>
              </div>
            </div>

            {/* Toggle login / register */}
            <div className="flex rounded-xl bg-white/5 p-1 mb-6 border border-white/8">
              <button
                onClick={() => { setAdminView("login"); setError(""); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${adminView === "login" ? "bg-[#A855F7] text-white" : "text-white/30"}`}
              >
                Login
              </button>
              <button
                onClick={() => { setAdminView("register"); setError(""); setRegSuccess(false); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${adminView === "register" ? "bg-[#A855F7] text-white" : "text-white/30"}`}
              >
                Register
              </button>
            </div>

            <AnimatePresence mode="wait">
              {adminView === "login" ? (
                <motion.div key="login" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                  <div>
                    <label className="text-white/30 text-xs font-medium block mb-2">Username</label>
                    <input
                      type="text"
                      value={userId}
                      onChange={e => { setUserId(e.target.value); setError(""); }}
                      placeholder="Enter username"
                      className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm focus:outline-none focus:border-[#A855F7]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/30 text-xs font-medium block mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={e => { setPassword(e.target.value); setError(""); }}
                        placeholder="Enter password"
                        className="w-full h-12 px-4 pr-12 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm focus:outline-none focus:border-[#A855F7]/40 transition-colors"
                      />
                      <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/40">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-xs">{error}</p>
                    </div>
                  )}
                  <button
                    onClick={handleLogin}
                    className="w-full h-12 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 bg-[#A855F7] hover:bg-[#A855F7]/90 transition-colors"
                  >
                    <Lock className="w-4 h-4" /> Access Admin Dashboard
                  </button>
                </motion.div>
              ) : (
                <motion.div key="register" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  {regSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-[#22C55E]/15 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-[#22C55E]" />
                      </div>
                      <p className="text-white font-semibold mb-1">Account Created!</p>
                      <p className="text-white/35 text-xs mb-6">You can now login with your credentials.</p>
                      <button onClick={() => { setAdminView("login"); setRegSuccess(false); }} className="text-[#A855F7] text-sm hover:underline">
                        Go to Login →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {[
                        { label: "Full Name", value: regFullName, set: setRegFullName, placeholder: "John Doe", type: "text" },
                        { label: "Email", value: regEmail, set: setRegEmail, placeholder: "admin@guardex.rw", type: "email" },
                        { label: "Username", value: regUsername, set: setRegUsername, placeholder: "Choose a username", type: "text" },
                        { label: "Password", value: regPassword, set: setRegPassword, placeholder: "Min 6 characters", type: "password" },
                        { label: "Confirm Password", value: regConfirm, set: setRegConfirm, placeholder: "Repeat password", type: "password" },
                      ].map(field => (
                        <div key={field.label}>
                          <label className="text-white/30 text-xs font-medium block mb-1.5">{field.label}</label>
                          <input
                            type={field.type}
                            value={field.value}
                            onChange={e => { field.set(e.target.value); setError(""); }}
                            placeholder={field.placeholder}
                            className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm focus:outline-none focus:border-[#A855F7]/40 transition-colors"
                          />
                        </div>
                      ))}
                      {error && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                          <p className="text-red-400 text-xs">{error}</p>
                        </div>
                      )}
                      <button
                        onClick={handleRegister}
                        className="w-full h-12 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 bg-[#A855F7] hover:bg-[#A855F7]/90 transition-colors mt-2"
                      >
                        <UserPlus className="w-4 h-4" /> Create Admin Account
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => { setStep("select"); setError(""); setUserId(""); setPassword(""); }}
              className="w-full mt-4 text-white/25 text-xs hover:text-white/40 transition-colors py-2"
            >
              ← Change role
            </button>
          </motion.div>
        ) : (
          /* Police / Government login */
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-sm mx-auto">
            <div className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r ${selectedRole?.bg} border ${selectedRole?.border} mb-8`}>
              <span className="text-3xl">{selectedRole?.icon}</span>
              <div>
                <p className="text-white font-semibold">{selectedRole?.title}</p>
                <p className="text-white/30 text-xs">{selectedRole?.subtitle}</p>
              </div>
            </div>

            <div className="space-y-4 mb-4">
              <div>
                <label className="text-white/30 text-xs font-medium block mb-2">{selectedRole?.idLabel}</label>
                <input
                  type="text"
                  value={userId}
                  onChange={e => { setUserId(e.target.value); setError(""); }}
                  placeholder={selectedRole?.idPlaceholder}
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm focus:outline-none focus:border-[#2E7DFF]/40 transition-colors"
                />
              </div>
              <div>
                <label className="text-white/30 text-xs font-medium block mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(""); }}
                    placeholder="Enter your password"
                    className="w-full h-12 px-4 pr-12 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm focus:outline-none focus:border-[#2E7DFF]/40 transition-colors"
                  />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/40">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
                <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full h-12 rounded-xl font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2"
              style={{ backgroundColor: selectedRole?.color }}
            >
              <Lock className="w-4 h-4" />
              Access {selectedRole?.title} Dashboard
            </button>

            <button
              onClick={() => { setStep("select"); setError(""); setUserId(""); setPassword(""); }}
              className="w-full mt-3 text-white/25 text-xs hover:text-white/40 transition-colors py-2"
            >
              ← Change role
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}