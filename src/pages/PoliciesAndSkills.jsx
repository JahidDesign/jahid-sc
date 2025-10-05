// src/pages/PoliciesAndSkills.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

const POLICIES_API = "https://jahids-reactfoliopro.onrender.com/policies";
const SKILLS_API = "https://jahids-reactfoliopro.onrender.com/skills";

const PoliciesAndSkills = () => {
  // Policies State
  const [policies, setPolicies] = useState([]);
  const [loadingPolicies, setLoadingPolicies] = useState(true);
  const [errorPolicies, setErrorPolicies] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Skills State
  const [skills, setSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [errorSkills, setErrorSkills] = useState("");

  // Fetch Policies
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoadingPolicies(true);
        const res = await axios.get(POLICIES_API);
        setPolicies(res.data.data || []);
      } catch (err) {
        console.error(err);
        setErrorPolicies("Failed to fetch policies");
      } finally {
        setLoadingPolicies(false);
      }
    };
    fetchPolicies();
  }, []);

  // Fetch Skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoadingSkills(true);
        const res = await axios.get(SKILLS_API);
        setSkills(res.data.data || []);
      } catch (err) {
        console.error(err);
        setErrorSkills("Failed to fetch skills");
      } finally {
        setLoadingSkills(false);
      }
    };
    fetchSkills();
  }, []);

  const nextPolicy = () => {
    setCurrentIndex((prev) => (prev + 1) % policies.length);
  };

  const prevPolicy = () => {
    setCurrentIndex((prev) => (prev - 1 + policies.length) % policies.length);
  };

  const handleReadMore = (policy) => {
    Swal.fire({
      title: policy.title,
      text: policy.description,
      imageUrl: policy.imageUrl,
      imageAlt: policy.title,
      imageWidth: 400,
      confirmButtonText: "Close",
    });
  };

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Policies - Slider */}
        <div className="lg:w-3/5 w-full relative">
          

          {loadingPolicies ? (
            <p className="text-center">Loading policies...</p>
          ) : errorPolicies ? (
            <p className="text-center text-red-600">{errorPolicies}</p>
          ) : policies.length === 0 ? (
            <p className="text-center text-gray-500">No policies available.</p>
          ) : (
            <div className="relative">
              <AnimatePresence initial={false}>
                <motion.div
                  key={policies[currentIndex]._id || policies[currentIndex].id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
                >
                  <div className="h-64 w-full overflow-hidden">
                    <img
                      src={policies[currentIndex].imageUrl}
                      alt={policies[currentIndex].title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {policies[currentIndex].title}
                    </h3>
                    <p className="text-gray-600 text-sm flex-grow">
                      {policies[currentIndex].description.length > 200
                        ? policies[currentIndex].description.slice(0, 200) + "..."
                        : policies[currentIndex].description}
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={() => handleReadMore(policies[currentIndex])}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors w-full sm:w-auto"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevPolicy}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
              >
                &#8592;
              </button>
              <button
                onClick={nextPolicy}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
              >
                &#8594;
              </button>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {policies.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full cursor-pointer ${
                      idx === currentIndex ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="lg:w-2/5 w-full">
          {loadingSkills ? (
            <p className="text-center">Loading skills...</p>
          ) : errorSkills ? (
            <p className="text-center text-red-600">{errorSkills}</p>
          ) : (
            <div className="flex flex-col gap-4">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="flex items-center gap-4 bg-white rounded-lg shadow p-3"
                >
                  {skill.image && (
                    <img
                      src={skill.image}
                      alt={skill.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold" style={{ color: skill.color }}>
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level || 0}%` }}
                        transition={{ duration: 0.6 }}
                        className="h-3 rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoliciesAndSkills;
