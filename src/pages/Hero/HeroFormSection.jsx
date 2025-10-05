// File: src/components/HeroFormSection.jsx
import React from "react";
import HeroCarouselForm from "./HeroCarouselForm.jsx";
import PortfolioSlideForm from "./HeroFormCaro.jsx";
import BlogsCarouselForm from "./BlogsCarouselForm.jsx";
import ProjectsCarouselForm from "./ProjectsCarouselForm.jsx";
import SkillsCarouselForm from "./SkillsCarouselForm.jsx";
import ContactCarouselForm from "./ContactCarouselForm.jsx";

const HeroFormSection = () => {
  return (
    <section className="relative bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-8 py-6">
      {/* Section Heading */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center my-4 text-gray-800">
        Home Carousel
      </h1>
      <div className="w-full max-w-6xl mx-auto">
        <PortfolioSlideForm />
      </div>

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center my-4 text-gray-800">
        About Carousel
      </h1>
      <div className="w-full max-w-6xl mx-auto">
        <HeroCarouselForm />
      </div>

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center my-4 text-gray-800">
        Blogs Carousel
      </h1>
      <div className="w-full max-w-6xl mx-auto">
        <BlogsCarouselForm />
      </div>

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center my-4 text-gray-800">
        Projects Carousel
      </h1>
      <div className="w-full max-w-6xl mx-auto">
        <ProjectsCarouselForm />
      </div>

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center my-4 text-gray-800">
        Skills Carousel
      </h1>
      <div className="w-full max-w-6xl mx-auto">
        <SkillsCarouselForm />
      </div>

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center my-4 text-gray-800">
        Contact Carousel
      </h1>
      <div className="w-full max-w-6xl mx-auto">
        <ContactCarouselForm />
      </div>
    </section>
  );
};

export default HeroFormSection;
