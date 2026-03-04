import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Fingerprint, ArrowLeft, Phone, Eye, EyeOff, UserPlus, Check, X } from "lucide-react";

// Storage helpers
const getList = (key) => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
const saveList = (key, d) => localStorage.setItem(key, JSON.stringify(d));

const ROLE_KEYS = {
  driver: "guardex_drivers",
  owner: "guardex_vehicle_owners",
  owner_drive: "guardex_vehicle_owners",
  family: "guardex_family_members",
  family_drive: "guardex_family_members",
};

const ROLE_LABELS = {
  driver: "Driver",
  owner: "Car Owner",
  owner_drive: "Owner (Drive)",
  family: "Family Member",
  family_drive: "Family (Drive)",
};

export default function LoginScreen({ onLogin, onBack, role }) {
  const [tab, setTab] = useState("login"); // login | register
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Register form
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regPlate, setRegPlate] = useState("");
  const isOwnerRole = role === "owner" || role === "owner_drive";
  const storageKey = ROLE_KEYS[role] || "guardex_drivers";

  const handleLogin = () => {
    setError("");
    const users = getList(storageKey);
    const match = users.find(u => u.username === username && u.password === password);
    if (!match) {
      setError("Invalid credentials. Please register or check your details.");
      return;
    }
    onLogin?.(match);
  };

  const handleRegister = () => {
    setError("");
    if (!regName || !regPhone || !regUsername || !regPassword || !regConfirm) {
      setError("All fields are required.");
      return;
    }
    if (isOwnerRole && !regPlate) {
      setError("Vehicle plate number is required.");
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
    const users = getList(storageKey);
    if (users.find(u => u.username === regUsername)) {
      setError("Username already taken.");
      return;
    }
    const newUser = { id: Date.now().toString(), fullName: regName, phone: regPhone, username: regUsername, password: regPassword, ...(isOwnerRole && { plateNumber: regPlate }), role, createdAt: new Date().toISOString() };
    saveList(storageKey, [...users, newUser]);
    setSuccess(true);
  };

  return (
    <div className="pt-4 pb-6">
      <button onClick={onBack} className="flex items-center gap-1 text-white/40 text-sm mb-6 hover:text-white/60 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#2E7DFF]/20 flex items-center justify-center">
            <Car className="w-5 h-5 text-[#2E7DFF]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Guardex</h1>
            <p className="text-white/30 text-xs">{ROLE_LABELS[role] || "User"} Access</p>
          </div>
        </div>
      </motion.div>

      {/* Tab toggle */}
      <div className="flex rounded-xl bg-white/5 p-1 mb-6 mt-4 border border-white/8">
        <button
          onClick={() => { setTab("login"); setError(""); }}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === "login" ? "bg-[#2E7DFF] text-white" : "text-white/30"}`}
        >
          Login
        </button>
        <button
          onClick={() => { setTab("register"); setError(""); setSuccess(false); }}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === "register" ? "bg-[#2E7DFF] text-white" : "text-white/30"}`}
        >
          Register
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === "login" ? (
          <motion.div key="login" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
            <div>
              <label className="text-white/30 text-xs font-medium block mb-1.5">Username / ID</label>
              <input
                type="text"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(""); }}
                placeholder="Your registered username"
                className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#2E7DFF]/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-white/30 text-xs font-medium block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="Your password"
                  className="w-full h-12 px-4 pr-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#2E7DFF]/50 transition-colors"
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full h-14 rounded-2xl bg-[#2E7DFF] hover:bg-[#2E7DFF]/90 text-white font-semibold text-sm transition-colors"
            >
              Login
            </button>

            <div className="relative flex items-center gap-4 py-1">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-white/20 text-xs">or</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            <button
              onClick={() => onLogin?.({ fullName: "Demo User", username: "demo" })}
              className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/8 transition-colors"
            >
              <Fingerprint className="w-6 h-6 text-[#2E7DFF]" />
              <span className="text-white/70 text-sm font-medium">Continue with Biometrics</span>
            </button>
          </motion.div>
        ) : (
          <motion.div key="register" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
            {success ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-[#22C55E]/15 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[#22C55E]" />
                </div>
                <p className="text-white font-bold mb-1">Account Created!</p>
                <p className="text-white/35 text-xs mb-6">You can now login with your username and password.</p>
                <button onClick={() => { setTab("login"); setSuccess(false); }} className="text-[#2E7DFF] text-sm hover:underline">
                  Go to Login →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { label: "Full Name", val: regName, set: setRegName, ph: "Jean Baptiste", type: "text" },
                  { label: "Phone Number", val: regPhone, set: setRegPhone, ph: "+250 7XX XXX XXX", type: "tel" },
                  ...(isOwnerRole ? [{ label: "Vehicle Plate Number", val: regPlate, set: setRegPlate, ph: "RAD 234 A", type: "text" }] : []),
                  { label: "Username (Login ID)", val: regUsername, set: setRegUsername, ph: "Choose a unique username", type: "text" },
                  { label: "Password", val: regPassword, set: setRegPassword, ph: "Min 6 characters", type: "password" },
                  { label: "Confirm Password", val: regConfirm, set: setRegConfirm, ph: "Repeat password", type: "password" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-white/30 text-xs font-medium block mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      value={f.val}
                      onChange={e => { f.set(e.target.value); setError(""); }}
                      placeholder={f.ph}
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm focus:outline-none focus:border-[#2E7DFF]/40 transition-colors"
                    />
                  </div>
                ))}

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-xs">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleRegister}
                  className="w-full h-12 rounded-2xl bg-[#2E7DFF] hover:bg-[#2E7DFF]/90 text-white font-semibold text-sm flex items-center justify-center gap-2 mt-2 transition-colors"
                >
                  <UserPlus className="w-4 h-4" /> Create Account
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}