'use client';
import { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

const ExamResultsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const examResultsData = [
    { school: 'Army Public School', class: '11th', examDate: '25-06-2025', result: '-', viewLink: '#', printStatus: 'disabled' },
    { school: 'Sainik Public School', class: '11th', examDate: '25-06-2025', result: 'Pass', viewLink: '#', printStatus: 'enabled' },
    { school: 'Army Public School', class: '11th', examDate: '15-06-2025', result: 'Failed', viewLink: '#', printStatus: 'enabled' },
    { school: 'Sainik Public School', class: '11th', examDate: '15-06-2025', result: '-', viewLink: '#', printStatus: 'disabled' },
    { school: 'Army Public School', class: '11th', examDate: '10-06-2025', result: 'Failed', viewLink: '#', printStatus: 'enabled' },
    { school: 'Sainik Public School', class: '11th', examDate: '10-06-2025', result: 'Pass', viewLink: '#', printStatus: 'enabled' },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden font-sans relative">
      <Sidebar activePage="Exam Results" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#257B5A] p-2 rounded text-white shadow-lg"
        aria-label="Open sidebar menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        <Header />

        <main className="flex-grow pt-[50px] md:ml-[270px] bg-gray-50">
          <div className="w-full px-4 md:px-8 xl:px-12 max-w-screen bg-gray-50">
            <h1 className="text-2xl font-semibold text-gray-800">Exam Results</h1>
            <p className="text-sm text-gray-500">Track Your All Exam Results</p>
          </div>

          {/* Search Bar */}
          <div className="px-4 md:px-8 xl:px-12 mt-4 mb-6">
            <div className="relative w-full max-w-full md:w-[300px] h-[40px]">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="w-full h-full pl-10 pr-4 text-sm text-gray-700 bg-[#E8F0FE] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Results Table */}
          <div className="w-full px-4 md:px-8 xl:px-12 mb-8">
            <div className="bg-white w-full p-4 md:p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Entrance Exam Results</h2>
                <a href="#" className="text-sm text-blue-600 hover:underline mt-2 md:mt-0">View All</a>
              </div>

              {/* Scrollable Table Container */}
              <div className="w-full overflow-x-auto bg-white">
                <table className="min-w-[700px] md:w-full text-sm text-gray-700 text-left">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="py-3 px-4 font-medium">School Name</th>
                      <th className="py-3 px-4 font-medium">Class</th>
                      <th className="py-3 px-4 font-medium">Exam Date</th>
                      <th className="py-3 px-4 font-medium">Result</th>
                      <th className="py-3 px-4 font-medium">View</th>
                      <th className="py-3 px-4 font-medium">Print</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {examResultsData.map((row, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4 whitespace-nowrap">{row.school}</td>
                        <td className="py-3 px-4 whitespace-nowrap">{row.class}</td>
                        <td className="py-3 px-4 whitespace-nowrap">{row.examDate}</td>
                        <td className={`py-3 px-4 font-semibold whitespace-nowrap ${
                          row.result === 'Pass' ? 'text-green-600' :
                          row.result === 'Failed' ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {row.result}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <a href={row.viewLink} className="text-blue-600 hover:underline">View</a>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <button
                            className={`py-1.5 px-4 rounded text-xs font-semibold text-white ${
                              row.printStatus === 'disabled'
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                            disabled={row.printStatus === 'disabled'}
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExamResultsPage;
