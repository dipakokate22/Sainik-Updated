// src/components/dashboard/billing/BillingRenewalsSection.tsx

import React from 'react';
import { Download, ArrowRight } from 'lucide-react';

// Updated dummy data for annual billing history
const invoiceHistory = [
  { invoice: '#0045', amount: '₹ 2,400', status: 'Paid', date: '3 June 2025' },
  { invoice: '#0044', amount: '₹ 2,400', status: 'Paid', date: '3 June 2024' },
  { invoice: '#0043', amount: '₹ 2,400', status: 'Paid', date: '3 June 2023' },
  { invoice: '#0042', amount: '₹ 2,400', status: 'Paid', date: '3 June 2022' },
  { invoice: '#0041', amount: '₹ 2,400', status: 'Paid', date: '3 June 2021' },
  { invoice: '#0040', amount: '₹ 2,400', status: 'Paid', date: '3 June 2020' },
  { invoice: '#0039', amount: '₹ 2,400', status: 'Paid', date: '3 June 2019' },
];

const BillingRenewalsSection = () => {
  const progressPercentage = (102 / 365) * 100;

  return (
    <div className="space-y-8">
      {/* Top Section: Billing Details */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Billing Details</h2>
        <div className="mt-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          {/* Plan and Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800">Plan</span>
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Annual
              </span>
            </div>
            <span className="font-bold text-lg text-gray-800">₹ 4,080 per Year</span>
          </div>

          {/* Progress Bar */}
          <div>
            <p className="text-sm text-gray-600 mb-2">102 Days out of 365</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Renew Link */}
          <div className="text-right">
            <a href="#" className="inline-flex items-center gap-1 text-green-600 font-semibold text-sm hover:underline">
              Renew Plan <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Billing History */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Billing History</h3>
        <div className="mt-4 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Modern Table Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4">
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Invoice</div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Amount</div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Status</div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Date</div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide text-right">Action</div>
            </div>
          </div>
          
          {/* Invoice List with Enhanced Design */}
          <div className="max-h-[400px] overflow-y-auto">
            {invoiceHistory.map((item, index) => (
              <div 
                key={index} 
                className="grid grid-cols-2 md:grid-cols-5 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 last:border-b-0"
              >
                <div className="font-medium text-gray-800 md:col-span-1">
                  <span className="md:hidden text-xs font-medium text-gray-500 block mb-1">Invoice:</span>
                  <span className="text-gray-700 font-mono">{item.invoice}</span>

                </div>
                <div className="text-gray-700 md:col-span-1">
                  <span className="md:hidden text-xs font-medium text-gray-500 block mb-1">Amount:</span>
                  <span className="font-semibold text-green-600">{item.amount}</span>
                </div>
                <div className="text-gray-500 md:col-span-1">
                  <span className="md:hidden text-xs font-medium text-gray-500 block mb-1">Status:</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {item.status}
                  </span>
                </div>
                <div className="text-gray-700 md:col-span-1">
                  <span className="md:hidden text-xs font-medium text-gray-500 block mb-1">Date:</span>
                  <span className="font-medium">{item.date}</span>
                </div>
                <div className="col-span-2 md:col-span-1 md:text-right">
                  <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                    <Download size={14} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingRenewalsSection;