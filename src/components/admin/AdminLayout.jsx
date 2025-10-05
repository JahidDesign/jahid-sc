// File: src/components/admin/AdminLayout.jsx
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import { Outlet, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const AdminLayout = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Role check: only allow admin
  if (!user || !["admin"].includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Helmet SEO */}
      <Helmet>
        <title>Admin Dashboard | Portfolio Manager</title>
        <meta
          name="description"
          content="Manage portfolio projects, skills, testimonials, and site content from the admin dashboard."
        />
        <meta
          name="keywords"
          content="portfolio, admin, dashboard, management, projects, skills, testimonials"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Helmet>

      {/* Sidebar (Desktop + Mobile) */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-gray-200 bg-white transform lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-72">
        {/* Navbar */}
        <AdminNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content */}
        <main className="pt-16 p-6 w-full overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
