// File: src/components/BlogsCarousel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const API_URL = "https://jahids-reactfoliopro.onrender.com/BlogsCarousel";

const BlogsCarousel = () => {
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

  const handleSwipe = (offset) => {
    if (offset > 50) {
      // Swipe right → previous
      setCurrent((prev) => (prev - 1 + items.length) % items.length);
    } else if (offset < -50) {
      // Swipe left → next
      setCurrent((prev) => (prev + 1) % items.length);
    }
  };

  if (items.length === 0 || !items[current]) {
    return <p className="text-center text-gray-500 py-10">No carousel items found.</p>;
  }

  const currentItem = items[current];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem._id || currentItem.id || current}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={(e, info) => handleSwipe(info.offset.x)}
        >
          {/* Background Image */}
          <motion.img
            src={currentItem.imageUrl}
            alt={currentItem.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70 flex items-center justify-start">
            <motion.div
              key={currentItem.title}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 1 }}
              className="max-w-xl px-6 sm:px-12 md:px-16 lg:px-24"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                {currentItem.title}
              </h2>

              <TypeAnimation
                sequence={[
                  "Web Developer ",
                  2000,
                  "UI/UX Designer ",
                  2000,
                  "MERN Stack Engineer ",
                  2000,
                  "Freelancer ",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-blue-400 mb-6 drop-shadow-md"
              />

              <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-6 leading-relaxed drop-shadow-md">
                {currentItem.subtitle}
              </p>

              {currentItem.buttonText && currentItem.pagePath && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(currentItem.pagePath)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-semibold shadow-xl"
                >
                  {currentItem.buttonText}
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogsCarousel;
