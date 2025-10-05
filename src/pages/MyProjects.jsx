// File: src/pages/MyProjects.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import Projects from "./Projects";
import { motion } from "framer-motion";
import ServicePackagesForm from "./services/ServicePackagesForm.jsx";
import ProjectsCarousel from "./Hero/ProjectsCarousel.jsx";

const MyProjects = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>My Projects | Jahid Hasan Portfolio</title>
        <meta
          name="description"
          content="Explore Jahid Hasan’s professional projects in digital marketing, web development, and Canva design. See case studies, creative work, and service packages."
        />
        <meta
          name="keywords"
          content="Jahid Hasan projects, Jahid Hasan portfolio, web development projects, digital marketing case studies, Canva design projects, React, Node.js"
        />

        {/* ✅ Open Graph for social sharing */}
        <meta property="og:title" content="My Projects | Jahid Hasan Portfolio" />
        <meta
          property="og:description"
          content="Discover Jahid Hasan’s projects — from React web apps to digital marketing campaigns and Canva creative designs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jahidhasan.dev/projects" />
        <meta
          property="og:image"
          content="https://jahidhasan.dev/portfolio-preview.png"
        />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Projects | Jahid Hasan Portfolio" />
        <meta
          name="twitter:description"
          content="Browse Jahid Hasan’s projects in digital marketing, web development, and Canva design."
        />
        <meta
          name="twitter:image"
          content="https://jahidhasan.dev/portfolio-preview.png"
        />

        {/* ✅ Favicon */}
        <link rel="icon" href="/portfolio-favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/portfolio-favicon.png" />
      </Helmet>

      {/* Hero Section */}
      <div>
        <ProjectsCarousel />
      </div>

      {/* Projects Section */}
      <div className="flex-1 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="item-center"
        >
          <Projects />
        </motion.div>
      </div>

      {/* Service Packages Section */}
      <div className="flex-1 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="item-center"
        >
          <ServicePackagesForm />
        </motion.div>
      </div>
    </section>
  );
};

export default MyProjects;
