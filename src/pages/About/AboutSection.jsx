import React from "react";
import AboutMeForm from "./AboutMeForm.jsx";
import PersonalAboutForm from "./PersonalAboutForm.jsx";
const AboutSection = () => {
 
  return (
    <section className="relative bg-gray-100">
     <AboutMeForm/>
     <PersonalAboutForm/>
    </section>
  );
};

export default AboutSection;
