import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/management";

export default function ManagementCards() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPrograms(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch programs");
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600">Loading programs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-red-600 text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8">
        <div className="text-center">
          <div className="inline-block mb-4">
            <span className="text-5xl sm:text-6xl lg:text-7xl">🎓</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Education Programs
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            A timeline of academic programs and milestones, showcasing completed
            certificates and degrees.
          </p>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="relative">
          {/* Connecting Lines - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none">
            <svg className="w-full h-full" style={{ position: 'absolute' }}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#c084fc" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f472b6" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {programs.map((_, index) => {
                if (index === programs.length - 1) return null;
                
                const isEvenRow = Math.floor(index / 3) % 2 === 0;
                const posInRow = index % 3;
                const nextPosInRow = (index + 1) % 3;
                
                // Same row connection
                if (posInRow < 2 && nextPosInRow > posInRow) {
                  return (
                    <line
                      key={`line-${index}`}
                      x1={`${(posInRow + 1) * 33.33}%`}
                      y1={`${Math.floor(index / 3) * 400 + 150}px`}
                      x2={`${nextPosInRow * 33.33}%`}
                      y2={`${Math.floor(index / 3) * 400 + 150}px`}
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      strokeDasharray="8,8"
                    />
                  );
                }
                
                // Row to row connection
                if (nextPosInRow === 0) {
                  return (
                    <path
                      key={`line-${index}`}
                      d={`M ${(posInRow + 0.5) * 33.33}% ${Math.floor(index / 3) * 400 + 200}px 
                          Q ${(posInRow + 0.5) * 33.33}% ${Math.floor(index / 3) * 400 + 300}px,
                            ${16.67}% ${(Math.floor(index / 3) + 1) * 400 + 100}px`}
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="8,8"
                    />
                  );
                }
                
                return null;
              })}
            </svg>
          </div>

          {/* Cards Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {programs.map((program, index) => (
              <div
                key={program._id || program.id || index}
                className="group relative"
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute -left-4 top-20 w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full items-center justify-center shadow-lg z-10">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

                <div className="relative bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-100 transition-all duration-300 overflow-hidden">
                  {/* Gradient Accent */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>
                  
                  {/* Image */}
                  <div className="relative pt-8 flex justify-center">
                    <div className="relative">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white shadow-lg ring-4 ring-white overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <img
                          className="w-full h-full object-cover"
                          src={program.imageUrl}
                          alt={program.programName}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative px-6 pb-6 pt-4">
                    <div className="text-center">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                        {program.programName}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600 font-medium mb-1">
                        {program.instituteName}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4">
                        {program.year}
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
                        {program.description}
                      </p>
                    </div>

                    {/* Skills */}
                    {program.skills && program.skills.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2">
                        {program.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-medium border border-indigo-100 hover:border-indigo-200 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {programs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📚</span>
            </div>
            <p className="text-gray-600 text-lg">No programs available yet</p>
          </div>
        )}
      </div>
    </div>
  );
}