// File: src/pages/Projects.jsx
import React, { useEffect, useState } from "react";
import { ExternalLink, Github, Search, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = "http://localhost:3000/projects";

const Projects = ({ isAdmin = false }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.success && Array.isArray(res.data.data)) {
        setProjects(res.data.data);
        setFilteredProjects(res.data.data);
      } else {
        setProjects([]);
        setFilteredProjects([]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setProjects([]);
      setFilteredProjects([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => (p.category || "Uncategorized") === selectedCategory
      );
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, projects]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleEdit = async (id) => {
    const title = prompt("Enter new project title");
    if (!title) return;
    try {
      await axios.put(`${API_URL}/${id}`, { title });
      fetchProjects();
    } catch (err) {
      console.error("Error editing project:", err);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading projects...
        </p>
      </div>
    );
  }

  if (!filteredProjects.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No projects found.</p>
      </div>
    );
  }

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const categories = ["All", ...new Set(projects.map(p => p.category || "Uncategorized"))];

  return (
    <section className="w-full min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Projects I Developed
        </h2>

        {/* Search & Category */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentProjects.map(project => (
            <motion.div
              key={project._id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md flex flex-col w-full relative"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-3">
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

                  {isAdmin && (
                    <div className="ml-auto flex gap-2">
                      <button
                        onClick={() => handleEdit(project._id)}
                        className="p-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
