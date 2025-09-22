import { useEffect, useState } from "react";
import DashboardHeader from "../Components/DashboardHeader";
import {
  FiUser,
  FiLock,
  FiBell,
  FiCamera,
  FiTwitter,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import { getUserDetailsAPI } from "../../operation/service/ProfileService";
import useAuthContext from "../../customhooks/useAuthContext";

// Main Profile Page Component
function ProfilePage() {
  // State for the active tab in the settings section
  const [activeTab, setActiveTab] = useState("personal");

  const [profileData, setProfileData] = useState({});

  const [token] = useAuthContext();

  async function fetchUserData() {
    try {
      const response = await getUserDetailsAPI(token);
      if (response.status === 200) {
        setProfileData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  // Component for the Profile Summary Card (Left Column)
  const ProfileCard = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <img
          src={profileData?.image || profileData?.avatar}
          alt="User Avatar"
          className="rounded-full w-full h-full object-cover border-4 border-slate-200"
        />
        <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
          <FiCamera size={16} />
        </button>
      </div>
      <h2 className="text-2xl font-bold text-slate-800">
        {profileData.firstName + " "} {profileData.lastName}
      </h2>
      <p className="text-slate-500">{profileData.accountType}</p>
      <p className="text-sm text-slate-400 mt-1">{profileData?.location}</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a href="#" className="text-slate-500 hover:text-indigo-600">
          <FiTwitter size={20} />
        </a>
        <a href="#" className="text-slate-500 hover:text-indigo-600">
          <FiLinkedin size={20} />
        </a>
        <a href="#" className="text-slate-500 hover:text-indigo-600">
          <FiGithub size={20} />
        </a>
      </div>
      <div className="mt-6 text-left">
        <p className="text-sm font-medium text-slate-600">Profile Completion</p>
        <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: "75%" }}
          ></div>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Complete your profile to get the most out of Nucleus.
        </p>
      </div>
    </div>
  );

  // Component for Form Input Fields
  const FormInput = ({
    id,
    label,
    type,
    value,
    onChange,
    readOnly = false,
  }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm 
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                   ${readOnly ? "bg-slate-100 text-slate-500" : ""}`}
      />
    </div>
  );

  // Component for Tabs in the Settings Section
  const SettingsTabs = () => {
    const tabs = [
      { id: "personal", name: "Personal Info", icon: <FiUser /> },
      { id: "security", name: "Security", icon: <FiLock /> },
      { id: "notifications", name: "Notifications", icon: <FiBell /> },
    ];
    return (
      <nav className="flex border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-3 text-sm font-medium transition-colors
              ${
                activeTab === tab.id
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "border-b-2 border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
          >
            {tab.icon}
            <span className="ml-2">{tab.name}</span>
          </button>
        ))}
      </nav>
    );
  };

  return (
    <div>
      <DashboardHeader title="Account Settings" />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1">
          <ProfileCard />
        </div>

        {/* Right Column: Settings Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <SettingsTabs />
            <div className="p-6">
              {activeTab === "personal" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      id="firstName"
                      label="First Name"
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleChange}
                    />
                    <FormInput
                      id="lastName"
                      label="Last Name"
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleChange}
                    />
                    <FormInput
                      id="email"
                      label="Email Address"
                      type="email"
                      name="email"
                      value={profileData.email}
                      readOnly
                    />
                    <FormInput
                      id="phone"
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-slate-700"
                    >
                      About Me
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      value={profileData?.additionalDetails?.about || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                  <div className="text-right">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <FormInput
                    id="current-password"
                    label="Current Password"
                    type="password"
                    name="currentPassword"
                  />
                  <FormInput
                    id="new-password"
                    label="New Password"
                    type="password"
                    name="newPassword"
                  />
                  <FormInput
                    id="confirm-password"
                    label="Confirm New Password"
                    type="password"
                    name="confirmPassword"
                  />
                  <div className="text-right">
                    <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <p className="text-slate-600">
                    Notification settings will be available soon. 🚧
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
