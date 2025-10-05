// File: src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

// ---------------- Create Context ----------------
export const AuthContext = createContext();

// ---------------- Helper Function ----------------
const assignRole = (email) =>
  email === "jahidhasan.en@gmail.com" ? "admin" : "customer";

// ---------------- Provider ----------------
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName:
              firebaseUser.displayName || firebaseUser.email.split("@")[0],
            photoURL: firebaseUser.photoURL || "/default-avatar.png",
          };
          const userWithRole = {
            ...userData,
            token,
            role: assignRole(firebaseUser.email),
          };
          setUser(userWithRole);
          localStorage.setItem("user", JSON.stringify(userWithRole));
          localStorage.setItem("token", token);
        } catch (err) {
          console.error("❌ Error fetching Firebase token:", err);
        }
      } else {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Manual Login (in case of custom auth)
  const login = (userData, token) => {
    const userWithRole = {
      ...userData,
      token,
      role: assignRole(userData.email),
    };
    setUser(userWithRole);
    localStorage.setItem("user", JSON.stringify(userWithRole));
    localStorage.setItem("token", token);
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("❌ Firebase signOut error:", err);
    }
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        role: user?.role || "customer",
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ---------------- Hook ----------------
export const useAuth = () => useContext(AuthContext);
