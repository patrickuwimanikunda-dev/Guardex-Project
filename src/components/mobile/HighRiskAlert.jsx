import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Phone, Siren, X, MapPin, Clock, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HighRiskAlert({ onDismiss }) {
  return (
    <div className="pt-4 min-h-[800px]">
      {/* Emergency header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full p-6 rounded-2xl bg-gradient-to-br from-[#EF4444]/30 to-[#EF4444]/10 border border-[#EF4444]/30 mb-6 pulse-danger"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#EF4444]/20 flex items-center justify-center">
            <ShieldAlert className="w-7 h-7 text-[#EF4444]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#EF4444]">HIGH RISK ALERT</h2>
            <p className="text-white/40 text-xs">Immediate attention required</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20">
            <Siren className="w-4 h-4 text-[#EF4444]" />
            <div>
              <p className="text-white/40 text-[10px]">REASON</p>
              <p className="text-white text-sm font-medium">Alcohol detected + Overspeeding</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl bg-black/20 text-center">
              <Clock className="w-4 h-4 text-white/40 mx-auto mb-1" />
              <p className="text-white/30 text-[8px]">TIME</p>
              <p className="text-white text-xs font-semibold">14:32</p>
            </div>
            <div className="p-3 rounded-xl bg-black/20 text-center">
              <Gauge className="w-4 h-4 text-white/40 mx-auto mb-1" />
              <p className="text-white/30 text-[8px]">SPEED</p>
              <p className="text-white text-xs font-semibold">128 km/h</p>
            </div>
            <div className="p-3 rounded-xl bg-black/20 text-center">
              <MapPin className="w-4 h-4 text-white/40 mx-auto mb-1" />
              <p className="text-white/30 text-[8px]">LOCATION</p>
              <p className="text-white text-xs font-semibold">KG 7 Ave</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="space-y-3">
        <Button className="w-full h-14 rounded-2xl bg-[#2E7DFF] hover:bg-[#2E7DFF]/90 text-white font-semibold flex items-center gap-2">
          <Phone className="w-5 h-5" /> Call Driver
        </Button>
        <Button className="w-full h-14 rounded-2xl bg-[#EF4444] hover:bg-[#EF4444]/90 text-white font-semibold flex items-center gap-2">
          <Siren className="w-5 h-5" /> Escalate to Police
        </Button>
        <Button
          onClick={onDismiss}
          variant="outline"
          className="w-full h-14 rounded-2xl bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10 font-semibold flex items-center gap-2"
        >
          <X className="w-5 h-5" /> Dismiss
        </Button>
      </div>
    </div>
  );
}