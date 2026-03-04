import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Shield, ChevronRight, Car, Brain, Activity, Lock } from "lucide-react";

const features = [
  { icon: Car, title: "Real-time Monitoring", desc: "Track vehicle sensors and driving behavior in real-time" },
  { icon: Brain, title: "AI Prediction", desc: "Machine learning crash probability assessment" },
  { icon: Activity, title: "Risk Analytics", desc: "Comprehensive safety dashboards and reports" },
  { icon: Lock, title: "Alcohol Interlock", desc: "Automatic engine disable on alcohol detection" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060D18] text-white overflow-hidden">
      {/* Hero */}
      <div className="relative">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2E7DFF]/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-[#A855F7]/8 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20">
          {/* Nav */}
          <nav className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E7DFF] to-[#1B3A5C] flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">Guardex</span>
            </div>
          </nav>

          {/* Hero content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2E7DFF]/10 border border-[#2E7DFF]/20 mb-8">
              <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
              <span className="text-[#2E7DFF] text-sm font-medium">Smart Vehicle Safety System</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
              Preventing Accidents<br />Before They Happen
            </h1>
            <p className="text-white/35 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Enterprise-grade vehicle safety platform integrating hardware sensors, AI prediction, and real-time monitoring for national-level deployment.
            </p>

            {/* Web Dashboards */}
            <div className="w-full max-w-xl mx-auto">
              <p className="text-white/20 text-xs uppercase tracking-widest text-center mb-3">Web Dashboards</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  to={createPageUrl("Dashboard") + "?role=police"}
                  className="flex flex-col items-center gap-2 px-4 py-4 rounded-2xl bg-[#2E7DFF]/8 border border-[#2E7DFF]/20 hover:bg-[#2E7DFF]/15 transition-colors group"
                >
                  <span className="text-2xl">🚔</span>
                  <span className="text-white/70 text-sm font-semibold">Police</span>
                  <span className="text-white/25 text-[10px] text-center">Operational monitoring</span>
                </Link>
                <Link
                  to={createPageUrl("Dashboard") + "?role=government"}
                  className="flex flex-col items-center gap-2 px-4 py-4 rounded-2xl bg-[#22C55E]/8 border border-[#22C55E]/20 hover:bg-[#22C55E]/15 transition-colors group"
                >
                  <span className="text-2xl">🏛️</span>
                  <span className="text-white/70 text-sm font-semibold">Government</span>
                  <span className="text-white/25 text-[10px] text-center">Strategic analytics</span>
                </Link>
                <Link
                  to={createPageUrl("Dashboard") + "?role=admin"}
                  className="flex flex-col items-center gap-2 px-4 py-4 rounded-2xl bg-[#A855F7]/8 border border-[#A855F7]/20 hover:bg-[#A855F7]/15 transition-colors group"
                >
                  <span className="text-2xl">⚙️</span>
                  <span className="text-white/70 text-sm font-semibold">Admin</span>
                  <span className="text-white/25 text-[10px] text-center">Full system control</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2E7DFF]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#2E7DFF]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white/80 text-sm font-semibold mb-1">{feature.title}</h3>
                  <p className="text-white/25 text-xs leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-20 text-center">
            <p className="text-white/15 text-xs">© 2026 Guardex — Smart Vehicle Safety System. Rwanda.</p>
          </div>
        </div>
      </div>
    </div>
  );
}