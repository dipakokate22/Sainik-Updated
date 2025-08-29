'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaSearch, FaBars, FaTimes, FaHome, FaSchool, FaInfoCircle, FaNewspaper, FaEnvelope, FaPlus } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import ProfileDropdown from './ProfileDropdown';
import { useRouter } from 'next/navigation';
import { getUserRole, isAuthenticated } from '../../services/authServices';

export default function Navbar() {
  const router = useRouter();
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const exploreDropdownRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState("");
  // Only get role and auth status after client-side hydration
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  // Ensure client-side rendering consistency
  useEffect(() => {
    setIsClient(true);
    setUserRole(getUserRole());
    setIsUserAuthenticated(isAuthenticated());
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        exploreDropdownRef.current &&
        !exploreDropdownRef.current.contains(event.target as Node)
      ) {
        setIsExploreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };
    
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.classList.add('overflow-hidden'); // Prevent background scroll
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return (
      <div className="fixed top-0 left-0 w-full z-50 bg-transparent">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-0">
          <div className="bg-[#1C1F24] w-full rounded-[16px] md:rounded-[20px] max-w-[1380px] mx-auto mt-4 mb-4 px-4 sm:px-6 lg:px-8 shadow-lg text-white py-[18px] relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 sm:gap-4">
                <Image
                  src="/Image/Sainik-logo.png" 
                  alt="Sainik Logo" 
                  width={120} 
                  height={60} 
                  className="h-8 sm:h-10 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
   <div className="fixed top-0 left-0 w-full z-50 bg-transparent">
  <div className="px-3 sm:px-0">
    <div className="bg-[#1C1F24] w-full rounded-[16px] md:rounded-[20px] max-w-[1380px] mx-auto mt-4 px-4 sm:px-6 lg:px-8 shadow-lg text-white py-[18px] relative">

      <div className="flex justify-between items-center">
        {/* Left Logo & Search */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Image 
            src="/Image/Sainik-logo.png" 
            alt="Sainik Logo" 
            width={160} 
            height={55} 
            className="h-12 w-auto sm:h-14" // Increased height for mobile
          />

         {/* Desktop Only */}
<div className="hidden md:flex items-center gap-3 lg:gap-4">
  {/* Button - Fixed height, responsive width */}
  <button
    onClick={() => {
      router.push('/Schools?nearMe=true');
    }}
    className="bg-[#10744E] text-white text-[14px] lg:text-[16px] font-medium px-3 md:px-4 lg:px-6 py-2 h-[40px] lg:h-[48px] rounded-full hover:bg-[#0d6342] transition flex items-center gap-2 whitespace-nowrap"
  >
    <FaMapMarkerAlt size={14} />
    <span className="hidden lg:inline">Schools Near You</span>
    <span className="lg:hidden">Schools</span>
  </button>

  {/* Search Box - Fixed width values to prevent hydration mismatch */}
  <div className="flex items-center bg-white rounded-full px-3 lg:px-4 h-[40px] w-[180px] lg:w-[230px] xl:w-[320px] lg:h-[48px] mr-2 md:mr-3 lg:mr-4">
    <FaSearch className="text-[#257B5A]" size={14} />
    <input
      type="text"
      placeholder="Search"
      className="outline-none text-sm font-normal w-12 lg:w-20 xl:w-28 bg-transparent placeholder-gray-400 text-[#257B5A] ml-2"
      value={searchValue}
      onChange={e => setSearchValue(e.target.value)}
      onKeyDown={e => {
        if (e.key === "Enter") {
          const value = e.currentTarget.value.trim();
          if (value) {
            router.push(`/Schools?search=${encodeURIComponent(value)}`);
            e.currentTarget.blur();
          }
        }
      }}
    />
  </div>
</div>
</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {/* Explore Dropdown */}
          <div className="relative" ref={exploreDropdownRef}>
            <button
              onClick={() => setIsExploreOpen(!isExploreOpen)}
              className="bg-[#AA0111] text-white text-[14px] lg:text-[16px] font-medium px-3 xl:px-6 py-2 lg:py-3 rounded-full hover:bg-[#0d6342] transition flex items-center gap-2"
            >
              {/* Show text only on screens 1440px and larger */}
              <span className="hidden xl:inline">Explore</span>
              {/* 9-dot grid icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`transition-transform duration-300 ${isExploreOpen ? 'rotate-180' : ''}`}
              >
                <circle cx="5" cy="5" r="2"/>
                <circle cx="12" cy="5" r="2"/>
                <circle cx="19" cy="5" r="2"/>
                <circle cx="5" cy="12" r="2"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="19" cy="12" r="2"/>
                <circle cx="5" cy="19" r="2"/>
                <circle cx="12" cy="19" r="2"/>
                <circle cx="19" cy="19" r="2"/>
              </svg>
            </button>

            {/* Dropdown Items */}
            {isExploreOpen && (
              <div className="absolute top-[70px] right-0 w-56 bg-[#1C1F24] text-white rounded-xl shadow-xl p-2 z-50">
                <ul className="space-y-1 text-sm">
                  <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                    <Link href="/Schools">Recommended Schools</Link>
                  </li>
                  {/* <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                    <Link href="/Listing">School List</Link>
                  </li> */}
                  <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                    <Link href="/About">About Us</Link>
                  </li>
                  <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                    <Link href="/CarrerCounselling">Career Counselling</Link>
                  </li>
                  {/* <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                    <Link href="/SchoolDetails">School Details</Link>
                  </li> */}
                  <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                    <Link href="/NewsUpdates">News & Blogs</Link>
                  </li>
                  <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                    <Link href="/ContactUs">Contact Us</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Show Compare button only for authenticated students */}
          {isUserAuthenticated && userRole === 'student' && (
            <Link href="/CompareSchools">
              <span className="text-sm lg:text-base cursor-pointer hover:underline">Compare</span>
            </Link>
          )}

          <ProfileDropdown />
        </div>

        {/* Mobile Right Side - School Icon + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <FaMapMarkerAlt size={18} className="text-[#257B5A]" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none mobile-menu-container"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-0 right-0 h-full w-80 bg-[#1C1F24] shadow-2xl z-50 mobile-menu-container flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700 flex-shrink-0">
            <span className="text-white text-xl font-bold">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white transition"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Search Section */}
          <div className="p-6 border-b border-gray-700 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" size={16} />
              </div>
              <input
                type="text"
                placeholder="Search schools..."
                className="w-full pl-10 pr-4 py-3 bg-[#2A2E34] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    const value = e.currentTarget.value.trim();
                    if (value) {
                      router.push(`/Schools?search=${encodeURIComponent(value)}`);
                      setMobileMenuOpen(false);
                      e.currentTarget.blur();
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Navigation Menu - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-6 space-y-2">
              {/* Quick Actions */}
              <div className="mb-6">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Link href="/Schools" className="flex items-center p-3 rounded-lg hover:bg-[#2A2E34] transition-colors group">
                    <FaSchool className="text-[#257B5A] mr-3" size={18} />
                    <span className="text-white font-medium">Find Schools</span>
                  </Link>
                  {/* <Link href="/AddSchool" className="flex items-center p-3 rounded-lg hover:bg-[#2A2E34] transition-colors group">
                    <FaPlus className="text-[#257B5A] mr-3" size={18} />
                    <span className="text-white font-medium">Add Your School</span>
                  </Link> */}
                  <Link href="/CompareSchools" className="flex items-center p-3 rounded-lg hover:bg-[#2A2E34] transition-colors group">
                    <FaPlus className="text-[#257B5A] mr-3" size={18} />
                    <span className="text-white font-medium">Compare Schools</span>
                  </Link>
                </div>
              </div>

              {/* Explore Section */}
              <div className="mb-6">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Explore</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setIsExploreOpen(!isExploreOpen)}
                    className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-[#2A2E34] transition-colors group"
                  >
                    <div className="flex items-center">
                      <FaHome className="text-[#257B5A] mr-3" size={18} />
                      <span className="text-white font-medium">Explore</span>
                    </div>
                    <IoIosArrowDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-300 ${isExploreOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExploreOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="pl-9 space-y-1">
                      <Link href="/Schools" className="block p-2 rounded-md hover:bg-[#2A2E34] transition-colors text-gray-300 hover:text-white text-sm">
                        Recommended Schools
                      </Link>
                      {/* <Link href="/Listing" className="block p-2 rounded-md hover:bg-[#2A2E34] transition-colors text-gray-300 hover:text-white text-sm">
                        School List
                      </Link> */}
                      
                      <Link href="/CarrerCounselling" className="block p-2 rounded-md hover:bg-[#2A2E34] transition-colors text-gray-300 hover:text-white text-sm">
                        Career Counselling
                      </Link>
                      <Link href="/NewsUpdates" className="block p-2 rounded-md hover:bg-[#2A2E34] transition-colors text-gray-300 hover:text-white text-sm">
                        News & Blogs
                      </Link>
                      <Link href="/ContactUs" className="block p-2 rounded-md hover:bg-[#2A2E34] transition-colors text-gray-300 hover:text-white text-sm">
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Links */}
              <div className="mb-6">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Resources</h3>
                <div className="space-y-2">
                  <Link href="/About" className="flex items-center p-3 rounded-lg hover:bg-[#2A2E34] transition-colors group">
                    <FaInfoCircle className="text-[#257B5A] mr-3" size={18} />
                    <span className="text-white font-medium">About Us</span>
                  </Link>
                  
                  <Link href="/NewsUpdates" className="flex items-center p-3 rounded-lg hover:bg-[#2A2E34] transition-colors group">
                    <FaNewspaper className="text-[#257B5A] mr-3" size={18} />
                    <span className="text-white font-medium">News & Updates</span>
                  </Link>
                  <Link href="/contact" className="flex items-center p-3 rounded-lg hover:bg-[#2A2E34] transition-colors group">
                    <FaEnvelope className="text-[#257B5A] mr-3" size={18} />
                    <span className="text-white font-medium">Contact Us</span>
                  </Link>
                </div>
              </div>
                <ProfileDropdown />
            </nav>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
    
  );
}