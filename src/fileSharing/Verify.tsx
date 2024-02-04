import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../App";

const Verify: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [verified, setVerifield] = useState(
    localStorage.getItem("FV") ? localStorage.getItem("FV") : false
  );

  const [loading, setLoading] = useState(false);
  const params = useParams() as { fileId: string };

  console.log("=====parsamsssss", params.fileId);

  const onSubmit = async () => {
    try {
      setLoading(true);
      if (params && params.fileId) {
        const { data } = await Axios.post(
          BASE_URL.concat(`verify/file/${params.fileId}`),
          { password }
        );
        console.log("responseeeeeee", data);
        if (data && data.success) {
          setVerifield(data.data);
          localStorage.setItem("FV", data.data);
        } else {
          alert(data.message);
          navigate(data.url);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const downloadHandler = () => {
    window.open(BASE_URL.concat("download/").concat(params.fileId));
  };

  console.log("=password", password);

  return (
    <div className="col-6 mx-auto mt-5 shadow">
      <div className="card border-info mb-3">
        <div className="card-header">
          <h5> File Sharing </h5>
        </div>
        <div className="card-body">
          <div className="col-6 mx-auto">
            {verified ? (
              <i
                className=" fs-2 bi bi-cloud-arrow-down"
                title="Download File"
                style={{ cursor: "pointer" }}
                onClick={downloadHandler}
              ></i>
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
                  Verify{" "}
                  {loading && (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
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
