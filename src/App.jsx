import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WMADashboardPage from './layouts/WasteManagementAuthority/WMADashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/waste-dashboard" element={<WMADashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
