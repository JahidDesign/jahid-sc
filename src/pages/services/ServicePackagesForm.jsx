// File: src/components/ServicePackagesForm.jsx
import React, { useState, useContext } from "react";
import Swal from "sweetalert2"; 
import { AuthContext, useAuth } from "../../context/AuthContext";
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
      "Develop 6-8 page custom website frontend with API integrations following client’s design (Scalable). Custom Development – Develop 6-8 page scalable website frontend with API integrations",
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

  // Handle package selection
  const handleChoose = (pkg) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You need to log in to request a package!",
        confirmButtonText: "Login",
      }).then(() => {
        window.location.href = "/login";
      });
      return;
    }

    setSelected(pkg);
    setFormData((prev) => ({ ...prev, features: pkg.features }));
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle feature checkbox changes
  const handleFeatureChange = (feat, checked) => {
    setFormData((prev) => ({
      ...prev,
      features: { ...prev.features, [feat]: checked },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("⚠️ Login required", "Please log in to submit a request.", "warning");
      return;
    }

    if (!selected) {
      Swal.fire("⚠️ Oops", "Please select a package first!", "warning");
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
        Swal.fire(
          "✅ Success",
          `Thank you, ${formData.name}! Your request for the ${selected.name} package has been submitted.`,
          "success"
        );
        setFormData({ name: "", email: "", details: "", features: {} });
        setSelected(null);
      } else {
        Swal.fire("❌ Error", "Something went wrong. Try again!", "error");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      Swal.fire("❌ Error", "Server not responding!", "error");
    } finally {
      setLoading(false);
    }
  };

  const featureKeys = selected ? Object.keys(selected.features) : [];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Packages Table */}
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          Compare Packages
        </h2>
        <div className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="w-full border-collapse bg-white overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <th className="p-5 text-left text-lg font-semibold">Package</th>
                {fullPackages.map((pkg, idx) => (
                  <th key={idx} className="p-5 text-center">
                    <div className="text-xl font-bold">{pkg.name}</div>
                    <div className="text-yellow-300 text-2xl font-extrabold">
                      ${pkg.price}
                    </div>
                    <div className="text-sm opacity-90">{pkg.tagline}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Pages / Plugins / Products */}
              {["pages", "plugins", "products"].map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-700 capitalize">{item}</td>
                  {fullPackages.map((pkg, i) => (
                    <td key={i} className="p-4 text-center">{pkg[item]}</td>
                  ))}
                </tr>
              ))}

              {/* Features */}
              {["functionalWebsite", "contentUpload", "ecommerce", "paymentIntegration", "optinForm", "speedOptimization", "autoresponder", "hosting"].map((feat, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-700 capitalize">
                    {feat.replace(/([A-Z])/g, " $1")}
                  </td>
                  {fullPackages.map((pkg, i) => (
                    <td key={i} className="p-4 text-center">
                      {pkg.features[feat] ? "✔️" : "—"}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Delivery */}
              <tr className="border-t bg-gray-50">
                <td className="p-4 font-medium text-gray-700">Delivery</td>
                {fullPackages.map((pkg, i) => (
                  <td key={i} className="p-4 text-center">{pkg.delivery}</td>
                ))}
              </tr>

              {/* Revisions */}
              <tr className="border-t bg-gray-50">
                <td className="p-4 font-medium text-gray-700">Revisions</td>
                {fullPackages.map((pkg, i) => (
                  <td key={i} className="p-4 text-center">{pkg.revisions}</td>
                ))}
              </tr>

              {/* Continue Buttons */}
              <tr className="border-t bg-gray-100">
                <td></td>
                {fullPackages.map((pkg, i) => (
                  <td key={i} className="p-4 text-center">
                    <button
                      onClick={() => handleChoose(pkg)}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      Continue
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Request Form */}
        {selected && (
          <div className="max-w-3xl mx-auto mt-12 bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
            <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Request <span className="text-blue-600">{selected.name}</span> Package
            </h3>

            {user ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Project Details</label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows="5"
                    required
                    className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Editable Features */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Select Features You Need
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {featureKeys.map((feat) => (
                      <label key={feat} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.features[feat]}
                          onChange={(e) => handleFeatureChange(feat, e.target.checked)}
                          className="accent-blue-600"
                        />
                        <span className="capitalize">{feat.replace(/([A-Z])/g, " $1")}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            ) : (
              <p className="text-center text-red-600 font-medium">
                Please <a href="/login" className="underline">log in</a> to request this package.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicePackagesForm;
