import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import { Outlet } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext"; // Import the context

function DashboardMain() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    // Provide the context to all child components
    <DashboardContext.Provider value={{ isSidebarOpen, setSidebarOpen }}>
      <div className="relative min-h-screen bg-slate-100">
        <Sidebar />

        <main
          className={`
            transition-all duration-300 ease-in-out p-6 md:p-10
            ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"}
          `}
        >
          {/* The Outlet renders the child routes (e.g., Profile Page) */}
          <Outlet />
        </main>
      </div>
    </DashboardContext.Provider>
  );
}

export default DashboardMain;
