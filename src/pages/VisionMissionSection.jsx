import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const VisionMissionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      id: "developer",
      icon: "💻",
      title: "MERN Stack Developer",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      content:
        "I build responsive, modern web applications using MongoDB, Express.js, React.js, and Node.js. Clean code and scalable architecture are my priorities.",
      delay: 100,
    },
    {
      id: "digital-marketer",
      icon: "📈",
      title: "Digital Marketing Expert",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      content:
        "I create data-driven campaigns using SEO, Google Ads, Meta Ads, and analytics to boost engagement and conversions for businesses online.",
      delay: 200,
    },
    {
      id: "designer",
      icon: "🎨",
      title: "UI/UX & Graphic Designer",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      content:
        "Designing visually appealing websites, logos, and marketing graphics with tools like Figma and Canva is my forte.",
      delay: 300,
    },
    {
      id: "strategist",
      icon: "🚀",
      title: "Growth Strategist",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      content:
        "I help brands grow with strategic planning, market research, and performance optimization across web and social platforms.",
      delay: 400,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-gray-50 to-white py-20 sm:py-24 lg:py-32 px-4 sm:px-10 lg:px-20 overflow-hidden"
    >
      {/* Floating Glows */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-pink-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <div
        className={`text-center relative z-10 transition-all duration-1000 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 scale-95"
        }`}
      >
        <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold rounded-full border border-blue-200 inline-block mb-6">
          My Expertise
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Building Web Experiences
          </span>
          <br />
          <span className="bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-700 bg-clip-text text-transparent">
            & Driving Growth
          </span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          I combine technical development with digital marketing to create
          solutions that not only look great but deliver measurable results.
        </p>
      </div>

      {/* Cards Section */}
      <div
        className="relative z-10 flex sm:grid sm:grid-cols-2 lg:grid-cols-2 gap-6 snap-y sm:snap-none overflow-y-scroll sm:overflow-visible h-screen sm:h-auto pb-20 sm:pb-0"
        style={{
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            data-aos="fade-up"
            data-aos-delay={card.delay}
            onMouseEnter={() => setActiveCard(card.id)}
            onMouseLeave={() => setActiveCard(null)}
            className={`snap-start flex-shrink-0 w-full sm:w-auto h-screen sm:h-auto flex justify-center items-center transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0 scale-95"
            }`}
          >
            <div
              className={`relative bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 max-w-lg w-[90%]`}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center text-3xl bg-gradient-to-r ${card.gradient} text-white rounded-2xl shadow-lg`}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3
                className={`text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent text-center`}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center px-2">
                {card.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div
        className={`relative z-10 mt-20 text-center transition-all duration-1000 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 scale-95"
        }`}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Let’s Build Something Amazing Together!
        </h3>
        <a
          href="https://wa.me/01794491902"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
        >
          💬 Contact Me on WhatsApp
        </a>
      </div>
    </section>
  );
};

export default VisionMissionSection;
