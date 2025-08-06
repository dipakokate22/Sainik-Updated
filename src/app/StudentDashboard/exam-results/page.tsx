'use client';
import { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

const ExamResultsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Common entrance exam results for Grade 11 student with 3 attempts
  const entranceExamResults = [
    {
      attemptNumber: 1,
      examDate: '15-01-2025',
      status: 'Completed',
      score: '75/100',
      percentage: '75%',
      result: 'Pass',
      rank: '1,245',
      viewLink: '#',
      printStatus: 'enabled'
    },
    {
      attemptNumber: 2,
      examDate: '22-01-2025',
      status: 'Completed',
      score: '82/100',
      percentage: '82%',
      result: 'Pass',
      rank: '856',
      viewLink: '#',
      printStatus: 'enabled'
    },
    {
      attemptNumber: 3,
      examDate: '29-01-2025',
      status: 'Available',
      score: '-',
      percentage: '-',
      result: '-',
      rank: '-',
      viewLink: '#',
      printStatus: 'disabled'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Available':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Pass':
        return 'text-green-600';
      case 'Fail':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden font-sans relative">
      <Sidebar activePage="Exam Results" />

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

      <div className="flex-1 flex flex-col min-h-screen bg-[#F7F1EE]">
        <Header />

        <main className="flex-grow md:ml-[270px]">
          <div className="px-8 py-8">
            <h1 className="text-2xl font-semibold text-gray-800">Exam Results</h1>
            <p className="text-sm text-gray-500">Track Your All Exam Results</p>

            {/* Exam Overview Card */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start border-b pb-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Common Entrance Exam - Grade 11</h2>
                  <p className="text-sm text-gray-600 mt-1">Sainik School Entrance Examination</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    3 Attempts Available
                  </span>
                </div>
              </div>

              {/* Best Score Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-green-800">Best Score</h3>
                  <p className="text-2xl font-bold text-green-600">82/100</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800">Best Percentage</h3>
                  <p className="text-2xl font-bold text-blue-600">82%</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-purple-800">Best Rank</h3>
                  <p className="text-2xl font-bold text-purple-600">856</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-orange-800">Attempts Used</h3>
                  <p className="text-2xl font-bold text-orange-600">2/3</p>
                </div>
              </div>
            </div>

            {/* Detailed Results Table */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Attempt-wise Results</h2>
                <p className="text-sm text-gray-600 mt-2 md:mt-0">Detailed breakdown of all attempts</p>
              </div>

              {/* Scrollable Table Container */}
              <div className="w-full overflow-x-auto bg-white">
                <table className="min-w-[800px] md:w-full text-sm text-gray-700 text-left">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="py-3 px-4 font-medium">Attempt</th>
                      <th className="py-3 px-4 font-medium">Exam Date</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      <th className="py-3 px-4 font-medium">Score</th>
                      <th className="py-3 px-4 font-medium">Percentage</th>
                      <th className="py-3 px-4 font-medium">Result</th>
                      <th className="py-3 px-4 font-medium">Rank</th>
                      <th className="py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {entranceExamResults.map((attempt, index) => (
                      <tr key={index} className={attempt.status === 'Available' ? 'bg-blue-50' : ''}>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-medium">Attempt {attempt.attemptNumber}</span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">{attempt.examDate}</td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            getStatusBadge(attempt.status)
                          }`}>
                            {attempt.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold whitespace-nowrap">{attempt.score}</td>
                        <td className="py-3 px-4 font-semibold whitespace-nowrap">{attempt.percentage}</td>
                        <td className={`py-3 px-4 font-semibold whitespace-nowrap ${
                          getResultColor(attempt.result)
                        }`}>
                          {attempt.result}
                        </td>
                        <td className="py-3 px-4 font-semibold whitespace-nowrap">{attempt.rank}</td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            {attempt.status === 'Completed' ? (
                              <>
                                <a href={attempt.viewLink} className="text-blue-600 hover:underline text-xs">
                                  View
                                </a>
                                <button
                                  className={`py-1 px-3 rounded text-xs font-semibold text-white ${
                                    attempt.printStatus === 'disabled'
                                      ? 'bg-gray-400 cursor-not-allowed'
                                      : 'bg-blue-600 hover:bg-blue-700'
                                  }`}
                                  disabled={attempt.printStatus === 'disabled'}
                                >
                                  Print
                                </button>
                              </>
                            ) : (
                              <span className="text-xs text-gray-500">Not Available</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Additional Information */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Important Notes:</h3>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• You have used 2 out of 3 available attempts</li>
                  <li>• Your best score of 82% qualifies you for admission consideration</li>
                  <li>• Results are valid for the current academic year only</li>
                  <li>• Contact support if you need assistance with your results</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExamResultsPage;