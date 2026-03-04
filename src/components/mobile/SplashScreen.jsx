import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function SplashScreen({ onComplete }) {
  React.useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[800px] relative">
      {/* Ambient glow */}
      <div className="absolute w-64 h-64 bg-[#2E7DFF]/20 rounded-full blur-[80px]" />
      <div className="absolute w-40 h-40 bg-[#22C55E]/10 rounded-full blur-[60px] translate-y-20" />
      
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Shield logo */}
        <div className="relative mb-8">
          <motion.div
            animate={{ boxShadow: ['0 0 0 0 rgba(46,125,255,0.3)', '0 0 0 20px rgba(46,125,255,0)', '0 0 0 0 rgba(46,125,255,0.3)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#2E7DFF] to-[#1B3A5C] flex items-center justify-center"
          >
            <Shield className="w-14 h-14 text-white" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </motion.div>
        </div>

        {/* Brand name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-bold text-white tracking-tight mb-2"
        >
          Guardex
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-white/40 text-sm font-medium tracking-wide"
        >
          VEHICLE SAFETY SYSTEM
        </motion.p>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-32 text-white/30 text-xs font-medium text-center px-8 tracking-wide"
      >
        Preventing Accidents Before They Happen.
      </motion.p>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 flex gap-1.5"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            className="w-1.5 h-1.5 rounded-full bg-[#2E7DFF]"
          />
        ))}
      </motion.div>
    </div>
  );
}