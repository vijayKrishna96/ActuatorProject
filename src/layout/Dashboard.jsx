import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import ActuatorSizing from "../pages/ActuatorSizing";
import PartDecode from "../pages/PartDecode";
import S54sensor from "../pages/S54sensor";
import S5Xmonitor from "../pages/S5Xmonitor";

import ValveConfigInterface from "../pages/ValveConfig";
import DataSheet from "../pages/DataSheet";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Home");  
  const [showDatasheet, setShowDatasheet] = useState(false);

  // Function to render the corresponding component based on the active tab
  const renderView = () => {
    switch (activeTab) {
      case "Home":
        return <Home/>;
      case "Actuator Sizing":
        return <ActuatorSizing setActiveTab={setActiveTab} setShowDatasheet={setShowDatasheet} />;
      case "S98Part":
        return <ValveConfigInterface/>
      case "Part# Decode":
        return <PartDecode />;
      case "SS4 Sensor":
        return <S54sensor/>;
      case "SSX Monitor":
        return <S5Xmonitor />;
      case "Data Sheet":
        return <DataSheet/>
      default:
        return <ActuatorSizing setActiveTab={setActiveTab} setShowDatasheet={setShowDatasheet} />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} showDatasheet={showDatasheet} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="shadow-sm AdminHeader">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold">{activeTab === "Data Sheet" ? "" : activeTab}</h1>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8">{renderView()}</main>
      </div>
    </div>
  );
};

export default Dashboard;