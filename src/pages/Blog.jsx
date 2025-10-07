// File: src/pages/Blog.jsx
import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";

// ✅ Lazy Imports for performance optimization
const BlogFeed = lazy(() => import("./BlogCard"));
const VisitorNewsCards = lazy(() => import("./VisitorNewsCards"));
const Tours = lazy(() => import("./Tours.jsx"));
const BlogsCarousel = lazy(() => import("./Hero/BlogsCarousel.jsx"));

const Blog = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ SEO + Portfolio Meta */}
      <Helmet>
        <title>Blog | Jahid Hasan Portfolio</title>
        <meta
          name="description"
          content="Explore professional blogs and case studies by Jahid Hasan — Digital Marketer, Web Developer, and Canva Expert. Topics include marketing, React, Node.js, and creative design."
        />
        <meta
          name="keywords"
          content="Jahid Hasan, portfolio blog, digital marketing, web development, React, Node.js, Canva design, creative portfolio"
        />

        {/* Open Graph (Facebook/LinkedIn) */}
        <meta property="og:title" content="Jahid Hasan Portfolio Blog" />
        <meta
          property="og:description"
          content="Professional insights on digital marketing, web development, and Canva design by Jahid Hasan."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jahidhasan.dev/blog" />
        <meta property="og:image" content="https://jahidhasan.dev/portfolio-preview.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jahid Hasan Portfolio Blog" />
        <meta
          name="twitter:description"
          content="Read blogs and tutorials on marketing, web development, and Canva design by Jahid Hasan."
        />
        <meta name="twitter:image" content="https://jahidhasan.dev/portfolio-preview.png" />

        {/* Favicon */}
        <link rel="icon" href="/portfolio-favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/portfolio-favicon.png" />
      </Helmet>

      {/* ✅ Suspense fallback for Lazy Components */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen text-gray-500 animate-pulse">
            Loading content...
          </div>
        }
      >
        {/* Hero Carousel */}
        <section className="w-full mb-16">
          <BlogsCarousel />
        </section>

        {/* Page Header */}
        <header className="max-w-6xl mx-auto text-center mb-16 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Jahid Hasan Portfolio Blog
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Discover expert strategies in digital marketing, modern web development, and high-quality printable design — crafted to strengthen your brand identity and inspire innovation.
          </p>

        </header>

        {/* Blog Feed Section */}
        <section className="w-full max-w-7xl mx-auto px-4 mt-16">
          <BlogFeed />
        </section>

        {/* Tours Section */}
        <section className="w-full max-w-7xl mx-auto px-4 mt-20">
          <Tours />
        </section>

        {/* Visitor News Section */}
        <section className="w-full max-w-7xl mx-auto px-4 mt-20 mb-20">
          <VisitorNewsCards />
        </section>
      </Suspense>
    </div>
  );
};

export default Blog;
