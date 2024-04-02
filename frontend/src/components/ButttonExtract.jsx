// import React, { useState } from "react";

// function ButtonWithLoading() {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleClick = (loading) => {
//     setIsLoading(loading);
//     // Simulating an asynchronous operation, replace with your actual API call
//     if (loading) {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 2000); // Replace 2000 with your desired loading time or when you receive the response
//     }
//   };

//   return (
//     <div className="flex items-center gap-4">
//       {/* Start button visible when isLoading is false */}
//       {!isLoading && (
//         <button
//           className="group relative w-full flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
//           onClick={() => handleClick(true)} 
//         >
//           Start
//         </button>
//       )}

//       {/* Loading button visible when isLoading is true */}
//       {isLoading && (
//         <button
//           className="group relative w-full flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
//           disabled={true}
//         >
//         <svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
//         <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
//         </path>
//     </svg>
//           Loading... Please Wait
//         </button>
//       )}

//       {/* Button disabled only when isLoading is false */}
    
//       <button
//       className={`group relative w-full flex justify-center py-5 px-4 border  text-sm font-medium rounded-md text-purple-800 bg-grey focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10 ${!isLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-purple-100'} `}
//       disabled={!isLoading}
//       onClick={() => handleClick(false)} 
//     >
//       <span>Refresh</span>
//       <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={2}
//           stroke="currentColor"
//           className="h-5 w-5"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
//           />
//         </svg>
//     </button>
//     </div>
//   );
// }

// export default ButtonWithLoading;

// Button component

// import React, { useState } from "react";

// function ButtonWithLoading({ onClick }) {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleClick = async () => {
//     // setIsLoading(true);
//     await onClick();
//     // setIsLoading(false);
//   };

//   return (
//     <div className="flex items-center gap-4">
//       {!isLoading && (
//         <button
//           className="group relative w-full flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
//           onClick={handleClick}
//         >
//           Start
//         </button>
//       )}

//       {isLoading && (
//         <button
//           className="group relative w-full flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
//           disabled={true}
//         >
//           <svg
//             width="20"
//             height="20"
//             fill="currentColor"
//             className="mr-2 animate-spin"
//             viewBox="0 0 1792 1792"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z" />
//           </svg>
//           Loading... Please Wait
//         </button>
//       )}

//       <button
//         className={`group relative w-full flex justify-center py-5 px-4 border  text-sm font-medium rounded-md text-purple-800 bg-grey focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10 ${
//           !isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-purple-100"
//         } `}
//         disabled={!isLoading}
//         onClick={handleClick}
//       >
//         <span>Refresh</span>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={2}
//           stroke="currentColor"
//           className="h-5 w-5"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
//           />
//         </svg>
//       </button>
//     </div>
//   );
// }

// export default ButtonWithLoading;



import React, { useState } from "react";

function ButtonWithLoading({ onClick, isLoading }) {
  const handleClick = async () => {
    console.log(isLoading, "pppppppp")
    onClick && (await onClick());
  };

  return (
    <div className="flex items-center gap-4">
      {!isLoading && (
        <button
          className="group relative w-full flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          onClick={handleClick}
        >
          Start
        </button>
      )}

      {isLoading && (
        <button
          className="group relative w-full flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          disabled={true}
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-2 animate-spin"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z" />
          </svg>
          Loading... Please Wait
        </button>
      )}

      <button
        className={`group relative w-full flex justify-center py-5 px-4 border  text-sm font-medium rounded-md text-purple-800 bg-grey focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10 ${
          !isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-purple-100"
        } `}
        disabled={!isLoading}
        onClick={handleClick}
      >
        <span>Refresh</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
    </div>
  );
}

export default ButtonWithLoading;
