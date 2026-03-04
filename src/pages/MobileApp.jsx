import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MobileFrame from "../components/mobile/MobileFrame";
import SplashScreen from "../components/mobile/SplashScreen";
import RoleSelection from "../components/mobile/RoleSelection";
import LoginScreen from "../components/mobile/LoginScreen";
import DriverDashboard from "../components/mobile/DriverDashboard";
import BreathTest from "../components/mobile/BreathTest";
import LiveMonitoring from "../components/mobile/LiveMonitoring";
import DriverHistory from "../components/mobile/DriverHistory";
import OwnerDashboard from "../components/mobile/OwnerDashboard";
import HighRiskAlert from "../components/mobile/HighRiskAlert";
import AICrashPrediction from "../components/mobile/AICrashPrediction";

const mockVehicle = {
  plate_number: "RAD 234 A",
  driver_name: "Jean Baptiste",
  speed: 72,
  risk_level: "safe",
  driving_score: 87,
  alcohol_status: "clear",
  phone_usage: false,
  swerving_detected: false,
  engine_status: "active",
  connected: true,
  crash_probability: 23,
};

export default function MobileApp() {
  const [screen, setScreen] = useState("splash");
  const [role, setRole] = useState(null);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setScreen("login");
  };

  const handleLogin = () => {
    if (role === "driver") setScreen("driver_dashboard");
    else if (role === "owner_drive" || role === "family_drive") setScreen("breath_test");
    else setScreen("owner_dashboard");
  };

  const handleNavigation = (tab) => {
    if (tab === "dashboard") setScreen("driver_dashboard");
    else if (tab === "monitor") setScreen("live_monitoring");
    else if (tab === "history") setScreen("driver_history");
    else if (tab === "profile") setScreen("ai_prediction");
  };

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen onComplete={() => setScreen("role_select")} />;
      case "role_select":
        return <RoleSelection onSelectRole={handleRoleSelect} />;
      case "login":
        return <LoginScreen onLogin={handleLogin} onBack={() => setScreen("role_select")} role={role} />;
      case "driver_dashboard":
        return (
          <DriverDashboard
            vehicle={mockVehicle}
            onNavigate={handleNavigation}
            onSOS={() => setScreen("high_risk_alert")}
          />
        );
      case "breath_test":
        return (
          <BreathTest
            onBack={() => setScreen("role_select")}
            onPassed={() => setScreen("driver_dashboard")}
          />
        );
      case "live_monitoring":
        return <LiveMonitoring vehicle={mockVehicle} onBack={() => setScreen("driver_dashboard")} />;
      case "driver_history":
        return <DriverHistory onBack={() => setScreen("driver_dashboard")} />;
      case "owner_dashboard":
        return <OwnerDashboard vehicle={mockVehicle} onBack={() => setScreen("role_select")} />;
      case "high_risk_alert":
        return <HighRiskAlert onDismiss={() => setScreen("driver_dashboard")} />;
      case "ai_prediction":
        return <AICrashPrediction onBack={() => setScreen("driver_dashboard")} />;
      default:
        return <SplashScreen onComplete={() => setScreen("role_select")} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#060D18] flex items-center justify-center p-4">
      {/* Screen navigation pills */}
      <div className="hidden lg:flex flex-col gap-2 mr-8 max-w-[200px]">
        <p className="text-white/30 text-xs font-medium mb-2 uppercase tracking-wider">Screens</p>
        {[
          { id: "splash", label: "Splash" },
          { id: "role_select", label: "Role Selection" },
          { id: "login", label: "Login" },
          { id: "driver_dashboard", label: "Driver Dashboard" },
          { id: "breath_test", label: "Owner/Family Drive" },
          { id: "live_monitoring", label: "Live Monitor" },
          { id: "driver_history", label: "History" },
          { id: "owner_dashboard", label: "Owner Dashboard" },
          { id: "high_risk_alert", label: "High Risk Alert" },
          { id: "ai_prediction", label: "AI Prediction" },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => {
              if (s.id === "login") setRole("driver");
              if (s.id === "owner_dashboard") setRole("owner");
              setScreen(s.id);
            }}
            className={`text-left text-xs px-3 py-2 rounded-lg transition-all ${
              screen === s.id
                ? "bg-[#2E7DFF]/20 text-[#2E7DFF] font-semibold"
                : "text-white/30 hover:text-white/50 hover:bg-white/5"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <MobileFrame>
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </MobileFrame>
    </div>
  );
}