import React, { useContext } from "react";
import {
  LayoutDashboard,
  Wrench,
  ListFilter,
  Wifi,
  Monitor,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { AuthContext } from "../config/AuthContext";


export default function Sidebar({ setActiveTab, activeTab , showDatasheet}) {
  const {logout , user} = useContext(AuthContext)
  return (
    <aside className="w-[220px] bg-white border-r border-gray-200 p-4 flex flex-col min-h-screen">
      {/* Profile and Sign Out */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
          alt="Profile"
          className="w-20 h-20 rounded-full border mb-2"
        />
        <h2 className="text-lg font-bold">Welcome</h2>
        {user && <p className="text-sm text-gray-600">{user.name}</p>}
        
        <button 
        onClick={logout}
        className="mt-5 px-4 py-1 border rounded text-sm text-[#08549c] border-[#08549c] hover:bg-[#08549c] hover:text-white transition">
          Sign Out
        </button>
        <p className="mt-5 text-xs text-gray-500">
          Actuator Sizing Version 4.8.3
        </p>
      </div>

      {/* Sidebar Navigation */}
      <nav className="space-y-2">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Home"
          isActive={activeTab === "Home"}
          onClick={() => setActiveTab("Home")}
        />
        <SidebarItem
          icon={<Wrench size={18} />}
          label="Actuator Sizing"
          isActive={activeTab === "Actuator Sizing"}
          onClick={() => setActiveTab("Actuator Sizing")}
        />
        <SidebarItem
          icon={<Wrench size={18} />}
          label="S98 Part#"
          isActive={activeTab === "S98Part"}
          onClick={() => setActiveTab("S98Part")}
        />
        <SidebarItem
          icon={<ListFilter size={18} />}
          label="Part# Decode"
          isActive={activeTab === "Part# Decode"}
          onClick={() => setActiveTab("Part# Decode")}
        />
        <SidebarItem
          icon={<Wifi size={18} />}
          label="SS4 Sensor"
          isActive={activeTab === "SS4 Sensor"}
          onClick={() => setActiveTab("SS4 Sensor")}
        />
        <SidebarItem
          icon={<Monitor size={18} />}
          label="SSX Monitor"
          isActive={activeTab === "SSX Monitor"}
          onClick={() => setActiveTab("SSX Monitor")}
        />
      </nav>

      {/* Datasheet Button */}
      {showDatasheet && (
        <div className="flex justify-center mt-4">
          <button 
            className={`bg-[#08549c] text-white w-[90px] h-[40px] rounded-[3px] cursor-pointer hover:bg-blue-900 ${
              activeTab === "Data Sheet" ? "bg-blue-900" : ""
            }`}
            onClick={() => setActiveTab("Data Sheet")}
          >
            Datasheet
          </button>
        </div>
      )}
    </aside>
  );
}