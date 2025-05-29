import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import ActuatorSizing from "../pages/ActuatorSizing";
import PartDecode from "../pages/PartDecode";
import S54sensor from "../pages/S54sensor";
import S5Xmonitor from "../pages/S5Xmonitor";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Home");  

  // Function to render the corresponding component based on the active tab
  const renderView = () => {
    switch (activeTab) {
      case "Home":
        return <Home/>;
      case "Actuator Sizing":
        return <ActuatorSizing />;
      case "Part# Decode":
        return <PartDecode />;
      case "SS4 Sensor":
        return <S54sensor/>;
      case "SSX Monitor":
        return <S5Xmonitor />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="shadow-sm AdminHeader">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold">{activeTab}</h1>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8">{renderView()}</main>
      </div>
    </div>
  );
};

export default Dashboard;