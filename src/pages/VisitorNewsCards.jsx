// File: src/components/VisitorNewsCards.jsx
import { useEffect, useState } from "react";
import { Calendar, ArrowRight, TrendingUp, Zap, Star, Sparkles, TrendingUp as Growth, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ITEMS_PER_PAGE = 6;
const API_URL = "https://jahids-reactfoliopro.onrender.com/visitors";

const VisitorNewsCards = () => {
  const [visitors, setVisitors] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        const data = await res.json();
        setVisitors(data);
        setIsVisible(true);
        const cats = ["All", ...new Set(data.map((item) => item.category || "Uncategorized"))];
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch visitors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisitors();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      Technology: "from-blue-500 via-cyan-500 to-teal-500",
      Events: "from-purple-500 via-pink-500 to-rose-500",
      Health: "from-green-500 via-emerald-500 to-teal-500",
      Education: "from-orange-500 via-red-500 to-pink-500",
      Healthcare: "from-cyan-500 via-blue-500 to-indigo-500",
      Sustainability: "from-green-500 via-lime-500 to-emerald-500",
      default: "from-gray-500 via-slate-500 to-gray-600",
    };
    return colors[category] || colors.default;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Technology: Zap,
      Events: Star,
      Health: Sparkles,
      Education: Growth,
      Healthcare: Star,
      Sustainability: Sparkles,
      default: Growth,
    };
    const IconComponent = icons[category] || icons.default;
    return <IconComponent className="w-4 h-4" />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const filteredVisitors =
    filter === "All"
      ? visitors
      : visitors.filter((v) => v.category === filter);

  const totalPages = Math.ceil(filteredVisitors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedVisitors = filteredVisitors.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading latest news...
      </div>
    );
  }

  if (!visitors || visitors.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              News & Events
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with our latest innovations, exclusive events, and industry insights.
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-end mb-8">
          <div className="relative w-full sm:w-auto">
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none border border-gray-300 rounded-xl py-2 px-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm w-full sm:w-auto"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-2.5 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* ✅ Mobile Auto Slide (Swiper) */}
        <div className="block md:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1.1}
            centeredSlides
            loop
            className="pb-8"
          >
            {displayedVisitors.map((visitor) => (
              <SwiperSlide key={visitor._id}>
                <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={visitor.image}
                      alt={visitor.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div
                      className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${getCategoryColor(
                        visitor.category
                      )} text-white text-xs font-bold rounded-xl`}
                    >
                      {getCategoryIcon(visitor.category)} {visitor.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      {visitor.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {visitor.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(visitor.createdAt)}
                      </div>
                      <Link
                        to={`/visitor/${visitor._id}`}
                        className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(
                          visitor.category
                        )} text-white font-semibold text-sm rounded-xl flex items-center gap-2`}
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ✅ Desktop Grid View */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          {displayedVisitors.map((visitor) => (
            <div
              key={visitor._id}
              className="group relative bg-white/90 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:scale-[1.03] transition-transform duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={visitor.image}
                  alt={visitor.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                />
                <div
                  className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${getCategoryColor(
                    visitor.category
                  )} text-white text-xs font-bold rounded-xl`}
                >
                  {getCategoryIcon(visitor.category)} {visitor.category}
                </div>
                {visitor.trending && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-xl animate-pulse">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-black text-gray-900 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {visitor.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {visitor.description}
                </p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200/50">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {formatDate(visitor.createdAt)}
                  </div>
                  <Link
                    to={`/visitor/${visitor._id}`}
                    className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(
                      visitor.category
                    )} text-white font-bold text-sm rounded-xl hover:shadow-lg flex items-center gap-2`}
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination (Desktop Only) */}
        {totalPages > 1 && (
          <div className="hidden md:flex justify-center items-center gap-2 mt-4 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-indigo-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorNewsCards;
