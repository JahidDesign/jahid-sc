// File: src/components/AdminSkills.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SkillsForm from "./SkillsForm";
import { Edit2, Trash2 } from "lucide-react";

const API_URL = "https://jahids-reactfoliopro.onrender.com/skills";

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);

  // Fetch all skills
  const fetchSkills = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch skills");

      const data = await res.json();
      console.log("Fetched skills:", data);

      // Normalize to always have "_id"
      const formatted = (Array.isArray(data) ? data : data.skills || []).map(
        (s) => ({
          ...s,
          _id: s._id || s.id, // ensure compatibility
        })
      );

      setSkills(formatted);
    } catch (err) {
      console.error(err);
      setSkills([]);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Add or update skill
  const handleSuccess = async (skillData) => {
    try {
      let res;
      if (editingSkill) {
        res = await fetch(`${API_URL}/${editingSkill._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(skillData),
        });
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(skillData),
        });
      }

      if (!res.ok) throw new Error("Failed to save skill");
      const updatedSkill = await res.json();

      // Normalize updated skill
      const normalized = { ...updatedSkill, _id: updatedSkill._id || updatedSkill.id };

      if (editingSkill) {
        setSkills(skills.map((s) => (s._id === normalized._id ? normalized : s)));
      } else {
        setSkills([...skills, normalized]);
      }
      setEditingSkill(null);
    } catch (err) {
      console.error(err);
      alert("Error saving skill");
    }
  };

  // Edit skill
  const handleEdit = (skill) => {
    setEditingSkill(skill);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete skill
  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      const res = await fetch(`${API_URL}/${_id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete skill");
      setSkills(skills.filter((skill) => skill._id !== _id));
    } catch (err) {
      console.error(err);
      alert("Error deleting skill");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Admin Skills Management
        </h2>

        {/* Form */}
        <SkillsForm
          onSuccess={handleSuccess}
          initialData={editingSkill}
          key={editingSkill ? editingSkill._id : "new"}
        />

        {/* Table */}
        <div className="overflow-x-auto mt-8 bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">#</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tag</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Exp (yrs)</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Level</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(skills) && skills.length > 0 ? (
                skills.map((skill, index) => (
                  <motion.tr
                    key={skill._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 flex items-center gap-2">
                      {skill.image && (
                        <img
                          src={skill.image}
                          alt={skill.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      {skill.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">{skill.tag}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{skill.experience || 0}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                          className="h-3 rounded-full"
                          style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 flex gap-2">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="flex items-center gap-1 bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 transition"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                    No skills added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminSkills;
