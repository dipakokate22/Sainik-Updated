
'use client';

import SchoolCard from '../../Components/SchoolCard';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FaSearch, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// --- SVG ICONS REPLACED WITH REACT-ICONS ---
const SearchIcon = () => <FaSearch className="h-5 w-5 text-gray-400" />;
const CloseIcon = ({ className = "h-4 w-4" }: { className?: string }) => <FaTimes className={`${className} text-gray-500 hover:text-gray-800`} />;
const ChevronDownIcon = () => <FaChevronDown className="h-4 w-4 text-gray-500" />;
const ChevronUpIcon = () => <FaChevronUp className="h-4 w-4 text-gray-500" />;


// --- TYPE DEFINITIONS ---
// The `tags` property will be generated automatically
type SchoolData = { id: number; name: string; location: string; imageUrl: string; logoUrl: string; rating: number; board: string; medium: string; category: string; };
type School = SchoolData & { tags: string[] };
type ActiveFilters = { location: string | null; board: string | null; medium: string | null; category: string | null; };


// =================================================================================
// --- EDIT THIS SECTION: MANUALLY DEFINED SCHOOL DATA ---
// =================================================================================

const rawSchoolData: SchoolData[] = [
    {
        id: 1,
        name: "Sainik School, Pune",
        location: "Pune, Maharashtra",
        imageUrl: "/Image/School1.png",
        logoUrl: "/Listing/Logo.png",
        rating: 5,
        board: "CBSE",
        medium: "English",
        category: "Boys",
    },
    {
        id: 2,
        name: "National Defence School, Mumbai",
        location: "Mumbai, Maharashtra",
        imageUrl: "/Image/School1.png",
        logoUrl: "/Listing/Logo.png",
        rating: 4,
        board: "CISCE",
        medium: "English",
        category: "Co-ed",
    },
    {
        id: 3,
        name: "Himalayan Public School, Delhi",
        location: "Delhi, NCT",
        imageUrl: "/Image/School1.png",
        logoUrl: "/Listing/Logo.png",
        rating: 4,
        board: "CBSE",
        medium: "Hindi",
        category: "Co-ed",
    },
    {
        id: 4,
        name: "Tawi Valley International, Jammu",
        location: "Jammu, J&K",
        imageUrl: "/Image/School1.png",
        logoUrl: "/Listing/Logo.png",
        rating: 3,
        board: "ICSCI",
        medium: "English",
        category: "Girls",
    },
    {
        id: 5,
        name: "Punjab Heritage School, Punjab",
        location: "Punjab, Punjab",
        imageUrl: "/Image/School1.png",
        logoUrl: "/Listing/Logo.png",
        rating: 5,
        board: "CBSE",
        medium: "English",
        category: "Co-ed",
    },
    {
        id: 6,
        name: "Maharana Mewar Public School, Rajasthan",
        location: "Rajasthan, Rajasthan",
        imageUrl: "/Image/School1.png",
        logoUrl: "/Listing/Logo.png",
        rating: 4,
        board: "BSCUI",
        medium: "English",
        category: "Boys",
    },
    {
        id: 7,
        name: "Sainik School, Mumbai",
        location: "Mumbai, Maharashtra",
        imageUrl: "/Image/School1.png",
        logoUrl: "/Listing/Logo.png",
        rating: 5,
        board: "CBSE",
        medium: "Marathi",
        category: "Boys",
    },
    {
        id: 8,
        name: "City Pride School, Pune",
        location: "Pune, Maharashtra",
        imageUrl: "/Image/School1.png",
        logoUrl: "/Listing/Logo.png",
        rating: 4,
        board: "CBBS",
        medium: "English",
        category: "Co-ed",
    },
    {
        id: 9,
        name: "Modern School, Delhi",
        location: "Delhi, NCT",
        imageUrl: "/Image/School1.png",
        logoUrl: "/Listing/Logo.png",
        rating: 5,
        board: "CBSE",
        medium: "English",
        category: "Co-ed",
    },

    {
      id: 10,
      name: "Modern School, Delhi",
      location: "Delhi, NCT",
      imageUrl: "/Image/School1.png",
      logoUrl: "/Listing/Logo.png",
      rating: 5,
      board: "CBSE",
      medium: "English",
      category: "Co-ed",
  },
    // --- ADD MORE SCHOOLS HERE ---
    // Example:
    // {
    //     id: 11,
    //     name: "New School Name, City",
    //     location: "City, State",
    //     imageUrl: "/images/your-new-image.jpg",
    //     logoUrl: "/images/school-logo.png",
    //     rating: 4,
    //     board: "CBSE",
    //     medium: "English",
    //     category: "Co-ed",
    // },
];

