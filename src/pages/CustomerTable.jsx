// File: CustomerTable.jsx
import { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiTrash2, FiEdit, FiChevronDown, FiPlus } from "react-icons/fi";

// =================== Config ===================
const API_BASE_URL = "http://localhost:3000"; // Your backend URL
const ROLES = ["admin", "customer"];
const STATUSES = ["active", "inactive"];

const ROLE_LABELS = { admin: "Admin", customer: "Customer" };
const STATUS_STYLES = { active: "bg-emerald-100 text-emerald-700", inactive: "bg-rose-100 text-rose-700" };
const ROLE_STYLES = { admin: "bg-purple-100 text-purple-700", customer: "bg-gray-100 text-gray-700" };

// =================== Component ===================
const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "customer",
    status: "active",
    photoURL: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ---------------- API Helper ----------------
  const makeApiCall = async (endpoint, method, body = null) => {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const text = await res.text();
      return text ? JSON.parse(text) : {};
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // ---------------- Fetch Customers ----------------
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await makeApiCall("/customers", "GET");
      const list = Array.isArray(data.users) ? data.users : [];
      setCustomers(list);
      setFilteredCustomers(list);
    } catch (err) {
      setCustomers([]);
      setFilteredCustomers([]);
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ---------------- Filter & Search ----------------
  useEffect(() => {
    let result = [...customers];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          ROLE_LABELS[c.role]?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") result = result.filter((c) => c.status === statusFilter);
    if (roleFilter !== "all") result = result.filter((c) => c.role === roleFilter);
    setFilteredCustomers(result);
    setCurrentPage(1); // Reset page after filter
  }, [searchTerm, statusFilter, roleFilter, customers]);

  // ---------------- Add/Edit Handlers ----------------
  const handleOpenModal = (customer = null) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({
        name: customer.name || "",
        email: customer.email || "",
        role: customer.role || "customer",
        status: customer.status || "active",
        photoURL: customer.photo || "",
      });
    } else {
      setEditingCustomer(null);
      setFormData({
        name: "",
        email: "",
        role: "customer",
        status: "active",
        photoURL: "",
      });
    }
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingCustomer) {
        await makeApiCall(`/customers/${editingCustomer.id}`, "PUT", {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          photo: formData.photoURL,
        });
        toast.success("Customer updated!");
      } else {
        await makeApiCall("/customers", "POST", {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          photo: formData.photoURL,
        });
        toast.success("Customer added!");
      }
      setModalOpen(false);
      fetchCustomers();
    } catch (err) {
      toast.error("Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await makeApiCall(`/customers/${id}`, "DELETE");
      toast.success("Customer deleted!");
      fetchCustomers();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // =================== Render ===================
  return (
    <div className="w-full h-full bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="w-full border-b bg-white shadow-sm p-4 sm:p-6 flex justify-between items-center">
        <h2 className="text-lg sm:text-xl font-semibold">👥 Customers</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
        >
          <FiPlus /> Add Customer
        </button>
      </div>

      {/* Search & Filters */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-4 sm:p-6">
        <input
          type="text"
          placeholder="🔍 Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full sm:w-1/3"
        />
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="px-4 py-2 border rounded-lg bg-gray-100 flex items-center gap-2 w-full sm:w-auto"
        >
          {filtersOpen ? "Hide Filters" : "Show Filters"} <FiChevronDown />
        </button>
      </div>

      {/* Customers List */}
      <div className="w-full p-2 sm:p-6">
        {loading ? (
          <div className="flex justify-center py-10 text-lg font-medium">Loading...</div>
        ) : paginatedCustomers.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg">No customers found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {paginatedCustomers.map((c) => (
              <div
                key={c.id}
                className="bg-white shadow-md hover:shadow-lg rounded-lg p-4 border flex flex-col justify-between"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={c.photo || "https://via.placeholder.com/50"}
                    alt={c.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-bold text-base sm:text-lg">{c.name}</h3>
                    <p className="text-gray-500 text-sm">{c.email}</p>
                    <span className={`px-2 py-1 rounded-md text-xs ${ROLE_STYLES[c.role]}`}>
                      {ROLE_LABELS[c.role]}
                    </span>
                    <span className={`ml-2 px-2 py-1 rounded-md text-xs ${STATUS_STYLES[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleOpenModal(c)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center gap-1"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center gap-1"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 bg-white hover:bg-gray-100"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 bg-white hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingCustomer ? "✏️ Edit Customer" : "➕ Add Customer"}
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border rounded-lg px-3 py-2 w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border rounded-lg px-3 py-2 w-full"
              />
              <input
                type="text"
                placeholder="Photo URL"
                value={formData.photoURL}
                onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                className="border rounded-lg px-3 py-2 w-full"
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="border rounded-lg px-3 py-2 w-full"
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {ROLE_LABELS[role]}
                  </option>
                ))}
              </select>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="border rounded-lg px-3 py-2 w-full"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {editingCustomer ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
