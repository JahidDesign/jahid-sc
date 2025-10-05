import React from 'react';
import AdminManagementTable from './AdminManagementTable';
const AdminManagementSection = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Blog</h1>
      <p className="text-gray-700">
        Create and manage blog posts for educational content, announcements, and updates.
      </p>
     
     <AdminManagementTable/>
    </div>
  );
};

export default AdminManagementSection;
