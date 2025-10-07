import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ServicesCards = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const cardsPerPage = 3;

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://jahids-reactfoliopro.onrender.com/services");
      if (response.data.success) {
        setServices(response.data.data);
        setFilteredServices(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleFilterChange = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
    if (category === "All") {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter((s) => s.category === category));
    }
  };

  // Pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredServices.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredServices.length / cardsPerPage);

  const categories = ["All", "Web Developer", "Digital Marketing", "Printable Design"];

  // Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const paginationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">The Services I Provide</h2>

      {/* Category Filter */}
      <motion.div
        className="flex justify-between items-center mb-8 flex-wrap gap-3"
        initial="hidden"
        animate="visible"
        variants={filterVariants}
        transition={{ duration: 0.5 }}
      >
        {/* Buttons for desktop */}
        <div className="hidden md:flex gap-3 flex-wrap items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                categoryFilter === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dropdown for all screens */}
        <div className="ml-auto flex items-center">
          <select
            value={categoryFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {loading ? (
        <p className="text-center mt-10">Loading services...</p>
      ) : filteredServices.length === 0 ? (
        <p className="text-center mt-10">No services found.</p>
      ) : (
        <>
          {/* Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {currentCards.map((service) => (
              <motion.div
                key={service._id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col"
                variants={cardVariants}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mb-2">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                  <p className="text-gray-600 mt-2 flex-1">{service.description.slice(0, 80)}...</p>
                  <p className="text-gray-500 mt-2 text-sm font-medium">By: {service.name}</p>
                  <button
                    onClick={() => navigate(`/service/${service._id}`)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <motion.div
            className="flex justify-center gap-2 mt-8 flex-wrap"
            initial="hidden"
            animate="visible"
            variants={paginationVariants}
            transition={{ staggerChildren: 0.05, delayChildren: 0.3 }}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {i + 1}
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ServicesCards;
