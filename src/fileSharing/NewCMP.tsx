import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";


const NewCMP: React.FC = () => {
  const [file, setFile] = useState<FileList>();
  const [password, setPassword] = useState("");
  const [fileLink, setFileLink] = useState("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const blob = e.target.files;
    if (blob && blob.length > 0) {
      setFile(blob);
    }
  };

  const onSubmit = async () => {
    if (file && file.length) {
      const form = new FormData();
      form.append("file", file[0]);
      form.append("password", password);
      const { data } = await Axios.post("http://localhost:3020/upload", form);
      if (data && data.success) {
        setFileLink(data.data);
      }
    }
  };


  return (
    <div>
      <div className="col-6 mx-auto mt-5 shadow">
        <div className="card border-info mb-3">
          <div className="card-header">
            <h5> File Sharing </h5>
          </div>
          <div className="card-body">
            {fileLink && fileLink !== "" ? (
              <div className="text-center">
                <Link to="/download" state={{fileLink}} > <h4> Download File </h4></Link> 
                <i className="fs-1 bi bi-download"></i>
              </div>
            ) : (
              <div className="col-6 mx-auto">
                <input
                  type="file"
                  className="form-control my-3"
                  multiple={false}
                  required
                  name="file"
                  onChange={(e) => onChangeHandler(e)}
                />
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
                  type="button"
                >
                  Share File
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCMP;
