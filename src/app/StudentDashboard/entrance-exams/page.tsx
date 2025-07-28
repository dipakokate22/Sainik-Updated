import Sidebar from '../Sidebar';
import Header from '../Header';
import Image from 'next/image';
import Link from 'next/link';

const EntranceExamsPage = () => {
  // Data for the exam lists to make the component dynamic and easier to modify.
  const upcomingExams = [
    { name: 'National Defence Academy Entrance', date: '25 July 2025 | 10:00 AM' },
    { name: 'Rashtriya Indian Military College(RIMC) Exam', date: '25 July 2025 | 10:00 AM' },
  ];

  const registeredExams = [
    { name: 'National Defence Academy Entrance', date: '25 July 2025 | 10:00 AM', status: 'start' },
    { name: 'Rashtriya Indian Military College(RIMC) Exam', date: '25 July 2025 | 10:00 AM', status: '2 days left' },
  ];

  const completedExams = [
    { name: 'National Defence Academy Entrance', date: '25 July 2025 | 10:00 AM' },
    { name: 'Rashtriya Indian Military College(RIMC) Exam', date: '25 July 2025 | 10:00 AM' },
  ];

  return (
    <div className="flex w-full bg-[#F7F7F7] font-sans">
      {/* Sidebar Component */}
      {/* You can modify the height and activePage props as needed. */}
      <Sidebar height="1080px" activePage="Entrance Exams" />

      {/* Main Content Area */}
      <main className="relative w-full">
        {/* Header Component */}
        <Header />

        {/* This div contains all the content to the right of the sidebar */}
        <div style={{ top: '80px', left: '0px' }} className="relative p-8">
          
          {/* Page Title Section */}
          <div style={{ top: '0px', left: '0px' }} className="relative mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Entrance Exam</h1>
            <p className="text-sm text-gray-500">Track your upcoming exams & registered exams</p>
          </div>

          {/* Stats Cards Section */}
          <div style={{ top: '70px', left: '0px' }} className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Upcoming Exams Card */}
            <div className="relative w-full h-[140px] bg-[#46B495] rounded-xl shadow-md p-6 text-white flex flex-col justify-center">
              <div className="absolute top-4 left-4 opacity-20">
                 <img src="" alt="Upcoming Exam Icon" style={{ width: '80px', height: '80px' }} />
              </div>
              <p className="text-4xl font-bold z-10">12</p>
              <p className="text-lg z-10">Upcoming Exams</p>
            </div>
            
            {/* Registered Exams Card */}
            <div className="relative w-full h-[140px] bg-[#5B63B7] rounded-xl shadow-md p-6 text-white flex flex-col justify-center">
              <div className="absolute top-4 left-4 opacity-20">
                 <img src="" alt="Registered Exam Icon" style={{ width: '80px', height: '80px' }} />
              </div>
              <p className="text-4xl font-bold z-10">15</p>
              <p className="text-lg z-10">Registered Exams</p>
            </div>

            {/* Completed Exams Card */}
            <div className="relative w-full h-[140px] bg-[#B959C9] rounded-xl shadow-md p-6 text-white flex flex-col justify-center">
              <div className="absolute top-4 left-4 opacity-20">
                <img src="" alt="Completed Exam Icon" style={{ width: '80px', height: '80px' }} />
              </div>
              <p className="text-4xl font-bold z-10">23</p>
              <p className="text-lg z-10">Completed Exams</p>
            </div>
          </div>

          {/* Upcoming Exams List Section */}
          <div style={{ top: '100px', left: '0px' }} className="relative bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Upcoming Exams</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
            </div>
            <div className="space-y-4">
              {upcomingExams.map((exam, index) => (
                <div key={index} className={`flex justify-between items-center ${index < upcomingExams.length - 1 ? 'border-b pb-4' : ''}`}>
                  <div>
                    <h3 className="font-medium text-gray-800">{exam.name}</h3>
                    <p className="text-sm text-gray-500">Date: {exam.date}</p>
                  </div>
                  <button className="bg-[#5B63B7] text-white text-sm font-medium py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                    Register
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Registered Exams List Section */}
          <div style={{ top: '120px', left: '0px' }} className="relative bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Registered Exams</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
            </div>
            <div className="space-y-4">
              {registeredExams.map((exam, index) => (
                <div key={index} className={`flex justify-between items-center ${index < registeredExams.length - 1 ? 'border-b pb-4' : ''}`}>
                  <div>
                    <h3 className="font-medium text-gray-800">{exam.name}</h3>
                    <p className="text-sm text-gray-500">Date: {exam.date}</p>
                  </div>
                  {exam.status === 'start' ? (
                    <Link 
                      href="/StudentDashboard/exam-overview" 
                      className="text-sm text-blue-600 font-medium hover:underline"
                    >
                      Start Exam
                    </Link>
                  ) : (
                    <p className="text-sm text-gray-600">{exam.status}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Completed Exams List Section */}
          <div style={{ top: '140px', left: '0px' }} className="relative bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Completed Exams</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
            </div>
            <div className="space-y-4">
              {completedExams.map((exam, index) => (
                <div key={index} className={`flex justify-between items-center ${index < completedExams.length - 1 ? 'border-b pb-4' : ''}`}>
                  <div>
                    <h3 className="font-medium text-gray-800">{exam.name}</h3>
                    <p className="text-sm text-gray-500">Date: {exam.date}</p>
                  </div>
                  <a href="#" className="text-sm text-blue-600 font-medium hover:underline">View Result</a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EntranceExamsPage;