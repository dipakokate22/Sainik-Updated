import Sidebar from '../Sidebar';
import Header from '../Header';
import Link from 'next/link';

const EntranceExamsPage = () => {
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
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#F7F7F7] font-sans">
      <Sidebar height="100vh" activePage="Entrance Exams" />

      <main className="flex-1 w-full">
        <Header />

        <div className="relative top-[64px] px-4 md:px-8 pt-8 pb-16 w-full max-w-screen-xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Entrance Exam</h1>
            <p className="text-sm text-gray-500">Track your upcoming exams & registered exams</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="relative w-full h-[140px] bg-[#46B495] rounded-xl shadow-md p-6 text-white">
              <p className="text-4xl font-bold">12</p>
              <p className="text-lg">Upcoming Exams</p>
            </div>
            <div className="relative w-full h-[140px] bg-[#5B63B7] rounded-xl shadow-md p-6 text-white">
              <p className="text-4xl font-bold">15</p>
              <p className="text-lg">Registered Exams</p>
            </div>
            <div className="relative w-full h-[140px] bg-[#B959C9] rounded-xl shadow-md p-6 text-white">
              <p className="text-4xl font-bold">23</p>
              <p className="text-lg">Completed Exams</p>
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Upcoming Exams</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
            </div>
            <div className="space-y-4">
              {upcomingExams.map((exam, index) => (
                <div key={index} className={`flex flex-col md:flex-row justify-between md:items-center gap-3 ${index < upcomingExams.length - 1 ? 'border-b pb-4' : ''}`}>
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

          {/* Registered Exams */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Registered Exams</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
            </div>
            <div className="space-y-4">
              {registeredExams.map((exam, index) => (
                <div key={index} className={`flex flex-col md:flex-row justify-between md:items-center gap-3 ${index < registeredExams.length - 1 ? 'border-b pb-4' : ''}`}>
                  <div>
                    <h3 className="font-medium text-gray-800">{exam.name}</h3>
                    <p className="text-sm text-gray-500">Date: {exam.date}</p>
                  </div>
                  {exam.status === 'start' ? (
                    <Link href="/StudentDashboard/exam-overview" className="text-sm text-blue-600 font-medium hover:underline">
                      Start Exam
                    </Link>
                  ) : (
                    <p className="text-sm text-gray-600">{exam.status}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Completed Exams */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Completed Exams</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
            </div>
            <div className="space-y-4">
              {completedExams.map((exam, index) => (
                <div key={index} className={`flex flex-col md:flex-row justify-between md:items-center gap-3 ${index < completedExams.length - 1 ? 'border-b pb-4' : ''}`}>
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