// --- Automatically generates the final list and filter options from your data above ---
const fullSchoolList: School[] = rawSchoolData.map(school => ({
    ...school,
    tags: [school.board, school.medium, school.category] // Auto-generates tags for the card
}));

const locations = [...new Set(rawSchoolData.map(s => s.location.split(',')[0].trim()))];
const boards = [...new Set(rawSchoolData.map(s => s.board))];
const mediums = [...new Set(rawSchoolData.map(s => s.medium))];
const categories = [...new Set(rawSchoolData.map(s => s.category))];
// =================================================================================


// --- MODERN DROPDOWN FILTER COMPONENTS ---

const FilterDropdown = ({ 
  label, 
  options, 
  filterKey, 
  activeFilters, 
  onFilterChange, 
  isOpen, 
  onToggle 
}: { 
  label: string; 
  options: string[]; 
  filterKey: keyof ActiveFilters; 
  activeFilters: ActiveFilters; 
  onFilterChange: (category: keyof ActiveFilters, value: string) => void; 
  isOpen: boolean; 
  onToggle: () => void; 
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const selectedValue = activeFilters[filterKey];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className={`flex items-center justify-between w-full px-4 py-3 text-left border rounded-lg transition-all duration-200 gap-3 ${
          selectedValue 
            ? 'border-[#A91D3A] bg-[#A91D3A]/5 text-[#A91D3A]' 
            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
        }`}
      >
        <span className="text-sm font-medium">
          {selectedValue || label}
        </span>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          <div className="py-2">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onFilterChange(filterKey, option);
                  onToggle();
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                  selectedValue === option ? 'bg-[#A91D3A]/10 text-[#A91D3A] font-medium' : 'text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

const SchoolListingPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({ location: null, board: null, medium: null, category: null });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    
    // Dropdown states
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const filteredSchools = useMemo(() => {
        setCurrentPage(1);
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return fullSchoolList.filter(school => {
            const mainLocation = school.location.split(',')[0].trim();
            const matchesFilters = (
                (activeFilters.location ? mainLocation === activeFilters.location : true) &&
                (activeFilters.board ? school.board === activeFilters.board : true) &&
                (activeFilters.medium ? school.medium === activeFilters.medium : true) &&
                (activeFilters.category ? school.category === activeFilters.category : true)
            );
            const matchesSearch = searchTerm ? school.name.toLowerCase().includes(lowercasedSearchTerm) : true;
            return matchesFilters && matchesSearch;
        });
    }, [activeFilters, searchTerm]);

    const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);
    const displayedSchools = filteredSchools.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleFilterChange = (category: keyof ActiveFilters, value: string) => {
        setActiveFilters(prev => ({ ...prev, [category]: prev[category] === value ? null : value }));
    };
    
    const removeFilter = (category: keyof ActiveFilters) => {
        setActiveFilters(prev => ({ ...prev, [category]: null }));
    };
    
    const clearAllFilters = () => {
        setActiveFilters({ location: null, board: null, medium: null, category: null });
    };
    
    const toggleDropdown = (dropdownName: string) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;
        const pageNumbers = [];
        const maxPagesToShow = 5;
        const half = Math.floor(maxPagesToShow / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);
        if (currentPage - half < 1) end = Math.min(totalPages, maxPagesToShow);
        if (currentPage + half > totalPages) start = Math.max(1, totalPages - maxPagesToShow + 1);
        if (start > 1) {
            pageNumbers.push(1);
            if (start > 2) pageNumbers.push('...');
        }
        for (let i = start; i <= end; i++) pageNumbers.push(i);
        if (end < totalPages) {
            if (end < totalPages - 1) pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }
        return pageNumbers.map((num, index) =>
            typeof num === 'string' ? (<span key={`ellipsis-${index}`} className="text-gray-500 px-2">...</span>) :
            (<button key={num} onClick={() => setCurrentPage(num)} className={`w-9 h-9 flex items-center justify-center rounded-md text-[16px] font-normal transition-colors ${currentPage === num ? 'bg-[#AA0111] text-white' : 'text-gray-600 hover:bg-red-100'}`}>{num}</button>)
        );
    };

    return (
        <div className="bg-[#F7F1EE] font-sans min-h-screen">
            <main>
                <section className="max-w-[1380px] mx-auto py-6 px-4 sm:px-6 lg:px-8 mt-2 mb-16">
                    <h1 className="text-2xl sm:text-3xl md:text-[42px] font-poppins font-medium text-black mb-2 lg:mb-4 leading-tight">School Listing</h1>
                    
                    {/* Search and Filters Row */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <SearchIcon />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search school" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                className="w-120 h-[51px] pl-12 pr-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A91D3A] text-[15px] font-light text-gray-900" 
                            />
                        </div>
                        
                        {/* Filter Dropdowns */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <FilterDropdown
                                label="Location"
                                options={locations}
                                filterKey="location"
                                activeFilters={activeFilters}
                                onFilterChange={handleFilterChange}
                                isOpen={openDropdown === 'location'}
                                onToggle={() => toggleDropdown('location')}
                            />
                            <FilterDropdown
                                label="Board"
                                options={boards}
                                filterKey="board"
                                activeFilters={activeFilters}
                                onFilterChange={handleFilterChange}
                                isOpen={openDropdown === 'board'}
                                onToggle={() => toggleDropdown('board')}
                            />
                            <FilterDropdown
                                label="Medium"
                                options={mediums}
                                filterKey="medium"
                                activeFilters={activeFilters}
                                onFilterChange={handleFilterChange}
                                isOpen={openDropdown === 'medium'}
                                onToggle={() => toggleDropdown('medium')}
                            />
                            <FilterDropdown
                                label="Category"
                                options={categories}
                                filterKey="category"
                                activeFilters={activeFilters}
                                onFilterChange={handleFilterChange}
                                isOpen={openDropdown === 'category'}
                                onToggle={() => toggleDropdown('category')}
                            />
                        </div>
                    </div>
                    
                    {/* Active Filters */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-wrap items-center gap-3">
                            {Object.entries(activeFilters).map(([key, value]) => value && (
                                <div key={key} className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-1.5 text-[16px] sm:text-[18px] font-light text-gray-800">
                                    <span>{value}</span>
                                    <button onClick={() => removeFilter(key as keyof ActiveFilters)}>
                                        <CloseIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {Object.values(activeFilters).some(Boolean) && (
                            <button 
                                onClick={clearAllFilters} 
                                className="text-[#A91D3A] text-sm font-medium hover:underline"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                     {/* School Cards */}
                    {displayedSchools.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {displayedSchools.map((school) => (
                              <SchoolCard
                                key={school.id}
                                name={school.name}
                                image={school.imageUrl}
                                desc={school.location + ' | ' + school.board + ' | ' + school.medium + ' | ' + school.category}
                                logoUrl={school.logoUrl}
                              />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">No Schools Found</h2>
                            <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
                            <button onClick={() => { clearAllFilters(); setSearchTerm(''); }} className="mt-6 py-2 px-6 bg-[#A91D3A] text-white rounded-lg font-semibold hover:bg-red-800">Clear All Filters & Search</button>
                        </div>
                    )}
                    
                    {/* Pagination */}
                    <nav className="flex justify-center items-center mt-12 gap-2" aria-label="Pagination">
                        {renderPagination()}
                    </nav>
                </section>
            </main>
        </div>
    );
};

export default SchoolListingPage;