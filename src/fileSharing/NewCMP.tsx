import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../App";

const NewCMP: React.FC = () => {
  const [file, setFile] = useState<FileList>();
  const [password, setPassword] = useState("");
  const [fileData, setFileData] = useState({
    fileLink: "",
    fileId: "",
  });
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const blob = e.target.files;
    if (blob && blob.length > 0) {
      setFile(blob);
    }
  };

  const onSubmit = async () => {
    if (file && file.length) {
      if (password && password !== "") {
        const form = new FormData();
        file && form.append("file", file[0]);
        form.append("password", password);
        const { data } = await Axios.post(BASE_URL.concat("upload"), form);
        console.log("======Resssssssss", data);
        if (data && data.success) {
          // const { fileLink, fileId } = ;
          setFileData(data.data);
        } else {
          alert(data.message);
        }
      } else {
        alert("Please Enter Password for file encryption");
      }
    } else {
      alert("Please select your file");
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
            {fileData.fileLink && fileData.fileLink !== "" ? (
              <div className="text-center">
                {fileData.fileLink && fileData.fileLink !== "" && (
                  <h6> {fileData.fileLink} </h6>
                )}
                {fileData.fileLink && fileData.fileLink !== "" && (
                  <i
                    className="bi bi-clipboard fs-4 mx-3"
                    style={{ cursor: "pointer" }}
                    title="Copy File URL"
                    onClick={() => {
                      navigator.clipboard.writeText(fileData.fileLink);
                      alert("copied :" + fileData.fileLink);
                    }}
                  />
                )}
                <Link to={`/download/`.concat(fileData.fileId)}>
                  <h5> Download File </h5>
                  <i
                    className="fs-2 bi bi-download"
                    style={{ cursor: "pointer" }}
                  ></i>
                </Link>
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
                  Upload File
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
