// File: src/pages/HomeProjects.jsx
import React, { useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_URL = "https://jahids-reactfoliopro.onrender.com/projects";
const ROTATE_INTERVAL = 20 * 60 * 1000; // 20 minutes

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.6 } },
};

const HomeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch projects
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setProjects(data.data);
          setVisibleProjects(data.data.slice(0, 6));
        } else {
          setProjects([]);
          setVisibleProjects([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setProjects([]);
        setVisibleProjects([]);
        setLoading(false);
      });
  }, []);

  // Rotate projects every 20 minutes
  useEffect(() => {
    if (!projects.length) return;

    const interval = setInterval(() => {
      setVisibleProjects((prev) => {
        const startIndex = projects.findIndex((p) => p._id === prev[0]._id);
        const nextIndex = (startIndex + 6) % projects.length;
        return projects.slice(nextIndex, nextIndex + 6).length === 6
          ? projects.slice(nextIndex, nextIndex + 6)
          : projects.slice(0, 6);
      });
    }, ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [projects]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg animate-pulse">Loading projects...</p>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">No projects found.</p>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen  flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Portfolio Projects
        </h2>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={visibleProjects.map((p) => p._id).join("-")}
            className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {visibleProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md overflow-hidden flex flex-col h-full"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 sm:h-64 md:h-52 lg:h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                      {project.description}
                    </p>
                    {project.tags && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-black text-sm"
                      >
                        <Github className="w-4 h-4 mr-1" /> Code
                      </a>
                    )}
                    {project.preview && (
                      <a
                        href={project.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" /> Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Projects */}
        {projects.length > 6 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => navigate("/projects")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeProjects;
