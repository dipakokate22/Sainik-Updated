'use client';

// src/components/dashboard/subscription/SubscriptionSection.tsx

import React, { useState } from 'react';
import { Calendar, Clock, CreditCard, CheckCircle, Star, Crown } from 'lucide-react';

const SubscriptionSection = () => {
  const [hasActiveSubscription, setHasActiveSubscription] = useState(true); // Toggle this for testing

  // Mock data - replace with actual API data
  const currentPlan = {
    startDate: '1 April 2025',
    expiryDate: '31 March 2026',
    remainingDays: 285,
    amount: 15000,
    status: 'Active'
  };

  const planFeatures = [
    'Unlimited student listings',
    'Advanced analytics dashboard',
    'Priority customer support',
    'Custom school branding',
    'Mobile app access',
    'Admission management tools'
  ];

  const calculateDaysRemaining = () => {
    const today = new Date();
    const expiry = new Date('2026-03-31');
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Subscription Management</h2>
        <p className="mt-1 text-gray-600">
          Manage your annual subscription plan and access premium features for your school.
        </p>
      </div>

      {hasActiveSubscription ? (
        // Current Plan Section
        <>
          {/* Current Plan Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Crown className="text-yellow-500" size={24} />
                    Current Annual Plan
                  </h3>
                  <p className="text-gray-600 mt-1">Premium School Listing Package</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CheckCircle size={16} className="mr-1" />
                    {currentPlan.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Plan Details Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar size={18} />
                    <span className="text-sm font-medium">Start Date</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{currentPlan.startDate}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar size={18} />
                    <span className="text-sm font-medium">Expiry Date</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{currentPlan.expiryDate}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Clock size={18} />
                    <span className="text-sm font-medium">Remaining Days</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{calculateDaysRemaining()} Days</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <CreditCard size={18} />
                    <span className="text-sm font-medium">Amount Paid</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">₹{currentPlan.amount.toLocaleString()}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <CheckCircle size={18} />
                    <span className="text-sm font-medium">Status</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">{currentPlan.status}</p>
                </div>
              </div>

              {/* Renew Button */}
              <div className="mt-8 flex justify-center">
                <button className="px-8 py-3 bg-[#257B5A] text-white rounded-lg font-semibold hover:bg-[#1e6347] transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                  <CreditCard size={18} />
                  Renew Annual Plan
                </button>
              </div>
            </div>
          </div>

          {/* Plan Features */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Your Plan Includes</h3>
              <p className="text-gray-600 mt-1">Premium features available with your annual subscription</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {planFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                    <span className="text-gray-800 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        // New School - Plan Selection
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-100">
            <div className="text-center">
              <Crown className="mx-auto text-yellow-500 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-800">Choose Your Annual Plan</h3>
              <p className="text-gray-600 mt-2">Get started with our comprehensive school management solution</p>
            </div>
          </div>

          {/* Plan Details */}
          <div className="p-8">
            <div className="max-w-2xl mx-auto">
              {/* Plan Card */}
              <div className="border-2 border-[#257B5A] rounded-xl p-6 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-800">Premium Annual Plan</h4>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-[#257B5A]">₹15,000</span>
                    <span className="text-gray-600 ml-2">/year</span>
                  </div>
                  <p className="text-gray-600 mt-2">Complete school management solution</p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {planFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                      <span className="text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Subscribe Button */}
                <div className="text-center">
                  <button className="w-full px-8 py-4 bg-[#257B5A] text-white rounded-lg font-bold text-lg hover:bg-[#1e6347] transition-all duration-200 shadow-lg hover:shadow-xl">
                    Subscribe to Annual Plan
                  </button>
                  <p className="text-sm text-gray-500 mt-3">
                    30-day money-back guarantee • Cancel anytime
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <Star className="mx-auto text-yellow-500 mb-2" size={32} />
                  <h5 className="font-semibold text-gray-800">Premium Support</h5>
                  <p className="text-sm text-gray-600 mt-1">24/7 dedicated customer support</p>
                </div>
                <div className="text-center p-4">
                  <CheckCircle className="mx-auto text-green-500 mb-2" size={32} />
                  <h5 className="font-semibold text-gray-800">All Features</h5>
                  <p className="text-sm text-gray-600 mt-1">Access to all premium features</p>
                </div>
                <div className="text-center p-4">
                  <Crown className="mx-auto text-purple-500 mb-2" size={32} />
                  <h5 className="font-semibold text-gray-800">Annual Savings</h5>
                  <p className="text-sm text-gray-600 mt-1">Save 20% with annual billing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSection;