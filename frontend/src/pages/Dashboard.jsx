import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import ActivityPage from "./Activity";

function DashboardPage() {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  // Function to handle item selection
  const handleNavbarItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  return (
    <>
      <div className="flex">
        {/* Side Navigation Bar */}
        <Navbar onItemClick={handleNavbarItemClick} selectedItem={selectedItem} />
        {/* Main component on basis of selected navigation from nav bar */}
        <main className="grow">
          {/* Pass the selectedItem prop to the Dashboard component */}
          {selectedItem === "Dashboard" && <Dashboard selectedItem={selectedItem} />}
          {selectedItem === "Activity" && <ActivityPage selectedItem={selectedItem} />}
          {/* Add more conditional rendering for other components if needed */}
        </main>
      </div>
    </>
  );
}

export default DashboardPage;
