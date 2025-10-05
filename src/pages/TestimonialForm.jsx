// File: src/components/TestimonialForm.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:3000/testimonials";

const TestimonialForm = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    institute: "",
    batch: "",
    message: "",
    image: "",
    website: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your testimonial has been submitted successfully.",
          confirmButtonColor: "#2563EB",
        });

        setFormData({
          name: "",
          role: "",
          institute: "",
          batch: "",
          message: "",
          image: "",
          website: "",
        });
        setStep(1);

        if (onSuccess) onSuccess();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong. Please try again.",
          confirmButtonColor: "#2563EB",
        });
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Network error. Please try again later.",
        confirmButtonColor: "#2563EB",
      });
    }
  };

  const variants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div id="add-testimonial" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📝 Share Your Testimonial
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6 relative min-h-[400px]">
          <AnimatePresence exitBeforeEnter>
            {step === 1 && (
              <motion.div
                key="step1"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      placeholder="Student, Mentor, etc."
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institute / Company
                    </label>
                    <input
                      type="text"
                      name="institute"
                      placeholder="Your institute or company"
                      value={formData.institute}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Batch Number
                    </label>
                    <input
                      type="text"
                      name="batch"
                      placeholder="Batch number"
                      value={formData.batch}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testimonial *
                  </label>
                  <textarea
                    name="message"
                    placeholder="Write your testimonial here..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      placeholder="Paste your image link"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website Link
                    </label>
                    <input
                      type="url"
                      name="website"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-4 mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition"
                  >
                    Submit Testimonial
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;
