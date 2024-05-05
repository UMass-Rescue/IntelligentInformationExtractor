import React, { useState, useEffect } from "react";

function Profile() {
  // Define state variables for each category
  const [firstName, setFirstName] = useState("Divija");
  const [lastName, setLastName] = useState("Palleti");
  const [email, setEmail] = useState("dummy@gmail.com");
  const [password, setPassword] = useState("xxxxxxxxxxx");
  const [cases, setCases] = useState(22);
  const [requests, setRequests] = useState(10);
  


  const BACKEND_URL = 'http://127.0.0.1:5000'

  useEffect(() => {
    const backendAPICall = async () => {
      try {
        const formData = new FormData();
        formData.append('email', email);
        const endpoint = `${BACKEND_URL}/profile/`;

        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data1 = await response.json();
          const profileData = data1.data;
          console.log(profileData, "profileData");
          setFirstName(profileData.firstname);
          setLastName(profileData.lastName);
          setCases(profileData.case_count);
          setRequests(profileData.record_count);
        } else {
          console.error("Failed to fetch profile data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    backendAPICall(); // Call the backend API when the component mounts
  }, []); 



  // const backendAPICall = async () => {

  //   try {
  //     const formData = new FormData();
  //     formData.append('email', email);
  //     const endpoint = `${BACKEND_URL}/profile/`;

  //     fetch(endpoint, {
  //       method: "POST",
  //       body: formData,
  //     })
  //     .then(response => {
  //       return response.json(); // Parse JSON asynchronously
  //     })
  //     .then(data1 => {
  //       const profileData = data1.data;
  //       console.log(profileData, "profileData");
  //       return profileData;
        
  //     }).then(profileData => {
  //        // Handle parsed data here
  //       //  "email": <user email>,
  //       //  "password" : "*********",
  //       //  "firstname": <firstname>,
  //       //  "lastname": <lastname>,
  //       //  "case_count": <number of cases>,
  //       //  "record_count": <number of records>
  //        console.log(profileData, "profileData");
  //        setFirstName(profileData.firstname);
  //        setLastName(profileData.lastName);
  //        setCases(profileData.case_count);
  //        setRequests(profileData.record_count);
     

  //     })
    

     
  //   } catch (error) {
      
  //     console.error("Error fetching profile  data:", error);
     
  //   }


  // }


  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">{cases}</p>
              <p className="text-gray-400">Cases</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">{requests}</p>
              <p className="text-gray-400">Requests</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">{firstName} {lastName}, <span className="font-light text-gray-500">37</span></h1>
          <p className="font-light text-gray-600 mt-3">Amherst, Massachusetts</p>

          <p className="mt-8 text-gray-500">XYZ Agent - abc Team</p>
          <p className="mt-2 text-gray-500">Federal Bureau of Investigation</p>
        </div>

        <div className="flex justify-center space-x-8 py-6">
          <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
            <h2>First Name</h2>
            <p className="font-light text-gray-600 mt-3">{firstName}</p>
          </div>
          <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
            <h2>Last Name</h2>
            <p className="font-light text-gray-600 mt-3">{lastName}</p>
          </div>
        </div>

        <div className="flex justify-center space-x-8 py-6">
          <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
            <h2>Email</h2>
            <p className="font-light text-gray-600 mt-3">{email}</p>
          </div>
          <div className="flex flex-col rounded-md border w-[730px] h-[150px] p-8 justify-center">
            <h2>Password</h2>
            <p className="font-light text-gray-600 mt-3">{password}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
