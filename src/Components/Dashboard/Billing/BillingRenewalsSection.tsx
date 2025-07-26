// src/components/dashboard/billing/BillingRenewalsSection.tsx

import React from 'react';
import { Download, ArrowRight } from 'lucide-react';

// Dummy data for the billing history
const invoiceHistory = [
  { invoice: '#0045', amount: '$ 200', status: 'Paid', date: '3 June 2025' },
  { invoice: '#0044', amount: '$ 200', status: 'Paid', date: '3 May 2025' },
  { invoice: '#0043', amount: '$ 200', status: 'Paid', date: '3 April 2025' },
  { invoice: '#0042', amount: '$ 200', status: 'Paid', date: '3 March 2025' },
  { invoice: '#0041', amount: '$ 200', status: 'Paid', date: '3 Feb 2025' },
  { invoice: '#0040', amount: '$ 200', status: 'Paid', date: '3 Jan 2025' },
  { invoice: '#0039', amount: '$ 200', status: 'Paid', date: '3 Dec 2024' },
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
              <span className="bg-red-100 text-red-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Monthly
              </span>
            </div>
            <span className="font-bold text-lg text-gray-800">$ 340 per Month</span>
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
        <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 border-b text-sm font-semibold text-gray-600">
            <div className="col-span-1">Invoice</div>
            <div className="col-span-1">Amount</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-1 text-right">Action</div>
          </div>
          {/* Invoice List with custom scrollbar */}
          <div className="max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-100">
            {invoiceHistory.map((item, index) => (
              <div key={index} className="grid grid-cols-2 md:grid-cols-5 gap-4 px-6 py-4 border-b text-sm">
                <div className="font-medium text-gray-800 md:col-span-1">
                  <span className="md:hidden font-semibold">Invoice: </span>
                  {item.invoice}
                </div>
                <div className="text-gray-700 md:col-span-1">
                  <span className="md:hidden font-semibold">Amount: </span>
                  {item.amount}
                </div>
                <div className="text-gray-500 md:col-span-1">
                  <span className="md:hidden font-semibold">Status: </span>
                  {item.status}
                </div>
                <div className="text-gray-700 md:col-span-1">
                  <span className="md:hidden font-semibold">Date: </span>
                  {item.date}
                </div>
                <div className="col-span-2 md:col-span-1 md:text-right">
                  <a href="#" className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium">
                    <Download size={16} />
                    Download Invoice
                  </a>
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