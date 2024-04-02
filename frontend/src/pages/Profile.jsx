import React from "react";

function Profile() {
  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">22</p>
              <p className="text-gray-400">Cases</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">10</p>
              <p className="text-gray-400">Requests</p>
            </div>
             {/*
             <div>
              <p className="font-bold text-gray-700 text-xl">89</p>
              <p className="text-gray-400">Comments</p>
            </div>
            */} 
           
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          {/*
             <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button
              className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
              Connect
            </button>
            <button
              className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
              Message
            </button>
          </div>
            */} 


         
        </div>

        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">Divija Palleti, <span className="font-light text-gray-500">37</span></h1>
          <p className="font-light text-gray-600 mt-3">Amherst, Massachusetts</p>

          <p className="mt-8 text-gray-500">XYZ Agent - abc Team</p>
          <p className="mt-2 text-gray-500">Federal Bureau of Investigation</p>
        </div>

      
        <div className="flex justify-center space-x-8 py-6">
        <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
          <h2>First Name</h2>
          <p className="font-light text-gray-600 mt-3">Divija</p>
        </div>
        <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
          <h2>Last Name</h2>
          <p className="font-light text-gray-600 mt-3">Palleti</p>
        </div>
      </div>

      <div className="flex justify-center space-x-8 py-6">
      <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
        <h2>Email</h2>
        <p className="font-light text-gray-600 mt-3">divijapalleti@gmail.com</p>
      </div>
      <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
        <h2>Password</h2>
        <p className="font-light text-gray-600 mt-3">xxxxxxxxxxx</p>
      </div>
    </div>



      </div>
    </div>
  );
}

export default Profile;
