// File: src/pages/Testimonials.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_URL = "https://jahids-reactfoliopro.onrender.com/testimonials";

// Animation variants for cards
const slideVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          setTestimonials(json.data);
        } else {
          setTestimonials([]);
          console.warn("Unexpected testimonials response:", json);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Build Your Future <br /> with Confidence
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Explore success stories and inspiring words from our learners and
              professionals. Your growth journey starts here.
            </p>
            <a
              href="#testimonials"
              className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              See Testimonials
            </a>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="https://illustrations.popsy.co/white/work-from-home.svg"
              alt="Hero Illustration"
              className="w-80 md:w-[400px] drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-0 sm:px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">
            Testimonials
          </h2>

          {testimonials.length === 0 ? (
            <p className="text-center text-gray-500">No testimonials found.</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10} // small gap for mobile
              slidesPerView={1} // full-width cards on mobile
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              className="py-4"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t._id}>
                  <motion.div
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition w-full flex flex-col"
                  >
                    {/* Profile */}
                    <div className="flex flex-col items-center md:items-start">
                      <img
                        src={t.image || "https://via.placeholder.com/150"}
                        alt={t.name}
                        className="w-20 h-20 rounded-full mb-4 shadow-md border-2 border-blue-500 object-cover"
                      />
                      <h3 className="text-lg font-semibold text-gray-800 text-center md:text-left">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-500 text-center md:text-left">
                        {t.role} {t.institute && `@ ${t.institute}`}
                      </p>

                      {t.batch && (
                        <span className="mt-2 inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                          Batch {t.batch}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <p className="text-gray-700 text-sm mt-6 leading-relaxed text-center md:text-left">
                      “{t.message}”
                    </p>

                    {/* Website */}
                    {t.website && (
                      <div className="mt-6 flex justify-center md:justify-start">
                        <a
                          href={t.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
