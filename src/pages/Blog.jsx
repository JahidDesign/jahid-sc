import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import BlogFeed from "./BlogCard";
import VisitorNewsCards from "./VisitorNewsCards";
import BlogsCarousel from "./Hero/BlogsCarousel.jsx";

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

      {/* Hero Carousel */}
      <BlogsCarousel />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Jahid Hasan Portfolio Blog
        </h1>
        <p className="text-gray-600">
          Insights on digital marketing, modern web development, and creative Canva design.
        </p>
      </div>

      {/* Blog Feed */}
      <div className=" mx-auto mt-16">
        <BlogFeed  />
      </div>

      {/* Visitor News Section */}
      <div className="max-w-7xl mx-auto mt-16">
        <VisitorNewsCards />
      </div>
    </div>
  );
};

export default Blog;
