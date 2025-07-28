'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LayoutDashboard, LogOut } from 'lucide-react';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-white md:bg-gray-200 rounded-full focus:outline-none mx-auto md:mx-0"
      >
        <User className="text-gray-600" />
      </button>

      {isOpen && (
        <div
          className={`
            absolute mt-2 z-50 rounded-md shadow-lg py-1
            bg-[#1C1F24] md:bg-white text-white md:text-gray-700
            left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-0
            w-[90vw] max-w-xs md:w-48
            border border-gray-700 md:border-none
          `}
        >
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-[#257B5A] md:hover:bg-gray-100 transition"
          >
            <User size={16} /> Profile
          </Link>
          <Link
            href="/SchoolDashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-[#257B5A] md:hover:bg-gray-100 transition"
          >
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link
            href="/StudentDashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-[#257B5A] md:hover:bg-gray-100 transition"
          >
            <LayoutDashboard size={16} /> Student Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm hover:bg-[#257B5A] md:hover:bg-gray-100 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
