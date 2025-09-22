import React, { useState, useEffect } from "react";
import {
  FiThumbsUp,
  FiTrash2,
  FiAlertTriangle,
  FiMessageSquare,
  FiStar,
  FiLoader,
} from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import Modal from "../../common/Modal";

// --- MOCK API RESPONSE ---
// In a real app, this data would be fetched from separate API endpoints.
const mockModerationData = {
  reviews: [
    {
      id: "rev1",
      user: "FrustratedLearner",
      course: "Advanced CSS and Sass",
      rating: 1,
      content:
        "This course is terrible, the instructor is unclear. SPAM SPAM buy my stuff at spam.com",
      flaggedReason: "Spam / Self-promotion",
    },
    {
      id: "rev2",
      user: "HelpfulStudent",
      course: "Introduction to React",
      rating: 5,
      content: "This course is amazing! Changed my life!",
      flaggedReason: "Review manually flagged for approval",
    },
  ],
  qa: [
    {
      id: "qa1",
      user: "ConfusedCoder",
      course: "Python for Data Science",
      content: "Why does my code not work?? This is so stupid.",
      flaggedReason: "Inappropriate language",
    },
    {
      id: "qa2",
      user: "AnotherStudent",
      course: "Python for Data Science",
      content: "The answer is 42.",
      flaggedReason: "Low-quality / Not a question",
    },
  ],
};

// --- Main Page Component ---
function ModerationPage() {
  const [activeTab, setActiveTab] = useState("reviews"); // 'reviews' or 'qa'
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [qaItems, setQaItems] = useState([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    item: null,
    type: "",
  });

  // Simulate fetching data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 700)); // Simulate API delay
      setReviews(mockModerationData.reviews);
      setQaItems(mockModerationData.qa);
      setLoading(false);
    };
    fetchData();
  }, []);

  const openDeleteModal = (item, type) => {
    setModalState({ isOpen: true, item, type });
  };
  const closeModal = () =>
    setModalState({ isOpen: false, item: null, type: "" });

  const handleAction = (itemId, type, action) => {
    console.log(`${action}ing ${type} item: ${itemId}`);
    // In a real app, you would call an API here to approve/delete the item
    if (type === "review") {
      setReviews((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setQaItems((prev) => prev.filter((item) => item.id !== itemId));
    }
    closeModal();
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <FiLoader className="mx-auto animate-spin text-2xl" />
        </div>
      );
    }

    const items = activeTab === "reviews" ? reviews : qaItems;
    const itemType = activeTab === "reviews" ? "review" : "Q&A";

    if (items.length === 0) {
      return (
        <div className="text-center py-12">
          <FiCheckCircle size={48} className="mx-auto text-green-500" />
          <h3 className="mt-4 text-xl font-bold text-slate-800">All Clear!</h3>
          <p className="mt-2 text-slate-500">The moderation queue is empty.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500">
                  New {itemType} on{" "}
                  <span className="font-semibold text-indigo-600">
                    {item.course}
                  </span>
                </p>
                <p className="text-sm text-slate-400">by {item.user}</p>
              </div>
              <p className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                {item.flaggedReason}
              </p>
            </div>
            <blockquote className="my-4 p-4 bg-slate-50 border-l-4 border-slate-300 text-slate-700">
              {item.content}
            </blockquote>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => handleAction(item.id, itemType, "Approve")}
                className="flex items-center bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 cursor-pointer"
              >
                <FiThumbsUp className="mr-2" />
                Approve
              </button>
              <button
                onClick={() => openDeleteModal(item, itemType)}
                className="flex items-center bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 cursor-pointer"
              >
                <FiTrash2 className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Content Moderation
        </h1>
        <p className="text-slate-500">
          Review flagged content to maintain platform quality.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-6 px-6">
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex items-center gap-2 py-4 px-1 font-medium border-b-2 ${
                activeTab === "reviews"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <FiStar />
              Flagged Reviews{" "}
              <span className="bg-yellow-200 text-yellow-800 text-xs font-bold px-2 rounded-full">
                {reviews.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("qa")}
              className={`flex items-center gap-2 py-4 px-1 font-medium border-b-2 ${
                activeTab === "qa"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <FiMessageSquare />
              Flagged Q&A{" "}
              <span className="bg-yellow-200 text-yellow-800 text-xs font-bold px-2 rounded-full">
                {qaItems.length}
              </span>
            </button>
          </nav>
        </div>

        <div className="p-6">{renderContent()}</div>
      </div>

      {/* --- Confirmation Modal --- */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        icon={<FiAlertTriangle className="h-8 w-8 text-red-600" />}
        heading={`Confirm Deletion`}
        text={`Are you sure you want to permanently delete this ${modalState.type}? This action cannot be undone.`}
        primaryButtonText="Yes, Delete"
        onPrimaryClick={() =>
          handleAction(modalState.item.id, modalState.type, "Delete")
        }
        secondaryButtonText="Cancel"
        onSecondaryClick={closeModal}
      />
    </div>
  );
}

export default ModerationPage;
