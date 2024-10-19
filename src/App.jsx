import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WMADashboardPage from './layouts/WasteManagementAuthority/WMADashboardPage';
import GenerateWasteReportPage from './layouts/WasteManagementAuthority/GenerateWasteReportPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/waste-dashboard" element={<WMADashboardPage />} />
        <Route path="/waste-reports" element={<GenerateWasteReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
