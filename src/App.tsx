import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
// import PieChart from "./charts/PieChart";
// import Navbar from "./components/Navbar";
// import BarChar from "./charts/BarChar";
// import LineChart from "./charts/LineChart";
import NewCMP from "./fileSharing/NewCMP";
import Verify from "./fileSharing/Verify";

const routes=[
  "/verify",
  "/"
]

const App: React.FC = () => {

  const params=useParams();
  const PathName=window.location.pathname
  // console.log("paramsssss",params);
  // console.log("locations",location);
  console.log("PathName",PathName);

  
  // useEffect(()=>{
  //   if()
  // },[PathName])

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
          <Route path="/download" element={<Verify />} /> 
        </Routes>
      </BrowserRouter>
  
    </div>
  );
};

export default App;
