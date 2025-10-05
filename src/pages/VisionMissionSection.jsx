import React, { useState, useEffect, useRef } from 'react';

const VisionMissionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Cards for portfolio
  const cards = [
    {
      id: 'developer',
      icon: '💻',
      title: 'MERN Stack Developer',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      content:
        'I build responsive, modern web applications using MongoDB, Express.js, React.js, and Node.js. Clean code and scalable architecture are my priorities.',
      delay: 'delay-100',
    },
    {
      id: 'digital-marketer',
      icon: '📈',
      title: 'Digital Marketing Expert',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      content:
        'I create data-driven campaigns using SEO, Google Ads, Meta Ads, and analytics to boost engagement and conversions for businesses online.',
      delay: 'delay-200',
    },
    {
      id: 'designer',
      icon: '🎨',
      title: 'UI/UX & Graphic Designer',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      content:
        'Designing visually appealing websites, logos, and marketing graphics with tools like Figma and Canva is my forte.',
      delay: 'delay-300',
    },
    {
      id: 'strategist',
      icon: '🚀',
      title: 'Growth Strategist',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      content:
        'I help brands grow with strategic planning, market research, and performance optimization across web and social platforms.',
      delay: 'delay-400',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-gray-50 to-white py-24 px-6 md:px-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold rounded-full border border-blue-200 inline-block mb-6">
            My Expertise
          </span>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Building Web Experiences
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-700 bg-clip-text text-transparent">
              & Driving Growth
            </span>
          </h2>
          <div className="flex justify-center mb-8">
            <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
            I combine technical development with digital marketing to create solutions that not only look great but deliver measurable results.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`group relative transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              } ${card.delay}`}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Card Background Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110`}
              ></div>

              {/* Card */}
              <div
                className={`relative bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 h-full`}
              >
                {/* Icon and Title */}
                <div className="flex items-center mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}
                  >
                    {card.icon}
                  </div>
                  <div className="ml-4">
                    <h3
                      className={`text-2xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
                    >
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-700 text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {card.content}
                </p>

                {/* Decorative Element */}
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${card.gradient} rounded-full blur-2xl`}
                  ></div>
                </div>

                {/* Bottom Accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-lg rounded-3xl p-8 border border-gray-200 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Let’s Build Something Amazing Together!
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              I’m available for MERN stack projects, freelance digital marketing campaigns, or collaborations. Let’s make an impact online.
            </p>
            {/* Hire Me Button */}
            <a
              href="mailto:jahidhasan.en@gmail.com?subject=Freelance%20Project%20Inquiry&body=Hi%20Jahid,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0D%0A%0D%0ARegards,"
              className="group relative inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Hire Me
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
