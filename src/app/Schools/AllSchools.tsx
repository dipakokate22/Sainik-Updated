'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

// --- SVG Icons ---
const LocationPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    fill="currentColor"
    {...props}
  >
    <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67a24 24 0 01-35.464 0zM192 256c35.346 0 64-28.654 64-64s-28.654-64-64-64-64 28.654-64 64 28.654 64 64 64z" />
  </svg>
);

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        {...props}
    >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);


// --- Editable Sample Data (Updated to match image) ---
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
  image: '/Image/img.jpg', // Using a stable image URL from the screenshot
}));

// --- Editable Filter Lists ---
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

  const pageSize = 7;

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
      // Note: Range filtering logic is not implemented as school data lacks distance in number format
      // const matchRange = parseFloat(school.distance) <= range; 
      return matchBoard && matchMedium && matchCategory;
    });
  }, [selectedBoards, selectedMediums, selectedCategories]);

  const paginatedSchools = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSchools.slice(start, start + pageSize);
  }, [filteredSchools, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredSchools.length / pageSize);

  const displayedMediums = showAllMediums ? mediumList : mediumList.slice(0, 5);
  
  // Dynamic calculation for filter counts
  const getCount = (field: 'board' | 'medium' | 'category', value: string) => {
    return initialSchools.filter(school => school[field] === value).length;
  };
  
  // Pagination items logic to show first 3, ellipsis, and last 2 pages
  const getPaginationItems = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages -1, totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };
  const paginationItems = getPaginationItems();


  return (
    <section className="w-full bg-[#F7F7F7] py-10">
      <div className="mx-auto flex w-full max-w-[1402px] flex-col lg:flex-row gap-[30px] px-4">
        {/* --- Filter Sidebar --- */}
        <aside className="w-full lg:w-[387px] h-full shrink-0 bg-white p-8 space-y-8">
          {/* Filter By Board */}
          <div>
            <h3 className="text-[28px] font-medium text-[#257B5A] mb-4">Filter By Board</h3>
            <div className="space-y-4">
              {boardList.map(board => (
                <label key={board} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedBoards.includes(board)}
                      onChange={() => handleCheckboxChange(board, selectedBoards, setSelectedBoards)}
                      className="appearance-none h-6 w-6 rounded-[3px] border-2 border-gray-300 checked:bg-[#50B848] checked:border-transparent focus:outline-none"
                    />
                    <span className="text-[20px] font-normal text-[#6C6B6B] ">{board}</span>
                  </div>
                  <span className="text-[20px] font-normal text-[#353535]">({getCount('board', board)})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter By Medium */}
          <div>
            <h3 className="text-[28px] font-medium text-[#257B5A] mb-4">Filter By Medium</h3>
            <div className="space-y-4">
              {displayedMediums.map(medium => (
                 <label key={medium} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedMediums.includes(medium)}
                        onChange={() => handleCheckboxChange(medium, selectedMediums, setSelectedMediums)}
                        className="appearance-none h-6 w-6 rounded-[3px] border-2 border-gray-300 checked:bg-[#50B848] checked:border-transparent focus:outline-none"
                      />
                      <span className="text-[20px] font-normal text-[#6C6B6B]">{medium}</span>
                    </div>
                    <span className="text-[20px] font-normal text-[#353535]">(10)</span>
                </label>
              ))}
            </div>
            {mediumList.length > 5 && (
                 <button onClick={() => setShowAllMediums(!showAllMediums)} className="mt-3 text-[16px] font-normal text-[#101CFB]">
                    {showAllMediums ? 'Show less' : 'Show more'}
                </button>
            )}
          </div>
          
          {/* Range Slider */}
          <div>
            <h3 className="text-[28px] font-medium text-[#257B5A] mb-4">Range</h3>
            <input
              type="range"
              min={1}
              max={50}
              value={range}
              onChange={e => setRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#AA0111]"
            />
            <p className="text-[#AA0111] mt-2">{range}km</p>
          </div>

          {/* Filter By Category */}
          <div>
            <h3 className="text-[28px] font-medium text-[#257B5A] mb-4">Filter By Category</h3>
            <div className="space-y-4">
              {categoryList.map(category => (
                 <label key={category} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCheckboxChange(category, selectedCategories, setSelectedCategories)}
                        className="appearance-none h-6 w-6 rounded-[3px] border-2 border-gray-300 checked:bg-[#50B848] checked:border-transparent focus:outline-none"
                      />
                      <span className="text-[20px] font-normal text-[#6C6B6B]">{category}</span>
                    </div>
                    <span className="text-[20px] font-normal text-[#353535]">(10)</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* --- School Cards Section --- */}
        <div className="w-full lg:w-[955px] flex flex-col gap-[27px]">
          {paginatedSchools.map(school => (
            <div
              key={school.id}
              className="w-full h-[224px] flex bg-white rounded-lg p-[5px] shadow-sm"
            >
              {/* School Image */}
              <img
                src={school.image}
                alt={school.name}
                width={402} // adjust based on your needs
                height={214} // adjust based on your needs
                className="w-[402px] h-full shrink-0 rounded-md object-cover"
              />

              {/* School Info */}
              <div className="flex flex-1 flex-col pl-[38px] pt-[35px] pr-[69px] pb-[27px]">
                <h3 className="text-[20px] font-normal text-gray-800">{school.name}</h3>
                
                <div className="flex items-start gap-2 mt-[10px]">
                  <LocationPinIcon className="h-[16px] w-[12px] shrink-0 mt-0.5 text-gray-400" />
                  <p className="text-[14px] font-normal text-[#656565]">{school.address}</p>
                </div>
                
                <div className="mt-auto flex items-center gap-3 text-[16px] font-normal text-gray-600">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                           <StarIcon key={i} className="w-8 h-8 text-[#FFC107]"/>
                        ))}
                    </div>
                    <span>({school.reviews})</span>
                    <span className="ml-2">{school.distance}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
             <div className="flex justify-center mt-4 items-center gap-2">
                {paginationItems.map((item, index) =>
                    typeof item === 'number' ? (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(item)}
                            className={`w-10 h-10 rounded flex items-center justify-center border text-sm ${
                                currentPage === item
                                ? 'bg-[#50B848] text-white border-[#50B848]'
                                : 'bg-white text-gray-700 border-gray-300'
                            }`}
                        >
                            {item}
                        </button>
                    ) : (
                        <span key={index} className="px-2 text-gray-500">...</span>
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