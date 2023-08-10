import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";

export default function Movies() {
  const { authData } = useAuth();

  const [file, setFile] = useState<Blob | any>();
  const [uploadedFile, setUploadedFile] = useState();
  const [error, setError] = useState<string>();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!authData?.token) {
      setError("You must be logged in to upload an avatar!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);

    const config = {
      headers: {
        Authorization: `Bearer ${authData.token}`,
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:8000/auth/upload", formData, config)
      .then((res) => {
        console.log(res.data);
        setUploadedFile(res.data.file);
      })
      .catch((err: AxiosError) => {
        console.error("Error uploading file: ", err);
        setError(err.message);
      });
  };
  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  return (
    <>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="file">File</label>
        <input name="file" className="" type="file" onChange={handleChange} />
        <button type="submit" className="btn btn-ghost btn-outline">
          Submit
        </button>
      </form>
      {uploadedFile && <img src={uploadedFile} alt="Uploaded file" />}
      {error && <p>Error uploading file: {error} </p>}
    </>
  );
}
