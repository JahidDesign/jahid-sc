// File: src/components/SkillsForm.jsx
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:3000/skills";

const SkillsForm = ({ onSuccess }) => {
  const [newSkill, setNewSkill] = useState({
    name: "",
    description: "",
    tag: "",
    experience: "",
    level: "",
    image: "",
    color: "#4f46e5",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setNewSkill({ ...newSkill, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, level } = newSkill;
    if (!name || !level) return;

    setIsSubmitting(true);
    setStatus("loading");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill),
      });

      if (!res.ok) throw new Error("Failed to submit skill");

      const data = await res.json();
      setStatus("success");

      setNewSkill({
        name: "",
        description: "",
        tag: "",
        experience: "",
        level: "",
        image: "",
        color: "#4f46e5",
      });

      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto my-12 p-8 rounded-3xl backdrop-blur-sm bg-white/30 dark:bg-gray-900/40 shadow-2xl border border-white/20 dark:border-gray-700/40"
    >
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-6">
        Add New Skill
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-300 mb-8">
        Fill in the details and give your skill a unique color
      </p>

      {status && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-sm font-medium mb-4 text-center ${
            status === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {status === "success" ? "✅ Skill submitted!" : "❌ Submission failed!"}
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { name: "name", label: "Skill Name", type: "text", required: true },
          { name: "level", label: "Level %", type: "number", required: true, min: 0, max: 100 },
          { name: "description", label: "Short Description", type: "text" },
          { name: "tag", label: "Tag / Category", type: "text" },
          { name: "experience", label: "Experience Years", type: "number", min: 0 },
          { name: "image", label: "Image URL (optional)", type: "text", smColSpan: true },
        ].map((field, i) => (
          <div
            key={i}
            className={`relative ${field.smColSpan ? "sm:col-span-2" : ""} group`}
          >
            <input
              type={field.type}
              name={field.name}
              value={newSkill[field.name]}
              onChange={handleChange}
              placeholder=" "
              required={field.required || false}
              min={field.min}
              max={field.max}
              className="peer w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-transparent transition"
            />
            <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400 peer-focus:text-sm">
              {field.label}
            </label>
          </div>
        ))}

        {/* Color Picker */}
        <div className="flex items-center gap-4 sm:col-span-2">
          <label className="text-gray-600 dark:text-gray-300 font-medium">
            Pick Skill Color:
          </label>
          <input
            type="color"
            name="color"
            value={newSkill.color}
            onChange={handleChange}
            className="w-12 h-12 border rounded-lg cursor-pointer p-0"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="sm:col-span-2 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transform transition-all hover:scale-105 disabled:opacity-50"
        >
          <PlusCircle className="w-5 h-5" /> {isSubmitting ? "Submitting..." : "Add Skill"}
        </button>
      </form>

      {/* Live Preview */}
      {newSkill.name && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-10 p-6 rounded-2xl backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/30 shadow-lg flex items-center gap-4"
        >
          {/* Skill Image */}
          {newSkill.image && (
            <img
              src={newSkill.image}
              alt={newSkill.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/30 dark:border-gray-700/40"
            />
          )}

          {/* Skill Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold" style={{ color: newSkill.color }}>
                {newSkill.name}
              </h3>
              {newSkill.tag && (
                <span className="text-xs font-semibold bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {newSkill.tag}
                </span>
              )}
            </div>
            {newSkill.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {newSkill.description}
              </p>
            )}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-4 rounded-full"
                style={{
                  width: `${newSkill.level || 0}%`,
                  backgroundColor: newSkill.color,
                  transition: "width 0.3s",
                }}
              ></div>
            </div>
            {newSkill.experience && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {newSkill.experience} {newSkill.experience === "1" ? "year" : "years"} experience
              </p>
            )}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default SkillsForm;
