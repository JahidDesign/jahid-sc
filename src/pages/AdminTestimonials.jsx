// File: src/admin/AdminTestimonials.jsx
import React, { useEffect, useState } from "react";
import { Edit2, Trash2, PlusCircle } from "lucide-react";

const API_URL = "http://localhost:3000/testimonials";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    institute: "",
    batch: "",
    message: "",
    image: "",
    website: "",
  });

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : data.testimonials || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setFormData({
        name: "",
        role: "",
        institute: "",
        batch: "",
        message: "",
        image: "",
        website: "",
      });
      setEditingId(null);
      fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  const handleEdit = (t) => {
    setEditingId(t.id);
    setFormData({
      name: t.name,
      role: t.role,
      institute: t.institute,
      batch: t.batch || "",
      message: t.message,
      image: t.image,
      website: t.website,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  if (loading)
    return <p className="text-center mt-12 text-gray-600">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-600">
        Admin - Manage Testimonials
      </h2>

      {/* ---------------- Form ---------------- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role (e.g., Trainer)"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.role}
          onChange={handleChange}
        />
        <input
          type="text"
          name="institute"
          placeholder="Institute / Company"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.institute}
          onChange={handleChange}
        />
        <input
          type="text"
          name="batch"
          placeholder="Batch Number"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.batch}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="text"
          name="website"
          placeholder="Website Link"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.website}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          className="border p-3 rounded-lg col-span-1 md:col-span-2 focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
        >
          <PlusCircle size={18} />
          {editingId ? "Update Testimonial" : "Add Testimonial"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({
                name: "",
                role: "",
                institute: "",
                batch: "",
                message: "",
                image: "",
                website: "",
              });
            }}
            className="col-span-1 md:col-span-2 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </form>

      {/* ---------------- Cards for Mobile ---------------- */}
      <div className="grid grid-cols-1 md:hidden gap-4 mb-8">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={t.image || "https://via.placeholder.com/50"}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <p className="font-semibold text-gray-800">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role} @ {t.institute}</p>
                {t.batch && (
                  <span className="text-xs text-blue-600 font-medium">Batch {t.batch}</span>
                )}
              </div>
            </div>
            <p className="text-gray-700 text-sm mt-2">{t.message}</p>
            {t.website && (
              <a
                href={t.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline"
              >
                Visit Website
              </a>
            )}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(t)}
                className="flex-1 bg-yellow-500 text-white py-2 rounded-lg flex justify-center items-center gap-1"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg flex justify-center items-center gap-1"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- Table for Larger Screens ---------------- */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Institute</th>
              <th className="border px-4 py-2">Batch</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Website</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id} className="text-center">
                <td className="border px-4 py-2">
                  <img
                    src={t.image || "https://via.placeholder.com/50"}
                    alt={t.name}
                    className="w-12 h-12 rounded-full mx-auto object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{t.name}</td>
                <td className="border px-4 py-2">{t.role}</td>
                <td className="border px-4 py-2">{t.institute}</td>
                <td className="border px-4 py-2">{t.batch || "-"}</td>
                <td className="border px-4 py-2 text-sm">{t.message}</td>
                <td className="border px-4 py-2">
                  {t.website ? (
                    <a
                      href={t.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Link
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="p-2 bg-yellow-500 text-white rounded-lg"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-2 bg-red-600 text-white rounded-lg"
                  >
                    <Trash2 size={16} />
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

export default AdminTestimonials;
