// src/components/AdminServicesTable.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";

const AdminServicesTable = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editService, setEditService] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    title: "",
    description: "",
    imageUrl: "",
  });

  // Fetch all services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/services");
      if (response.data.success) setServices(response.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Delete a service
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`http://localhost:3000/services/${id}`);
        setServices(services.filter((s) => s._id !== id));
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  // Open edit modal/form
  const handleEdit = (service) => {
    setEditService(service._id);
    setFormData({
      category: service.category,
      name: service.name,
      title: service.title,
      description: service.description,
      imageUrl: service.imageUrl,
    });
  };

  // Update service
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/services/${editService}`,
        formData
      );
      if (response.data.success) {
        fetchServices();
        setEditService(null);
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Services Table</h2>

      {loading ? (
        <p className="text-center">Loading services...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{service.category}</td>
                  <td className="p-3 border">{service.name}</td>
                  <td className="p-3 border">{service.title}</td>
                  <td className="p-3 border">{service.description}</td>
                  <td className="p-3 border">
                    {service.imageUrl && (
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="p-3 border flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Form Modal */}
      {editService && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
            <h3 className="text-xl font-bold mb-4">Edit Service</h3>
            <form className="flex flex-col gap-3" onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="border p-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border p-2 rounded resize-none"
                rows={3}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="border p-2 rounded"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditService(null)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServicesTable;
