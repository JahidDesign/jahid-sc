// File: src/components/PortfolioSlideForm.jsx
import React, { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
  { name: "Skills", path: "/skills" },
];

const defaultForm = {
  page: "Home",
  name: "",
  title: "",
  description: "",
  tag: "",
  image: "",
  caption: "",
};

const API_URL = "http://localhost:3000/PortfolioCarousel";

const PortfolioSlideForm = ({ onSubmit }) => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.title || !form.description || !form.image) {
      toast.error("⚠️ Name, Title, Description, and Image are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Portfolio Slide Saved!");
        setForm(defaultForm); // reset form
        if (onSubmit) onSubmit(data); // send back saved data
      } else {
        toast.error(data.message || "❌ Failed to save portfolio slide.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("❌ Error submitting form. Check server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        Add Portfolio Slide
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Page Selector */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300">Select Page</label>
          <select
            name="page"
            value={form.page}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            {navLinks.map((link) => (
              <option key={link.path} value={link.name}>
                {link.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="w-full border p-2 rounded-md"
          required
        />

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Slide Title"
          className="w-full border p-2 rounded-md"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Brief description..."
          className="w-full border p-2 rounded-md"
          required
        />

        <input
          type="text"
          name="tag"
          value={form.tag}
          onChange={handleChange}
          placeholder="Tag / Category"
          className="w-full border p-2 rounded-md"
        />

        <input
          type="url"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://yourproject.com/image.png"
          className="w-full border p-2 rounded-md"
          required
        />

        <input
          type="text"
          name="caption"
          value={form.caption}
          onChange={handleChange}
          placeholder="Short image caption"
          className="w-full border p-2 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <Upload className="mr-2 h-5 w-5" />}
          {loading ? "Saving..." : "Save Portfolio Slide"}
        </button>
      </form>
    </div>
  );
};

export default PortfolioSlideForm;
