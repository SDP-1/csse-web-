import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WasteCollectorProfile from "./views/collector/WasteCollectorProfile";
import CollectingRoute from "./views/collector/CollectingRoute";
import WMA from "./components/wma/WMA";
import Admin from "./components/admin/Admin";
import Resident from "./components/resident/Resident";

const App = () => {
  return (
    // <CollectingRoute/>
    <Router>
      <Routes>
        <Route path="/wma" element={<WMA />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/resident" element={<Resident />} />
        <Route path="/collector" element={<WasteCollectorProfile />} />
        <Route path="/collector/home" element={<WasteCollectorProfile />} />
        <Route path="/collector/route" element={<CollectingRoute />} />
      </Routes>
    </Router>
  );
};

export default App;
