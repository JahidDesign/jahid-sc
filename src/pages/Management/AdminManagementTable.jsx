import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit, Save } from "lucide-react";

const API_URL = "http://localhost:3000/management";

export default function AdminManagementTable() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    programName: "",
    instituteName: "",
    year: "",
    imageUrl: "",
    description: "",
    skills: [],
  });
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setPrograms(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch programs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPrograms((prev) => prev.filter((p) => p._id !== id && p.id !== id));
    } catch (err) {
      console.error(err);
      setError("Delete failed");
    }
  };

  const startEdit = (p) => {
    setEditingId(p._id || p.id);
    setForm({
      programName: p.programName,
      instituteName: p.instituteName,
      year: p.year,
      imageUrl: p.imageUrl,
      description: p.description,
      skills: p.skills || [],
    });
  };

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const value = skillInput.trim();
    if (!value || form.skills.includes(value)) return;
    setForm((s) => ({ ...s, skills: [...s.skills, value] }));
    setSkillInput("");
  };

  const handleRemoveSkill = (skill) => {
    setForm((s) => ({ ...s, skills: s.skills.filter((x) => x !== skill) }));
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, form);
      setPrograms((prev) => prev.map((p) => (p._id === id || p.id === id ? { ...p, ...form } : p)));
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setError("Update failed");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Manage Programs</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Program</th>
              <th className="px-4 py-2 border">Institute</th>
              <th className="px-4 py-2 border">Year</th>
              <th className="px-4 py-2 border">Skills</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.length > 0 ? (
              programs.map((p) => (
                <tr key={p._id || p.id} className="hover:bg-gray-50">
                  <td className="border px-2 py-2 text-center">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.programName} className="w-16 h-12 object-cover rounded" />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  {editingId === (p._id || p.id) ? (
                    <>
                      <td className="border px-2 py-2">
                        <input name="programName" value={form.programName} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                      </td>
                      <td className="border px-2 py-2">
                        <input name="instituteName" value={form.instituteName} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                      </td>
                      <td className="border px-2 py-2">
                        <input name="year" value={form.year} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                      </td>
                      <td className="border px-2 py-2">
                        <div className="flex flex-wrap gap-1">
                          {form.skills.map((s) => (
                            <span key={s} className="px-2 py-1 bg-gray-100 rounded-full text-xs flex items-center gap-1">
                              {s} <button onClick={() => handleRemoveSkill(s)} className="text-xs">×</button>
                            </span>
                          ))}
                        </div>
                        <div className="flex mt-1">
                          <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} className="flex-1 border rounded px-2 py-1" placeholder="Add skill" />
                          <button onClick={handleAddSkill} className="ml-1 bg-blue-600 text-white px-2 rounded">Add</button>
                        </div>
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <button onClick={() => handleSave(p._id || p.id)} className="text-green-600 hover:text-green-800 mr-2">
                          <Save size={18} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="text-gray-600 hover:text-gray-800">
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border px-2 py-2">{p.programName}</td>
                      <td className="border px-2 py-2">{p.instituteName}</td>
                      <td className="border px-2 py-2">{p.year}</td>
                      <td className="border px-2 py-2">
                        <div className="flex flex-wrap gap-1">
                          {p.skills && p.skills.length > 0 ? (
                            p.skills.map((s, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <button onClick={() => startEdit(p)} className="text-blue-600 hover:text-blue-800 mr-2">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(p._id || p.id)} className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No programs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}