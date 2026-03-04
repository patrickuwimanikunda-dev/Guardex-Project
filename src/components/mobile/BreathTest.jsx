import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, ShieldCheck, ShieldX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BreathTest({ onBack, onPassed }) {
  const [phase, setPhase] = useState("ready"); // ready | testing | safe | blocked
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (phase === "testing") {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setPhase(Math.random() > 0.3 ? "safe" : "blocked");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phase]);

  const startTest = () => {
    setCountdown(5);
    setPhase("testing");
  };

  return (
    <div className="pt-4 min-h-[800px]">
      <button onClick={onBack} className="flex items-center gap-1 text-white/40 text-sm mb-6 hover:text-white/60 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h2 className="text-xl font-bold text-white mb-1">Breath Alcohol Test</h2>
      <p className="text-white/35 text-sm mb-12">Blow into the sensor to begin</p>

      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          {phase === "ready" && (
            <motion.div key="ready" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-8">
                <div className="absolute inset-0 rounded-full bg-[#2E7DFF]/10 animate-breathe" />
                <div className="absolute inset-4 rounded-full bg-[#2E7DFF]/15 animate-breathe" style={{ animationDelay: "0.5s" }} />
                <div className="absolute inset-8 rounded-full bg-[#2E7DFF]/20 flex items-center justify-center">
                  <Wind className="w-16 h-16 text-[#2E7DFF]" strokeWidth={1} />
                </div>
              </div>
              <Button onClick={startTest} className="w-48 h-14 rounded-2xl bg-[#2E7DFF] hover:bg-[#2E7DFF]/90 text-white font-semibold">
                Start Test
              </Button>
            </motion.div>
          )}

          {phase === "testing" && (
            <motion.div key="testing" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-[#F59E0B]/10"
                />
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  className="absolute inset-4 rounded-full bg-[#F59E0B]/15"
                />
                <div className="absolute inset-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
                  <span className="text-5xl font-bold text-[#F59E0B]">{countdown}</span>
                </div>
              </div>
              <p className="text-white/50 text-sm animate-pulse">Analyzing breath sample...</p>
            </motion.div>
          )}

          {phase === "safe" && (
            <motion.div key="safe" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-8">
                <div className="absolute inset-0 rounded-full bg-[#22C55E]/10 pulse-safe" />
                <div className="absolute inset-8 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
                  <ShieldCheck className="w-16 h-16 text-[#22C55E]" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#22C55E] mb-2">Safe to Drive</h3>
              <p className="text-white/35 text-sm mb-6">No alcohol detected. Engine enabled.</p>
              <Button onClick={onPassed || onBack} className="w-48 h-12 rounded-2xl bg-[#22C55E]/20 hover:bg-[#22C55E]/30 text-[#22C55E] font-semibold border border-[#22C55E]/20">
                Start Driving
              </Button>
            </motion.div>
          )}

          {phase === "blocked" && (
            <motion.div key="blocked" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-8">
                <div className="absolute inset-0 rounded-full bg-[#EF4444]/10 pulse-danger" />
                <div className="absolute inset-8 rounded-full bg-[#EF4444]/20 flex items-center justify-center">
                  <ShieldX className="w-16 h-16 text-[#EF4444]" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#EF4444] mb-2">Engine Disabled</h3>
              <p className="text-white/35 text-sm text-center mb-6">Alcohol detected. Vehicle is locked for safety.</p>
              <Button onClick={() => { setPhase("ready"); setCountdown(5); }} className="w-48 h-12 rounded-2xl bg-[#EF4444]/20 hover:bg-[#EF4444]/30 text-[#EF4444] font-semibold border border-[#EF4444]/20">
                Retest
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}