'use client';
import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { getLibraryResources } from '../../../../services/studentServices';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

interface LibraryRecord {
  id: number;
  title: string;
  description: string;
  class: number;
  pdfs: any[];
}

interface ResourceCardProps {
  title: string;
  description: string;
  pdfs: { name?: string; path?: string; url?: string }[];
  className?: string;
}

const ResourceCard = ({ title, description, pdfs, className }: ResourceCardProps) => (
  <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8">
      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="text-xs text-gray-500 mb-2">PDFs:</div>
        <ul className="mb-2">
          {pdfs.map((pdf, idx) => {
            let url = '';
            let name = '';
            if (typeof pdf === 'string') {
              url = (pdf as string).replace(/^"|"$/g, '').replace(/\\/g, '/');
              name = url.split('/').pop() || 'PDF';
              url = url.startsWith('uploads/') ? `https://sainik.codekrafters.in/${url}` : url;
            } else if (typeof pdf === 'object' && pdf !== null && 'path' in pdf) {
              url = (pdf.path as string).replace(/\\/g, '/');
              name = (pdf.name as string) || url.split('/').pop() || 'PDF';
              url = url.startsWith('storage/') ? `https://sainik.codekrafters.in/${url}` : url;
            }
            return (
              <li key={idx} className="mb-1">
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>
);

export default function LibraryPage() {
  const [libraryRecords, setLibraryRecords] = useState<LibraryRecord[]>([]);
  const [showAllResources, setShowAllResources] = useState(false);

  useEffect(() => {
    interface RawLibraryRecord {
      id: number;
      title: string;
      description: string;
      class: number;
      pdfs: string;
    }

    interface GetLibraryResourcesResponse {
      records?: RawLibraryRecord[];
      [key: string]: any;
    }

    getLibraryResources()
      .then((data: GetLibraryResourcesResponse) => {
      if (data.records) {
        setLibraryRecords(
        data.records.map((rec: RawLibraryRecord) => ({
          ...rec,
          pdfs: (() => {
          try {
            const parsed: unknown = JSON.parse(rec.pdfs);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
          })(),
        }))
        );
      }
      });
  }, []);

  const displayedResources = showAllResources ? libraryRecords : libraryRecords.slice(0, 9);

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

            

            {/* Main Content Area - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayedResources.map((resource, index) => (
                <ResourceCard
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  pdfs={resource.pdfs}
                />
              ))}
            </div>

            {/* View All Button */}
            {!showAllResources && libraryRecords.length > 9 && (
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
