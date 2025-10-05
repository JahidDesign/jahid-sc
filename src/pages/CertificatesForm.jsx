// File: src/pages/CertificatesForm.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = "http://localhost:3000/Certificates";

const CertificatesForm = () => {
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    link: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch certificates from backend
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get(API_URL);
        console.log("Fetched certificates:", res.data);
        setCertificates(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching certificates:", err);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, formData);
      console.log("New certificate added:", res.data);
      // ensure res.data is object
      if (res.data && typeof res.data === "object") {
        setCertificates((prev) => [...prev, res.data]);
      }
      setFormData({ title: "", date: "", description: "", link: "" });
    } catch (err) {
      console.error("Error adding certificate:", err);
    }
  };

  if (loading)
    return <p className="text-center mt-12">Loading certificates...</p>;

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
          <span className="block text-5xl">🎓</span> Certificates
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-16 bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4"
        >
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Date</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="e.g. July 2023"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Certificate
          </button>
        </form>

        {/* Timeline Display */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full border-l-2 border-blue-400 transform -translate-x-1/2"></div>
          <div className="space-y-12">
            {(certificates || []).map((cert, idx) => (
              <motion.div
                key={cert.id || idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.2 }}
                className="flex flex-col md:flex-row items-center w-full"
              >
                <div
                  className={`md:w-5/12 relative ${
                    idx % 2 === 0 ? "md:pr-8 md:ml-auto" : "md:pl-8 md:mr-auto"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-1/2 top-6 w-4 h-4 bg-blue-600 rounded-full border-2 border-white transform -translate-x-1/2"></div>

                  {/* Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{cert.title}</h3>
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        {cert.date}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{cert.description}</p>
                    <a
                      href={cert.link}
                      className="text-blue-600 hover:underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View certificate
                    </a>
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

export default CertificatesForm;
