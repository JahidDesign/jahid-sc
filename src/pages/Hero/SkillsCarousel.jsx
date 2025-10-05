// File: src/components/SkillsCarousel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const API_URL = "https://jahids-reactfoliopro.onrender.com/SkillsCarousel";

const SkillsCarousel = () => {
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
    return <p className="text-center text-gray-500 py-10">No carousel items found.</p>;
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={items[current]._id || items[current].id || current}
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
            className="w-full h-full object-cover"
          />

          {/* Overlay with left-aligned text */}
          <div className="absolute inset-0  bg-opacity-50 flex items-center">
            <motion.div
              key={items[current].title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-xl text-left px-6 md:px-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                {items[current].title}
              </h2>

              {/* Typing Animation */}
              <TypeAnimation
                sequence={[
                  "Web Developer 💻",
                  2000,
                  "UI/UX Designer 🎨",
                  2000,
                  "MERN Stack Engineer 🚀",
                  2000,
                  "Freelancer 🌍",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="block text-lg md:text-2xl font-medium text-blue-400 mb-6"
              />

              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                {items[current].subtitle}
              </p>

              {items[current].buttonText && items[current].pagePath && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(items[current].pagePath)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
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
              idx === current ? "bg-white scale-110" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsCarousel;
