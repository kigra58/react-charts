import React, { useState } from "react";
import Axios from "axios";
import {  useLocation } from "react-router-dom";

const Verify: React.FC = () => {
  const [password, setPassword] = useState("");
  const [fileId, setFileId] = useState("");



  const [loading, setLoading] = useState(false);
  const location = useLocation().state;

  const onSubmit = async () => {
    try {
      setLoading(true);
      if (location && location.fileLink) {
        const { data } = await Axios.post(location.fileLink,{password});
   
        if (data && data.success) {
          setFileId(data.data);
          alert("verify successfully");
        }else{
          alert();

        }
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const downloadHandler=()=>{
    window.open("http://localhost:3020/download/".concat(fileId))
  }

  console.log("======fileIdfileId",fileId);

  return (
    <div className="col-6 mx-auto mt-5 shadow">
      <div className="card border-info mb-3">
        <div className="card-header">
          <h5> File Sharing </h5>
        </div>
        <div className="card-body">
          <div className="col-6 mx-auto">
            {fileId && fileId!=="" ? (
              <i 
              className=" fs-2 bi bi-cloud-arrow-down"
               title="Download File"
                style={{cursor:"pointer"}}
                onClick={downloadHandler} ></i>
            ) : (
              <>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  name="password"
                />
                <button
                  className="btn btn-outline-info mt-4"
                  onClick={onSubmit}
                //   disabled={loading}
                >
                    Verify {" "}
                  {loading && (
                   <div className="spinner-border spinner-border-sm" role="status">
                   <span className="visually-hidden">Loading...</span>
                 </div>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
