import React, { useState } from "react";
import {
  LayoutDashboard,
  Wrench,
  ListFilter,
  Wifi,
  Monitor,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function SidebarItem({ icon: Icon, label, isActive, onClick }) {
  return (
    <div
      className={`flex items-center space-x-3 px-3 py-2 rounded cursor-pointer text-sm transition-colors
        ${isActive ? "bg-[#08549c] text-white" : "text-gray-700 hover:bg-gray-100"}`}
      onClick={onClick}
    >
      <Icon size={18} />
      <span>{label}</span>
    </div>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  // Set to null so nothing is active initially
  const [activeIndex, setActiveIndex] = useState(null);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Home", path: "C:\Users\punya\FCG\Actuatorproject\ActuatorProject\src\pages\Home.jsx" },
    { icon: Wrench, label: "Actuator Sizing", path: "C:\Users\punya\FCG\Actuatorproject\ActuatorProject\src\pages\ActuatorSizing.jsx" },
    { icon: ListFilter, label: "Part# Decode", path: "C:\Users\punya\FCG\Actuatorproject\ActuatorProject\src\pages\PartDecode.jsx" },
    { icon: Wifi, label: "SS4 Sensor", path: "C:\Users\punya\FCG\Actuatorproject\ActuatorProject\src\pages\S5Xmonitor.jsx" },
    { icon: Monitor, label: "SSX Monitor", path: "C:\Users\punya\FCG\Actuatorproject\ActuatorProject\src\pages\S54sensor.jsx" },
  ];

  return (
    <aside className="w-[220px] bg-white border-r border-gray-200 p-4 flex flex-col h-full">
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
          alt="Profile"
          className="w-20 h-20 rounded-full border mb-2"
        />
        <button className="mt-5 px-4 py-1 border rounded text-sm text-white border-[#08549c] bg-[#08549c] hover:text-white transition">
          Sign Out
        </button>
        <p className="mt-5 text-xs text-gray-500">
          Actuator Sizing Version 4.8.3
        </p>
      </div>

      <nav className="space-y-2 flex-1">
        {sidebarItems.map((item, idx) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={activeIndex === idx}
            onClick={() => {
              setActiveIndex(idx);
              navigate(item.path);
            }}
          />
        ))}
      </nav>
      <div className="flex justify-center mt-4">
        <button
          className="bg-[#08549c] text-white w-[90px] h-[40px] rounded-[3px] cursor-pointer hover:bg-blue-900"
          onClick={() => navigate("/datasheet")}
        >
          Datasheet
        </button>
      </div>
    </aside>
  );
}

