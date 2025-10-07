// File: src/routes/AppRoutes.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx";

// ---------------- Public Pages ----------------
const Home = lazy(() => import("../pages/Home.jsx"));
const About = lazy(() => import("../pages/About.jsx"));
const Blog = lazy(() => import("../pages/Blog.jsx"));
const AllPolicies = lazy(() => import("../pages/AllPolicies.jsx"));
const ContactPage = lazy(() => import("../pages/Contact.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const Profile = lazy(() => import("../pages/Profile.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));
const VisitorDetailsPage = lazy(() => import("../pages/VisitorDetailsPage.jsx"));
const BlogDetail = lazy(() => import("../pages/BlogDetail.jsx"));
const BlogHomeDetail = lazy(() => import("../pages/BlogHomeDetail.jsx"));
const BlogpostHomeForm = lazy(() => import("../pages/BlogpostHomeForm.jsx"));
const ManageBlogTableHome = lazy(() => import("../pages/ManageBlogTableHome.jsx"));
const MyProjects = lazy(() => import("../pages/MyProjects"));
const SkillsForm = lazy(() => import("../pages/SkillsForm.jsx"));
const Myskills = lazy(() => import("../pages/Myskills.jsx"));
const AddProject = lazy(() => import("../pages/AddProject.jsx"));
const AdminHeroManagement = lazy(() => import("../pages/Hero/HeroCarouselManager.jsx"));
const AdminProjects = lazy(() => import("../pages/AdminProjects.jsx"));
const AdminSkills = lazy(() => import("../pages/AdminSkills.jsx"));
const CertificatesForm = lazy(() => import("../pages/CertificatesForm.jsx"));
const AdminCertificates = lazy(() => import("../pages/AdminCertificates.jsx"));
const TestimonialForm = lazy(() => import("../pages/TestimonialForm.jsx"));
const AdminTestimonials = lazy(() => import("../pages/AdminTestimonials.jsx"));
const ClaimRequestPage = lazy(() => import("../pages/ClaimRequestPage.jsx"));
const EducationDetails = lazy(() => import("../pages/EducationDetails.jsx"));
const MyBookQuote = lazy(() => import("../pages/MyBookQuote.jsx"));
//-----------------Services Pages----------------
const ServiceDetails = lazy (() => import("../pages/services/ServiceDetails.jsx"));
const ServicesFromSection = lazy (() => import("../pages/services/ServicesFormSection.jsx"));
const ServicesAdminSection = lazy (() => import("../pages/services/ServicesAdminSection.jsx"));
const AdminManagementSection = lazy (() => import("../pages/Management/AdminManagementSection.jsx"));
const ManagementSection = lazy (() => import("../pages/Management/ManagementSection.jsx"));
// ---------------- Admin Pages ----------------
const AdminLayout = lazy(() => import("../components/admin/AdminLayout.jsx"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard.jsx"));
const ManagePolicies = lazy(() => import("../pages/admin/ManagePolicies.jsx"));
const ManageUsers = lazy(() => import("../pages/admin/ManageUsers.jsx"));
const ManageBlog = lazy(() => import("../pages/admin/ManageBlog.jsx"));
const ManageHomeBlog = lazy(() => import("../pages/admin/ManageHomeBlog.jsx"));
const SkillsBlog = lazy(() => import("../pages/admin/SkillsBlog.jsx"));
const Transactions = lazy(() => import("../pages/admin/Transactions.jsx"));
const ManagementTable = lazy(() => import("../pages/admin/ManagementTable.jsx"));
const AddBlogForm = lazy(() => import("../pages/admin/AddBlogForm.jsx"));
const ManageBlogTable = lazy(() => import("../pages/admin/ManageBlogTable.jsx"));
const HeroFormSection = lazy(() => import("../pages/Hero/HeroFormSection.jsx"));
const HeroManagement = lazy(() => import("../pages/Hero/HeroManagment.jsx"));
const ReviewsSectionForm = lazy(() => import("../pages/ReviewsSectionForm.jsx"));
const AdminReviewsTable = lazy(() => import("../pages/AdminReviewsTable.jsx"));
const VisitorNews = lazy(() => import("../pages/admin/VisitorNews.jsx"));
const ReviewsSection = lazy(() => import("../pages/admin/ReviewsSection.jsx"));
const AddVisitorForm = lazy(() => import("../pages/admin/AddVisitorNewsForm.jsx"));
const ContactManager = lazy(() => import("../pages/admin/VisitorContact.jsx"));
const ContactTableManager = lazy(() => import("../pages/admin/ContactTableManager.jsx"));
const BlogContactManager = lazy(() => import("../pages/admin/VisitorContact.jsx"));
const VisitorNewsTable = lazy(() => import("../pages/admin/VisitorNewsTable.jsx"));
const Messages = lazy(() => import("../pages/admin/Messages.jsx"));
const AboutSection = lazy(() => import("../pages/About/AboutSection.jsx"));
const AdminAboutSection = lazy(() => import("../pages/About/AdminAboutSection.jsx"));

// ---------------- Customer Pages ----------------
import CustomerLayout from "../components/customer/CustomerLayout.jsx";
import CustomerDashboard from "../components/customer/CustomerDashboard.jsx";
import CustomerPaymentsTable from "../components/customer/CustomerPaymentsTable.jsx";
import PaymentPage from "../components/PaymentPage.jsx";
import PaymentStatus from "../pages/customer/PaymentStatus";

import ReviewsSectionFormCustomer from "../pages/customer/ReviewsSectionFormCustomer.jsx";

// ---------------- Management Layout ----------------
const ManagementLayout = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Management Section</h1>
    <Outlet />
  </div>
);

// ---------------- App Routes ----------------
const AppRoutes = () => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black text-lg font-medium">Loading...</p>
        </div>
      </div>
    }
  >
    <Routes>
      {/* ---------------- Public Routes ---------------- */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/skills" element={<Myskills />} />
      <Route path="/all-policies" element={<AllPolicies />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/projects" element={<MyProjects />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/visitor/:id" element={<VisitorDetailsPage />} />
      <Route path="/blog/:blogId" element={<BlogDetail />} />
      <Route path="/articles/:id" element={<BlogHomeDetail />} />
       <Route path="/service/:id" element={<ServiceDetails />} />
       <Route path="/education/:id" element={<EducationDetails />} />
      <Route path="/*" element={<NotFound />} />

      {/* ---------------- Private / Authenticated Routes ---------------- */}
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/mybook-quote" element={<PrivateRoute><MyBookQuote /></PrivateRoute>} />

      {/* ---------------- Customer Routes ---------------- */}
      <Route path="/customer" element={<PrivateRoute><CustomerLayout /></PrivateRoute>}>
        <Route index element={<CustomerDashboard />} />
        <Route path="reviews" element={<ReviewsSectionFormCustomer />} />
        <Route path="payment-status" element={<CustomerPaymentsTable />} />
        <Route path="payment-page" element={<PaymentPage />} />
        <Route path="payments" element={<PaymentStatus />} />
  
      </Route>

      {/* ---------------- Admin Routes ---------------- */}
      <Route path="/admin/*" element={<PrivateRoute allowedRoles={["admin"]}><AdminLayout /></PrivateRoute>}>
        <Route index element={<AdminDashboard />} />

        {/* Hero Section */}
         <Route path="hero-section" element={<ManagePolicies />} />
         <Route path="hero-section/:mode/:id?" element={<HeroFormSection />} />
         <Route path="hero-section/edit" element={<HeroManagement />} />

        {/* Users */}
        <Route path="manage-users" element={<ManageUsers />} />

        {/* Applications & Transactions */}
        <Route path="transactions" element={<Transactions />} />
        <Route path="manage-applications" element={<ManagementTable />} />

        {/* Services */}
        <Route path="management-education" element={<SkillsBlog />} />
        <Route path="management-education/:mode/:id?" element={<ManagementSection/>} />
        <Route path="management-education/edit" element={<AdminManagementSection />} />
        {/* Services */}
        <Route path="management-services" element={<SkillsBlog />} />
        <Route path="management-services/:mode/:id?" element={< ServicesFromSection/>} />
        <Route path="management-services/edit" element={<ServicesAdminSection />} />
        {/* About Me */}
        <Route path="management-aboutme" element={<SkillsBlog />} />
        <Route path="management-aboutme/:mode/:id?" element={<AboutSection />} />
        <Route path="management-aboutme/edit" element={<AdminAboutSection />} />
        {/* testimonials */}
        <Route path="management-testimonials" element={<SkillsBlog />} />
        <Route path="management-testimonials/:mode/:id?" element={<TestimonialForm />} />
        <Route path="management-testimonials/edit" element={<AdminTestimonials />} />
        {/* certificates */}
        <Route path="management-certificates" element={<SkillsBlog />} />
        <Route path="management-certificates/:mode/:id?" element={<CertificatesForm />} />
        <Route path="management-certificates/edit" element={<AdminCertificates />} />
        {/* Projects */}
        <Route path="management-projects" element={<SkillsBlog />} />
        <Route path="management-projects/:mode/:id?" element={<AddProject />} />
        <Route path="management-projects/edit" element={<AdminProjects />} />
        {/* Skills */}
        <Route path="management-skills" element={<SkillsBlog />} />
        <Route path="management-skills/:mode/:id?" element={<SkillsForm />} />
        <Route path="management-skills/edit" element={<AdminSkills />} />
        {/* Blog */}
        <Route path="management-blog" element={<ManageHomeBlog />} />
        <Route path="management-blog/:mode/:id?" element={<BlogpostHomeForm />} />
        <Route path="management-blog/edit" element={<ManageBlogTableHome />} />
        <Route path="manage-blog" element={<ManageBlog />} />
        <Route path="manage-blog/:mode/:id?" element={<AddBlogForm />} />
        <Route path="manage-blog/edit" element={<ManageBlogTable />} />

        {/* Messages */}
        <Route path="messages-section" element={<Messages />} />
        <Route path="messages-section/:mode/:id?" element={<ContactManager />} />
        <Route path="messages-section/edit" element={<ContactTableManager />} />

        {/* Visitor News */}
        <Route path="visitor-news" element={<VisitorNews />} />
        <Route path="visitor-news/:mode/:id?" element={<AddVisitorForm />} />
        <Route path="visitor-news/edit" element={<VisitorNewsTable />} />

        {/* Reviews */}
        <Route path="reviews-section" element={<ReviewsSection />} />
        <Route path="reviews-section/:mode/:id?" element={<ReviewsSectionForm />} />
        <Route path="reviews-section/edit" element={<AdminReviewsTable />} />

        
      </Route>

      {/* ---------------- Management Section (Admin only) ---------------- */}
      <Route path="/management/*" element={<PrivateRoute allowedRoles={["admin"]}><ManagementLayout /></PrivateRoute>}>
        <Route index element={<Navigate to="all-policies" replace />} />
        <Route path="all-policies" element={<AllPolicies />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
