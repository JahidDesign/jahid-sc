// File: src/components/admin/Sidebar.jsx
import { useState, useContext, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// ---------------- Inline SVG Icons ----------------
const SvgIcon = {
  Carousel: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
    </svg>
  ),
  Blog: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16v-14H4v14zm4-12h8v2H8v-2zM8 11h8v2H8v-2zM8 15h5v2H8v-2z" />
    </svg>
  ),
  Services: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m16.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l1.414-1.414M6.05 6.05L4.636 7.464" />
    </svg>
  ),
  Projects: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10h18V7H3zm4 2h10v6H7V9z" />
    </svg>
  ),
  Certificate: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 2h10a2 2 0 012 2v16l-7-3-7 3V4a2 2 0 012-2z" />
    </svg>
  ),
  Skills: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3 7h7l-5.5 4.5 2 7-6-4-6 4 2-7L2 9h7l3-7z" />
    </svg>
  ),
  About: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="7" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
    </svg>
  ),
  Testimonial: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h8m-8 4h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 20h14v-2H5v2zm0-16h14V4H5v2z" />
    </svg>
  ),
  Eye: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Settings: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  ChevronDown: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  ),
  ChevronLeft: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Menu: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
};

// ---------------- Sidebar Component ----------------
const Sidebar = () => {
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);

  const [openMenus, setOpenMenus] = useState({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = (path) => setOpenMenus(prev => ({ ...prev, [path]: !prev[path] }));

  // ---------------- Navigation Links ----------------
  const navLinks = useMemo(() => [
    {
      name: "Dashboard",
      path: "/admin",
      icon: SvgIcon.Eye,
      roles: ["admin", "agent"],
      subLinks: []
    },
    {
      name: "Carousel",
      path: "/admin/hero-section",
      icon: SvgIcon.Carousel,
      roles: ["admin"],
      subLinks: [
        { name: "Add Carousel", path: "/admin/hero-section/add" },
        { name: "Edit Carousel", path: "/admin/hero-section/edit" },
      ]
    },
    {
      name: "Blog",
      path: "/admin/management-blog",
      icon: SvgIcon.Blog,
      roles: ["admin", "agent"],
      subLinks: [
        { name: "Add Blog", path: "/admin/management-blog/add" },
        { name: "Edit Blog", path: "/admin/management-blog/edit" },
      ]
    },
    {
      name: "Services",
      path: "/admin/management-services",
      icon: SvgIcon.Services,
      roles: ["admin", "agent"],
      subLinks: [
        { name: "Add Service", path: "/admin/management-services/add" },
        { name: "Edit Service", path: "/admin/management-services/edit" },
      ]
    },
    {
      name: "Education",
      path: "/admin/management-education",
      icon: SvgIcon.Services,
      roles: ["admin", "agent"],
      subLinks: [
        { name: "Add Service", path: "/admin/management-education/add" },
        { name: "Edit Service", path: "/admin/management-education/edit" },
      ]
    },
    {
      name: "Projects",
      path: "/admin/management-projects",
      icon: SvgIcon.Projects,
      roles: ["admin", "agent"],
      subLinks: [
        { name: "Add Project", path: "/admin/management-projects/add" },
        { name: "Edit Project", path: "/admin/management-projects/edit" },
      ]
    },
    {
      name: "Certificates",
      path: "/admin/management-certificates",
      icon: SvgIcon.Certificate,
      roles: ["admin", "agent"],
      subLinks: [
        { name: "Add Certificate", path: "/admin/management-certificates/add" },
        { name: "Edit Certificate", path: "/admin/management-certificates/edit" },
      ]
    },
    {
      name: "Skills",
      path: "/admin/management-skills",
      icon: SvgIcon.Skills,
      roles: ["admin", "agent"],
      subLinks: [
        { name: "Add Skill", path: "/admin/management-skills/add" },
        { name: "Edit Skill", path: "/admin/management-skills/edit" },
      ]
    },
    {
      name: "About",
      path: "/admin/management-aboutme",
      icon: SvgIcon.About,
      roles: ["admin", "agent"],
      subLinks: [
        { name: "Add About", path: "/admin/management-aboutme/add" },
        { name: "Edit About", path: "/admin/management-aboutme/edit" },
      ]
    },
    {
      name: "Testimonials",
      path: "/admin/management-testimonials",
      icon: SvgIcon.Testimonial,
      roles: ["admin", "agent"],
      subLinks: [
        { name: "Add Testimonial", path: "/admin/management-testimonials/add" },
        { name: "Edit Testimonial", path: "/admin/management-testimonials/edit" },
      ]
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: SvgIcon.Settings,
      roles: ["admin", "agent"],
      subLinks: []
    },
  ], [user?.role]);

  const isLinkActive = (path) => pathname === path || pathname.startsWith(path + "/");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`h-screen bg-slate-900 text-white fixed overflow-y-auto flex flex-col transition-all duration-300 z-40
          ${isCollapsed ? "w-20" : "w-72"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-72"}
          lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between gap-3">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-[10px] md:text-xs text-slate-400">
                  Management Dashboard
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors hidden lg:block"
          >
            {isCollapsed ? SvgIcon.ChevronRight : SvgIcon.ChevronLeft}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-2 flex-1 overflow-y-auto space-y-1 text-sm md:text-base">
          {navLinks.filter(link => link.roles.includes(user?.role)).map(({ name, path, icon, subLinks }) => {
            const isActive = isLinkActive(path);
            const isOpen = openMenus[path] || subLinks.some(sub => pathname === sub.path);

            return (
              <div key={name} className="group">
                <button
                  onClick={() => toggleMenu(path)}
                  aria-expanded={isOpen}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300
                    ${isActive ? "bg-slate-700 text-white" : "hover:bg-slate-800/50 text-slate-300 hover:text-white"}`}
                >
                  <div className="shrink-0">{icon}</div>
                  {!isCollapsed && <span className="font-medium">{name}</span>}
                  {!isCollapsed && subLinks.length > 0 && <div className={`ml-auto ${isOpen ? "rotate-180" : ""}`}>{SvgIcon.ChevronDown}</div>}
                </button>

                {/* Submenu */}
                {!isCollapsed && subLinks.length > 0 && (
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                    <div className="ml-6 space-y-1 border-l-2 border-slate-700/50 pl-2">
                      {subLinks.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className={`block text-xs md:text-sm px-3 py-1 rounded-lg transition-all duration-300
                            ${pathname === sub.path ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/40"}`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 bg-gradient-to-t from-slate-900 to-transparent">
            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">👤</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-white">{user?.name || "Admin User"}</p>
                <p className="text-xs text-slate-400">{user?.status || "Online"}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-lg shadow-lg lg:hidden"
      >
        {SvgIcon.Menu}
      </button>
    </div>
  );
};

export default Sidebar;
