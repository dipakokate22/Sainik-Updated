// app/components/dashboard/RenewSection.tsx
import React from 'react';

const RenewSection = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Renew</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Expire On</span>
          <span className="font-medium text-gray-800">10 June 2027</span>
        </div>
        <hr/>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Renewal Cost</span>
          <span className="font-medium text-gray-800">$ 6000</span>
        </div>
      </div>
      <button className="mt-6 w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors">
        Renew Now
      </button>
    </div>
  );
};

export default RenewSection;