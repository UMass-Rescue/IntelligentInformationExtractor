import React, { useState, useEffect } from "react";
import Table, { SelectColumnFilter, StatusPill, FileLink } from "./Table";
import "../styles.css";

const BACKEND_URL = 'http://192.168.0.19:5000'
const endpoint = `${BACKEND_URL}/activity/allrecords/`;

function simulateFetch(data, delay = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}


const getData = () => [
      {
          "case_id": "9",
          "case_title": "title",
          "record_id": "jhgjdgh",
          "record_title": "uu",
          "record_date": "ii",
          "user_id": "oo",
      },
      {
        "case_id": "9",
        "case_title": "title",
        "record_id": "jhgjdgh",
        "record_title": "uu",
        "record_date": "ii",
        "user_id": "oo",
    }
  ];

const fetchDataFromAPI =  (formData) => {

      // simulateFetch(getData(), 5000)
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



  // try {
  //   const response = await fetch(endpoint, {
  //     method: "POST",
  //     body: formData,
  //   });
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //   return [];
  // }
};

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData =  () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("userId", "USER_ID"); // Replace with the actual user ID
    formData.append("email", "dummy@gmail.com"); // Replace with the actual user email
    fetch(endpoint, {
      method: "POST",
      body: formData,
    })
    .then(response => {
      return response.json(); // Parse JSON asynchronously
    })
    .then(data1 => {
     
      setData(data1.data);
     
      return data;
      
    }).then(data => {
       // Handle parsed data here
       console.log(data, "data");
       setIsLoading(false);

    }).catch(error => {
        // Handle errors
        console.error("Error:", error);
      });

    // simulateFetch(getData(), 5000)
    // .then(data1 => {
    //   console.log(data1);
    //   setData(data1);
     
      
    // console.log("data", data);
    // setIsLoading(false);
      
    // }).catch(error => {
    //   // Handle errors
    //   console.error("Error:", error);
    // });
    
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "record_title"
      },
      {
        Header: "File Uploaded",
        accessor: "url",
        Cell: FileLink
      },
      {
        Header: "Report",
        accessor: "record_id",
        Cell: StatusPill
      },
      {
        Header: "Case",
        accessor: "case_title",
        Filter: SelectColumnFilter,
        filter: "includes"
      },
      {
        Header: "Date",
        accessor: "record_date"
      }
    ],
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ height: "100%" }}>
        <div className="min-h-screen text-gray-900">
          <main className="">
            <div className="">
              <h1 className="text-xl font-semibold"></h1>
            </div>
            <div className="mt-4">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <Table columns={columns} data={data} />
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
