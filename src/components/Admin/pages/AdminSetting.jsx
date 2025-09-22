import { useState, useEffect, useRef } from "react";

import {
  FiSave,
  FiLoader,
  FiUploadCloud,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";
import DashboardHeader from "../../../Dashboard/Components/DashboardHeader";

// --- MOCK API RESPONSE ---
// In a real app, this data would be fetched from your backend.
const mockSettings = {
  general: {
    siteName: "Nucleus",
    logoUrl: "https://img.logoipsum.com/286.svg",
    contactEmail: "support@nucleus.com",
    copyrightText: `© ${new Date().getFullYear()} Nucleus. All rights reserved.`,
  },
  payment: {
    provider: "stripe",
    apiKey: "pk_test_************************",
    apiSecret: "sk_test_************************",
    currency: "INR",
  },
  social: {
    twitter: "https://twitter.com/nucleus",
    facebook: "https://facebook.com/nucleus",
    linkedin: "https://linkedin.com/company/nucleus",
  },
};

// --- Helper Components ---
const SettingsCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-4 mb-6">
      {title}
    </h3>
    <div className="space-y-6">{children}</div>
  </div>
);

const SettingRow = ({ label, description, children }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
    <div className="md:col-span-1">
      <h4 className="font-medium text-slate-700">{label}</h4>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
    <div className="md:col-span-2">{children}</div>
  </div>
);

// --- Main Page Component ---
function SiteSettingsPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const logoInputRef = useRef(null);

  // Simulate fetching initial settings
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSettings(mockSettings);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  // Generic handler for nested state changes
  const handleNestedChange = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newLogoUrl = URL.createObjectURL(file);
      // In a real app, you'd also store the file object to upload
      handleNestedChange("general", "logoUrl", newLogoUrl);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    console.log("Saving settings to backend:", settings);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
    setSaving(false);
    alert("Settings saved successfully!");
  };

  const saveButton = (
    <button
      type="submit"
      form="settings-form"
      disabled={saving}
      className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors text-sm disabled:bg-indigo-400 flex items-center"
    >
      {saving ? (
        <>
          <FiLoader className="animate-spin mr-2" /> Saving...
        </>
      ) : (
        <>
          <FiSave className="mr-2" /> Save Changes
        </>
      )}
    </button>
  );

  if (loading) {
    // A simple loading state for the whole page
    return (
      <div className="flex items-center justify-center h-screen">
        <FiLoader className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  return (
    <div>
      {/* <DashboardHeader title="Site Settings" action={saveButton} /> */}

      <form id="settings-form" onSubmit={handleSave} className="mt-8 space-y-8">
        {/* --- General Settings --- */}
        <SettingsCard title="General Settings">
          <SettingRow
            label="Site Name"
            description="The name of your platform, displayed in the header and titles."
          >
            <input
              type="text"
              value={settings.general.siteName}
              onChange={(e) =>
                handleNestedChange("general", "siteName", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </SettingRow>
          <SettingRow
            label="Site Logo"
            description="The primary logo for your site. Recommended size: 128x128px."
          >
            <div className="flex items-center space-x-4">
              <img
                src={settings.general.logoUrl}
                alt="Current Logo"
                className="h-16 w-auto bg-slate-100 p-2 rounded-md"
              />
              <input
                type="file"
                ref={logoInputRef}
                onChange={handleLogoChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => logoInputRef.current.click()}
                className="bg-slate-100 font-semibold py-2 px-4 rounded-md hover:bg-slate-200"
              >
                Change Logo
              </button>
            </div>
          </SettingRow>
          <SettingRow
            label="Copyright Text"
            description="Displayed in the footer of your website."
          >
            <input
              type="text"
              value={settings.general.copyrightText}
              onChange={(e) =>
                handleNestedChange("general", "copyrightText", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </SettingRow>
        </SettingsCard>

        {/* --- Payment Gateway Settings --- */}
        <SettingsCard title="Payment Gateway">
          <SettingRow
            label="Provider"
            description="Select the payment provider for processing transactions."
          >
            <select
              value={settings.payment.provider}
              onChange={(e) =>
                handleNestedChange("payment", "provider", e.target.value)
              }
              className="w-full p-2 border rounded-md bg-white"
            >
              <option value="stripe">Stripe</option>
              <option value="razorpay">Razorpay</option>
              <option value="paypal">PayPal</option>
            </select>
          </SettingRow>
          <SettingRow
            label="API Key"
            description="Your public API key from the selected provider."
          >
            <input
              type="password"
              value={settings.payment.apiKey}
              onChange={(e) =>
                handleNestedChange("payment", "apiKey", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </SettingRow>
          <SettingRow
            label="API Secret"
            description="Your secret key. This is stored securely."
          >
            <input
              type="password"
              value={settings.payment.apiSecret}
              onChange={(e) =>
                handleNestedChange("payment", "apiSecret", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </SettingRow>
        </SettingsCard>

        {/* --- Social Media Links --- */}
        <SettingsCard title="Social Media Links">
          <SettingRow
            label="Twitter"
            description="Link to your official Twitter/X profile."
          >
            <div className="relative">
              <FiTwitter className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
              <input
                type="url"
                placeholder="https://twitter.com/your-profile"
                value={settings.social.twitter}
                onChange={(e) =>
                  handleNestedChange("social", "twitter", e.target.value)
                }
                className="w-full p-2 pl-10 border rounded-md"
              />
            </div>
          </SettingRow>
          <SettingRow
            label="Facebook"
            description="Link to your official Facebook page."
          >
            <div className="relative">
              <FiFacebook className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
              <input
                type="url"
                placeholder="https://facebook.com/your-page"
                value={settings.social.facebook}
                onChange={(e) =>
                  handleNestedChange("social", "facebook", e.target.value)
                }
                className="w-full p-2 pl-10 border rounded-md"
              />
            </div>
          </SettingRow>
          <SettingRow
            label="LinkedIn"
            description="Link to your official LinkedIn company page."
          >
            <div className="relative">
              <FiLinkedin className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
              <input
                type="url"
                placeholder="https://linkedin.com/company/your-company"
                value={settings.social.linkedin}
                onChange={(e) =>
                  handleNestedChange("social", "linkedin", e.target.value)
                }
                className="w-full p-2 pl-10 border rounded-md"
              />
            </div>
          </SettingRow>
        </SettingsCard>
      </form>
    </div>
  );
}

export default SiteSettingsPage;
