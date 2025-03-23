import { useState } from "react";
import { Lock, MessageCircle, Edit, FileText, Mail, CheckCircle, XCircle } from "lucide-react";
import {  FaAngleRight, FaArrowLeft } from "react-icons/fa";

const settingsOptions = [
  { id: "password", label: "Change Password", icon: <Lock size={18} /> },
  { id: "whatsapp", label: "WhatsApp Notifications", icon: <MessageCircle size={18} /> },
  { id: "signature", label: "Supplier Signature", icon: <Edit size={18} /> },
  { id: "policies", label: "Legal and Policies", icon: <FileText size={18} /> },
  { id: "email", label: "Email Notifications", icon: <Mail size={18} /> },
];

const policies = [
  { title: "Anti Phishing Policy", slug: "anti-phishing" },
  { title: "Privacy Policy", slug: "privacy-policy" },
  { title: "Intellectual Property Policy", slug: "intellectual-property" },
  { title: "Supplier Agreement", slug: "supplier-agreement" },
  { title: "Additional Supplier Policies", slug: "additional-supplier" },
  { title: "Supplier Deactivation Policy", slug: "supplier-deactivation" },
  { title: "Prohibited and Restricted Products list", slug: "prohibited-products" },
  { title: "Terms and Conditions", slug: "terms-conditions" },
  { title: "Supplier Referral Policy", slug: "supplier-referral" },
  { title: "Whistle Blower Policy", slug: "whistle-blower" },
  { title: "T&Cs - Courier Partner Preference", slug: "courier-partner" },
  { title: "Return Claims Policy", slug: "return-claims" },
  { title: "Branded Packaging Policy", slug: "branded-packaging" },
  { title: "No-Pack Program Policy", slug: "no-pack-program" },
];

const policyDetails = {
  "anti-phishing-policy": {
    title: "Anti-Phishing Policy",
    updatedDate: "March, 2025",
    content: `
      We take security seriously. If you receive any suspicious emails, messages, or calls pretending to be from us, 
      do not share your personal or financial details. Report phishing attempts to support@example.com.
    `,
  },
  "privacy-policy": {
    title: "Privacy Policy",
    updatedDate: "March, 2025",
    content: `
      We respect your privacy and ensure that your data is protected. 
      We collect, store, and use your personal information solely for order processing, customer support, 
      and improving our services. Read our full privacy policy for more details.
    `,
  },
  "intellectual-property-policy": {
    title: "Intellectual Property Policy",
    updatedDate: "March, 2025",
    content: `
      We respect intellectual property rights and expect our users to do the same. 
      Any unauthorized use, reproduction, or distribution of copyrighted materials is prohibited. 
      If you believe your IP rights have been violated, please contact us.
    `,
  },
  "supplier-agreement": {
    title: "Supplier Agreement",
    updatedDate: "March, 2025",
    content: `
      By registering as a supplier, you agree to abide by our platform’s terms, including fair pricing, 
      timely deliveries, and compliance with all applicable regulations.
    `,
  },
  "additional-supplier-policies": {
    title: "Additional Supplier Policies",
    updatedDate: "March, 2025",
    content: `
      - All products must comply with our quality standards.
      - Misleading product descriptions are strictly prohibited.
      - Sellers must respond to customer inquiries within 24 hours.
    `,
  },
  "supplier-deactivation-policy": {
    title: "Supplier Deactivation Policy",
    updatedDate: "March, 2025",
    content: `
      We reserve the right to deactivate supplier accounts that violate our policies, 
      fail to meet quality standards, or receive repeated complaints.
    `,
  },
  "prohibited-restricted-products": {
    title: "Prohibited and Restricted Products List",
    updatedDate: "March, 2025",
    content: `
      Certain products are not allowed on our platform, including:
      ✅ Legal compliance-required items (e.g., prescription drugs)
      ❌ Illegal or counterfeit goods
      ❌ Explosives, weapons, or hazardous materials
    `,
  },
  "terms-conditions": {
    title: "Terms and Conditions",
    updatedDate: "March, 2025",
    content: `
      By using our services, you agree to be bound by our terms and conditions.
      These terms cover your usage rights, limitations, and the agreement between the user and the company.
      Please review them carefully.
    `,
  },
  "supplier-referral-policy": {
    title: "Supplier Referral Policy",
    updatedDate: "March, 2025",
    content: `
      Suppliers can refer others and earn rewards when they successfully register and list products.
      Rewards are subject to approval and compliance with our policies.
    `,
  },
  "whistleblower-policy": {
    title: "Whistleblower Policy",
    updatedDate: "March, 2025",
    content: `
      We encourage reporting of fraudulent, unethical, or illegal activities.
      Whistleblowers will remain anonymous and protected from retaliation.
    `,
  },
};


