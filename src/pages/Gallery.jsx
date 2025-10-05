// src/components/Gallery.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Pencil, ChevronLeft, ChevronRight } from "lucide-react";

const API_URL = "https://jahids-reactfoliopro.onrender.com/skillsIns";

const Gallery = ({ isAdmin = false }) => {
  const [skills, setSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 🧩 Change this to show more/less per page

  // Fetch skills
  const fetchSkills = async () => {
    try {
      const res = await axios.get(API_URL);
      if (Array.isArray(res.data)) setSkills(res.data);
      else if (res.data.skills) setSkills(res.data.skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // Edit skill
  const handleEdit = async (skill) => {
    const { value: newName } = await Swal.fire({
      title: "Edit Skill Name",
      input: "text",
      inputLabel: "Skill Name",
      inputValue: skill.name,
      showCancelButton: true,
      confirmButtonText: "Save",
      inputValidator: (value) => {
        if (!value) return "Skill name cannot be empty!";
      },
    });

    if (newName && newName !== skill.name) {
      try {
        await axios.put(`${API_URL}/${skill._id}`, { name: newName });
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Skill name updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchSkills();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Something went wrong while updating.",
        });
      }
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(skills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSkills = skills.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (!skills || skills.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
          <div className="flex items-center gap-12">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-white">
              Gallery
            </h2>

            <p className="hidden max-w-screen-sm text-gray-500 dark:text-gray-300 md:block">
              Explore our collection of skills, technologies, and creative tools
              showcased below.
            </p>
          </div>

          <a
            href="#"
            className="inline-block rounded-lg border bg-white dark:bg-gray-700 dark:border-none px-4 py-2 text-center text-sm font-semibold text-gray-500 dark:text-gray-200 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
          >
            More
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
          {currentSkills.map((skill, index) => (
            <div
              key={skill._id || index}
              className={`group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg ${
                index % 4 === 1 || index % 4 === 2
                  ? "md:col-span-2 md:h-80"
                  : "md:h-80"
              }`}
            >
              <img
                src={skill.imageUrl}
                alt={skill.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-flex items-center gap-2 text-sm text-white md:ml-5 md:text-lg">
                {skill.name}
                {isAdmin && (
                  <button
                    onClick={() => handleEdit(skill)}
                    className="text-white hover:text-blue-300 transition"
                    title="Edit Skill"
                  >
                    <Pencil size={16} />
                  </button>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition ${
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <ChevronLeft size={18} /> Prev
          </button>

          <span className="text-gray-600 dark:text-gray-300">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition ${
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
