// File: src/pages/admin/Dashboard.jsx
import { motion } from "framer-motion";
import CustomerTable from "../CustomerTable";
import AdminPaymentsTable from "./AdminPaymentsTable";
import BlogContactManager from "./VisitorContact";
import  PolicyForm from "./PolicyForm";
import  OrderList from "./OrderList";
import Subscribers from "./SubscribersMG";
import SkillsGalleryForm from "./SkillsGalleryForm";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50 space-y-8 md:space-y-12">
      {/* Dashboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 md:mb-6"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-3xl">
          Welcome to the admin dashboard. Manage users, policies, blog posts,
          monitor transactions, and view analytics.
        </p>
      </motion.div>

      {/* Customer Management */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
          Customer Management
        </h2>
        <motion.div variants={sectionVariants}>
          <CustomerTable rowVariants={rowVariants} />
        </motion.div>
      </motion.section>

      {/* Policies Management */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
          Policies Management
        </h2>
        <motion.div variants={sectionVariants}>
           <SkillsGalleryForm rowVariants={rowVariants} />
        </motion.div>
      </motion.section>

      {/* Applications */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
          Applications
        </h2>
        <motion.div variants={sectionVariants}>
          <div className="text-gray-500 text-sm">
            <OrderList/>
          </div>
        </motion.div>
      </motion.section>

      {/* Payments Overview */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
          Payments Overview
        </h2>
        <motion.div variants={sectionVariants}>
          <AdminPaymentsTable rowVariants={rowVariants} />
        </motion.div>
      </motion.section>

      {/* Subscribers Stats */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white rounded-xl shadow p-4 sm:p-6"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
          Subscribers Stats
        </h2>
        <motion.div variants={sectionVariants}>
          <Subscribers rowVariants={rowVariants} />
        </motion.div>
      </motion.section>

      {/* Agent Overview */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
          Post
        </h2>
        <motion.div variants={sectionVariants}>
          <p className="text-gray-500 text-sm">Post normaly.</p>
          <PolicyForm/>
        </motion.div>
      </motion.section>

      {/* Contact Overview */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
          Contact Overview
        </h2>
        <motion.div variants={sectionVariants}>
          <BlogContactManager rowVariants={rowVariants} />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Dashboard;