const SettingsPage = ({open}) => {
  const [selectedOption, setSelectedOption] = useState("password");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [mobile, setMobile] = useState("+91 9876543210");
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const criteria = [
    { label: "Minimum 8 characters", check: password.length >= 8 },
    { label: "1 Capital letter (A-Z)", check: /[A-Z]/.test(password) },
    { label: "1 Special Character (@#$%!^&*)", check: /[@#$%!^&*]/.test(password) },
    { label: "1 Number", check: /[0-9]/.test(password) },
  ];


  return (
    <div
    className={`w-full ${
      open ? "md:ml-72" : "md:ml-20"
    } mt-20 h-[calc(100vh-80px)] p-2 md:p-2 bg-gray-100 overflow-y-auto`}
  >
    <div className="flex flex-col md:flex-row h-screen p-4 bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <ul>
          {settingsOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`flex items-center gap-2 p-3 cursor-pointer rounded-md transition-all ${
                selectedOption === option.id ? "bg-blue-100 text-blue-600" : "text-gray-700"
              } hover:bg-gray-200`}
            >
              {option.icon} {option.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-3/4 bg-white shadow-lg rounded-lg  ml-4 flex flex-grow-1">
        {selectedOption === "password" && <ChangePassword password={password} setPassword={setPassword} setConfirmPassword={setConfirmPassword} confirmPassword={confirmPassword} criteria={criteria} />}
        {selectedOption === "whatsapp" && <WhatsAppNotifications enabled={enabled} setEnabled={setEnabled} mobile={mobile} setMobile={setMobile} />}
        {selectedOption === "signature" && <SupplierSignature />}
        {selectedOption === "policies" && <LegalPolicies selectedPolicy={selectedPolicy} setSelectedPolicy={setSelectedPolicy} />}
        {selectedOption === "email" && <EmailNotifications />}
      </div>
    </div>
    </div>
  );
};

const ChangePassword = ({password, confirmPassword, setPassword, setConfirmPassword, criteria}) => (
  <div className="bg-white p-6 rounded-lg   mx-auto">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      <input
        type="password"
        placeholder="Current Password"
        className="w-full p-2 border rounded mb-3 focus:ring focus:ring-blue-300"
      />

      <input
        type="password"
        placeholder="New Password"
        className="w-full p-2 border rounded mb-3 focus:ring focus:ring-blue-300"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="mb-3">
        {criteria.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {item.check ? (
              <CheckCircle className="text-green-500" size={16} />
            ) : (
              <XCircle className="text-gray-400" size={16} />
            )}
            <span className={item.check ? "text-green-500 font-medium" : "text-gray-500"}>{item.label}</span>
          </div>
        ))}
      </div>

      <input
        type="password"
        placeholder="Re-type New Password"
        className="w-full p-2 border rounded mb-4 focus:ring focus:ring-blue-300"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        className={`w-full py-2 rounded ${
          password === confirmPassword && password.length >= 8
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={password !== confirmPassword || password.length < 8}
      >
        Change Password
      </button>
    </div>
);

const WhatsAppNotifications = ({enabled, setEnabled, mobile, setMobile}) => (
  <div className="bg-white p-6 rounded-lg  max-w-md mx-auto">
      {/* Header with WhatsApp Icon */}
      <div className="flex items-center gap-3">
        <MessageCircle className="text-green-500" size={28} />
        <h2 className="text-xl font-semibold">WhatsApp Notifications</h2>
      </div>

      {/* Description */}
      <p className="text-gray-600 mt-2">
        Get real-time order updates and important notifications on your WhatsApp.
        Stay informed and never miss an update!
      </p>

      {/* Mobile Number Input */}
      <div className="mt-4">
        <label className="block text-gray-700 font-medium">Registered Mobile Number</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-2 border rounded mt-1 focus:ring focus:ring-green-300"
        />
      </div>

      {/* Toggle Switch */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-gray-700 font-medium">Enable WhatsApp Notifications</span>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`w-12 h-6 flex items-center rounded-full transition duration-300 ${
            enabled ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <span
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Info Message */}
      {enabled && (
        <p className="text-green-600 text-sm mt-2">WhatsApp notifications are enabled for order updates.</p>
      )}
    </div>
);

const SupplierSignature = () => {
  const [signature, setSignature] = useState(null);
  const [error, setError] = useState("");

  // Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setSignature(URL.createObjectURL(file));
      setError("");
    } else {
      setError("Please upload a valid image file (PNG, JPG, or JPEG).");
      setSignature(null);
    }
  };

  // Handle Save
  const handleSave = () => {
    if (!signature) {
      setError("Please upload your signature before saving.");
      return;
    }
    alert("Signature uploaded successfully!");
    console.log("Signature uploaded:", signature);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 0l-6 4-6-4v10h12V5zm-6 3l6-4H4l6 4z" />
        </svg>
        <h2 className="text-xl font-semibold">Supplier Signature</h2>
      </div>
      <p className="text-gray-600 text-sm">
        Upload your **digital signature** to appear on invoices and other business documents. This helps in **branding** and ensures professional authenticity.
      </p>

      {/* Upload Section */}
      <div className="mt-4 border-dashed border-2 border-gray-300 p-6 rounded-lg text-center hover:bg-gray-50">
        <label
          htmlFor="fileInput"
          className="cursor-pointer text-blue-600 hover:underline block text-sm font-medium"
        >
          Click to Upload or Drag & Drop Your Signature
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="text-xs text-gray-500 mt-1">Accepted formats: PNG, JPG, JPEG</p>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Preview */}
      {signature && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 font-medium">Preview:</p>
          <img
            src={signature}
            alt="Signature Preview"
            className="mt-2 w-48 h-auto border rounded-md shadow-md"
          />
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
      >
        Save Signature
      </button>
    </div>
  );
};

