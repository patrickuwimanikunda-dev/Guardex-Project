import React, { useState } from "react";
import { ShieldAlert, AlertTriangle, Car, Wine } from "lucide-react";
import StatCard from "./StatCard";
import LiveMapPanel from "./LiveMapPanel";
import AlertFeed from "./AlertFeed";
import VehicleDetailModal from "./VehicleDetailModal";

export default function PoliceOverview() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard icon={ShieldAlert} label="High Risk Vehicles" value="3" trend="+2" trendUp={true} color="#EF4444" delay={0} />
        <StatCard icon={AlertTriangle} label="Medium Risk" value="8" trend="-1" trendUp={false} color="#F59E0B" delay={0.1} />
        <StatCard icon={Car} label="Active Vehicles" value="142" trend="+12" trendUp={true} color="#2E7DFF" delay={0.2} />
        <StatCard icon={Wine} label="Alcohol Violations" value="5" trend="+3" trendUp={true} color="#A855F7" delay={0.3} />
      </div>

      {/* Map + Alerts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <LiveMapPanel onVehicleClick={(v) => setSelectedVehicle(v)} />
        </div>
        <div>
          <AlertFeed />
        </div>
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </div>
  );
}