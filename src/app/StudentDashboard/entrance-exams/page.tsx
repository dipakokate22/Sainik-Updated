'use client';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Link from 'next/link';

const EntranceExamsPage = () => {
  const studentGrade = '11th'; // This would come from user profile
  
  const examAttempts = [
    { 
      attemptNumber: 1, 
      date: '25 July 2025 | 10:00 AM', 
      status: 'upcoming',
      daysLeft: 15,
      result: null
    },
    { 
      attemptNumber: 2, 
      date: '09 August 2025 | 10:00 AM', 
      status: 'locked',
      daysLeft: 30,
      result: null
    },
    { 
      attemptNumber: 3, 
      date: '24 August 2025 | 10:00 AM', 
      status: 'locked',
      daysLeft: 45,
      result: null
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'available': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'locked': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Ready to Start';
      case 'available': return 'Available';
      case 'completed': return 'Completed';
      case 'locked': return 'Locked';
      default: return 'Locked';
    }
  };

  return (
    <div className="bg-[#F7F1EE] min-h-screen font-sans">
      <Sidebar activePage="Entrance Exams" />
      <Header />
      <main className="flex-grow md:ml-[270px]">
        <div className="px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Entrance Exam</h1>
            <p className="text-sm text-gray-500">Track your upcoming exams & registered exams</p>
          </div>

          {/* Current Grade Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Your Entrance Exam - Grade {studentGrade}</h2>
                <p className="text-sm text-gray-600 mt-1">Common entrance exam for all {studentGrade} students</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#5B63B7]">3</div>
                <div className="text-sm text-gray-600">Total Attempts</div>
              </div>
            </div>
          </div>

          {/* Exam Attempts */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-6">Your Exam Attempts</h2>
            
            <div className="space-y-4">
              {examAttempts.map((attempt, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full ${getStatusColor(attempt.status)} flex items-center justify-center text-white font-semibold text-sm`}>
                          {attempt.attemptNumber}
                        </div>
                        <h3 className="font-semibold text-gray-800">Attempt {attempt.attemptNumber}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          attempt.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                          attempt.status === 'available' ? 'bg-green-100 text-green-800' :
                          attempt.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {getStatusText(attempt.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">📅 Date: {attempt.date}</p>
                      {attempt.status === 'upcoming' && (
                        <p className="text-sm text-green-600 font-medium">⏰ {attempt.daysLeft} days remaining</p>
                      )}
                      {attempt.status === 'locked' && (
                        <p className="text-sm text-gray-500">🔒 Available after previous attempt</p>
                      )}
                      {attempt.result && (
                        <p className="text-sm text-gray-600">📊 Score: {attempt.result}</p>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {attempt.status === 'upcoming' ? (
                        <Link href="/StudentDashboard/exam-overview" className="bg-[#5B63B7] text-white text-sm font-medium py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                          Start Exam
                        </Link>
                      ) : attempt.status === 'completed' ? (
                        <button className="bg-gray-500 text-white text-sm font-medium py-2 px-6 rounded-lg">
                          View Result
                        </button>
                      ) : (
                        <button disabled className="bg-gray-300 text-gray-500 text-sm font-medium py-2 px-6 rounded-lg cursor-not-allowed">
                          Locked
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Guidelines */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Exam Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">📋 Exam Rules</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 3 attempts allowed with 15-day gaps</li>
                  <li>• Each attempt is 2 hours duration</li>
                  <li>• Same question pattern for all {studentGrade} students</li>
                  <li>• Best score among 3 attempts will be considered</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">📚 Preparation Tips</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Review your {studentGrade} syllabus thoroughly</li>
                  <li>• Practice previous year questions</li>
                  <li>• Take mock tests regularly</li>
                  <li>• Manage time effectively during exam</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EntranceExamsPage;
