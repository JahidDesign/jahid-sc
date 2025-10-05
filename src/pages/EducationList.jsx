// src/components/EducationList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000/education";

const EducationList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        // Ensure we always set an array
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setItems(data);
      })
      .catch((err) => {
        console.error("Error fetching education:", err);
        setItems([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 🔄 Show a loader while fetching
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading education records...
      </div>
    );
  }

  // ❌ No data → show nothing (or you could show a placeholder message instead)
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <section className="p-6">
      {/* ✅ Heading only shows if data exists */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Education</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((edu) => (
          <div
            key={edu.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-4"
          >
            <img
              src={edu.image}
              alt={edu.title}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
            <h3 className="text-lg font-semibold">{edu.title}</h3>
            <p className="text-sm text-gray-500">{edu.year}</p>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {edu.description}
            </p>
            <span className="inline-block mt-2 text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
              {edu.tag}
            </span>
            <div className="mt-4 flex justify-between items-center">
              <a
                href={edu.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Visit
              </a>
              <Link
                to={`/education/${edu.id}`}
                className="text-sm text-white bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-700"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationList;
