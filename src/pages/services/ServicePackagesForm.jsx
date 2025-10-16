import React, { useState, createContext, useContext } from "react";

// Mock Auth Context for demonstration
const AuthContext = createContext({ user: { email: "demo@example.com" } });

// Custom Alert Component
const CustomAlert = ({ show, type, title, message, onClose, onConfirm }) => {
  if (!show) return null;

  const icons = {
    warning: "⚠️",
    success: "✅",
    error: "❌",
  };

  const colors = {
    warning: "from-yellow-500 to-orange-500",
    success: "from-green-500 to-emerald-500",
    error: "from-red-500 to-rose-500",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/10 animate-scale-in">
        <div className="text-center">
          <div className={`text-6xl mb-4 bg-gradient-to-r ${colors[type]} bg-clip-text text-transparent`}>
            {icons[type]}
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-300 mb-6">{message}</p>
          <div className="flex gap-3">
            {onConfirm ? (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-xl font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 px-6 py-3 bg-gradient-to-r ${colors[type]} text-white rounded-xl font-medium transition-all hover:opacity-90`}
                >
                  Confirm
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className={`w-full px-6 py-3 bg-gradient-to-r ${colors[type]} text-white rounded-xl font-medium transition-all hover:opacity-90`}
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const fullPackages = [
  {
    name: "Basic",
    price: 120,
    tagline: "Quick Development",
    description:
      "Design 1 page website development or custom code website without API integration (Static). Quick Development – Design 1 page website (static)",
    delivery: "3-day delivery (+$30 for 2 days)",
    revisions: "Unlimited Revisions",
    pages: 1,
    plugins: 5,
    products: 8,
    features: {
      functionalWebsite: true,
      contentUpload: true,
      ecommerce: false,
      paymentIntegration: false,
      optinForm: true,
      speedOptimization: false,
      autoresponder: false,
      hosting: true,
    },
  },
  {
    name: "Standard",
    price: 350,
    tagline: "Prose Development",
    description:
      "Develop 3-4 page website following reference/design, with basic API integrations and custom/CMS website. Prose Development – Develop 3-4 page website with basic API integration (custom/CMS)",
    delivery: "7-day delivery (+$50 for 5 days)",
    revisions: "Unlimited Revisions",
    pages: 4,
    plugins: 8,
    products: 10,
    features: {
      functionalWebsite: true,
      contentUpload: true,
      ecommerce: false,
      paymentIntegration: false,
      optinForm: true,
      speedOptimization: true,
      autoresponder: false,
      hosting: false,
    },
  },
  {
    name: "Premium",
    price: 650,
    tagline: "Custom Development",
    description:
      "Develop 6-8 page custom website frontend with API integrations following client's design (Scalable). Custom Development – Develop 6-8 page scalable website frontend with API integrations",
    delivery: "14-day delivery (+$100 for 10 days)",
    revisions: "Unlimited Revisions",
    pages: 10,
    plugins: 10,
    products: 12,
    features: {
      functionalWebsite: true,
      contentUpload: true,
      ecommerce: true,
      paymentIntegration: true,
      optinForm: true,
      speedOptimization: true,
      autoresponder: true,
      hosting: true,
    },
  },
];

const API_URL = "https://jahids-reactfoliopro.onrender.com/ourServices";

const ServicePackagesForm = () => {
  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
    features: {},
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", title: "", message: "" });

  const showAlert = (type, title, message, onConfirm = null) => {
    setAlert({ show: true, type, title, message, onConfirm });
  };

  const closeAlert = () => {
    setAlert({ show: false, type: "", title: "", message: "", onConfirm: null });
  };

  const handleChoose = (pkg) => {
    if (!user) {
      showAlert(
        "warning",
        "Login Required",
        "You need to log in to request a package!",
        () => {
          window.location.href = "/login";
        }
      );
      return;
    }

    setSelected(pkg);
    setFormData((prev) => ({ ...prev, features: pkg.features }));
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (feat, checked) => {
    setFormData((prev) => ({
      ...prev,
      features: { ...prev.features, [feat]: checked },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      showAlert("warning", "Login required", "Please log in to submit a request.");
      return;
    }

    if (!selected) {
      showAlert("warning", "Oops", "Please select a package first!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          package: selected.name,
          userEmail: user.email,
        }),
      });

      if (response.ok) {
        showAlert(
          "success",
          "Success",
          `Thank you, ${formData.name}! Your request for the ${selected.name} package has been submitted.`
        );
        setFormData({ name: "", email: "", details: "", features: {} });
        setSelected(null);
      } else {
        showAlert("error", "Error", "Something went wrong. Try again!");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      showAlert("error", "Error", "Server not responding!");
    } finally {
      setLoading(false);
    }
  };

  const featureKeys = selected ? Object.keys(selected.features) : [];

  return (
    <>
      <CustomAlert
        show={alert.show}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={closeAlert}
        onConfirm={alert.onConfirm}
      />

      <section className="py-20 px-4 bg-white min-h-screen relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Price plan
            </h2>
            <p className="text-gray-600 text-lg">Choose the perfect plan for your project</p>
          </div>

          {/* Packages Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {fullPackages.map((pkg, idx) => (
              <div
                key={idx}
                className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border-2 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-200 ${
                  selected?.name === pkg.name
                    ? "border-purple-500 shadow-2xl shadow-purple-200 scale-105"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                {/* Popular Badge for Standard */}
                {pkg.name === "Standard" && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-purple-600 text-sm font-medium">{pkg.tagline}</p>
                  <div className="mt-6">
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ${pkg.price}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-purple-500">📄</span>
                    <span>{pkg.pages} Pages</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-purple-500">🔌</span>
                    <span>{pkg.plugins} Plugins</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-purple-500">📦</span>
                    <span>{pkg.products} Products</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-purple-500">⚡</span>
                    <span className="text-sm">{pkg.delivery}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-purple-500">🔄</span>
                    <span>{pkg.revisions}</span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-2 mb-8 border-t border-gray-200 pt-6">
                  {Object.entries(pkg.features).map(([feat, enabled], i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={enabled ? "text-green-500" : "text-gray-300"}>
                        {enabled ? "✓" : "×"}
                      </span>
                      <span className={`text-sm ${enabled ? "text-gray-700" : "text-gray-400"}`}>
                        {feat.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleChoose(pkg)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
                >
                  Choose {pkg.name}
                </button>
              </div>
            ))}
          </div>

          {/* Request Form */}
          {selected && (
            <div className="max-w-3xl mx-auto animate-fade-in">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 border-2 border-gray-200 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">
                    Request{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {selected.name}
                    </span>{" "}
                    Package
                  </h3>
                  <p className="text-gray-600">Fill in your details to get started</p>
                </div>

                {user ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="example@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Project Details
                      </label>
                      <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        rows="5"
                        required
                        className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {/* Editable Features */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-4">
                        Select Features You Need
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {featureKeys.map((feat) => (
                          <label
                            key={feat}
                            className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer hover:border-purple-300 hover:bg-gray-50 transition-all"
                          >
                            <input
                              type="checkbox"
                              checked={formData.features[feat]}
                              onChange={(e) => handleFeatureChange(feat, e.target.checked)}
                              className="w-5 h-5 accent-purple-600 cursor-pointer"
                            />
                            <span className="text-gray-700 capitalize text-sm">
                              {feat.replace(/([A-Z])/g, " $1")}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Submit Request"
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-700 text-lg mb-4">
                      Please log in to request this package
                    </p>
                    <a
                      href="/login"
                      className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
                    >
                      Log In
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes scale-in {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }

          .animate-scale-in {
            animation: scale-in 0.3s ease-out;
          }
        `}</style>
      </section>
    </>
  );
};

export default ServicePackagesForm;