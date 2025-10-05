// src/components/SkillsGalleryForm.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000/skillsIns";

const SkillsGalleryForm = () => {
  const [skills, setSkills] = useState([{ name: "", imageUrl: "" }]);

  // Handle adding more skill fields dynamically
  const handleAddSkill = () => {
    setSkills([...skills, { name: "", imageUrl: "" }]);
  };

  // Handle removing a skill field
  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  // Update name or image field
  const handleChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  // Submit all skills to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validSkills = skills.filter((s) => s.name && s.imageUrl);
    if (validSkills.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Valid Skills",
        text: "Please add at least one skill with both name and image URL!",
      });
      return;
    }

    try {
      const response = await axios.post(API_URL, validSkills);

      Swal.fire({
        icon: "success",
        title: "Gallery Uploaded!",
        text: `${response.data.message || "Skills added successfully!"}`,
        showConfirmButton: false,
        timer: 2000,
      });

      setSkills([{ name: "", imageUrl: "" }]);
    } catch (error) {
      console.error("Error uploading skills:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Skills Gallery Upload
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Skill Name */}
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Skill Name
                </label>
                <input
                  type="text"
                  placeholder="Enter skill name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={skill.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>

              {/* Image URL */}
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="Paste image URL"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={skill.imageUrl}
                  onChange={(e) =>
                    handleChange(index, "imageUrl", e.target.value)
                  }
                />
              </div>

              {/* Remove Button */}
              {skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Image Preview */}
            {skill.imageUrl && (
              <div className="flex justify-center mt-3">
                <img
                  src={skill.imageUrl}
                  alt="Skill"
                  className="w-24 h-24 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
        ))}

        {/* Add New Skill Button */}
        <button
          type="button"
          onClick={handleAddSkill}
          className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          + Add Another Skill
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
        >
          Upload Gallery
        </button>
      </form>
    </div>
  );
};

export default SkillsGalleryForm;
