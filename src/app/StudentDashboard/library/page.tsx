'use client';
import { useState } from 'react';
import Image from 'next/image';
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
  imageUrl: string;
  className?: string;
}

const ResourceCard = ({ title, topic, downloads, size, imageUrl, className }: ResourceCardProps) => (
  <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col ${className}`}>
    <div className="bg-[#EAF2FF] flex items-center justify-center py-4">
      <Image src={imageUrl} alt="Resource Icon" width={70} height={85} style={{ objectFit: 'contain' }} />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <div>
        <h3 className="text-base font-semibold text-gray-800 truncate">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">Topic : {topic}</p>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
          <div className="flex items-center">
            <Image src="/images/student_library_images/download_arrow.jpg" alt="Download count" width={12} height={12} />
            <span className="ml-2">{downloads} Downloads</span>
          </div>
          <span>{size}</span>
        </div>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
          <a href="#" className="flex items-center text-blue-600 hover:underline text-sm">
            <Image src="/images/student_library_images/preview_eye.jpg" alt="Preview" width={18} height={18} />
            <span className="ml-2 font-medium">Preview</span>
          </a>
          <a href="#" className="flex items-center text-green-600 hover:underline text-sm">
            <Image src="/images/student_library_images/green_download.jpg" alt="Download" width={18} height={18} />
            <span className="ml-2 font-medium">Download</span>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default function LibraryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { title: 'Total Resources', value: '450', icon: '/images/student_library_images/total_resources.png' },
    { title: 'Recently Added', value: '12', icon: '/images/student_library_images/recently_added.png' },
    { title: 'Downloaded', value: '25', icon: '/images/student_library_images/downloaded.png' },
    { title: 'Total Subjects', value: '12', icon: '/images/student_library_images/total_subjects.png' },
  ];

  const resources = Array(4).fill({
    title: 'Organic Chemistry Notes',
    topic: 'Phenols and ethers',
    downloads: 245,
    size: '25MB',
    imageUrl: '/images/pdf.png',
  });

  return (
    <div className={`flex bg-gray-50 min-h-screen ${poppins.className}`}>
      {/* Sidebar with open state and setter */}
      <Sidebar activePage="Library" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

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
        {/* Header fixed, shifted right on desktop */}
        
            <Header />
          

        {/* Main content with padding to avoid header and sidebar */}
        <main className="flex-grow pt-[50px] px-4 md:px-8 md:pl-[180px] max-w-screen-xl w-full mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800">Student Library</h1>
          <p className="text-sm text-gray-500 mt-1">Access all your course materials, textbooks and study resources</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            {stats.map((stat, index) => (
              <div key={index} className="flex justify-center">
                <Image src={stat.icon} alt={stat.title} width={230} height={180} className="rounded-xl shadow-md" />
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4 space-y-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-[#257B5A] underline mb-4">Categories</h2>
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

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-[#257B5A] underline mb-4">Subjects</h2>
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

            <div className="flex-1">
              <div className="flex justify-end mb-4">
                <a href="#" className="text-sm font-semibold text-[#6A5AE0] hover:underline">
                  View All
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <ResourceCard
                    key={index}
                    title={resource.title}
                    topic={resource.topic}
                    downloads={resource.downloads}
                    size={resource.size}
                    imageUrl={resource.imageUrl}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
