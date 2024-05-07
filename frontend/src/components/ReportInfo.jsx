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
