// File: About.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import AboutBig from "./About/AboutBig.jsx";
import DaynamicCarousel from "./Hero/DaynamicCarousel.jsx";
import VisionMissionSection from "./VisionMissionSection";

const About = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>About Me | Jahid Hasan Portfolio</title>
        <meta
          name="description"
          content="Discover more about Jahid Hasan — Digital Marketer, Web Developer, and Canva Expert. Learn about his vision, mission, and expertise in building modern digital solutions."
        />
        <meta
          name="keywords"
          content="Jahid Hasan, Jahid Hasan portfolio, about Jahid Hasan, digital marketer, web developer, Canva expert, mission, vision"
        />
        <meta property="og:title" content="About Jahid Hasan | Portfolio" />
        <meta
          property="og:description"
          content="Get to know Jahid Hasan — a passionate Digital Marketer, Web Developer, and Canva Expert delivering creative and impactful solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jahidhasan.dev/about" />
        <meta
          property="og:image"
          content="https://jahidhasan.dev/portfolio-preview.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Jahid Hasan | Portfolio" />
        <meta
          name="twitter:description"
          content="Explore Jahid Hasan’s journey as a Digital Marketer, Web Developer, and Canva Expert. Passionate about modern web and creative solutions."
        />
        <meta
          name="twitter:image"
          content="https://jahidhasan.dev/portfolio-preview.png"
        />
        <link rel="icon" href="/portfolio-favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/portfolio-favicon.png" />
      </Helmet>

      {/* ✅ Hero Carousel */}
      <DaynamicCarousel />

      {/* ✅ About Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4">
        About Me
       </h1>
       <p className="text-center text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
       Digital Marketer • Web Developer • Print Design Specialist
       </p>


        {/* About Details */}
        <AboutBig />
      </section>

      {/* ✅ Team Section */}
      {/* <section className="bg-gray-50 py-16 px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Meet Our Team
        </h2>
       
      </section> */}

      {/* ✅ Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <VisionMissionSection />
      </section>
    </div>
  );
};

export default About;
