// File: src/App.jsx
import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import AppRoutes from "./Routes/Routes"; // Your main routes file

// ---------------- Layout Component ----------------
function Layout() {
  const location = useLocation();

  // Routes where Navbar/Footer/BottomNav should be hidden
  const hideLayout = [
    "/login",
    "/register",
    "/404",
    "/admin",
    "/agent",
    "/customer"
  ];

  // Check if current path matches exactly OR starts with any hidden route
  const shouldHide = hideLayout.some(route =>
    location.pathname === route || location.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHide && <Navbar />}
      <AppRoutes /> {/* All your Routes */}
      {!shouldHide && <Footer />}
      {!shouldHide && <BottomNav />} {/* Only visible on small devices */}
    </>
  );
}

// ---------------- App Component ----------------
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
