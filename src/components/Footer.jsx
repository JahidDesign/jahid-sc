// File: src/components/Footer.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Phone,
  Mail,
  MapPin,
  Headphones,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  MessageCircle, // 🟢 Using MessageCircle instead of WhatsApp
} from "lucide-react";

const Footer = () => {
  const [subscribeData, setSubscribeData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize AOS animation
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  // Handle input
  const handleSubscribeChange = (e) => {
    setSubscribeData({ ...subscribeData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubscribeSubmit = async () => {
    if (!subscribeData.name || !subscribeData.email) {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setSubscribeData({ name: "", email: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <footer className="bg-white text-black w-full py-10 px-6 sm:px-8 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
          {/* --- Logo & About --- */}
          <div data-aos="fade-right">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-black">
              Jahid Hasan
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2">
              Full-stack developer building modern web apps with React, Node.js,
              and MongoDB.
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              📍 Sylhet, Bangladesh
            </p>
          </div>

          {/* --- Explore Links --- */}
          <div data-aos="fade-left">
            <h3 className="text-black font-bold text-sm mb-4 relative">
              Explore
              <div className="absolute -bottom-1 left-0 w-12 h-1 bg-black rounded-full"></div>
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Home", to: "/" },
                { name: "About", to: "/about" },
                { name: "Projects", to: "/project" },
                { name: "Contact", to: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-black transition flex items-center group text-sm"
                  >
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2 group-hover:bg-black transition duration-200"></div>
                    <span className="group-hover:translate-x-1 transition duration-200 flex items-center">
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition duration-200" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Subscribe & Contact --- */}
          <div data-aos="fade-up" className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-black font-bold text-sm mb-4 relative">
              Subscribe & Contact
              <div className="absolute -bottom-1 left-0 w-12 h-1 bg-black rounded-full"></div>
            </h3>

            <div className="space-y-4 w-full relative">
              {status === "success" && (
                <div className="absolute -top-10 left-0 right-0 p-3 rounded-md text-xs bg-gradient-to-r from-green-400 to-teal-500 text-white shadow text-center font-semibold animate-pulse">
                  🎉 Thanks for subscribing!
                </div>
              )}
              {status === "error" && (
                <div className="absolute -top-10 left-0 right-0 p-3 rounded-md text-xs bg-red-600 text-white shadow text-center font-semibold">
                  ❌ Please fill all fields correctly.
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="text"
                  name="name"
                  value={subscribeData.name}
                  onChange={handleSubscribeChange}
                  placeholder="Full Name"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black bg-white text-black placeholder-gray-400 transition duration-200"
                />
                <input
                  type="email"
                  name="email"
                  value={subscribeData.email}
                  onChange={handleSubscribeChange}
                  placeholder="Email Address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black bg-white text-black placeholder-gray-400 transition duration-200"
                />
              </div>
              <button
                onClick={handleSubscribeSubmit}
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white text-sm rounded-lg hover:from-red-500 hover:to-purple-600 hover:shadow-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium transform hover:scale-105 active:scale-95"
              >
                {isSubmitting ? "Submitting..." : "Subscribe"}
              </button>

              {/* --- Contact Info --- */}
              <div className="mt-6 text-sm space-y-3">
                <div className="flex items-center gap-2 text-gray-600 hover:text-black transition duration-200">
                  <Phone className="text-black w-5 h-5" />
                  <p className="text-gray-800">+880 1794 491 902</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600 hover:text-black transition duration-200">
                  <Mail className="text-black w-5 h-5" />
                  <p className="text-gray-800">jahidhasan.en@gmail.com</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600 hover:text-black transition duration-200">
                  <MapPin className="text-black w-5 h-5" />
                  <p className="text-gray-800">Sylhet, Bangladesh</p>
                </div>

                {/* --- Social Icons --- */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    { platform: "Facebook", icon: Facebook, href: "https://www.facebook.com/jahidhasan2950" },
                    { platform: "Instagram", icon: Instagram, href: "https://www.instagram.com/desingingbyjahid56/" },
                    { platform: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/jahid-hasan-600262326/" },
                    { platform: "GitHub", icon: Github, href: "https://github.com/JahidDesign" },
                    { platform: "WhatsApp", icon: MessageCircle, href: "https://wa.me/8801794491902" },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:scale-110 transition duration-200 transform hover:rotate-3"
                      aria-label={social.platform}
                      data-aos="zoom-in"
                      data-aos-delay={i * 100}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div
          data-aos="fade-up"
          className="border-t border-gray-200 pt-5 text-xs flex flex-col md:flex-row justify-between items-center w-full mt-10"
        >
          <p className="text-gray-500 text-center md:text-left">
            © 2025 Jahid Hasan. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <Link
              to="/terms"
              className="text-gray-500 hover:text-black transition duration-200 hover:underline"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="text-gray-500 hover:text-black transition duration-200 hover:underline"
            >
              Privacy
            </Link>
            <a
              href="https://wa.me/8801794491902"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-4 py-2 rounded-md text-xs font-medium hover:shadow-lg flex items-center gap-2 transition duration-200 transform hover:scale-105"
            >
              <Headphones className="w-4 h-4" />
              <span>Contact Me</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
