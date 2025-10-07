import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Skills", path: "/skills" },
  { name: "Contact", path: "/contact" },
];

const UserMenu = ({ user, userRole, logout, closeMenu }) => (
  <div className="flex flex-col py-2">
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100/50">
      <div className="relative">
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt="avatar"
          className="w-11 h-11 rounded-full ring-2 ring-blue-500/20"
        />
        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 font-semibold text-sm truncate">
          {user?.displayName || "User"}
        </p>
        <p className="text-gray-500 text-xs truncate">{user?.email}</p>
      </div>
    </div>

    <div className="py-2 space-y-0.5">
      <Link
        to="/profile"
        onClick={closeMenu}
        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
      >
        Profile
      </Link>
      <Link
        to="/dashboard"
        onClick={closeMenu}
        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
      >
        Dashboard
      </Link>
      {userRole === "admin" && (
        <Link
          to="/admin"
          onClick={closeMenu}
          className="flex items-center gap-3 px-4 py-2.5 text-orange-600 hover:bg-orange-50 transition-colors text-sm font-semibold"
        >
          Admin Panel
        </Link>
      )}
    </div>

    <div className="border-t border-gray-100/50 pt-2 mt-1">
      <button
        onClick={() => {
          logout();
          closeMenu();
        }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
      >
        Logout
      </button>
    </div>
  </div>
);

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayName = user?.displayName || user?.name || user?.email?.split("@")[0] || "User";
  const photoURL = user?.photoURL || "/default-avatar.png";
  const userRole = user?.role || "customer";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.15, ease: "easeOut" } 
    },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0, 
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } 
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-gray-100" 
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <motion.img
                src="/JahidTheCoder.svg"
                alt="Logo"
                className="h-8 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group"
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gray-100 rounded-lg -z-10"
                      transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                    />
                  )}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-blue-600 transition-all duration-300 ${
                    location.pathname === link.path ? "w-6" : "w-0 group-hover:w-6"
                  }`} />
                </Link>
              ))}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 group"
                  >
                    <span className="text-sm font-medium text-gray-700 hidden xl:block">
                      {displayName}
                    </span>
                    <div className="relative">
                      <img
                        src={photoURL}
                        alt="avatar"
                        className="w-9 h-9 rounded-full ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                      >
                        <UserMenu
                          user={user}
                          userRole={userRole}
                          logout={logout}
                          closeMenu={() => setDropdownOpen(false)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="px-4 py-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === link.path
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {user ? (
                <div className="border-t border-gray-100 mt-4">
                  <UserMenu
                    user={user}
                    userRole={userRole}
                    logout={logout}
                    closeMenu={() => setMobileMenuOpen(false)}
                  />
                </div>
              ) : (
                <div className="px-4 py-6 border-t border-gray-100">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;