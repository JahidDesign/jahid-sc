// File: src/pages/AdminCertificates.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Edit2, Trash2, PlusCircle, Save, X } from "lucide-react";

const API_URL = "http://localhost:3000/certificates";

const AdminCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    link: "",
    image: "",
  });

  // Fetch all
  const fetchCertificates = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.certificates || [];
      setCertificates(data);
    } catch (err) {
      console.error("Error fetching certificates:", err);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({
        title: "",
        date: "",
        description: "",
        link: "",
        image: "",
      });
      fetchCertificates();
    } catch (err) {
      console.error("Error adding certificate:", err);
    }
  };

  const handleEdit = (cert) => {
    setEditingId(cert.id);
    setFormData(cert);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${editingId}`, formData);
      setEditingId(null);
      setFormData({
        title: "",
        date: "",
        description: "",
        link: "",
        image: "",
      });
      fetchCertificates();
    } catch (err) {
      console.error("Error updating certificate:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCertificates();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <section className="w-full min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
          Admin Certificates CRUD
        </h2>

        {/* Form */}
        <form
          onSubmit={editingId ? handleUpdate : handleAdd}
          className="bg-white shadow-md rounded-lg p-6 mb-10 grid gap-4 md:grid-cols-2"
        >
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            name="date"
            placeholder="Date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            name="link"
            placeholder="Website Link"
            value={formData.link}
            onChange={handleChange}
            className="border p-2 rounded w-full col-span-2"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border p-2 rounded w-full col-span-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded w-full col-span-2"
            rows="3"
          />
          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            {editingId ? <Save size={18} /> : <PlusCircle size={18} />}
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  title: "",
                  date: "",
                  description: "",
                  link: "",
                  image: "",
                });
              }}
              className="col-span-2 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 flex items-center justify-center gap-2"
            >
              <X size={18} /> Cancel
            </button>
          )}
        </form>

        {/* Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <motion.table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Date</th>
                <th className="p-3">Image</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{c.title}</td>
                  <td className="p-3">{c.date}</td>
                  <td className="p-3">
                    <img
                      src={c.image || "https://via.placeholder.com/80"}
                      alt={c.title}
                      className="w-20 rounded"
                    />
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex items-center gap-1"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        )}
      </div>
    </section>
  );
};

export default AdminCertificates;
