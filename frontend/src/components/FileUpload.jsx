
import React, { useState, useEffect } from "react";

function FileUpload({ onFileChange, clearFile }) {

  const [file, setFile] = useState(null);
  const [fileName, setFilename] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const allowedFileTypes = [".txt", ".docx", ".pdf"]; // Define allowed file types

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
   
    if (selectedFile) {
      const fileType = selectedFile.name.split(".").pop(); // Get the file extension
      if (allowedFileTypes.includes(`.${fileType}`)) {
        setFile(selectedFile);
        onFileChange(selectedFile); // Call the parent function to update count
        setErrorMessage(""); // Clear error message
      } else {
        setErrorMessage("Invalid file type. Please select a .txt, .docx, or .pdf file.");
      }
    }
    setFile(selectedFile)
    setFilename(selectedFile.name)
  };

  useEffect(() => {
    if (clearFile) {
      setFilename("");
      setFile(null);
    }
  }, [clearFile, file]);

  return (
    <>
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Text, PDF, DOCX, or any file (MAX. 2 mb)
          </p>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <input id="dropzone-file" type="file" accept={allowedFileTypes.join()} className="hidden" onChange={handleFileChange} />
        <div>
     
      {file && <p>File uploaded: {fileName}</p>}
    </div>

      </label>
    </>
  );
}

export default FileUpload;
