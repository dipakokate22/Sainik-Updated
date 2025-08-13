'use client';

import { useState, useMemo, useRef } from 'react';
import SchoolCard from '../../Components/SchoolCard';
import { IoClose, IoChevronUp, IoChevronDown, IoChevronBack, IoChevronForward } from 'react-icons/io5';

// --- Sample Data ---
const initialSchools = Array.from({ length: 140 }).map((_, i) => ({
  id: i + 1,
  name: 'Aurora International sainik academy school',
  address: 'Sector-3, MR colony the road, rv nagar, indore - 40306',
  distance: '0.51 km',
  reviews: 0,
  rating: [1, 2, 3, 4, 5][i % 5],
  board: ['CBSE', 'CISCE', 'ICSCI', 'BSCUI', 'CBBS', 'HSSC'][i % 6],
  medium: ['English', 'Hindi', 'Marathi', 'Bengali', 'Gujarati'][i % 5],
  category: ['Boys', 'Girls', 'Co-ed'][i % 3],
  location: ['Pune', 'Mumbai', 'Indore', 'Delhi', 'Jammu', 'Punjab', 'Rajasthan'][i % 7],
  image: '/Image/img.jpg',
}));

// Featured Schools Data
const featuredSchools = [
  {
    id: 1001,
    name: 'Elite Sainik Academy',
    address: 'Premium Location, Central Delhi - 110001',
    distance: '2.1 km',
    reviews: 150,
    rating: 5,
    board: 'CBSE',
    medium: 'English',
    category: 'Co-ed',
    location: 'Delhi',
    image: '/Image/img.jpg',
  },
  {
    id: 1002,
    name: 'Royal Military School',
    address: 'Hill Station Road, Pune - 411001',
    distance: '1.8 km',
    reviews: 200,
    rating: 5,
    board: 'CBSE',
    medium: 'English',
    category: 'Boys',
    location: 'Pune',
    image: '/Image/img.jpg',
  },
  {
    id: 1003,
    name: 'Premier Defense Academy',
    address: 'Marine Drive, Mumbai - 400001',
    distance: '3.2 km',
    reviews: 180,
    rating: 4,
    board: 'CISCE',
    medium: 'English',
    category: 'Co-ed',
    location: 'Mumbai',
    image: '/Image/img.jpg',
  },
  {
    id: 1004,
    name: 'Golden Sainik Institute',
    address: 'Heritage Campus, Rajasthan - 302001',
    distance: '4.5 km',
    reviews: 120,
    rating: 4,
    board: 'CBSE',
    medium: 'English',
    category: 'Boys',
    location: 'Rajasthan',
    image: '/Image/img.jpg',
  },
  {
    id: 1005,
    name: 'Victory Military School',
    address: 'Cantonment Area, Indore - 452001',
    distance: '2.7 km',
    reviews: 95,
    rating: 4,
    board: 'CBSE',
    medium: 'English',
    category: 'Co-ed',
    location: 'Indore',
    image: '/Image/img.jpg',
  },
  {
    id: 1006,
    name: 'Supreme Defense Academy',
    address: 'Valley View, Jammu - 180001',
    distance: '3.8 km',
    reviews: 110,
    rating: 5,
    board: 'CBSE',
    medium: 'English',
    category: 'Boys',
    location: 'Jammu',
    image: '/Image/img.jpg',
  },
];

const boardList = ['CBSE', 'CISCE', 'ICSCI', 'BSCUI', 'CBBS', 'HSSC'];
const mediumList = ['English', 'Hindi', 'Marathi', 'Bengali', 'Gujarati', 'Tamil', 'Telugu'];
const categoryList = ['Boys', 'Girls', 'Co-ed'];
const locationList = ['Pune', 'Mumbai', 'Indore', 'Delhi', 'Jammu', 'Punjab', 'Rajasthan'];
const ratingList = ['1', '2', '3', '4', '5'];

// Define proper types for FilterSection props
interface FilterSectionProps {
  title: string;
  items: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  searchable?: boolean;
  searchTerm?: string;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
  isExpanded: boolean;
  onToggle: () => void;
  showCount?: boolean;
  field: 'board' | 'medium' | 'category' | 'location' | 'rating';
}

