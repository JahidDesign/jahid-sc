// File: AdminNavbar.jsx
import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Search,
  Settings,
  LogOut,
  User,
  Home,
  Menu,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

// --- Notifications Dropdown ---
const NotificationsDropdown = ({ notifications, onClose }) => {
  const unreadCount = notifications.filter((n) => n.unread).length;
  return (
    <div className="absolute right-0 top-12 w-80 max-w-xs bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Notifications</h3>
        <p className="text-xs text-gray-500">{unreadCount} unread</p>
      </div>
      <div className="max-h-64 overflow-y-auto scrollbar-thin">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
              n.unread ? "bg-blue-50/50 border-l-2 border-l-blue-500" : ""
            }`}
          >
            <p className="text-sm text-gray-800">{n.text}</p>
            <p className="text-xs text-gray-500 mt-1">{n.time}</p>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 border-t border-gray-100">
        <button
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          onClick={onClose}
        >
          View all notifications
        </button>
      </div>
    </div>
  );
};

// --- Profile Dropdown ---
const ProfileDropdown = ({ user, logout }) => (
  <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50">
    <div className="px-4 py-3 border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt="Admin"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-800">
            {user?.displayName || user?.name}
          </p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>
    </div>
    <div className="py-1">
      <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
        <User className="w-4 h-4" />
        <span>Profile Settings</span>
      </button>
      <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
        <Settings className="w-4 h-4" />
        <span>Preferences</span>
      </button>
      <hr className="my-2" />
      <button
        onClick={logout}
        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>
    </div>
  </div>
);

// --- Main Navbar ---
const AdminNavbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const notifications = [
    { id: 1, text: "New user registration", time: "2 min ago", unread: true },
    { id: 2, text: "Server maintenance scheduled", time: "1 hour ago", unread: true },
    { id: 3, text: "Monthly report ready", time: "3 hours ago", unread: false },
  ];
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Breadcrumbs
  const formatPathSegments = (path) => {
    const segments = path
      .replace(/^\/dashboard/, "")
      .split("/")
      .filter(Boolean);
    return [
      { name: "Home", path: "/" },
      ...segments.map((segment, idx) => ({
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        path: "/dashboard/" + segments.slice(0, idx + 1).join("/"),
      })),
    ];
  };
  const pathSegments = formatPathSegments(pathname);

  return (
    <div className="relative">
      <nav className="h-16 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-4 sm:px-6 shadow-sm fixed top-0 left-0 right-0 z-50">
        {/* Left: Breadcrumbs (collapsible on small) */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap max-w-[60%] sm:max-w-none overflow-hidden">
          {pathSegments.length > 2 ? (
            <>
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-1 text-sm px-2 py-1 rounded-full border bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none animate-gradient-slide"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <span className="text-gray-400">/</span>
              <div className="relative group">
                <button className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                  ...
                </button>
                <div className="absolute left-0 top-7 bg-white rounded-lg shadow-lg border border-gray-200 w-40 hidden group-hover:block z-50">
                  {pathSegments.slice(1, -1).map((segment, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(segment.path)}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      {segment.name}
                    </button>
                  ))}
                </div>
              </div>
              <span className="text-gray-400">/</span>
              <span className="text-sm font-medium text-gray-700">
                {pathSegments[pathSegments.length - 1].name}
              </span>
            </>
          ) : (
            pathSegments.map((segment, idx) => (
              <React.Fragment key={idx}>
                {idx !== 0 && <span className="text-gray-400">/</span>}
                <button
                  onClick={() => navigate(segment.path)}
                  className={`flex items-center space-x-1 text-sm px-2 py-1 rounded-full border ${
                    idx === 0
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none animate-gradient-slide"
                      : "text-gray-600 bg-gray-50"
                  }`}
                >
                  {idx === 0 && <Home className="w-4 h-4" />}
                  <span>{segment.name}</span>
                </button>
              </React.Fragment>
            ))
          )}
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
            />
          </div>
        </div>

        {/* Mobile Search Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="p-2 rounded-xl hover:bg-gray-100"
          >
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Settings */}
          <button className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group">
            <Settings className="w-5 h-5 text-gray-500 group-hover:text-gray-700 group-hover:rotate-90 transition-all duration-200" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
            >
              <Bell className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full animate-pulse shadow-lg">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <NotificationsDropdown
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>

          {/* Profile */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <div className="relative">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="Admin"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-200"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div className="hidden lg:block text-left max-w-[120px] truncate">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user.displayName || user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    showProfileDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showProfileDropdown && (
                <ProfileDropdown user={user} logout={logout} />
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 px-4 py-2 z-40 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
            />
          </div>
        </div>
      )}

      {/* Click outside overlay */}
      {(showProfileDropdown || showNotifications) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowProfileDropdown(false);
            setShowNotifications(false);
          }}
        />
      )}

      {/* Tailwind Gradient Animation */}
      <style>
        {`
          @keyframes gradient-slide {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-slide {
            background-size: 200% 200%;
            animation: gradient-slide 3s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default AdminNavbar;
