import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiEdit,
  FiTrash2,
  FiSlash,
  FiAlertTriangle,
  FiLoader,
} from "react-icons/fi";
import Modal from "../../common/Modal";
import {
  getAllUsersAPI,
  updateAccountStatusAPI,
} from "../../../operation/service/AdminService";
import useAuthContext from "../../../customhooks/useAuthContext";
import toast from "react-hot-toast";

const RoleBadge = ({ role }) => {
  const styles = {
    Admin: "bg-red-100 text-red-800",
    Instructor: "bg-indigo-100 text-indigo-800",
    Student: "bg-blue-100 text-blue-800",
  };
  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${styles[role]}`}
    >
      {role}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-green-100 text-green-800",
    Suspended: "bg-yellow-100 text-yellow-800",
  };
  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
};

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ role: "All", status: "All" });
  const [modalState, setModalState] = useState({
    isOpen: false,
    user: null,
    action: null,
  });

  const [token] = useAuthContext();

  const [activeActionMenu, setActiveActionMenu] = useState(null);

  // Simulate fetching data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllUsersAPI(token);
        console.log(response);

        if (response.status === 200) {
          setUsers(response.data.data || []);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      .filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((user) => filters.role === "All" || user.role === filters.role)
      .filter(
        (user) => filters.status === "All" || user.status === filters.status
      );
  }, [users, searchTerm, filters]);

  const openModal = (user, action) => {
    setModalState({ isOpen: true, user, action });
  };
  const closeModal = () => {
    setModalState({ isOpen: false, user: null, action: null });
  };

  const handleConfirmAction = async () => {
    const { user, action } = modalState;
    console.log(`Performing action: ${action} on user: ${user.name}`);
    if (action === "suspend") {
      const toastId = toast.loading("Suspending user...");
      try {
        const response = await updateAccountStatusAPI(
          token,
          user._id,
          action === "suspend" ? "suspended" : "deactivated"
        );
        toast.dismiss(toastId);
        if (response.status === 200) {
          // Update local state to reflect the change
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u._id === user._id
                ? {
                    ...u,
                    accountStatus:
                      action === "suspend" ? "suspended" : "deactivated",
                  }
                : u
            )
          );
          toast.success(`User ${action}ed successfully`);
        }
      } catch (error) {
        toast.dismiss(toastId);
        console.log("Error updating account status:", error);
        toast.error("Failed to update user status");
      } finally {
        toast.dismiss(toastId);
        closeModal();
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
        <p className="text-slate-500">
          Manage all student, instructor, and admin accounts.
        </p>
      </div>

      {/* --- Filter & Action Bar --- */}
      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={filters.role}
            onChange={(e) =>
              setFilters((p) => ({ ...p, role: e.target.value }))
            }
            className="bg-white border border-slate-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
            <option value="student">Student</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((p) => ({ ...p, status: e.target.value }))
            }
            className="bg-white border border-slate-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="flex items-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700">
            <FiPlus className="mr-2" /> Add User
          </button>
        </div>
      </div>

      {/* --- Users Table --- */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-12">
                    <FiLoader className="mx-auto animate-spin text-2xl" />
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-white border-b hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={user.image}
                          alt={user.name}
                        />
                        <div className="ml-4">
                          <div className="font-medium text-slate-900">
                            {user.name}
                          </div>
                          <div className="text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <RoleBadge
                        role={
                          user?.accountType.charAt(0).toUpperCase() +
                          user?.accountType.slice(1)
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge
                        status={
                          user?.accountStatus.charAt(0).toUpperCase() +
                          user?.accountStatus.slice(1)
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      {new Date(user?.createdAt || 0).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* Dropdown for actions can be added here */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(
                              "user id:",
                              user._id + " activeActionMenu : ",
                              activeActionMenu
                            );
                            setActiveActionMenu(
                              String(activeActionMenu) === String(user._id)
                                ? null
                                : user._id
                            );
                          }}
                          className="p-2 cursor-pointer rounded-full hover:bg-slate-200"
                        >
                          <FiMoreVertical />
                        </button>
                        {String(activeActionMenu) === String(user._id) && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <Link
                              to="#"
                              className="flex items-center px-4 py-2 text-sm"
                            >
                              <FiEdit className="mr-2" /> Edit
                            </Link>
                            <button
                              onClick={() => openModal(user, "suspend")}
                              className="flex cursor-pointer text-amber-600 items-center w-full text-left px-4 py-2 text-sm"
                            >
                              <FiSlash className="mr-2" /> Suspend
                            </button>
                            <button
                              onClick={() => openModal(user, "delete")}
                              className="flex cursor-pointer items-center w-full text-left px-4 py-2 text-sm text-red-600"
                            >
                              <FiTrash2 className="mr-2" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Confirmation Modal --- */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        icon={<FiAlertTriangle className="h-8 w-8 text-red-600" />}
        heading={`Confirm ${modalState.action}`}
        text={`Are you sure you want to ${modalState.action} the user "${
          modalState.user?.firstName + " " + modalState.user?.lastName
        }"? This action may not be reversible.`}
        primaryButtonText={`Yes, ${modalState.action}`}
        onPrimaryClick={handleConfirmAction}
        secondaryButtonText="Cancel"
        onSecondaryClick={closeModal}
      />
    </div>
  );
}

export default UserManagementPage;
