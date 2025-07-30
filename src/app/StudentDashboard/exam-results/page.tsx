import Sidebar from '../Sidebar';
import Header from '../Header';

const ExamResultsPage = () => {
  // Data for the exam results table to make the component dynamic and easier to modify.
  const examResultsData = [
    { school: 'Army Public School', class: '11th', examDate: '25-06-2025', result: '-', viewLink: '#', printStatus: 'disabled' },
    { school: 'Sainik Public School', class: '11th', examDate: '25-06-2025', result: 'Pass', viewLink: '#', printStatus: 'enabled' },
    { school: 'Army Public School', class: '11th', examDate: '15-06-2025', result: 'Failed', viewLink: '#', printStatus: 'enabled' },
    { school: 'Sainik Public School', class: '11th', examDate: '15-06-2025', result: '-', viewLink: '#', printStatus: 'disabled' },
    { school: 'Army Public School', class: '11th', examDate: '10-06-2025', result: 'Failed', viewLink: '#', printStatus: 'enabled' },
    { school: 'Sainik Public School', class: '11th', examDate: '10-06-2025', result: 'Pass', viewLink: '#', printStatus: 'enabled' },
  ];

  return (
    <div className="flex w-full bg-[#F7F7F7] font-sans">
      {/* Sidebar Component */}
      {/* You can modify the height and activePage props as needed. */}
      <Sidebar height="1080px" activePage="Exam Results" />

      {/* Main Content Area */}
      <main className="relative w-full">
        {/* Header Component */}
        <Header />

        {/* This div contains all the content to the right of the sidebar */}
        <div style={{ top: '80px', left: '0px' }} className="relative p-8">

          {/* Page Title Section */}
          <div style={{ top: '0px', left: '0px' }} className="relative mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Exam Results</h1>
            <p className="text-sm text-gray-500">Track Your All Exam Results</p>
          </div>

          {/* Search Bar Section */}
          <div style={{ top: '70px', left: '0px', width: '300px', height: '40px' }} className="relative mb-8">
            <div className="relative w-full h-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </span>
              <input
                type="text"
                placeholder="Search here...."
                className="w-full h-full pl-10 pr-4 text-sm text-gray-700 bg-[#E8F0FE] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Exam Results Table Section */}
          <div style={{ top: '130px', left: '0px' }} className="relative bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-800">Entrance Exam Results</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-600 bg-[#E8F0FE] p-4 rounded-t-lg">
                  <div className="text-left">School</div>
                  <div className="text-center">Class</div>
                  <div className="text-center">Exam Date</div>
                  <div className="text-center">Result</div>
                  <div className="text-center">View Result</div>
                  <div className="text-center">Print Result</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                  {examResultsData.map((row, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 p-4 items-center text-sm text-gray-700">
                      <div className="text-left font-medium">{row.school}</div>
                      <div className="text-center text-gray-500">{row.class}</div>
                      <div className="text-center text-gray-500">{row.examDate}</div>
                      <div className={`text-center font-semibold ${row.result === 'Pass' ? 'text-green-600' : row.result === 'Failed' ? 'text-red-600' : 'text-gray-500'}`}>
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
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Custom Scrollbar */}
          <div 
            style={{ 
              position: 'absolute', 
              top: '180px', 
              right: '-15px', // Adjusted for better visibility
              width: '8px', 
              height: '150px', // Example height, can be dynamic
              backgroundColor: '#257B5A',
              borderRadius: '4px'
            }}
          ></div>

        </div>
      </main>
    </div>
  );
};

export default ExamResultsPage;