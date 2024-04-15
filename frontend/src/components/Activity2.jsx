import React, { useState, useEffect } from "react";
import Table, { SelectColumnFilter, StatusPill, FileLink } from "./Table";
import "../styles.css";

const BACKEND_URL='http://127.0.0.1:5000'
const endpoint= `${BACKEND_URL}/activity/allrecords/`;
const fetchDataFromAPI = async (formData) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("userId", "USER_ID"); // Replace with the actual user ID
    formData.append("email", "USER_EMAIL"); // Replace with the actual user email
    const newData = await fetchDataFromAPI(formData);
    setData(newData);
    setIsLoading(false);
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
        accessor: "report",
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
