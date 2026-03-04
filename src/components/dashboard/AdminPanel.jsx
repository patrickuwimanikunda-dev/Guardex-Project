import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Users, Sliders, Wifi, ScrollText, Plus, X, Trash2, Eye, EyeOff, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ── Storage helpers ──────────────────────────────────────────────────────────
const getVehicleOwners = () => {
  try { return JSON.parse(localStorage.getItem("guardex_vehicle_owners") || "[]"); } catch { return []; }
};
const saveVehicleOwners = (d) => localStorage.setItem("guardex_vehicle_owners", JSON.stringify(d));

const getSystemManagers = () => {
  try { return JSON.parse(localStorage.getItem("guardex_system_managers") || "[]"); } catch { return []; }
};
const saveSystemManagers = (d) => localStorage.setItem("guardex_system_managers", JSON.stringify(d));

// ── Sub-components ──────────────────────────────────────────────────────────

function AddUserModal({ type, onClose, onAdded }) {
  const [form, setForm] = useState({ fullName: "", phone: "", username: "", password: "", plateNumber: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const isOwner = type === "owner";

  const handleSubmit = () => {
    setError("");
    if (!form.fullName || !form.phone || !form.username || !form.password) {
      setError("All fields are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (isOwner && !form.plateNumber) {
      setError("Plate number is required for vehicle owners.");
      return;
    }
    const list = isOwner ? getVehicleOwners() : getSystemManagers();
    if (list.find(u => u.username === form.username)) {
      setError("Username already exists.");
      return;
    }
    const newUser = { ...form, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const updated = [...list, newUser];
    isOwner ? saveVehicleOwners(updated) : saveSystemManagers(updated);
    onAdded(updated);
    onClose();
  };

  const fields = [
    { key: "fullName", label: "Full Name", placeholder: "e.g. Jean Baptiste", type: "text" },
    { key: "phone", label: "Phone Number", placeholder: "+250 7XX XXX XXX", type: "tel" },
    ...(isOwner ? [{ key: "plateNumber", label: "Vehicle Plate Number", placeholder: "e.g. RAD 234 A", type: "text" }] : []),
    { key: "username", label: "Username (Login ID)", placeholder: isOwner ? "e.g. VO-2024-0001" : "e.g. MGR-2024-0001", type: "text" },
    { key: "password", label: "Password", placeholder: "Min 6 characters", type: "password" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0F2241] border border-white/10 rounded-2xl p-6 w-full max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-bold text-base">
            Add {isOwner ? "Vehicle Owner" : "System Manager"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/60">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {fields.map(f => (
            <div key={f.key}>
              <label className="text-white/30 text-xs font-medium block mb-1.5">{f.label}</label>
              <div className="relative">
                <input
                  type={f.type === "password" ? (showPass ? "text" : "password") : f.type}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm focus:outline-none focus:border-[#2E7DFF]/40 transition-colors"
                />
                {f.type === "password" && (
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          ))}

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <div className="pt-1 p-3 rounded-xl bg-[#2E7DFF]/5 border border-[#2E7DFF]/15">
            <p className="text-[#2E7DFF]/70 text-[10px] font-semibold mb-1">Login credentials example</p>
            <p className="text-white/40 text-[10px]">Username: <span className="text-white/60">{isOwner ? "VO-2024-0001" : "MGR-2024-0001"}</span></p>
            <p className="text-white/40 text-[10px]">Password: <span className="text-white/60">min 6 characters of your choice</span></p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full h-11 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 bg-[#2E7DFF] hover:bg-[#2E7DFF]/90 transition-colors mt-1"
          >
            <Check className="w-4 h-4" /> Save User
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function UserList({ users, onRemove, color = "#22C55E", roleLabel }) {
  return (
    <div className="space-y-2">
      {users.length === 0 && (
        <p className="text-white/20 text-xs text-center py-4">No {roleLabel}s added yet.</p>
      )}
      {users.map(u => (
        <div key={u.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <div className="flex-1 min-w-0">
            <p className="text-white/70 text-xs font-semibold truncate">{u.fullName}</p>
            <p className="text-white/25 text-[10px]">ID: {u.username} · {u.phone}</p>
            {u.plateNumber && <p className="text-white/20 text-[10px]">Plate: {u.plateNumber}</p>}
          </div>
          <button
            onClick={() => onRemove(u.id)}
            className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/20 hover:text-red-400 transition-colors ml-2 flex-shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Main AdminPanel ──────────────────────────────────────────────────────────
const weights = [
  { label: "Speed Weight", value: 35 },
  { label: "Alcohol Weight", value: 30 },
  { label: "Phone Usage Weight", value: 15 },
  { label: "Swerving Weight", value: 20 },
];

export default function AdminPanel() {
  const [vehicleOwners, setVehicleOwners] = useState(getVehicleOwners);
  const [systemManagers, setSystemManagers] = useState(getSystemManagers);
  const [modal, setModal] = useState(null); // "owner" | "manager" | null

  const removeOwner = (id) => {
    const updated = vehicleOwners.filter(u => u.id !== id);
    setVehicleOwners(updated);
    saveVehicleOwners(updated);
  };

  const removeManager = (id) => {
    const updated = systemManagers.filter(u => u.id !== id);
    setSystemManagers(updated);
    saveSystemManagers(updated);
  };

  return (
    <div>
      <AnimatePresence>
        {modal && (
          <AddUserModal
            type={modal}
            onClose={() => setModal(null)}
            onAdded={(list) => {
              if (modal === "owner") setVehicleOwners(list);
              else setSystemManagers(list);
            }}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Vehicle Owners */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-[#2E7DFF]" />
              <h3 className="text-white/80 text-sm font-semibold">Vehicle Owners</h3>
            </div>
            <button
              onClick={() => setModal("owner")}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-[#2E7DFF]/15 text-[#2E7DFF] hover:bg-[#2E7DFF]/25 transition-colors font-semibold"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          <p className="text-white/20 text-[10px] mb-4">Users who own vehicles in the system</p>
          <UserList users={vehicleOwners} onRemove={removeOwner} color="#2E7DFF" roleLabel="Vehicle Owner" />
        </div>

        {/* System Managers */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#A855F7]" />
              <h3 className="text-white/80 text-sm font-semibold">System Managers</h3>
            </div>
            <button
              onClick={() => setModal("manager")}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-[#A855F7]/15 text-[#A855F7] hover:bg-[#A855F7]/25 transition-colors font-semibold"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          <p className="text-white/20 text-[10px] mb-4">Staff members with system management access</p>
          <UserList users={systemManagers} onRemove={removeManager} color="#A855F7" roleLabel="System Manager" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Algorithm Weights */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="w-4 h-4 text-[#F59E0B]" />
            <h3 className="text-white/80 text-sm font-semibold">Risk Algorithm Weights</h3>
          </div>
          <div className="space-y-4">
            {weights.map((w) => (
              <div key={w.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white/50 text-xs">{w.label}</span>
                  <span className="text-white/40 text-xs font-bold">{w.value}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden relative">
                  <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: `${w.value}%` }} />
                  <div className="absolute top-0 w-4 h-4 bg-white rounded-full border-2 border-[#F59E0B] -translate-y-[3px] cursor-pointer shadow-lg" style={{ left: `calc(${w.value}% - 8px)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hardware + Logs */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Wifi className="w-4 h-4 text-[#2E7DFF]" />
              <h3 className="text-white/80 text-sm font-semibold">Hardware Connectivity</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Alcohol Sensors", online: 138, total: 142 },
                { label: "Speed Sensors", online: 141, total: 142 },
                { label: "Gyroscopes", online: 135, total: 142 },
                { label: "GPS Modules", online: 140, total: 142 },
              ].map((hw) => (
                <div key={hw.label} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-white/40 text-[10px] mb-1">{hw.label}</p>
                  <p className="text-white text-sm font-bold">{hw.online}<span className="text-white/20">/{hw.total}</span></p>
                  <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${(hw.online / hw.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
            <div className="flex items-center gap-2 mb-3">
              <ScrollText className="w-4 h-4 text-white/40" />
              <h3 className="text-white/80 text-sm font-semibold">System Logs</h3>
            </div>
            <div className="space-y-1.5 font-mono">
              {[
                { time: "14:32:18", msg: "Vehicle RAC-189B risk escalated to HIGH" },
                { time: "14:30:05", msg: "Alcohol sensor triggered — RAB-712C" },
                { time: "14:28:41", msg: "GPS module reconnected — RAD-445D" },
              ].map((log, i) => (
                <div key={i} className="flex gap-2 text-[10px]">
                  <span className="text-[#2E7DFF]/50">{log.time}</span>
                  <span className="text-white/30">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}