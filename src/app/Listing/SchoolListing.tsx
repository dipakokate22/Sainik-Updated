'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import SchoolCard from '../../Components/SchoolCard';
import { FaSearch, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { getAllSchools, searchSchools } from '../../../services/schoolServices';
import { useRouter } from 'next/navigation';

// --- ICONS ---
const SearchIcon = () => <FaSearch className="h-5 w-5 text-gray-400" />;
const CloseIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <FaTimes className={`${className} text-gray-500 hover:text-gray-800`} />
);
const ChevronDownIcon = () => <FaChevronDown className="h-4 w-4 text-gray-500" />;
const ChevronUpIcon = () => <FaChevronUp className="h-4 w-4 text-gray-500" />;

// --- TYPES ---
interface School {
  id: number;
  name: string;
  profileImage?: string;
  gallery?: string[];
  thumbnail?: string; // Add thumbnail property
  address: {
    city: string;
    state: string;
  };
  overview?: {
    welcomeNote?: string; // Add welcomeNote for description
    schoolInformation?: {
      board?: string;
      medium?: string;
      category?: string;
    };
  };
}

type ActiveFilters = {
  location: string | null;
  board: string | null;
  medium: string | null;
  category: string | null;
};

// --- DROPDOWN FILTER COMPONENT ---
const FilterDropdown = ({
  label,
  options,
  filterKey,
  activeFilters,
  onFilterChange,
  isOpen,
  onToggle,
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
        <span className="text-sm font-medium">{selectedValue || label}</span>
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
                  selectedValue === option
                    ? 'bg-[#A91D3A]/10 text-[#A91D3A] font-medium'
                    : 'text-gray-700'
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

// --- MAIN PAGE ---
const SchoolListingPage = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    location: null,
    board: null,
    medium: null,
    category: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  // Fetch schools
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let response;
        if (searchTerm.trim()) {
          response = await searchSchools({ name: searchTerm.trim() });
        } else {
          response = await getAllSchools();
        }

        if (response.status && response.data) {
          setSchools(response.data);
        } else {
          setSchools([]);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load schools');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm]);

  const locations = useMemo(
    () =>
      Array.from(new Set(schools.map((s) => s.address?.city))).filter(
        (v): v is string => Boolean(v)
      ),
    [schools]
  );

  const boards = useMemo(
    () =>
      Array.from(
        new Set(schools.map((s) => s.overview?.schoolInformation?.board))
      ).filter((v): v is string => Boolean(v)),
    [schools]
  );

  const mediums = useMemo(
    () =>
      Array.from(
        new Set(schools.map((s) => s.overview?.schoolInformation?.medium))
      ).filter((v): v is string => Boolean(v)),
    [schools]
  );

  const categories = useMemo(
    () =>
      Array.from(
        new Set(schools.map((s) => s.overview?.schoolInformation?.category))
      ).filter((v): v is string => Boolean(v)),
    [schools]
  );

  // Apply filters
  const filteredSchools = useMemo(() => {
    setCurrentPage(1);
    return schools.filter((school) => {
      const matchesLocation = activeFilters.location
        ? school.address?.city === activeFilters.location
        : true;
      const matchesBoard = activeFilters.board
        ? school.overview?.schoolInformation?.board === activeFilters.board
        : true;
      const matchesMedium = activeFilters.medium
        ? school.overview?.schoolInformation?.medium === activeFilters.medium
        : true;
      const matchesCategory = activeFilters.category
        ? school.overview?.schoolInformation?.category === activeFilters.category
        : true;

      return matchesLocation && matchesBoard && matchesMedium && matchesCategory;
    });
  }, [schools, activeFilters]);

  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);
  const displayedSchools = filteredSchools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (category: keyof ActiveFilters, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category] === value ? null : value,
    }));
  };

  const removeFilter = (category: keyof ActiveFilters) => {
    setActiveFilters((prev) => ({ ...prev, [category]: null }));
  };

  const clearAllFilters = () => {
    setActiveFilters({ location: null, board: null, medium: null, category: null });
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="bg-[#F7F1EE] font-sans min-h-screen">
      <main>
        <section className="max-w-[1380px] mx-auto py-6 px-4 sm:px-6 lg:px-8 mt-2 mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-[42px] font-poppins font-medium text-black mb-2 lg:mb-4 leading-tight">
            School Listing
          </h1>

          {/* Search + Filters */}
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
              {Object.entries(activeFilters).map(
                ([key, value]) =>
                  value && (
                    <div
                      key={key}
                      className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-1.5 text-[16px] sm:text-[18px] font-light text-gray-800"
                    >
                      <span>{value}</span>
                      <button onClick={() => removeFilter(key as keyof ActiveFilters)}>
                        <CloseIcon />
                      </button>
                    </div>
                  )
              )}
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

          {/* Schools */}
          {loading ? (
            <div className="text-center py-20 text-lg text-gray-600">Loading schools...</div>
          ) : error ? (
            <div className="text-center py-20 text-lg text-red-600">{error}</div>
          ) : displayedSchools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedSchools.map((school) => (
                <Link
                  key={school.id}
                  href={`/SchoolDetails/${school.id}`}
                  className="block"
                  prefetch
                >
                  <SchoolCard
                    name={school.name}
                    image={school.profileImage || school.gallery?.[0] || '/default-school.jpg'}
                    desc={school.overview?.welcomeNote || `${school.address?.city || ''} | ${school.overview?.schoolInformation?.board || ''} | ${school.overview?.schoolInformation?.medium || ''} | ${school.overview?.schoolInformation?.category || ''}`}
                    logo={school.profileImage}
                    thumbnail={school.thumbnail}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">No Schools Found</h2>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
              <button
                onClick={() => {
                  clearAllFilters();
                  setSearchTerm('');
                }}
                className="mt-6 py-2 px-6 bg-[#A91D3A] text-white rounded-lg font-semibold hover:bg-red-800"
              >
                Clear All Filters & Search
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="flex justify-center items-center mt-12 gap-2" aria-label="Pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-9 h-9 flex items-center justify-center rounded-md text-[16px] font-normal transition-colors ${
                    currentPage === num ? 'bg-[#AA0111] text-white' : 'text-gray-600 hover:bg-red-100'
                  }`}
                >
                  {num}
                </button>
              ))}
            </nav>
          )}
        </section>
      </main>
    </div>
  );
};

export default SchoolListingPage;
