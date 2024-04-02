// import React from "react";
// import Multiselect from "./Multiselect";
// import ButtonWithLoading from "./ButttonExtract";

// function Activity() {
//   return (

//     <div className="flex flex-col py-10 px-16 h-screen overflow-y-auto w-full">
//       <h2>Activuty</h2>


//       <div className="flex justify-center  space-x-8 py-6">

//       <div className="flex flex-col rounded-md border w-[1500px] h-[300px] p-8 justify-center">

//             <div class="flex items-center justify-center w-full">
//         <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//             <div class="flex flex-col items-center justify-center pt-5 pb-6">
//                 <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//                 </svg>
//                 <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
//                 <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
//             </div>
//             <input id="dropzone-file" type="file" class="hidden" />
//         </label>
//         </div> 
            
//     </div>



//       </div>
  

//       <div className="flex justify-center space-x-8 py-6">
//         <div className="flex flex-col rounded-md border  w-[730px] h-[150px] p-8 justify-center">
//           <h2>Please select the file Category</h2>
        
//           <Multiselect />
//         </div>
//         <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
//           <h2>Please select the Case</h2>
          
//           <Multiselect />
//         </div>
       
        
//       </div>

//       <div className="flex justify-center  space-x-8 py-6">
      
//       <div className="flex flex-col rounded-md  w-[800px] h-[150px] p-8 justify-center">
      
      
//       <ButtonWithLoading />
//     </div>
      
//     </div>


//     </div>
//   );
// }

// export default Activity;

import React, { useState } from "react";
import Table, { SelectColumnFilter, StatusPill, LocateCell } from "./Table";
import "../styles.css";

const getData = () => [
  {
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    title: "Regional Paradigm Technician",
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
    email: "cody.fisher@example.com",
    title: "Product Directives Officer",
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
    title: "Forward Response Developer",
    department: "Directives",
    status: "Active",
    case: "Case 2",
    file: "Locate",
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
  },
  {
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    title: "Central Security Manager",
    department: "Program",
    status: "Active",
    case: "Case 4",
    file: "Locate",
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
  },
  {
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    title: "Lean Implementation Liaison",
    department: "Mobility",
    status: "Active",
    case: "Case 3",
    file: "Locate",
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
  },
  {
    name: "Cameron Williamson",
    email: "cameron.williamson@example.com",
    title: "Internal Applications Engineer",
    department: "Security",
    status: "Active",
    case: "Case 4",
    file: "Locate",
    posCoords: [260, 900],
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
  }
];

export default function App() {
  const [mapFly, setMapFly] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Title",
        accessor: "title"
      },
      {
        Header: "File Uploaded",
        accessor: "file",
        Cell: LocateCell,
        posAccessor: "posCoords"
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
      }
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