const LegalPolicies = ({selectedPolicy, setSelectedPolicy}) => (
  <div className="flex w-full flex-col md:flex-row bg-gray-50 p-2 h-[90vh] overflow-hidden">
      {/* Sidebar - Show only if no policy is selected */}
      {!selectedPolicy && (
        <div className="w-full  bg-white shadow-lg rounded-lg p-2 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Legal and Policies</h2>
          <ul className="mt-4 space-y-1">
            {policies.map((policy) => (
              <li
                key={policy.slug}
                className="p-2 text-xs text-purple-800 cursor-pointer rounded-lg hover:bg-gray-200"
                onClick={() => setSelectedPolicy(policy.slug)}
              >
                <div className="flex items-center gap-2">
                  <FaAngleRight />
                  <p>{policy.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Policy Details Panel - Takes full width when a policy is selected */}
      {selectedPolicy && (
        <div className="w-full bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
          {/* Back Button */}
          <button
            className="flex items-center gap-2 text-blue-500 hover:underline mb-4"
            onClick={() => setSelectedPolicy(null)}
          >
            <FaArrowLeft />
            Back
          </button>

          <nav className="mb-4 text-gray-500 text-sm">
              <span className="cursor-pointer hover:underline" onClick={() => setSelectedPolicy(null)}>Legal and Policies</span>
              {" > "}
              <span className="text-gray-900">{policyDetails[selectedPolicy]?.title}</span>
            </nav>

          {/* Policy Content */}
          <h2 className="text-2xl font-semibold">{policyDetails[selectedPolicy]?.title}</h2>
          <p className="text-sm text-gray-500 italic">
            Last Updated: {policyDetails[selectedPolicy]?.updatedDate}
          </p>
          <p className="mt-4 text-gray-700">{policyDetails[selectedPolicy]?.content}</p>
        </div>
      )}
    </div>
);

const EmailNotifications = () => {
  const [email, setEmail] = useState("");
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);
  const [reviewAlerts, setReviewAlerts] = useState(true);
  const [error, setError] = useState("");

  // Handle Email Input Change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error when user types
  };

  // Handle Form Submission
  const handleSave = () => {
    if (!email) {
      setError("Please enter your email to receive notifications.");
      return;
    }
    console.log("Preferences saved:", { email, orderUpdates, promoEmails, reviewAlerts });
    alert("Notification preferences updated successfully!");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 0l-6 4-6-4v10h12V5zm-6 3l6-4H4l6 4z" />
        </svg>
        <h2 className="text-xl font-semibold">Email Notifications</h2>
      </div>
      <p className="text-gray-600 text-sm">
        Stay updated with important notifications via email. Enter your email and select the types of notifications you’d like to receive.
      </p>

      {/* Email Input Field */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Notification Settings */}
      <div className="mt-6 space-y-4">
        {/* Order Updates */}
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <h3 className="text-sm font-medium">Order Updates</h3>
            <p className="text-xs text-gray-500">
              Receive notifications about new orders, cancellations, and shipping updates.
            </p>
          </div>
          <button
            onClick={() => setOrderUpdates(!orderUpdates)}
            className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition ${
              orderUpdates ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
                orderUpdates ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>

        {/* Promotional Emails */}
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <h3 className="text-sm font-medium">Promotional Emails</h3>
            <p className="text-xs text-gray-500">
              Get special deals, feature updates, and exclusive seller tips.
            </p>
          </div>
          <button
            onClick={() => setPromoEmails(!promoEmails)}
            className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition ${
              promoEmails ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
                promoEmails ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>

        {/* Customer Review Alerts */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium">Customer Review Alerts</h3>
            <p className="text-xs text-gray-500">
              Get notified when customers leave reviews on your products.
            </p>
          </div>
          <button
            onClick={() => setReviewAlerts(!reviewAlerts)}
            className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition ${
              reviewAlerts ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
                reviewAlerts ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
      >
        Save Preferences
      </button>
    </div>
  );
};



export default SettingsPage;
