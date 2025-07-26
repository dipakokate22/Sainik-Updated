// src/components/dashboard/subscription/SubscriptionSection.tsx

import React from 'react';

const SubscriptionSection = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Current Plan</h2>
        <p className="mt-2 text-xl font-semibold text-gray-700">
          Standard School Listing
        </p>
      </div>

      {/* Subscription Details */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8 gap-x-4">
        <div>
          <p className="text-sm text-gray-500">Start Date</p>
          <p className="mt-1 text-lg font-medium text-gray-900">1 April 2025</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Expiry Date</p>
          <p className="mt-1 text-lg font-medium text-gray-900">30 Sept 2025</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Days Remaining</p>
          <p className="mt-1 text-lg font-medium text-gray-900">105 Days</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Paid Amount</p>
          <p className="mt-1 text-lg font-medium text-gray-900">$ 5000</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="mt-1 text-lg font-medium text-green-600">Active</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <button className="w-full sm:w-auto px-8 py-2.5 rounded-md border border-green-600 text-green-600 font-semibold hover:bg-green-50 transition-colors">
          Renew Now
        </button>
        <button className="w-full sm:w-auto px-8 py-2.5 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors">
          Renew Now
        </button>
      </div>
    </div>
  );
};

export default SubscriptionSection;