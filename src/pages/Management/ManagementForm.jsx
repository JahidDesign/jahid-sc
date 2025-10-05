// src/components/ManagementForm.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000/management";

export default function ManagementForm() {
  const [form, setForm] = useState({
    programName: "",
    instituteName: "",
    year: "",
    imageUrl: "",
    description: "",
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const value = skillInput.trim();
    if (!value) return;
    if (skills.includes(value)) {
      Swal.fire("Duplicate Skill", "Skill already added", "warning");
      return;
    }
    setSkills((s) => [...s, value]);
    setSkillInput("");
  };

  const handleRemoveSkill = (skill) => {
    setSkills((s) => s.filter((x) => x !== skill));
  };

  const validate = () => {
    if (!form.programName.trim()) return "Program name is required";
    if (!form.instituteName.trim()) return "Institute name is required";
    if (!form.year.trim()) return "Year is required";
    // Allow single year (2020) or range (2020-2023)
    if (!/^\d{4}(-\d{4})?$/.test(form.year.trim()))
      return "Year must be YYYY or YYYY-YYYY";
    if (!form.description.trim()) return "Description is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      Swal.fire("Validation Error", v, "error");
      return;
    }

    const payload = {
      programName: form.programName.trim(),
      instituteName: form.instituteName.trim(),
      year: form.year.trim(),
      imageUrl: form.imageUrl.trim(),
      description: form.description.trim(),
      skills,
    };

    try {
      setLoading(true);
      const res = await axios.post(API_URL, payload);
      if (res.status === 201 || res.status === 200) {
        Swal.fire("Success", "Program saved successfully", "success");
        setForm({
          programName: "",
          instituteName: "",
          year: "",
          imageUrl: "",
          description: "",
        });
        setSkills([]);
      } else {
        Swal.fire("Error", "Unexpected server response", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to save. Check backend.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Management Program</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Program name */}
        <div>
          <label className="block text-sm font-medium mb-1">Program name</label>
          <input
            name="programName"
            value={form.programName}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
            placeholder="e.g. MBA in Finance"
          />
        </div>

        {/* Institute */}
        <div>
          <label className="block text-sm font-medium mb-1">Institute name</label>
          <input
            name="instituteName"
            value={form.instituteName}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
            placeholder="e.g. ABC University"
          />
        </div>

        {/* Year & Image URL */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              placeholder="e.g. 2025 or 2022-2023"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Image Preview */}
        {form.imageUrl && (
          <div className="mt-2">
            <p className="text-sm mb-1">Preview</p>
            <div className="w-48 h-32 rounded overflow-hidden border">
              <img
                src={form.imageUrl}
                alt="preview"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
            placeholder="Short description about the program..."
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium mb-1">Skills / Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddSkill(e);
              }}
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              placeholder="Type a skill and press Enter or click Add"
            />
            <button
              onClick={handleAddSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {s}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(s)}
                  className="ml-1 text-xs px-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-green-600 text-white font-medium disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Program"}
          </button>
        </div>
      </form>
    </div>
  );
}
