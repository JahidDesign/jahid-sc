import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AboutBig = () => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/about")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setAboutData(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch About data:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-blue-600 font-mono">LOADING...</p>
        </div>
      </div>
    );

  if (!aboutData || aboutData.length === 0)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="text-center border-2 border-red-600 p-8 rounded">
          <p className="text-lg text-red-600 font-mono">ERROR: NO DATA FOUND</p>
        </div>
      </div>
    );

  const totalPages = aboutData.length;
  const selectedAbout = aboutData[currentPage];

  const renderList = (text) =>
    text
      .split(/\n|  /)
      .filter((t) => t.trim() !== "")
      .map((item, idx) => (
        <motion.li
          key={idx}
          className="mb-2 pl-6 relative before:content-['▹'] before:absolute before:left-0 before:text-blue-600 text-gray-700 hover:text-blue-600 transition-colors"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
        >
          {item.trim()}
        </motion.li>
      ));

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSwipe = (offset) => {
    if (offset < -50) {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    } else if (offset > 50) {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Minimalist Page Counter */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mb-12 border-b border-gray-200 pb-4"
          >
            <motion.button
              onClick={() => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)}
              className="text-blue-600 hover:text-blue-700 font-mono text-sm"
              whileHover={{ x: -5 }}
            >
              ← PREV
            </motion.button>

            <div className="flex gap-2 items-center">
              <span className="text-gray-900 font-mono text-sm font-bold">
                {String(currentPage + 1).padStart(2, '0')}
              </span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-400 font-mono text-sm">
                {String(totalPages).padStart(2, '0')}
              </span>
            </div>

            <motion.button
              onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)}
              className="text-blue-600 hover:text-blue-700 font-mono text-sm"
              whileHover={{ x: 5 }}
            >
              NEXT →
            </motion.button>
          </motion.div>
        )}

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={selectedAbout._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => handleSwipe(info.offset.x)}
          >
            {/* Profile Header - Side by Side */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                className="md:col-span-1"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <div className="relative group">
                  <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-2 translate-y-2"></div>
                  <img
                    src={selectedAbout.imageUrl}
                    alt={selectedAbout.name}
                    className="relative w-full aspect-square object-cover transition-all duration-500"
                  />
                </div>
              </motion.div>

              <motion.div
                className="md:col-span-2 flex flex-col justify-center"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-gray-900">
                  <span className="text-blue-600">/</span>
                  {selectedAbout.name}
                </h1>
                <div className="h-1 w-20 bg-blue-600 mb-6"></div>
                <p className="text-lg text-gray-600 leading-relaxed border-l-2 border-gray-200 pl-4">
                  {selectedAbout.intro}
                </p>
              </motion.div>
            </div>

            {/* Journey Section */}
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-6 text-blue-600 font-mono uppercase tracking-wider">
                // Journey
              </h2>
              <div className="border-l-2 border-blue-600 pl-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedAbout.journey}
                </p>
              </div>
            </motion.section>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Skills */}
              <motion.section
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-blue-600 font-mono uppercase tracking-wider">
                  // Skills
                </h2>
                <ul className="space-y-2">
                  {renderList(selectedAbout.skills)}
                </ul>
              </motion.section>

              {/* Achievements */}
              <motion.section
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-blue-600 font-mono uppercase tracking-wider">
                  // Achievements
                </h2>
                <ul className="space-y-2">
                  {renderList(selectedAbout.achievements)}
                </ul>
              </motion.section>

              {/* Hobbies */}
              <motion.section
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-blue-600 font-mono uppercase tracking-wider">
                  // Hobbies
                </h2>
                <ul className="space-y-2">
                  {renderList(selectedAbout.hobbies)}
                </ul>
              </motion.section>

              {/* Why Work With Me */}
              <motion.section
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-blue-600 font-mono uppercase tracking-wider">
                  // Why Work With Me
                </h2>
                <ul className="space-y-2">
                  {renderList(selectedAbout.whyWorkWithMe)}
                </ul>
              </motion.section>
            </div>

            {/* CTA Section */}
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="border-t border-gray-200 pt-12 text-center"
            >
              <p className="text-2xl text-gray-700 mb-6 italic">
                "{selectedAbout.cta}"
              </p>
              <motion.button
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 font-mono uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect
              </motion.button>
            </motion.section>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AboutBig;