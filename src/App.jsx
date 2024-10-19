// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WMADashboardPage from './layouts/WasteManagementAuthority/WMADashboardPage';
import GenerateWasteReportPage from './layouts/WasteManagementAuthority/GenerateWasteReportPage'
import WasteCollectionHistoryPage from './layouts/WasteManagementAuthority/WasteCollectionHistoryPage';
import WasteCollectionRequests from './layouts/WasteManagementAuthority/WasteCollectionRequestPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WMADashboardPage />} />
        {/* <Route path="/waste-dashboard" element={<WMADashboardPage />} /> */}
        <Route path="/waste-reports" element={<GenerateWasteReportPage />} />
        <Route path='/waste-history' element={<WasteCollectionHistoryPage />} />
        <Route path='/waste-requests' element={<WasteCollectionRequests />} />
      </Routes>
    </Router>
  );
}

export default App;
