import React, { useState } from "react";

// Simple SVG icon components
const Phone = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const Mail = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MapPin = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Facebook = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Instagram = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C8.396 0 7.989.016 6.756.072 5.526.127 4.706.333 3.995.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.139C.333 4.85.127 5.67.072 6.9.016 8.134 0 8.54 0 12.017c0 3.476.016 3.882.072 5.116.055 1.23.26 2.05.558 2.761.306.789.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.711.297 1.531.503 2.761.558C7.989 23.984 8.396 24 11.872 24c3.476 0 3.882-.016 5.116-.072 1.23-.055 2.05-.26 2.761-.558.789-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.337 1.384-2.126.297-.711.503-1.531.558-2.761.056-1.234.072-1.64.072-5.116 0-3.476-.016-3.882-.072-5.116-.055-1.23-.26-2.05-.558-2.761-.306-.789-.718-1.459-1.384-2.126C19.209.935 18.54.63 17.751.63c-.711-.297-1.531-.503-2.761-.558C13.756.016 13.35 0 9.873 0h2.144zm-.081 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const Linkedin = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Github = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const Headphones = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
  </svg>
);

const ExternalLink = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const Footer = () => {
  const [subscribeData, setSubscribeData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribeChange = (e) => {
    setSubscribeData({ ...subscribeData, [e.target.name]: e.target.value });
  };

  const handleSubscribeSubmit = async () => {
    if (!subscribeData.name || !subscribeData.email) {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
      return;
    }
    
    setIsSubmitting(true);
    setStatus(null);
    
    try {
      // Simulate API call since we can't use localStorage or actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
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
    <footer className="bg-white text-black w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {/* Logo & About */}
          <div className="w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">Jahid Hasan</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-2">
              Full-stack developer building modern web apps with React, Node.js,
              and MongoDB.
            </p>
            <p className="text-xs text-gray-500">📍 Dhaka, Bangladesh</p>
          </div>

          {/* Explore */}
          <div className="w-full">
            <h3 className="text-black font-bold text-sm mb-3 relative">
              Explore
              <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-black rounded-full"></div>
            </h3>
            <ul className="space-y-2">
              {["Home", "About", "Projects", "Contact"].map((link, i) => (
                <li key={i}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-600 hover:text-black transition flex items-center group text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 group-hover:bg-black transition duration-200"></div>
                    <span className="group-hover:translate-x-1 transition duration-200 text-xs flex items-center">
                      {link}
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition duration-200" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 w-full">
            <h3 className="text-black font-bold text-sm mb-3 relative">
              Subscribe & Contact
              <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-black rounded-full"></div>
            </h3>

            <div className="space-y-3 w-full relative">
              {status === "success" && (
                <div className="absolute -top-8 left-0 right-0 p-2 rounded-md text-xs bg-black text-white shadow text-center font-medium animate-pulse">
                  🎉 Thanks for subscribing!
                </div>
              )}

              {status === "error" && (
                <div className="absolute -top-8 left-0 right-0 p-2 rounded-md text-xs bg-red-600 text-white shadow text-center font-medium">
                  ❌ Something went wrong. Please try again.
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="text"
                  name="name"
                  value={subscribeData.name}
                  onChange={handleSubscribeChange}
                  placeholder="Full Name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-black focus:border-black bg-white text-black placeholder-gray-400 transition duration-200"
                />
                <input
                  type="email"
                  name="email"
                  value={subscribeData.email}
                  onChange={handleSubscribeChange}
                  placeholder="Email Address"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-black focus:border-black bg-white text-black placeholder-gray-400 transition duration-200"
                />
              </div>
              <button
                onClick={handleSubscribeSubmit}
                disabled={isSubmitting}
                className="w-full py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 hover:shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? "Submitting..." : "Subscribe"}
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-4 text-sm space-y-2">
              <div className="flex items-center space-x-2 text-gray-600 hover:text-black transition duration-200">
                <Phone className="text-black w-4 h-4" />
                <p className="text-gray-800">+880 1730 031 888</p>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 hover:text-black transition duration-200">
                <Mail className="text-black w-4 h-4" />
                <p className="text-gray-800">jahid.dev@gmail.com</p>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 hover:text-black transition duration-200">
                <MapPin className="text-black w-4 h-4" />
                <p className="text-gray-800">Dhaka, Bangladesh</p>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  { platform: "Facebook", icon: Facebook, href: "https://facebook.com" },
                  { platform: "Instagram", icon: Instagram, href: "https://instagram.com" },
                  { platform: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
                  { platform: "GitHub", icon: Github, href: "https://github.com/codesmith10" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800 hover:scale-110 transition duration-200 transform hover:rotate-3"
                    aria-label={social.platform}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-4 text-xs flex flex-col md:flex-row justify-between items-center w-full mt-6">
          <p className="text-gray-500 text-center md:text-left">
            © 2025 Jahid Hasan. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <a 
              href="#" 
              className="text-gray-500 hover:text-black transition duration-200 hover:underline"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-black transition duration-200 hover:underline"
            >
              Privacy
            </a>
            <button className="bg-black text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-gray-800 flex items-center space-x-1 transition duration-200 transform hover:scale-105">
              <Headphones className="w-3 h-3" />
              <span>Contact Me</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;