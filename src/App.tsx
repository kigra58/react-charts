import React from "react";
import PieChart from "./charts/PieChart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BarChar from "./charts/BarChar";
import LineChart from "./charts/LineChart";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/pie" element={<PieChart />} />
          <Route path="/bar" element={<BarChar />} />
          <Route path="/line" element={<LineChart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
