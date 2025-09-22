import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="relative min-h-screen bg-slate-100">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main
        className={`
          transition-all duration-300 ease-in-out 
          ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"}
        `}
      >
        {/* Simple header for the mobile toggle button */}
        <header className="sticky top-0 bg-white/70 backdrop-blur-lg shadow-sm p-4 flex items-center justify-end lg:hidden z-20">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-slate-600 cursor-pointer"
          >
            <FiMenu size={24} />
          </button>
        </header>

        {/* The Outlet renders your admin pages */}
        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
