import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; 
import Home from '../pages/Home';
import ActuatorSizing from '../pages/ActuatorSizing';
import PartDecode from '../pages/PartDecode';
import S5XMonitor from '../pages/S5Xmonitor';
import S4Sensor from '../pages/S54sensor';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('Actuator Sizing');

    const renderView = () => {
        switch (activeTab) {
            case 'Home':
                return <Home />;
            case 'Actuator Sizing':
                return <ActuatorSizing />;
             case 'Part Decode':
                return <PartDecode />;
             case 'S5X Monitor':
                return <S5XMonitor />;
             case 'S54 Sensor':
                return <S4Sensor />;
              default:
                return <div>Actuator Sizing</div>;
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar setActiveTab={setActiveTab} />
            <div className="flex-1">
                {renderView()}
            </div>
        </div>
    );
}

export default Dashboard;