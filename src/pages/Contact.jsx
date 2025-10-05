import React, { useState } from "react";
import { Send, Mail, MapPin, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import ContactCarousel from "./Hero/ContactCarousel.jsx";

const Contact = () => {
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  // Input handler
  const handleChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://jahids-reactfoliopro.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (res.ok) {
        setStatus("success");
        setContact({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* SEO */}
      <Helmet>
        <title>Contact Me | Jahid Hasan Portfolio</title>
        <meta
          name="description"
          content="Get in touch with Jahid Hasan — Web Developer & Digital Marketer. Let's collaborate on your next big idea."
        />
        <meta
          property="og:title"
          content="Contact Me | Jahid Hasan Portfolio"
        />
        <meta
          property="og:description"
          content="Reach out to Jahid Hasan for collaborations, projects, or just to say hi."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/contact" />
        <meta
          property="og:image"
          content="https://yourdomain.com/preview-contact.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      {/* Hero Section */}
      <ContactCarousel />

      {/* Map Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Find Me Here
            </h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Based in Sylhet, Bangladesh — Available worldwide for remote
              collaboration
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="bg-white shadow-2xl rounded-3xl p-2 border border-gray-200">
              <iframe
                className="w-full h-96 rounded-2xl"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55641.2239866104!2d91.81983580698457!3d24.899980493019733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375054d3d270329f%3A0xf58ef93431f67382!2sSylhet!5e1!3m2!1sen!2sbd!4v1758985580624!5m2!1sen!2sbd"
                frameBorder="0"
                allowFullScreen
                aria-hidden="false"
                title="Google Map Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="relative py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Get In Touch
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Have a project in mind or just want to chat? I'd love to hear
                from you. Drop me a message and let’s create something amazing
                together.
              </p>

              {/* Email */}
              <div className="group flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a
                    href="mailto:jahidhasan.en@gmail.com"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    jahidhasan.en@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="group flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">Sylhet, Bangladesh</p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Connect With Me
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://x.com/JahidHasan84323"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-500 hover:scale-110 transition"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M23 3a10.9 10.9..."></path>
                    </svg>
                  </a>
                  <a
                    href="https://github.com/JahidDesign"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:scale-110 transition"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M12 .297c-6.63 0..."></path>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jahid-hasan-600262326/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:scale-110 transition"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M19 0h-14c-2.761 0..."></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Send Me a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={contact.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-300 rounded-2xl py-4 px-6"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={contact.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-300 rounded-2xl py-4 px-6"
                    />
                  </div>

                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    value={contact.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl py-4 px-6 resize-none"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-8 rounded-2xl font-bold text-lg transition"
                  >
                    {status === "sending" ? (
                      <>
                        <div className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {status === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-green-800 text-center">
                      ✨ Message sent successfully!
                    </div>
                  )}
                  {status === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-center">
                      ❌ Failed to send message. Please try again.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
