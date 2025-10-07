import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";

const API_URL = "https://jahids-reactfoliopro.onrender.com";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // ---------------- Validation ----------------
  const validateField = (name, value) => {
    let error = "";
    if (name === "name" && (!value.trim() || value.trim().length < 2)) {
      error = "Name must be at least 2 characters.";
    }
    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      error = "Invalid email address.";
    }
    if (
      name === "password" &&
      !/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value)
    ) {
      error =
        "Password must be at least 6 characters with upper and lower case letters.";
    }
    if (name === "photo" && value.trim()) {
      try {
        new URL(value);
      } catch {
        error = "Invalid photo URL.";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // ---------------- Backend Calls ----------------
  const saveUserToBackend = async (userData) => {
    const res = await fetch(`${API_URL}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Failed to save user");
    return res.json();
  };

  const loginUser = async (email, password) => {
    const res = await fetch(`${API_URL}/customers/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  };

  const googleLogin = async (uid, email, name, photo) => {
    const res = await fetch(`${API_URL}/customers/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, email, name, photo }),
    });
    if (!res.ok) throw new Error("Google login failed");
    return res.json();
  };

  // ---------------- Submit Registration ----------------
  const handleRegister = async (e) => {
    e.preventDefault();

    const currentErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) currentErrors[key] = err;
    });
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length > 0) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: formData.name,
        ...(formData.photo ? { photoURL: formData.photo } : {}),
      });

      await saveUserToBackend({
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        photo: formData.photo,
        phone: formData.phone,
        role: "customer",
        status: "active",
      });

      const loginData = await loginUser(formData.email, formData.password);
      login(loginData.user, loginData.token);

      Swal.fire("Success!", "Account created successfully.", "success").then(() =>
        navigate("/")
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Google Sign Up ----------------
  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user.email) {
        Swal.fire("Google Error", "No email found for this account.", "error");
        return;
      }
      const loginData = await googleLogin(
        user.uid,
        user.email,
        user.displayName || "Google User",
        user.photoURL
      );
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

  // ---------------- UI ----------------
  return (
    <div
      className="relative flex min-h-screen justify-center items-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/9fWcWdX/singupbg.png')",
      }}
    >
      <Helmet>
        <title>Register | Jahid’s Portfolio</title>
        <meta
          name="description"
          content="Join Jahid’s professional network. Create your account to explore his projects, collaborations, and experiences."
        />
        <meta
          name="keywords"
          content="portfolio, register, developer, creative, firebase, react"
        />
        <link rel="icon" href="/portfolio.png" />
      </Helmet>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Glass Register Box */}
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center text-white mb-2 drop-shadow-md">
          Create Account
        </h2>
        <p className="text-center text-white/80 mb-6">
          Join Jahid’s professional journey
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          {["name", "email", "photo", "phone"].map((field) => (
            <div key={field}>
              <input
                name={field}
                type={
                  field === "email" ? "email" : field === "photo" ? "url" : "text"
                }
                placeholder={
                  field === "name"
                    ? "Full Name"
                    : field === "email"
                    ? "Email Address"
                    : field === "photo"
                    ? "Photo URL (Optional)"
                    : "Phone Number (Optional)"
                }
                value={formData[field]}
                onChange={handleChange}
                disabled={loading}
                className={`w-full bg-white/30 placeholder-white/70 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all ${
                  errors[field] ? "border border-red-400" : "border-none"
                }`}
              />
              {errors[field] && (
                <p className="text-red-300 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className={`w-full bg-white/30 placeholder-white/70 text-white px-4 py-3 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all ${
                errors.password ? "border border-red-400" : "border-none"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 hover:scale-[1.02] shadow-lg transition-all"
          >
            Register
          </button>
        </form>

        <div className="text-center text-white/70 my-4">— or —</div>

        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full bg-white/20 text-white py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-white/30 transition-all"
        >
          <FcGoogle size={22} /> Sign Up with Google
        </button>

        <p className="text-center mt-6 text-white/90">
          Already have an account?{" "}
          <NavLink to="/login" className="text-pink-300 underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
