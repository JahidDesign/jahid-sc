// File: src/pages/Myskills.jsx
import React from "react";
import PoliciesAndSkills from "./PoliciesAndSkills";
import Certificates from "./Certificates";
import EducationList from "./EducationList";
import { motion } from "framer-motion";
import SkillsCarousel from "./Hero/SkillsCarousel.jsx";
import ManagementCards from "./Management/ManagementCards.jsx";
import { Helmet } from "react-helmet-async";

const Myskills = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col">
      
      {/* ✅ SEO Helmet with meta tags */}
      <Helmet>
        <title>My Skills & Certifications | Jahid Hasan Portfolio</title>
        <meta
          name="description"
          content="Explore Jahid Hasan's professional skills and certifications in web development, React, Node.js, digital marketing, and more. A showcase of expertise and learning journey."
        />
        <meta
          name="keywords"
          content="Jahid Hasan, portfolio, web development skills, certifications, React, Node.js, digital marketing, full stack developer, frontend, backend"
        />
        <meta property="og:title" content="My Skills & Certifications | Jahid Hasan Portfolio" />
        <meta
          property="og:description"
          content="Explore professional skills and certifications of Jahid Hasan in modern web technologies and digital marketing."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/skills" />
        <meta property="og:image" content="https://yourdomain.com/preview-skills.png" />

        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Helmet>

      {/* Hero Section */}
      <div>
        <SkillsCarousel section="skills" />
      </div>

      {/* ManagementCards Section */}
      <div className="flex-1 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="item-center"
        >
        <ManagementCards />
        </motion.div>
      </div>
      {/* Certificates Section */}
      <div className="flex-1 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="item-center"
        >
          <Certificates />
        </motion.div>
      </div>
      {/* Education Section */}
      <div className="flex-1 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="item-center"
        >
          <EducationList />
        </motion.div>
      </div>

      {/* Skills Section */}
      <div className="flex-1 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="item-center"
        >
          <PoliciesAndSkills />
        </motion.div>
      </div>
    </section>
  );
};

export default Myskills;
