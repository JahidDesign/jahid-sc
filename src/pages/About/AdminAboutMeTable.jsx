// File: src/components/AdminTableCRUD.jsx
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaDownload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://jahids-reactfoliopro.onrender.com/aboutme";
const roleOptions = ["Web Developer", "Digital Marketing"];

const AdminTableCRUD = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);

  const defaultForm = {
    name: "",
    email: "",
    bio: "",
    profilePic: "",
    coverPic: "",
    cvLink: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    roles: [],
    isAdmin: false,
  };

  const [formData, setFormData] = useState(defaultForm);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setUsers(json.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "roles") {
      let updatedRoles = [...formData.roles];
      if (checked) updatedRoles.push(value);
      else updatedRoles = updatedRoles.filter((r) => r !== value);
      setFormData({ ...formData, roles: updatedRoles });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  // Create user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("User added successfully!");
        setUsers((prev) => [...prev, json.data]);
        setFormData(defaultForm);
        setAddingUser(false);
      } else {
        toast.error("Failed to add user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add user");
    }
  };

  // Set user to edit
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ ...user, roles: user.roles || [] });
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${editingUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("User updated successfully!");
        setUsers((prev) =>
          prev.map((u) => (u._id === editingUser._id ? { ...u, ...formData } : u))
        );
        setEditingUser(null);
      } else toast.error("Failed to update user");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user");
    }
  };

  // Delete user
  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_URL}/${_id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        toast.success("User deleted successfully!");
        setUsers((prev) => prev.filter((u) => u._id !== _id));
      } else toast.error("Failed to delete user");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <button
          onClick={() => {
            setAddingUser(true);
            setFormData(defaultForm);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          <FaPlus /> Add User
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Profile</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Roles</th>
                <th className="py-3 px-4 text-left">CV</th>
                <th className="py-3 px-4 text-left">Social Links</th>
                <th className="py-3 px-4 text-left">Admin</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    {user.profilePic ? (
                      <img src={user.profilePic} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.roles?.join(", ") || "-"}</td>
                  <td className="py-3 px-4">
                    {user.cvLink ? (
                      <a href={user.cvLink} download={`${user.name}_CV.pdf`} className="flex items-center gap-1 text-blue-600 hover:underline">
                        <FaDownload /> Download CV
                      </a>
                    ) : "-"}
                  </td>
                  <td className="py-3 px-4 space-y-1">
                    {["facebook", "twitter", "linkedin", "instagram"].map(
                      (social) =>
                        user[social] && (
                          <a key={social} href={user[social]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                            {social}
                          </a>
                        )
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">{user.isAdmin ? "✅" : "❌"}</td>
                  <td className="py-3 px-4 text-center flex justify-center gap-2">
                    <button onClick={() => handleEdit(user)} className="text-yellow-500 hover:text-yellow-700"><FaEdit /></button>
                    <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {addingUser && <Modal title="Add User" onClose={() => setAddingUser(false)} formData={formData} handleChange={handleChange} handleSubmit={handleAddUser} submitText="Add" />}
      {editingUser && <Modal title="Edit User" onClose={() => setEditingUser(null)} formData={formData} handleChange={handleChange} handleSubmit={handleUpdate} submitText="Save" />}
    </div>
  );
};

// Modal component
const Modal = ({ title, onClose, formData, handleChange, handleSubmit, submitText }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg overflow-y-auto max-h-[90vh]">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <UserFormFields formData={formData} handleChange={handleChange} />
        <div className="flex justify-end gap-3 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">{submitText}</button>
        </div>
      </form>
    </div>
  </div>
);

// Form fields component
const UserFormFields = ({ formData, handleChange }) => (
  <>
    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-3 rounded-lg" required />
    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border p-3 rounded-lg" required />
    <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="w-full border p-3 rounded-lg" />
    <input type="url" name="profilePic" value={formData.profilePic} onChange={handleChange} placeholder="Profile picture URL" className="w-full border p-3 rounded-lg" />
    <input type="url" name="coverPic" value={formData.coverPic} onChange={handleChange} placeholder="Cover picture URL" className="w-full border p-3 rounded-lg" />
    <input type="url" name="cvLink" value={formData.cvLink} onChange={handleChange} placeholder="CV link" className="w-full border p-3 rounded-lg" />

    <div className="flex flex-col gap-2">
      <span className="font-semibold">Roles / Interests</span>
      {roleOptions.map((role) => (
        <label key={role} className="flex items-center space-x-2 border p-2 rounded-lg cursor-pointer hover:bg-blue-50">
          <input type="checkbox" name="roles" value={role} checked={formData.roles.includes(role)} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
          <span>{role}</span>
        </label>
      ))}
    </div>

    <div className="flex items-center space-x-3 mt-2">
      <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded" />
      <label>Admin</label>
    </div>

    <input type="url" name="facebook" value={formData.facebook} onChange={handleChange} placeholder="Facebook URL" className="w-full border p-3 rounded-lg" />
    <input type="url" name="twitter" value={formData.twitter} onChange={handleChange} placeholder="Twitter URL" className="w-full border p-3 rounded-lg" />
    <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="w-full border p-3 rounded-lg" />
    <input type="url" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Instagram URL" className="w-full border p-3 rounded-lg" />
  </>
);

export default AdminTableCRUD;
