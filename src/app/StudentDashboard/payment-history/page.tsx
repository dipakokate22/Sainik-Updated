'use client';
import { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

const PaymentHistoryPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const paymentHistoryData = [
    { paymentFor: 'Registration Fees', class: '10th', paymentDate: '25-06-2024', amount: 'Rs. 500', status: 'Paid' },
    { paymentFor: 'Admission Fees', class: '10th', paymentDate: '25-06-2024', amount: 'Rs. 50000', status: 'Paid' },
    { paymentFor: 'Examination Fees', class: '10th', paymentDate: '15-06-2024', amount: 'Rs. 1500', status: 'Pending' },
    { paymentFor: 'Library Fees', class: '10th', paymentDate: '15-06-2024', amount: 'Rs. 1500', status: 'Paid' },
    { paymentFor: 'Sports Fees', class: '10th', paymentDate: '10-06-2024', amount: 'Rs. 2500', status: 'Pending' },
    { paymentFor: 'Cultural Activity Fees', class: '10th', paymentDate: '10-06-2024', amount: 'Rs. 1000', status: 'Failed' },
  ];

  const filterTags = ['Sports Fees', '10th', '25-06-2024', 'Pending'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'text-green-600';
      case 'Pending':
        return 'text-orange-500';
      case 'Failed':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative overflow-hidden">
      <Sidebar activePage="Payment History" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Mobile Hamburger */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#257B5A] p-2 rounded text-white shadow-lg"
        aria-label="Open sidebar menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-hidden">
        <Header />

        <main className="flex-grow pt-[50px] md:ml-[270px]">
          <div className="w-full px-4 md:px-8 xl:px-12 max-w-screen overflow-x-hidden">
            {/* Page Heading */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Payment History</h1>
              <p className="text-sm text-gray-500">View and track all your past and upcoming payments</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="relative w-full md:w-[300px] h-[40px]">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search here...."
                  className="w-full h-full pl-10 pr-4 text-sm text-gray-700 bg-[#E8F0FE] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 border rounded hover:bg-gray-100 transition-colors" aria-label="Filter">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18M3 8h18v12H3z" />
                </svg>
              </button>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filterTags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-700"
                >
                  <span>{tag}</span>
                  <button className="ml-2 text-gray-500 hover:text-gray-800 focus:outline-none" aria-label={`Remove filter ${tag}`}>×</button>
                </div>
              ))}
            </div>

            {/* Table Section */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 mb-4 min-w-[700px]">
                <h2 className="text-lg font-semibold text-gray-800">Payment History</h2>
                <a href="#" className="text-sm text-blue-600 hover:underline mt-2 md:mt-0">View All</a>
              </div>

              <table className="min-w-[700px] w-full text-left text-sm text-gray-700">
                <thead className="text-gray-600 bg-[#E8F0FE]">
                  <tr>
                    <th className="pl-4 py-2 rounded-tl-lg">Payment For</th>
                    <th className="text-center py-2">Class</th>
                    <th className="text-center py-2">Payment Date</th>
                    <th className="text-center py-2">Amount</th>
                    <th className="text-center py-2">Status</th>
                    <th className="text-center py-2 rounded-tr-lg">Print Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistoryData.map((row, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="pl-4 py-3 font-medium">{row.paymentFor}</td>
                      <td className="text-center py-3 text-gray-500">{row.class}</td>
                      <td className="text-center py-3 text-gray-500">{row.paymentDate}</td>
                      <td className="text-center py-3 text-gray-500">{row.amount}</td>
                      <td className={`text-center font-semibold py-3 ${getStatusColor(row.status)}`}>{row.status}</td>
                      <td className="text-center py-3">
                        <button
                          className={`py-1.5 px-6 rounded-lg text-xs font-semibold text-white transition-colors ${
                            row.status === 'Pending' ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                          disabled={row.status === 'Pending'}
                        >
                          Print
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
