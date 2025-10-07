import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowUpRight } from "lucide-react";

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
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-purple-200 text-lg font-light tracking-wide">Loading Experience...</p>
        </div>
      </div>
    );

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-[gradientShift_8s_ease-in-out_infinite]"></div>
      
      {/* Background Image with Modern Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          key={currentIndex}
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-cover animate-[fadeZoom_0.8s_ease-out]"
        />
        {/* Modern Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      {/* Main Content Container */}
      <div className="relative z-20 h-full flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20">
        {/* Top Bar - Counter and Meta */}
        <div className="flex justify-between items-start">
          {/* Slide Counter - Modern Glass Design */}
          <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-5 py-3 sm:px-6 sm:py-3.5 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <span className="text-white font-bold text-base sm:text-lg md:text-xl">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/40 mx-2 text-base sm:text-lg md:text-xl">/</span>
            <span className="text-white/60 text-base sm:text-lg md:text-xl">{String(slideCount).padStart(2, '0')}</span>
          </div>

          {/* Tag - Pill Design */}
          {currentSlide.tag && (
            <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-full px-5 py-3 sm:px-6 sm:py-3.5 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300">
              <span className="text-white text-xs sm:text-sm font-semibold tracking-widest uppercase">
                {currentSlide.tag}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Content */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {/* Title - Editable with Modern Typography */}
       <div className="max-w-4xl">
  <input
    type="text"
    value={currentSlide.title}
    onChange={handleTitleChange}
    className="w-full bg-transparent border-none outline-none text-white font-extrabold tracking-tight leading-tight transition-all duration-300 hover:text-purple-200
      text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl animate-[slideUp_0.6s_ease-out]"
    style={{
      textShadow:
        "0 0 60px rgba(168, 85, 247, 0.35), 0 0 30px rgba(59, 130, 246, 0.25)",
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      WebkitTextStroke: "0.6px rgba(255,255,255,0.1)",
    }}
  />
  <div className="h-1 w-20 bg-gradient-to-r from-purple-500 via-blue-500 to-transparent mt-3 sm:mt-4 rounded-full animate-[slideRight_0.8s_ease-out]"></div>
</div>


          {/* Description with Modern Styling */}
          <p className="text-gray-300 font-light leading-relaxed max-w-3xl
            text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl animate-[slideUp_0.8s_ease-out]"
            style={{ 
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              animationDelay: '0.2s',
              opacity: 0,
              animationFillMode: 'forwards'
            }}>
            {currentSlide.description}
          </p>

          {/* Caption and CTA Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8 animate-[slideUp_0.8s_ease-out]" style={{animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards'}}>
            {currentSlide.caption && (
              <p className="text-gray-400 italic font-light text-xs sm:text-sm md:text-base lg:text-lg flex items-center gap-2">
                <span className="w-8 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></span>
                {currentSlide.caption}
              </p>
            )}
            
            {currentSlide.link && (
              <a
                href={currentSlide.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 backdrop-blur-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white
                  px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5
                  text-xs sm:text-sm md:text-base lg:text-lg
                  font-bold tracking-wider uppercase transition-all duration-500 overflow-hidden
                  hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95 rounded-full"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative flex items-center gap-3">
                  View Project
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Modern Circular Design */}
      {slideCount > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 sm:left-6 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30
              w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
              backdrop-blur-xl bg-white/5 border border-white/10 rounded-full
              flex items-center justify-center group transition-all duration-300
              hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:border-transparent hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95
              disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white transition-transform group-hover:-translate-x-1" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 sm:right-6 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30
              w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
              backdrop-blur-xl bg-white/5 border border-white/10 rounded-full
              flex items-center justify-center group transition-all duration-300
              hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:border-transparent hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95
              disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white transition-transform group-hover:translate-x-1" />
          </button>
        </>
      )}

      {/* Dot Navigation - Modern Vertical Bars */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 right-6 sm:right-10 md:right-14 flex flex-col gap-3 z-30">
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
            className={`w-1 rounded-full transition-all duration-500 group relative ${
              idx === currentIndex 
                ? "h-12 sm:h-14 md:h-16 lg:h-20 bg-gradient-to-b from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50" 
                : "h-6 sm:h-8 md:h-10 bg-white/20 hover:bg-white/40 hover:h-8 sm:hover:h-10 md:hover:h-12"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          >
            {idx === currentIndex && (
              <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                {String(idx + 1).padStart(2, '0')}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ease-linear"
          style={{ width: `${((currentIndex + 1) / slideCount) * 100}%` }}
        ></div>
      </div>

      {/* Touch Area for Swipe */}
      <div
        className="absolute inset-0 z-25"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeZoom {
          from {
            transform: scale(1.15);
            opacity: 0;
            filter: blur(10px);
          }
          to {
            transform: scale(1);
            opacity: 1;
            filter: blur(0);
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideRight {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes gradientShift {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;