import Sidebar from "./CustomerSidebar";
import CustomerNavbar from "./CustomerNavbar";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CustomLayout = () => {
  return (
    <div className="flex">
      {/* Global Helmet Meta for Jahid's Portfolio */}
      <Helmet>
        <title>Jahid Hasan | Full-Stack Developer Portfolio</title>
        <meta
          name="description"
          content="Explore Jahid Hasan's portfolio — a showcase of modern React, Firebase, and MERN stack projects with sleek UI/UX, responsive design, and real-world functionality."
        />
        <meta
          name="keywords"
          content="Jahid Hasan, Jahid Portfolio, React Developer, MERN Stack, Firebase, Web Developer, UI/UX Designer, Frontend Developer, Full-Stack Developer, Bangladesh Developer"
        />
        <meta name="author" content="Jahid Hasan" />
        <meta property="og:title" content="Jahid Hasan | Full-Stack Developer Portfolio" />
        <meta
          property="og:description"
          content="Creative web developer specializing in React, Firebase, MongoDB, and modern UI/UX design."
        />
        <meta property="og:image" content="/portfolio-preview.jpg" />
        <meta property="og:url" content="https://jahid-portfolio.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jahid Hasan | Full-Stack Developer Portfolio" />
        <meta
          name="twitter:description"
          content="Explore Jahid Hasan’s modern portfolio featuring React, Firebase, and MERN stack projects."
        />
        <meta name="twitter:image" content="/portfolio-preview.jpg" />
        <link rel="canonical" href="https://jahid-portfolio.vercel.app" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Helmet>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-72">
        {/* Navbar */}
        <CustomerNavbar />

        {/* Page Content */}
        <main className="pt-16 p-6 w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomLayout;
