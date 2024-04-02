import React, { useState } from "react";
import {
  Clock4Icon,
  LayoutDashboard,
  LogOut,
  SquareUser,
} from "lucide-react";
import { motion } from "framer-motion";

import RightArrowIcon from "./../assets/icons/rightArrow.svg";

const variants = {
  expanded: { width: "20%" },
  nonexpanded: { width: "6%" },
};

function Navbar({ onItemClick, selectedItem }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleItemClick = (itemName) => {
    onItemClick(itemName);
  };

  return (
    <motion.div
      animate={isExpanded ? "expanded" : "nonexpanded"}
      variants={variants}
      className={
        "py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] relative" +
        (isExpanded ? " px-10" : " px-6")
      }
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-[#7c3aed] flex justify-center items-center"
      >
        <img src={RightArrowIcon} className="w-2" />
      </div>

      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-[#6a5acd] flex justify-center items-center"
      >
        <img src={RightArrowIcon} className="w-2" />
      </div>
      <div className="logo-div flex space-x-4 items-center">
        <img
          alt=""
          className="h-14 w-14"
          src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
        />

        <span className={!isExpanded ? "hidden" : "block"}><b>DIVIJA PALLETI</b></span>
      </div>

      <div className="flex flex-col space-y-8 mt-12">
        <div className="nav-links w-full">
          <div
            className={`flex space-x-3 w-full p-2 rounded cursor-pointer ${
              selectedItem === "Dashboard" ? "bg-[#6a5acd] text-white" : ""
            }`}
            onClick={() => handleItemClick("Dashboard")}
          >
            <LayoutDashboard />
            <span className={!isExpanded ? "hidden" : "block"}>Dashboard</span>
          </div>
        </div>

        <div className="nav-links w-full">
          <div
            className={`flex space-x-3 w-full p-2 rounded cursor-pointer ${
              selectedItem === "Activity" ? "bg-[#6a5acd] text-white" : ""
            }`}
            onClick={() => handleItemClick("Activity")}
          >
            <Clock4Icon />
            <span className={!isExpanded ? "hidden" : "block"}>Activity</span>
          </div>
        </div>


        <div className="nav-links w-full">
        <div
          className={`flex space-x-3 w-full p-2 rounded cursor-pointer ${
            selectedItem === "Profile" ? "bg-[#6a5acd] text-white" : ""
          }`}
          onClick={() => handleItemClick("Profile")}
        >
          <SquareUser />
          <span className={!isExpanded ? "hidden" : "block"}>Profile</span>
        </div>
      </div>


        <div className="nav-links w-full">
          <div
            className={`flex space-x-3 w-full p-2 rounded cursor-pointer ${
              selectedItem === "LogOut" ? "bg-[#6a5acd] text-white" : ""
            }`}
            onClick={() => handleItemClick("LogOut")}
          >
            <LogOut />
            <span className={!isExpanded ? "hidden" : "block"}>Log Out</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
