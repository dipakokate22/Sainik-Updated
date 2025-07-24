'use client';

import Image from 'next/image';
import React, { useState, useMemo } from 'react';

// --- SVG ICON COMPONENTS (No changes here) ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
);
const CloseIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${className} text-gray-500 hover:text-gray-800`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const StarFilledIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);
const StarOutlineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.524 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.524 4.674c.3.921-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783-.57-1.838-.197-1.539-1.118l1.524-4.674a1 1 0 00-.363-1.118L2.04 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.524-4.674z" />
    </svg>
);


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


// --- COMPONENTS (No changes here) ---

// ========= THIS IS THE UPDATED COMPONENT =========
const SchoolCard = ({ school }: { school: School }) => (
  // 1. Make the entire card a vertical flex container
  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col">
      
      {/* Image part (flex-shrink-0 prevents it from shrinking) */}
      <div className="relative w-full h-52 px-4 pt-4">
      <div className="w-full h-full relative rounded-lg overflow-hidden">
        <Image src={school.imageUrl} alt={school.name} layout="fill" objectFit="cover" />
      </div>
    </div>
      
      {/* 2. Make the content area a growing flex container that pushes its children to the top and bottom */}
      <div className="p-5 flex flex-col justify-between flex-1">
          
          {/* 3. Group the top content (name, location, logo) */}
          <div>
              <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                      <h3 className="text-[20px] font-normal text-gray-800">{school.name}</h3>
                      <div className="flex items-center text-[14px] font-normal text-gray-500 mt-1">
                          <LocationIcon /><span className="ml-1.5">{school.location}</span>
                      </div>
                  </div>
                  <div className="w-[60px] h-[60px] relative flex-shrink-0">
                      <Image src={school.logoUrl} alt={`${school.name} logo`} layout="fill" objectFit="cover" className="rounded-full" />
                  </div>
              </div>
          </div>

          {/* 4. Group the bottom content (tags, stars, button) which is now anchored */}
          <div>
              <div className="flex flex-wrap gap-2 my-4">
                  {school.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-700 text-[10px] font-normal px-3 py-1 rounded-full">{tag}</span>
                  ))}
              </div>
              <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => i < school.rating ? <StarFilledIcon key={i} /> : <StarOutlineIcon key={i} />)}
              </div>
              <button className="bg-[#AA0111] text-white font-medium text-[14px] px-6 py-2 rounded-lg mt-3 hover:bg-red-800 transition-colors">
                  View Details
              </button>
          </div>
      </div>
  </div>
);

const FilterPanel = ({ isOpen, onClose, activeFilters, onFilterChange, onClearFilters }: { isOpen: boolean; onClose: () => void; activeFilters: ActiveFilters; onFilterChange: (category: keyof ActiveFilters, value: string) => void; onClearFilters: () => void;}) => {
    if (!isOpen) return null;

    const FilterSection = ({ title, options, filterKey }: { title: string, options: string[], filterKey: keyof ActiveFilters }) => (
        <div className="mb-6">
            <h4 className="font-semibold text-lg mb-3 text-gray-800">{title}</h4>
            <div className="flex flex-wrap gap-2">
                {options.map(option => (
                    <button key={option} onClick={() => onFilterChange(filterKey, option)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilters[filterKey] === option ? 'bg-[#A91D3A] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end" onClick={onClose}>
            <div className="w-full max-w-md bg-white h-full p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Filters</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><CloseIcon className="h-6 w-6" /></button>
                </div>
                <FilterSection title="Location" options={locations} filterKey="location" />
                <FilterSection title="Board" options={boards} filterKey="board" />
                <FilterSection title="Medium" options={mediums} filterKey="medium" />
                <FilterSection title="Category" options={categories} filterKey="category" />
                <div className="mt-8 flex gap-4">
                    <button onClick={onClearFilters} className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100">Clear All</button>
                    <button onClick={onClose} className="flex-1 py-2 px-4 bg-[#A91D3A] text-white rounded-lg font-semibold hover:bg-red-800">Apply</button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT (No changes here) ---

const SchoolListingPage = () => {
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({ location: null, board: null, medium: null, category: null });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

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
            (<button key={num} onClick={() => setCurrentPage(num)} className={`w-9 h-9 flex items-center justify-center rounded-md text-[16px] font-normal transition-colors ${currentPage === num ? 'bg-[#A91D3A] text-white' : 'text-gray-600 hover:bg-red-100'}`}>{num}</button>)
        );
    };

    return (
        <>
            <FilterPanel isOpen={isFilterOpen} onClose={() => setFilterOpen(false)} activeFilters={activeFilters} onFilterChange={handleFilterChange} onClearFilters={clearAllFilters}/>
            <div className="bg-[#FDF8F4] font-sans">
                <main>
                    <section className="max-w-[1440px] mx-auto py-[80px] px-[81.5px]">
                        <h1 className="text-[32px] font-medium text-[#333333] mb-6">School Listing</h1>
                        <div className="flex justify-between items-center gap-4 mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><SearchIcon /></div>
                                <input type="text" placeholder="Search school" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-[561px] h-[51px] pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A91D3A] text-[15px] font-light text-gray-900" />
                            </div>
                            <button onClick={() => setFilterOpen(true)} className="p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"><FilterIcon /></button>
                        </div>
                        <div className="flex justify-end flex-wrap items-center gap-3 mb-10 min-h-[40px]">
                            {Object.entries(activeFilters).map(([key, value]) => value && (
                                <div key={key} className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-1.5 text-[18px] font-light text-gray-800">
                                    <span>{value}</span>
                                    <button onClick={() => removeFilter(key as keyof ActiveFilters)}><CloseIcon /></button>
                                </div>
                            ))}
                        </div>
                        {displayedSchools.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {displayedSchools.map((school) => (<SchoolCard key={school.id} school={school} />))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <h2 className="text-2xl font-semibold text-gray-700">No Schools Found</h2>
                                <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
                                <button onClick={() => { clearAllFilters(); setSearchTerm(''); }} className="mt-6 py-2 px-6 bg-[#A91D3A] text-white rounded-lg font-semibold hover:bg-red-800">Clear All Filters & Search</button>
                            </div>
                        )}
                        <nav className="flex justify-center items-center mt-12 gap-2" aria-label="Pagination">{renderPagination()}</nav>
                    </section>
                </main>
            </div>
        </>
    );
};

export default SchoolListingPage;