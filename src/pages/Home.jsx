// File: src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import HeroCarousel from "../components/HeroCarousel";
import BlogpostHomeCard from "./BlogpostHomeCard";
import Testimonials from "./Testimonials";
import SkillsSection from "./SkillsSection";
import AboutMe from "./About/AboutMe";
import Subscribers from "./Subscribers";
// import PricingPlans from "./services/PricingPlans";
import ServicesCards from "./services/ServicesCards";
import ReviewsCarouselModern from "./ReviewsCarouselModern";
import CustomLoader from "../components/CustomLoader";
import HomeProjects from "./HomeProjects"; 
import Gallery from "./Gallery"; 

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-10">
        <CustomLoader name="JHS" type="typing" />
        <CustomLoader name="JHS" type="spinner" />
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900">
      {/* SEO */}
      <Helmet>
        <title>Portfolio 2025 | Jahid Hasan</title>
        <meta
          name="description"
          content="Portfolio of Jahid Hasan — Web Developer & Digital Marketer. Explore my projects, skills, and testimonials in 2025."
        />
        <meta
          name="keywords"
          content="Jahid Hasan, Web Developer, Digital Marketing, Portfolio 2025, Projects, Skills"
        />
        <link rel="icon" type="image/png" href="portfolio.png" />
        <link rel="apple-touch-icon" href="portfolio.png" />
        <link rel="icon" href="portfolio.png" sizes="any" />
      </Helmet>

      {/* Hero */}
      <motion.section
        id="hero"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <HeroCarousel section="Portfolio" />
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-20 px-6 md:px-12 mx-auto text-center"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <AboutMe />
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="bg-gray-50 py-20 px-6 md:px-12"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <SkillsSection />
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-20 px-6 md:px-12  mx-auto"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <HomeProjects />
      </motion.section>
      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-20 px-6 md:px-12  mx-auto"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={4}
      >
           <div className="flex-1 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="item-center"
        >
          {/* Inject Services Component */}
          <ServicesCards />
        </motion.div>
      </div>
      </motion.section>
      
      {/* Testimonials */}
      <motion.section
        id="testimonials"
        className="bg-gray-50 py-20 px-6 md:px-12"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={5}
      >
        <Testimonials />
      </motion.section>
{/* Gallery Section */}
      <motion.section
        id="projects"
        className="py-20 px-6 md:px-12  mx-auto"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={4}
      >
           <div className="flex-1 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="item-center"
        >
          {/* Inject Services Component */}
          <Gallery />
        </motion.div>
      </div>
      </motion.section>
      
      {/* Blog Section */}
      <motion.section
        id="blogs"
        className="py-20 px-6 md:px-12 bg-white"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={6}
      >
        <BlogpostHomeCard />
      </motion.section>

      {/* Subscribers */}
      <motion.section
        id="subscribers"
        className="bg-gray-50 py-20 px-6 md:px-12"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={7}
      >
        <Subscribers />
      </motion.section>

      {/* Reviews Carousel */}
      <motion.section
        id="reviews"
        className="py-20 px-6 md:px-12 bg-white"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={8}
      >
        <ReviewsCarouselModern />
      </motion.section>
    </div>
  );
};

export default Home;
