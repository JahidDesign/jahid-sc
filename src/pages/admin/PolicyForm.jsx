import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://jahids-reactfoliopro.onrender.com/policies";

export default function PolicyForm() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result.toString());
    reader.readAsDataURL(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return Swal.fire("Validation Error", "Title is required", "warning");
    if (!imageUrl) return Swal.fire("Validation Error", "Provide image URL or upload a file", "warning");
    if (!description.trim()) return Swal.fire("Validation Error", "Description is required", "warning");

    const payload = { title: title.trim(), imageUrl, description: description.trim(), createdAt: new Date().toISOString() };

    try {
      setLoading(true);
      await axios.post(API_URL, payload, { headers: { "Content-Type": "application/json" } });
      Swal.fire("Success", "Policy created successfully!", "success");

      setTitle("");
      setImageUrl("");
      setFile(null);
      setDescription("");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err?.response?.data?.message || "Failed to create policy", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Policy</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Policy title"
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium">Image URL</span>
              <input
                type="url"
                value={!file ? imageUrl : ""}
                onChange={(e) => { setFile(null); setImageUrl(e.target.value); }}
                placeholder="https://example.com/image.jpg"
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium">Upload Image</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm" />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              placeholder="Write policy description..."
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-60 hover:bg-indigo-700 transition-colors"
            >
              {loading ? "Saving..." : "Create Policy"}
            </button>

            <button
              type="button"
              onClick={() => { setTitle(""); setImageUrl(""); setFile(null); setDescription(""); }}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Image Preview */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-2xl p-4 border border-gray-200">
          {imageUrl ? (
            <img src={imageUrl} alt="preview" className="max-w-full max-h-80 rounded-lg object-contain" />
          ) : (
            <p className="text-gray-400 text-center">Image preview will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
}
