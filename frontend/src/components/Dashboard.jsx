import React, { useState, useEffect } from "react";

import Multiselect from "./Multiselect";
import ButtonWithLoading from "./ButttonExtract";
import FileUpload from "./FileUpload";


const BACKEND_URL = 'http://127.0.0.1:5000'
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
            <button className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
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
  const [clearFile, setClearFile] = useState(false);
  const [caseMap, setCaseMap] = useState({});

  const [catResponse, setCatResponse] = useState({});

  const [responseValPageNumber, setResponseValPageNumber] = useState(1);
  const [responseValCurrentPageNumber, setResponseValCurrentPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [responseVal, setResponseVal] = useState([
    {
      "category": "<category 1 name>",
      "output": {
        "prompt1": "mlml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10ml output 10 output 10",
        "prompt2": "ml output 2"
      }
    },
    {
      "category": "<category 2 name>",
      "output": {
        "prompt1": "ml output 1",
        "prompt2": "ml output 2"
      }
    }
  ]);


  const [responseValOk, setResponseOk] = useState(false);

  const [typingIndex, setTypingIndex] = useState(-1);


  const [items, setItems] = useState(['Missing Child Information', 'Contact Information', 'Current Location or Sightings', 'Possible Abductor Information']);
  const [caseItems, setCaseItems] = useState(['case 1', 'case 2', 'case 3']);

  function simulateFetch(data, delay = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }
  

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
      // const json = [
      //   {
      //     "category": "<category 1 name>",
      //     "output": {
      //       "prompt1": "ml output 10",
      //       "prompt2": "ml output 2"
      //     }
      //   },
      //   {
      //     "category": "<category 2 name>",
      //     "output": {
      //       "prompt1": "ml output 1",
      //       "prompt2": "ml output 2"
      //     }
      //   }
      // ];

      // const sampleResponseData = {
      //   success:true,
      //   output: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      //   total_page: 10,
      // };
      formData.append('file', file);
      formData.append('email', email);
      formData.append('categories', category);
      formData.append('case_id', caseMap[caseValue]);
      formData.append('record_description', '')
      formData.append('record_title', '')
      formData.append('current_page', responseValCurrentPageNumber);

    

      setLoading(true);
      const endpoint = `${BACKEND_URL}/activity/uploadrecord/`;

      // simulateFetch(json, 5000)
      // .then(data => {
      //   console.log(data);
      //   const record_history = data
      //   setResponseVal(record_history)
      //   // Handle parsed data here
      //   setLoading(false);
      // setError(null);
      // setIsError(false);
      // setResponseValPageNumber(1);
      // setTypingIndex(0);
      // setResponseOk(true)
        
      // }).catch(error => {
      //   // Handle errors
      //   console.error("Error:", error);
      // });

      fetch(endpoint, {
        method: "POST",
        body: formData,
      })
      .then(response => {
        return response.json(); // Parse JSON asynchronously
      })
      .then(data1 => {
        const record_history = data1.data.record_history;
        console.log(record_history, "record_history");
        setResponseVal(record_history);
        return responseVal;
        
      }).then(responseVal => {
         // Handle parsed data here
         console.log(responseVal, "responseval");
         setLoading(false);
         setError(null);
         setIsError(false);
         setResponseValPageNumber(1);
         setTypingIndex(0);
         setResponseOk(true)

      })
    

     
    } catch (error) {
      console.log(error)
      setLoading(false);
      setTypingIndex(-1);
      setResponseVal({});
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

        const formData = new FormData();
        formData.append('email', email);

        const response = await fetch(`${BACKEND_URL}/caseDetails`, {
          method: 'POST',
          body: formData
        });
        const data1 = await response.json();

        if (data1.success) {
          console.log(data1, "data1")
          const data = data1.data;
          const newCaseMap = {};
          data.forEach(({ case_id, case_title }) => {
            newCaseMap[case_title] = case_id;
          });
          console.log(newCaseMap, "map 111")
          setCaseMap(newCaseMap);
          console.log(caseMap)
          const caseTitles = data.map(caseData => caseData.case_title);
          setCaseItems(caseTitles);
          console.log(caseItems)



        }
      } catch (error) {
        console.error("Error fetching initial case data:", error);
      }


      try {
        const response = await fetch(`${BACKEND_URL}/categories`, {
          method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        setCatResponse(data);
        console.log(catResponse);

        if (data.success) {
          const categories = data.data.categories;
          console.log(categories, "data");
          setItems(categories);
        }
      } catch (error) {
        console.error("Error fetching initial categories data:", error);
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
          <FileUpload onFileChange={handleFileChange} clearFile={clearFile} />
        </div>
      </div>
      <div className="flex justify-center space-x-8 py-6">
        <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
          <h2>Please select the file Category</h2>
          <Multiselect value="category" onChange={setCategory} items={items} selectedItems1={category} />
        </div>
        <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
          <h2>Please select the Case</h2>
          <Multiselect value="case" onChange={setCaseValue} items={caseItems} selectedItems1={caseValue} />
        </div>
      </div>
      <div className="flex justify-center space-x-8 py-6">
        <div className="flex flex-col rounded-md w-[800px] h-[150px] p-8 justify-center">
          <ButtonWithLoading onClick={handleSubmit} isLoading={loading} onRefresh={handleRefresh} isError={isError} />
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
  {responseVal.map((record, index) => (
    <div key={index} className="border rounded-md p-4 mb-4">
      <h5 className="font-bold mb-2">Category: {record.category}</h5>
      <div className="ml-4">
        {Object.entries(record.output).map(([key, value], index) => (
          <p key={index} className="mb-1">
            <span className="font-semibold">{key}:</span> {value}
          </p>
        ))}
      </div>
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


