'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Award, User, BookOpen } from 'lucide-react';

const ExamPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showResultModal, setShowResultModal] = useState(false);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  
  const totalQuestions = 100;
  const timeRemaining = { hours: 2, minutes: 59, seconds: 59 };
  
  // Sample questions data
  const questions = {
    1: {
      question: "The following question, consists of an incomplete sentence or a sentence which is split into four parts. All four parts are jumbled up and are named as P, Q, R and S. These four parts are not given in their proper order. Arrange the jumbled parts of the sentence and find out which of the four combinations from the given options will correctly complete the sentence.",
      subQuestion: "For some people patriotism __________ as much as to any one country.",
      options: [
        "Option A: does not mean being loyal",
        "Option B: means being loyal to one's country", 
        "Option C: is about serving the nation",
        "Option D: involves dedication and sacrifice"
      ]
    },
    // Add more questions as needed
  };

  const currentQuestionData = questions[1]; // For demo, using question 1
  
  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleOptionSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: option }));
  };

  const handleSubmit = () => {
    setShowResultModal(true);
  };

  const handleCloseResult = () => {
    setShowResultModal(false);
    // Navigate to exam results page
    window.location.href = '/StudentDashboard/exam-results';
  };

  // Calculate result statistics
  const answeredQuestions = Object.keys(answers).length;
  const notAnswered = totalQuestions - answeredQuestions;
  const totalMarks = answeredQuestions * 4; // Assuming 4 marks per question
  const maxMarks = totalQuestions * 4;

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] font-sans flex flex-col">
      {/* Header Section */}
      <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-6 py-4">
        <div className="flex items-center text-lg">
          <span className="font-semibold text-gray-800">Entrance Exam</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleSubmit}
            className="flex items-center bg-[#2A3E7B] text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Submit
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex flex-grow overflow-hidden">
        {/* Center: Question and Options - Now takes full width */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Q.{currentQuestion}</h2>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                {currentQuestionData.question}
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-800 font-medium">{currentQuestionData.subQuestion}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {currentQuestionData.options.map((option, index) => (
                <div 
                  key={index} 
                  onClick={() => handleOptionSelect(option)}
                  className={`flex items-center border rounded-lg p-4 cursor-pointer transition-colors ${
                    answers[currentQuestion] === option 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50'
                  }`}
                >
                  <span className="font-semibold mr-4">{String.fromCharCode(65 + index)})</span>
                  <p className="text-gray-700">{option}</p>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handlePrevious}
                disabled={currentQuestion === 1}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentQuestion === 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </button>
              
              <span className="text-sm text-gray-600">
                Question {currentQuestion} of {totalQuestions}
              </span>
              
              <button 
                onClick={handleNext}
                disabled={currentQuestion === totalQuestions}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentQuestion === totalQuestions 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </main>

        {/* Right Sidebar: Timer Only */}
        <aside className="w-80 bg-white border-l border-gray-200 p-6 flex-shrink-0">
          {/* Timer */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Time Remaining</h3>
            <div className="flex justify-around items-baseline">
              <div className="text-4xl font-bold text-gray-800">{String(timeRemaining.hours).padStart(2, '0')}</div>
              <div className="text-2xl font-semibold text-gray-600">:</div>
              <div className="text-4xl font-bold text-gray-800">{String(timeRemaining.minutes).padStart(2, '0')}</div>
              <div className="text-2xl font-semibold text-gray-600">:</div>
              <div className="text-4xl font-bold text-gray-800">{String(timeRemaining.seconds).padStart(2, '0')}</div>
            </div>
            <div className="flex justify-around text-xs text-gray-500 mt-1">
              <span>Hrs</span>
              <span>Min</span>
              <span>Sec</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Result Modal */}
      {showResultModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-[2px] flex items-center justify-center z-50 px-4 py-8">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-300 w-full max-w-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#257B5A] text-white p-6 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center">
                <Award className="mr-3" size={24} />
                <div>
                  <h2 className="text-xl font-bold">Exam Result</h2>
                  <p className="text-sm opacity-90">Sainik School Entrance Exam</p>
                </div>
              </div>
              <button 
                onClick={handleCloseResult}
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
                    <span className="ml-2 font-medium text-black">John Doe</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Standard:</span>
                    <span className="ml-2 font-medium text-black">11th Grade</span>
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
                    <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
                    <div className="text-sm text-blue-700">Total Questions</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{answeredQuestions}</div>
                    <div className="text-sm text-green-700">Answered</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">{notAnswered}</div>
                    <div className="text-sm text-red-700">Not Answered</div>
                  </div>
                  <div className="bg-[#257B5A] p-4 rounded-lg text-center text-white">
                    <div className="text-2xl font-bold">{totalMarks}/{maxMarks}</div>
                    <div className="text-sm opacity-90">Total Marks</div>
                  </div>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Performance Summary</h4>
                <p className="text-yellow-700 text-sm">
                  You have completed the exam with {answeredQuestions} out of {totalQuestions} questions answered. 
                  Your performance will be evaluated and results will be available in your exam results section.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end border-t border-gray-200 rounded-b-lg">
              <button 
                onClick={handleCloseResult}
                className="px-6 py-2 bg-[#257B5A] text-white rounded-md font-medium hover:bg-[#1e6b4a] transition-colors"
              >
                View Results Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;