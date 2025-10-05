// File: PersonalAboutForm.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000/about";

export default function PersonalAboutForm() {
  const [formData, setFormData] = useState({
    name: "",
    intro: "",
    journey: "",
    skills: "",
    achievements: "",
    hobbies: "",
    whyWorkWithMe: "",
    cta: "",
    imageUrl: "",
  });

  const [showModal, setShowModal] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
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
          title: "Submitted!",
          text: "Your About section has been saved.",
          timer: 2000,
          showConfirmButton: false,
        });
        setShowModal(true);
      } else {
        Swal.fire({ icon: "error", title: "Error", text: "Failed to submit data" });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong!" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Personal About Form</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="intro"
          value={formData.intro}
          onChange={handleChange}
          placeholder="Short Intro"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="journey"
          value={formData.journey}
          onChange={handleChange}
          placeholder="Your Journey / Background"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Skills (e.g. React, Node.js)"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="achievements"
          value={formData.achievements}
          onChange={handleChange}
          placeholder="Achievements"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
          placeholder="Hobbies / Interests"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="whyWorkWithMe"
          value={formData.whyWorkWithMe}
          onChange={handleChange}
          placeholder="Why Work With Me?"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="cta"
          value={formData.cta}
          onChange={handleChange}
          placeholder="Call To Action (e.g. Hire Me)"
          className="w-full border p-2 rounded"
        />

        {/* Image URL */}
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Profile Image URL"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* Modal Preview */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <h3 className="text-xl font-bold text-center mb-3">Preview Data</h3>

            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
              />
            )}

            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Intro:</strong> {formData.intro}</p>
            <p><strong>Journey:</strong> {formData.journey}</p>
            <p><strong>Skills:</strong> {formData.skills}</p>
            <p><strong>Achievements:</strong> {formData.achievements}</p>
            <p><strong>Hobbies:</strong> {formData.hobbies}</p>
            <p><strong>Why Work With Me:</strong> {formData.whyWorkWithMe}</p>
            <p><strong>CTA:</strong> {formData.cta}</p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
