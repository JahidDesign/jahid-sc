import React from 'react';
import ManagementForm from './ManagementForm';
import EducationForm from './EducationForm';
const ManagementSection = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>
      
     <ManagementForm/>
     <EducationForm/>
    </div>
  );
};

export default ManagementSection;
