import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiLoader,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";
import Modal from "../../common/Modal";
import useAuthContext from "../../../customhooks/useAuthContext";
import {
  addCategoryAPI,
  deleteCategoryAPI,
  getAllCategoriesAPI,
  updateCategoryAPI,
} from "../../../operation/service/AdminService";
import toast from "react-hot-toast";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentCategory, setCurrentCategory] = useState({
    name: "",
    description: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [token] = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllCategoriesAPI(token);
        setLoading(false);
        if (response.status === 200) {
          setCategories(response.data.data || []);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openAddModal = () => {
    setCurrentCategory({ name: "", description: "" });
    setModalMode("add");
    setIsFormModalOpen(true);
  };

  const openEditModal = (category) => {
    setCurrentCategory(category);
    setModalMode("edit");
    setIsFormModalOpen(true);
  };

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsFormModalOpen(false);
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      const toastId = toast.loading("Adding category...");
      try {
        const response = await addCategoryAPI(token, currentCategory);
        toast.dismiss(toastId);
        if (response.status === 201) {
          toast.success("Category added successfully!", { id: toastId });
          setCategories((prev) => [
            ...prev,
            { ...currentCategory, ...response.data.data },
          ]);
        }
      } catch (error) {
        console.error("Error adding category:", error);
        return;
      } finally {
        toast.dismiss(toastId);
        closeModal();
      }
    } else {
      const toastId = toast.loading("Updating category...");
      try {
        const response = await updateCategoryAPI(
          token,
          currentCategory._id,
          currentCategory
        );
        toast.dismiss(toastId);
        if (response.status === 200) {
          toast.success("Category updated successfully!", { id: toastId });
          setCategories((prev) =>
            prev.map((cat) =>
              cat._id === currentCategory._id ? currentCategory : cat
            )
          );
        }
      } catch (error) {
        toast.dismiss(toastId);
        console.error("Error updating category:", error);
      } finally {
        toast.dismiss(toastId);
        closeModal();
      }
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteCategoryAPI(token, categoryToDelete._id);
      if (response.status === 200) {
        toast.success("Category deleted successfully!");
        setCategories((prev) =>
          prev.filter((cat) => cat._id !== categoryToDelete._id)
        );
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Category Management
          </h1>
          <p className="text-slate-500">
            Add, edit, or remove course categories.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 cursor-pointer"
        >
          <FiPlus className="mr-2" /> Add New Category
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Courses
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-12">
                    <FiLoader className="mx-auto animate-spin text-2xl" />
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr
                    key={category._id}
                    className="bg-white border-b border-gray-200 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 max-w-sm truncate">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {category?.course?.length || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => openEditModal(category)}
                          className="text-slate-500 hover:text-indigo-600 cursor-pointer"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(category)}
                          className="text-slate-500 hover:text-red-600 cursor-pointer"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white w-full max-w-lg mx-4 p-6 rounded-lg shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <FiX size={24} />
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              {modalMode === "add" ? "Add New Category" : "Edit Category"}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={currentCategory.name}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      name: e.target.value,
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-slate-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="3"
                  value={currentCategory.description}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      description: e.target.value,
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer"
                >
                  {modalMode === "add" ? "Add Category" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeModal}
        icon={<FiAlertTriangle className="h-8 w-8 text-red-600" />}
        heading="Confirm Deletion"
        text={`Are you sure you want to delete the category "${categoryToDelete?.name}"? This action cannot be undone.`}
        primaryButtonText="Delete"
        onPrimaryClick={handleConfirmDelete}
        secondaryButtonText="Cancel"
        onSecondaryClick={closeModal}
      />
    </div>
  );
}

export default CategoryManagement;
