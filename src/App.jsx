import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WasteCollectorProfile from "./views/collector/WasteCollectorProfile";
import WMA from "./components/wma/WMA";
import Admin from "./components/admin/Admin";
import Resident from "./components/resident/Resident";
import Contoller from "./components/collector/Contoller";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/wma" element={<WMA />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/resident" element={<Resident />} />
        <Route path="/collector" element={<Contoller />} >
          <Route path="/home" element={<WasteCollectorProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
