// src/components/EducationForm.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://jahids-reactfoliopro.onrender.com/education";

const EducationForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    year: "",
    description: "",
    tag: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);

      Swal.fire({
        title: "Success 🎉",
        text: "Education entry has been added successfully!",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      setFormData({
        title: "",
        image: "",
        year: "",
        description: "",
        tag: "",
        link: "",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Education</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          rows="4"
        />
        <input
          type="text"
          name="tag"
          placeholder="Tag (e.g. Computer Science)"
          value={formData.tag}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />
        <input
          type="text"
          name="link"
          placeholder="External Link"
          value={formData.link}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EducationForm;
