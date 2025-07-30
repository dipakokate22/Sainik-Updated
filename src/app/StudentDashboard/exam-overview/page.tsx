import React from 'react';
import Image from 'next/image';

// Helper component for individual question buttons in the palette
const QuestionButton = ({ number, status }: { number: number; status: 'answered' | 'current' | 'unvisited' | string }) => {
  const baseClasses = "w-10 h-8 flex items-center justify-center rounded border text-sm font-medium cursor-pointer transition-colors";
  let statusClasses = "";

  switch (status) {
    case 'answered':
      statusClasses = "bg-green-500 text-white border-green-500";
      break;
    case 'current':
      statusClasses = "bg-white text-green-600 border-2 border-green-600";
      break;
    case 'unvisited':
      statusClasses = "bg-gray-200 text-gray-700 border-gray-300";
      break;
    default: // Not answered but visited
      statusClasses = "bg-gray-400 text-white border-gray-500";
  }

  return <div className={`${baseClasses} ${statusClasses}`}>{number}</div>;
};


const ExamPage = () => {
  // Data for the question palette
  const sections = {
    "Section I: Maths": Array.from({ length: 25 }, (_, i) => i + 1),
    "Section II: Reasoning": Array.from({ length: 25 }, (_, i) => i + 26),
    "Section III: Science": Array.from({ length: 25 }, (_, i) => i + 51), // Example data
  };

  // Data for the overview section
  const overviewStats = [
    { label: 'Total Questions', value: 100 },
    { label: 'Answered', value: 55 },
    { label: 'Not Answered', value: 45 },
    { label: 'Visited', value: 71 },
    { label: 'Not Visited', value: 29 },
    { label: 'Bookmarked', value: 16 },
  ];

  const options = ['Option A text', 'Option B text', 'Option C text', 'Option D text'];

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] font-sans flex flex-col">
      {/* Header Section */}
      <header style={{ height: '60px' }} className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center text-lg">
          <span className="font-semibold text-gray-800">Entrance Exam</span>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-gray-600">Reasoning</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Exit</button>
          <button className="flex items-center bg-[#2A3E7B] text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
            Review And Submit
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex flex-grow overflow-hidden">
        {/* Left Sidebar: Question Palette */}
        <aside style={{ width: '300px' }} className="relative bg-white border-r border-gray-200 p-4 overflow-y-auto">
           {/* Custom Scrollbar */}
           <div 
            style={{ 
              position: 'absolute', 
              top: '20px', 
              right: '5px',
              width: '6px', 
              height: '80%', // Adjust height as needed
              backgroundColor: '#D3D3D3',
              borderRadius: '3px'
            }}
          ></div>
          {Object.entries(sections).map(([title, questions]) => (
            <div key={title} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">{title}</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map(qNum => {
                  let status = 'unvisited';
                  if (qNum === 26) status = 'answered';
                  if (qNum === 27) status = 'current';
                  return <QuestionButton key={qNum} number={qNum} status={status} />;
                })}
              </div>
            </div>
          ))}
        </aside>

        {/* Center: Question and Options */}
        <main style={{ flex: '2' }} className="p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Q.27</h2>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                The following question, consists of an incomplete sentence or a sentence which is split into four parts. All four parts are jumbled up and are named as P, Q, R and S. These four parts are not given in their proper order. Arrange the jumbled parts of the sentence and find out which of the four combinations from the given options will correctly complete the sentence.
              </p>
              <div className="border-t border-gray-200 pt-4">
                 <p className="text-gray-800 font-medium">For some people patriotism __________ as much as to any one country.</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {options.map((option, index) => (
                 <div key={index} className="flex items-center bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                   <span className="font-semibold mr-4">{String.fromCharCode(65 + index)})</span>
                   <p className="text-gray-700">{option}</p>
                 </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input type="checkbox" id="bookmark" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="bookmark" className="ml-2 text-sm font-medium text-gray-700">Bookmark</label>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="flex items-center text-sm font-medium text-gray-600 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100">
                        <img src="" alt="Clear Icon" className="w-4 h-4 mr-2"/>
                        Clear Response
                    </button>
                    <button className="flex items-center text-sm font-medium text-gray-600 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100">
                        Skip and Next →
                    </button>
                </div>
                <button className="w-full flex items-center justify-center text-sm font-medium text-gray-700 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-100">
                    Read Instructions
                </button>
            </div>

          </div>
        </main>

        {/* Right Sidebar: Timer and Overview */}
        <aside style={{ width: '300px' }} className="bg-white border-l border-gray-200 p-6 flex-shrink-0">
            {/* Timer */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center mb-6">
                <div className="flex justify-around items-baseline">
                    <div className="text-4xl font-bold text-gray-800">02</div>
                    <div className="text-2xl font-semibold text-gray-600">:</div>
                    <div className="text-4xl font-bold text-gray-800">59</div>
                    <div className="text-2xl font-semibold text-gray-600">:</div>
                    <div className="text-4xl font-bold text-gray-800">59</div>
                </div>
                <div className="flex justify-around text-xs text-gray-500 mt-1">
                    <span>Hrs</span>
                    <span>Min</span>
                    <span>Sec</span>
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
                <button className="w-full text-sm font-medium text-gray-700 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-100">About Test</button>
                <button className="w-full flex items-center justify-center text-sm font-medium text-gray-700 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-100">
                   <img src="" alt="Book Icon" className="w-4 h-4 mr-2" />
                    Read Instructions
                </button>
            </div>

            {/* Overview Section */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3 pb-2 border-b">Overview</h3>
                <div className="space-y-2.5 text-sm">
                    {overviewStats.map(stat => (
                        <div key={stat.label} className="flex justify-between items-center">
                            <span className="text-gray-600">{stat.label}</span>
                            <span className="font-semibold text-gray-800">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
      </div>
    </div>
  );
};

export default ExamPage;
