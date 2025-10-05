// File: src/components/HeroSlider.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    // Fetch slides from backend
    const fetchSlides = async () => {
      try {
        const res = await fetch("https://jahids-reactfoliopro.onrender.com/HeroCarousel");
        const data = await res.json();
        setSlides(data);
      } catch (err) {
        console.error("Failed to load slides:", err);
      }
    };

    fetchSlides();
  }, []);

  return (
    <div className="relative w-full min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] bg-black">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full h-[70vh] sm:h-[75vh] md:h-[80vh]"
      >
        {slides.length > 0 ? (
          slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh]">
                {/* Background Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4 sm:px-6">
                  <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-snug">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-xs sm:max-w-md md:max-w-2xl mt-3 sm:mt-4">
                    {slide.description}
                  </p>
                  {slide.techStack && (
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-white/70">
                      <strong>Tech:</strong> {slide.techStack}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="flex items-center justify-center w-full h-[70vh] sm:h-[75vh] md:h-[80vh] bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center px-4">
              <h2 className="text-xl sm:text-3xl md:text-5xl font-bold leading-snug">
                🚀 No slides yet. Add one from the form!
              </h2>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
