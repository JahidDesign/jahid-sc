// File: src/pages/Certificates.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = "https://jahids-reactfoliopro.onrender.com/Certificates";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        const data = res.data?.data && Array.isArray(res.data.data) ? res.data.data : [];
        setCertificates(data);
      } catch (err) {
        console.error("Error fetching certificates:", err);
        setError("Failed to load certificates.");
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading || error || certificates.length === 0) return null;

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-600 mb-16">
          <span className="block text-6xl sm:text-7xl mb-2">🎓</span>
          My Certificates
        </h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full border-l-2 border-blue-400 transform -translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id || idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -150 : 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.2 }}
                className="flex flex-col md:flex-row items-center w-full"
              >
                <div
                  className={`md:w-5/12 relative ${
                    idx % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-1/2 top-6 w-5 h-5 bg-blue-600 rounded-full border-2 border-white transform -translate-x-1/2 shadow-lg"></div>

                  {/* Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-lg sm:text-xl text-gray-900">{cert.title}</h3>
                      <span className="bg-blue-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full">
                        {cert.date}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base mb-4">
                      {cert.description}
                    </p>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium text-sm sm:text-base"
                      >
                        View Certificate →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
