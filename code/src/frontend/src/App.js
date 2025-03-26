import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import IncidentDashboard from './components/IncidentDashboard';
import IncidentDetails from './components/IncidentDetails';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Monitoring from './components/Monitoring';
import ConfigManagement from './components/ConfigManagement';
import Reporting from './components/Reporting';
import Automation from './components/Automation';
import Header from './components/Header';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [iconColor, setIconColor] = useState('black');
  const location = useLocation();

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIconColor(isSidebarOpen ? '#a1c4fd' : 'black'); // Toggle icon color
  };

  const isIncidentDetailsPage = location.pathname.startsWith('/incident/');

  return (
    <div className={`main-content ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
      <Header onMenuClick={handleMenuClick} iconColor={iconColor} />
      <div style={{ display: 'flex' }}>
        {isSidebarOpen && <Sidebar />}
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incident/:status?" element={<IncidentDashboard />} />
            <Route path="/incidentdetails/:incidentId" element={<IncidentDetails />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/config-management" element={<ConfigManagement />} />
          </Routes>
        </div>       
      </div>
    </div>
  );
};

export default App;