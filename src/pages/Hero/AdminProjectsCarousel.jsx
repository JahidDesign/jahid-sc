//ProjectsCarousel
// src/components/AdminProjectsCarousel.jsx
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://jahids-reactfoliopro.onrender.com/ProjectsCarousel";

const AdminProjectsCarousel = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [addingItem, setAddingItem] = useState(false);

  const defaultForm = {
    title: "",
    subtitle: "",
    imageUrl: "",
    buttonText: "",
    buttonLink: "",
    pagePath: "",
  };

  const [formData, setFormData] = useState(defaultForm);

  // fetch
  const fetchItems = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setItems(json.data || []);
    } catch (err) {
      toast.error("Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Item added!");
        setItems((prev) => [...prev, json.data]);
        setFormData(defaultForm);
        setAddingItem(false);
      }
    } catch {
      toast.error("Failed to add item");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${editingItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Item updated!");
        setItems((prev) =>
          prev.map((i) =>
            i._id === editingItem._id ? { ...i, ...formData } : i
          )
        );
        setEditingItem(null);
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      const res = await fetch(`${API_URL}/${_id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        toast.success("Deleted!");
        setItems((prev) => prev.filter((i) => i._id !== _id));
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Hero Carousel Admin</h2>
        <button
          onClick={() => {
            setAddingItem(true);
            setFormData(defaultForm);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl"
        >
          <FaPlus /> Add Item
        </button>
      </div>

      <table className="min-w-full bg-white shadow-lg rounded-xl">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Subtitle</th>
            <th className="py-3 px-4">Button</th>
            <th className="py-3 px-4">Page</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="py-3 px-4">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className="py-3 px-4">{item.title || "-"}</td>
              <td className="py-3 px-4">{item.subtitle || "-"}</td>
              <td className="py-3 px-4">
                {item.buttonText ? (
                  <a
                    href={item.buttonLink}
                    className="text-blue-600 hover:underline"
                  >
                    {item.buttonText}
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="py-3 px-4">{item.pagePath || "-"}</td>
              <td className="py-3 px-4 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-yellow-500"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(addingItem || editingItem) && (
        <Modal
          title={editingItem ? "Edit Item" : "Add Item"}
          onClose={() => {
            setAddingItem(false);
            setEditingItem(null);
          }}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={editingItem ? handleUpdate : handleAdd}
          submitText={editingItem ? "Save" : "Add"}
        />
      )}
    </div>
  );
};

const Modal = ({ title, onClose, formData, handleChange, handleSubmit, submitText }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl w-full max-w-md">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" />
        <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Subtitle" className="w-full border p-2 rounded" />
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full border p-2 rounded" />
        <input type="text" name="buttonText" value={formData.buttonText} onChange={handleChange} placeholder="Button Text" className="w-full border p-2 rounded" />
        <input type="text" name="buttonLink" value={formData.buttonLink} onChange={handleChange} placeholder="Button Link" className="w-full border p-2 rounded" />
        <select name="pagePath" value={formData.pagePath} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Page</option>
          <option value="/about">About</option>
          <option value="/projects">Projects</option>
          <option value="/blog">Blog</option>
          <option value="/contact">Contact</option>
          <option value="/skills">Skills</option>
        </select>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{submitText}</button>
        </div>
      </form>
    </div>
  </div>
);

export default AdminProjectsCarousel;
