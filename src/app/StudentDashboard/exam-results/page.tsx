'use client';
import { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Calendar, Clock, Award, TrendingUp, X, User, BookOpen, Printer } from 'lucide-react';

const ExamResultsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedAttempt, setSelectedAttempt] = useState<any>(null);

  // Fixed exam end date and registration date (same as dashboard)
  const EXAM_END_DATE = new Date('2024-06-30');
  const registrationDate = new Date('2024-05-01');

  // Calculate exam scheduling logic (same as dashboard)
  const calculateExamSchedule = (regDate: Date, endDate: Date) => {
    const daysUntilEnd = Math.floor((endDate.getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let attempts = [];
    let gapDays = 0;
    let possibleAttempts = 0;
    
    if (daysUntilEnd >= 45) {
      gapDays = 15;
      possibleAttempts = 3;
    } else if (daysUntilEnd >= 3) {
      gapDays = Math.floor(daysUntilEnd / 3);
      possibleAttempts = 3;
      
      if (gapDays < 1) {
        if (daysUntilEnd >= 2) {
          gapDays = 1;
          possibleAttempts = Math.min(daysUntilEnd, 3);
        } else {
          gapDays = 1;
          possibleAttempts = daysUntilEnd;
        }
      }
    } else {
      gapDays = 1;
      possibleAttempts = Math.max(0, daysUntilEnd);
    }
    
    // Generate attempt dates
    for (let i = 1; i <= 3; i++) {
      const attemptDate = new Date(regDate);
      attemptDate.setDate(regDate.getDate() + (i * gapDays));
      
      let status = 'cancelled';
      let score = null;
      let percentage = null;
      let result = null;
      let totalQuestions = 100;
      let answered = 0;
      let notAnswered = 0;
      let totalMarks = 0;
      
      if (i <= possibleAttempts && attemptDate <= endDate) {
        if (attemptDate <= new Date()) {
          status = 'completed';
          score = Math.floor(Math.random() * 30) + 70; // Random score 70-100
          percentage = score;
          result = score >= 60 ? 'Pass' : 'Fail';
          answered = Math.floor(Math.random() * 20) + 80; // 80-100 answered
          notAnswered = totalQuestions - answered;
          totalMarks = answered * 4; // 4 marks per question
        } else {
          status = 'upcoming';
        }
      }
      
      attempts.push({
        attemptNumber: i,
        examDate: attemptDate.toLocaleDateString('en-GB'),
        actualDate: attemptDate,
        status: status === 'completed' ? 'Completed' : status === 'upcoming' ? 'Available' : 'Cancelled',
        score: score ? `${score}/100` : '-',
        percentage: percentage ? `${percentage}%` : '-',
        result: result || '-',
        viewLink: '#',
        printStatus: status === 'completed' ? 'enabled' : 'disabled',
        daysFromRegistration: i * gapDays,
        // Additional data for modal
        totalQuestions,
        answered,
        notAnswered,
        totalMarks,
        maxMarks: totalQuestions * 4
      });
    }
    
    return { attempts, gapDays, possibleAttempts, daysUntilEnd };
  };

  const examSchedule = calculateExamSchedule(registrationDate, EXAM_END_DATE);
  const { attempts: entranceExamResults, gapDays, possibleAttempts, daysUntilEnd } = examSchedule;

  // Calculate statistics (removed rank calculations)
  const completedAttempts = entranceExamResults.filter(attempt => attempt.status === 'Completed');
  const bestScore = completedAttempts.length > 0 
    ? Math.max(...completedAttempts.map(attempt => parseInt(attempt.score.split('/')[0])))
    : 0;
  const bestPercentage = completedAttempts.length > 0 
    ? Math.max(...completedAttempts.map(attempt => parseInt(attempt.percentage.replace('%', ''))))
    : 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Available':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
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

  const handleViewResult = (attempt: any) => {
    setSelectedAttempt(attempt);
    setShowResultModal(true);
  };

  const handlePrintResult = (attempt: any) => {
    setSelectedAttempt(attempt);
    setShowPrintModal(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCloseModal = () => {
    setShowResultModal(false);
    setShowPrintModal(false);
    setSelectedAttempt(null);
  };

  const ResultModalContent = ({ attempt, showPrintButton = false }: { attempt: any, showPrintButton?: boolean }) => (
    <div className="bg-white rounded-lg shadow-2xl border border-gray-300 w-full max-w-2xl">

      {/* Modal Header */}
      <div className="bg-[#257B5A] text-white p-6 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center">
          <Award className="mr-3" size={24} />
          <div>
            <h2 className="text-xl font-bold">Exam Result</h2>
            <p className="text-sm opacity-90">Attempt {attempt?.attemptNumber} - {attempt?.examDate}</p>
          </div>
        </div>
        <button 
          onClick={handleCloseModal}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Modal Content */}
      <div className="p-6">
        {/* Student Information */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-3">
            <User className="mr-2 text-gray-600" size={20} />
            <h3 className="font-semibold text-gray-800">Student Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 font-medium">John Doe</span>
            </div>
            <div>
              <span className="text-gray-600">Standard:</span>
              <span className="ml-2 font-medium">11th Grade</span>
            </div>
          </div>
        </div>

        {/* Result Overview */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <BookOpen className="mr-2 text-gray-600" size={20} />
            <h3 className="font-semibold text-gray-800">Result Overview</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{attempt?.totalQuestions}</div>
              <div className="text-sm text-blue-700">Total Questions</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{attempt?.answered}</div>
              <div className="text-sm text-green-700">Answered</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">{attempt?.notAnswered}</div>
              <div className="text-sm text-red-700">Not Answered</div>
            </div>
            <div className="bg-[#257B5A] p-4 rounded-lg text-center text-white">
              <div className="text-2xl font-bold">{attempt?.totalMarks}/{attempt?.maxMarks}</div>
              <div className="text-sm opacity-90">Total Marks</div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className={`border-l-4 p-4 rounded-lg ${
          attempt?.result === 'Pass' 
            ? 'bg-green-50 border-green-400' 
            : 'bg-red-50 border-red-400'
        }`}>
          <h4 className={`font-semibold mb-2 ${
            attempt?.result === 'Pass' ? 'text-green-800' : 'text-red-800'
          }`}>
            Result: {attempt?.result} ({attempt?.percentage})
          </h4>
          <p className={`text-sm ${
            attempt?.result === 'Pass' ? 'text-green-700' : 'text-red-700'
          }`}>
            {attempt?.result === 'Pass' 
              ? 'Congratulations! You have successfully passed the examination.' 
              : 'You need to improve your performance. Consider retaking the exam if attempts are available.'}
          </p>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200 rounded-b-lg">
        <button 
          onClick={handleCloseModal}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          Close
        </button>
        {showPrintButton && (
          <button 
            onClick={handlePrint}
            className="flex items-center px-6 py-2 bg-[#257B5A] text-white rounded-md font-medium hover:bg-[#1e6b4a] transition-colors"
          >
            <Printer className="mr-2" size={16} />
            Print Result
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[#F7F1EE] min-h-screen font-poppins text-black">
      <Sidebar activePage="Exam Results" />

      <div className="md:pl-[270px]">
        <Header />

        <div className="px-4 md:px-8 py-6 space-y-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
              <Award className="mr-2 text-[#257B5A]" size={28} />
              Exam Results
            </h1>
            <p className="text-sm text-gray-500 mt-1">Track Your All Exam Results with {gapDays}-Day Intervals</p>
          </div>

          {/* Registration Info Alert */}
          {possibleAttempts < 3 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex items-center">
                <div>
                  <h3 className="font-semibold text-yellow-800">Late Registration Notice</h3>
                  <p className="text-yellow-700 text-sm">
                    You registered {daysUntilEnd} days before the exam end date. 
                    Only {possibleAttempts} attempt(s) are available with {gapDays}-day intervals.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Exam Overview Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start border-b pb-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <TrendingUp className="mr-2 text-[#257B5A]" size={24} />
                  Sainik School Entrance Exam Results
                </h2>
                <p className="text-sm text-gray-600 mt-1">Grade 11 • {gapDays}-Day Intervals • Registration: {registrationDate.toLocaleDateString('en-GB')}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#257B5A] text-white">
                  {possibleAttempts} Attempts Available
                </span>
              </div>
            </div>

            {/* Best Score Summary (removed rank card) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="text-sm font-medium text-green-800">Best Score</h3>
                <p className="text-2xl font-bold text-green-600">{bestScore > 0 ? `${bestScore}/100` : 'N/A'}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-sm font-medium text-blue-800">Best Percentage</h3>
                <p className="text-2xl font-bold text-blue-600">{bestPercentage > 0 ? `${bestPercentage}%` : 'N/A'}</p>
              </div>
              <div className="bg-[#257B5A] p-4 rounded-lg text-white">
                <h3 className="text-sm font-medium">Attempts Used</h3>
                <p className="text-2xl font-bold">{completedAttempts.length}/{possibleAttempts}</p>
              </div>
            </div>

            {/* Schedule Summary */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 text-sm flex items-center">
                <Calendar className="mr-2" size={16} />
                Schedule Summary
              </h4>
              <p className="text-blue-700 text-xs mt-1">
                {daysUntilEnd} days available • {gapDays}-day intervals • {possibleAttempts}/3 attempts possible
              </p>
            </div>
          </div>

          {/* Detailed Results Table */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Attempt-wise Results</h2>
              <p className="text-sm text-gray-600 mt-2 md:mt-0">Detailed breakdown of all attempts</p>
            </div>

            {/* Scrollable Table Container */}
            <div className="w-full overflow-x-auto bg-white">
              <table className="min-w-[700px] md:w-full text-sm text-gray-700 text-left">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="py-3 px-4 font-medium">Attempt</th>
                    <th className="py-3 px-4 font-medium">Exam Date</th>
                    <th className="py-3 px-4 font-medium">Days from Registration</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium">Score</th>
                    <th className="py-3 px-4 font-medium">Percentage</th>
                    <th className="py-3 px-4 font-medium">Result</th>
                    <th className="py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {entranceExamResults.map((attempt, index) => (
                    <tr key={index} className={`${
                      attempt.status === 'Available' ? 'bg-blue-50' : 
                      attempt.status === 'Completed' ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-medium">Attempt {attempt.attemptNumber}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">{attempt.examDate}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-blue-600 font-medium">Day {attempt.daysFromRegistration}</span>
                      </td>
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
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          {attempt.status === 'Completed' ? (
                            <>
                              <button 
                                onClick={() => handleViewResult(attempt)}
                                className="text-[#257B5A] hover:underline text-xs font-medium"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handlePrintResult(attempt)}
                                className={`py-1 px-3 rounded text-xs font-semibold text-white ${
                                  attempt.printStatus === 'disabled'
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#257B5A] hover:bg-[#1e6b4a]'
                                }`}
                                disabled={attempt.printStatus === 'disabled'}
                              >
                                Print
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-gray-500">
                              {attempt.status === 'Available' ? 'Upcoming' : 'Not Available'}
                            </span>
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
              <h3 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
                <Clock className="mr-2" size={16} />
                Important Notes:
              </h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• You have used {completedAttempts.length} out of {possibleAttempts} available attempts</li>
                <li>• Exam attempts are scheduled with {gapDays}-day intervals from registration date</li>
                <li>• Your best score of {bestPercentage > 0 ? `${bestPercentage}%` : 'N/A'} {bestPercentage >= 60 ? 'qualifies you for admission consideration' : 'may require improvement'}</li>
                <li>• Results are valid for the current academic year only</li>
                <li>• Contact support if you need assistance with your results</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* View Result Modal */}
      {showResultModal && selectedAttempt && (
        <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <ResultModalContent attempt={selectedAttempt} />
        </div>
      )}

      {/* Print Result Modal */}
      {showPrintModal && selectedAttempt && (
        <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <ResultModalContent attempt={selectedAttempt} showPrintButton={true} />
        </div>
      )}
    </div>
  );
};

export default ExamResultsPage;
