import React from "react";
import { motion } from "framer-motion";
import {
  Shield, LayoutDashboard, Car, BarChart3, Brain,
  Settings, Users, ChevronLeft, ChevronRight, LogOut, MapPin, AlertTriangle
} from "lucide-react";

const roleNavConfig = {
  police: [
    {
      label: "OPERATIONS",
      items: [
        { id: "overview", icon: LayoutDashboard, label: "Live Overview" },
        { id: "vehicles", icon: Car, label: "Vehicles" },
        { id: "alerts", icon: AlertTriangle, label: "Alert Center" },
      ]
    }
  ],
  government: [
    {
      label: "ANALYTICS",
      items: [
        { id: "analytics", icon: BarChart3, label: "National Analytics" },
        { id: "ai_prediction", icon: Brain, label: "AI Prediction" },
        { id: "heatmap", icon: MapPin, label: "Danger Zones" },
      ]
    }
  ],
  admin: [
    {
      label: "OPERATIONS",
      items: [
        { id: "overview", icon: LayoutDashboard, label: "Overview" },
        { id: "vehicles", icon: Car, label: "Vehicles" },
        { id: "analytics", icon: BarChart3, label: "Analytics" },
        { id: "ai_prediction", icon: Brain, label: "AI Prediction" },
      ]
    },
    {
      label: "ADMINISTRATION",
      items: [
        { id: "users", icon: Users, label: "User Management" },
        { id: "settings", icon: Settings, label: "System Settings" },
      ]
    }
  ]
};

const roleColors = {
  police: "#2E7DFF",
  government: "#22C55E",
  admin: "#A855F7",
};

const roleLabels = {
  police: { title: "Police Officer", sub: "Operational", icon: "🚔" },
  government: { title: "Gov. Authority", sub: "Strategic", icon: "🏛️" },
  admin: { title: "System Admin", sub: "Full Access", icon: "⚙️" },
};

export default function DashboardSidebar({ activeTab, onTabChange, collapsed, onToggle, role = "police", onLogout }) {
  const navSections = roleNavConfig[role] || roleNavConfig.police;
  const roleColor = roleColors[role] || "#2E7DFF";
  const roleInfo = roleLabels[role] || roleLabels.police;
  return (
    <div className={`h-screen bg-[#0A1628]/95 backdrop-blur-xl border-r border-white/6 flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} flex-shrink-0`}>
      {/* Logo */}
      <div className="p-5 flex items-center gap-3 border-b border-white/6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E7DFF] to-[#1B3A5C] flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-white" strokeWidth={1.5} />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-white font-bold text-lg tracking-tight">Guardex</h1>
            <p className="text-white/25 text-[10px] tracking-wider">COMMAND CENTER</p>
          </motion.div>
        )}
      </div>

      {/* Role badge */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-3 mt-4 p-3 rounded-xl border"
          style={{ backgroundColor: `${roleColor}10`, borderColor: `${roleColor}25` }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">{roleInfo.icon}</span>
            <div>
              <p className="text-white/80 text-xs font-semibold">{roleInfo.title}</p>
              <p className="text-white/30 text-[10px]">{roleInfo.sub} Access</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto mt-2">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="text-white/20 text-[10px] font-semibold tracking-wider px-3 mb-2">{section.label}</p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      isActive ? "text-white" : "text-white/35 hover:text-white/60 hover:bg-white/4"
                    }`}
                    style={isActive ? { backgroundColor: `${roleColor}18` } : {}}
                  >
                    <Icon
                      className="w-5 h-5 flex-shrink-0"
                      style={isActive ? { color: roleColor } : {}}
                      strokeWidth={1.5}
                    />
                    {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                    {isActive && !collapsed && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: roleColor }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom: logout + collapse */}
      <div className="p-3 border-t border-white/6 space-y-1">
        {!collapsed && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-white/25 hover:text-[#EF4444]/70 hover:bg-[#EF4444]/5 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs">Switch Role</span>
          </button>
        )}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-white/20 hover:text-white/40 hover:bg-white/4 transition-all"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </div>
  );
}