import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const API_URL = "https://jahids-reactfoliopro.onrender.com/PortfolioCarousel";

const HeroCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoSlideRef = useRef();
  const startX = useRef(0);

  // Fetch slides
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setSlides(data.data || []);
        setCurrentIndex(0);
      } catch (err) {
        console.error("Failed to fetch slides:", err);
      }
    };
    fetchSlides();
  }, []);

  const slideCount = slides.length;

  // Auto-slide every 6s
  useEffect(() => {
    if (slideCount === 0) return;
    autoSlideRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slideCount);
    }, 6000);

    return () => clearInterval(autoSlideRef.current);
  }, [slideCount]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    clearInterval(autoSlideRef.current);
    setCurrentIndex(prev => (prev === 0 ? slideCount - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    clearInterval(autoSlideRef.current);
    setCurrentIndex(prev => (prev + 1) % slideCount);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const handleTouchStart = e => (startX.current = e.touches[0].clientX);
  const handleTouchEnd = e => {
    const endX = e.changedTouches[0].clientX;
    if (startX.current - endX > 50) nextSlide();
    else if (endX - startX.current > 50) prevSlide();
  };

  const handleTitleChange = e => {
    const newTitle = e.target.value;
    setSlides(prevSlides =>
      prevSlides.map((slide, idx) =>
        idx === currentIndex ? { ...slide, title: newTitle } : slide
      )
    );
  };

  if (slideCount === 0)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <p className="text-gray-400 text-sm sm:text-base md:text-lg">Loading carousel...</p>
      </div>
    );

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full h-screen relative overflow-hidden bg-white">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/60 z-10"></div>
        <img
          key={currentIndex}
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-cover animate-[zoomIn_0.7s_ease-out]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent z-10"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
        {/* Top Bar - Counter and Meta */}
        <div className="flex justify-between items-start">
          {/* Slide Counter */}
          <div className="backdrop-blur-md bg-black/10 border border-black/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5">
            <span className="text-black font-bold text-xs sm:text-sm md:text-base lg:text-lg">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-black/60 mx-1 sm:mx-1.5 md:mx-2 text-xs sm:text-sm md:text-base">/</span>
            <span className="text-black/60 text-xs sm:text-sm md:text-base">{String(slideCount).padStart(2, '0')}</span>
          </div>

          {/* Tag */}
          {currentSlide.tag && (
            <div className="backdrop-blur-md bg-black/10 border border-black/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5">
              <span className="text-black text-[10px] sm:text-xs md:text-sm font-medium tracking-wider uppercase">
                {currentSlide.tag}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Content */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
          {/* Title - Editable */}
          <div className="max-w-5xl">
            <input
              type="text"
              value={currentSlide.title}
              onChange={handleTitleChange}
              className="w-full bg-transparent border-none outline-none text-black font-black tracking-tight leading-none transition-all duration-300 hover:text-gray-800
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
              style={{ 
                textShadow: '3px 3px 12px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.5)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            />
            <div className="h-0.5 sm:h-1 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-black to-transparent mt-3 sm:mt-4 md:mt-5 lg:mt-6"></div>
          </div>

          {/* Description */}
          <p className="text-gray-800 font-light leading-relaxed max-w-2xl
            text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
            style={{ textShadow: '1px 1px 4px rgba(255,255,255,0.8)' }}>
            {currentSlide.description}
          </p>

          {/* Caption and CTA Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
            {currentSlide.caption && (
              <p className="text-gray-600 italic font-light text-[10px] sm:text-xs md:text-sm lg:text-base">
                {currentSlide.caption}
              </p>
            )}
            
            {currentSlide.link && (
              <a
                href={currentSlide.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 backdrop-blur-md bg-black text-white border-2 border-black
                  px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4
                  text-[10px] sm:text-xs md:text-sm lg:text-base
                  font-bold tracking-wider uppercase transition-all duration-300
                  hover:bg-transparent hover:text-black hover:scale-105 active:scale-95"
              >
                View Project
                <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slideCount > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30
              w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
              backdrop-blur-md bg-black/10 border-2 border-black/30
              flex items-center justify-center group transition-all duration-300
              hover:bg-black hover:border-black hover:scale-110 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-black group-hover:text-white transition-colors" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30
              w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
              backdrop-blur-md bg-black/10 border-2 border-black/30
              flex items-center justify-center group transition-all duration-300
              hover:bg-black hover:border-black hover:scale-110 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-black group-hover:text-white transition-colors" />
          </button>
        </>
      )}

      {/* Dot Navigation */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 right-4 sm:right-6 md:right-8 lg:right-12 flex flex-col gap-2 sm:gap-2.5 md:gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(idx);
                setTimeout(() => setIsTransitioning(false), 700);
              }
            }}
            className={`w-0.5 sm:w-1 transition-all duration-300 ${
              idx === currentIndex 
                ? "h-8 sm:h-10 md:h-12 lg:h-14 bg-black shadow-lg shadow-black/50" 
                : "h-4 sm:h-6 md:h-8 lg:h-10 bg-black/30 hover:bg-black/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Touch Area for Swipe */}
      <div
        className="absolute inset-0 z-25"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      {/* CSS Animation */}
      <style>{`
        @keyframes zoomIn {
          from {
            transform: scale(1.1);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;