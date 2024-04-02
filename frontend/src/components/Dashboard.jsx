import React, { useState, useEffect } from "react";

import Multiselect from "./Multiselect";
import ButtonWithLoading from "./ButttonExtract";
import FileUpload from "./FileUpload";


function PageNumbers({ currentPage, totalPages, onPageClick }) {
  const [currentPageSet, setCurrentPageSet] = useState(1);

  const firstPageInSet = (currentPageSet - 1) * 10 + 1;
  const lastPageInSet = Math.min(currentPageSet * 10, totalPages);

  const pageNumbers = [];
  for (let i = firstPageInSet; i <= lastPageInSet; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="list-style-none flex">
      <li>
              <button
                  className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                  onClick={() => setCurrentPageSet(currentPageSet - 1)} disabled={lastPageInSet >= totalPages}>Previous</button>
          </li>

      {pageNumbers.map((pageNumber) => (

        
        <li>
            <button  className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            key={pageNumber} onClick={() => onPageClick(pageNumber)} disabled={pageNumber === currentPage}>
              {pageNumber}
            </button>
            </li>
          ))}

          <li>
              <button
                  className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                  onClick={() => setCurrentPageSet(currentPageSet + 1)} disabled={lastPageInSet >= totalPages}>Next</button>
          </li>

      </ul>
  </nav>
  );
}


function Dashboard() {
  const [filesUploaded, setFilesUploaded] = useState(0);
  const [category, setCategory] = useState("");
  const [caseValue, setCaseValue] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const [responseValPageNumber, setResponseValPageNumber] = useState(1);
  const [responseValCurrentPageNumber, setResponseValCurrentPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [responseVal, setResponse] = useState('');

  const [responseValOk, setResponseOk] = useState(false);

  const [typingIndex, setTypingIndex] = useState(-1);


  const handleFileChange = async (file) => {
    try {
      setFile(file);
      setFilesUploaded(filesUploaded + 1);
      setError(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(error.message);
    }
  };

  const handleSubmit = async () => {
    if (!category || !caseValue || !file) {
      setError("Please select file, category, and case.");
      return;
    }
    await backendAPICall();
    setCategory("");
    setCaseValue("");
    setFile(null); // Reset file state after successful submission


   
  };

  const backendAPICall = async () => {

    try {
      const formData = new FormData();
      const sampleResponseData = {
        output: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        total_page: 10,
      };
      formData.append('file', file);
      formData.append('category', category);
      formData.append('case', caseValue);
      formData.append('current_page', responseValCurrentPageNumber);
      console.log(formData)

      for (const entry of formData.entries()) {
        console.log(entry);
      }
      
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 5000));
  
      // const response = await fetch("http://your-flask-backend-url/process", {
      //   method: "POST",
      //   body: formData,
      // });

      const response = {
        ok: true,
        json: async () => sampleResponseData, // Simulate JSON parsing of response data
      };

      if (!response.ok) {
        throw new Error("Failed to submit data.");
      } 
      setResponseOk(true)
      const data = await response.json();

     

      setLoading(false);
      setError(null);
      setResponse(data['output']);
      setResponseValPageNumber(data['total_page']);
      setTypingIndex(0);
    } catch (error) {
      setLoading(false);
      setTypingIndex(-1);
      setResponse('');
      console.error("Error submitting data:", error);
      setError("Failed to submit data.");
    }
   
   
  }


  const pageClick = async (pageNumber) => {
    console.log(pageNumber)
    setResponseValCurrentPageNumber(pageNumber);
    await backendAPICall();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingIndex((prevIndex) => prevIndex + 1);
    }, 50);
    return () => clearInterval(interval);
  }, [responseVal]);


  return (
    <div className="flex flex-col py-10 px-16 h-screen overflow-y-auto w-full">
      <h2>Dashboard</h2>
   
      <div className="flex justify-center space-x-8 py-6">
        <div className="flex flex-col rounded-md border w-[1500px] h-[300px] p-8 justify-center">
          <FileUpload onFileChange={handleFileChange} />
        </div>
      </div>
      <div className="flex justify-center space-x-8 py-6">
        <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
          <h2>Please select the file Category</h2>
          <Multiselect value="category" onChange={setCategory} />
        </div>
        <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
          <h2>Please select the Case</h2>
          <Multiselect value="case" onChange={setCaseValue} />
        </div>
      </div>
      <div className="flex justify-center space-x-8 py-6">
        <div className="flex flex-col rounded-md w-[800px] h-[150px] p-8 justify-center">
          <ButtonWithLoading onClick={handleSubmit} isLoading={loading} />
          {error && (
            <div className="text-red-500 mb-4">
              Error: {error}
            </div>
          )}
        </div>
      </div>
      {responseValOk ? (
        <div className="flex justify-center space-x-8 py-6">
          <div className="flex flex-col rounded-md border w-[1500px] h-[900px] p-8 items-center">
            <h4 className="mb-4">Extracted Response</h4>
            <div className='right-container-header'>
              <PageNumbers currentPage={responseValCurrentPageNumber} totalPages={responseValPageNumber} onPageClick={pageClick} />
            </div>
            <>
              <pre className="response">{responseVal.substring(0, typingIndex)}</pre>
              <span className="cursor" style={{ left: `${responseVal.length}px` }}></span>
            </>
          </div>
        </div>
      ) : null}

      
    </div>
  );
}

export default Dashboard;


