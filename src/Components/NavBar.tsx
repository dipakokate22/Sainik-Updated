'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import ProfileDropdown from './ProfileDropdown';

export default function Navbar() {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const exploreDropdownRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume true for demo

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

  return (
    <div className="bg-[#1C1F24] w-full rounded-none md:rounded-[20px] max-w-[1380px] mx-auto mt-4 px-4 sm:px-6 lg:px-8 shadow-lg text-white py-[18px]">
      <div className="flex justify-between items-center">
        {/* Left Logo & Search */}
        <div className="flex items-center gap-4">
          <span className="text-white text-[28px] font-poppins font-bold">Sainik</span>

          {/* Desktop Only */}
          <div className="hidden md:flex items-center gap-4">
            <button className="h-10 px-4 rounded-full bg-[#257B5A] text-white flex items-center gap-2 hover:bg-green-800 transition cursor-pointer font-medium text-sm">
              <FaMapMarkerAlt size={14} />
              <span>Schools Near You</span>
            </button>

            <div className="flex items-center h-10 bg-white rounded-full pl-3 pr-3">
              <FaSearch className="text-[#257B5A]" size={14} />
              <input
                type="text"
                placeholder="Search"
                className="outline-none text-sm font-normal w-32 bg-transparent placeholder-gray-400 text-[#257B5A] ml-2"
              />
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Explore Dropdown */}
          <div className="relative" ref={exploreDropdownRef}>
            <button
              onClick={() => setIsExploreOpen(!isExploreOpen)}
              className="h-10 px-4 rounded-full bg-[#B91C1C] text-white flex items-center gap-2 hover:bg-red-800 transition font-normal text-sm"
            >
              Explore
              <IoIosArrowDown
                size={14}
                className={`transition-transform duration-300 ${isExploreOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Items */}
            {isExploreOpen && (
              <div className="absolute top-[50px] right-0 w-56 bg-[#1C1F24] text-white rounded-xl shadow-xl p-2 z-50">
                <ul className="space-y-1 text-sm">
                  <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                    <Link href="/Schools">Recommended Schools</Link>
                  </li>
                  <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                    <Link href="/Listing">School List</Link>
                  </li>
                  <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                    <Link href="/About">About Us</Link>
                  </li>
                  <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                    <Link href="/SchoolDetails">Career Counselling</Link>
                  </li>
                  <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                    <Link href="/NewsUpdates">News & Blogs</Link>
                  </li>
                  <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                    <Link href="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <Link href="/AddSchool">
            <span className="text-base cursor-pointer hover:underline">Add Your School</span>
          </Link>

          {isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <Link href="/login">
              <button className="h-10 px-6 rounded-full bg-[#257B5A] text-white hover:bg-green-800 transition text-sm">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden focus:outline-none"
        >
          {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-sm font-medium">
          <button className="flex items-center gap-2 bg-[#257B5A] text-white px-4 py-2 rounded-full w-full justify-center">
            <FaMapMarkerAlt size={14} />
            Schools Near You
          </button>

          <div className="flex items-center bg-white px-3 py-2 rounded-full">
            <FaSearch className="text-[#257B5A]" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-sm ml-2 bg-transparent placeholder-gray-400 text-[#257B5A] w-full"
            />
          </div>

          <div className="space-y-2 bg-[#1C1F24] p-4 rounded-lg">
            <Link href="/Schools">Recommended Schools</Link>
            <Link href="/Listing">School List</Link>
            <Link href="/About">About Us</Link>
            <Link href="/SchoolDetails">Career Counselling</Link>
            <Link href="/NewsUpdates">News & Blogs</Link>
            <Link href="/contact">Contact Us</Link>
          </div>

          <Link href="/AddSchool">
            <span className="block text-center underline">Add Your School</span>
          </Link>

          {isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <Link href="/login">
              <button className="w-full bg-[#257B5A] text-white py-2 rounded-full">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
