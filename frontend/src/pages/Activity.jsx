import React from "react";
import Activity from "../components/Activity";

function ActivityPage() {
  return (
    <div className="flex flex-col py-10 px-16 h-screen overflow-y-auto w-full">
      <h2>Activity</h2>

      <div className="flex justify-center space-x-8 py-6">
        <div className="flex flex-col rounded-md border  border-transparent w-[1500px] h-[300px] p-8 justify-center">
          <Activity />
        </div>
      </div>
    </div>
  );
}

export default ActivityPage;
