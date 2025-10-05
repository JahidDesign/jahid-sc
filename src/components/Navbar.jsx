import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, MoreVertical } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

// Navigation links without serial numbers
const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Skills", path: "/skills" },
  { name: "Contact", path: "/contact" },
];

// ---------------- User Menu ----------------
const UserMenu = ({ user, userRole, logout, closeMenu }) => (
  <div className="flex flex-col px-4 py-2 space-y-1">
    <div className="flex items-center gap-3 py-2">
      <img
        src={user?.photoURL || "/default-avatar.png"}
        alt="avatar"
        className="w-10 h-10 rounded-full border border-gray-300"
      />
      <div>
        <p className="text-gray-900 font-semibold">{user?.displayName || "User"}</p>
        <p className="text-gray-600 text-sm">{user?.email}</p>
      </div>
    </div>

    <Link
      to="/profile"
      onClick={closeMenu}
      className="px-3 py-2 rounded hover:bg-gray-100 text-gray-900"
    >
      Profile
    </Link>

    <Link
      to="/dashboard"
      onClick={closeMenu}
      className="px-3 py-2 rounded hover:bg-gray-100 text-gray-900"
    >
      Dashboard
    </Link>

    {userRole === "admin" && (
      <Link
        to="/admin"
        onClick={closeMenu}
        className="px-3 py-2 rounded hover:bg-gray-100 text-orange-600 font-medium"
      >
        Admin Panel
      </Link>
    )}

    <button
      onClick={() => {
        logout();
        closeMenu();
      }}
      className="px-3 py-2 rounded hover:bg-gray-100 text-red-500 text-left w-full"
    >
      Logout
    </button>
  </div>
);

// ---------------- Navbar ----------------
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayName =
    user?.displayName || user?.name || user?.email?.split("@")[0] || "User";
  const photoURL = user?.photoURL || "/default-avatar.png";
  const userRole = user?.role || "customer";

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-white shadow-lg border-b border-gray-200"
            : "bg-white shadow-md border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/JahidTheCoder.svg"
              alt="JahidTheCoder"
              className="w-36 h-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-gray-900 text-white"
                    : "text-gray-900 hover:text-black hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Profile dropdown */}
            {user ? (
              <div className="relative ml-4" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <span className="hidden xl:block text-gray-900">{displayName}</span>
                  <img
                    src={photoURL}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <ChevronDown
                    className={`w-4 h-4 text-gray-900 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl border border-gray-200 z-50">
                    <UserMenu
                      user={user}
                      userRole={userRole}
                      logout={logout}
                      closeMenu={() => setDropdownOpen(false)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors"
              >
                Login / Sign Up
              </Link>
            )}
          </div>

          {/* Mobile: Three-dot menu */}
          <div className="lg:hidden relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-full bg-gray-900 text-white shadow-lg hover:bg-black transition-colors"
            >
              <MoreVertical className="w-6 h-6" />
            </button>

            {mobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl border border-gray-200 z-50">
                <div className="flex flex-col px-4 py-2 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-900"
                    >
                      {link.name}
                    </Link>
                  ))}

                  {user ? (
                    <UserMenu
                      user={user}
                      userRole={userRole}
                      logout={logout}
                      closeMenu={() => setMobileMenuOpen(false)}
                    />
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded hover:bg-gray-100 text-gray-900 font-medium"
                    >
                      Login / Sign Up
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="h-20"></div> {/* spacing */}
    </>
  );
};

export default Navbar;
