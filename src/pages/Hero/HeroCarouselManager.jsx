// File: src/components/AdminHeroManagement.jsx
import React, { useEffect, useState } from "react";
import { Trash2, Edit2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:3000/PortfolioCarousel";

const AdminHeroManagement = () => {
  const [slides, setSlides] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    page: "",
    headline: "",
    subheadline: "",
    background: "",
    ctaPrimary: "",
    ctaSecondary: "",
    stats: [],
  });
  const [success, setSuccess] = useState(false);

  // Fetch slides safely
  const fetchSlides = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch slides");
      const data = await res.json();
      setSlides(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch slides error:", err);
      setSlides([]);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // Handle input change
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Stats handlers
  const addStat = () => {
    setFormData({ ...formData, stats: [...formData.stats, { label: "", value: "" }] });
  };
  const updateStat = (index, field, value) => {
    const updatedStats = [...formData.stats];
    updatedStats[index][field] = value;
    setFormData({ ...formData, stats: updatedStats });
  };

  // Add new slide
  const handleAdd = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newSlide = await res.json();
      setSlides([...slides, newSlide]);
      resetForm();
      showSuccess();
    } catch (err) {
      console.error("Add slide error:", err);
    }
  };

  // Start editing
  const startEdit = (index) => {
    setEditingIndex(index);
    setFormData(slides[index]);
  };

  // Save edited slide
  const handleEdit = async () => {
    try {
      const slideId = formData.id;
      const res = await fetch(`${API_URL}/${slideId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const updatedSlide = await res.json();
      const updatedSlides = [...slides];
      updatedSlides[editingIndex] = updatedSlide;
      setSlides(updatedSlides);
      resetForm();
      setEditingIndex(null);
      showSuccess();
    } catch (err) {
      console.error("Edit slide error:", err);
    }
  };

  // Delete slide
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setSlides(slides.filter((slide) => slide.id !== id));
      showSuccess();
    } catch (err) {
      console.error("Delete slide error:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      page: "",
      headline: "",
      subheadline: "",
      background: "",
      ctaPrimary: "",
      ctaSecondary: "",
      stats: [],
    });
  };

  const showSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Admin Hero Management (CRUD)</h2>

      {/* Slide Form */}
      <div className="bg-gray-800 p-6 rounded-xl mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editingIndex !== null ? "Edit Slide" : "Add New Slide"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Page (e.g. /skills)"
            value={formData.page}
            onChange={(e) => handleChange("page", e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Headline"
            value={formData.headline}
            onChange={(e) => handleChange("headline", e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Subheadline"
            value={formData.subheadline}
            onChange={(e) => handleChange("subheadline", e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Background URL"
            value={formData.background}
            onChange={(e) => handleChange("background", e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Primary CTA"
            value={formData.ctaPrimary}
            onChange={(e) => handleChange("ctaPrimary", e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Secondary CTA"
            value={formData.ctaSecondary}
            onChange={(e) => handleChange("ctaSecondary", e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white"
          />
        </div>

        {/* Stats */}
        <div className="mt-4">
          <button
            type="button"
            onClick={addStat}
            className="px-4 py-2 bg-primary text-black rounded-lg mb-2"
          >
            ➕ Add Stat
          </button>
          {formData.stats.map((stat, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Label"
                value={stat.label}
                onChange={(e) => updateStat(idx, "label", e.target.value)}
                className="p-2 rounded-lg bg-gray-700 text-white flex-1"
              />
              <input
                type="text"
                placeholder="Value"
                value={stat.value}
                onChange={(e) => updateStat(idx, "value", e.target.value)}
                className="p-2 rounded-lg bg-gray-700 text-white flex-1"
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          {editingIndex !== null ? (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-green-600 rounded-lg flex items-center gap-2"
            >
              <CheckCircle /> Save Changes
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-primary rounded-lg flex items-center gap-2"
            >
              <CheckCircle /> Add Slide
            </button>
          )}
        </div>

        {success && (
          <div className="mt-4 p-3 bg-green-500/20 text-green-300 rounded-lg">
            ✅ Operation successful!
          </div>
        )}
      </div>

      {/* Slides Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-2">Page</th>
              <th className="border border-gray-700 px-4 py-2">Headline</th>
              <th className="border border-gray-700 px-4 py-2">Subheadline</th>
              <th className="border border-gray-700 px-4 py-2">CTAs</th>
              <th className="border border-gray-700 px-4 py-2">Stats</th>
              <th className="border border-gray-700 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(slides) &&
              slides.map((slide, idx) => (
                <tr key={slide.id} className="bg-gray-800 hover:bg-gray-700">
                  <td className="border border-gray-700 px-4 py-2">{slide.page}</td>
                  <td className="border border-gray-700 px-4 py-2">{slide.headline}</td>
                  <td className="border border-gray-700 px-4 py-2">{slide.subheadline}</td>
                  <td className="border border-gray-700 px-4 py-2">
                    {slide.ctaPrimary} / {slide.ctaSecondary}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {slide.stats.map((stat, i) => (
                      <div key={i}>
                        {stat.label}: {stat.value}
                      </div>
                    ))}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 flex gap-2">
                    <button
                      onClick={() => startEdit(idx)}
                      className="p-1 bg-yellow-500 rounded-full"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id)}
                      className="p-1 bg-red-500 rounded-full"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHeroManagement;
