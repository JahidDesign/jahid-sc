// src/pages/Login.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Shield,
  Chrome,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://jahids-reactfoliopro.onrender.com";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Splash animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const loginUser = async (email, password) => {
    const res = await fetch(`${API_URL}/customers/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Login failed");
    }
    return res.json();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password)
      return Swal.fire("Missing fields", "Email and password required.", "warning");

    setLoading(true);
    try {
      const loginData = await loginUser(email, password);
      login(loginData.user, loginData.token);
      Swal.fire("Welcome!", "Logged in successfully.", "success").then(() =>
        navigate("/")
      );
    } catch (err) {
      Swal.fire("Login Failed", err.message || "Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const res = await fetch(`${API_URL}/customers/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Google login failed");
      }

      const loginData = await res.json();
      login(loginData.user, loginData.token);
      Swal.fire("Welcome!", "Signed in with Google!", "success").then(() =>
        navigate("/")
      );
    } catch (err) {
      Swal.fire("Google Sign-in Failed", err.message || "Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
        <Shield className="w-16 h-16 text-white animate-pulse" />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-gradient-to-r from-blue-50 via-purple-50 to-blue-100">
      <Helmet>
        <title>Login | Jahid’s Portfolio</title>
        <meta
          name="description"
          content="Login to Jahid’s React portfolio dashboard. Manage content, projects, and more securely."
        />
        <meta name="keywords" content="portfolio, login, react, firebase, jahid" />
        <link rel="icon" href="/favicon.png" />
      </Helmet>

      {/* Left Side Card */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex justify-center items-center p-6 md:p-12"
      >
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="avatar">
               <div className="w-24 rounded-full">
                 <img src="jaHid.svg" />
                 </div>
                </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign in to continue your journey</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                <Lock className="w-4 h-4" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                <>
                  Login <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full border border-gray-300 bg-white py-3 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-3 text-gray-700 shadow-sm transition-all"
          >
            <Chrome className="w-5 h-5 text-red-500" /> Sign in with Google
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-600 pt-5 text-sm">
            No account?{" "}
            <NavLink
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Register
            </NavLink>
          </p>
        </div>
      </motion.div>

      {/* Right Side Background */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 hidden md:flex items-center justify-center relative"
      >
        <img
          src="https://i.ibb.co.com/0VqYnqBL/jahidweb.jpg"
          alt="Portfolio background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-blue-800/40"></div>
        <div className="relative z-10 text-white text-center p-8">
          <h1 className="text-4xl font-bold mb-3">Jahid’s React Portfolio</h1>
          <p className="text-gray-200 max-w-md mx-auto">
            Modern design meets powerful authentication — built with React, Firebase, and Tailwind CSS.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
