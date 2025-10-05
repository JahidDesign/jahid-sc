// File: Subscribers.jsx
import React, { useState, useEffect } from "react";
import { Users, Mail, Sparkles } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const Subscribers = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [existingEmails, setExistingEmails] = useState(new Set());

  // Fetch existing subscribers
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch("http://localhost:3000/subscribers");
        if (!res.ok) throw new Error("Failed to fetch subscribers");
        const data = await res.json();
        setSubscriberCount(data.length);
        setExistingEmails(new Set(data.map((sub) => sub.email.toLowerCase())));
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubscribers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailLower = form.email.toLowerCase();

    if (!form.name || !form.email) {
      toast.error("⚠️ Name and email required");
      return;
    }
    if (!isValidEmail(form.email)) {
      toast.error("❌ Invalid email address");
      return;
    }
    if (existingEmails.has(emailLower)) {
      toast.error("❌ Already subscribed");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("http://localhost:3000/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, email: emailLower }),
      });
      if (!res.ok) throw new Error("Failed to subscribe");

      toast.success("🎉 Subscribed!");
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#0f172a", "#1e293b", "#6366f1"],
      });

      setForm({ name: "", email: "" });
      setSubscriberCount((prev) => prev + 1);
      setExistingEmails((prev) => new Set(prev).add(emailLower));
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6 py-16">

        {/* Left: Form & Text */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
          >
            Subscribe & Stay <span className="text-indigo-600">Ahead</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-lg text-gray-600 mb-8 max-w-lg"
          >
            Join{" "}
            <span className="font-semibold text-gray-900">
              {subscriberCount.toLocaleString()}+
            </span>{" "}
            professionals who get weekly insights, curated tools, and industry
            news delivered straight to their inbox.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl p-8 rounded-xl"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-900 bg-transparent border-b border-gray-400 focus:border-indigo-600 focus:ring-0 outline-none text-lg placeholder-gray-500 transition"
              />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-900 bg-transparent border-b border-gray-400 focus:border-indigo-600 focus:ring-0 outline-none text-lg placeholder-gray-500 transition"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold uppercase tracking-wide hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {submitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-6">
              By subscribing, you agree to our{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid sm:grid-cols-3 gap-6 mt-12"
          >
            {[
              { icon: Mail, title: "Curated", description: "Exclusive insights weekly." },
              { icon: Users, title: "Community", description: "Join thousands of pros." },
              { icon: Sparkles, title: "Early Access", description: "Trends before they go mainstream." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{ duration: 0.3 }}
                className="text-center bg-white border border-gray-200 shadow-sm p-6 transition"
              >
                <feature.icon className="w-8 h-8 mx-auto text-indigo-600 mb-3" />
                <h3 className="text-md font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: Animated SVG Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="hidden md:flex justify-center items-center"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-full max-w-md h-64 bg-indigo-50 flex items-center justify-center rounded-xl shadow-lg text-indigo-600 font-bold text-2xl"
          >
            📧 Newsletter
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscribers;
