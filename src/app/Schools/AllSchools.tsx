'use client';

import { useState, useMemo, useRef, useEffect, createContext, useContext } from 'react';
import SchoolCard from '../../Components/SchoolCard';
import { IoClose, IoChevronUp, IoChevronDown, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { getAllSchools, searchSchools, searchSchoolsByCoordinates } from '../../../services/schoolServices';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

// School data interface
interface School {
  id: number; // <-- Added
  slug: string;
  name: string;
  isFeatured?: boolean;
  profileImage?: string; // <-- Added
  location: {
    latitude: number;
    longitude: number;
  };
  tags: string[];
  address: {
    fullAddress: string;
    city: string;
    state: string;
    mobile: string;
    email: string;
    website: string;
  };
  overview: {
    schoolInformation: {
      ownership: string;
      medium: string;
      board: string;
      category: string;
    };
    welcomeNote: string;
    keyHighlights: string[];
    admissionCriteriaEligibility: string[];
    schoolHours: {
      monday: string;
      sunday: string;
    };
  };
  fees: {
    annualFeeStructure: Array<{
      classRange: string;
      tuitionFee: string;
      developmentFee: string;
      totalFee: string;
    }>;
    additionalFees: {
      admissionFee: string;
      transportation: string;
    };
  };
  facilities: {
    academic: string[];
    sportsRecreation: string[];
    infrastructure: string[];
  };
  gallery: string[];
  reviews: Array<{
    name: string;
    rating: number;
    comment: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  distance?: string; // Add distance field
  isRegistered: boolean;
}

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

// Create context for schools
export const SchoolsContext = createContext<School[]>([]);

const SchoolListSection = () => {
  // API Data State
  const [schools, setSchools] = useState<School[]>([]);
  const [featuredSchools, setFeaturedSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Geolocation State
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [nearbySchools, setNearbySchools] = useState<School[]>([]);
  const [nearbySchoolsSearched, setNearbySchoolsSearched] = useState<boolean>(false);
  
  // Filter States
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const nearMeSectionRef = useRef<HTMLDivElement>(null);
  
  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }
    
    setLocationLoading(true);
    setLocationError(null);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        
        try {
          // Fetch nearby schools using coordinates
          const response = await searchSchoolsByCoordinates(latitude, longitude);
          setNearbySchoolsSearched(true);
          if (response.status && response.data) {
            setNearbySchools(response.data.slice(0, 6)); // Limit to 6 schools
          } else {
            setNearbySchools([]); // Explicitly set empty array
          }
        } catch (err) {
          console.error('Error fetching nearby schools:', err);
          setLocationError('Failed to fetch nearby schools');
          setNearbySchoolsSearched(true);
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied by user.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out.');
            break;
          default:
            setLocationError('An unknown error occurred.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };
  
  // Fetch schools data on component mount
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllSchools();
        
        if (response.status && response.data) {
          setSchools(response.data);

          // ✅ Pick schools with isFeatured = true
          const featured = response.data.filter((school: School) => school.isFeatured);

          setFeaturedSchools(featured.length > 0 ? featured : response.data.slice(0, 6));

        } else {
          setError('Failed to fetch schools data');
        }
      } catch (err) {
        console.error('Error fetching schools:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching schools');
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Sync searchTerm with URL param on mount and when param changes
  useEffect(() => {
    if (searchParams) {
      const searchQuery = searchParams.get('search') || '';
      setSearchTerm(searchQuery);
    }
  }, [searchParams]);

  // Search functionality with API (instant for param change, debounce for typing)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const performSearch = async () => {
      if (searchTerm.trim()) {
        try {
          setLoading(true);
          const response = await searchSchools({ name: searchTerm.trim() });
          if (response.status && response.data) {
            setSchools(response.data);
          } else {
            setSchools([]);
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Search failed');
          setSchools([]);
        } finally {
          setLoading(false);
        }
      } else {
        // If search term is empty, fetch all schools again
        try {
          setLoading(true);
          const response = await getAllSchools();
          if (response.status && response.data) {
            setSchools(response.data);
          } else {
            setSchools([]);
          }
        } catch (err) {
          setSchools([]);
        } finally {
          setLoading(false);
        }
      }
    };

    // If searchTerm comes from URL param, search instantly
    if (searchParams && searchParams.get('search') === searchTerm) {
      performSearch();
    } else {
      // Debounce for typing
      timeoutId = setTimeout(performSearch, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchParams]);
  
  // Expanded states for filter sections - ALL OPEN BY DEFAULT
  const [expandedSections, setExpandedSections] = useState({
    board: true,
    medium: true,
    category: true,
    location: true,
    rating: true,
    range: true,
  });

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

  // Filter functionality with API integration
  useEffect(() => {
    const applyFilters = async () => {
      if (selectedBoards.length > 0 || selectedMediums.length > 0 || selectedCategories.length > 0 || selectedLocations.length > 0 || selectedRatings.length > 0 || range < 10) {
        try {
          setLoading(true);
          const searchParams: any = {};
          
          if (selectedBoards.length > 0) searchParams.board = selectedBoards.join(',');
          if (selectedMediums.length > 0) searchParams.medium = selectedMediums.join(',');
          if (selectedCategories.length > 0) searchParams.category = selectedCategories.join(',');
          if (selectedLocations.length > 0) searchParams.location = selectedLocations.join(',');
          if (range < 10) searchParams.max_fees = range * 100000;
          
          const response = await searchSchools(searchParams);
          
          if (response.status && response.data) {
            setSchools(response.data);
          }
        } catch (err) {
          console.error('Error filtering schools:', err);
          setError(err instanceof Error ? err.message : 'Filter failed');
        } finally {
          setLoading(false);
        }
      } else if (!searchTerm.trim()) {
        // If no filters and no search, fetch all schools
        try {
          setLoading(true);
          const response = await getAllSchools();
          
          if (response.status && response.data) {
            setSchools(response.data);
          }
        } catch (err) {
          console.error('Error fetching schools:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    
    applyFilters();
  }, [selectedBoards, selectedMediums, selectedCategories, selectedLocations, selectedRatings, range, searchTerm]);
  
  // Client-side filtering for rating (since API might not support rating filters)
  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      const matchesRating = selectedRatings.length === 0 || selectedRatings.some(rating => {
        const ratingNum = parseFloat(rating);
        return school.reviews && school.reviews.length > 0 && 
               school.reviews.some(review => review.rating >= ratingNum && review.rating < ratingNum + 1);
      });
      
      return matchesRating;
    });
  }, [schools, selectedRatings]);

  const SCHOOLS_PER_PAGE = 9;
  
  const paginatedSchools = useMemo(() => {
    const startIndex = (currentPage - 1) * SCHOOLS_PER_PAGE;
    const endIndex = startIndex + SCHOOLS_PER_PAGE;
    return filteredSchools.slice(startIndex, endIndex);
  }, [filteredSchools, currentPage]);

  const totalPages = Math.ceil(filteredSchools.length / SCHOOLS_PER_PAGE);
  
  // Dynamic filter options from API data
  const boardList = useMemo(() => {
    const boardSet = new Set<string>();
    schools.forEach(school => {
      if (school.overview?.schoolInformation?.board) {
        boardSet.add(school.overview.schoolInformation.board);
      }
    });
    return Array.from(boardSet).sort();
  }, [schools]);
  
  const mediumList = useMemo(() => {
    const mediumSet = new Set<string>();
    schools.forEach(school => {
      if (school.overview?.schoolInformation?.medium) {
        mediumSet.add(school.overview.schoolInformation.medium);
      }
    });
    return Array.from(mediumSet).sort();
  }, [schools]);
  
  const categoryList = useMemo(() => {
    const categorySet = new Set<string>();
    schools.forEach(school => {
      if (school.overview?.schoolInformation?.category) {
        categorySet.add(school.overview.schoolInformation.category);
      }
    });
    return Array.from(categorySet).sort();
  }, [schools]);
  
  const locationList = useMemo(() => {
    const locationSet = new Set<string>();
    schools.forEach(school => {
      if (school.address?.city) {
        locationSet.add(school.address.city);
      }
    });
    return Array.from(locationSet).sort();
  }, [schools]);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBoards, selectedMediums, selectedCategories, selectedLocations, selectedRatings, range, searchTerm]);

  const getCount = (field: 'board' | 'medium' | 'category' | 'location' | 'rating', value: string) => {
    if (field === 'rating') {
      return schools.filter(school => 
        school.reviews && school.reviews.length > 0 && 
        school.reviews.some(review => review.rating.toString() === value)
      ).length;
    }
    if (field === 'board') {
      return schools.filter(school => school.overview?.schoolInformation?.board === value).length;
    }
    if (field === 'medium') {
      return schools.filter(school => school.overview?.schoolInformation?.medium === value).length;
    }
    if (field === 'category') {
      return schools.filter(school => school.overview?.schoolInformation?.category === value).length;
    }
    if (field === 'location') {
      return schools.filter(school => school.address?.city === value).length;
    }
    return 0;
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

  // Auto-trigger "Show Schools Near Me" if redirected with ?nearMe=true
  useEffect(() => {
    if (searchParams && searchParams.get('nearMe') === 'true') {
      getUserLocation();
      setTimeout(() => {
        if (nearMeSectionRef.current) {
          nearMeSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 1200); // Wait for location to be fetched
    }
  }, [searchParams]);

  // Wrap main return with SchoolsContext.Provider
  return (
    <SchoolsContext.Provider value={schools}>
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
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        const value = e.currentTarget.value.trim();
                        if (value) {
                          router.push(`/Schools?search=${encodeURIComponent(value)}`);
                          e.currentTarget.blur();
                        }
                      }
                    }}
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
              
              {/* Featured Schools Section - always at the top */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2 lg:mb-4">
                  <h2 className="text-2xl sm:text-3xl md:text-[42px] font-poppins font-medium text-black leading-tight">
                    Featured Schools
                  </h2>
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
                        <div key={school.id} className="flex-shrink-0 w-full max-w-sm">
                          <Link href={`/SchoolDetails/${school.id}`}>
                            <SchoolCard
                              name={school.name}
                              image={school.profileImage || school.gallery?.[0] || '/default-school.jpg'}
                              desc={`${school.address?.city || ''} | ${school.overview?.schoolInformation?.board || ''} | ${school.overview?.schoolInformation?.medium || ''} | ${school.overview?.schoolInformation?.category || ''}`}
                            />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Conditional: Schools Near Me OR All Schools */}
              {nearbySchools.length > 0 ? (
                <div ref={nearMeSectionRef}>
                  <div className="flex items-center justify-between mb-2 lg:mb-4">
                    <h2 className="text-2xl sm:text-3xl md:text-[42px] font-poppins font-medium text-black leading-tight">
                      Schools Near Me
                    </h2>
                    {!userLocation && (
                      <button
                        onClick={getUserLocation}
                        disabled={locationLoading}
                        className="px-4 py-2 bg-[#257B5A] text-white rounded-lg hover:bg-[#1e6248] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                      >
                        {locationLoading ? 'Getting Location...' : 'Get My Location'}
                      </button>
                    )}
                  </div>
                  {locationError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                      {locationError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nearbySchools.map(school => (
                      <div
                        key={school.id}
                        onClick={() => {
                          router.push(`/SchoolDetails/${school.id}`);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <SchoolCard
                          name={school.name}
                          image={school.profileImage || school.gallery?.[0] || '/default-school.jpg'}
                          desc={`${school.address?.city || ''} | ${school.overview?.schoolInformation?.board || ''} | ${school.overview?.schoolInformation?.medium || ''} | ${school.overview?.schoolInformation?.category || ''}`}
                          distance={school.distance} // Add distance prop here
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-2 lg:mb-4">
                    <h2 className="text-2xl sm:text-3xl md:text-[42px] font-poppins font-medium text-black leading-tight">
                      All Schools
                    </h2>
                    <button
                      onClick={getUserLocation}
                      disabled={locationLoading}
                      className="px-5 py-2 bg-[#257B5A] text-white rounded-lg hover:bg-[#1e6248] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      {locationLoading ? 'Getting Location...' : 'Show Schools Near Me'}
                    </button>
                  </div>
                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="text-lg text-gray-600">Loading schools...</div>
                    </div>
                  ) : error ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="text-lg text-red-600">{error}</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {paginatedSchools.map(school => (
                        <div
                          key={school.id}
                          onClick={() => {
                            router.push(`/SchoolDetails/${school.id}`);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <SchoolCard
                            name={school.name}
                            image={school.profileImage || school.gallery?.[0] || '/default-school.jpg'}
                            desc={`${school.address?.city || ''} | ${school.overview?.schoolInformation?.board || ''} | ${school.overview?.schoolInformation?.medium || ''} | ${school.overview?.schoolInformation?.category || ''}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
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
              )}
            </div>
          </div>
        </section>
      </>
    </SchoolsContext.Provider>
  );
};

export default SchoolListSection;
