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
  <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow ${className}`}>
    <div className="bg-gray-50 flex items-center justify-center py-8">
      {/* PDF Icon */}
      <div className="w-16 h-20 bg-red-500 rounded-sm flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <div>
        <h3 className="text-sm font-semibold text-gray-800 truncate">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">Topic : {topic}</p>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
          <div className="flex items-center">
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="ml-1">{downloads} Downloads</span>
          </div>
          <span>{size}</span>
        </div>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
          <button className="flex items-center text-blue-600 hover:text-blue-700 text-xs font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <span className="ml-1">Preview</span>
          </button>
          <button className="flex items-center text-green-600 hover:text-green-700 text-xs font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="ml-1">Download</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function LibraryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { 
      title: 'Total Resources', 
      value: '450', 
      bgColor: '#2C946D',
      icon: (
        <svg className="w-15 h-15 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          
        </svg>
      )
    },
    { 
      title: 'Recently Added', 
      value: '12', 
      bgColor: '#5D69EA',
      icon: (
        <svg className="w-15 h-15 text-white" fill="currentColor" viewBox="0 0 24 24">
         
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      )
    },
    { 
      title: 'Downloaded', 
      value: '25', 
      bgColor: '#A36BC3',
      icon: (
        <svg className="w-15 h-15 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
      )
    },
    { 
      title: 'Total Subjects', 
      value: '12', 
      bgColor: '#BE785A',
      icon: (
        <svg className="w-15 h-15 text-white" fill="currentColor" viewBox="0 0 24 24">
          
          <path d="M21 5c-1.11 0-2 .9-2 2v11l-2-2V5c0-1.1-.89-2-2-2H4c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.89-2-2-2z"/>
        </svg>
      )
    },
  ];

  const resources = Array(4).fill({
    title: 'Organic Chemistry Notes',
    topic: 'Phenols and ethers',
    downloads: 245,
    size: '25MB',
  });

  return (
    <div className={`flex bg-[#F7F1EE] min-h-screen ${poppins.className}`}>
      {/* Sidebar with open state and setter */}
      <Sidebar activePage="Library" />

      {/* Mobile hamburger button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[60] bg-[#257B5A] p-2 rounded text-white shadow-lg"
        aria-label="Open sidebar menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main content with padding to avoid header and sidebar */}
        <main className="flex-grow md:ml-[270px]">
          <div className="px-8 py-8">
            <h1 className="text-2xl font-semibold text-gray-800">Student Library</h1>
            <p className="text-sm text-gray-500 mt-1">Access all your course materials, textbooks and study resources</p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="rounded-xl p-6 text-white shadow-lg relative overflow-hidden"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <h3 className="text-sm font-medium text-white/90 mb-2">{stat.title}</h3>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className="opacity-80">
                      {stat.icon}
                    </div>
                  </div>
                  {/* Decorative background pattern */}
                  <div className="absolute -bottom-2 -right-2 opacity-20">
                    <div className="w-16 h-16 rounded-full border-4 border-white/30"></div>
                  </div>
                  <div className="absolute -top-4 -left-4 opacity-10">
                    <div className="w-20 h-20 rounded-full border-4 border-white/20"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar Filters */}
              <div className="w-full lg:w-1/4 space-y-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#257B5A] mb-4">Categories</h2>
                  <div className="space-y-3">
                    {['All Resources', 'Featured', 'Recently Added'].map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          id={category}
                          name={category}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={category} className="ml-3 text-sm text-gray-600">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#257B5A] mb-4">Subjects</h2>
                  <div className="space-y-3">
                    {['Maths', 'Science', 'Computer Sc.', 'Hindi', 'English'].map((subject) => (
                      <div key={subject} className="flex items-center">
                        <input
                          type="checkbox"
                          id={subject}
                          name={subject}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={subject} className="ml-3 text-sm text-gray-600">{subject}</label>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="view-all-subjects"
                        name="view-all-subjects"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="view-all-subjects" className="ml-3 text-sm text-gray-600">View All</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1">
                <div className="flex justify-end mb-4">
                  <a href="#" className="text-sm font-semibold text-[#6A5AE0] hover:underline">
                    View All
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                  {resources.map((resource, index) => (
                    <ResourceCard
                      key={index}
                      title={resource.title}
                      topic={resource.topic}
                      downloads={resource.downloads}
                      size={resource.size}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}