import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Car, User, Gauge, Shield, Wine, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import VehicleDetailModal from "./VehicleDetailModal";

const mockVehicles = [
  { id: 1, plate: "RAD 234 A", driver: "Jean Baptiste", type: "Sedan", speed: 72, risk: "safe", score: 87, alcohol: "clear", engine: "active" },
  { id: 2, plate: "RAB 712 C", driver: "Alice Uwimana", type: "SUV", speed: 95, risk: "medium", score: 65, alcohol: "clear", engine: "active" },
  { id: 3, plate: "RAC 189 B", driver: "Eric Mugabo", type: "Truck", speed: 128, risk: "high", score: 32, alcohol: "detected", engine: "blocked" },
  { id: 4, plate: "RAD 445 D", driver: "Grace Ingabire", type: "Sedan", speed: 60, risk: "safe", score: 91, alcohol: "clear", engine: "active" },
  { id: 5, plate: "RAE 331 A", driver: "Joseph Niyonzima", type: "SUV", speed: 55, risk: "safe", score: 88, alcohol: "clear", engine: "active" },
  { id: 6, plate: "RAF 892 B", driver: "Patrick Habimana", type: "Sedan", speed: 110, risk: "medium", score: 58, alcohol: "clear", engine: "active" },
  { id: 7, plate: "RAG 117 C", driver: "Marie Ishimwe", type: "Bus", speed: 45, risk: "safe", score: 94, alcohol: "clear", engine: "active" },
];

const riskStyles = {
  safe: "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20",
  medium: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
  high: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20",
};

export default function VehiclesTable() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = mockVehicles.filter(v =>
    v.plate.toLowerCase().includes(search.toLowerCase()) ||
    v.driver.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search & Filter */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-white/25 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by plate or driver..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/5 border border-white/8 text-white/70 text-sm placeholder:text-white/20 focus:outline-none focus:border-[#2E7DFF]/30 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-white/5 border border-white/8 text-white/40 text-xs hover:bg-white/8 transition-colors">
          <Filter className="w-3.5 h-3.5" /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
        <div className="grid grid-cols-7 gap-4 p-4 border-b border-white/[0.06]">
          {["Vehicle", "Driver", "Speed", "Risk", "Score", "Alcohol", ""].map((h) => (
            <span key={h} className="text-white/20 text-[10px] font-semibold uppercase tracking-wider">{h}</span>
          ))}
        </div>
        <div>
          {filtered.map((v, index) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.03 }}
              className="grid grid-cols-7 gap-4 p-4 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors items-center"
            >
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-white/20" />
                <span className="text-white/70 text-xs font-semibold">{v.plate}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-white/20" />
                <span className="text-white/50 text-xs">{v.driver}</span>
              </div>
              <span className="text-white/60 text-xs font-medium">{v.speed} km/h</span>
              <Badge className={`text-[10px] border w-fit ${riskStyles[v.risk]} capitalize`}>{v.risk}</Badge>
              <span className="text-white/60 text-xs font-bold">{v.score}</span>
              <Badge className={`text-[10px] w-fit ${v.alcohol === 'clear' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                {v.alcohol}
              </Badge>
              <button
                onClick={() => setSelectedVehicle(v)}
                className="flex items-center gap-1 text-[#2E7DFF] text-xs hover:text-[#2E7DFF]/70 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" /> View
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedVehicle && (
        <VehicleDetailModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
      )}
    </div>
  );
}