'use client';
import { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

const PaymentHistoryPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample entrance exam data
  const currentEntranceExam = {
    examName: 'Sainik School Entrance Exam 2025',
    totalAttempts: 3,
    usedAttempts: 1,
    nextAttemptDate: '2025-01-15',
    status: 'Active',
    paymentDate: '2024-12-15',
    amount: 'Rs. 2,500'
  };

  const paymentHistoryData = [
    { 
      paymentFor: 'Sainik School Entrance Exam 2025', 
      examType: 'Main Entrance', 
      paymentDate: '15-12-2024', 
      amount: 'Rs. 2,500', 
      status: 'Paid',
      attempts: '1/3 Used',
      nextAttempt: '15-01-2025'
    },
    { 
      paymentFor: 'Sainik School Entrance Exam 2024', 
      examType: 'Main Entrance', 
      paymentDate: '10-11-2023', 
      amount: 'Rs. 2,000', 
      status: 'Completed',
      attempts: '3/3 Used',
      nextAttempt: 'Expired'
    },
    { 
      paymentFor: 'Additional Entrance Exam 2024', 
      examType: 'Additional', 
      paymentDate: '25-02-2024', 
      amount: 'Rs. 2,000', 
      status: 'Failed',
      attempts: '2/3 Used',
      nextAttempt: 'Missed'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
      case 'Active':
        return 'text-green-600';
      case 'Completed':
        return 'text-blue-600';
      case 'Failed':
      case 'Missed':
        return 'text-red-600';
      case 'Pending':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  const getAttemptColor = (attempts: string) => {
    if (attempts.includes('3/3') || attempts === 'Expired' || attempts === 'Missed') {
      return 'text-red-600';
    }
    if (attempts.includes('2/3')) {
      return 'text-orange-500';
    }
    return 'text-green-600';
  };

  return (
    <div className="flex min-h-screen bg-[#F7F1EE] relative overflow-hidden">
      <Sidebar activePage="Payment History" />

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

      <div className="flex-1 flex flex-col min-h-screen bg-[#F7F1EE] overflow-hidden">
        <Header />

        <main className="flex-grow md:ml-[270px]">
          <div className="px-8 py-8">
            {/* Page Heading */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Payment History</h1>
              <p className="text-sm text-gray-500">View and track all your past and upcoming payments</p>
            </div>

            {/* Pay for New Entrance Exam Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Pay for Entrance Exam</h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium text-gray-800">Sainik School Entrance Exam 2025</h3>
                    <p className="text-sm text-gray-600 mt-1">Includes 3 attempts with 15-day gap between each attempt</p>
                    <p className="text-sm text-gray-600">Missing any attempt will forfeit remaining chances</p>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-green-600">Rs. 2,500</span>
                      <span className="text-sm text-gray-500 ml-2">per exam package</span>
                    </div>
                  </div>
                  <button className="bg-[#257B5A] hover:bg-[#1e6b4a] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>

            {/* Current Active Exam Status */}
            {currentEntranceExam.status === 'Active' && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Exam Status</h2>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Exam Name</p>
                      <p className="font-medium text-gray-800">{currentEntranceExam.examName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Attempts Used</p>
                      <p className="font-medium text-orange-600">{currentEntranceExam.usedAttempts}/{currentEntranceExam.totalAttempts}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Next Attempt Date</p>
                      <p className="font-medium text-blue-600">{currentEntranceExam.nextAttemptDate}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> You have {currentEntranceExam.totalAttempts - currentEntranceExam.usedAttempts} attempts remaining. 
                      Each attempt must be taken within the scheduled date or you'll lose that opportunity.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment History Table */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 mb-4 min-w-[800px]">
                <h2 className="text-lg font-semibold text-gray-800">Payment History</h2>
                <a href="#" className="text-sm text-blue-600 hover:underline mt-2 md:mt-0">View All</a>
              </div>

              <table className="min-w-[800px] w-full text-left text-sm text-gray-700">
                <thead className="text-gray-600 bg-[#E8F0FE]">
                  <tr>
                    <th className="pl-4 py-3 rounded-tl-lg">Payment For</th>
                    <th className="text-center py-3">Exam Type</th>
                    <th className="text-center py-3">Payment Date</th>
                    <th className="text-center py-3">Amount</th>
                    <th className="text-center py-3">Attempts</th>
                    <th className="text-center py-3">Next Attempt</th>
                    <th className="text-center py-3">Status</th>
                    <th className="text-center py-3 rounded-tr-lg">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistoryData.map((row, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="pl-4 py-3 font-medium">{row.paymentFor}</td>
                      <td className="text-center py-3 text-gray-600">{row.examType}</td>
                      <td className="text-center py-3 text-gray-600">{row.paymentDate}</td>
                      <td className="text-center py-3 text-gray-600 font-medium">{row.amount}</td>
                      <td className={`text-center py-3 font-medium ${getAttemptColor(row.attempts)}`}>{row.attempts}</td>
                      <td className="text-center py-3 text-gray-600">{row.nextAttempt}</td>
                      <td className={`text-center font-semibold py-3 ${getStatusColor(row.status)}`}>{row.status}</td>
                      <td className="text-center py-3">
                        <button
                          className={`py-1.5 px-4 rounded-lg text-xs font-semibold text-white transition-colors ${
                            row.status === 'Failed' || row.status === 'Pending' 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                          disabled={row.status === 'Failed' || row.status === 'Pending'}
                        >
                          Print
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Information Section */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
              <h3 className="font-semibold text-blue-800 mb-2">Entrance Exam Payment Information</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Each entrance exam payment includes 3 attempts</li>
                <li>• There is a mandatory 15-day gap between each attempt</li>
                <li>• Missing any scheduled attempt will result in losing that opportunity</li>
                <li>• If you miss all attempts, you'll need to purchase a new exam package</li>
                <li>• Receipts are available for download after successful payment</li>
              </ul>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
