// File: src/components/ServiceDetailsFullPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/services");
        const foundService = response.data.find((s) => s._id === id);
        setService(foundService || null);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
      setLoading(false);
    };
    fetchService();
  }, [id]);

  // ✅ Features parser
  const getFeatures = () => {
    if (!service?.features) return [];

    if (Array.isArray(service.features)) {
      return service.features.flatMap((f) => {
        try {
          // যদি JSON array হিসেবে থাকে
          const parsed = JSON.parse(f);
          if (Array.isArray(parsed)) {
            return parsed.map((item) =>
              typeof item === "string"
                ? item.replace(/"/g, "").trim()
                : String(item)
            );
          }
          return [String(parsed)];
        } catch {
          // fallback: comma দিয়ে split
          return f.split(",").map((s) => s.replace(/"/g, "").trim());
        }
      });
    }
    return [];
  };

  const features = getFeatures();

  if (loading)
    return (
      <p className="text-center mt-20 text-lg text-gray-500 animate-pulse">
        Loading service details...
      </p>
    );

  if (!service)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg font-semibold mb-6">
          ❌ Service not found.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col py-12 px-4">
      {/* 🔙 Back Button */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-300 px-5 py-2 rounded-full font-semibold shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* 📝 Service Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-gray-200"
      >
        {/* 📷 Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 h-96 md:h-auto relative"
        >
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover rounded-l-3xl"
          />
          <div className="absolute bottom-4 left-4 bg-black/40 text-white px-3 py-1 rounded-lg text-sm shadow">
            {service.category}
          </div>
        </motion.div>

        {/* 📑 Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between"
        >
          <div>
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 drop-shadow-sm">
              {service.title}
            </h1>

            {/* Description */}
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {service.description}
            </p>

            {/* Features */}
            {features.length > 0 && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  ✨ Features
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 text-sm md:text-base"
                    >
                      <span className="font-bold">✔</span> {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Author */}
          <p className="text-gray-500 text-sm font-medium mt-8 text-right">
            By: {service.name}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServiceDetails;
