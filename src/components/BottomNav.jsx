// File: src/components/BottomNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Briefcase, BookOpen, Mail, Award } from "lucide-react"; // Added Award for Skills

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "About", path: "/about", icon: <User className="w-5 h-5" /> },
    { name: "Projects", path: "/projects", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Blog", path: "/blog", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Skills", path: "/skills", icon: <Award className="w-5 h-5" /> }, // Added Skills
    { name: "Contact", path: "/contact", icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-200/40 shadow-md">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ name, path, icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              className={`flex flex-col items-center justify-center px-3 py-1 text-xs transition-colors ${
                active ? "text-blue-600 font-semibold" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {icon}
              <span className="mt-1">{name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
