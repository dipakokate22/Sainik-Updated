
'use client';

import SchoolCard from '../../Components/SchoolCard';
import React, { useState, useMemo } from 'react';
import { FaSearch, FaFilter, FaTimes, FaMapMarkerAlt, FaStar, FaRegStar } from 'react-icons/fa';

// --- SVG ICONS REPLACED WITH REACT-ICONS ---
const SearchIcon = () => <FaSearch className="h-5 w-5 text-gray-400" />;
const FilterIcon = () => <FaFilter className="h-6 w-6 text-gray-700" />;
const CloseIcon = ({ className = "h-4 w-4" }: { className?: string }) => <FaTimes className={`${className} text-gray-500 hover:text-gray-800`} />;
const LocationIcon = () => <FaMapMarkerAlt className="h-4 w-4" />;
const StarFilledIcon = () => <FaStar className="h-5 w-5 text-yellow-400" />;
const StarOutlineIcon = () => <FaRegStar className="h-5 w-5 text-yellow-400" />;


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

// ...SchoolCard is now imported from shared component...

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
        <div className="fixed inset-0 z-40 flex justify-end md:justify-center" style={{background: 'rgba(0,0,0,0.4)'}} onClick={onClose}>
            <div className="w-full max-w-md bg-white h-full p-6 overflow-y-auto md:rounded-lg md:mt-10 md:mb-10 md:h-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Filters</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><CloseIcon className="h-6 w-6" /></button>
                </div>
                <FilterSection title="Location" options={locations} filterKey="location" />
                <FilterSection title="Board" options={boards} filterKey="board" />
                <FilterSection title="Medium" options={mediums} filterKey="medium" />
                <FilterSection title="Category" options={categories} filterKey="category" />
                <div className="mt-8 flex gap-4 flex-col md:flex-row">
                    <button onClick={onClearFilters} className="w-full md:flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100">Clear All</button>
                    <button onClick={onClose} className="w-full md:flex-1 py-2 px-4 bg-[#A91D3A] text-white rounded-lg font-semibold hover:bg-red-800">Apply</button>
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
            <div className="bg-[#FDF8F4] font-sans min-h-screen">
                <main>
                    <section className="max-w-[1440px] mx-auto py-10 px-4 sm:px-6 md:px-10 lg:px-[81.5px]">
                        <h1 className="text-2xl sm:text-3xl md:text-[32px] font-medium text-[#333333] mb-6">School Listing</h1>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                            <div className="relative w-full sm:w-[561px]">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><SearchIcon /></div>
                                <input type="text" placeholder="Search school" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full h-[51px] pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A91D3A] text-[15px] font-light text-gray-900" />
                            </div>
                            <button onClick={() => setFilterOpen(true)} className="p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 w-full sm:w-auto flex justify-center items-center"><FilterIcon /></button>
                        </div>
                        <div className="flex justify-end flex-wrap items-center gap-3 mb-10 min-h-[40px]">
                            {Object.entries(activeFilters).map(([key, value]) => value && (
                                <div key={key} className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-1.5 text-[16px] sm:text-[18px] font-light text-gray-800">
                                    <span>{value}</span>
                                    <button onClick={() => removeFilter(key as keyof ActiveFilters)}><CloseIcon /></button>
                                </div>
                            ))}
                        </div>
                        {displayedSchools.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                                {displayedSchools.map((school) => (
                                  <SchoolCard
                                    key={school.id}
                                    name={school.name}
                                    image={school.imageUrl}
                                    desc={school.location + ' | ' + school.board + ' | ' + school.medium + ' | ' + school.category}
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
                        <nav className="flex justify-center items-center mt-12 gap-2" aria-label="Pagination">{renderPagination()}</nav>
                    </section>
                </main>
            </div>
        </>
    );
};

export default SchoolListingPage;