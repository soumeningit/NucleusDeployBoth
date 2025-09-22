import React from "react";
import {
  FaBell,
  FaSearch,
  FaEnvelope,
  FaUsers,
  FaBullhorn,
  FaExclamationTriangle,
  FaTimes,
  FaCheckCircle,
  FaTrashAlt,
} from "react-icons/fa";

// --- MOCK DATA --- //
const initialNotifications = [
  {
    id: 1,
    type: "enrollment",
    title: "New Student Enrollment",
    message: 'John Doe has just enrolled in "React for Beginners".',
    timestamp: "2025-09-21T10:30:00Z",
    isRead: false,
    user: "John Doe",
  },
  {
    id: 2,
    type: "system",
    title: "Scheduled Maintenance",
    message:
      "The platform will be down for scheduled maintenance on Sunday at 2 AM.",
    timestamp: "2025-09-20T15:00:00Z",
    isRead: false,
  },
  {
    id: 3,
    type: "promo",
    title: "New Course Published",
    message:
      'Check out our new "Advanced TypeScript" course, now available with a 20% launch discount!',
    timestamp: "2025-09-20T11:00:00Z",
    isRead: true,
  },
  {
    id: 4,
    type: "direct",
    title: "Regarding your last session",
    message:
      "Hi Jane, could you please re-upload the assets for Chapter 5? There was an issue with the last upload.",
    timestamp: "2025-09-19T18:45:00Z",
    isRead: false,
    user: "Jane Smith",
  },
  {
    id: 5,
    type: "enrollment",
    title: "New Student Enrollment",
    message: 'Alice Johnson has just enrolled in "UI/UX Design Fundamentals".',
    timestamp: "2025-09-19T09:12:00Z",
    isRead: true,
    user: "Alice Johnson",
  },
  {
    id: 6,
    type: "system",
    title: "Security Update",
    message:
      "We have updated our security protocols. No action is required on your part.",
    timestamp: "2025-09-18T14:00:00Z",
    isRead: true,
  },
];

const getNotificationMeta = (type) => {
  switch (type) {
    case "enrollment":
      return {
        icon: <FaUsers className="h-5 w-5 text-blue-500" />,
        color: "blue",
        bgColor: "bg-blue-50",
      };
    case "system":
      return {
        icon: <FaExclamationTriangle className="h-5 w-5 text-red-500" />,
        color: "red",
        bgColor: "bg-red-50",
      };
    case "promo":
      return {
        icon: <FaBullhorn className="h-5 w-5 text-green-500" />,
        color: "green",
        bgColor: "bg-green-50",
      };
    case "direct":
      return {
        icon: <FaEnvelope className="h-5 w-5 text-purple-500" />,
        color: "purple",
        bgColor: "bg-purple-50",
      };
    default:
      return {
        icon: <FaBell className="h-5 w-5 text-gray-500" />,
        color: "gray",
        bgColor: "bg-gray-50",
      };
  }
};

function Notification() {
  const [notifications, setNotifications] =
    React.useState(initialNotifications);
  const [messageType, setMessageType] = React.useState("everyone");
  const [recipient, setRecipient] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterType, setFilterType] = React.useState("all");
  const [showSuccess, setShowSuccess] = React.useState(false);

  // Memoized filtering for performance
  const filteredNotifications = React.useMemo(() => {
    return notifications
      .filter((n) => {
        if (filterType === "all") return true;
        if (filterType === "unread") return !n.isRead;
        return n.type === filterType;
      })
      .filter(
        (n) =>
          n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [notifications, searchTerm, filterType]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!title || !message) {
      alert("Please fill in both title and message.");
      return;
    }
    if (messageType === "specific" && !recipient) {
      alert("Please specify a recipient.");
      return;
    }

    console.log("Sending message:", {
      type: messageType,
      recipient,
      title,
      message,
    });

    // In a real app, this would be an API call. Here we add it to our local state.
    const newNotification = {
      id: notifications.length + 1,
      type: "direct",
      title,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
      user: messageType === "specific" ? recipient : "All Users",
    };
    setNotifications([newNotification, ...notifications]);

    // Reset form and show success message
    setTitle("");
    setMessage("");
    setRecipient("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleToggleRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Notification Center
        </h1>
        <p className="text-md text-gray-500 mt-1">
          Manage and send communications to your users.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Notification Feed */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Notification Feed
            </h2>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-48">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-1 border-gray-400 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border-1 border-gray-400 cursor-pointer rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {[
                  "All Types",
                  "Unread",
                  "Enrollment",
                  "System",
                  "Promo",
                  "Direct",
                ].map((type) => (
                  <option
                    key={type.toLowerCase()}
                    value={type.toLowerCase()}
                    className="cursor-pointer"
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => {
                const { icon, bgColor } = getNotificationMeta(
                  notification.type
                );
                const timeAgo = new Intl.RelativeTimeFormat("en", {
                  numeric: "auto",
                }).format(
                  Math.round(
                    (new Date(notification.timestamp) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  ),
                  "day"
                );

                return (
                  <div
                    key={notification.id}
                    className={`relative flex items-start gap-4 p-4 rounded-lg border-1 border-gray-400 shadow-md transition-all duration-300 ${
                      notification.isRead
                        ? "bg-white"
                        : `${bgColor} border-blue-200`
                    }`}
                  >
                    {!notification.isRead && (
                      <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-blue-500"></span>
                    )}
                    <div
                      className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${bgColor}`}
                    >
                      {icon}
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-800">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {timeAgo}{" "}
                        {notification.user && `• To: ${notification.user}`}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <button
                        onClick={() => handleToggleRead(notification.id)}
                        title={
                          notification.isRead
                            ? "Mark as Unread"
                            : "Mark as Read"
                        }
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <FaCheckCircle
                          size={18}
                          className={
                            notification.isRead ? "text-green-500" : ""
                          }
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(notification.id)}
                        title="Delete"
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FaBell size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No notifications match your criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Compose Message */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Compose Message
          </h2>
          <form onSubmit={handleSendMessage}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient
              </label>
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setMessageType("everyone")}
                  className={`px-4 py-2 rounded-l-md border text-sm font-medium ${
                    messageType === "everyone"
                      ? "bg-blue-600 text-white border-blue-600 z-10"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  Everyone
                </button>
                <button
                  type="button"
                  onClick={() => setMessageType("specific")}
                  className={`-ml-px px-4 py-2 rounded-r-md border text-sm font-medium ${
                    messageType === "specific"
                      ? "bg-blue-600 text-white border-blue-600 z-10"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  Specific User
                </button>
              </div>
            </div>

            {messageType === "specific" && (
              <div className="mb-4 transition-all duration-300">
                <label
                  htmlFor="recipient"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User ID or Email
                </label>
                <input
                  type="text"
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g., user_123 or student@example.com"
                  className="w-full border-1 border-gray-400 shadow-md rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Upcoming Holiday"
                className="w-full border-1 border-gray-400 shadow-md rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your announcement or message here..."
                className="w-full border-1 border-gray-400 shadow-md rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              Send Notification
            </button>

            {showSuccess && (
              <div className="mt-4 flex items-center gap-2 text-green-600 text-sm transition-opacity duration-300">
                <FaCheckCircle size={18} />
                <span>Notification sent successfully!</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Notification;
