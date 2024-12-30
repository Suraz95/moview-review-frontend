import React, { useState } from "react";
import Stats from "./Stats";
import LatestUploads from "./LatestUploads";

const Dashboard = () => {
   return (
      <main className="w-full">
         <Stats />
         <LatestUploads />
      </main>
   );
};

export default Dashboard;
