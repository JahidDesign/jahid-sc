import React from "react"
import AdminHeroManagement from "./HeroCarouselManager.jsx";
import AdminHeroCarousel from "./AdminHeroCarousel.jsx";
import AdminBlogsCarousel from "./AdminBlogsCarousel.jsx";
import AdminProjectsCarousel from "./AdminProjectsCarousel.jsx";
import AdminSkillsCarousel from "./AdminSkillsCarousel.jsx";
import AdminContactCarousel from "./ServiceAdminSection.jsx";
const HeroManagement = () => {
 
  return (
    <section className="relative bg-gray-100">
      <AdminBlogsCarousel/>
     <AdminHeroManagement/>
     <AdminContactCarousel/>
     <AdminHeroCarousel/>
     <AdminProjectsCarousel/>
     <AdminSkillsCarousel/>
    </section>
  );
};

export default HeroManagement;
