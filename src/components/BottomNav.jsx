// File: src/components/BottomNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Briefcase,
  BookOpen,
  Mail,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: User },
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Blog", path: "/blog", icon: BookOpen },
    { name: "Skills", path: "/skills", icon: Award },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <div className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
      <div className="flex justify-around items-center bg-white/20 backdrop-blur-2xl border border-white/30 shadow-xl rounded-full px-3 py-2 w-[95vw] max-w-md">
        {navItems.map(({ name, path, icon: Icon }) => {
          const active = location.pathname === path;

          return (
            <motion.div
              key={name}
              whileTap={{ scale: 0.9 }}
              className="relative flex-1 flex justify-center"
            >
              <Link
                to={path}
                className={`flex flex-col items-center gap-1 text-[11px] transition-all duration-200 ${
                  active
                    ? "text-blue-600 font-semibold"
                    : "text-gray-500 hover:text-blue-500"
                }`}
              >
                <motion.div
                  className={`p-2 rounded-full ${
                    active
                      ? "bg-blue-100/50 shadow-inner backdrop-blur-md"
                      : ""
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      active ? "text-blue-600" : "text-gray-600"
                    }`}
                  />
                </motion.div>
                <span className="tracking-tight">{name}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
