import React from "react";
import { motion } from "framer-motion";
import { Car, UserCircle, Users, ChevronRight, Key } from "lucide-react";

const roles = [
  {
    id: "driver",
    icon: Car,
    title: "Driver",
    description: "Monitor your driving safety in real-time",
    gradient: "from-[#2E7DFF]/20 to-[#2E7DFF]/5",
    iconBg: "bg-[#2E7DFF]/20",
    iconColor: "text-[#2E7DFF]"
  },
  {
    id: "owner",
    icon: UserCircle,
    title: "Car Owner",
    description: "Track and manage your vehicle remotely",
    gradient: "from-[#22C55E]/20 to-[#22C55E]/5",
    iconBg: "bg-[#22C55E]/20",
    iconColor: "text-[#22C55E]"
  },
  {
    id: "owner_drive",
    icon: Key,
    title: "Owner — I Want to Drive",
    description: "Drive your own vehicle. Alcohol test required before start.",
    gradient: "from-[#F59E0B]/20 to-[#F59E0B]/5",
    iconBg: "bg-[#F59E0B]/20",
    iconColor: "text-[#F59E0B]"
  },
  {
    id: "family",
    icon: Users,
    title: "Family Member",
    description: "Stay updated on your loved one's safety",
    gradient: "from-[#A855F7]/20 to-[#A855F7]/5",
    iconBg: "bg-[#A855F7]/20",
    iconColor: "text-[#A855F7]"
  },
  {
    id: "family_drive",
    icon: Car,
    title: "Family Member — I Want to Drive",
    description: "Drive a family vehicle. Alcohol test required before start.",
    gradient: "from-[#EF4444]/20 to-[#EF4444]/5",
    iconBg: "bg-[#EF4444]/20",
    iconColor: "text-[#EF4444]"
  },
];

export default function RoleSelection({ onSelectRole }) {
  return (
    <div className="pt-8 pb-6">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-10"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Welcome to Guardex</h1>
        <p className="text-white/40 text-sm">Choose your role to continue</p>
      </motion.div>

      <div className="space-y-4">
        {roles.map((role, index) => {
          const Icon = role.icon;
          return (
            <motion.button
              key={role.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
              onClick={() => onSelectRole?.(role.id)}
              className={`w-full p-5 rounded-2xl bg-gradient-to-r ${role.gradient} border border-white/8 flex items-center gap-4 text-left group hover:border-white/15 transition-all duration-300`}
            >
              <div className={`w-14 h-14 rounded-2xl ${role.iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-7 h-7 ${role.iconColor}`} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-base mb-0.5">{role.title}</h3>
                <p className="text-white/35 text-xs">{role.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/40 transition-colors" />
            </motion.button>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-white/20 text-xs mt-10"
      >
        You can change your role later in settings
      </motion.p>
    </div>
  );
}