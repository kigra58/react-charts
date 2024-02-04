import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
// import PieChart from "./charts/PieChart";
// import Navbar from "./components/Navbar";
// import BarChar from "./charts/BarChar";
// import LineChart from "./charts/LineChart";
import NewCMP from "./fileSharing/NewCMP";
import Verify from "./fileSharing/Verify";

const routes = ["/download", "/"];
export const BASE_URL = "http://localhost:3020/";

const App: React.FC = () => {
  const PathName = window.location.pathname;
  // console.log("paramsssss",params);
  // console.log("locations",location);
  console.log("PathName", PathName);

  useEffect(() => {
    if (!routes.includes(PathName)) {
      redirect(routes[0]);
    }
  }, [PathName]);

  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          {/* <Route path="/pie" element={<PieChart />} />
          <Route path="/bar" element={<BarChar />} />
          <Route path="/line" element={<LineChart />} /> */}
          <Route path="/" element={<NewCMP />} />
          {/* <Route path={`/file/${params.id}`} element={<Verify />} />  */}
          <Route path="/download/:fileId" element={<Verify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