const SchoolListSection = () => {
  const [selectedBoards, setSelectedBoards] = useState<string[]>([]);
  const [selectedMediums, setSelectedMediums] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [range, setRange] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [boardSearch, setBoardSearch] = useState('');
  const [mediumSearch, setMediumSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  
  // Featured schools scroll ref
  const featuredScrollRef = useRef<HTMLDivElement>(null);
  
  // Scroll functions for featured schools (MOVE THESE INSIDE THE COMPONENT)
  // DELETE THESE LINES FROM THE BOTTOM OF THE FILE:
  // Scroll functions for featured schools
  // const scrollFeaturedLeft = () => {
  //   if (featuredScrollRef.current) {
  //     featuredScrollRef.current.scrollBy({
  //       left: -300,
  //       behavior: 'smooth'
  //     });
  //   }
  // };
  
  // const scrollFeaturedRight = () => {
  //   if (featuredScrollRef.current) {
  //     featuredScrollRef.current.scrollBy({
  //       left: 300,
  //       behavior: 'smooth'
  //     });
  //   }
  // };
  
  // Expanded states for filter sections - ALL OPEN BY DEFAULT
  const [expandedSections, setExpandedSections] = useState({
    board: true,
    medium: true,
    category: true,
    location: true,
    rating: true,
    range: true,
  });

  const pageSize = 9;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

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

  const removeFilter = (value: string, groupState: string[], groupSetter: React.Dispatch<React.SetStateAction<string[]>>) => {
    groupSetter(groupState.filter(item => item !== value));
    setCurrentPage(1);
  };

  const filteredSchools = useMemo(() => {
    return initialSchools.filter(school => {
      const matchBoard = selectedBoards.length === 0 || selectedBoards.includes(school.board);
      const matchMedium = selectedMediums.length === 0 || selectedMediums.includes(school.medium);
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(school.category);
      const matchLocation = selectedLocations.length === 0 || selectedLocations.includes(school.location);
      const matchRating = selectedRatings.length === 0 || selectedRatings.includes(school.rating.toString());
      return matchBoard && matchMedium && matchCategory && matchLocation && matchRating;
    });
  }, [selectedBoards, selectedMediums, selectedCategories, selectedLocations, selectedRatings]);

  const paginatedSchools = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSchools.slice(start, start + pageSize);
  }, [filteredSchools, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredSchools.length / pageSize);

  const getCount = (field: 'board' | 'medium' | 'category' | 'location' | 'rating', value: string) => {
    if (field === 'rating') {
      return initialSchools.filter(school => school[field].toString() === value).length;
    }
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

  const FilterSection = ({ title, items, selectedItems, setSelectedItems, searchable = false, searchTerm = '', setSearchTerm, isExpanded, onToggle, field }: FilterSectionProps) => (
    <div className="border-b border-gray-100 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2 text-left hover:bg-gray-50 rounded transition-colors"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        </div>
        {isExpanded ? (
          <IoChevronUp className="h-4 w-4 text-gray-600 transition-transform duration-200" />
        ) : (
          <IoChevronDown className="h-4 w-4 text-gray-600 transition-transform duration-200" />
        )}
      </button>
      
      {/* Show applied filters when minimized */}
      {!isExpanded && selectedItems.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedItems.map((item: string) => (
            <div key={item} className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              <span>{item}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFilter(item, selectedItems, setSelectedItems);
                }}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <IoClose className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {isExpanded && (
        <div className="mt-3 space-y-2">
          {searchable && setSearchTerm && (
            <div className="relative">
              <input
                type="text"
                placeholder={`Search ${title}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm placeholder-gray-400 text-[#257B5A] border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}
          
          <div className="max-h-48 overflow-y-auto space-y-1">
            {items
              .filter((item: string) => 
                !searchable || item.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item: string) => (
              <label key={item} className="flex items-center justify-between py-1 px-2 hover:bg-gray-50 rounded text-sm">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => handleCheckboxChange(item, selectedItems, setSelectedItems)}
                    className="h-3 w-3 text-blue-600 placeholder-gray-400 text-[#257B5A] border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </div>
                <span className="text-xs text-gray-500">({getCount(field, item)})</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Embedded CSS for hiding scrollbars */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <section className="w-full bg-[#F7F1EE] pt-8 pb-16">
        <div className="mx-auto flex w-full max-w-[1380px] flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 mt-2">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-[280px] h-fit bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>
              
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search schools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 text-sm placeholder-gray-400 text-[#257B5A] border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
      
            {/* Filter Content */}
            <div className="p-4 space-y-4">
              {/* Board */}
              <FilterSection
                title="Board"
                items={boardList}
                selectedItems={selectedBoards}
                setSelectedItems={setSelectedBoards}
                searchable={true}
                searchTerm={boardSearch}
                setSearchTerm={setBoardSearch}
                isExpanded={expandedSections.board}
                onToggle={() => toggleSection('board')}
                showCount={true}
                field="board"
              />
      
              {/* Medium */}
              <FilterSection
                title="Medium"
                items={mediumList}
                selectedItems={selectedMediums}
                setSelectedItems={setSelectedMediums}
                searchable={true}
                searchTerm={mediumSearch}
                setSearchTerm={setMediumSearch}
                isExpanded={expandedSections.medium}
                onToggle={() => toggleSection('medium')}
                showCount={true}
                field="medium"
              />
      
              {/* Category */}
              <FilterSection
                title="Category"
                items={categoryList}
                selectedItems={selectedCategories}
                setSelectedItems={setSelectedCategories}
                isExpanded={expandedSections.category}
                onToggle={() => toggleSection('category')}
                showCount={true}
                field="category"
              />
      
              {/* Location */}
              <FilterSection
                title="Location"
                items={locationList}
                selectedItems={selectedLocations}
                setSelectedItems={setSelectedLocations}
                searchable={true}
                searchTerm={locationSearch}
                setSearchTerm={setLocationSearch}
                isExpanded={expandedSections.location}
                onToggle={() => toggleSection('location')}
                showCount={true}
                field="location"
              />
      
              {/* Rating */}
              <FilterSection
                title="Rating"
                items={ratingList}
                selectedItems={selectedRatings}
                setSelectedItems={setSelectedRatings}
                isExpanded={expandedSections.rating}
                onToggle={() => toggleSection('rating')}
                showCount={true}
                field="rating"
              />
      
              {/* Range */}
              <div className="border-b border-gray-100 pb-4">
                <button
                  onClick={() => toggleSection('range')}
                  className="flex items-center justify-between w-full py-2 text-left hover:bg-gray-50 rounded transition-colors"
                >
                  <h3 className="text-sm font-medium text-gray-900">Range</h3>
                  {expandedSections.range ? (
                    <IoChevronUp className="h-4 w-4 text-gray-600 transition-transform duration-200" />
                  ) : (
                    <IoChevronDown className="h-4 w-4 text-gray-600 transition-transform duration-200" />
                  )}
                </button>
                
                {/* Show range value when minimized */}
                {!expandedSections.range && range > 1 && (
                  <div className="mt-2">
                    <div className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full w-fit">
                      <span>{range} km</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRange(1);
                        }}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <IoClose className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
                
                {expandedSections.range && (
                  <div className="mt-3">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={range}
                      onChange={(e) => setRange(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 km</span>
                      <span>{range} km</span>
                      <span>50 km</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
      
          {/* School Cards */}
          <div className="w-full lg:w-[calc(100%-296px)] flex flex-col gap-6">
            {/* Featured Schools Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2 lg:mb-4">
                <h2 className="text-2xl sm:text-3xl md:text-[42px] font-poppins font-medium text-black leading-tight">Featured Schools</h2>
                
                {/* Navigation Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (featuredScrollRef.current) {
                        featuredScrollRef.current.scrollBy({
                          left: -300,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#257B5A]"
                    aria-label="Scroll left"
                  >
                    <IoChevronBack className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => {
                      if (featuredScrollRef.current) {
                        featuredScrollRef.current.scrollBy({
                          left: 300,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#257B5A]"
                    aria-label="Scroll right"
                  >
                    <IoChevronForward className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div 
                  ref={featuredScrollRef}
                  className="overflow-x-auto scrollbar-hide"
                >
                  <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
                    {featuredSchools.map(school => (
                      <div key={school.id} className="flex-shrink-0" style={{ width: '280px' }}>
                        <SchoolCard
                          name={school.name}
                          image={school.image}
                          desc={`${school.address} | ${school.board} | ${school.medium} | ${school.category}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>


            {/* Schools Near You Section */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-[42px] font-poppins font-medium text-black mb-2 lg:mb-4 leading-tight">Schools Near You</h2>

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
                            ? 'bg-[#AA0111] text-white border-[#AA0111]'
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
        </div>
      </section>
    </>
  );
};

export default SchoolListSection;
