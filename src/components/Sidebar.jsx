import React from "react";

import {
  LayoutDashboard,
  Wrench,
  ListFilter,
  Wifi,
  Monitor,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-[220px] bg-white border-r border-gray-200 p-4 flex flex-col min-h-screen">
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
          alt="Profile"
          className="w-20 h-20 rounded-full border mb-2"
        />

        <button className="mt-5 px-4 py-1 border rounded text-sm text-[#08549c] border-[#08549c] hover:bg-[#08549c] hover:text-white transition">
          Sign Out
        </button>
        <p className="mt-5 text-xs text-gray-500">
          Actuator Sizing Version 4.8.3
        </p>
      </div>

      <nav className="space-y-2">
        <SidebarItem icon={<LayoutDashboard size={18} />} label="Home" />
        <SidebarItem icon={<Wrench size={18} />} label="Actuator Sizing" />
        <SidebarItem icon={<ListFilter size={18} />} label="Part# Decode" />
        <SidebarItem icon={<Wifi size={18} />} label="SS4 Sensor" />
        <SidebarItem icon={<Monitor size={18} />} label="SSX Monitor" />
      </nav>
      <div className="flex justify-center mt-4">
          <button className="bg-[#08549c] text-white w-[90px] h-[40px] rounded-[3px] cursor-pointer hover:bg-blue-900"><a href="Login.jsx">
            Datasheet
          </a></button>
        </div>
    </aside>
    
  );
}

function SidebarItem({ icon, label }) {
  return (
    <div className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
    
  );
}
