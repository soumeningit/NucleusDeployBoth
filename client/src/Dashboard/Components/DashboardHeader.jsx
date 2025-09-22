import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext"; // Import the context
import { FiMenu, FiX } from "react-icons/fi";
import useAuthContext from "../../customhooks/useAuthContext";

function DashboardHeader({ title, action }) {
  const [, user] = useAuthContext();

  const { isSidebarOpen, setSidebarOpen } = useContext(DashboardContext);

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between rounded-lg">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="text-slate-600 lg:hidden mr-4"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Render the action element if it exists */}
        {action && <div>{action}</div>}

        <div className="font-semibold text-slate-700">
          Welcome,{" "}
          {user.name ? user.name : user.firstName + " " + user.lastName}!
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
