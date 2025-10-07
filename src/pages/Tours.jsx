import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

const API_URL = "https://jahids-reactfoliopro.onrender.com/tours";
const ITEMS_PER_PAGE = 6;

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setTours(data);
        setFilteredTours(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Extract unique categories
  const categories = ["All", ...new Set(tours.map((t) => t.category || "Other"))];

  // Handle filter change
  const handleFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === "All") {
      setFilteredTours(tours);
    } else {
      setFilteredTours(tours.filter((t) => t.category === category));
    }
  };

  // Handle loading and empty state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-700">
        Loading tours...
      </div>
    );
  }

  if (!filteredTours || filteredTours.length === 0) {
    return null;
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTours = filteredTours.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 pb-20 pt-24">
      {/* Page Title */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 tracking-tight"
      >
        Explore Our Tours
      </motion.h1>

      {/* Filter Section */}
      <div className="w-full max-w-5xl flex flex-wrap md:flex-nowrap justify-center items-center gap-4 mb-10">
        <select
          className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700"
          value={selectedCategory}
          onChange={(e) => handleFilter(e.target.value)}
        >
          {categories.map((cat, idx) => (
            <option key={idx}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Tour Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <AnimatePresence>
          {currentTours.map((tour, index) => (
            <motion.div
              key={tour._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100"
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="h-52 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="flex-1 flex flex-col p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                  {tour.title}
                </h3>
                <p className="text-gray-600 text-sm flex-1 leading-relaxed line-clamp-3">
                  {tour.description}
                </p>
                <a
                  href={tour.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Preview <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentPage === page
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tours;
