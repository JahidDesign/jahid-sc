// File: src/components/ProjectsCarousel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const API_URL = "https://jahids-reactfoliopro.onrender.com/ProjectsCarousel";

const ProjectsCarousel = () => {
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Fetch carousel data
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(API_URL);
        setItems(res.data.data || res.data || []);
      } catch (err) {
        console.error("Error fetching carousel items:", err);
      }
    };
    fetchItems();
  }, []);

  // Auto slide every 5s
  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items]);

  if (items.length === 0 || !items[current]) {
    return (
      <p className="text-center text-gray-500 py-10 text-lg">
        No projects found.
      </p>
    );
  }

  return (
    <div className="relative w-full h-[520px] md:h-[600px] overflow-hidden rounded-none shadow-sm bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-700">
      <AnimatePresence mode="wait">
        <motion.div
          key={items[current]._id || current}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Image */}
          <img
            src={items[current].imageUrl}
            alt={items[current].title}
            className="w-full h-full object-cover opacity-90"
          />

          {/* Overlay Section */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
            <motion.div
              key={items[current].title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl text-left px-6 md:px-16"
            >
              {/* Title */}
              <h2 className="text-3xl md:text-5xl font-extrabold text-blue-400 mb-4 leading-tight drop-shadow-xl font-[Poppins]">
                {items[current].title}
              </h2>

              {/* Typing Animation */}
              <TypeAnimation
                sequence={[
                  "Full Stack Project ",
                  2000,
                  "React Dashboard ",
                  2000,
                  "E-commerce Platform ",
                  2000,
                  "Creative Portfolio ",
                  2000,
                  "Next.js Web App ",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="block text-lg md:text-2xl font-medium text-blue-300 mb-6 font-[Poppins]"
              />

              {/* Description */}
              <p className="text-base md:text-lg text-gray-900 dark:text-gray-100 mb-6 leading-relaxed font-[Inter] bg-white/30 dark:bg-gray-700/40 backdrop-blur-md rounded-xl p-4 shadow-md border border-white/20">
                {items[current].subtitle}
              </p>

              {/* Button */}
              {items[current].buttonText && items[current].pagePath && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(items[current].pagePath)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300"
                >
                  {items[current].buttonText}
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current
                ? "bg-blue-400 scale-125 shadow-md"
                : "bg-gray-300 hover:bg-blue-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsCarousel;
