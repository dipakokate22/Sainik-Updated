'use client';
import Sidebar from '../Sidebar';
import Header from '../Header';

const ExamResultsPage = () => {
  const examResultsData = [
    { school: 'Army Public School', class: '11th', examDate: '25-06-2025', result: '-', viewLink: '#', printStatus: 'disabled' },
    { school: 'Sainik Public School', class: '11th', examDate: '25-06-2025', result: 'Pass', viewLink: '#', printStatus: 'enabled' },
    { school: 'Army Public School', class: '11th', examDate: '15-06-2025', result: 'Failed', viewLink: '#', printStatus: 'enabled' },
    { school: 'Sainik Public School', class: '11th', examDate: '15-06-2025', result: '-', viewLink: '#', printStatus: 'disabled' },
    { school: 'Army Public School', class: '11th', examDate: '10-06-2025', result: 'Failed', viewLink: '#', printStatus: 'enabled' },
    { school: 'Sainik Public School', class: '11th', examDate: '10-06-2025', result: 'Pass', viewLink: '#', printStatus: 'enabled' },
  ];

  return (
    <div className="flex w-full min-h-screen bg-[#F7F7F7] font-sans">
      <Sidebar height="100vh" activePage="Exam Results" />

      <main className="flex-1">
        <Header />

        <div className="relative p-6 md:p-8 pt-6 md:pt-8">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Exam Results</h1>
            <p className="text-sm text-gray-500">Track Your All Exam Results</p>
          </div>

          {/* Search */}
          <div className="mb-8 w-full max-w-xs">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-[#E8F0FE] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-800">Entrance Exam Results</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline mt-2 sm:mt-0">View All</a>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-6 gap-4 text-sm font-medium text-gray-600 bg-[#E8F0FE] p-4 rounded-t-lg">
              <div className="text-left">School</div>
              <div className="text-center">Class</div>
              <div className="text-center">Exam Date</div>
              <div className="text-center">Result</div>
              <div className="text-center">View Result</div>
              <div className="text-center">Print Result</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-200">
              {examResultsData.map((row, index) => (
                <div key={index}>
                  {/* Mobile Card */}
                  <div className="md:hidden bg-[#F9FAFB] p-4 rounded-lg shadow-sm mb-4 text-gray-800">
  <div className="mb-2">
    <span className="font-medium">School: </span>
    <span>{row.school}</span>
  </div>
  <div className="mb-2">
    <span className="font-medium">Class: </span>
    <span>{row.class}</span>
  </div>
  <div className="mb-2">
    <span className="font-medium">Exam Date: </span>
    <span>{row.examDate}</span>
  </div>
  <div className="mb-2">
    <span className="font-medium">Result: </span>
    <span className={`font-semibold ${
      row.result === 'Pass' ? 'text-green-600' :
      row.result === 'Failed' ? 'text-red-600' : 'text-gray-600'
    }`}>
      {row.result}
    </span>
  </div>
  <div className="mb-2">
    <span className="font-medium">View Result: </span>
    <a href={row.viewLink} className="text-blue-600 hover:underline">View</a>
  </div>
  <div className="flex justify-between items-center pt-2">
    <span className="font-medium">Print Result:</span>
    <button
      className={`py-1 px-4 rounded text-xs font-semibold text-white shadow-sm transition ${
        row.printStatus === 'disabled'
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      }`}
      disabled={row.printStatus === 'disabled'}
    >
      Print
    </button>
  </div>
</div>


                  {/* Desktop Row */}
                  <div className="hidden md:grid grid-cols-6 gap-4 p-4 items-center text-sm text-gray-800">
                    <div className="text-left font-medium">{row.school}</div>
                    <div className="text-center text-gray-600">{row.class}</div>
                    <div className="text-center text-gray-600">{row.examDate}</div>
                    <div className={`text-center font-semibold ${
                      row.result === 'Pass' ? 'text-green-600' :
                      row.result === 'Failed' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {row.result}
                    </div>
                    <div className="text-center">
                      <a href={row.viewLink} className="text-blue-600 hover:underline">View</a>
                    </div>
                    <div className="text-center">
                      <button
                        className={`py-1.5 px-6 rounded-lg text-xs font-semibold text-white transition-colors ${
                          row.printStatus === 'disabled'
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        disabled={row.printStatus === 'disabled'}
                      >
                        Print
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamResultsPage;
