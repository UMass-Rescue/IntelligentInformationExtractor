import React, { useState } from "react";
import Table, { SelectColumnFilter, StatusPill, FileLink } from "./Table";
import "../styles.css";

const getData = () => [
  {
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    title: "Missing Child Info Dec 1 2022",
    date: "Feb 3rd 2023",
    department: "Optimization",
    status: "Active",
    case: "Case 1",
    file: "Locate1",
    posCoords: [260, 900],
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
  },
  {
    name: "Cody Fisher",
    date: "Jan 3rd 2023",
    email: "cody.fisher@example.com",
    title: "Witness Accounts - Ryan",
    department: "Intranet",
    status: "Active",
    case: "Case 1",
    file: "Locate",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
  },
  {
    name: "Esther Howard",
    email: "esther.howard@example.com",
    title: "Witness Accounts - Kyle",
    department: "Directives",
    status: "Active",
    case: "Case 2",
    file: "Locate",
    date: "Dec 3rd 2022",
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
  },
  {
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    title: "Abductor Information",
    department: "Program",
    status: "Active",
    case: "Case 4",
    date: "Jan 3rd 2022",
    file: "Locate",
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
  },
  {
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    title: "Circumstances of Disappearance",
    department: "Mobility",
    status: "Active",
    date: "Oct 3rd 2022",
    case: "Case 3",
    file: "Locate",
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
  },
  {
    name: "Cameron Williamson",
    email: "cameron.williamson@example.com",
    title: "Circumstances of Disappearance p2",
    department: "Security",
    date: "Nov 3rd 2022",
    status: "Active",
    case: "Case 4",
    file: "Locate",
    posCoords: [260, 900],
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
  }
];

export default function App() {

  const columns = React.useMemo(
    () => [
     
      {
        Header: "Title",
        accessor: "title"
      },
      {
        Header: "File Uploaded",
        accessor: "url",
        Cell: FileLink,
        
      },
      {
        Header: "Report",
        accessor: "report",
        Cell: StatusPill
      },
      {
        Header: "Case",
        accessor: "case",
        Filter: SelectColumnFilter,
        filter: "includes"
      },

       {
         Header: "Date",
        accessor: "date"
      },
    ],
    []
  );

  const data = React.useMemo(() => getData(), []);

  return (
    <>
      <div  style={{ height: "100%" }}>
        <div className="min-h-screen text-gray-900">
          <main className="">
            <div className="">
              <h1 className="text-xl font-semibold"></h1>
            </div>
            <div className="mt-4">
              <Table columns={columns} data={data} />
              {/* <Table columns={columns} data={data} map={mapFly} /> */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
