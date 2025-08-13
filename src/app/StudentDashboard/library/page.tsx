'use client';
import { useState } from 'react';
import { Poppins } from 'next/font/google';
import Sidebar from '../Sidebar';
import Header from '../Header';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

interface ResourceCardProps {
  title: string;
  topic: string;
  downloads: number;
  size: string;
  className?: string;
}

const ResourceCard = ({ title, topic, downloads, size, className }: ResourceCardProps) => (
  <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12">
      {/* PDF Icon */}
      <div className="w-20 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Topic:</span> {topic}
        </p>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>{downloads} Downloads</span>
          </div>
          <span className="font-medium">{size}</span>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            Preview
          </button>
          <button className="flex-1 flex items-center justify-center text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function LibraryPage() {
  const [showAllResources, setShowAllResources] = useState(false);

  const allResources = [
    {
      title: 'Organic Chemistry Notes',
      topic: 'Phenols and ethers',
      downloads: 245,
      size: '25MB',
    },
    {
      title: 'Physics Mechanics',
      topic: 'Laws of Motion',
      downloads: 189,
      size: '18MB',
    },
    {
      title: 'Mathematics Calculus',
      topic: 'Differential Equations',
      downloads: 312,
      size: '22MB',
    },
    {
      title: 'Biology Cell Structure',
      topic: 'Cell Biology',
      downloads: 156,
      size: '15MB',
    },
    {
      title: 'English Literature',
      topic: 'Shakespeare Studies',
      downloads: 98,
      size: '12MB',
    },
    {
      title: 'History World Wars',
      topic: 'Modern History',
      downloads: 134,
      size: '28MB',
    },
    {
      title: 'Computer Science',
      topic: 'Data Structures',
      downloads: 267,
      size: '35MB',
    },
    {
      title: 'Geography Climate',
      topic: 'Environmental Studies',
      downloads: 87,
      size: '20MB',
    },
    {
      title: 'Economics Principles',
      topic: 'Microeconomics',
      downloads: 145,
      size: '16MB',
    },
    {
      title: 'Chemistry Reactions',
      topic: 'Chemical Bonding',
      downloads: 203,
      size: '24MB',
    },
    {
      title: 'Physics Optics',
      topic: 'Light and Reflection',
      downloads: 178,
      size: '19MB',
    },
    {
      title: 'Mathematics Algebra',
      topic: 'Quadratic Equations',
      downloads: 234,
      size: '14MB',
    },
  ];

  const displayedResources = showAllResources ? allResources : allResources.slice(0, 9);

  return (
    <div className={`flex bg-[#F7F1EE] min-h-screen ${poppins.className}`}>
      {/* Sidebar */}
      <Sidebar activePage="Library" />

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-grow md:ml-[270px]">
          <div className="px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">Student Library</h1>
              <p className="text-gray-600">Access all your course materials, textbooks and study resources</p>
            </div>

            {/* Main Content Area - 3x3 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayedResources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  title={resource.title}
                  topic={resource.topic}
                  downloads={resource.downloads}
                  size={resource.size}
                />
              ))}
            </div>

            {/* View All Button */}
            {!showAllResources && (
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAllResources(true)}
                  className="bg-[#2C946D] hover:bg-[#257B5A] text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  View All Resources
                </button>
              </div>
            )}

            {/* Show Less Button */}
            {showAllResources && (
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAllResources(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Show Less
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
