// File: src/components/AboutMeForm.jsx
import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaFilePdf } from "react-icons/fa";

const API_URL = "http://localhost:3000/aboutme";

const steps = ["Basic Info", "Roles/Interests", "Social Links", "Images & CV", "Admin & Submit"];

const roleOptions = ["Web Developer", "Digital Marketing"];

const AboutMeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    roles: [],
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    profilePic: "",
    coverPic: "",
    cvLink: "",
    isAdmin: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});

  const socialIcons = {
    facebook: <FaFacebookF className="text-blue-600" />,
    twitter: <FaTwitter className="text-blue-400" />,
    linkedin: <FaLinkedinIn className="text-blue-700" />,
    instagram: <FaInstagram className="text-pink-500" />,
  };

  const validateStep = () => {
    let stepErrors = {};
    if (currentStep === 0) {
      if (!formData.name) stepErrors.name = "Name is required";
      if (!formData.email) stepErrors.email = "Email is required";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "roles") {
      let updatedRoles = [...formData.roles];
      if (checked) updatedRoles.push(value);
      else updatedRoles = updatedRoles.filter((r) => r !== value);
      setFormData({ ...formData, roles: updatedRoles });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        bio: "",
        roles: [],
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        profilePic: "",
        coverPic: "",
        cvLink: "",
        isAdmin: false,
      });
      setCurrentStep(0);
    } catch (err) {
      console.error(err);
      alert("Failed to save data");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">About Me</h2>

        {/* Step indicator */}
        <div className="flex justify-between mb-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded-full mx-1 ${
                index <= currentStep ? "bg-blue-600" : "bg-gray-300"
              } transition-all`}
            />
          ))}
        </div>

        {/* Step content */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                className={`peer w-full border rounded-xl p-4 pt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-gray-500 peer-focus:text-sm">
                Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                className={`peer w-full border rounded-xl p-4 pt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-gray-500 peer-focus:text-sm">
                Email
              </label>
            </div>

            <div className="relative">
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-xl p-4 pt-6 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-gray-500 peer-focus:text-sm">
                Bio
              </label>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Roles / Interests</h3>
            <div className="flex flex-col gap-2">
              {roleOptions.map((role) => (
                <label
                  key={role}
                  className="flex items-center space-x-2 border p-2 rounded-lg cursor-pointer hover:bg-blue-50"
                >
                  <input
                    type="checkbox"
                    name="roles"
                    value={role}
                    checked={formData.roles.includes(role)}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span>{role}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Social Links</h3>
            {["facebook", "twitter", "linkedin", "instagram"].map((social) => (
              <div key={social} className="relative flex items-center mb-2">
                <span className="absolute left-3">{socialIcons[social]}</span>
                <input
                  type="url"
                  name={social}
                  value={formData[social]}
                  onChange={handleChange}
                  placeholder={`Your ${social} profile`}
                  className="peer w-full border border-gray-300 rounded-xl p-4 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Profile, Cover & CV</h3>

            {/* Profile Pic */}
            <div>
              <input
                type="url"
                name="profilePic"
                value={formData.profilePic}
                onChange={handleChange}
                placeholder="Profile picture URL"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
              {formData.profilePic && (
                <img
                  src={formData.profilePic}
                  alt="Profile Preview"
                  className="mt-3 w-24 h-24 object-cover rounded-full shadow-md"
                />
              )}
            </div>

            {/* Cover Pic */}
            <div>
              <input
                type="url"
                name="coverPic"
                value={formData.coverPic}
                onChange={handleChange}
                placeholder="Cover picture URL"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
              {formData.coverPic && (
                <img
                  src={formData.coverPic}
                  alt="Cover Preview"
                  className="mt-3 w-full h-32 object-cover rounded-xl shadow-md"
                />
              )}
            </div>

            {/* CV Link */}
            <div>
              <input
                type="url"
                name="cvLink"
                value={formData.cvLink}
                onChange={handleChange}
                placeholder="CV / Resume URL (Google Drive / PDF link)"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
              {formData.cvLink && (
                <a
                  href={formData.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-blue-600 hover:underline font-medium"
                >
                  <FaFilePdf className="mr-2 text-red-500" /> View CV
                </a>
              )}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded"
              />
              <label className="text-gray-700 font-medium">Admin</label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold text-lg transition-all shadow-md hover:shadow-lg"
            >
              Submit
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentStep > 0 && currentStep < steps.length && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition"
            >
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              type="button"
              onClick={() => {
                if (validateStep()) setCurrentStep((prev) => prev + 1);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Next
            </button>
          )}
        </div>

        {submitted && (
          <p className="text-green-600 text-center font-medium mt-2 animate-fadeIn">
            ✅ Your info has been submitted!
          </p>
        )}
      </form>
    </div>
  );
};

export default AboutMeForm;
