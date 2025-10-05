import React from 'react';
import ServicePackagesForm from './ServicePackagesForm';

const CustomPricing = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center md:text-left">
        Pricing Packages
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Form Section */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-4 sm:p-6">
          <ServicePackagesForm />
        </div>

        
      </div>
    </div>
  );
};

export default CustomPricing;
