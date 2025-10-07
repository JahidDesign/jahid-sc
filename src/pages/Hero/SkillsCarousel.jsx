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
    return (
      <p className="text-center text-gray-500 py-10 text-lg">
        No carousel items found.
      </p>
    );
  }

  return (
    <div className="relative w-full h-[520px] md:h-[600px] overflow-hidden rounded-none shadow-sm font-['Poppins'] bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={items[current]._id || items[current].id || current}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Image */}
          <img
            src={items[current].imageUrl}
            alt={items[current].title}
            className="w-full h-full object-cover opacity-90"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-transparent flex items-center">
            <motion.div
              key={items[current].title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-xl px-6 md:px-12 text-left"
            >
              {/* Title with Gradient */}
              <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-[#00BFFF] to-[#00FFFF] text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(0,191,255,0.4)]">
                {items[current].title}
              </h2>

              {/* Typing Animation with Glow */}
              <TypeAnimation
                sequence={[
                  "MERN Stack Developer ",
                  2000,
                  "Creative UI/UX Designer ",
                  2000,
                  "Digital Marketer ",
                  2000,
                  "Freelancer & Innovator ",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="block text-xl md:text-2xl font-semibold text-[#00E5FF] mb-6 drop-shadow-[0_0_10px_rgba(0,229,255,0.7)]"
              />

              {/* Description */}
              <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-6">
                {items[current].subtitle ||
                  "Professional web developer passionate about creating modern, user-friendly, and scalable digital experiences."}
              </p>

              {/* Button */}
              {items[current].buttonText && items[current].pagePath && (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(0,191,255,0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(items[current].pagePath)}
                  className="bg-gradient-to-r from-[#00BFFF] to-[#00FFFF] text-black px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  {items[current].buttonText}
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current
                ? "bg-gradient-to-r from-[#00BFFF] to-[#00FFFF] scale-125 shadow-[0_0_6px_rgba(0,191,255,0.8)]"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsCarousel;
