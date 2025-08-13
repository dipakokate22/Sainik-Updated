'use client';
import { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Link from 'next/link';
import { Calendar, Clock, AlertTriangle, CheckCircle, XCircle, X, FileText } from 'lucide-react';

// Fixed exam end date
const EXAM_END_DATE = new Date('2025-06-30');
const registrationDate = new Date('2025-05-01');

// Calculate exam scheduling logic (modified to show 1-2 attempts remaining)
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
  
  for (let i = 1; i <= 3; i++) {
    const attemptDate = new Date(regDate);
    attemptDate.setDate(regDate.getDate() + (i * gapDays));
    
    let status = 'cancelled';
    let score = null;
    
    if (i <= possibleAttempts && attemptDate <= endDate) {
      // Modified logic: show only 1-2 attempts remaining
      if (i === 1) {
        status = 'completed';
        score = Math.floor(Math.random() * 30) + 70;
      } else if (i <= 2 && attemptDate > new Date()) {
        status = 'upcoming';
      } else if (i <= 2 && attemptDate <= new Date()) {
        status = 'yet_to_start';
      } else {
        status = 'cancelled';
      }
    }
    
    attempts.push({
      attemptNumber: i,
      date: attemptDate.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      }) + ' | 10:00 AM',
      status,
      score,
      daysFromRegistration: i * gapDays,
      isValid: i <= possibleAttempts && attemptDate <= endDate,
      fullDate: attemptDate
    });
  }
  
  return { attempts, gapDays, possibleAttempts, daysUntilEnd };
};

