// File: src/components/SkillsCardSection.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = "https://jahids-reactfoliopro.onrender.com/skills";

const SkillsCardSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch skills from API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(API_URL);
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setSkills(result.data);
        } else {
          console.error("Unexpected API response:", result);
        }
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Skeleton Loader
  if (loading) {
    return (
      <section className="w-full py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            My Skills
          </h2>
          <div className="flex flex-col gap-6 items-center">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex flex-col items-center"
              >
                <div className="w-16 h-16 mb-4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="w-32 h-4 rounded bg-gray-300 dark:bg-gray-600 mb-3"></div>
                <div className="w-20 h-3 rounded-full bg-gray-300 dark:bg-gray-600 mb-3"></div>
                <div className="w-full h-3 rounded bg-gray-300 dark:bg-gray-600 mb-2"></div>
                <div className="w-3/4 h-3 rounded bg-gray-300 dark:bg-gray-600"></div>
                <div className="mt-4 w-full">
                  <div className="w-full h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Actual Skills
  return (
    <section className="w-full py-12 text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-10">
         <h2 className="text-2xl sm:text-3xl font-bold text-center">
          My Skills
         </h2>
         </div>

        <div className="flex flex-col gap-6 items-center">
          {skills.map((skill) => (
            <motion.div
              key={skill._id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-4"
            >
              {/* Skill Image */}
              {skill.image && (
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
                />
              )}

              {/* Skill Info */}
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3
                    className="text-lg font-bold"
                    style={{ color: skill.color }}
                  >
                    {skill.name}
                  </h3>
                  {skill.tag && (
                    <span className="text-xs font-semibold bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {skill.tag}
                    </span>
                  )}
                </div>

                {skill.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    {skill.description}
                  </p>
                )}

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level || 0}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-4 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  ></motion.div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Level: {skill.level}% •{" "}
                  {skill.experience}{" "}
                  {skill.experience === "1" ? "year" : "years"} experience
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsCardSection;
