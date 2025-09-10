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

interface PDFFile {
  name: string;
  path: string;
  uploaded_at: string;
  full_url: string;
}

interface LibraryRecord {
  id: number;
  title: string;
  description: string;
  class: number;
  pdfs: PDFFile[];
  status: number;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: LibraryRecord[];
}

interface ResourceCardProps {
  title: string;
  description: string;
  pdfs: PDFFile[];
  className?: string;
}

const ResourceCard = ({ title, description, pdfs, className }: ResourceCardProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewUrl(null);
  };

  return (
    <>
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
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>
            
            {pdfs && pdfs.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-2">Available PDFs ({pdfs.length}):</div>
                <div className="space-y-2">
                  {pdfs.map((pdf, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center flex-1 min-w-0">
                        <svg className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700 truncate">{pdf.name}</span>
                      </div>
                      <div className="flex space-x-2 ml-2">
                        <button
                          onClick={() => handlePreview(pdf.full_url)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                          title="Preview PDF"
                        >
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          Preview
                        </button>
                        <a 
                          href={pdf.full_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                          title="Download PDF"
                        >
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPreview && previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl max-h-full w-full flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">PDF Preview</h3>
              <button
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="flex-1 p-4 overflow-hidden">
              <iframe
                src={`${previewUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-96 md:h-[600px] border rounded"
                title="PDF Preview"
              />
            </div>
            <div className="p-4 border-t flex justify-end space-x-4">
              <button
                onClick={closePreview}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-700"
              >
                Close
              </button>
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Open in New Tab
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function LibraryPage() {
  const [libraryRecords, setLibraryRecords] = useState<LibraryRecord[]>([]);
  const [showAllResources, setShowAllResources] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLibraryData = async () => {
      try {
        setLoading(true);
        const response: ApiResponse = await getLibraryResources();
        
        if (response.success && response.data) {
          setLibraryRecords(response.data);
        } else {
          setError('Failed to load library resources');
        }
      } catch (err) {
        console.error('Error fetching library resources:', err);
        setError('Failed to load library resources');
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryData();
  }, []);

  const displayedResources = showAllResources ? libraryRecords : libraryRecords.slice(0, 9);

  if (loading) {
    return (
      <div className={`flex bg-[#F7F1EE] min-h-screen ${poppins.className}`}>
        <Sidebar activePage="Library" />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow md:ml-[270px] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C946D] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading library resources...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex bg-[#F7F1EE] min-h-screen ${poppins.className}`}>
        <Sidebar activePage="Library" />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow md:ml-[270px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-500 text-xl mb-4">⚠️</div>
              <p className="text-gray-600">{error}</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
              {libraryRecords.length > 0 && (
                <div className="mt-2 text-sm text-gray-500">
                  {libraryRecords.length} resource{libraryRecords.length !== 1 ? 's' : ''} available
                </div>
              )}
            </div>
            
            {libraryRecords.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Resources Available</h3>
                <p className="text-gray-500">Library resources will appear here once they're added.</p>
              </div>
            ) : (
              <>
                {/* Main Content Area - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {displayedResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      title={resource.title}
                      description={resource.description}
                      pdfs={resource.pdfs}
                    />
                  ))}
                </div>
                
                {/* View All / Show Less Button */}
                {libraryRecords.length > 9 && (
                  <div className="flex justify-center">
                    {!showAllResources ? (
                      <button
                        onClick={() => setShowAllResources(true)}
                        className="bg-[#2C946D] hover:bg-[#257B5A] text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        View All Resources ({libraryRecords.length})
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowAllResources(false)}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        Show Less
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
