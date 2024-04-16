import React, { useState, useEffect } from "react";

import Multiselect from "./Multiselect";
import ButtonWithLoading from "./ButttonExtract";
import FileUpload from "./FileUpload";


const BACKEND_URL='http://127.0.0.1:5000'
const email = 'dummy@gmail.com'

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
  const [category, setCategory] = useState([]);
  const [caseValue, setCaseValue] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const[clearFile, setClearFile] = useState(false);
  const [caseMap, setCaseMap] = useState({});

  const [catResponse, setCatResponse] = useState({});
  const [case1Response, setCase1Response] = useState({});

  const [responseValPageNumber, setResponseValPageNumber] = useState(1);
  const [responseValCurrentPageNumber, setResponseValCurrentPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [responseVal, setResponse] = useState({});

  const [responseValOk, setResponseOk] = useState(false);

  const [typingIndex, setTypingIndex] = useState(-1);
  const [items, setItems] = useState([]);
  

  // const [items, setItems] = useState(['Missing Child Information', 'Contact Information', 'Current Location or Sightings', 'Possible Abductor Information']);
  const [caseItems, setCaseItems] = useState(['case 1', 'case 2', 'case 3']);



  const handleFileChange = async (file) => {
    setClearFile(false)
    try {
      setFile(file);
      setFilesUploaded(filesUploaded + 1);
      setError(null);
      setIsError(false)
  
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(error.message);
      setIsError(true)
    }
  };

  const handleSubmit = async () => {
    console.log(category)
    console.log(caseValue)
    console.log(file)
    if (!category || !caseValue || !file) {
      setError("Please select file, category, and case.");
 
      return;
    }
    await backendAPICall();
  };

  const handleRefresh = async () => {
    setLoading(false)
   
    setCategory([]);
    setCaseValue([]);
    setFile(null); // Reset file state after successful submission
    setClearFile(true)


   
  };

  const backendAPICall = async () => {

    try {
      const formData = new FormData();
      const sampleResponseData = {
        output: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        total_page: 10,
      };
      formData.append('file', file);
      formData.append('email', email);
      formData.append('categories', category);
      formData.append('case_id', caseMap[caseValue]);
      formData.append('record_description', '')
      formData.append('record_title', '')
      formData.append('current_page', responseValCurrentPageNumber);
      console.log(formData)

      for (const entry of formData.entries()) {
        console.log(entry);
      }
      
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 5000));
      const endpoint= `${BACKEND_URL}/activity/uploadrecord/`;
  
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      // const response = {
      //   ok: true,
      //   json: async () => sampleResponseData, // Simulate JSON parsing of response data
      // };

      if (!response.success) {
        throw new Error("Failed to submit data.");
      } 
      setResponseOk(true)
      const data = await response.json();
      setLoading(false);
      setError(null);
      setIsError(false)
      setResponse(data['data']);
      setResponseValPageNumber(data['total_page']);
      setTypingIndex(0);
    } catch (error) {
      setLoading(false);
      setTypingIndex(-1);
      setResponse('');
      console.error("Error submitting data:", error);
      setError("Failed to submit data.");
      setIsError(true)
    }
   
   
  }


  const pageClick = async (pageNumber) => {
    console.log(pageNumber)
    setResponseValCurrentPageNumber(pageNumber);
    await backendAPICall();
  }

  useEffect(() => {



    // const endpoint= `${BACKEND_URL}/auth/login`;
 




    // Fetch items and caseItems from the backend API when the component mounts
    const fetchInitialData = async () => {
      try {
        console.log("ppppppppp11")

        await fetch(`${BACKEND_URL}/categories`,
          {
          method:'GET'
          }).then(response=>response.json())
          .then(data=>{
             console.log(data)
             setCatResponse(data)
             //API Success from LoginRadius Login API
          })
          .catch(error=>console.log(error));

          console.log(catResponse)

          if(catResponse.success){
                const data =  catResponse.data;
                console.log(data, "data")
                setItems(data.categories);
              }

  
        // const responsePromise = fetch(`${BACKEND_URL}/categories`, {
        //   method: 'GET'
        // }).then(response => c)
        //   .catch(error => console.log(error));
        
        // responsePromise.then(response => {
        //   const responseData = response; // Store the response in a constant
        //   if(responseData.success){
        //     const data =  responseData.data();
        //     console.log(data, "data")
        //     setItems(data.categories);
        //   }
        //   console.log(responseData); // Do whatever you want with the response data
        // });


     
        console.log(items)

        const formData = new FormData();
        formData.append('email', email);
    
        const caseResponse = await fetch(`${BACKEND_URL}/caseDetails`, {
          method: 'POST', // or 'GET' depending on your backend
          body: formData
        });

        

        // const caseResponse = await fetch(`${BACKEND_URL}/caseDetails`);
        if(caseResponse.success){
          const data = await caseResponse.data();
          const newCaseMap = {};
            data.forEach(({ case_id, case_title }) => {
              newCaseMap[case_title] = case_id;
            });
          setCaseMap(newCaseMap);
          const caseTitles = data.map(caseData => caseData.case_title);
          setCaseItems(caseTitles);
        }
        
      } catch (error) {
        console.error("Error fetching initial data:", error);
        
      }
    };

    fetchInitialData();
  }, []);



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
          <FileUpload onFileChange={handleFileChange} clearFile={clearFile}  />
        </div>
      </div>
      <div className="flex justify-center space-x-8 py-6">
        <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
          <h2>Please select the file Category</h2>
          <Multiselect value="category" onChange={setCategory} items={items} selectedItems1={category}  />
        </div>
        <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
          <h2>Please select the Case</h2>
          <Multiselect value="case" onChange={setCaseValue} items={caseItems} selectedItems1={caseValue}/>
        </div>
      </div>
      <div className="flex justify-center space-x-8 py-6">
        <div className="flex flex-col rounded-md w-[800px] h-[150px] p-8 justify-center">
          <ButtonWithLoading onClick={handleSubmit} isLoading={loading} onRefresh={handleRefresh} isError={isError}/>
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
            <div>
              {/* Iterate through record_history and display category and dynamic keys with values */}
              {responseVal.data.record_history.map((record, index) => (
                <div key={index}>
                  <h5>Category: {record.category}</h5>
                  {/* Iterate through the keys of output */}
                  {Object.keys(record.output).map((key, index) => (
                    <p key={index}>{key}: {record.output[key]}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}



      
    </div>
  );
}

export default Dashboard;


