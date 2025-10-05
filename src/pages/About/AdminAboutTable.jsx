// File: src/pages/AboutAdmin.jsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const initialFormState = {
  name: "",
  intro: "",
  journey: "",
  skills: "",
  achievements: "",
  hobbies: "",
  whyWorkWithMe: "",
  cta: "",
  imageUrl: "",
};

const ITEMS_PER_PAGE = 5;

const AdminAboutTable = () => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Fetch data
  const fetchAboutData = () => {
    setLoading(true);
    fetch("https://jahids-reactfoliopro.onrender.com/about")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAboutData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `https://jahids-reactfoliopro.onrender.com/about/${editingId}`
      : "https://jahids-reactfoliopro.onrender.com/about";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: editingId ? "Updated!" : "Added!",
          text: `About entry ${editingId ? "updated" : "added"} successfully`,
        });
        setFormData(initialFormState);
        setEditingId(null);
        fetchAboutData();
      } else {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "Failed" });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" });
    }
  };

  // Handle edit
  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      intro: item.intro,
      journey: item.journey,
      skills: item.skills,
      achievements: item.achievements,
      hobbies: item.hobbies,
      whyWorkWithMe: item.whyWorkWithMe,
      cta: item.cta,
      imageUrl: item.imageUrl,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete this entry!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://jahids-reactfoliopro.onrender.com/about/${id}`, { method: "DELETE" });
          const data = await res.json();
          if (data.success) {
            Swal.fire("Deleted!", "Entry has been deleted.", "success");
            fetchAboutData();
          } else {
            Swal.fire("Error!", data.message || "Failed to delete", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Something went wrong", "error");
        }
      }
    });
  };

  // Filtered & paginated data
  const filteredData = aboutData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.intro.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Loading About Admin...</p>
      </div>
    );

  return (
    <div className="max-w-full px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">About Admin CRUD</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-5xl mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4">{editingId ? "Edit About" : "Add About"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(initialFormState).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="mb-1 font-medium">{key}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            className="mt-4 ml-4 px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={() => {
              setEditingId(null);
              setFormData(initialFormState);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Search */}
      <div className="max-w-5xl mx-auto mb-4">
        <input
          type="text"
          placeholder="Search by name or intro..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-5xl mx-auto">
        <table className="min-w-full border border-gray-300 text-left">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Intro</th>
              <th className="px-4 py-2 border">Journey</th>
              <th className="px-4 py-2 border">Skills</th>
              <th className="px-4 py-2 border">Achievements</th>
              <th className="px-4 py-2 border">Hobbies</th>
              <th className="px-4 py-2 border">Why Work With Me</th>
              <th className="px-4 py-2 border">CTA</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedData.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
                </td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border whitespace-pre-line">{item.intro}</td>
                <td className="px-4 py-2 border whitespace-pre-line">{item.journey}</td>
                <td className="px-4 py-2 border whitespace-pre-line">{item.skills}</td>
                <td className="px-4 py-2 border whitespace-pre-line">{item.achievements}</td>
                <td className="px-4 py-2 border whitespace-pre-line">{item.hobbies}</td>
                <td className="px-4 py-2 border whitespace-pre-line">{item.whyWorkWithMe}</td>
                <td className="px-4 py-2 border">{item.cta}</td>
                <td className="px-4 py-2 border flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminAboutTable;
