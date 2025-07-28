'use client';

import { useState, useMemo } from 'react';
import SchoolCard from '../../Components/SchoolCard';

// --- Sample Data ---
const initialSchools = Array.from({ length: 140 }).map((_, i) => ({
  id: i + 1,
  name: 'Aurora International sainik academy school',
  address: 'Sector-3, MR colony the road, rv nagar, indore - 40306',
  distance: '0.51 km',
  reviews: 0,
  rating: 0,
  board: ['CBSE', 'CISCE', 'ICSCI', 'BSCUI', 'CBBS', 'HSSC'][i % 6],
  medium: ['English', 'Hindi', 'Marathi', 'Bengali', 'Gujarati'][i % 5],
  category: ['Boys', 'Girls', 'Co-ed'][i % 3],
  image: '/Image/img.jpg',
}));

const boardList = ['CBSE', 'CISCE', 'ICSCI', 'BSCUI', 'CBBS', 'HSSC'];
const mediumList = ['English', 'Hindi', 'Marathi', 'Bengali', 'Gujarati', 'Tamil', 'Telugu'];
const categoryList = ['Boys', 'Girls', 'Co-ed'];

const SchoolListSection = () => {
  const [selectedBoards, setSelectedBoards] = useState<string[]>([]);
  const [selectedMediums, setSelectedMediums] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [range, setRange] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAllMediums, setShowAllMediums] = useState(false);

  const pageSize = 8;

  const handleCheckboxChange = (
    value: string,
    groupState: string[],
    groupSetter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    groupSetter(
      groupState.includes(value)
        ? groupState.filter(item => item !== value)
        : [...groupState, value]
    );
    setCurrentPage(1);
  };

  const filteredSchools = useMemo(() => {
    return initialSchools.filter(school => {
      const matchBoard = selectedBoards.length === 0 || selectedBoards.includes(school.board);
      const matchMedium = selectedMediums.length === 0 || selectedMediums.includes(school.medium);
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(school.category);
      return matchBoard && matchMedium && matchCategory;
    });
  }, [selectedBoards, selectedMediums, selectedCategories]);

  const paginatedSchools = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSchools.slice(start, start + pageSize);
  }, [filteredSchools, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredSchools.length / pageSize);
  const displayedMediums = showAllMediums ? mediumList : mediumList.slice(0, 5);

  const getCount = (field: 'board' | 'medium' | 'category', value: string) => {
    return initialSchools.filter(school => school[field] === value).length;
  };

  const getPaginationItems = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages - 1, totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const paginationItems = getPaginationItems();

  return (
    <section className="w-full bg-[#F7F1EE] py-8">
      <div className="mx-auto flex w-full max-w-[1380px] flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 mt-4">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-[320px] h-fit lg:max-h-[calc(100vh-100px)] overflow-y-auto bg-white p-6 space-y-6 rounded-xl shadow-md">
          
          {/* Board */}
          <div>
            <h3 className="text-[22px] font-medium text-[#257B5A] mb-3">Filter By Board</h3>
            <div className="space-y-2">
              {boardList.map(board => (
                <label key={board} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedBoards.includes(board)}
                      onChange={() => handleCheckboxChange(board, selectedBoards, setSelectedBoards)}
                      className="appearance-none h-5 w-5 rounded-[3px] border-2 border-gray-300 checked:bg-[#50B848] checked:border-transparent focus:outline-none"
                    />
                    <span className="text-[16px] text-[#6C6B6B]">{board}</span>
                  </div>
                  <span className="text-[14px] text-[#353535]">({getCount('board', board)})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Medium */}
          <div>
            <h3 className="text-[22px] font-medium text-[#257B5A] mb-3">Filter By Medium</h3>
            <div className="space-y-2">
              {displayedMediums.map(medium => (
                <label key={medium} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedMediums.includes(medium)}
                      onChange={() => handleCheckboxChange(medium, selectedMediums, setSelectedMediums)}
                      className="appearance-none h-5 w-5 rounded-[3px] border-2 border-gray-300 checked:bg-[#50B848] checked:border-transparent focus:outline-none"
                    />
                    <span className="text-[16px] text-[#6C6B6B]">{medium}</span>
                  </div>
                  <span className="text-[14px] text-[#353535]">(10)</span>
                </label>
              ))}
            </div>
            {mediumList.length > 5 && (
              <button onClick={() => setShowAllMediums(!showAllMediums)} className="mt-3 text-[14px] font-medium text-[#101CFB]">
                {showAllMediums ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {/* Range */}
          <div>
            <h3 className="text-[22px] font-medium text-[#257B5A] mb-3">Range</h3>
            <input
              type="range"
              min={1}
              max={50}
              value={range}
              onChange={e => setRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#AA0111]"
            />
            <p className="text-[#AA0111] mt-2 text-[14px]">{range}km</p>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-[22px] font-medium text-[#257B5A] mb-3">Filter By Category</h3>
            <div className="space-y-2">
              {categoryList.map(category => (
                <label key={category} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCheckboxChange(category, selectedCategories, setSelectedCategories)}
                      className="appearance-none h-5 w-5 rounded-[3px] border-2 border-gray-300 checked:bg-[#50B848] checked:border-transparent focus:outline-none"
                    />
                    <span className="text-[16px] text-[#6C6B6B]">{category}</span>
                  </div>
                  <span className="text-[14px] text-[#353535]">(10)</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* School Cards */}
        <div className="w-full lg:w-[calc(100%-336px)] flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1E1E1E] mb-2">Schools Near You</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedSchools.map(school => (
              <SchoolCard
                key={school.id}
                name={school.name}
                image={school.image}
                desc={`${school.address} | ${school.board} | ${school.medium} | ${school.category}`}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 items-center gap-2">
              {paginationItems.map((item, index) =>
                typeof item === 'number' ? (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentPage(item);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                      currentPage === item
                        ? 'bg-[#50B848] text-white border-[#50B848]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {item}
                  </button>
                ) : (
                  <span key={index} className="px-3 py-1 text-gray-400 text-lg">…</span>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SchoolListSection;
