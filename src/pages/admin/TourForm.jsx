import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://jahids-reactfoliopro.onrender.com/tours";

export default function TourForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    preview: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.image || !formData.preview) {
      Swal.fire("Error", "Please fill in all fields!", "error");
      return;
    }

    try {
      await axios.post(API_URL, formData);
      Swal.fire("Success", "Tour added successfully!", "success");
      setFormData({ title: "", description: "", image: "", preview: "" });
    } catch (error) {
      console.error("Error adding tour:", error);
      Swal.fire("Error", "Failed to add tour. Try again!", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 flex flex-col gap-5 border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Add New Tour
        </h2>
        <p className="text-center text-gray-500 mb-4">
          Fill in the details to create a new tour package.
        </p>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter tour title"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short description..."
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-3 rounded-lg shadow-md w-full object-cover h-48"
            />
          )}
        </div>

        {/* Preview Link */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Preview Link</label>
          <input
            type="url"
            name="preview"
            value={formData.preview}
            onChange={handleChange}
            placeholder="Enter preview link (e.g. demo or info page)"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
        >
          Submit Tour
        </button>
      </form>
    </div>
  );
}
