//ContactCarousel
// src/components/ContactCarousel.jsx
// File: src/components/ContactCarouselForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000/ContactCarousel";

const ContactCarouselForm = ({ selectedItem, onSuccess = () => {}, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    buttonText: "",
    buttonLink: "",
    pagePath: "",
  });

  // If editing, load selected item
  useEffect(() => {
    if (selectedItem) {
      setFormData({
        title: selectedItem.title || "",
        subtitle: selectedItem.subtitle || "",
        imageUrl: selectedItem.imageUrl || "",
        buttonText: selectedItem.buttonText || "",
        buttonLink: selectedItem.buttonLink || "",
        pagePath: selectedItem.pagePath || "",
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedItem) {
        // support both id and _id
        const itemId = selectedItem._id || selectedItem.id;
        if (!itemId) {
          throw new Error("No ID found for updating item!");
        }

        await axios.put(`${API_URL}/${itemId}`, formData);

        Swal.fire({
          icon: "success",
          title: "✅ Updated!",
          text: "Carousel item updated successfully 🎉",
          confirmButtonColor: "#2563eb",
        });
      } else {
        const res = await axios.post(API_URL, formData);

        Swal.fire({
          icon: "success",
          title: "✅ Added!",
          text: "New carousel item added successfully 🎊",
          confirmButtonColor: "#2563eb",
        });

        // Reset after adding new item
        if (res.data) {
          setFormData({
            title: "",
            subtitle: "",
            imageUrl: "",
            buttonText: "",
            buttonLink: "",
            pagePath: "",
          });
        }
      }

      // Safely call onSuccess if provided
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
      console.error("❌ Error submitting carousel item:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.error ||
          error.message ||
          "Something went wrong!",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        {selectedItem ? "✏️ Edit Carousel Item" : "➕ Add New Carousel Item"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter main heading"
            className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Enter subtitle"
            className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image URL + Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Paste image link here"
            className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="mt-3 w-full h-40 object-cover rounded-lg shadow"
            />
          )}
        </div>

        {/* Button Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Button Text</label>
          <input
            type="text"
            name="buttonText"
            value={formData.buttonText}
            onChange={handleChange}
            placeholder="e.g., Learn More"
            className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Button Link</label>
          <input
            type="text"
            name="buttonLink"
            value={formData.buttonLink}
            onChange={handleChange}
            placeholder="e.g., /about"
            className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Page Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Page Path</label>
          <select
            name="pagePath"
            value={formData.pagePath}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Page</option>
            <option value="/about">About</option>
            <option value="/projects">Projects</option>
            <option value="/blog">Blog</option>
            <option value="/contact">Contact</option>
            <option value="/skills">Skills</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow"
          >
            {selectedItem ? "Update Item" : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactCarouselForm;
