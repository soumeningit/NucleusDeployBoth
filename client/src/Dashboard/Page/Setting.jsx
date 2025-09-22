import React, { useState, useRef } from "react";
import DashboardHeader from "../Components/DashboardHeader";
import {
  FiUser,
  FiShield,
  FiBell,
  FiAlertTriangle,
  FiUpload,
  FiTrash2,
} from "react-icons/fi";

// --- Reusable Helper Components ---

// A stylish toggle switch
const ToggleSwitch = ({ enabled, setEnabled }) => (
  <button
    type="button"
    className={`${
      enabled ? "bg-indigo-600" : "bg-slate-300"
    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
    onClick={() => setEnabled(!enabled)}
  >
    <span
      className={`${
        enabled ? "translate-x-5" : "translate-x-0"
      } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
    />
  </button>
);

// --- Main Settings Page Component ---

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const fileInputRef = useRef(null);

  // Mock user data - fetch from an API in a real app
  const [userData, setUserData] = useState({
    fullName: "Anirban Ghosh",
    username: "anirban_g",
    email: "anirban.g@example.com",
    bio: "Passionate full-stack developer and instructor at Nucleus, dedicated to making tech education accessible.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    notifications: {
      newCourses: true,
      weeklyDigest: false,
      mentionAlerts: true,
    },
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key) => {
    setUserData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Saving user data:", { ...userData, newAvatar: avatarPreview });
    alert("Profile saved successfully!");
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: <FiUser /> },
    { id: "security", name: "Account & Security", icon: <FiShield /> },
    { id: "notifications", name: "Notifications", icon: <FiBell /> },
    {
      id: "danger",
      name: "Danger Zone",
      icon: <FiAlertTriangle />,
      isDanger: true,
    },
  ];

  return (
    <div>
      <DashboardHeader title="Account Settings" />

      <div className="mt-8 bg-white rounded-lg shadow-sm">
        {/* Tab Navigation */}
        <div className="border-b border-slate-200">
          <nav className="flex flex-wrap -mb-px px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center whitespace-nowrap py-4 px-1 mr-8 text-sm font-medium transition-colors border-b-2
                  ${
                    activeTab === tab.id
                      ? tab.isDanger
                        ? "border-red-500 text-red-600"
                        : "border-indigo-500 text-indigo-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8">
          <form onSubmit={handleFormSubmit}>
            {activeTab === "profile" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-slate-800">
                  Public Profile
                </h3>
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <img
                    src={avatarPreview || userData.avatar}
                    alt="User Avatar"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      className="hidden"
                      accept="image/*"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="flex items-center bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-md hover:bg-slate-200 transition-colors text-sm"
                    >
                      <FiUpload className="mr-2" /> Change Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAvatarPreview(null);
                        setUserData((p) => ({ ...p, avatar: "" }));
                      }}
                      className="text-slate-500 hover:text-red-600 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {/* Profile Details Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={userData.fullName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Username
                    </label>
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        @
                      </span>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        className="block w-full pl-8 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={userData.bio}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Tell us a little about yourself..."
                  ></textarea>
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8 max-w-lg">
                <h3 className="text-xl font-bold text-slate-800">
                  Account & Security
                </h3>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <p className="text-slate-500 text-sm mt-1">
                    Your email is {userData.email}.{" "}
                    <a href="#" className="text-indigo-600 hover:underline">
                      Change
                    </a>
                  </p>
                </div>
                <div className="border-t border-slate-200 pt-6">
                  <h4 className="font-medium text-slate-800">
                    Change Password
                  </h4>
                  <div className="space-y-4 mt-4">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-8 max-w-lg">
                <h3 className="text-xl font-bold text-slate-800">
                  Notification Settings
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-700">
                      New Course Announcements
                    </p>
                    <ToggleSwitch
                      enabled={userData.notifications.newCourses}
                      setEnabled={() => handleNotificationToggle("newCourses")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-700">
                      Weekly Progress Digest
                    </p>
                    <ToggleSwitch
                      enabled={userData.notifications.weeklyDigest}
                      setEnabled={() =>
                        handleNotificationToggle("weeklyDigest")
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-700">
                      Discussion Mentions
                    </p>
                    <ToggleSwitch
                      enabled={userData.notifications.mentionAlerts}
                      setEnabled={() =>
                        handleNotificationToggle("mentionAlerts")
                      }
                    />
                  </div>
                </div>
                <div className="text-right border-t border-slate-200 pt-6">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Save Notifications
                  </button>
                </div>
              </div>
            )}

            {activeTab === "danger" && (
              <div className="space-y-6 border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-red-700">Danger Zone</h3>
                <div>
                  <h4 className="font-medium text-slate-800">
                    Delete Your Account
                  </h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Once you delete your account, there is no going back. All of
                    your data, including course progress and certificates, will
                    be permanently removed. Please be certain.
                  </p>
                  <button
                    type="button"
                    className="mt-4 flex items-center bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm"
                  >
                    <FiTrash2 className="mr-2" /> Delete My Account
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
