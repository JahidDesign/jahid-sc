// File: ContactManager.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Mail, Phone, AlertCircle, Search, X } from "lucide-react";

const API_URL = "https://jahids-reactfoliopro.onrender.com/contact";

// ---------------------------
// Inquiry Style Mapping
// ---------------------------
const getInquiryStyle = (type) => {
  switch (type) {
    case "support":
      return "from-blue-100 to-blue-50 border-blue-200";
    case "sales":
      return "from-green-100 to-green-50 border-green-200";
    case "general":
      return "from-purple-100 to-purple-50 border-purple-200";
    default:
      return "from-pink-100 to-pink-50 border-pink-200";
  }
};

export default function ContactManager() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);

  // ---------------------------
  // Fetch Contacts
  // ---------------------------
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        setContacts(json.data || []);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };
    fetchContacts();
  }, []);

  // ---------------------------
  // Bulk Delete
  // ---------------------------
  const handleDeleteSelected = async () => {
    if (!selectedContacts.length) return;
    if (!window.confirm("Delete selected contacts?")) return;

    try {
      await Promise.all(
        selectedContacts.map((id) =>
          fetch(`${API_URL}/${id}`, { method: "DELETE" })
        )
      );
      setContacts((prev) =>
        prev.filter((c) => !selectedContacts.includes(c._id))
      );
      setSelectedContacts([]);
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  // ---------------------------
  // Search Filter
  // ---------------------------
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase())
  );

  // ---------------------------
  // Toggle Select All Visible
  // ---------------------------
  const toggleSelectAllVisible = () => {
    const visibleIds = filteredContacts.map((c) => c._id);
    const allSelected = visibleIds.every((id) => selectedContacts.includes(id));
    if (allSelected) {
      setSelectedContacts((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedContacts((prev) => [...new Set([...prev, ...visibleIds])]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* ---------------------------
          Hero Section
      --------------------------- */}
      <section className="px-6 md:px-12 py-12 text-center border-b border-gray-300">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold"
        >
          Contact Management
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mt-3"
        >
          Stay on top of your customer inquiries ✨
        </motion.p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 max-w-4xl mx-auto">
          <div className="p-6 bg-gray-100 rounded-2xl">
            <h3 className="text-2xl font-bold">{contacts.length}</h3>
            <p className="text-gray-500 text-sm">Total Inquiries</p>
          </div>
          <div className="p-6 bg-blue-100 rounded-2xl">
            <h3 className="text-2xl font-bold">
              {contacts.filter((c) => c.inquiryType === "support").length}
            </h3>
            <p className="text-gray-500 text-sm">Support</p>
          </div>
          <div className="p-6 bg-green-100 rounded-2xl">
            <h3 className="text-2xl font-bold">
              {contacts.filter((c) => c.inquiryType === "sales").length}
            </h3>
            <p className="text-gray-500 text-sm">Sales</p>
          </div>
          <div className="p-6 bg-purple-100 rounded-2xl">
            <h3 className="text-2xl font-bold">
              {contacts.filter((c) => c.inquiryType === "general").length}
            </h3>
            <p className="text-gray-500 text-sm">General</p>
          </div>
        </div>
      </section>

      {/* ---------------------------
          Sticky Toolbar with Gradients + Select All
      --------------------------- */}
      <div className="sticky top-0 z-50 bg-white shadow-md px-6 md:px-12 py-4 flex items-center gap-4 overflow-x-auto scrollbar-hide">
        {/* Left Gradient */}
        <div className="absolute top-0 left-0 h-full w-8 pointer-events-none bg-gradient-to-r from-white to-transparent md:hidden" />
        {/* Right Gradient */}
        <div className="absolute top-0 right-0 h-full w-8 pointer-events-none bg-gradient-to-l from-white to-transparent md:hidden" />

        <label className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
          <input
            type="checkbox"
            checked={
              filteredContacts.length > 0 &&
              filteredContacts.every((c) => selectedContacts.includes(c._id))
            }
            onChange={toggleSelectAllVisible}
            className="w-5 h-5 accent-blue-500"
          />
          <span className="text-gray-700 text-sm">Select All Visible</span>
        </label>

        <div className="relative flex-shrink-0 w-full md:w-80">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {selectedContacts.length > 0 && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleDeleteSelected}
            className="flex items-center gap-2 bg-red-500 px-5 py-2 rounded-xl text-white font-semibold hover:scale-105 transition flex-shrink-0"
          >
            <Trash2 size={16} /> Delete Selected
          </motion.button>
        )}
      </div>

      {/* ---------------------------
          Contacts Grid
      --------------------------- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative">
        {/* Left & Right Gradients for mobile horizontal scroll */}
        <div className="absolute top-0 left-0 h-full w-12 pointer-events-none bg-gradient-to-r from-white/100 to-white/0 md:hidden" />
        <div className="absolute top-0 right-0 h-full w-12 pointer-events-none bg-gradient-to-l from-white/100 to-white/0 md:hidden" />

        <div className="flex gap-6 overflow-x-auto sm:scrollbar-hide pb-4">
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setActiveContact(contact)}
              className={`min-w-[280px] flex-shrink-0 relative bg-gradient-to-br ${getInquiryStyle(
                contact.inquiryType
              )} border rounded-3xl p-6 shadow cursor-pointer`}
            >
              {/* Badge */}
              <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-black/20 text-white border border-black/20">
                {contact.inquiryType || "N/A"}
              </span>

              {/* Info */}
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                {contact.name}
                {contact.inquiryType === "support" && (
                  <AlertCircle className="text-blue-600" size={18} />
                )}
              </h3>
              <p className="flex items-center gap-2 text-gray-700 text-sm">
                <Mail size={16} /> {contact.email}
              </p>
              <p className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                <Phone size={16} /> {contact.phone || "No phone"}
              </p>
              <p className="text-gray-900 font-medium">{contact.subject}</p>
              <p className="text-gray-700 italic text-sm mt-2">
                “{contact.message.substring(0, 80)}...”
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------------------------
          Modal for Full Details
      --------------------------- */}
      <AnimatePresence>
        {activeContact && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white text-black max-w-lg w-full p-8 rounded-2xl shadow-xl relative border border-gray-300"
            >
              <button
                onClick={() => setActiveContact(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                <X size={22} />
              </button>
              <h2 className="text-2xl font-bold mb-2">{activeContact.name}</h2>
              <p className="text-gray-700 mb-2">{activeContact.email}</p>
              <p className="text-gray-700 mb-4">
                {activeContact.phone || "No phone"}
              </p>
              <h3 className="font-semibold text-lg mb-1">{activeContact.subject}</h3>
              <p className="text-gray-700 leading-relaxed mb-6">{activeContact.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(activeContact.date).toLocaleString()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
