import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SkillsSection = () => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("Skills");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSkill, setActiveSkill] = useState(null);
  const skillsPerPage = 6;

  useEffect(() => {
    fetch("/skills.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error loading skills:", err));
  }, []);

  const filteredCategories = categories.filter((cat) =>
    activeTab === "Skills"
      ? ["Programming", "Web Development", "Frameworks & Libraries", "Databases"].includes(cat.category)
      : ["DevOps & Deployment", "Design & Other Tools", "Digital Marketing"].includes(cat.category)
  );

  const allSkills = filteredCategories.flatMap((cat) => cat.items);

  const indexOfLastSkill = currentPage * skillsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
  const currentSkills = allSkills.slice(indexOfFirstSkill, indexOfLastSkill);
  const totalPages = Math.ceil(allSkills.length / skillsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      transition: { duration: 0.3 } 
    }
  };

  const tooltipVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.2, ease: "easeOut" } 
    },
  };

  return (
    <section className="min-h-screen w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 bg-white flex items-center py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16 xl:gap-20">
          
          {/* Left Side - Content */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-6 lg:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Decorative Label */}
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-gray-500 font-medium">
                All Skills
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              My Skills &<br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
              I use a diverse set of modern technologies and tools to deliver high-quality, scalable, 
              and maintainable web applications. My skill set ensures efficient problem solving and 
              smooth project delivery for clients worldwide.
            </p>

            {/* Tab Buttons */}
            <div className="flex gap-3 pt-2">
              {["Skills", "Tools"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                    setActiveSkill(null);
                  }}
                  className="relative px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 overflow-hidden group"
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${
                    activeTab === tab
                      ? "text-white"
                      : "text-gray-700 group-hover:text-gray-900"
                  }`}>
                    {tab}
                  </span>
                  {activeTab !== tab && (
                    <div className="absolute inset-0 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors duration-300" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Skills Grid */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={activeTab + currentPage}
            >
              <AnimatePresence mode="wait">
                {currentSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="relative group cursor-pointer"
                    variants={cardVariants}
                    layout
                    onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card */}
                    <div className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 flex flex-col items-center justify-center shadow-sm group-hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                      {/* Icon Container */}
                      <div
                        className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-2xl mb-3 sm:mb-4 p-3 sm:p-3.5 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: skill.color || "#f3f4f6" }}
                      >
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      {/* Skill Name */}
                      <p className="text-gray-900 font-semibold text-sm sm:text-base text-center">
                        {skill.name}
                      </p>

                      {/* Hover Indicator */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Tooltip */}
                    {skill.description && (
                      <AnimatePresence>
                        {(activeSkill === skill.name) && (
                          <motion.div
                            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2.5 text-xs sm:text-sm bg-gray-900 text-white rounded-xl text-center w-max max-w-[200px] sm:max-w-xs z-20 shadow-xl"
                            variants={tooltipVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            {skill.description}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            <div className="mt-8 sm:mt-10 flex gap-3 items-center justify-center">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="p-3 sm:p-3.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow group"
              >
                <svg 
                  className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 w-8 sm:w-10"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="p-3 sm:p-3.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow group"
              >
                <svg 
                  className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Page Counter */}
            <p className="mt-4 text-sm text-gray-500">
              Page <span className="font-semibold text-gray-700">{currentPage}</span> of {totalPages}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;