import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "https://jahids-reactfoliopro.onrender.com/aboutme";

const AboutMe = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data?.success && Array.isArray(data.data) && data.data.length > 0) {
          setAbout(data.data[0]);
        }
      } catch (error) {
        console.error("Failed to load About data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full"
        />
      </div>
    );
  }

  if (!about) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-600 text-lg">No about information available.</p>
      </div>
    );
  }

  const socialLinks = [
    { name: "facebook", url: about.facebook, icon: <Facebook /> },
    { name: "twitter", url: about.twitter, icon: <Twitter /> },
    { name: "linkedin", url: about.linkedin, icon: <LinkedIn /> },
    { name: "instagram", url: about.instagram, icon: <Instagram /> },
  ];

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex items-center justify-center px-6 md:px-12 py-20">
      
      {/* Animated Background Gradients */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-40 blur-3xl"
        animate={{ rotate: [0, 180, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-cyan-50 to-green-50 opacity-30 blur-3xl"
        animate={{ rotate: [180, 0, 180] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Profile Image */}
        <motion.div
          className="relative w-full flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[32rem] xl:h-[32rem] ">
            <motion.img
              src={about.profilePic}
              alt={about.name}
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-dashed border-indigo-300 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            {/* Floating Particles */}
            <motion.div
              className="absolute top-5 left-5 w-3 h-3 bg-indigo-400 rounded-full blur-sm"
              animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-5 right-5 w-2 h-2 bg-pink-400 rounded-full blur-sm"
              animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="space-y-6 md:space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Availability Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-indigo-700 font-medium">Available for work</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {about.name}
            </span>
          </motion.h1>

          {/* Roles */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {about.roles?.map((role, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
              >
                {role}
              </motion.span>
            ))}
          </div>

          {/* Bio */}
          <motion.p
          className="text-gray-700 text-left font-[Inter] tracking-wide whitespace-pre-wrap leading-relaxed sm:leading-8 md:leading-9 text-base sm:text-lg md:text-xl antialiased"

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {about.bio}
          </motion.p>

          {/* Buttons */}
          <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            {about.cvLink && (
              <a
                href={about.cvLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow hover:scale-105 transition-transform"
              >
                <Download className="w-5 h-5" />
                Download CV
              </a>
            )}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-indigo-600 rounded-xl font-semibold text-indigo-600 hover:bg-indigo-50 transition"
            >
              Read More <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div className="flex items-center gap-4 pt-4">
            {socialLinks.map(
              (social, idx) =>
                social.url && (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + idx * 0.1 }}
                  >
                    {social.icon}
                  </motion.a>
                )
            )}
            {about.email && (
              <motion.a
                href={`mailto:${about.email}`}
                className="w-11 h-11 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 + socialLinks.length * 0.1 }}
              >
                <Mail className="w-5 h-5 text-gray-600 hover:text-indigo-600 transition-colors" />
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Social Media Icons
const Facebook = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Twitter = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedIn = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Instagram = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default AboutMe;
