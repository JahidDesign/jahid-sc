import React, { useEffect, useState } from "react";
import { FaStar, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ReviewsCarouselLightBlue = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("https://jahids-reactfoliopro.onrender.com/users");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Animated Background Shapes */}
      <motion.div
        className="absolute w-72 h-72 bg-blue-200 rounded-full top-10 left-[-50px] opacity-40 filter blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-cyan-200 rounded-full bottom-0 right-[-100px] opacity-30 filter blur-3xl"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
      />
      <motion.div
        className="absolute w-24 h-24 bg-blue-100 rounded-full top-[40%] left-[20%] opacity-50 filter blur-2xl"
        animate={{ y: [-20, 20, -20] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-cyan-100 rounded-full top-[60%] right-[15%] opacity-40 filter blur-2xl"
        animate={{ y: [15, -15, 15], x: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      {/* Heading */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900">
          What Our Customers Say
        </h2>
        <p className="text-blue-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Trusted by clients worldwide. See why our customers love our services!
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={32}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="relative z-10 pb-12"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="bg-gradient-to-tr from-blue-100 via-cyan-100 to-blue-200 border border-blue-200 rounded-2xl p-8 shadow-lg transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={review.image || `https://i.pravatar.cc/150?img=${index + 10}`}
                  alt={review.name || "User"}
                  className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-md"
                />
                <div>
                  <h3 className="font-semibold text-blue-900 text-lg">{review.name || "Anonymous"}</h3>
                  <p className="text-blue-700 text-sm">{review.service || "Service Name"}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <FaStar
                    key={starIndex}
                    className={`${
                      starIndex < (review.rating || 0)
                        ? "text-yellow-400 drop-shadow-md"
                        : "text-blue-200"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-blue-800 italic leading-relaxed mb-6">
                "{review.comment || "No comment"}"
              </p>

              {/* Social Links */}
              <div className="flex gap-4 text-blue-900 text-lg">
                {review.social?.facebook && (
                  <a
                    href={review.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    <FaFacebookF />
                  </a>
                )}
                {review.social?.linkedin && (
                  <a
                    href={review.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-700 transition-colors"
                  >
                    <FaLinkedinIn />
                  </a>
                )}
                {review.social?.twitter && (
                  <a
                    href={review.social.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    <FaTwitter />
                  </a>
                )}
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ReviewsCarouselLightBlue;
