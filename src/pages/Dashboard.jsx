import React, { useState } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopBar from "../components/dashboard/DashboardTopBar";
import RoleLoginScreen from "../components/dashboard/RoleLoginScreen";
import PoliceOverview from "../components/dashboard/PoliceOverview";
import VehiclesTable from "../components/dashboard/VehiclesTable";
import AnalyticsDashboard from "../components/dashboard/AnalyticsDashboard";
import AIPredictionPanel from "../components/dashboard/AIPredictionPanel";
import AdminPanel from "../components/dashboard/AdminPanel";
import AlertFeed from "../components/dashboard/AlertFeed";
import { motion, AnimatePresence } from "framer-motion";

// Tab titles per role
const tabTitles = {
  overview: "Live Operational Overview",
  vehicles: "Vehicle Management",
  alerts: "Alert Center",
  analytics: "National Analytics Dashboard",
  ai_prediction: "AI Risk Prediction",
  heatmap: "Dangerous Zones Heatmap",
  users: "User Management",
  settings: "System Administration",
};

// Default first tab per role
const defaultTab = {
  police: "overview",
  government: "analytics",
  admin: "overview",
};

export default function Dashboard() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlRole = urlParams.get("role");

  const [role, setRole] = useState(null); // always show login first even with urlRole param
  const [activeTab, setActiveTab] = useState(defaultTab[urlRole] || "overview");
  const [collapsed, setCollapsed] = useState(false);

  const handleEnter = (selectedRole) => {
    setRole(selectedRole);
    setActiveTab(defaultTab[selectedRole] || "overview");
  };

  const handleLogout = () => {
    setRole(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <PoliceOverview />;
      case "vehicles":
        return <VehiclesTable />;
      case "alerts":
        return (
          <div className="max-w-2xl">
            <AlertFeed />
          </div>
        );
      case "analytics":
      case "heatmap":
        return <AnalyticsDashboard />;
      case "ai_prediction":
        return <AIPredictionPanel />;
      case "users":
      case "settings":
        return <AdminPanel />;
      default:
        return <PoliceOverview />;
    }
  };

  // Show role login if not authenticated
  if (!role) {
    return <RoleLoginScreen onEnter={handleEnter} initialRole={urlRole} />;
  }

  return (
    <div className="flex h-screen bg-[#060D18] overflow-hidden">
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        role={role}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopBar role={role} alertCount={role === "police" ? 4 : role === "admin" ? 2 : 0} />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-white text-xl font-bold">{tabTitles[activeTab]}</h2>
            </div>
            <p className="text-white/25 text-sm">
              {role === "police" && "Real-time operational monitoring · Kigali HQ"}
              {role === "government" && "Strategic analytics · National level"}
              {role === "admin" && "Full system control · Administrator"}
            </p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}