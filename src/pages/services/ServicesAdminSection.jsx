import React from 'react';
import AdminServicesTable from './AdminServicesTable';
const ServicesAdminSection = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>
      
     <AdminServicesTable/>
    </div>
  );
};

export default ServicesAdminSection;
