// import { useState } from 'react';

// function ReportInfo({ isModalOpen, toggleModal, data }) {
  
//   return (
//     <>
//       {isModalOpen && (
     
//         <div id="extralarge-modal" tabindex="-1" class="fixed  flex  top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0">
//     <div class="relative w-full max-w-7xl">
//         <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
//             <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//                 <h3 class="text-xl font-medium text-gray-900 dark:text-white">
//                     Extracted Information
//                 </h3>
//                 <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="extralarge-modal">
//                     <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
//                     </svg>
//                     <span class="sr-only">Close modal</span>
//                 </button>
//             </div>
//             <div class=" text-gray-900">
            

//             {data ? (
//               <div className="">
//                 <div className="">
                  
                  
//                   <div>
//         {data.map((record, index) => (
//           <div key={index} className="border rounded-md p-4 mb-4">
//             <h5 className="font-bold mb-2">Category: {record.category}</h5>
//             <div className="ml-4">
//               {Object.entries(record.output).map(([key, value], index) => (
//                 <p key={index} className="mb-1">
//                   <span className="font-semibold">{key}:</span> {value}
//                 </p>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
      
                 
//                 </div>
//               </div>
//             ) : null}
//             Error fetching the record
//             </div>

//             <div class="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
//                </div>
//         </div>
//     </div>
// </div>

        
// //         <div id="extralarge-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
// //     <div class="relative w-full max-w-7xl max-h-full">
   
// //         <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            
// //             <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
// //                 <h3 class="text-xl font-medium text-gray-900 dark:text-white">
// //                     Extra Large modal
// //                 </h3>
// //                 <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="extralarge-modal">
// //                     <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
// //                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
// //                     </svg>
// //                     <span class="sr-only">Close modal</span>
// //                 </button>
// //             </div>
// //             <div class="p-4 md:p-5 space-y-4">
// //             <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
// //                 With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
// //             </p>
// //             <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
// //                 The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
// //             </p>
// //             <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
// //                 With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
// //             </p>
// //             <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
// //                 The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
// //             </p>
// //             <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
// //                 With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
// //             </p>
// //             <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
// //                 The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
// //             </p>
// //         </div>
      
// //             <div class="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
// //                 <button data-modal-hide="extralarge-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
// //                 <button data-modal-hide="extralarge-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
// //             </div>
// //         </div>
// //     </div>
// // </div>

//       )}
//     </>
//   );
// }

// export default ReportInfo;


import React from "react";

function ReportInfo({ isModalOpen, toggleModal, data }) {
  return (
    <>
      {isModalOpen && (
        <div
          id="extralarge-modal"
          className="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-full md:max-w-4xl max-h-full overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-xl font-medium text-purple-700">
                Extracted Information
              </h3>
              <button
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                aria-label="Close modal"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {data ? (
                <div className="text-gray-900">
                  {data.map((record, index) => (
                    <div key={index} className="border rounded-md p-4 mb-4">
                      <h5 className="font-bold mb-2">Category: {record.category}</h5>
                      <div className="ml-4 text-left text-gray-600 max-w-full whitespace-normal">
                        {Object.entries(record.output).map(([key, value], index) => (
                          <p key={index} className="mb-1">
                            <span className="font-semibold text-gray-700">{key}:</span> {value}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Error fetching the record</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReportInfo;
