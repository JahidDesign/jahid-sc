// src/components/ServiceForm.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    category: "Web Developer",
    name: "",
    title: "",
    description: "",
    imageUrl: "",
    features: [],
  });

  const [featureInput, setFeatureInput] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = ["Web Developer", "Digital Marketing", "Printable Design"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFeature = () => {
    if (featureInput.trim() !== "") {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updatedFeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/services", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Service Added!",
          text: "Your service has been added successfully.",
          timer: 2500,
          showConfirmButton: false,
        });

        setFormData({
          category: "Web Developer",
          name: "",
          title: "",
          description: "",
          imageUrl: "",
          features: [],
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to add service. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while submitting. Please check your network or try again.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Service
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="mt-2 w-full h-40 object-cover rounded-lg border border-gray-300"
            />
          )}
        </div>

        {/* Features */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Features</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              placeholder="Enter a feature"
              className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Add
            </button>
          </div>
          <ul className="mt-2 list-disc list-inside">
            {formData.features.map((feature, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{feature}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="text-red-500 font-bold ml-2"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          {loading ? "Submitting..." : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