const EntranceExamsPage = () => {
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [instructionsAccepted, setInstructionsAccepted] = useState(false);
  const [selectedAttempt, setSelectedAttempt] = useState<number | null>(null);
  
  const studentGrade = '11th';
  const examSchedule = calculateExamSchedule(registrationDate, EXAM_END_DATE);
  const { attempts: examAttempts, gapDays, possibleAttempts, daysUntilEnd } = examSchedule;
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'upcoming':
      case 'yet_to_start':
        return <Clock className="text-blue-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-400" size={20} />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming':
      case 'yet_to_start':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStartExam = (attemptNumber: number) => {
    setSelectedAttempt(attemptNumber);
    setShowInstructionsModal(true);
    setInstructionsAccepted(false);
  };

  const handleStartExamFromModal = () => {
    if (instructionsAccepted) {
      setShowInstructionsModal(false);
      // Navigate to exam overview page
      window.location.href = '/StudentDashboard/exam-overview';
    }
  };

  const examInstructions = [
    "Read all questions carefully before answering.",
    "Each question carries equal marks.",
    "There is no negative marking for wrong answers.",
    "You can navigate between questions using the question palette.",
    "You can bookmark questions for later review.",
    "The exam will auto-submit when time expires.",
    "Ensure stable internet connection throughout the exam.",
    "Do not refresh the browser during the exam.",
    "You can review and change answers before final submission.",
    "Click 'Review and Submit' when you're ready to finish."
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden font-sans relative">
      <Sidebar activePage="Entrance Exams" />

      <div className="md:pl-[270px]">
        <Header />
        
        <div className="px-4 md:px-8 py-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Sainik School Entrance Exams
            </h1>
            <p className="text-gray-600">
              Grade {studentGrade} • Academic Year 2025-26
            </p>
          </div>

          {/* Registration Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="mr-2 text-[#257B5A]" size={24} />
              Registration & Schedule Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Registration Date</h3>
                <p className="text-blue-700">{registrationDate.toLocaleDateString('en-GB')}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800">Exam End Date</h3>
                <p className="text-red-700">{EXAM_END_DATE.toLocaleDateString('en-GB')}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Days Available</h3>
                <p className="text-green-700">{daysUntilEnd} days</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Interval</h3>
                <p className="text-purple-700">{gapDays} days</p>
              </div>
            </div>
            
            {possibleAttempts < 3 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="text-yellow-400 mr-2" size={20} />
                  <div>
                    <h3 className="font-semibold text-yellow-800">Late Registration Notice</h3>
                    <p className="text-yellow-700 text-sm">
                      Due to registration {daysUntilEnd} days before the end date, only {possibleAttempts} out of 3 attempts are available.
                      {3 - possibleAttempts} attempt(s) have been cancelled.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Exam Attempts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Your Exam Attempts ({examAttempts.filter(a => a.status === 'yet_to_start' || a.status === 'upcoming').length} Remaining)
            </h2>
            
            <div className="space-y-4">
              {examAttempts.map((attempt, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg p-6 transition-all duration-200 ${
                    attempt.isValid ? 'hover:shadow-md' : 'opacity-75'
                  } ${getStatusColor(attempt.status)}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {getStatusIcon(attempt.status)}
                        <h3 className="text-lg font-semibold ml-2">
                          Attempt {attempt.attemptNumber}
                        </h3>
                        <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${
                          attempt.status === 'completed' ? 'bg-green-200 text-green-800' :
                          attempt.status === 'upcoming' || attempt.status === 'yet_to_start' ? 'bg-blue-200 text-blue-800' :
                          'bg-red-200 text-red-800'
                        }`}>
                          {attempt.status === 'yet_to_start' ? 'Yet to Start' : 
                           attempt.status.charAt(0).toUpperCase() + attempt.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="flex items-center">
                          <Calendar size={14} className="mr-2" />
                          {attempt.date}
                        </p>
                        <p className="flex items-center">
                          <Clock size={14} className="mr-2" />
                          Day {attempt.daysFromRegistration} after registration
                        </p>
                        {!attempt.isValid && (
                          <p className="text-red-600 font-medium text-xs">
                            ⚠️ This attempt was cancelled due to late registration
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-6 text-right">
                      {attempt.score ? (
                        <div>
                          <div className={`text-2xl font-bold ${
                            attempt.score >= 80 ? 'text-green-600' :
                            attempt.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {attempt.score}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {attempt.score >= 80 ? 'Excellent' :
                             attempt.score >= 60 ? 'Good' : 'Needs Improvement'}
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          {attempt.status === 'upcoming' ? (
                            <div>
                              <div className="text-sm font-medium">Upcoming</div>
                              <div className="text-xs">
                                {Math.max(0, Math.floor((attempt.fullDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days left
                              </div>
                            </div>
                          ) : attempt.status === 'yet_to_start' ? (
                            <div className="text-sm font-medium text-blue-600">Ready to Start</div>
                          ) : attempt.status === 'cancelled' ? (
                            <div className="text-sm font-medium text-red-600">Cancelled</div>
                          ) : (
                            <div className="text-sm font-medium">Pending</div>
                          )}
                        </div>
                      )}
                      
                      {(attempt.status === 'upcoming' || attempt.status === 'yet_to_start') && attempt.isValid && (
                        <button 
                          onClick={() => handleStartExam(attempt.attemptNumber)}
                          className="inline-block mt-2 bg-[#257B5A] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1e6b4a] transition-colors"
                        >
                          Start Exam
                        </button>
                      )}
                      
                      {attempt.status === 'completed' && (
                        <Link 
                          href="/StudentDashboard/exam-results" 
                          className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          View Results
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Exam Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {examAttempts.filter(a => a.status === 'completed').length}
                </div>
                <div className="text-sm text-green-700">Completed</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {examAttempts.filter(a => a.status === 'yet_to_start').length}
                </div>
                <div className="text-sm text-blue-700">Yet to Start</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {examAttempts.filter(a => a.status === 'upcoming').length}
                </div>
                <div className="text-sm text-yellow-700">Upcoming</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">
                  {examAttempts.filter(a => a.status === 'cancelled').length}
                </div>
                <div className="text-sm text-red-700">Cancelled</div>
              </div>
            </div>
            
            {examAttempts.filter(a => a.score).length > 0 && (
              <div className="mt-4 bg-[#257B5A] text-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">
                  {Math.round(examAttempts.filter(a => a.score).reduce((acc, a) => acc + a.score!, 0) / examAttempts.filter(a => a.score).length)}%
                </div>
                <div className="text-sm opacity-90">Average Score</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exam Instructions Modal */}
      {showInstructionsModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-lg shadow-2xl border border-gray-300 w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#257B5A] text-white p-6 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="mr-3" size={24} />
                <div>
                  <h2 className="text-xl font-bold">Exam Instructions</h2>
                  <p className="text-sm opacity-90">Attempt {selectedAttempt} - Please read carefully</p>
                </div>
              </div>
              <button 
                onClick={() => setShowInstructionsModal(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Important Guidelines:</h3>
                <div className="space-y-3">
                  {examInstructions.map((instruction, index) => (
                    <div key={index} className="flex items-start">
                      <span className="bg-[#257B5A] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 text-sm leading-relaxed">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
                <div className="flex items-center">
                  <AlertTriangle className="text-yellow-400 mr-2" size={20} />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Important Notice</h4>
                    <p className="text-yellow-700 text-sm mt-1">
                      Once you start the exam, you cannot pause or restart it. Make sure you have a stable internet connection and sufficient time to complete the exam.
                    </p>
                  </div>
                </div>
              </div>

              {/* Acceptance Checkbox */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-start cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={instructionsAccepted}
                    onChange={(e) => setInstructionsAccepted(e.target.checked)}
                    className="w-5 h-5 text-[#257B5A] border-gray-300 rounded focus:ring-[#257B5A] mt-0.5 mr-3"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I have read and understood all the exam instructions. I agree to follow all the guidelines and understand that any violation may result in disqualification.
                  </span>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <button 
                onClick={() => setShowInstructionsModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleStartExamFromModal}
                disabled={!instructionsAccepted}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  instructionsAccepted 
                    ? 'bg-[#257B5A] text-white hover:bg-[#1e6b4a]' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntranceExamsPage;
